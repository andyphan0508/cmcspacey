import { useState, useEffect, useMemo, useRef } from 'react'
import {
  Satellite, Globe, Brain, TrendingUp, CreditCard, Building2,
  Zap, Smartphone, ChevronDown, Menu, X,
  MapPin, Shield, Rocket, Target, Eye, Heart, Users, Database,
  Layers, Award, ArrowRight, CheckCircle2, ChevronRight
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

// ─── Tech Data Field (Replaces dark starfield with light tech grid nodes) ───
const DataField = ({ count = 60 }) => {
  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${(Math.random() * 4).toFixed(2)}s`,
        duration: `${(3 + Math.random() * 5).toFixed(2)}s`,
        size: Math.random() > 0.7 ? 4 : 2,
        color: Math.random() > 0.5 ? 'bg-cyan-400' : 'bg-indigo-400',
      })),
    [count]
  )
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {nodes.map((n) => (
        <div
          key={n.id}
          className={`absolute rounded-full ${n.color} animate-pulse`}
          style={{
            top: n.top,
            left: n.left,
            width: n.size,
            height: n.size,
            animationDelay: n.delay,
            animationDuration: n.duration,
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
    const onScroll = () => setScrolled(window.scrollY > 40)
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/35 transition-all">
            <Satellite className="w-5 h-5 text-white" />
          </div>
          <div className="leading-none">
            <div className="text-slate-900 font-extrabold text-base tracking-tight">CMC SpaceY</div>
            <div className="text-cyan-600 text-[10px] font-bold tracking-widest uppercase mt-0.5">Group JSC.</div>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-slate-600 hover:text-cyan-600 font-medium text-sm transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-full
                       hover:from-cyan-500 hover:to-indigo-500 transition-all duration-300 shadow-md shadow-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            Hợp tác
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-slate-800 p-1" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 px-6 pb-6 pt-3 shadow-lg">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-slate-700 hover:text-cyan-600 font-semibold text-sm border-b border-slate-100 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block mt-5 text-center py-3 text-sm font-semibold bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-full shadow-md"
          >
            Hợp tác ngay
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero Redesign (Split layout with premium AI generated image asset) ───────────────────
const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-gradient-to-b from-blue-50/70 via-indigo-50/20 to-white">
    <DataField count={80} />

    {/* Background meshes */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(6,182,212,0.1),transparent)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_65%,rgba(99,102,241,0.06),transparent)]" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Text Contents */}
        <div className="lg:col-span-7 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-200 bg-cyan-50 text-cyan-700 text-xs font-semibold mb-6 backdrop-blur-sm shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Khai phá tiềm năng vũ trụ · Vệ tinh · AI · Tài chính số
          </div>

          {/* Title */}
          <h1 className="font-black tracking-tight text-slate-900 leading-none mb-6">
            <span className="block text-7xl md:text-8xl lg:text-[100px] leading-tight font-extrabold">CMC</span>
            <span className="block text-7xl md:text-8xl lg:text-[100px] leading-none gradient-text font-black">SpaceY</span>
            <span className="block text-lg md:text-xl font-bold text-slate-400 mt-4 tracking-widest uppercase">
              Group JSC.
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-slate-800 font-medium mb-4 leading-snug">
            Khai phóng tiềm năng không gian Việt Nam
          </p>
          <p className="text-slate-600 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            Tập đoàn công nghệ tiên phong sở hữu 100% dòng vốn Việt Nam — đi đầu trong lĩnh vực hạ tầng vệ tinh, phân tích dữ liệu không gian, trí tuệ nhân tạo (AI) và kinh tế số.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#about"
              className="w-full sm:w-auto group flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold rounded-full
                         hover:from-cyan-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              Khám phá ngay
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#business"
              className="w-full sm:w-auto text-center px-8 py-4 border border-slate-200 text-slate-700 bg-white font-semibold rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm"
            >
              Lĩnh vực hoạt động
            </a>
          </div>
        </div>

        {/* Right: Premium AI Image and Planetary Ring decoration */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          {/* Animated decorative orbit rings behind the image */}
          <div className="absolute w-[440px] h-[440px] rounded-full border border-cyan-200/50 animate-orbit pointer-events-none" />
          <div className="absolute w-[360px] h-[360px] rounded-full border border-indigo-200/40 animate-orbit-reverse pointer-events-none" />
          
          {/* Glowing Orb Planet decoration */}
          <div className="absolute right-[-40px] top-[-30px] w-20 h-20 rounded-full planet z-0 animate-float-slow opacity-90 hidden sm:block" />

          {/* Main Visual Image */}
          <div className="relative z-10 p-4 bg-white/75 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-2xl shadow-cyan-500/10">
            <img 
              src="/images/hero_satellite.png" 
              alt="CMC SpaceY Satellite Mission" 
              className="w-full max-w-[380px] h-auto rounded-2xl object-cover hover:scale-105 transition-transform duration-500" 
            />
            
            {/* Float Badge */}
            <div className="absolute bottom-8 -left-6 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-200 shadow-lg flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Hạ tầng vệ tinh</p>
                <p className="text-xs text-slate-800 font-extrabold">100% làm chủ tại VN</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400">
      <span className="text-[10px] uppercase font-bold tracking-widest">Cuộn xuống</span>
      <ChevronDown className="w-5 h-5 animate-bounce text-cyan-500" />
    </div>
  </section>
)

// ─── Stats Bar Redesign (Vibrant and bright metrics) ──────────────────────────────────
const Stats = () => {
  const items = [
    { value: '100%', label: 'Vốn sở hữu Việt Nam', icon: Shield, color: 'from-cyan-500 to-blue-600', iconColor: 'text-cyan-600', bgColor: 'bg-cyan-50' },
    { value: '8 Core', label: 'Lĩnh vực cốt lõi', icon: Layers, color: 'from-indigo-500 to-purple-600', iconColor: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { value: '5 Center', label: 'Trung tâm hạ tầng', icon: Building2, color: 'from-emerald-500 to-teal-600', iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { value: '2040', label: 'Tầm nhìn chiến lược', icon: Target, color: 'from-amber-500 to-orange-600', iconColor: 'text-amber-600', bgColor: 'bg-amber-50' },
  ]
  return (
    <section className="border-y border-slate-200/80 bg-white relative z-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-slate-100">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="text-center px-4 group flex flex-col items-center justify-center">
                <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <div className="text-3xl md:text-4xl font-black mb-1 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{item.value}</div>
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{item.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── About Redesign (Crisp text and embedded space command center visual) ───────────
const About = () => {
  const ref = useFadeIn()
  const info = [
    { label: 'Tên doanh nghiệp', value: 'CMC SpaceY Group JSC.' },
    { label: 'Tên viết tắt', value: 'CMC SpaceY' },
    { label: 'Mô hình sở hữu', value: '100% vốn sở hữu của Việt Nam' },
    { label: 'Trụ sở chính', value: 'Việt Nam — Dự kiến tại Khu CNC TP. HCM (Saigon Silicon)' },
    { label: 'Định hướng kinh tế', value: 'Công nghệ không gian, dữ liệu viễn thám, xử lý AI, tài sản số và kinh tế số' },
  ]

  return (
    <section id="about" className="py-28 bg-slate-50/50 relative">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: General Corporate Information */}
          <div className="lg:col-span-6">
            <div className="text-cyan-600 text-xs font-bold uppercase tracking-[0.25em] mb-4">Về chúng tôi</div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-10 leading-tight">
              Tập đoàn Công nghệ <br />
              <span className="gradient-text font-black">Không gian Việt Nam</span>
            </h2>
            <div className="space-y-4">
              {info.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-cyan-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 mt-2 flex-shrink-0" />
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">{item.label}</div>
                    <div className="text-slate-800 text-sm font-bold leading-relaxed">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chairman Message & Space Command Center Visual */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Quote Card (Clean Glassmorphism) */}
            <div className="relative p-8 rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 glow-cyan">
              <div className="text-cyan-500/20 text-8xl font-serif leading-none absolute top-4 left-6 pointer-events-none">"</div>
              
              <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium relative z-10">
                CMC SpaceY Group JSC. được hình thành với khát vọng tham gia vào lĩnh vực công nghệ không gian, góp phần đưa Việt Nam xây dựng năng lực tự chủ về hạ tầng vệ tinh, dữ liệu không gian và các ứng dụng công nghệ cao phục vụ dân sự, kinh tế số, quản lý tài nguyên, logistics, hàng hải, nông nghiệp, đô thị thông minh và tài chính số.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 relative z-10">
                Trong bối cảnh thế giới bước vào kỷ nguyên kinh tế không gian, CMC SpaceY hướng tới vai trò tiên phong của Việt Nam trong việc kết nối công nghệ không gian với các nền tảng số phục vụ người dân và nền kinh tế.
              </p>
              
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100 relative z-10">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-xs text-white shadow-md shadow-cyan-500/20">
                  CMC
                </div>
                <div>
                  <div className="text-slate-900 font-extrabold text-sm">Chu Minh Chiến</div>
                  <div className="text-cyan-600 text-xs font-bold">Chủ tịch HĐQT CMC SpaceY Group JSC.</div>
                </div>
              </div>
            </div>

            {/* R&D command center illustration */}
            <div className="rounded-3xl border border-slate-200/60 overflow-hidden shadow-lg relative group">
              <img 
                src="/images/space_rd_center.png" 
                alt="CMC SpaceY R&D Center" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex items-end p-5">
                <div>
                  <p className="text-white font-bold text-sm">Mô hình Trung tâm R&D CMC SpaceY</p>
                  <p className="text-cyan-300 text-xs">Nghiên cứu & mô phỏng điều hành vệ tinh</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Vision & Mission Redesign ────────────────────────────────────────────────
const VisionMission = () => {
  const ref = useFadeIn()
  const missions = [
    'Nghiên cứu, tiếp nhận, phát triển và từng bước làm chủ công nghệ vệ tinh, dữ liệu viễn thám, AI',
    'Xây dựng hạ tầng nghiên cứu, sản xuất, điều hành và xử lý dữ liệu viễn thám tại Việt Nam',
    'Triển khai dịch vụ vệ tinh phục vụ kinh tế số, quản lý tài nguyên, logistics, hàng hải, nông nghiệp',
    'Phát triển cổng thanh toán, ứng dụng di động và mạng xã hội phục vụ hệ sinh thái CMC SpaceY',
    'Nghiên cứu sàn giao dịch tài sản số và dịch vụ tài chính số phù hợp quy định pháp luật',
    'Đào tạo và phát triển nguồn nhân lực công nghệ cao phục vụ phát triển kinh tế không gian Việt Nam',
  ]

  return (
    <section className="py-28 bg-white relative z-10">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-cyan-600 text-xs font-bold uppercase tracking-[0.25em] mb-4">Định hướng chiến lược</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">Tầm nhìn & Sứ mệnh</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Vision */}
          <div className="relative p-8 md:p-10 rounded-3xl border border-cyan-150 bg-gradient-to-br from-cyan-50/50 to-white overflow-hidden group hover:border-cyan-400 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100/30 rounded-full blur-3xl group-hover:bg-cyan-200/40 transition-all pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-cyan-600" />
            </div>
            <div className="text-cyan-600 text-xs uppercase font-extrabold tracking-wider mb-2">Vision</div>
            <h3 className="text-2xl font-black text-slate-900 mb-5">Tầm nhìn</h3>
            <p className="text-slate-600 leading-relaxed text-sm mb-6">
              Trở thành tập đoàn công nghệ không gian — vệ tinh — dữ liệu — AI — tài chính số hàng đầu của Việt Nam, từng bước vươn ra khu vực và quốc tế, góp phần hình thành hệ sinh thái kinh tế không gian và kinh tế số do người Việt Nam làm chủ.
            </p>
            <p className="text-slate-500 leading-relaxed text-sm">
              CMC SpaceY đặt mục tiêu xây dựng hạ tầng nghiên cứu, tiếp nhận, vận hành và thương mại hóa các giải pháp vệ tinh, dữ liệu viễn thám, AI, nền tảng số, cổng thanh toán, sàn giao dịch tài sản số và dịch vụ tài chính số.
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 md:p-10 rounded-3xl border border-indigo-150 bg-gradient-to-br from-indigo-50/50 to-white overflow-hidden group hover:border-indigo-400 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/30 rounded-full blur-3xl group-hover:bg-indigo-200/40 transition-all pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="text-indigo-600 text-xs uppercase font-extrabold tracking-wider mb-2">Mission</div>
            <h3 className="text-2xl font-black text-slate-900 mb-5">Sứ mệnh</h3>
            <ul className="space-y-4">
              {missions.map((m, i) => (
                <li key={i} className="flex items-start gap-3.5 text-slate-600 text-sm leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <span className="font-medium">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Business Areas Redesign (8 Glassmorphic Cards) ───────────────────────────────────
const BusinessAreas = () => {
  const ref = useFadeIn()
  const areas = [
    {
      icon: Satellite,
      title: 'Công nghệ Vệ tinh',
      sub: 'Satellite Technology',
      desc: 'Nghiên cứu và làm chủ các dòng vệ tinh viễn thông, quan sát, viễn thám phục vụ kinh tế và dân sự.',
      color: '#0284c7',
      bgColor: 'bg-sky-50',
      iconColor: 'text-sky-600',
      hoverGlow: 'hover:shadow-sky-100 hover:border-sky-300'
    },
    {
      icon: Globe,
      title: 'Dữ liệu Viễn thám',
      sub: 'Remote Sensing Data',
      desc: 'Thu nhận, xử lý và thương mại hóa dữ liệu quan sát Trái Đất phục vụ quản lý tài nguyên, môi trường.',
      color: '#06b6d4',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
      hoverGlow: 'hover:shadow-cyan-100 hover:border-cyan-300'
    },
    {
      icon: Brain,
      title: 'AI & Dữ liệu lớn',
      sub: 'AI & Big Data',
      desc: 'Ứng dụng trí tuệ nhân tạo vào toàn bộ chuỗi giá trị dữ liệu không gian từ thu nhận đến thương mại hóa.',
      color: '#4f46e5',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      hoverGlow: 'hover:shadow-indigo-100 hover:border-indigo-300'
    },
    {
      icon: Zap,
      title: 'Năng lượng Không gian',
      sub: 'Space Solar Energy',
      desc: 'Nghiên cứu dài hạn về năng lượng mặt trời không gian, đánh giá tiềm năng khai thác và ứng dụng tương lai.',
      color: '#d97706',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      hoverGlow: 'hover:shadow-amber-100 hover:border-amber-300'
    },
    {
      icon: TrendingUp,
      title: 'Sàn Tài sản số',
      sub: 'Digital Asset Exchange',
      desc: 'Vận hành sàn giao dịch tài sản số, tài sản mã hóa theo cơ chế pháp lý được Nhà nước cấp phép.',
      color: '#f59e0b',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      hoverGlow: 'hover:shadow-yellow-100 hover:border-yellow-300'
    },
    {
      icon: CreditCard,
      title: 'Cổng Thanh toán',
      sub: 'Payment Gateway',
      desc: 'Thanh toán tích hợp cho dịch vụ vệ tinh, dữ liệu viễn thám, phần mềm và thiết bị kỹ thuật số.',
      color: '#059669',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      hoverGlow: 'hover:shadow-emerald-100 hover:border-emerald-300'
    },
    {
      icon: Building2,
      title: 'Ngân hàng số',
      sub: 'Digital Banking',
      desc: 'Nghiên cứu thành lập ngân hàng thương mại, ngân hàng số và dịch vụ tài chính số phục vụ hệ sinh thái.',
      color: '#ea580c',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      hoverGlow: 'hover:shadow-orange-100 hover:border-orange-300'
    },
    {
      icon: Smartphone,
      title: 'Phần mềm & Ứng dụng',
      sub: 'Software & Apps',
      desc: 'Phát triển ứng dụng di động, mạng xã hội chuyên ngành và API mở kết nối hệ sinh thái CMC SpaceY.',
      color: '#db2777',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      hoverGlow: 'hover:shadow-pink-100 hover:border-pink-300'
    },
  ]

  return (
    <section id="business" className="py-28 bg-slate-50/50">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-cyan-600 text-xs font-bold uppercase tracking-[0.25em] mb-4">Lĩnh vực hoạt động</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">8 Lĩnh vực Cốt lõi</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed font-medium">
            Hệ sinh thái tích hợp từ công nghệ vệ tinh đến nền tảng số, tài chính và các dịch vụ giá trị gia tăng gia tăng khác do Việt Nam làm chủ.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, i) => {
            const Icon = area.icon
            return (
              <div
                key={i}
                className={`group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md ${area.hoverGlow}
                            hover:-translate-y-1.5 transition-all duration-300 cursor-default`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${area.bgColor} transition-transform group-hover:scale-110`}
                >
                  <Icon className={`w-6 h-6 ${area.iconColor}`} />
                </div>
                <div className="text-slate-900 font-extrabold text-sm mb-1 leading-tight">{area.title}</div>
                <div className={`text-[10px] uppercase tracking-widest mb-3 font-extrabold ${area.iconColor}`}>
                  {area.sub}
                </div>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed">{area.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Infrastructure Redesign (5 Centers with colored badges) ───────────────────────────
const Infrastructure = () => {
  const ref = useFadeIn()
  const centers = [
    {
      icon: Brain,
      title: 'Trung tâm R&D',
      sub: 'Nghiên cứu & Phát triển',
      desc: 'Nghiên cứu công nghệ vệ tinh, phát triển thuật toán AI và liên kết hợp tác với các viện, trường đại học hàng đầu.',
      num: '01',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-600'
    },
    {
      icon: Rocket,
      title: 'Sản xuất Vệ tinh',
      sub: 'Lắp ráp & Thử nghiệm',
      desc: 'Lắp ráp, tích hợp và thử nghiệm vệ tinh, sản xuất thiết bị phụ trợ, hình thành chuỗi cung ứng công nghệ cao.',
      num: '02',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    {
      icon: Database,
      title: 'Điều hành & Dữ liệu',
      sub: 'Vận hành Vệ tinh',
      desc: 'Điều hành vệ tinh viễn thám, tiếp nhận, giải mã, xử lý dữ liệu không gian lớn và bảo mật thông tin.',
      num: '03',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      icon: CreditCard,
      title: 'Phần mềm & Fintech',
      sub: 'Nền tảng số',
      desc: 'Phát triển ứng dụng di động, tích hợp thanh toán, quản trị tài sản số và hệ sinh thái số CMC SpaceY.',
      num: '04',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      icon: Users,
      title: 'Đào tạo Nhân lực',
      sub: 'Nguồn nhân lực CNC',
      desc: 'Đào tạo kỹ sư vệ tinh, chuyên gia viễn thám, xử lý dữ liệu AI, lập trình viên phần mềm hàng đầu Việt Nam.',
      num: '05',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600'
    },
  ]

  return (
    <section id="infrastructure" className="py-28 bg-white relative">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-cyan-600 text-xs font-bold uppercase tracking-[0.25em] mb-4">Hạ tầng chiến lược</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">5 Trung tâm tại Việt Nam</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed font-medium mb-5">
            Hệ sinh thái hạ tầng khép kín do người Việt vận hành — kết nối nghiên cứu học thuật với hoạt động sản xuất công nghiệp thực tế.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-xs text-slate-600 font-semibold shadow-sm">
            <MapPin className="w-4 h-4 text-cyan-600" />
            Dự kiến đặt tại Saigon Silicon — Khu Công nghệ cao TP. Hồ Chí Minh
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {centers.map((c, i) => {
            const Icon = c.icon
            return (
              <div
                key={i}
                className="relative group p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-350 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
              >
                {/* Big faint outline number */}
                <div
                  className="text-5xl font-black absolute top-4 right-4 leading-none select-none opacity-10 font-mono"
                >
                  {c.num}
                </div>
                
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${c.bgColor} transition-transform group-hover:scale-115`}
                >
                  <Icon className={`w-6 h-6 ${c.iconColor}`} />
                </div>
                
                <div className="text-slate-900 font-extrabold text-sm mb-1">{c.title}</div>
                <div className={`text-[10px] uppercase tracking-widest mb-3 font-extrabold ${c.iconColor}`}>
                  {c.sub}
                </div>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed">{c.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Services Redesign (Tabs/Grid with agriculture & fintech generated visuals) ──────────────────────
const Services = () => {
  const ref = useFadeIn()
  const cats = [
    {
      emoji: '🌾',
      title: 'Nông nghiệp Công nghệ cao',
      items: ['Theo dõi cây trồng & dự báo mùa vụ', 'Quản lý độ ẩm đất & tối ưu tưới tiêu', 'Phát hiện sớm dịch bệnh, khô hạn', 'Tối ưu hóa sản lượng thu hoạch', 'Truy xuất nguồn gốc vùng nguyên liệu'],
    },
    {
      emoji: '🚢',
      title: 'Logistics & Hàng hải',
      items: ['Theo dõi hành trình phương tiện vận tải', 'Giám sát tàu thuyền đánh cá xa bờ', 'Quản lý điều hành hạ tầng cảng biển', 'Tối ưu chuỗi cung ứng logistics', 'Khai thác viễn thông vệ tinh biển'],
    },
    {
      emoji: '🌍',
      title: 'Tài nguyên & Môi trường',
      items: ['Giám sát biến động diện tích rừng', 'Theo dõi xâm nhập mặn & sạt lở', 'Quan trắc biến đổi khí hậu', 'Cảnh báo sớm lũ lụt, thiên tai', 'Giám sát mức độ ô nhiễm không khí'],
    },
    {
      emoji: '🏙️',
      title: 'Đô thị thông minh',
      items: ['Quy hoạch đô thị & quản lý hạ tầng', 'Giám sát mật độ giao thông đô thị', 'Quản lý mạng lưới năng lượng thông minh', 'Giám sát kết cấu công trình xây dựng lớn', 'Cung cấp nền tảng bản đồ số 3D'],
    },
    {
      emoji: '💳',
      title: 'Tài chính số & Fintech',
      items: ['Cổng thanh toán dịch vụ dữ liệu viễn thám', 'Sàn giao dịch tài sản số được cấp phép', 'Nghiên cứu mô hình ngân hàng số tiện lợi', 'Cung cấp API dữ liệu không gian mở', 'Thanh toán thuê bao dịch vụ Cloud'],
    },
    {
      emoji: '📡',
      title: 'Kết nối Vệ tinh diện rộng',
      items: ['Phủ sóng Internet vùng núi sâu xa', 'Kết nối hải đảo & thiết bị ngoài khơi', 'Hạ tầng dự phòng an ninh quốc gia', 'Ứng phó liên lạc khẩn cấp khi thiên tai', 'Cung cấp thuê bao truyền dữ liệu IoT'],
    },
  ]

  return (
    <section id="services" className="py-28 bg-slate-50/50 relative z-10">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16">
          <div className="text-cyan-600 text-xs font-bold uppercase tracking-[0.25em] mb-4">Dịch vụ ứng dụng</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">Giải pháp cho mọi ngành</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed font-medium">
            Từ nông nghiệp công nghệ cao đến hạ tầng logistics, môi trường và tài chính số — CMC SpaceY mang dữ liệu viễn thám và AI vào thực tiễn kinh tế.
          </p>
        </div>

        {/* 2-Column Redesign showcasing AI Images and Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Visual Showcase Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
            
            {/* Visual Panel 1: Smart Agriculture */}
            <div className="p-4 bg-white border border-slate-200 rounded-3xl shadow-md">
              <img 
                src="/images/smart_agri_sensing.png" 
                alt="Smart Agriculture Satellite Imaging" 
                className="w-full h-40 object-cover rounded-2xl mb-4" 
              />
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-700 rounded-md">Ứng dụng thực tế</span>
                <span className="text-xs text-slate-400 font-bold">Nông nghiệp số</span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-950">Viễn thám & Quản lý vụ mùa</h4>
              <p className="text-slate-500 text-[11px] font-semibold leading-relaxed mt-1">Phân tích dữ liệu ảnh hồng ngoại của vệ tinh để dự báo sâu bệnh, chỉ số dinh dưỡng cây trồng tự động.</p>
            </div>

            {/* Visual Panel 2: Fintech exchange */}
            <div className="p-4 bg-white border border-slate-200 rounded-3xl shadow-md">
              <img 
                src="/images/fintech_exchange.png" 
                alt="Fintech Exchange and digital payment" 
                className="w-full h-40 object-cover rounded-2xl mb-4" 
              />
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-700 rounded-md">Mô hình Fintech</span>
                <span className="text-xs text-slate-400 font-bold">Thanh toán & tài sản số</span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-950">Hệ sinh thái giao dịch tài chính số</h4>
              <p className="text-slate-500 text-[11px] font-semibold leading-relaxed mt-1">Tích hợp cổng thanh toán trực tuyến cho các hợp đồng dữ liệu, hỗ trợ lưu ký tài sản mã hóa tuân thủ pháp luật.</p>
            </div>

          </div>

          {/* Right Column: Grid list of Services */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cats.map((cat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-350 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl mb-4">{cat.emoji}</div>
                  <h3 className="text-slate-900 font-extrabold mb-4 text-base">{cat.title}</h3>
                  <ul className="space-y-3">
                    {cat.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-slate-500 text-xs font-semibold leading-relaxed">
                        <ChevronRight className="w-3.5 h-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

// ─── Roadmap Redesign (Timeline format with glowing steps) ───────────────────────────
const Roadmap = () => {
  const ref = useFadeIn()
  const phases = [
    {
      num: '01',
      title: 'Nền tảng pháp lý & Nhân lực',
      items: ['Hoàn thiện hồ sơ thành lập doanh nghiệp', 'Lập đề án chiến lược phát triển 2026 - 2030', 'Ký kết hợp tác đào tạo chuyên gia quốc tế', 'Đệ trình cấp phép tần số, hạ tầng vệ tinh'],
      color: 'bg-cyan-500 border-cyan-400 text-cyan-600',
      shadow: 'shadow-cyan-500/10'
    },
    {
      num: '02',
      title: 'Xây dựng Hạ tầng kỹ thuật',
      items: ['Thiết lập phòng thí nghiệm R&D cơ bản', 'Triển khai Data Center lưu trữ ảnh viễn thám', 'Sản xuất thử nghiệm thiết bị phụ trợ mặt đất', 'Công bố cổng thanh toán thử nghiệm'],
      color: 'bg-indigo-500 border-indigo-400 text-indigo-600',
      shadow: 'shadow-indigo-500/10'
    },
    {
      num: '03',
      title: 'Phát triển & Thương mại dịch vụ',
      items: ['Cung cấp dữ liệu viễn thám cho doanh nghiệp', 'Thương mại gói giải pháp nông nghiệp số', 'Tích hợp thanh toán dịch vụ hàng hải IoT', 'Vận hành sàn giao dịch tài sản số thử nghiệm'],
      color: 'bg-emerald-500 border-emerald-400 text-emerald-600',
      shadow: 'shadow-emerald-500/10'
    },
    {
      num: '04',
      title: 'Mở rộng quy mô thị trường',
      items: ['Liên kết dữ liệu quốc phòng, phòng chống thiên tai', 'Thương mại hóa diện rộng cổng API viễn thám', 'Chuyển giao giải pháp quản lý tài nguyên địa phương', 'Phát hành ví điện tử chuyên biệt kinh tế số'],
      color: 'bg-amber-500 border-amber-400 text-amber-600',
      shadow: 'shadow-amber-500/10'
    },
    {
      num: '05',
      title: 'Vươn tầm khu vực & Vũ trụ',
      items: ['Chuẩn bị hồ sơ phóng chùm vệ tinh mini Việt Nam', 'Xuất khẩu dịch vụ dữ liệu viễn thám ra Đông Nam Á', 'Liên minh công nghệ không gian khu vực châu Á', 'Đóng góp hạ tầng trung tâm CNC toàn cầu'],
      color: 'bg-pink-500 border-pink-400 text-pink-600',
      shadow: 'shadow-pink-500/10'
    },
  ]

  return (
    <section id="roadmap" className="py-28 bg-white relative z-10">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16">
          <div className="text-cyan-600 text-xs font-bold uppercase tracking-[0.25em] mb-4">Lộ trình phát triển</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">5 Giai đoạn Chiến lược</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed font-medium">
            Lộ trình phát triển bài bản từng bước để đảm bảo tính khả thi cao nhất, kết hợp nghiên cứu khoa học với tính thương mại hóa vững chắc.
          </p>
        </div>

        {/* Timeline block */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          
          {/* Desktop timeline connecting line */}
          <div className="hidden md:block absolute top-[26px] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-cyan-200 via-indigo-200 to-pink-200 pointer-events-none" />

          {phases.map((p, i) => (
            <div key={i} className="relative group">
              <div className={`p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-350 shadow-md hover:shadow-lg ${p.shadow} transition-all duration-300`}>
                
                {/* Milestone Node */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white mb-4 mx-auto md:mx-0 ${p.color} shadow-md`}
                >
                  {p.num}
                </div>
                
                <div className={`text-[10px] uppercase tracking-widest font-extrabold mb-2 ${p.color.split(' ').pop()}`}>
                  Giai đoạn {p.num}
                </div>
                
                <h3 className="text-slate-950 font-extrabold text-sm mb-4 leading-tight min-h-[40px]">{p.title}</h3>
                
                <ul className="space-y-2.5">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-slate-500 text-xs font-semibold leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-slate-300 group-hover:bg-cyan-500 transition-colors" />
                      <span>{item}</span>
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

// ─── Strategic Value Redesign ──────────────────────────────────────────────────
const StrategicValue = () => {
  const ref = useFadeIn()
  const values = [
    {
      icon: TrendingUp,
      title: 'Tác động Kinh tế',
      desc: 'Hình thành ngành kinh tế không gian tại Việt Nam, khai thác nguồn doanh thu mới từ dịch vụ dữ liệu viễn thám, ứng dụng AI và sàn giao dịch số.',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'hover:border-cyan-400'
    },
    {
      icon: Brain,
      title: 'Khoa học – Công nghệ',
      desc: 'Làm chủ công nghệ vệ tinh, phát triển giải pháp Big Data & AI nội địa phục vụ giám sát lãnh thổ, chuyển giao công nghệ cho công nghiệp trong nước.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'hover:border-indigo-400'
    },
    {
      icon: Heart,
      title: 'Giá trị Xã hội',
      desc: 'Cải thiện liên lạc ở các vùng xa xôi, đảo xa qua viễn thông vệ tinh, tạo công cụ cảnh báo sớm thiên tai, thu hẹp khoảng cách phát triển số.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'hover:border-pink-400'
    },
    {
      icon: Globe,
      title: 'Môi trường bền vững',
      desc: 'Giám sát thảm thực vật rừng, theo dõi xâm nhập mặn Đồng bằng sông Cửu Long, đánh giá sạt lở đất đai miền núi để ứng phó biến đổi khí hậu.',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'hover:border-emerald-400'
    },
    {
      icon: Shield,
      title: 'Chuyển đổi số quốc gia',
      desc: 'Đóng góp hạ tầng dữ liệu vị trí vệ tinh đồng bộ với các phần mềm, mạng xã hội, ví điện tử giúp kiến tạo xã hội số toàn diện.',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'hover:border-amber-400'
    },
  ]

  return (
    <section className="py-28 bg-slate-50/50 relative z-10">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16">
          <div className="text-cyan-600 text-xs font-bold uppercase tracking-[0.25em] mb-4">Tác động chiến lược</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">Giá trị cho Việt Nam</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed font-medium">
            CMC SpaceY định vị mình không chỉ là dự án kinh doanh thương mại thông thường — đây là nỗ lực tự cường công nghệ của người Việt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <div
                key={i}
                className={`group p-6 rounded-2xl bg-white border border-slate-200 shadow-md ${v.borderColor} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${v.bgColor} transition-transform group-hover:scale-110`}
                >
                  <Icon className={`w-6 h-6 ${v.color}`} />
                </div>
                <h3 className="text-slate-900 font-extrabold text-sm mb-3">{v.title}</h3>
                <p className="text-slate-550 text-xs font-semibold leading-relaxed">{v.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Principles Redesign ───────────────────────────────────────────────────────
const Principles = () => (
  <section className="py-20 border-y border-slate-200 bg-white relative z-10">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <div className="text-cyan-600 text-xs font-bold uppercase tracking-[0.25em] mb-4">Nguyên tắc cốt lõi</div>
      <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-12 max-w-4xl mx-auto leading-snug">
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
            <div key={i} className="flex flex-col items-center gap-3.5 group">
              <div className="w-14 h-14 rounded-full border border-cyan-200 bg-cyan-50 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <Icon className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="text-slate-900 text-sm font-extrabold">{p.label}</div>
              <div className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">{p.sub}</div>
            </div>
          )
        })}
      </div>
    </div>
  </section>
)

// ─── Vision 2040 Redesign (High impact metrics block) ──────────────────────────
const Vision2040 = () => {
  const ref = useFadeIn()
  return (
    <section className="relative py-36 overflow-hidden bg-slate-50/30">
      <DataField count={50} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.05),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_30%_40%,rgba(6,182,212,0.04),transparent)]" />

      <div ref={ref} className="fade-section relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="text-cyan-600 text-xs font-bold uppercase tracking-[0.25em] mb-6">Tầm nhìn 2040</div>

        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
          Biểu tượng mới của{' '}
          <span className="gradient-text font-black">Khát vọng Công nghệ Việt Nam</span>
        </h2>

        <p className="text-slate-600 text-lg leading-relaxed mb-12 max-w-3xl mx-auto font-medium">
          Đến năm 2040, CMC SpaceY Group JSC. định hướng trở thành tập đoàn công nghệ vũ trụ — viễn thám — AI — tài chính số có tầm ảnh hưởng lớn, lấy Việt Nam làm cơ sở đầu não điều hành và thương mại hóa toàn cầu.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          {[
            { val: '100%', label: 'Vốn sở hữu Việt Nam', color: 'text-cyan-600', border: 'border-cyan-200' },
            { val: 'Khu vực', label: 'Tầm vóc hướng tới', color: 'text-indigo-600', border: 'border-indigo-200' },
            { val: '2040', label: 'Tầm nhìn dài hạn', color: 'text-amber-600', border: 'border-amber-200' },
          ].map((item, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${item.border} bg-white shadow-md`}>
              <div className={`text-3xl font-black mb-2 ${item.color}`}>{item.val}</div>
              <div className="text-slate-500 font-bold text-xs uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>

        <blockquote className="border-l-4 border-cyan-500 pl-6 text-left max-w-2xl mx-auto bg-white/50 backdrop-blur-sm p-4 rounded-r-xl border border-slate-200">
          <p className="text-slate-700 text-lg italic leading-relaxed font-medium">
            "Tự chủ hạ tầng không gian để kiến tạo tương lai phát triển bền vững cho nền kinh tế số nước nhà."
          </p>
          <footer className="mt-3 text-cyan-600 text-sm font-bold">— Chu Minh Chiến, Chủ tịch CMC SpaceY</footer>
        </blockquote>
      </div>
    </section>
  )
}

// ─── Contact CTA Redesign (Gradient Container) ──────────────────────────────────
const ContactCTA = () => (
  <section id="contact" className="py-24 bg-white relative z-10">
    <div className="max-w-4xl mx-auto px-6">
      <div className="relative p-10 md:p-14 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white overflow-hidden shadow-2xl text-center">
        
        {/* Background visual detail */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="text-cyan-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">Hợp tác phát triển</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-snug">
            Cùng xây dựng tương lai công nghệ không gian Việt Nam
          </h2>
          <p className="text-slate-350 text-sm leading-relaxed mb-10 font-light">
            CMC SpaceY Group JSC. nồng nhiệt chào đón các cơ quan Nhà nước, đối tác khoa học, quỹ đầu tư công nghệ và chuyên gia toàn cầu cùng đồng hành khai phóng tiềm năng kinh tế không gian.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:contact@cmcspacey.vn"
              className="w-full sm:w-auto group flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold rounded-full
                         hover:from-cyan-400 hover:to-indigo-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5"
            >
              Liên hệ hợp tác
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#about"
              className="w-full sm:w-auto text-center px-8 py-4 border border-white/20 text-white bg-white/5 font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              Tìm hiểu thêm
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// ─── Footer Redesign (Sleek light footer with clear text) ─────────────────────────────
const Footer = () => (
  <footer className="border-t border-slate-200 bg-slate-50 py-16 relative z-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Satellite className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-slate-900 font-extrabold text-sm">CMC SpaceY</div>
              <div className="text-cyan-600 text-[10px] font-bold tracking-widest uppercase">Group JSC.</div>
            </div>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed mb-4 font-semibold">
            Tập đoàn Công nghệ Không gian — Vệ tinh — Dữ liệu — AI — Tài chính số 100% vốn sở hữu Việt Nam.
          </p>
          <p className="text-slate-400 text-xs italic font-semibold">"Khai phóng tiềm năng không gian Việt Nam"</p>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="text-slate-900 text-sm font-extrabold mb-5">Lĩnh vực trọng tâm</h4>
          <ul className="space-y-3">
            {['Công nghệ Vệ tinh viễn thám', 'Phân tích dữ liệu không gian', 'Ứng dụng AI chuyên sâu', 'Hạ tầng Sàn tài sản số', 'Cổng thanh toán dịch vụ', 'Hệ sinh thái Ngân hàng số'].map((item) => (
              <li key={item} className="text-slate-500 text-xs hover:text-cyan-600 font-semibold cursor-pointer transition-colors">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Info Column */}
        <div>
          <h4 className="text-slate-900 text-sm font-extrabold mb-5">Thông tin tập đoàn</h4>
          <div className="space-y-4">
            {[
              { label: 'Trụ sở chính', value: 'Việt Nam' },
              { label: 'Đầu tư hạ tầng', value: 'Khu công nghệ cao TP. Hồ Chí Minh' },
              { label: 'Cơ cấu sở hữu', value: '100% dòng vốn Việt Nam' },
              { label: 'Lĩnh vực đăng ký', value: 'Công nghệ không gian · Phân tích dữ liệu · Kinh tế số' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">{item.label}</div>
                <div className="text-slate-650 text-xs font-semibold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-400 text-xs font-bold">
        <div>© 2026 CMC SpaceY Group JSC. All rights reserved.</div>
        <div className="text-slate-400">Tập đoàn Công nghệ Không gian Việt Nam</div>
      </div>
    </div>
  </footer>
)

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white">
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
