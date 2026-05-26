import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import {
  Satellite, Globe, Brain, TrendingUp, CreditCard, Building2,
  Zap, Smartphone, ChevronDown, Menu, X,
  MapPin, Shield, Rocket, Target, Eye, Heart, Users, Database,
  Layers, Award, ArrowRight, Star,
} from 'lucide-react'

// ─── Intersection Observer Hook ───────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

// ─── Star Field ───────────────────────────────────────────────────────────────
const StarField = ({ count = 150 }) => {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${(Math.random() * 5).toFixed(2)}s`,
        duration: `${(2 + Math.random() * 4).toFixed(2)}s`,
        size: Math.random() > 0.85 ? 2 : 1,
      })),
    [count]
  )
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Về chúng tôi', href: '#about' },
    { label: 'Lĩnh vực', href: '#business' },
    { label: 'Hạ tầng', href: '#infrastructure' },
    { label: 'Dịch vụ', href: '#services' },
    { label: 'Lộ trình', href: '#roadmap' },
  ]

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#020c1b]/90 backdrop-blur-xl border-b border-white/[0.07] shadow-xl'
          : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow">
            <Satellite className="w-4 h-4 text-white" />
          </div>
          <div className="leading-none">
            <div className="text-white font-bold text-sm">CMC SpaceY</div>
            <div className="text-cyan-400 text-[10px] font-medium tracking-widest uppercase">Group JSC.</div>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full
                       hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/20"
          >
            Hợp tác
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white p-1" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#020c1b]/95 backdrop-blur-xl border-b border-white/[0.07] px-6 pb-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-gray-400 hover:text-white text-sm border-b border-white/[0.05] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block mt-4 text-center py-2.5 text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full"
          >
            Hợp tác ngay
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020c1b]">
    <StarField count={200} />

    {/* Background gradient mesh */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(6,182,212,0.12),transparent)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,rgba(99,102,241,0.08),transparent)]" />

    {/* Decorative planet */}
    <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 hidden xl:block animate-float">
      <div className="planet w-[380px] h-[380px] rounded-full opacity-60" />
      {/* Orbit rings */}
      <div className="absolute inset-[-40px] rounded-full border border-cyan-500/10 animate-orbit" />
      <div className="absolute inset-[-80px] rounded-full border border-cyan-500/[0.06] animate-orbit-reverse" />
      {/* Satellite dot */}
      <div className="absolute top-[-40px] left-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50 -translate-x-1/2" />
    </div>

    {/* Main content */}
    <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.08] text-cyan-400 text-xs font-medium mb-8 backdrop-blur-sm">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        Công nghệ Không gian · Vệ tinh · Dữ liệu · AI · Tài chính số
      </div>

      {/* Headline */}
      <h1 className="font-black leading-none mb-4">
        <span className="block text-6xl md:text-8xl lg:text-9xl text-white tracking-tight">CMC</span>
        <span className="block text-6xl md:text-8xl lg:text-9xl gradient-text tracking-tight">SpaceY</span>
        <span className="block text-xl md:text-2xl font-normal text-gray-500 mt-4 tracking-widest uppercase">
          Group JSC.
        </span>
      </h1>

      {/* Tagline */}
      <p className="text-xl md:text-2xl text-gray-300 font-light mt-8 mb-3">
        Khai phóng tiềm năng không gian Việt Nam
      </p>
      <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto mb-12">
        Tập đoàn 100% vốn sở hữu Việt Nam — tiên phong trong vệ tinh, dữ liệu không gian, AI và kinh tế số
      </p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#about"
          className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full
                     hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40"
        >
          Khám phá ngay
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href="#business"
          className="px-8 py-3.5 border border-white/15 text-white text-sm rounded-full hover:bg-white/[0.05] hover:border-white/25 transition-all duration-300"
        >
          Lĩnh vực hoạt động
        </a>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
      <span className="text-[10px] uppercase tracking-widest">Cuộn xuống</span>
      <ChevronDown className="w-4 h-4 animate-bounce" />
    </div>
  </section>
)

// ─── Stats Bar ────────────────────────────────────────────────────────────────
const Stats = () => {
  const items = [
    { value: '100%', label: 'Vốn sở hữu Việt Nam', icon: Shield, color: '#06b6d4' },
    { value: '8', label: 'Lĩnh vực cốt lõi', icon: Layers, color: '#8b5cf6' },
    { value: '5', label: 'Trung tâm hạ tầng', icon: Building2, color: '#10b981' },
    { value: '2040', label: 'Tầm nhìn chiến lược', icon: Target, color: '#f59e0b' },
  ]
  return (
    <section className="border-y border-white/[0.06] bg-gradient-to-r from-[#020c1b] via-[#060f20] to-[#020c1b]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="text-center group">
                <Icon className="w-5 h-5 mx-auto mb-3 transition-transform group-hover:scale-110" style={{ color: item.color }} />
                <div className="text-3xl md:text-4xl font-black text-white mb-1">{item.value}</div>
                <div className="text-gray-500 text-xs uppercase tracking-wider">{item.label}</div>
              </div>
            )
          })}
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
    { label: 'Tên viết tắt', value: 'CMC SpaceY' },
    { label: 'Mô hình sở hữu', value: '100% vốn sở hữu của Việt Nam' },
    { label: 'Trụ sở chính', value: 'Việt Nam — Dự kiến tại Khu CNC TP. HCM' },
    { label: 'Định hướng', value: 'Công nghệ không gian, vệ tinh, dữ liệu, AI, thanh toán số, tài sản số' },
  ]

  return (
    <section id="about" className="py-28 bg-[#020c1b]">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Về chúng tôi</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 leading-tight">
              Tập đoàn Công nghệ <br />
              <span className="gradient-text">Không gian Việt Nam</span>
            </h2>
            <div className="space-y-3">
              {info.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/20 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <div>
                    <div className="text-gray-600 text-[10px] uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-white text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Chairman message card */}
          <div className="relative">
            {/* Decorative orbit rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full border border-cyan-500/10 animate-orbit" />
              <div className="absolute w-56 h-56 rounded-full border border-violet-500/[0.08] animate-orbit-reverse" />
            </div>

            <div className="relative z-10 p-8 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm glow-cyan">
              {/* Quote mark */}
              <div className="text-cyan-400/20 text-8xl font-serif leading-none mb-2 -mt-2">"</div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                CMC SpaceY Group JSC. được hình thành với khát vọng tham gia vào lĩnh vực công nghệ không gian, góp phần đưa Việt Nam xây dựng năng lực tự chủ về hạ tầng vệ tinh, dữ liệu không gian và các ứng dụng công nghệ cao phục vụ dân sự, kinh tế số, quản lý tài nguyên, logistics, hàng hải, nông nghiệp, đô thị thông minh và tài chính số.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Trong bối cảnh thế giới bước vào kỷ nguyên kinh tế không gian, CMC SpaceY hướng tới vai trò tiên phong của Việt Nam trong việc kết nối công nghệ không gian với các nền tảng số phục vụ người dân và nền kinh tế.
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.07]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-xs text-white">
                  CMC
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Chu Minh Chiến</div>
                  <div className="text-cyan-400 text-xs">Chủ tịch CMC SpaceY Group JSC.</div>
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
    'Xây dựng hạ tầng nghiên cứu, sản xuất, điều hành và xử lý dữ liệu tại Việt Nam',
    'Triển khai dịch vụ vệ tinh phục vụ kinh tế số, quản lý tài nguyên, logistics, hàng hải, nông nghiệp',
    'Phát triển cổng thanh toán, ứng dụng di động và mạng xã hội phục vụ hệ sinh thái CMC SpaceY',
    'Nghiên cứu sàn giao dịch tài sản số và dịch vụ tài chính số phù hợp quy định pháp luật',
    'Đào tạo và phát triển nguồn nhân lực công nghệ không gian của Việt Nam',
  ]

  return (
    <section className="py-28 bg-gradient-to-b from-[#030f24] to-[#020c1b]">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Định hướng chiến lược</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Tầm nhìn & Sứ mệnh</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="relative p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.07] to-transparent overflow-hidden group hover:border-cyan-500/35 transition-colors duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/[0.06] rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all" />
            <Eye className="w-8 h-8 text-cyan-400 mb-5" />
            <div className="text-cyan-400 text-xs uppercase tracking-widest mb-2">Vision</div>
            <h3 className="text-2xl font-bold text-white mb-5">Tầm nhìn</h3>
            <p className="text-gray-300 leading-relaxed text-sm mb-6">
              Trở thành tập đoàn công nghệ không gian — vệ tinh — dữ liệu — AI — tài chính số hàng đầu của Việt Nam, từng bước vươn ra khu vực và quốc tế, góp phần hình thành hệ sinh thái kinh tế không gian và kinh tế số do Việt Nam làm chủ.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm">
              CMC SpaceY đặt mục tiêu xây dựng hệ sinh thái nghiên cứu, tiếp nhận, vận hành và thương mại hóa các giải pháp vệ tinh, dữ liệu viễn thám, AI, nền tảng số, cổng thanh toán, sàn giao dịch tài sản số và dịch vụ tài chính số.
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.07] to-transparent group hover:border-violet-500/35 transition-colors duration-300">
            <Target className="w-8 h-8 text-violet-400 mb-5" />
            <div className="text-violet-400 text-xs uppercase tracking-widest mb-2">Mission</div>
            <h3 className="text-2xl font-bold text-white mb-5">Sứ mệnh</h3>
            <ul className="space-y-3.5">
              {missions.map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/15 border border-violet-500/20 flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  </div>
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
    {
      icon: Satellite,
      title: 'Công nghệ Vệ tinh',
      sub: 'Satellite Technology',
      desc: 'Nghiên cứu và làm chủ các dòng vệ tinh viễn thông, quan sát, viễn thám phục vụ kinh tế và dân sự.',
      color: '#06b6d4',
      border: 'hover:border-cyan-500/30',
      glow: 'hover:shadow-cyan-500/10',
    },
    {
      icon: Globe,
      title: 'Dữ liệu Viễn thám',
      sub: 'Remote Sensing Data',
      desc: 'Thu nhận, xử lý và thương mại hóa dữ liệu quan sát Trái Đất phục vụ quản lý tài nguyên, môi trường.',
      color: '#22d3ee',
      border: 'hover:border-sky-500/30',
      glow: 'hover:shadow-sky-500/10',
    },
    {
      icon: Brain,
      title: 'AI & Dữ liệu lớn',
      sub: 'AI & Big Data',
      desc: 'Ứng dụng trí tuệ nhân tạo vào toàn bộ chuỗi giá trị dữ liệu không gian từ thu nhận đến thương mại hóa.',
      color: '#8b5cf6',
      border: 'hover:border-violet-500/30',
      glow: 'hover:shadow-violet-500/10',
    },
    {
      icon: Zap,
      title: 'Năng lượng Không gian',
      sub: 'Space Solar Energy',
      desc: 'Nghiên cứu dài hạn về năng lượng mặt trời không gian, đánh giá tiềm năng khai thác và ứng dụng tương lai.',
      color: '#eab308',
      border: 'hover:border-yellow-500/30',
      glow: 'hover:shadow-yellow-500/10',
    },
    {
      icon: TrendingUp,
      title: 'Sàn Tài sản số',
      sub: 'Digital Asset Exchange',
      desc: 'Vận hành sàn giao dịch tài sản số, tài sản mã hóa theo cơ chế pháp lý được Nhà nước cấp phép.',
      color: '#f59e0b',
      border: 'hover:border-amber-500/30',
      glow: 'hover:shadow-amber-500/10',
    },
    {
      icon: CreditCard,
      title: 'Cổng Thanh toán',
      sub: 'Payment Gateway',
      desc: 'Thanh toán tích hợp cho dịch vụ vệ tinh, dữ liệu viễn thám, phần mềm và thiết bị kỹ thuật số.',
      color: '#10b981',
      border: 'hover:border-emerald-500/30',
      glow: 'hover:shadow-emerald-500/10',
    },
    {
      icon: Building2,
      title: 'Ngân hàng số',
      sub: 'Digital Banking',
      desc: 'Nghiên cứu thành lập ngân hàng thương mại, ngân hàng số và dịch vụ tài chính số phục vụ hệ sinh thái.',
      color: '#f97316',
      border: 'hover:border-orange-500/30',
      glow: 'hover:shadow-orange-500/10',
    },
    {
      icon: Smartphone,
      title: 'Phần mềm & Ứng dụng',
      sub: 'Software & Apps',
      desc: 'Phát triển ứng dụng di động, mạng xã hội chuyên ngành và API mở kết nối hệ sinh thái CMC SpaceY.',
      color: '#ec4899',
      border: 'hover:border-pink-500/30',
      glow: 'hover:shadow-pink-500/10',
    },
  ]

  return (
    <section id="business" className="py-28 bg-[#020c1b]">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Lĩnh vực hoạt động</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">8 Lĩnh vực Cốt lõi</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Hệ sinh thái tích hợp từ công nghệ vệ tinh đến nền tảng số, tài chính và dịch vụ gia tăng — tất cả do Việt Nam làm chủ.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {areas.map((area, i) => {
            const Icon = area.icon
            return (
              <div
                key={i}
                className={`group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] ${area.border}
                            hover:bg-white/[0.05] hover:shadow-2xl ${area.glow} transition-all duration-300 cursor-default`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ background: `${area.color}18` }}
                >
                  <Icon className="w-5 h-5" style={{ color: area.color }} />
                </div>
                <div className="text-white font-semibold text-sm mb-1 leading-tight">{area.title}</div>
                <div className="text-[10px] uppercase tracking-widest mb-3 font-medium" style={{ color: area.color }}>
                  {area.sub}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{area.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Infrastructure ───────────────────────────────────────────────────────────
const Infrastructure = () => {
  const ref = useFadeIn()
  const centers = [
    {
      icon: Brain,
      title: 'Trung tâm R&D',
      sub: 'Nghiên cứu & Phát triển',
      desc: 'Nghiên cứu công nghệ vệ tinh, phát triển thuật toán AI và hợp tác với viện, trường đại học trong nước.',
      num: '01',
      color: '#06b6d4',
    },
    {
      icon: Rocket,
      title: 'Sản xuất Vệ tinh',
      sub: 'Lắp ráp & Thử nghiệm',
      desc: 'Lắp ráp, tích hợp và thử nghiệm vệ tinh, sản xuất thiết bị phụ trợ, hình thành chuỗi cung ứng công nghệ cao.',
      num: '02',
      color: '#8b5cf6',
    },
    {
      icon: Database,
      title: 'Điều hành & Dữ liệu',
      sub: 'Vận hành Vệ tinh',
      desc: 'Điều hành vệ tinh, tiếp nhận, xử lý và phân tích dữ liệu không gian, quản lý bảo mật thông tin.',
      num: '03',
      color: '#10b981',
    },
    {
      icon: CreditCard,
      title: 'Phần mềm & Thanh toán',
      sub: 'Nền tảng số',
      desc: 'Phát triển ứng dụng di động, cổng thanh toán, mạng xã hội và toàn bộ hệ sinh thái số của CMC SpaceY.',
      num: '04',
      color: '#f59e0b',
    },
    {
      icon: Users,
      title: 'Đào tạo Nhân lực',
      sub: 'Nguồn nhân lực CNC',
      desc: 'Đào tạo kỹ sư vệ tinh, chuyên gia viễn thám, AI, phần mềm và nhà quản lý dự án công nghệ cao.',
      num: '05',
      color: '#ec4899',
    },
  ]

  return (
    <section id="infrastructure" className="py-28 bg-gradient-to-b from-[#030f24] to-[#020c1b]">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Hạ tầng chiến lược</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">5 Trung tâm tại Việt Nam</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed mb-4">
            Hệ sinh thái hạ tầng khép kín — từ nghiên cứu đến sản xuất, điều hành, phần mềm và đào tạo nhân lực.
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-gray-600">
            <MapPin className="w-3.5 h-3.5" />
            Dự kiến tại Saigon Silicon — Khu Công nghệ cao TP. Hồ Chí Minh
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {centers.map((c, i) => {
            const Icon = c.icon
            return (
              <div
                key={i}
                className="relative group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 text-center"
              >
                <div
                  className="text-5xl font-black opacity-[0.06] absolute top-4 right-4 leading-none select-none"
                  style={{ color: c.color }}
                >
                  {c.num}
                </div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${c.color}18` }}
                >
                  <Icon className="w-6 h-6" style={{ color: c.color }} />
                </div>
                <div className="text-white font-semibold text-sm mb-1">{c.title}</div>
                <div className="text-[10px] uppercase tracking-widest mb-3 font-medium" style={{ color: c.color }}>
                  {c.sub}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
