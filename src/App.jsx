import { useState, useEffect, useMemo, useRef } from 'react'
import {
  Satellite, Globe, Brain, TrendingUp, CreditCard, Building2,
  Zap, Smartphone, ChevronDown, Menu, X,
  MapPin, Shield, Rocket, Target, Eye, Heart, Users, Database,
  Layers, Award, ArrowRight, CheckCircle2, ChevronRight, Activity, Map, Radio, Server, Anchor, Network, Compass
} from 'lucide-react'

function useFadeIn() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) } },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

const DataField = ({ count = 60 }) => {
  const nodes = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${(Math.random() * 5).toFixed(2)}s`,
      duration: `${(3 + Math.random() * 5).toFixed(2)}s`,
      size: Math.random() > 0.85 ? 2.5 : 1,
    })), [count]
  )
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 z-0">
      {nodes.map(n => (
        <div key={n.id} className="absolute rounded-full bg-white animate-pulse"
          style={{ top: n.top, left: n.left, width: n.size, height: n.size, animationDelay: n.delay, animationDuration: n.duration }} />
      ))}
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Giới thiệu', href: '#video' },
    { label: 'Về chúng tôi', href: '#about' },
    { label: 'Lĩnh vực', href: '#business' },
    { label: 'Công nghệ', href: '#orbits' },
    { label: 'Hạ tầng', href: '#infrastructure' },
    { label: 'Dịch vụ', href: '#services' },
    { label: 'Lộ trình', href: '#roadmap' },
  ]

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/8 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center group">
          <div className="bg-white rounded-xl px-2.5 py-1 flex items-center shadow-lg shadow-black/20">
            <img src="/images/logo.svg" alt="CMC SpaceY Group JSC."
              className="h-14 w-auto object-contain" />
          </div>
        </a>

        <div className="hidden xl:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-200">
              {l.label}
            </a>
          ))}
          <a href="#contact"
            className="px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-white/90 transition-colors duration-200">
            Hợp tác
          </a>
        </div>

        <button className="xl:hidden text-white/70 p-1" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden bg-black/95 backdrop-blur-xl border-b border-white/8 px-6 pb-8 pt-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-3 text-white/60 hover:text-white text-sm font-medium border-b border-white/5 transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}
            className="block mt-6 text-center py-3 text-sm font-medium bg-white text-black rounded-full">
            Hợp tác ngay
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden bg-black">
    <DataField count={70} />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <div className="lg:col-span-7 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-white/60 text-xs font-medium mb-10 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
            Vệ tinh · AI · Dữ liệu · Tài chính số
          </div>

          <h1 className="font-light tracking-tight leading-none mb-6">
            <span className="block text-7xl md:text-8xl lg:text-[96px] text-white font-light">CMC</span>
            <span className="block text-7xl md:text-8xl lg:text-[96px] gradient-text font-light">SpaceY</span>
            <span className="block text-sm font-medium text-white/45 mt-4 tracking-[0.35em] uppercase">
              Group JSC.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white font-medium mb-4 leading-snug">
            Khai phóng tiềm năng không gian Việt Nam
          </p>
          <p className="text-white/50 text-sm md:text-base max-w-xl mb-12 leading-relaxed">
            Tập đoàn công nghệ tiên phong 100% vốn Việt Nam — hạ tầng vệ tinh, dữ liệu viễn thám, trí tuệ nhân tạo và kinh tế số.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a href="#about"
              className="glow-btn group flex items-center gap-2.5 px-7 py-3.5 rounded-full font-medium text-sm">
              Khám phá
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#business"
              className="btn-outline px-7 py-3.5 rounded-full font-medium text-sm text-white">
              Lĩnh vực hoạt động
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="absolute w-[420px] h-[420px] rounded-full border border-white/5 animate-orbit-leo pointer-events-none" />
          <div className="absolute w-[330px] h-[330px] rounded-full border border-white/4 animate-orbit-meo pointer-events-none" />
          <div className="absolute right-[-16px] top-[-16px] w-20 h-20 rounded-full planet animate-float-slow hidden sm:block" />

          <div className="relative z-10 p-3 bg-white/3 backdrop-blur-lg rounded-2xl border border-white/8 shadow-2xl">
            <img src="/images/hero_satellite.png" alt="CMC SpaceY Satellite"
              className="w-full max-w-[360px] h-auto rounded-xl object-cover hover:scale-[1.02] transition-transform duration-700" />
            <div className="absolute bottom-7 -left-5 bg-black/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/8 shadow-xl flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <div>
                <p className="text-white/50 text-[10px] uppercase font-medium tracking-wider">Hạ tầng vệ tinh</p>
                <p className="text-white text-xs font-medium">100% làm chủ tại VN</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/45">
      <span className="text-[10px] uppercase font-medium tracking-widest">Cuộn xuống</span>
      <ChevronDown className="w-4 h-4 animate-bounce" />
    </div>
  </section>
)

// ─── Stats ────────────────────────────────────────────────────────────────────
const Stats = () => {
  const items = [
    { value: '100%', label: 'Vốn sở hữu Việt Nam', icon: Shield },
    { value: '8 Core', label: 'Lĩnh vực cốt lõi', icon: Layers },
    { value: '5 Center', label: 'Trung tâm hạ tầng', icon: Building2 },
    { value: '2045', label: 'Tầm nhìn chiến lược', icon: Target },
  ]
  return (
    <section className="theme-light border-y border-white/6">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-white/5">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="text-center px-4 flex flex-col items-center justify-center gap-3">
                <Icon className="w-5 h-5 text-white/40" />
                <div className="text-3xl md:text-4xl font-light text-white tracking-tight">{item.value}</div>
                <div className="text-white/50 text-xs font-medium uppercase tracking-wider">{item.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Video Showcase ───────────────────────────────────────────────────────────
const VideoShowcase = () => {
  const ref = useFadeIn()
  return (
    <section id="video" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

      <div ref={ref} className="fade-section max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="label-tag mb-4">Thước phim giới thiệu</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-3">
            Hành trình Chinh phục Không gian
          </h2>
          <div className="accent-line" />
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed mt-6">
            Tầm nhìn, năng lực công nghệ và khát vọng vươn tầm vũ trụ của CMC SpaceY.
          </p>
        </div>

        <div className="video-frame">
          <div className="video-frame-inner">
            <iframe
              src="https://www.youtube.com/embed/Wxcxq05tKiA?rel=0"
              title="CMC SpaceY Group JSC."
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mt-10">
          {[
            { label: 'Tầm nhìn 2045', desc: 'Tập đoàn không gian hàng đầu khu vực' },
            { label: '100% Việt Nam', desc: 'Tự chủ công nghệ và dòng vốn' },
            { label: 'Hệ sinh thái số', desc: 'Vệ tinh · AI · Dữ liệu · Tài chính' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="text-white font-medium text-sm">{item.label}</span>
              <span className="text-white/50 text-xs mt-1">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
const About = () => {
  const ref = useFadeIn()
  const info = [
    { label: 'Tên doanh nghiệp', value: 'CMC SpaceY Group JSC.' },
    { label: 'Mô hình sở hữu', value: '100% vốn sở hữu của Việt Nam' },
    { label: 'Trụ sở chính', value: 'Việt Nam — Khu CNC TP. HCM (Saigon Silicon)' },
    { label: 'Định hướng', value: 'Công nghệ không gian · Dữ liệu viễn thám · AI · Kinh tế số' },
  ]

  return (
    <section id="about" className="theme-light py-32 relative">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="label-tag mb-4">Về chúng tôi</p>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-10 leading-tight">
              Tập đoàn Công nghệ<br />Không gian Việt Nam
            </h2>
            <div className="space-y-3">
              {info.map((item, i) => (
                <div key={i} className="card-dark flex gap-4 p-5 rounded-xl">
                  <div className="w-1 h-auto bg-white/15 rounded-full flex-shrink-0" />
                  <div>
                    <div className="text-white/45 text-xs uppercase font-medium tracking-widest mb-1">{item.label}</div>
                    <div className="text-white text-sm font-medium leading-relaxed">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="card-dark relative p-8 rounded-2xl">
              <div className="text-white/5 text-8xl font-serif leading-none absolute top-4 left-6 select-none">"</div>
              <p className="text-white/60 text-sm leading-relaxed mb-6 relative z-10">
                CMC SpaceY Group JSC. được hình thành với khát vọng tham gia vào lĩnh vực công nghệ không gian, góp phần đưa Việt Nam xây dựng năng lực tự chủ về hạ tầng vệ tinh, dữ liệu không gian và các ứng dụng công nghệ cao phục vụ dân sự, kinh tế số và tài chính số.
              </p>
              <div className="flex items-center gap-3.5 pt-5 border-t border-white/6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center font-medium text-xs text-white">CMC</div>
                <div>
                  <div className="text-white font-medium text-sm">Chu Minh Chiến</div>
                  <div className="accent-gold text-xs">Chủ tịch HĐQT CMC SpaceY Group JSC.</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 overflow-hidden relative group">
              <img src="/images/space_rd_center.png" alt="CMC SpaceY R&D Center"
                className="w-full h-48 object-cover group-hover:scale-[1.03] transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex items-end p-5">
                <div>
                  <p className="text-keep-white font-medium text-sm">Mô hình Trung tâm R&D CMC SpaceY</p>
                  <p className="text-keep-white-dim text-xs">Nghiên cứu & điều hành vệ tinh</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Vision & Mission ─────────────────────────────────────────────────────────
const VisionMission = () => {
  const ref = useFadeIn()
  const missions = [
    'Nghiên cứu, tiếp nhận, phát triển và từng bước làm chủ công nghệ vệ tinh, dữ liệu viễn thám, AI',
    'Xây dựng hạ tầng nghiên cứu, sản xuất, điều hành và xử lý dữ liệu viễn thám tại Việt Nam',
    'Triển khai dịch vụ vệ tinh phục vụ kinh tế số, quản lý tài nguyên, logistics, hàng hải, nông nghiệp',
    'Phát triển cổng thanh toán, ứng dụng di động và mạng xã hội phục vụ hệ sinh thái CMC SpaceY',
    'Nghiên cứu sàn giao dịch tài sản số và dịch vụ tài chính số phù hợp quy định pháp luật',
    'Đào tạo và phát triển nguồn nhân lực công nghệ cao phục vụ kinh tế không gian Việt Nam',
  ]

  return (
    <section className="py-32 bg-black relative">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">Định hướng chiến lược</p>
          <h2 className="text-4xl md:text-5xl font-light text-white">Tầm nhìn & Sứ mệnh</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-dark p-10 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-white/6 flex items-center justify-center mb-6">
              <Eye className="w-5 h-5 text-white/60" />
            </div>
            <p className="label-tag mb-2">Vision</p>
            <h3 className="text-2xl font-light text-white mb-5">Tầm nhìn</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Trở thành tập đoàn công nghệ không gian — vệ tinh — dữ liệu — AI — tài chính số hàng đầu Việt Nam, từng bước vươn ra khu vực và quốc tế, góp phần hình thành hệ sinh thái kinh tế không gian do người Việt làm chủ.
            </p>
          </div>

          <div className="card-dark p-10 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-white/6 flex items-center justify-center mb-6">
              <Target className="w-5 h-5 text-white/60" />
            </div>
            <p className="label-tag mb-2">Mission</p>
            <h3 className="text-2xl font-light text-white mb-5">Sứ mệnh</h3>
            <ul className="space-y-3.5">
              {missions.map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
                  <div className="w-1 h-1 rounded-full bg-white/25 mt-2.5 flex-shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Business Areas ───────────────────────────────────────────────────────────
const BusinessAreas = () => {
  const ref = useFadeIn()
  const areas = [
    { icon: Satellite, title: 'Công nghệ Vệ tinh', sub: 'Satellite Technology', desc: 'Nghiên cứu và làm chủ các dòng vệ tinh viễn thông, quan sát, viễn thám phục vụ kinh tế và dân sự.' },
    { icon: Globe, title: 'Dữ liệu Viễn thám', sub: 'Remote Sensing Data', desc: 'Thu nhận, xử lý và thương mại hóa dữ liệu quan sát Trái Đất phục vụ quản lý tài nguyên, môi trường.' },
    { icon: Brain, title: 'AI & Dữ liệu lớn', sub: 'AI & Big Data', desc: 'Ứng dụng AI vào toàn bộ chuỗi giá trị dữ liệu không gian từ thu nhận đến thương mại hóa.' },
    { icon: Zap, title: 'Năng lượng Không gian', sub: 'Space Solar Power', desc: 'Nghiên cứu dài hạn về năng lượng mặt trời không gian, đánh giá tiềm năng khai thác tương lai.' },
    { icon: TrendingUp, title: 'Sàn Tài sản số', sub: 'Digital Asset Exchange', desc: 'Vận hành sàn giao dịch tài sản số theo cơ chế pháp lý được Nhà nước cấp phép.' },
    { icon: CreditCard, title: 'Cổng Thanh toán', sub: 'Payment Gateway', desc: 'Thanh toán tích hợp cho dịch vụ vệ tinh, dữ liệu viễn thám, phần mềm và thiết bị kỹ thuật số.' },
    { icon: Building2, title: 'Ngân hàng số', sub: 'Digital Banking', desc: 'Nghiên cứu thành lập ngân hàng số và dịch vụ tài chính số phục vụ hệ sinh thái.' },
    { icon: Smartphone, title: 'Phần mềm & Ứng dụng', sub: 'Software & Apps', desc: 'Phát triển ứng dụng di động, mạng xã hội chuyên ngành và API mở kết nối hệ sinh thái CMC SpaceY.' },
  ]

  return (
    <section id="business" className="theme-light py-32">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">Lĩnh vực hoạt động</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">8 Lĩnh vực Cốt lõi</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            Hệ sinh thái tích hợp từ công nghệ vệ tinh đến nền tảng số, tài chính — do Việt Nam làm chủ.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {areas.map((area, i) => {
            const Icon = area.icon
            return (
              <div key={i} className="card-dark group p-6 rounded-xl cursor-default">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </div>
                <div className="text-white font-medium text-sm mb-1">{area.title}</div>
                <div className="label-tag text-[10px] mb-3">{area.sub}</div>
                <p className="text-white/50 text-xs leading-relaxed">{area.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Orbits & Satellite ───────────────────────────────────────────────────────
const OrbitsConstellation = () => {
  const [activeOrbit, setActiveOrbit] = useState('leo')
  const ref = useFadeIn()

  const orbits = {
    leo: {
      name: 'Quỹ đạo thấp (LEO)',
      alt: '160 – 1,500 km',
      latency: '< 20 ms',
      desc: 'Lý tưởng cho internet vệ tinh băng rộng, viễn thám độ phân giải siêu cao và giám sát tài nguyên thiên nhiên thời gian thực.',
    },
    meo: {
      name: 'Quỹ đạo trung bình (MEO)',
      alt: '5,000 – 20,000 km',
      latency: '50 – 150 ms',
      desc: 'Dùng cho mạng định vị toàn cầu GPS/Galileo, theo dõi hàng hải rộng khắp và liên lạc hàng không dân dụng.',
    },
    geo: {
      name: 'Quỹ đạo địa tĩnh (GEO)',
      alt: '35,786 km',
      latency: '250 – 800 ms',
      desc: 'Phủ sóng truyền hình quốc gia, dự phòng an ninh mạng diện rộng và kết nối các giàn khoan biển xa.',
    }
  }

  const satCategories = [
    { title: 'Vệ tinh viễn thông', desc: 'Truyền dẫn internet băng rộng và điện thoại di động toàn cầu.' },
    { title: 'Vệ tinh viễn thám', desc: 'Chụp ảnh bề mặt Trái Đất độ phân giải cao phục vụ nông nghiệp, môi trường.' },
    { title: 'Vệ tinh định vị', desc: 'Tọa độ thời gian thực cho hàng hải, logistics và xe tự lái.' },
    { title: 'Vệ tinh tài chính', desc: 'Đường truyền mã hóa cho giao dịch thanh toán quốc tế.' },
    { title: 'Vệ tinh nghiên cứu', desc: 'Thu thập dữ liệu khí quyển phục vụ R&D khoa học vũ trụ Việt Nam.' },
    { title: 'Hệ thống an ninh', desc: 'Hạ tầng dự phòng quốc gia phục vụ cứu hộ và ứng cứu thiên tai.' }
  ]

  return (
    <section id="orbits" className="py-32 bg-black relative overflow-hidden">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">Công nghệ không gian</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Mô phỏng Quỹ đạo vệ tinh</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            CMC SpaceY hướng tới sở hữu mạng lưới vệ tinh đa tầng, tối ưu hóa khai thác thương mại và khoa học.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="flex justify-center">
            <svg viewBox="0 0 500 500" className="w-full max-w-[380px] h-auto">
              <circle cx="250" cy="250" r="44" className="fill-white/4 stroke-white/20" strokeWidth="1.5" />
              <text x="250" y="254" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontWeight="500" fontFamily="Inter">EARTH</text>

              <circle cx="250" cy="250" r="188" fill="none"
                className={`cursor-pointer transition-all duration-300 ${activeOrbit === 'geo' ? 'stroke-white' : 'stroke-white/15 hover:stroke-white/35'}`}
                strokeWidth={activeOrbit === 'geo' ? '1.5' : '1'}
                onClick={() => setActiveOrbit('geo')} />
              <circle cx="250" cy="62" r="5" fill="rgba(255,255,255,0.7)" className="animate-spin-slow origin-[250px_250px]" />
              <text x="250" y="52" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontWeight="500">GEO</text>

              <circle cx="250" cy="250" r="128" fill="none"
                className={`cursor-pointer transition-all duration-300 ${activeOrbit === 'meo' ? 'stroke-white' : 'stroke-white/10 hover:stroke-white/30'}`}
                strokeWidth={activeOrbit === 'meo' ? '1.5' : '1'}
                onClick={() => setActiveOrbit('meo')} />
              <circle cx="250" cy="122" r="4.5" fill="rgba(255,255,255,0.6)" className="animate-orbit-meo origin-[250px_250px]" />
              <text x="250" y="114" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="500">MEO</text>

              <circle cx="250" cy="250" r="78" fill="none"
                className={`cursor-pointer transition-all duration-300 ${activeOrbit === 'leo' ? 'stroke-white' : 'stroke-white/8 hover:stroke-white/25'}`}
                strokeWidth={activeOrbit === 'leo' ? '1.5' : '1'}
                onClick={() => setActiveOrbit('leo')} />
              <circle cx="250" cy="172" r="4" fill="white" className="animate-orbit-leo origin-[250px_250px]" />
              <text x="250" y="165" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontWeight="500">LEO</text>
            </svg>
          </div>

          <div className="card-dark p-8 rounded-2xl">
            <p className="text-white/45 text-xs font-medium uppercase tracking-widest mb-2">Thông tin quỹ đạo</p>
            <h3 className="text-lg font-medium text-white mb-5">{orbits[activeOrbit].name}</h3>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white/3 rounded-xl p-4 border border-white/6">
                <span className="text-white/45 text-[10px] uppercase font-medium block mb-1">Độ cao</span>
                <span className="text-white font-medium text-sm">{orbits[activeOrbit].alt}</span>
              </div>
              <div className="bg-white/3 rounded-xl p-4 border border-white/6">
                <span className="text-white/45 text-[10px] uppercase font-medium block mb-1">Độ trễ</span>
                <span className="accent-gold font-medium text-sm">{orbits[activeOrbit].latency}</span>
              </div>
            </div>
            <p className="text-white/55 text-xs leading-relaxed mb-5">{orbits[activeOrbit].desc}</p>
            <div className="flex gap-2">
              {['leo', 'meo', 'geo'].map(o => (
                <button key={o} onClick={() => setActiveOrbit(o)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-lg border uppercase transition-all ${activeOrbit === o ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-white/50 hover:text-white'}`}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-xl font-medium text-white text-center mb-8">Phân loại Vệ tinh theo Ứng dụng</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {satCategories.map((cat, i) => (
              <div key={i} className="card-dark p-5 rounded-xl">
                <h4 className="text-white font-medium text-sm mb-2">{cat.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-dark p-8 md:p-12 rounded-2xl text-center">
          <h3 className="text-2xl md:text-3xl font-light text-white mb-4">Mục tiêu Phóng 5,000 Vệ tinh LEO</h3>
          <p className="text-white/50 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
            Thiết lập chùm vệ tinh phủ sóng Đông Nam Á, Châu Phi và Châu Đại Dương trong 5 năm tới.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { phase: 'Giai đoạn 1', val: '1,000 Vệ tinh', desc: '2 đợt phóng thử nghiệm hệ thống LEO.' },
              { phase: 'Giai đoạn 2', val: '1,000 Vệ tinh / Năm', desc: 'Lắp ráp tại Saigon Silicon, phóng định kỳ hàng năm.' },
              { phase: 'Tổng 5 năm', val: '5,000 Vệ tinh', desc: 'Giám sát 24/7 không có điểm mù.' },
            ].map((g, i) => (
              <div key={i} className="bg-white/3 rounded-xl p-6 border border-white/6 text-left">
                <span className="label-tag text-[10px] block mb-2">{g.phase}</span>
                <span className="text-xl text-white font-light block mb-2">{g.val}</span>
                <p className="text-white/50 text-xs leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Subterranean Mining ──────────────────────────────────────────────────────
const SubterraneanMining = () => {
  const [activeStep, setActiveStep] = useState(1)
  const ref = useFadeIn()

  const challenges = [
    { label: 'Tỷ lệ rủi ro cao', desc: 'Cứ 1,000 dự án khoan thì tỷ lệ tìm vỉa quặng lớn chỉ khoảng 0.2%.' },
    { label: 'Chu kỳ kéo dài', desc: 'Khảo sát mặt đất cổ điển mất 3–5 năm để đánh giá trữ lượng.' },
    { label: 'Hạn chế độ sâu', desc: 'Cảm biến thông thường mất độ chính xác tại độ sâu quá 500 mét.' },
    { label: 'Chi phí khổng lồ', desc: 'Khoan mù trực tiếp tốn hàng trăm triệu USD không đảm bảo hiệu quả.' }
  ]

  const workflow = [
    { step: 1, title: 'Thu nhận dữ liệu diện rộng', desc: 'Vệ tinh quét phổ nhiệt lượng và từ trường toàn khu vực mục tiêu không bị cản bởi địa hình.' },
    { step: 2, title: 'Lọc phổ & loại bỏ nhiễu', desc: 'Hệ thống lọc giữ lại tín hiệu bức xạ nguyên tử từ lòng đất (Microlepton).' },
    { step: 3, title: 'Nhận dạng bằng thuật toán AI', desc: 'Đối chiếu tín hiệu với cơ sở dữ liệu khoáng sản để xác định thành phần vật chất.' },
    { step: 4, title: 'Mô phỏng 3D tọa độ', desc: 'Siêu máy tính phân tích dựng mô hình cấu trúc 3D, chiều sâu và biên giới túi quặng.' },
    { step: 5, title: 'Kiểm chứng thực địa NMR', desc: 'Kỹ sư mang thiết bị NMR đến tọa độ GPS được vệ tinh chỉ định để xác nhận.' }
  ]

  return (
    <section id="mining" className="theme-light py-32">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">Công nghệ vượt trội</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Thăm dò Địa chất quét sâu</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            Vệ tinh kết hợp AI để nhìn thấu lòng đất, giảm thiểu chi phí và thời gian thăm dò khoáng sản.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-white/20 inline-block" />
              Rào cản ngành khai khoáng cũ
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {challenges.map((ch, i) => (
                <div key={i} className="card-dark p-5 rounded-xl">
                  <h4 className="text-white font-medium text-sm mb-2">{ch.label}</h4>
                  <p className="text-white/50 text-xs leading-relaxed">{ch.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-dark p-4 rounded-2xl relative">
            <img src="/images/satellite_mineral_scan.png" alt="Subterranean Scanning"
              className="w-full max-w-[400px] mx-auto h-auto rounded-xl object-cover" />
            <div className="mt-4 p-4 bg-white/3 rounded-xl border border-white/6 text-center">
              <span className="text-white/45 text-xs uppercase font-medium block mb-1">Khả năng đâm xuyên</span>
              <p className="text-white font-medium text-sm">Dầu khí sâu 8,000m · Quặng rắn 2,000m</p>
            </div>
          </div>
        </div>

        <div className="card-dark p-8 rounded-2xl">
          <h3 className="text-lg font-medium text-white text-center mb-10">Quy trình Khảo sát 5 bước</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-3">
              {workflow.map(w => (
                <button key={w.step} onClick={() => setActiveStep(w.step)}
                  className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${activeStep === w.step ? 'bg-white/8 border-white/20' : 'bg-transparent border-white/5 hover:border-white/12'}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0 ${activeStep === w.step ? 'bg-white text-black' : 'bg-white/6 text-white/50'}`}>
                    {w.step}
                  </div>
                  <span className={`text-xs font-medium ${activeStep === w.step ? 'text-white' : 'text-white/50'}`}>{w.title}</span>
                </button>
              ))}
            </div>
            <div className="bg-white/3 rounded-xl p-6 border border-white/6 min-h-[200px] flex flex-col justify-center">
              <span className="text-white/45 text-[10px] uppercase font-medium block mb-2">Bước {activeStep}</span>
              <h4 className="text-white font-medium text-base mb-3">{workflow[activeStep - 1].title}</h4>
              <p className="text-white/55 text-xs leading-relaxed">{workflow[activeStep - 1].desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Infrastructure ───────────────────────────────────────────────────────────
const Infrastructure = () => {
  const ref = useFadeIn()
  const centers = [
    { icon: Brain, title: 'Trung tâm R&D', sub: 'Nghiên cứu & Phát triển', desc: 'Nghiên cứu công nghệ vệ tinh, phát triển thuật toán AI và liên kết với các viện, trường đại học hàng đầu.', num: '01' },
    { icon: Rocket, title: 'Sản xuất Vệ tinh', sub: 'Lắp ráp & Thử nghiệm', desc: 'Lắp ráp, tích hợp và thử nghiệm vệ tinh, sản xuất thiết bị phụ trợ, hình thành chuỗi cung ứng CNC.', num: '02' },
    { icon: Database, title: 'Điều hành & Dữ liệu', sub: 'Vận hành Vệ tinh', desc: 'Điều hành vệ tinh viễn thám, tiếp nhận, giải mã và xử lý dữ liệu không gian lớn.', num: '03' },
    { icon: CreditCard, title: 'Phần mềm & Fintech', sub: 'Nền tảng số', desc: 'Phát triển ứng dụng di động, thanh toán, tài sản số và hệ sinh thái số CMC SpaceY.', num: '04' },
    { icon: Users, title: 'Đào tạo Nhân lực', sub: 'Nguồn nhân lực CNC', desc: 'Đào tạo kỹ sư vệ tinh, chuyên gia viễn thám, AI và tài chính số hàng đầu Việt Nam.', num: '05' },
  ]

  return (
    <section id="infrastructure" className="py-32 bg-black">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">Hạ tầng chiến lược</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">5 Trung tâm tại Việt Nam</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed mb-6">
            Hệ sinh thái khép kín do người Việt vận hành — kết nối nghiên cứu với sản xuất công nghiệp.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/3 border border-white/8 text-xs text-white/50 font-medium">
            <MapPin className="w-3.5 h-3.5" />
            35 Hecta · Khu CNC TP. Hồ Chí Minh (Saigon Silicon City)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-24">
          {centers.map((c, i) => {
            const Icon = c.icon
            return (
              <div key={i} className="card-dark group p-6 rounded-xl text-center relative">
                <div className="text-4xl font-light absolute top-4 right-4 opacity-4 text-white select-none">{c.num}</div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/8 transition-colors">
                  <Icon className="w-5 h-5 text-white/60" />
                </div>
                <div className="text-white font-medium text-sm mb-1">{c.title}</div>
                <div className="label-tag text-[10px] mb-3">{c.sub}</div>
                <p className="text-white/45 text-xs leading-relaxed">{c.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 pt-12 border-t border-white/5">
          <div>
            <h3 className="text-2xl font-light text-white mb-5">Tổ hợp Nghiên cứu & Chế tạo Vệ tinh</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-7">
              Tổ hợp 35 ha là "trái tim" công nghệ sản xuất của CMC SpaceY, là cơ sở tự chủ kỹ thuật hàng không vũ trụ Việt Nam.
            </p>
            <div className="space-y-4">
              {[
                { icon: Radio, title: 'Trung tâm Chế tạo Vệ tinh', desc: 'Tích hợp lắp ráp và thử nghiệm môi trường chân không cho các dòng vệ tinh mini thương mại.' },
                { icon: Users, title: 'Trung tâm Đào tạo chuyên sâu', desc: 'Thực hành thực tế cho kỹ sư hàng không vũ trụ, chuyên gia viễn thám và tài chính số.' },
                { icon: Server, title: 'Big Data & Siêu tính toán AI', desc: 'Siêu máy tính thu nhận tín hiệu vệ tinh, giải mã ảnh viễn thám phục vụ chuyển đổi số quốc gia.' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-white/50" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">{item.title}</h4>
                      <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card-dark p-4 rounded-2xl relative">
            <img src="/images/aerospace_factory.png" alt="High Tech Assembly"
              className="w-full max-w-[420px] mx-auto h-auto rounded-xl object-cover hover:scale-[1.02] transition-transform duration-500" />
            <div className="absolute bottom-8 -left-4 bg-black/95 backdrop-blur-md px-4 py-3 rounded-xl border border-white/8 shadow-xl flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-white/50" />
              <div>
                <p className="text-white/45 text-[10px] uppercase font-medium">Phòng sạch tiêu chuẩn</p>
                <p className="text-white text-xs font-medium">Đạt chuẩn hàng không quốc tế</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spaceport */}
        <div id="spaceport" className="pt-16 border-t border-white/5">
          <div className="text-center mb-12">
            <p className="label-tag mb-4">Dự án trọng điểm</p>
            <h3 className="text-3xl md:text-4xl font-light text-white mb-4">Cảng vũ trụ quốc gia Vũng Tàu</h3>
            <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
              Sân bay vũ trụ độc lập phục vụ mục tiêu quốc gia và cung ứng dịch vụ phóng thương mại toàn cầu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-xl font-medium text-white mb-5 flex items-center gap-3">
                <span className="w-6 h-0.5 bg-white/20 inline-block" />
                Siêu dự án lấn biển Vũng Tàu (1,000 ha)
              </h4>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                CMC SpaceY đặt tầm nhìn sở hữu bãi phóng độc lập để làm chủ lịch phóng vệ tinh, tối ưu chi phí và không phụ thuộc hạ tầng quốc tế.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Anchor, text: '<strong>Đảo nhân tạo 100 ha:</strong> Xây dựng lấn biển cách đất liền 3–5 km ngoài khơi Vũng Tàu.' },
                  { icon: Rocket, text: '<strong>Kết nối giao thông:</strong> Liên kết trực tiếp với Sân bay Vũng Tàu, logistics chuyên dụng.' },
                  { icon: Compass, text: '<strong>Lịch phóng 2027:</strong> Vụ phóng vệ tinh thử nghiệm đầu tiên từ bãi phóng độc lập.' },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/5 border border-white/8 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Icon className="w-3 h-3 text-white/50" />
                      </div>
                      <span className="text-white/60 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="card-dark p-4 rounded-2xl relative">
              <img src="/images/coastal_spaceport.png" alt="Offshore Launch Pad"
                className="w-full max-w-[440px] mx-auto h-auto rounded-xl object-cover hover:scale-[1.02] transition-transform duration-500" />
              <div className="absolute -bottom-5 -right-4 p-4 bg-black/95 border border-white/8 rounded-xl text-left max-w-[200px]">
                <span className="text-white/45 text-[10px] uppercase font-medium block mb-2">Thông số hạ tầng</span>
                <div className="space-y-1.5">
                  <div><span className="text-white/40 text-[10px] block">Diện tích bãi phóng</span><span className="text-white text-xs font-medium">100 Hécta</span></div>
                  <div><span className="text-white/40 text-[10px] block">Quy mô tổng dự án</span><span className="accent-gold text-xs font-medium">1,000 Hécta</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
const Services = () => {
  const ref = useFadeIn()
  const cats = [
    { title: 'Nông nghiệp Công nghệ cao', items: ['Theo dõi cây trồng & dự báo mùa vụ', 'Quản lý độ ẩm đất & tối ưu tưới tiêu', 'Phát hiện sớm dịch bệnh, khô hạn', 'Tối ưu hóa sản lượng thu hoạch', 'Truy xuất nguồn gốc vùng nguyên liệu'] },
    { title: 'Logistics & Hàng hải', items: ['Theo dõi hành trình phương tiện vận tải', 'Giám sát tàu thuyền đánh cá xa bờ', 'Quản lý điều hành hạ tầng cảng biển', 'Tối ưu chuỗi cung ứng logistics', 'Viễn thông vệ tinh biển'] },
    { title: 'Tài nguyên & Môi trường', items: ['Giám sát biến động diện tích rừng', 'Theo dõi xâm nhập mặn & sạt lở', 'Quan trắc biến đổi khí hậu', 'Cảnh báo sớm lũ lụt, thiên tai', 'Giám sát ô nhiễm không khí'] },
    { title: 'Đô thị thông minh', items: ['Quy hoạch đô thị & quản lý hạ tầng', 'Giám sát mật độ giao thông', 'Quản lý mạng lưới năng lượng thông minh', 'Giám sát kết cấu công trình lớn', 'Nền tảng bản đồ số 3D'] },
    { title: 'Tài chính số & Fintech', items: ['Cổng thanh toán dịch vụ viễn thám', 'Sàn giao dịch tài sản số được cấp phép', 'Nghiên cứu mô hình ngân hàng số', 'API dữ liệu không gian mở', 'Thanh toán thuê bao Cloud'] },
    { title: 'Kết nối Vệ tinh diện rộng', items: ['Phủ sóng Internet vùng núi sâu xa', 'Kết nối hải đảo & thiết bị ngoài khơi', 'Hạ tầng dự phòng an ninh quốc gia', 'Ứng phó liên lạc khẩn cấp', 'Thuê bao truyền dữ liệu IoT'] },
  ]

  return (
    <section id="services" className="theme-light py-32">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">Dịch vụ ứng dụng</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Giải pháp cho mọi ngành</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            CMC SpaceY mang dữ liệu viễn thám và AI vào thực tiễn kinh tế — từ nông nghiệp đến tài chính số.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cats.map((cat, i) => (
            <div key={i} className="card-dark p-6 rounded-xl">
              <h3 className="text-white font-medium text-sm mb-4">{cat.title}</h3>
              <ul className="space-y-2.5">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-white/50 text-xs leading-relaxed">
                    <ChevronRight className="w-3.5 h-3.5 text-white/35 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Roadmap ──────────────────────────────────────────────────────────────────
const Roadmap = () => {
  const ref = useFadeIn()
  const phases = [
    { num: '01', title: 'Nền tảng pháp lý & Nhân lực', items: ['Hoàn thiện hồ sơ thành lập doanh nghiệp', 'Lập đề án chiến lược 2026–2030', 'Ký kết hợp tác đào tạo quốc tế', 'Đệ trình cấp phép tần số vệ tinh'] },
    { num: '02', title: 'Xây dựng Hạ tầng kỹ thuật', items: ['Thiết lập phòng thí nghiệm R&D', 'Triển khai Data Center viễn thám', 'Sản xuất thiết bị mặt đất thử nghiệm', 'Công bố cổng thanh toán thử nghiệm'] },
    { num: '03', title: 'Phát triển & Thương mại', items: ['Cung cấp dữ liệu viễn thám cho DN', 'Thương mại nông nghiệp số', 'Tích hợp thanh toán IoT hàng hải', 'Vận hành sàn tài sản số thử nghiệm'] },
    { num: '04', title: 'Mở rộng quy mô thị trường', items: ['Liên kết quốc phòng, thiên tai', 'Thương mại hóa API viễn thám', 'Chuyển giao quản lý tài nguyên địa phương', 'Phát hành ví điện tử kinh tế số'] },
    { num: '05', title: 'Vươn tầm khu vực & Vũ trụ', items: ['Hồ sơ phóng chùm vệ tinh mini', 'Xuất khẩu dịch vụ ra Đông Nam Á', 'Liên minh không gian châu Á', 'Đóng góp hạ tầng CNC toàn cầu'] },
  ]

  return (
    <section id="roadmap" className="py-32 bg-black">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">Lộ trình phát triển</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">5 Giai đoạn Chiến lược</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            Lộ trình bài bản từng bước đảm bảo tính khả thi cao, kết hợp nghiên cứu với thương mại hóa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          <div className="hidden md:block absolute top-7 left-[8%] right-[8%] h-px bg-white/6 pointer-events-none" />
          {phases.map((p, i) => (
            <div key={i} className="card-dark p-6 rounded-xl group">
              <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center text-xs font-light mb-5 mx-auto md:mx-0">
                {p.num}
              </div>
              <div className="label-tag text-[10px] mb-2">Giai đoạn {p.num}</div>
              <h3 className="text-white font-medium text-sm mb-4 leading-snug">{p.title}</h3>
              <ul className="space-y-2.5">
                {p.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-white/45 text-xs leading-relaxed">
                    <div className="w-1 h-1 rounded-full mt-1.5 bg-white/20 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── International Network ────────────────────────────────────────────────────
const InternationalNetwork = () => {
  const ref = useFadeIn()
  const branches = [
    { name: 'Khu vực ASEAN', desc: 'Văn phòng đại diện và trạm thu phát tại Lào, Campuchia, Thái Lan, Indonesia, Philippines và Myanmar (Lộ trình 2027).' },
    { name: 'Châu Phi & Châu Đại Dương', desc: 'Cung ứng dữ liệu viễn thám, liên lạc biển và giải pháp an ninh mạng cho chính quyền và doanh nghiệp đối tác.' }
  ]

  return (
    <section id="network" className="py-32 bg-[#050505]">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">Vươn tầm thế giới</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Mạng lưới Chi nhánh Quốc tế</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            Đưa công nghệ và thương hiệu không gian Việt Nam ghi dấu ấn trên bản đồ thế giới.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <svg viewBox="0 0 600 400" className="w-full max-w-[500px] h-auto bg-white/2 rounded-2xl border border-white/5 p-6 shadow-2xl">
              <g stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none">
                <path d="M250 80 L220 180 M220 180 L150 240 M150 240 L280 290 M280 290 L320 230 M320 230 L250 80" />
                <path d="M220 180 L320 230 M150 240 L320 230 M250 80 L400 320 L480 340 M320 230 L400 320" strokeDasharray="5 3" />
              </g>
              <g stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" strokeDasharray="8 4">
                <line x1="250" y1="80" x2="220" y2="180" />
                <line x1="250" y1="80" x2="150" y2="240" />
                <line x1="250" y1="80" x2="280" y2="290" />
                <line x1="250" y1="80" x2="320" y2="230" />
                <line x1="250" y1="80" x2="80" y2="350" />
                <line x1="250" y1="80" x2="480" y2="340" />
              </g>
              <circle cx="250" cy="80" r="8" fill="white" />
              <circle cx="250" cy="80" r="16" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="pulse-ring-slow" />
              <text x="250" y="63" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="500">VIETNAM HUB</text>
              {[{x:220,y:180},{x:150,y:240},{x:280,y:290},{x:320,y:230}].map((p,i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="rgba(255,255,255,0.5)" />)}
              {[{x:80,y:350},{x:480,y:340}].map((p,i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="rgba(255,255,255,0.3)" />)}
              <text x="228" y="194" fill="rgba(255,255,255,0.3)" fontSize="9">Lào & Thái Lan</text>
              <text x="80" y="244" fill="rgba(255,255,255,0.3)" fontSize="9">Campuchia</text>
              <text x="290" y="305" fill="rgba(255,255,255,0.3)" fontSize="9">Indonesia</text>
              <text x="330" y="234" fill="rgba(255,255,255,0.3)" fontSize="9">Philippines</text>
              <text x="80" y="370" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" fontWeight="500">AFRICA</text>
              <text x="480" y="360" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" fontWeight="500">OCEANIA</text>
            </svg>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-medium text-white flex items-center gap-3">
              <span className="w-6 h-0.5 bg-white/20 inline-block" />
              Định vị thị trường toàn cầu
            </h3>
            {branches.map((br, i) => (
              <div key={i} className="card-dark p-5 rounded-xl">
                <h4 className="text-white font-medium text-sm mb-2">{br.name}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{br.desc}</p>
              </div>
            ))}
            <div className="p-5 rounded-xl bg-white/3 border border-white/8">
              <span className="label-tag text-[10px] block mb-1">Mục tiêu độc quyền</span>
              <p className="text-white/55 text-xs leading-relaxed">Phân phối dịch vụ internet vệ tinh, dữ liệu địa chất quét sâu và giải pháp an ninh mạng không gian.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Strategic Value ──────────────────────────────────────────────────────────
const StrategicValue = () => {
  const ref = useFadeIn()
  const values = [
    { icon: TrendingUp, title: 'Tác động Kinh tế', desc: 'Hình thành ngành kinh tế không gian Việt Nam, khai thác doanh thu từ dữ liệu viễn thám, AI và sàn giao dịch số.' },
    { icon: Brain, title: 'Khoa học – Công nghệ', desc: 'Làm chủ công nghệ vệ tinh, phát triển Big Data & AI nội địa phục vụ giám sát lãnh thổ.' },
    { icon: Heart, title: 'Giá trị Xã hội', desc: 'Cải thiện liên lạc vùng xa, cảnh báo thiên tai, thu hẹp khoảng cách phát triển số.' },
    { icon: Globe, title: 'Môi trường bền vững', desc: 'Giám sát rừng, xâm nhập mặn đồng bằng sông Cửu Long, ứng phó biến đổi khí hậu.' },
    { icon: Shield, title: 'Chuyển đổi số quốc gia', desc: 'Hạ tầng dữ liệu vị trí vệ tinh đồng bộ phần mềm, ví điện tử kiến tạo xã hội số.' },
  ]

  return (
    <section className="theme-light py-32">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">Tác động chiến lược</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Giá trị cho Việt Nam</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            CMC SpaceY không chỉ là dự án kinh doanh — đây là nỗ lực tự cường công nghệ của người Việt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <div key={i} className="card-dark group p-6 rounded-xl text-center">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/8 transition-colors">
                  <Icon className="w-5 h-5 text-white/55" />
                </div>
                <h3 className="text-white font-medium text-sm mb-3">{v.title}</h3>
                <p className="text-white/45 text-xs leading-relaxed">{v.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Principles ───────────────────────────────────────────────────────────────
const Principles = () => (
  <section className="py-20 border-y border-white/5 bg-[#050505]">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h3 className="text-xl md:text-2xl font-light text-white mb-14 max-w-3xl mx-auto">
        Việt Nam làm chủ — Việt Nam kiểm soát — Việt Nam vận hành — Việt Nam khai thác
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: Shield, label: 'Việt Nam làm chủ', sub: 'Vietnamese Owned' },
          { icon: Eye, label: 'Việt Nam kiểm soát', sub: 'Vietnamese Controlled' },
          { icon: Users, label: 'Việt Nam vận hành', sub: 'Vietnamese Operated' },
          { icon: Award, label: 'Việt Nam khai thác', sub: 'Vietnamese Benefited' },
        ].map((p, i) => {
          const Icon = p.icon
          return (
            <div key={i} className="flex flex-col items-center gap-4 group">
              <div className="w-14 h-14 rounded-full border border-white/10 bg-white/4 flex items-center justify-center group-hover:bg-white/8 transition-colors">
                <Icon className="w-6 h-6 text-white/60" />
              </div>
              <div className="text-white text-sm font-medium">{p.label}</div>
              <div className="text-white/40 text-[10px] font-medium uppercase tracking-widest">{p.sub}</div>
            </div>
          )
        })}
      </div>
    </div>
  </section>
)

// ─── Vision 2045 ──────────────────────────────────────────────────────────────
const Vision2045 = () => {
  const ref = useFadeIn()
  return (
    <section className="relative py-40 overflow-hidden bg-black">
      <DataField count={50} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(255,255,255,0.025),transparent)] pointer-events-none" />

      <div ref={ref} className="fade-section relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="label-tag mb-6">Tầm nhìn 2045</p>
        <h2 className="text-4xl md:text-6xl font-light text-white mb-10 leading-tight">
          Biểu tượng mới của<br />
          <span className="gradient-text">Khát vọng Công nghệ Việt Nam</span>
        </h2>
        <p className="text-white/50 text-base leading-relaxed mb-14 max-w-2xl mx-auto">
          Đến năm 2045, CMC SpaceY định hướng trở thành tập đoàn công nghệ vũ trụ có tầm ảnh hưởng lớn — lấy Việt Nam làm cơ sở đầu não điều hành và thương mại hóa toàn cầu.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {[
            { val: '100%', label: 'Vốn sở hữu Việt Nam' },
            { val: 'Khu vực', label: 'Tầm vóc hướng tới' },
            { val: '2045', label: 'Tầm nhìn dài hạn' },
          ].map((item, i) => (
            <div key={i} className="card-dark p-6 rounded-xl">
              <div className="text-2xl font-light text-white mb-1">{item.val}</div>
              <div className="text-white/45 text-xs uppercase font-medium tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>

        <blockquote className="border-l border-white/15 pl-6 text-left max-w-xl mx-auto">
          <p className="text-white/60 text-base italic leading-relaxed">
            "Tự chủ hạ tầng không gian để kiến tạo tương lai phát triển bền vững cho nền kinh tế số nước nhà."
          </p>
          <footer className="mt-3 accent-gold text-sm font-medium">— Chu Minh Chiến, Chủ tịch CMC SpaceY</footer>
        </blockquote>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
const CONTACT_EMAIL = 'contact_hk@cmcspacey.com'

const ContactCTA = () => {
  const ref = useFadeIn()
  const [form, setForm] = useState({ name: '', email: '', org: '', topic: 'Hợp tác đầu tư', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | fallback

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const buildSubject = () =>
    `[CMC SpaceY] ${form.topic} — ${form.name}${form.org ? ` (${form.org})` : ''}`

  const openMailFallback = () => {
    const body = [
      'THÔNG TIN LIÊN HỆ — CMC SPACEY GROUP JSC.',
      '==========================================',
      '',
      `Họ và tên       : ${form.name}`,
      `Email liên hệ   : ${form.email}`,
      `Đơn vị / Tổ chức: ${form.org || '(Không cung cấp)'}`,
      `Lĩnh vực        : ${form.topic}`,
      '',
      'NỘI DUNG:',
      '------------------------------------------',
      form.message,
      '',
      '==========================================',
      'Email được gửi từ form liên hệ chính thức tại www.cmcspacey.com',
    ].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(buildSubject())}&body=${encodeURIComponent(body)}`
    setStatus('fallback')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          'Họ và tên': form.name,
          'Email liên hệ': form.email,
          'Đơn vị / Tổ chức': form.org || '(Không cung cấp)',
          'Lĩnh vực quan tâm': form.topic,
          'Nội dung': form.message,
          _subject: buildSubject(),
          _replyto: form.email,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const data = await res.json()
      if (!res.ok || data.success === 'false' || data.success === false) throw new Error('send failed')
      setStatus('sent')
      setForm({ name: '', email: '', org: '', topic: 'Hợp tác đầu tư', message: '' })
    } catch {
      openMailFallback()
    }
  }

  return (
    <section id="contact" className="theme-light py-32">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div className="lg:pt-6">
            <p className="label-tag mb-4">Hợp tác phát triển</p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 leading-snug">
              Cùng xây dựng tương lai<br />công nghệ không gian Việt Nam
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-md">
              CMC SpaceY chào đón các cơ quan Nhà nước, đối tác khoa học, quỹ đầu tư và chuyên gia toàn cầu cùng đồng hành khai phóng tiềm năng kinh tế không gian.
            </p>
            <div className="space-y-6">
              <div>
                <div className="label-tag text-[10px] mb-1.5">Email hợp tác</div>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-white text-sm font-medium hover:text-white/70 transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div>
                <div className="label-tag text-[10px] mb-1.5">Trụ sở chính</div>
                <p className="text-white/55 text-sm">Khu CNC TP. Hồ Chí Minh (Saigon Silicon), Việt Nam</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card-dark p-8 md:p-10 rounded-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="label-tag text-[10px] block mb-2" htmlFor="ct-name">Họ và tên *</label>
                <input id="ct-name" name="name" required value={form.name} onChange={handleChange}
                  className="input-dark" placeholder="Nguyễn Văn A" autoComplete="name" />
              </div>
              <div>
                <label className="label-tag text-[10px] block mb-2" htmlFor="ct-email">Email *</label>
                <input id="ct-email" name="email" type="email" required value={form.email} onChange={handleChange}
                  className="input-dark" placeholder="email@congty.com" autoComplete="email" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="label-tag text-[10px] block mb-2" htmlFor="ct-org">Đơn vị / Tổ chức</label>
                <input id="ct-org" name="org" value={form.org} onChange={handleChange}
                  className="input-dark" placeholder="Tên công ty, cơ quan" autoComplete="organization" />
              </div>
              <div>
                <label className="label-tag text-[10px] block mb-2" htmlFor="ct-topic">Lĩnh vực quan tâm</label>
                <select id="ct-topic" name="topic" value={form.topic} onChange={handleChange} className="input-dark">
                  <option>Hợp tác đầu tư</option>
                  <option>Hợp tác công nghệ & R&D</option>
                  <option>Dịch vụ dữ liệu viễn thám</option>
                  <option>Dịch vụ tài chính số</option>
                  <option>Tuyển dụng & Đào tạo</option>
                  <option>Khác</option>
                </select>
              </div>
            </div>
            <div className="mb-7">
              <label className="label-tag text-[10px] block mb-2" htmlFor="ct-message">Nội dung *</label>
              <textarea id="ct-message" name="message" required rows={5} value={form.message} onChange={handleChange}
                className="input-dark resize-none" placeholder="Mô tả ngắn gọn nhu cầu hợp tác của bạn…" />
            </div>
            <button type="submit" disabled={status === 'sending'}
              className="glow-btn group w-full flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-medium text-sm disabled:opacity-60 disabled:cursor-wait">
              {status === 'sending' ? 'Đang gửi…' : 'Gửi thông tin liên hệ'}
              {status !== 'sending' && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
            {status === 'sent' && (
              <p className="text-white/60 text-xs text-center mt-4 leading-relaxed">
                Cảm ơn bạn! Thông tin đã được gửi tới {CONTACT_EMAIL}. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
              </p>
            )}
            {status === 'fallback' && (
              <p className="text-white/60 text-xs text-center mt-4 leading-relaxed">
                Ứng dụng email của bạn đã được mở với nội dung điền sẵn — vui lòng bấm gửi để hoàn tất liên hệ tới {CONTACT_EMAIL}.
              </p>
            )}
          </form>

        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="border-t border-white/5 bg-black py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
        <div>
          <div className="inline-flex bg-white rounded-xl px-3 py-1.5 mb-5">
            <img src="/images/logo.svg" alt="CMC SpaceY Group JSC."
              className="h-20 w-auto object-contain" />
          </div>
          <p className="text-white/45 text-xs leading-relaxed mb-3">
            Tập đoàn Công nghệ Không gian — Vệ tinh — Dữ liệu — AI — Tài chính số 100% vốn Việt Nam.
          </p>
          <p className="text-white/35 text-xs italic">"Khai phóng tiềm năng không gian Việt Nam"</p>
        </div>

        <div>
          <h4 className="text-white text-sm font-medium mb-5">Lĩnh vực trọng tâm</h4>
          <ul className="space-y-2.5">
            {['Công nghệ Vệ tinh viễn thám', 'Phân tích dữ liệu không gian', 'Ứng dụng AI chuyên sâu', 'Hạ tầng Sàn tài sản số', 'Cổng thanh toán dịch vụ', 'Hệ sinh thái Ngân hàng số'].map(item => (
              <li key={item} className="text-white/40 text-xs hover:text-white/60 cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-medium mb-5">Thông tin tập đoàn</h4>
          <div className="space-y-4">
            {[
              { label: 'Trụ sở chính', value: 'Việt Nam' },
              { label: 'Email hợp tác', value: 'contact_hk@cmcspacey.com' },
              { label: 'Đầu tư hạ tầng', value: 'Khu CNC TP. Hồ Chí Minh & Vũng Tàu' },
              { label: 'Cơ cấu sở hữu', value: '100% dòng vốn Việt Nam' },
              { label: 'Lĩnh vực', value: 'Không gian · Dữ liệu · Kinh tế số' },
            ].map(item => (
              <div key={item.label}>
                <div className="text-white/35 text-[10px] uppercase font-medium tracking-widest mb-1">{item.label}</div>
                <div className="text-white/55 text-xs">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-white/35 text-xs">
        <div>© 2026 CMC SpaceY Group JSC. All rights reserved.</div>
        <div>www.cmcspacey.com</div>
      </div>
    </div>
  </footer>
)

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <Stats />
      <VideoShowcase />
      <About />
      <VisionMission />
      <BusinessAreas />
      <OrbitsConstellation />
      <SubterraneanMining />
      <Infrastructure />
      <Services />
      <Roadmap />
      <InternationalNetwork />
      <StrategicValue />
      <Principles />
      <Vision2045 />
      <ContactCTA />
      <Footer />
    </div>
  )
}
