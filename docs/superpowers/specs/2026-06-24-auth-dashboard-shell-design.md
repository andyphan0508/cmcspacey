# Thiết kế: Auth + Dashboard Shell

- **Ngày**: 2026-06-24
- **Dự án**: cmcspacey — chuyển từ landing page tĩnh sang ứng dụng full-stack có dashboard quản trị
- **Phạm vi spec này**: Bước 1 — Đăng nhập (xác thực qua mail server PA Vietnam) + khung Dashboard. Webmail và HR là các spec riêng sau.

## 1. Bối cảnh & mục tiêu lớn

Dự án hiện tại là một landing page tĩnh (React + Vite, deploy GitHub Pages) cho CMC SpaceY Group. Mục tiêu dài hạn của chủ dự án là xây một dashboard quản trị nội bộ gồm:

1. **Auth + Dashboard** (spec này)
2. **Webmail client** kiểu Thunderbird: nhận/gửi/đọc/xóa mail, lọc spam, AI gợi ý trả lời, format văn bản; lưu mail về kho riêng và xóa trên server thật để tiết kiệm dung lượng (PA Vietnam chỉ 1GB).
3. **Quản lý nhân sự (HR)**.

Hạ tầng: chạy thử local trước (full-stack), sau này deploy lên AWS (EC2/ECS + RDS). SQLite local → Postgres trên AWS.

### Quyết định đã chốt khi brainstorm
- **Hạ tầng**: dựng và chạy local trước, deploy AWS sau.
- **Người dùng**: multi-user — mỗi nhân viên đăng nhập bằng hộp mail riêng (vd `ten@cmcspacey.com`). Xác thực qua chính mail server.
- **Đồng bộ mail** (cho spec webmail sau): tải về DB, nhưng chỉ xóa trên server khi người dùng bấm duyệt.
- **AI gợi ý trả lời**: làm khung + chỗ cắm API trước, cắm provider thật sau.
- **Thứ tự**: làm Auth + Dashboard shell trước, chạy thử, review, rồi mới bàn webmail.
- **Kiến trúc**: Monorepo — giữ Vite SPA hiện có + thêm backend Node/Express + SQLite.

## 2. Kiến trúc tổng thể

Monorepo một repo, hai process khi dev:
- **Frontend**: Vite + React (hiện có). Thêm `react-router-dom` để có route. Landing page giữ nguyên ở `/`.
- **Backend**: Node + Express trong thư mục `server/`. Cung cấp REST API dưới `/api`.
- **DB**: SQLite qua `better-sqlite3` (file local, zero-setup). Schema viết sao cho dễ chuyển Postgres sau.
- **Xác thực mail**: thư viện `imapflow` để thử kết nối IMAP.

Dev: Vite proxy `/api` → `http://localhost:3001`. Chạy đồng thời frontend (vite) + backend (node) qua script `dev:all`.

### Cấu trúc thư mục
```
cmcspacey/
├── src/                          # Frontend
│   ├── main.jsx                  # mount router thay vì App trực tiếp
│   ├── router.jsx                # MỚI: định nghĩa route /, /login, /app/*
│   ├── App.jsx                   # landing page hiện có → render tại route "/"
│   ├── pages/
│   │   ├── Login.jsx             # MỚI: form đăng nhập
│   │   └── dashboard/
│   │       ├── Shell.jsx         # MỚI: layout (sidebar + header + <Outlet/>)
│   │       ├── Home.jsx          # MỚI: trang chủ dashboard
│   │       ├── Mail.jsx          # MỚI: placeholder "Webmail — sắp có"
│   │       └── HR.jsx            # MỚI: placeholder "Nhân sự — sắp có"
│   ├── lib/
│   │   └── auth.jsx              # MỚI: AuthContext, gọi API login/logout/me
│   └── components/
│       └── ProtectedRoute.jsx    # MỚI: chặn route khi chưa đăng nhập
├── server/                       # MỚI — backend
│   ├── index.js                  # khởi tạo Express, mount routes
│   ├── routes/auth.js            # POST /api/login, POST /api/logout, GET /api/me
│   ├── lib/imap.js               # verifyImapLogin(email, password)
│   ├── lib/jwt.js                # signSession(user), verifySession(token)
│   ├── middleware/requireAuth.js # đọc cookie JWT, gắn req.user
│   ├── db.js                     # khởi tạo SQLite + migrations + seed admin
│   └── .env.example              # mẫu cấu hình
├── vite.config.js                # thêm proxy /api → localhost:3001
└── package.json                  # thêm dependencies + scripts dev:server, dev:all
```

## 3. Luồng xác thực (IMAP-validated login)

1. User nhập `email` + `password` (mail PA Vietnam) tại `/login`.
2. Frontend gọi `POST /api/login` với `{ email, password }`.
3. Backend gọi `verifyImapLogin(email, password)` — `imapflow` kết nối tới IMAP host PA Vietnam:
   - **Thành công**: upsert user vào SQLite (email, display_name nếu có, cập nhật `last_login_at`); nếu là `contact@cmcspacey.com` thì `role='admin'`, còn lại `role='member'`. Ký JWT (payload: `email`, `role`, `exp` ~8h). Set cookie **httpOnly** chứa JWT. Trả `{ email, display_name, role }`.
   - **Sai mật khẩu**: trả `401 { error: "Sai email hoặc mật khẩu" }`.
   - **Không kết nối được server** (sai host/mạng/timeout): trả `503 { error: "Không kết nối được máy chủ mail" }` — phân biệt rõ với lỗi sai mật khẩu.