const Services = () => {
  const ref = useFadeIn()
  const cats = [
    {
      emoji: '🌾',
      title: 'Nông nghiệp Công nghệ cao',
      items: ['Theo dõi cây trồng & mùa vụ', 'Quản lý đất và nước', 'Phát hiện sâu bệnh, hạn hán', 'Tối ưu hóa sản xuất', 'Truy xuất nguồn gốc vùng nguyên liệu'],
    },
    {
      emoji: '🚢',
      title: 'Logistics & Hàng hải',
      items: ['Theo dõi tuyến vận tải', 'Giám sát tàu thuyền', 'Quản lý cảng biển', 'Tối ưu chuỗi cung ứng', 'Kết nối vùng xa bờ'],
    },
    {
      emoji: '🌍',
      title: 'Tài nguyên & Môi trường',
      items: ['Giám sát rừng & đất đai', 'Theo dõi xâm nhập mặn', 'Biến đổi khí hậu', 'Phòng chống thiên tai', 'Giám sát ô nhiễm'],
    },
    {
      emoji: '🏙️',
      title: 'Đô thị thông minh',
      items: ['Quy hoạch đô thị & hạ tầng', 'Giám sát giao thông', 'Quản lý năng lượng đô thị', 'Giám sát công trình', 'Dịch vụ thông minh'],
    },
    {
      emoji: '💳',
      title: 'Tài chính số',
      items: ['Cổng thanh toán dịch vụ vệ tinh', 'Sàn tài sản số được cấp phép', 'Ngân hàng số', 'API dữ liệu không gian', 'Thuê bao & trả theo dùng'],
    },
    {
      emoji: '📡',
      title: 'Kết nối Vệ tinh',
      items: ['Vùng sâu, vùng xa', 'Hải đảo & xa bờ', 'Hạ tầng dự phòng', 'Ứng phó thiên tai khẩn cấp', 'Viễn thông hàng hải'],
    },
  ]

  return (
    <section id="services" className="py-28 bg-[#020c1b]">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Dịch vụ ứng dụng</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">Giải pháp cho mọi ngành</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Từ nông nghiệp đến logistics, từ môi trường đến tài chính số — CMC SpaceY mang dữ liệu không gian vào từng ngành kinh tế.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cats.map((cat, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300 group"
            >
              <div className="text-3xl mb-4">{cat.emoji}</div>
              <h3 className="text-white font-semibold mb-5 text-sm">{cat.title}</h3>
              <ul className="space-y-2.5">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-gray-500 text-xs">
                    <div className="w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
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
    {
      num: '01',
      title: 'Nền tảng pháp lý',
      items: ['Hoàn thiện hồ sơ pháp lý', 'Xây dựng chiến lược phát triển', 'Làm việc với cơ quan quản lý', 'Xây dựng đội ngũ chuyên gia'],
      color: '#06b6d4',
    },
    {
      num: '02',
      title: 'Xây dựng Hạ tầng',
      items: ['Triển khai trung tâm R&D', 'Trung tâm dữ liệu vệ tinh AI', 'Cơ sở đào tạo nhân lực', 'Nền tảng phần mềm & thanh toán'],
      color: '#8b5cf6',
    },
    {
      num: '03',
      title: 'Phát triển Sản phẩm',
      items: ['Dịch vụ dữ liệu viễn thám', 'Giải pháp nông nghiệp', 'Giải pháp logistics', 'Cổng thanh toán & ứng dụng'],
      color: '#10b981',
    },
    {
      num: '04',
      title: 'Mở rộng Hệ sinh thái',
      items: ['Hợp tác địa phương, bộ ngành', 'Thương mại hóa dịch vụ', 'Kinh tế không gian & số', 'Chuỗi cung ứng CNC'],
      color: '#f59e0b',
    },
    {
      num: '05',
      title: 'Vươn ra Khu vực',
      items: ['Dịch vụ dữ liệu khu vực', 'Hợp tác quốc tế', 'Thương hiệu Việt Nam', 'Trung tâm CNC toàn cầu'],
      color: '#ec4899',
    },
  ]

  return (
    <section id="roadmap" className="py-28 bg-gradient-to-b from-[#030f24] to-[#020c1b]">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Lộ trình phát triển</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">5 Giai đoạn Chiến lược</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Lộ trình phát triển từng bước bền vững — từ hoàn thiện pháp lý đến xây dựng hạ tầng, phát triển sản phẩm và vươn ra quốc tế.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 relative">
          {/* Connector */}
          <div className="hidden md:block absolute top-9 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          {phases.map((p, i) => (
            <div key={i} className="relative group">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300">
                {/* Phase number circle */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white mb-4 mx-auto md:mx-0"
                  style={{ background: `${p.color}30`, border: `1px solid ${p.color}40` }}
                >
                  {p.num}
                </div>
                <div className="text-[10px] uppercase tracking-widest font-medium mb-2" style={{ color: p.color }}>
                  Giai đoạn {p.num}
                </div>
                <h3 className="text-white font-semibold text-sm mb-4 leading-tight">{p.title}</h3>
                <ul className="space-y-2">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-500 text-xs leading-relaxed">
                      <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: p.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Strategic Value ──────────────────────────────────────────────────────────
const StrategicValue = () => {
  const ref = useFadeIn()
  const values = [
    {
      icon: TrendingUp,
      title: 'Kinh tế',
      desc: 'Hình thành ngành kinh tế không gian Việt Nam, mở ra doanh thu từ dữ liệu vệ tinh, AI không gian và tài chính số.',
      color: '#06b6d4',
    },
    {
      icon: Brain,
      title: 'Khoa học – Công nghệ',
      desc: 'Tạo động lực để Việt Nam tham gia sâu vào công nghệ vệ tinh, AI, dữ liệu lớn và công nghiệp phụ trợ cao.',
      color: '#8b5cf6',
    },
    {
      icon: Heart,
      title: 'Xã hội',
      desc: 'Kết nối vùng sâu xa, giáo dục & y tế từ xa, cảnh báo thiên tai, thu hẹp khoảng cách phát triển vùng miền.',
      color: '#ec4899',
    },
    {
      icon: Globe,
      title: 'Môi trường',
      desc: 'Nâng cao năng lực giám sát rừng, xâm nhập mặn, sạt lở, nguồn nước và biến đổi khí hậu trên diện rộng.',
      color: '#10b981',
    },
    {
      icon: Shield,
      title: 'Chuyển đổi số',
      desc: 'Kết nối dữ liệu vệ tinh với phần mềm, ứng dụng, cổng thanh toán và ngân hàng số phục vụ kinh tế quốc gia.',
      color: '#f59e0b',
    },
  ]

  return (
    <section className="py-28 bg-[#020c1b]">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Tác động chiến lược</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">Giá trị cho Việt Nam</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
            CMC SpaceY không chỉ là một doanh nghiệp — đây là nền tảng để Việt Nam vươn lên trong kỷ nguyên kinh tế không gian toàn cầu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 text-center"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${v.color}18` }}
                >
                  <Icon className="w-6 h-6" style={{ color: v.color }} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-3">{v.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
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
  <section className="py-20 border-y border-white/[0.05] bg-gradient-to-r from-[#020c1b] via-[#06111f] to-[#020c1b]">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <div className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">Nguyên tắc cốt lõi</div>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-12">
        Việt Nam làm chủ — Việt Nam kiểm soát — Việt Nam vận hành — Việt Nam khai thác
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Shield, label: 'Việt Nam làm chủ', sub: 'Vietnamese Owned' },
          { icon: Eye, label: 'Việt Nam kiểm soát', sub: 'Vietnamese Controlled' },
          { icon: Users, label: 'Việt Nam vận hành', sub: 'Vietnamese Operated' },
          { icon: Award, label: 'Việt Nam khai thác', sub: 'Vietnamese Benefited' },
        ].map((p, i) => {
          const Icon = p.icon
          return (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-cyan-500/20 bg-cyan-500/[0.07] flex items-center justify-center">
                <Icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-white text-sm font-semibold">{p.label}</div>
              <div className="text-gray-600 text-[10px] uppercase tracking-widest">{p.sub}</div>
            </div>
          )
        })}
      </div>
    </div>
  </section>
)

// ─── Vision 2040 ──────────────────────────────────────────────────────────────
const Vision2040 = () => {
  const ref = useFadeIn()
  return (
    <section className="relative py-36 overflow-hidden bg-[#020c1b]">
      <StarField count={120} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_30%_40%,rgba(6,182,212,0.07),transparent)]" />

      <div ref={ref} className="fade-section relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-6">Tầm nhìn 2040</div>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
          Biểu tượng mới của{' '}
          <span className="gradient-text">Khát vọng Công nghệ Việt Nam</span>
        </h2>

        <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
          Đến năm 2040, CMC SpaceY Group JSC. trở thành tập đoàn công nghệ không gian — dữ liệu — AI — viễn thông — tài chính số có quy mô khu vực, lấy Việt Nam làm trung tâm điều hành và thương mại hóa dịch vụ.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {[
            { val: '100%', label: 'Vốn sở hữu Việt Nam', color: '#06b6d4' },
            { val: 'Khu vực', label: 'Tầm vóc hướng tới', color: '#8b5cf6' },
            { val: '2040', label: 'Mục tiêu dài hạn', color: '#f59e0b' },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.03]">
              <div className="text-3xl font-black mb-2" style={{ color: item.color }}>{item.val}</div>
              <div className="text-gray-500 text-sm">{item.label}</div>
            </div>
          ))}
        </div>

        <blockquote className="border-l-4 border-cyan-400 pl-6 text-left max-w-2xl mx-auto">
          <p className="text-gray-300 text-xl italic leading-relaxed">
            "Tự chủ, sáng tạo, hội nhập và vươn lên chinh phục không gian."
          </p>
          <footer className="mt-3 text-cyan-400 text-sm">— CMC SpaceY Group JSC.</footer>
        </blockquote>
      </div>
    </section>
  )
}