4. Frontend nhận 200 → điều hướng vào `/app`.
5. `GET /api/me` (qua `requireAuth`) trả thông tin user để render shell. Lỗi → frontend đá về `/login`.
6. `POST /api/logout` xóa cookie.
7. Mọi route `/app/*` bọc trong `ProtectedRoute`: khi mount gọi `/api/me`; chưa đăng nhập → redirect `/login`.

### Lưu ý bảo mật
- **KHÔNG lưu mật khẩu mail vào DB ở bước này.** Mật khẩu chỉ dùng để xác thực IMAP rồi loại bỏ ngay trong bộ nhớ.
- Webmail (spec sau) sẽ cần mật khẩu mail mỗi phiên để gọi IMAP/SMTP — cơ chế lưu/giải mã an toàn (vd mã hóa bằng key dẫn xuất từ phiên, không lưu plaintext) sẽ được thiết kế riêng tại spec webmail. Không gói trong spec này.
- JWT dùng cookie `httpOnly`, `sameSite=lax`; khi deploy AWS bật thêm `secure`.
- `JWT_SECRET` lấy từ biến môi trường, không hardcode.

## 4. Dashboard Shell

- **Layout**: sidebar trái (logo CMC SpaceY; menu: Trang chủ / Hộp thư / Nhân sự / Đăng xuất), header trên (tên + email user, nút đăng xuất), vùng nội dung `<Outlet/>`.
- **Routing**:
  - `/app` → `Home`
  - `/app/mail` → `Mail` (placeholder "Tính năng đang phát triển")
  - `/app/hr` → `HR` (placeholder; nếu `role !== 'admin'` hiện "Bạn không có quyền truy cập")
- **i18n**: tái dùng i18next sẵn có (vi/en/zh) — thêm key cho login + shell trong cả 3 file locale.
- **Style**: Tailwind (đã có), đồng bộ tông màu landing page.

## 5. Data model (SQLite — tối thiểu)

```sql
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT UNIQUE NOT NULL,
  display_name  TEXT,
  role          TEXT NOT NULL DEFAULT 'member',  -- 'admin' | 'member'
  last_login_at TEXT,
  created_at    TEXT NOT NULL
);
```

- Chưa cần bảng mail/HR ở bước này.
- Seed: khi `contact@cmcspacey.com` đăng nhập lần đầu → set `role='admin'`.
- Thời gian lưu dạng ISO-8601 text (tương thích Postgres sau).

## 6. Config (`server/.env`)

```
# Mail server PA Vietnam (cấu hình SSL khuyến nghị)
IMAP_HOST=mail90168.maychuemail.com
IMAP_PORT=993
IMAP_SECURE=true

# Dùng cho spec webmail sau (đưa sẵn vào .env.example)
SMTP_HOST=mail90168.maychuemail.com
SMTP_PORT=465
SMTP_SECURE=true

# Backend
PORT=3001
JWT_SECRET=<random-string>
DB_PATH=./server/data.sqlite
NODE_ENV=development
```

`server/.env` được gitignore; commit `server/.env.example`.

## 7. Xử lý lỗi

| Tình huống | HTTP | Thông báo người dùng |
|-----------|------|----------------------|
| Sai email/mật khẩu | 401 | "Sai email hoặc mật khẩu" |
| Không kết nối được mail server | 503 | "Không kết nối được máy chủ mail, thử lại sau" |
| JWT hết hạn / không hợp lệ | 401 | (frontend tự đá về `/login`) |
| Thiếu trường input | 400 | "Vui lòng nhập email và mật khẩu" |

Backend timeout kết nối IMAP ~10s để tránh treo.

## 8. Testing

- **Backend (unit)**: mock `verifyImapLogin` → test `/api/login` cho 3 nhánh (thành công / sai mật khẩu / lỗi kết nối); test `signSession`/`verifySession` (token hợp lệ, hết hạn, sai chữ ký); test `requireAuth` chặn khi thiếu/hỏng cookie.
- **Smoke test thật**: script `server/scripts/test-imap.js` thử kết nối IMAP với 1 tài khoản thật để xác minh cấu hình PA Vietnam (chạy thủ công, không vào CI).
- **Frontend**: kiểm tra thủ công qua preview — login thành công vào được `/app`, sai mật khẩu hiện lỗi, truy cập `/app` khi chưa login bị đá về `/login`, đăng xuất hoạt động.

## 9. Tiêu chí hoàn thành (bước 1)

- [ ] `npm run dev:all` chạy được cả frontend + backend.
- [ ] Đăng nhập bằng tài khoản mail PA Vietnam thật → vào dashboard.
- [ ] Sai mật khẩu → báo lỗi đúng; lỗi kết nối → báo lỗi khác.
- [ ] Route `/app/*` được bảo vệ; chưa login bị redirect.
- [ ] Đăng xuất xóa phiên.
- [ ] `contact@cmcspacey.com` có `role='admin'`; user khác `role='member'`.
- [ ] Landing page `/` vẫn hoạt động như cũ.

## 10. Ngoài phạm vi (spec riêng sau)

- Toàn bộ webmail: list inbox/spam, đọc, gửi (SMTP), xóa, đồng bộ + lưu về DB + xóa-khi-duyệt, AI gợi ý trả lời, trình soạn thảo format văn bản, cơ chế lưu mật khẩu mail an toàn cho phiên.
- HR module chi tiết (CRUD nhân sự, phân quyền).
- Deploy AWS (EC2/ECS + RDS, đổi SQLite→Postgres, build frontend phục vụ tĩnh).