// ─── Contact CTA ──────────────────────────────────────────────────────────────
const ContactCTA = () => (
  <section id="contact" className="py-24 bg-gradient-to-b from-[#030f24] to-[#020c1b]">
    <div className="max-w-3xl mx-auto px-6 text-center">
      <div className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Hợp tác</div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
        Cùng xây dựng tương lai công nghệ không gian Việt Nam
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed mb-10">
        CMC SpaceY Group JSC. chào đón các đối tác, nhà đầu tư, cơ quan nhà nước và chuyên gia cùng tham gia hành trình khai phóng tiềm năng không gian Việt Nam.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="mailto:contact@cmcspacey.vn"
          className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full
                     hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-xl shadow-cyan-500/20"
        >
          Liên hệ hợp tác
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href="#about"
          className="px-8 py-3.5 border border-white/15 text-white text-sm rounded-full hover:bg-white/[0.05] hover:border-white/25 transition-all duration-300"
        >
          Tìm hiểu thêm
        </a>
      </div>
    </div>
  </section>
)

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="border-t border-white/[0.06] bg-[#020c1b] py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Satellite className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">CMC SpaceY</div>
              <div className="text-cyan-400 text-[10px] font-medium tracking-widest uppercase">Group JSC.</div>
            </div>
          </div>
          <p className="text-gray-600 text-xs leading-relaxed mb-4">
            Tập đoàn Công nghệ Không gian — Vệ tinh — Dữ liệu — AI — Tài chính số 100% vốn sở hữu Việt Nam.
          </p>
          <p className="text-gray-700 text-xs italic">"Khai phóng tiềm năng không gian Việt Nam"</p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-5">Lĩnh vực</h4>
          <ul className="space-y-2.5">
            {['Công nghệ Vệ tinh', 'Dữ liệu Viễn thám', 'AI & Dữ liệu lớn', 'Sàn Tài sản số', 'Cổng Thanh toán', 'Ngân hàng số'].map((item) => (
              <li key={item} className="text-gray-600 text-xs hover:text-gray-400 cursor-pointer transition-colors">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-5">Thông tin</h4>
          <div className="space-y-4">
            {[
              { label: 'Trụ sở chính', value: 'Việt Nam' },
              { label: 'Hạ tầng trọng điểm', value: 'Khu CNC TP. Hồ Chí Minh' },
              { label: 'Mô hình sở hữu', value: '100% vốn Việt Nam' },
              { label: 'Lĩnh vực', value: 'Không gian · Dữ liệu · AI · Tài chính số' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-gray-700 text-[10px] uppercase tracking-widest mb-1">{item.label}</div>
                <div className="text-gray-500 text-xs">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-gray-700 text-xs">© 2025 CMC SpaceY Group JSC. All rights reserved.</div>
        <div className="text-gray-700 text-xs">Tập đoàn Công nghệ Không gian Việt Nam</div>
      </div>
    </div>
  </footer>
)

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-[#020c1b]">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <VisionMission />
      <BusinessAreas />
      <Infrastructure />
      <Services />
      <Roadmap />
      <StrategicValue />
      <Principles />
      <Vision2040 />
      <ContactCTA />
      <Footer />
    </div>
  )
}
