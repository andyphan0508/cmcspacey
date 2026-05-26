import { useState, useEffect, useMemo, useRef } from 'react'
import {
  Satellite, Globe, Brain, TrendingUp, CreditCard, Building2,
  Zap, Smartphone, ChevronDown, Menu, X,
  MapPin, Shield, Rocket, Target, Eye, Heart, Users, Database,
  Layers, Award, ArrowRight, CheckCircle2, ChevronRight, Activity, Map, Radio, Server, Anchor, Network, Compass
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

// ─── Tech Data Field (Deep space starry background nodes) ──────────────────────
const DataField = ({ count = 80 }) => {
  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${(Math.random() * 4).toFixed(2)}s`,
        duration: `${(3 + Math.random() * 5).toFixed(2)}s`,
        size: Math.random() > 0.8 ? (Math.random() > 0.5 ? 4 : 3) : 1.5,
        color: Math.random() > 0.6 ? (Math.random() > 0.5 ? 'bg-amber-400' : 'bg-cyan-400') : 'bg-indigo-400',
      })),
    [count]
  )
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 z-0">
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
    { label: 'Quỹ đạo & Vệ tinh', href: '#orbits' },
    { label: 'Công nghệ Thăm dò', href: '#mining' },
    { label: 'Hạ tầng & Cảng vũ trụ', href: '#infrastructure' },
    { label: 'Dịch vụ', href: '#services' },
    { label: 'Mạng lưới & Lộ trình', href: '#roadmap' },
  ]

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:shadow-amber-500/20 transition-all duration-300">
            <Satellite className="w-5.5 h-5.5 text-white" />
          </div>
          <div className="leading-none">
            <div className="text-white font-extrabold text-base tracking-tight transition-colors group-hover:text-amber-400">CMC SpaceY</div>
            <div className="text-amber-400 text-[10px] font-bold tracking-widest uppercase mt-0.5">Group JSC.</div>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden xl:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-slate-350 hover:text-amber-400 font-semibold text-sm transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 text-sm font-bold bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 text-white rounded-full glow-btn
                       hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 border border-amber-400/20"
          >
            Hợp tác
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="xl:hidden text-slate-200 p-1" onClick={() => setOpen(!open)}>
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden bg-slate-950/95 backdrop-blur-xl border-b border-white/10 px-6 pb-8 pt-4 shadow-2xl">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3.5 text-slate-250 hover:text-amber-400 font-semibold text-sm border-b border-white/5 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block mt-6 text-center py-3.5 text-sm font-bold bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 text-white rounded-full shadow-md border border-amber-400/20"
          >
            Hợp tác ngay
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero Redesign (Split layout with premium space illustration) ───────────────────
const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden bg-slate-950">
    <DataField count={90} />

    {/* Background nebula meshes */}
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] spotlight-cyan opacity-40 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] spotlight-indigo opacity-35 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] spotlight-gold opacity-20 animate-pulse" style={{ animationDuration: '12s' }} />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left: Text Contents */}
        <div className="lg:col-span-7 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-bold mb-8 backdrop-blur-md shadow-lg shadow-black/20">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            Khai phá tiềm năng vũ trụ · Vệ tinh · AI · Tài chính số
          </div>

          {/* Title */}
          <h1 className="font-black tracking-tight text-white leading-none mb-6">
            <span className="block text-7xl md:text-8xl lg:text-[100px] leading-tight font-extrabold font-mono text-white">CMC</span>
            <span className="block text-7xl md:text-8xl lg:text-[100px] leading-none gradient-text font-black uppercase">SpaceY</span>
            <span className="block text-base md:text-lg font-bold text-amber-500 mt-4 tracking-[0.3em] uppercase">
              Group JSC.
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-slate-200 font-semibold mb-5 leading-snug">
            Khai phóng tiềm năng không gian Việt Nam
          </p>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mb-12 leading-relaxed font-medium">
            Tập đoàn công nghệ tiên phong sở hữu 100% dòng vốn Việt Nam — đi đầu trong lĩnh vực hạ tầng vệ tinh, phân tích dữ liệu không gian, trí tuệ nhân tạo (AI) và kinh tế số.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <a
              href="#about"
              className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 text-white font-bold rounded-full glow-btn
                         hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 border border-amber-400/20"
            >
              Khám phá ngay
              <ArrowRight className="w-5.5 h-5.5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#business"
              className="w-full sm:w-auto text-center px-8 py-4 border border-white/10 text-slate-300 bg-white/5 font-bold rounded-full hover:bg-white/10 hover:text-white transition-all duration-300 shadow-sm"
            >
              Lĩnh vực hoạt động
            </a>
          </div>
        </div>

        {/* Right: Premium Planetary & Satellite Visual */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          {/* Animated decorative orbit rings behind the image */}
          <div className="absolute w-[460px] h-[460px] rounded-full border border-cyan-500/25 animate-orbit-leo pointer-events-none" />
          <div className="absolute w-[380px] h-[380px] rounded-full border border-indigo-500/20 animate-orbit-meo pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-amber-500/15 animate-orbit-geo pointer-events-none" />
          
          {/* Glowing Orb Planet decoration */}
          <div className="absolute right-[-20px] top-[-20px] w-24 h-24 rounded-full planet z-0 animate-float-slow opacity-95 hidden sm:block" />

          {/* Main Visual Image (Hero Satellite) */}
          <div className="relative z-10 p-4.5 bg-slate-900/60 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl shadow-cyan-500/5">
            <img 
              src="/images/hero_satellite.png" 
              alt="CMC SpaceY Satellite Mission" 
              className="w-full max-w-[390px] h-auto rounded-2xl object-cover hover:scale-[1.03] transition-transform duration-700" 
            />
            
            {/* Float Badge */}
            <div className="absolute bottom-8 -left-6 bg-slate-950/90 backdrop-blur-md px-5 py-3.5 rounded-xl border border-white/10 shadow-xl flex items-center gap-3">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Hạ tầng vệ tinh</p>
                <p className="text-xs text-white font-extrabold">100% làm chủ tại VN</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
      <span className="text-[10px] uppercase font-bold tracking-widest">Cuộn xuống</span>
      <ChevronDown className="w-5.5 h-5.5 animate-bounce text-amber-500" />
    </div>
  </section>
)

// ─── Stats Bar Redesign (Metallic and premium dark metrics) ──────────────────────────
const Stats = () => {
  const items = [
    { value: '100%', label: 'Vốn sở hữu Việt Nam', icon: Shield, color: 'from-amber-400 to-yellow-600', iconColor: 'text-amber-400', bgColor: 'bg-amber-500/10 border-amber-500/25' },
    { value: '8 Core', label: 'Lĩnh vực cốt lõi', icon: Layers, color: 'from-cyan-400 to-indigo-600', iconColor: 'text-cyan-400', bgColor: 'bg-cyan-500/10 border-cyan-500/25' },
    { value: '5 Center', label: 'Trung tâm hạ tầng', icon: Building2, color: 'from-indigo-400 to-purple-600', iconColor: 'text-indigo-400', bgColor: 'bg-indigo-500/10 border-indigo-500/25' },
    { value: '2045', label: 'Tầm nhìn chiến lược', icon: Target, color: 'from-emerald-400 to-teal-600', iconColor: 'text-emerald-400', bgColor: 'bg-emerald-500/10 border-emerald-500/25' },
  ]
  return (
    <section className="border-y border-white/10 bg-slate-950 relative z-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/5">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="text-center px-4 group flex flex-col items-center justify-center">
                <div className={`w-12 h-12 rounded-xl ${item.bgColor} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <div className="text-3xl md:text-4.5xl font-black mb-1 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent font-mono">{item.value}</div>
                <div className="text-slate-450 text-xs font-bold uppercase tracking-wider">{item.label}</div>
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
    <section id="about" className="py-32 bg-slate-900/40 relative">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: General Corporate Information */}
          <div className="lg:col-span-6">
            <div className="text-amber-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">Về chúng tôi</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-10 leading-tight">
              Tập đoàn Công nghệ <br />
              <span className="gradient-text font-black">Không gian Việt Nam</span>
            </h2>
            <div className="space-y-4.5">
              {info.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4.5 p-5 rounded-2xl bg-slate-950/60 border border-white/5 shadow-lg hover:border-amber-400/20 hover:shadow-amber-500/5 transition-all duration-300"
                >
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mt-2 flex-shrink-0" />
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">{item.label}</div>
                    <div className="text-slate-200 text-sm font-bold leading-relaxed">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chairman Message & Space Command Center Visual */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Quote Card (Clean Glassmorphism) */}
            <div className="relative p-8 md:p-10 rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl glow-gold">
              <div className="text-amber-500/10 text-9xl font-serif leading-none absolute top-4 left-6 pointer-events-none select-none">“</div>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium relative z-10">
                CMC SpaceY Group JSC. được hình thành với khát vọng tham gia vào lĩnh vực công nghệ không gian, góp phần đưa Việt Nam xây dựng năng lực tự chủ về hạ tầng vệ tinh, dữ liệu không gian và các ứng dụng công nghệ cao phục vụ dân sự, kinh tế số, quản lý tài nguyên, logistics, hàng hải, nông nghiệp, đô thị thông minh và tài chính số.
              </p>
              <p className="text-slate-450 text-sm leading-relaxed mb-8 relative z-10">
                Trong bối cảnh thế giới bước vào kỷ nguyên kinh tế không gian, CMC SpaceY hướng tới vai trò tiên phong của Việt Nam trong việc kết nối công nghệ không gian với các nền tảng số phục vụ người dân và nền kinh tế.
              </p>
              
              <div className="flex items-center gap-4.5 pt-6 border-t border-white/5 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-black text-xs text-white shadow-md">
                  CMC
                </div>
                <div>
                  <div className="text-white font-extrabold text-sm">Chu Minh Chiến</div>
                  <div className="text-amber-400 text-xs font-bold">Chủ tịch HĐQT CMC SpaceY Group JSC.</div>
                </div>
              </div>
            </div>

            {/* R&D command center illustration */}
            <div className="rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative group">
              <img 
                src="/images/space_rd_center.png" 
                alt="CMC SpaceY R&D Center" 
                className="w-full h-52 object-cover group-hover:scale-[1.03] transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex items-end p-6">
                <div>
                  <p className="text-white font-extrabold text-sm">Mô hình Trung tâm R&D CMC SpaceY</p>
                  <p className="text-amber-450 text-xs font-semibold">Nghiên cứu & mô phỏng điều hành vệ tinh</p>
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
    <section className="py-32 bg-slate-950 relative z-10">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="text-amber-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">Định hướng chiến lược</div>
          <h2 className="text-4xl md:text-5xl font-black text-white">Tầm nhìn & Sứ mệnh</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Vision */}
          <div className="relative p-10 rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950 overflow-hidden group hover:border-amber-400/20 hover:shadow-xl transition-all duration-300 gold-hover">
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-8">
              <Eye className="w-7 h-7 text-amber-400" />
            </div>
            <div className="text-amber-500 text-xs uppercase font-extrabold tracking-wider mb-2">Vision</div>
            <h3 className="text-2xl font-black text-white mb-6">Tầm nhìn</h3>
            <p className="text-slate-350 leading-relaxed text-sm mb-6">
              Trở thành tập đoàn công nghệ không gian — vệ tinh — dữ liệu — AI — tài chính số hàng đầu của Việt Nam, từng bước vươn ra khu vực và quốc tế, góp phần hình thành hệ sinh thái kinh tế không gian và kinh tế số do người Việt Nam làm chủ.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm">
              CMC SpaceY đặt mục tiêu xây dựng hạ tầng nghiên cứu, tiếp nhận, vận hành và thương mại hóa các giải pháp vệ tinh, dữ liệu viễn thám, AI, nền tảng số, cổng thanh toán, sàn giao dịch tài sản số và dịch vụ tài chính số.
            </p>
          </div>

          {/* Mission */}
          <div className="p-10 rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950 overflow-hidden group hover:border-cyan-400/20 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-8">
              <Target className="w-7 h-7 text-cyan-400" />
            </div>
            <div className="text-cyan-500 text-xs uppercase font-extrabold tracking-wider mb-2">Mission</div>
            <h3 className="text-2xl font-black text-white mb-6">Sứ mệnh</h3>
            <ul className="space-y-4">
              {missions.map((m, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-350 text-sm leading-relaxed">
                  <div className="flex-shrink-0 w-5.5 h-5.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <span className="font-semibold text-slate-300">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Business Areas Redesign (8 Dark-Glass Cards) ───────────────────────────────────
const BusinessAreas = () => {
  const ref = useFadeIn()
  const areas = [
    {
      icon: Satellite,
      title: 'Công nghệ Vệ tinh',
      sub: 'Satellite Technology',
      desc: 'Nghiên cứu và làm chủ các dòng vệ tinh viễn thông, quan sát, viễn thám phục vụ kinh tế và dân sự.',
      color: '#0284c7',
      bgColor: 'bg-sky-500/10 border-sky-500/20',
      iconColor: 'text-sky-400',
      hoverGlow: 'hover:shadow-sky-500/5 hover:border-sky-500/40'
    },
    {
      icon: Globe,
      title: 'Dữ liệu Viễn thám',
      sub: 'Remote Sensing Data',
      desc: 'Thu nhận, xử lý và thương mại hóa dữ liệu quan sát Trái Đất phục vụ quản lý tài nguyên, môi trường.',
      color: '#06b6d4',
      bgColor: 'bg-cyan-500/10 border-cyan-500/20',
      iconColor: 'text-cyan-400',
      hoverGlow: 'hover:shadow-cyan-500/5 hover:border-cyan-500/40'
    },
    {
      icon: Brain,
      title: 'AI & Dữ liệu lớn',
      sub: 'AI & Big Data',
      desc: 'Ứng dụng trí tuệ nhân tạo vào toàn bộ chuỗi giá trị dữ liệu không gian từ thu nhận đến thương mại hóa.',
      color: '#4f46e5',
      bgColor: 'bg-indigo-500/10 border-indigo-500/20',
      iconColor: 'text-indigo-400',
      hoverGlow: 'hover:shadow-indigo-500/5 hover:border-indigo-500/40'
    },
    {
      icon: Zap,
      title: 'Năng lượng Không gian',
      sub: 'Space Solar Power',
      desc: 'Nghiên cứu dài hạn về năng lượng mặt trời không gian, đánh giá tiềm năng khai thác và ứng dụng tương lai.',
      color: '#d97706',
      bgColor: 'bg-amber-500/10 border-amber-500/20',
      iconColor: 'text-amber-400',
      hoverGlow: 'hover:shadow-amber-500/5 hover:border-amber-500/40'
    },
    {
      icon: TrendingUp,
      title: 'Sàn Tài sản số',
      sub: 'Digital Asset Exchange',
      desc: 'Vận hành sàn giao dịch tài sản số, tài sản mã hóa theo cơ chế pháp lý được Nhà nước cấp phép.',
      color: '#f59e0b',
      bgColor: 'bg-yellow-500/10 border-yellow-500/20',
      iconColor: 'text-yellow-400',
      hoverGlow: 'hover:shadow-yellow-500/5 hover:border-yellow-500/40'
    },
    {
      icon: CreditCard,
      title: 'Cổng Thanh toán',
      sub: 'Payment Gateway',
      desc: 'Thanh toán tích hợp cho dịch vụ vệ tinh, dữ liệu viễn thám, phần mềm và thiết bị kỹ thuật số.',
      color: '#059669',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
      iconColor: 'text-emerald-400',
      hoverGlow: 'hover:shadow-emerald-500/5 hover:border-emerald-500/40'
    },
    {
      icon: Building2,
      title: 'Ngân hàng số',
      sub: 'Digital Banking',
      desc: 'Nghiên cứu thành lập ngân hàng thương mại, ngân hàng số và dịch vụ tài chính số phục vụ hệ sinh thái.',
      color: '#ea580c',
      bgColor: 'bg-orange-500/10 border-orange-500/20',
      iconColor: 'text-orange-400',
      hoverGlow: 'hover:shadow-orange-500/5 hover:border-orange-500/40'
    },
    {
      icon: Smartphone,
      title: 'Phần mềm & Ứng dụng',
      sub: 'Software & Apps',
      desc: 'Phát triển ứng dụng di động, mạng xã hội chuyên ngành và API mở kết nối hệ sinh thái CMC SpaceY.',
      color: '#db2777',
      bgColor: 'bg-pink-500/10 border-pink-500/20',
      iconColor: 'text-pink-400',
      hoverGlow: 'hover:shadow-pink-500/5 hover:border-pink-500/40'
    },
  ]

  return (
    <section id="business" className="py-32 bg-slate-900/30">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="text-amber-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">Lĩnh vực hoạt động</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">8 Lĩnh vực Cốt lõi</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed font-semibold">
            Hệ sinh thái tích hợp từ công nghệ vệ tinh đến nền tảng số, tài chính và các dịch vụ giá trị gia tăng khác do Việt Nam làm chủ.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, i) => {
            const Icon = area.icon
            return (
              <div
                key={i}
                className={`group p-6 rounded-2xl bg-slate-950/40 border border-white/5 shadow-lg ${area.hoverGlow}
                            hover:-translate-y-1.5 transition-all duration-300 cursor-default`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${area.bgColor} border transition-transform group-hover:scale-110`}
                >
                  <Icon className={`w-6 h-6 ${area.iconColor}`} />
                </div>
                <div className="text-white font-extrabold text-sm mb-1 leading-tight">{area.title}</div>
                <div className={`text-[10px] uppercase tracking-widest mb-3 font-extrabold ${area.iconColor}`}>
                  {area.sub}
                </div>
                <p className="text-slate-450 text-xs font-semibold leading-relaxed">{area.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── NEW COMPONENT: Orbits & Satellite Constellation ─────────────────────────────
const OrbitsConstellation = () => {
  const [activeOrbit, setActiveOrbit] = useState('leo')
  const ref = useFadeIn()

  const orbits = {
    leo: {
      name: 'Quỹ đạo thấp (LEO - Low Earth Orbit)',
      alt: '160 - 1,500 km',
      latency: '< 20 ms (Độ trễ cực thấp)',
      speed: '~7.8 km/s',
      desc: 'Là quỹ đạo lý tưởng cho hệ thống internet vệ tinh băng thông rộng và truyền dẫn thời gian thực. CMC SpaceY định vị chùm vệ tinh LEO đóng vai trò cốt lõi trong giám sát tài nguyên thiên nhiên, viễn thám độ phân giải siêu cao và cung ứng internet không biên giới.',
    },
    meo: {
      name: 'Quỹ đạo trung bình (MEO - Medium Earth Orbit)',
      alt: '5,000 - 20,000 km',
      latency: '50 - 150 ms',
      speed: '~3.9 km/s',
      desc: 'Quỹ đạo chuyên biệt thường dùng cho các mạng lưới định vị toàn cầu (GPS, GLONASS, Galileo). Phù hợp cho việc theo dõi giao thông hàng hải rộng khắp và hỗ trợ liên lạc hàng không dân dụng trên phạm vi châu lục.',
    },
    geo: {
      name: 'Quỹ đạo địa tĩnh (GEO - Geostationary Orbit)',
      alt: '35,786 km (Cố định)',
      latency: '250 - 800 ms',
      speed: '~3.07 km/s',
      desc: 'Vệ tinh GEO di chuyển cùng tốc độ quay của Trái Đất nên xuất hiện cố định tại một vị trí. Thích hợp cho phủ sóng truyền hình quốc gia, dự phòng khẩn cấp an ninh mạng diện rộng và kết nối các giàn khoan biển xa.',
    }
  }

  const satCategories = [
    { title: 'Vệ tinh viễn thông', desc: 'Truyền dẫn tín hiệu internet băng rộng và điện thoại di động phủ sóng toàn cầu (tương tự VINASAT).' },
    { title: 'Vệ tinh viễn thám', desc: 'Chụp ảnh bề mặt Trái Đất độ phân giải cao phục vụ nông nghiệp và môi trường (tương tự VNREDSat).' },
    { title: 'Vệ tinh định vị', desc: 'Cung cấp tọa độ thời gian thực phục vụ hàng hải, logistics và xe tự lái thông minh.' },
    { title: 'Vệ tinh tài chính', desc: 'Đảm bảo đường truyền mã hóa tuyệt đối cho giao dịch thanh toán quốc tế độc lập.' },
    { title: 'Vệ tinh nghiên cứu', desc: 'Thu thập bức xạ không gian, khảo sát khí quyển phục vụ R&D khoa học vũ trụ Việt Nam.' },
    { title: 'Hệ thống an ninh', desc: 'Hạ tầng vệ tinh dự phòng quốc gia phục vụ cứu hộ cứu nạn và ứng cứu thiên tai.' }
  ]

  return (
    <section id="orbits" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] spotlight-cyan opacity-20 pointer-events-none" />
      
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-20">
          <div className="text-amber-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">Công nghệ không gian</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Mô phỏng Quỹ đạo vệ tinh</h2>
          <p className="text-slate-450 max-w-2xl mx-auto text-sm leading-relaxed font-semibold">
            CMC SpaceY hướng tới việc sở hữu và vận hành mạng lưới vệ tinh đa tầng, tối ưu hóa mục đích khai thác thương mại và khoa học.
          </p>
        </div>

        {/* Orbit radar simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Interactive SVG Radar */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <svg viewBox="0 0 500 500" className="w-full max-w-[400px] h-auto">
              {/* Earth inside */}
              <circle cx="250" cy="250" r="45" className="fill-indigo-950 stroke-cyan-500 stroke-2 animate-pulse" />
              <text x="250" y="254" textAnchor="middle" className="fill-cyan-400 font-black text-[12px] font-mono select-none">EARTH</text>
              
              {/* GEO Orbit line */}
              <circle 
                cx="250" 
                cy="250" 
                r="190" 
                onClick={() => setActiveOrbit('geo')}
                className={`fill-none stroke-dashedarray cursor-pointer transition-all duration-300 ${activeOrbit === 'geo' ? 'stroke-amber-400 stroke-2' : 'stroke-slate-700 hover:stroke-amber-400/50'}`} 
              />
              <circle cx="250" cy="60" r="6" className="fill-amber-400 animate-spin-slow origin-[250px_250px]" />
              <text x="250" y="50" textAnchor="middle" className="fill-amber-500 font-bold text-[10px] font-mono">GEO</text>

              {/* MEO Orbit line */}
              <circle 
                cx="250" 
                cy="250" 
                r="130" 
                onClick={() => setActiveOrbit('meo')}
                className={`fill-none stroke-dashedarray cursor-pointer transition-all duration-300 ${activeOrbit === 'meo' ? 'stroke-indigo-400 stroke-2' : 'stroke-slate-800 hover:stroke-indigo-400/50'}`} 
              />
              <circle cx="250" cy="120" r="5.5" className="fill-indigo-400 animate-orbit-meo origin-[250px_250px]" />
              <text x="250" y="112" textAnchor="middle" className="fill-indigo-400 font-bold text-[10px] font-mono">MEO</text>

              {/* LEO Orbit line */}
              <circle 
                cx="250" 
                cy="250" 
                r="80" 
                onClick={() => setActiveOrbit('leo')}
                className={`fill-none stroke-dashedarray cursor-pointer transition-all duration-300 ${activeOrbit === 'leo' ? 'stroke-cyan-400 stroke-2' : 'stroke-slate-900 hover:stroke-cyan-400/50'}`} 
              />
              <circle cx="250" cy="170" r="5" className="fill-cyan-400 animate-orbit-leo origin-[250px_250px]" />
              <text x="250" y="162" textAnchor="middle" className="fill-cyan-400 font-bold text-[10px] font-mono">LEO</text>
            </svg>
          </div>

          {/* Active Orbit Details */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-md glow-cyan">
              <div className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 font-mono">Thông tin quỹ đạo</div>
              <h3 className="text-xl font-bold text-white mb-6">{orbits[activeOrbit].name}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Độ cao</span>
                  <span className="text-base text-white font-extrabold font-mono">{orbits[activeOrbit].alt}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Độ trễ truyền dẫn</span>
                  <span className="text-base text-amber-400 font-extrabold font-mono">{orbits[activeOrbit].latency}</span>
                </div>
              </div>

              <p className="text-slate-300 text-xs font-semibold leading-relaxed">{orbits[activeOrbit].desc}</p>
              
              <div className="flex gap-2 mt-6">
                {['leo', 'meo', 'geo'].map((o) => (
                  <button
                    key={o}
                    onClick={() => setActiveOrbit(o)}
                    className={`px-4.5 py-2 text-xs font-bold rounded-lg border uppercase transition-all ${activeOrbit === o ? 'bg-cyan-500/20 border-cyan-400 text-cyan-450' : 'bg-slate-950/50 border-white/5 text-slate-400 hover:text-white'}`}
                  >
                    {o} orbit
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 6 core satellite applications */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-black text-white">Phân loại Vệ tinh theo Ứng dụng Chiến lược</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {satCategories.map((cat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-amber-400/20 transition-all duration-300">
                <h4 className="text-white font-bold text-sm mb-3">{cat.title}</h4>
                <p className="text-slate-450 text-xs font-semibold leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5,000 satellite roadmap */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 border border-white/10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-2xl md:text-3xl font-black text-white mb-6">Mục tiêu Phóng 5,000 Vệ tinh LEO</h3>
          <p className="text-slate-350 text-sm max-w-2xl mx-auto mb-10 font-semibold leading-relaxed">
            Kế hoạch thiết lập chùm vệ tinh phủ sóng dày đặc để thống lĩnh mạng dữ liệu và truyền dẫn tại khu vực Đông Nam Á, Châu Phi và Châu Đại Dương trong 5 năm tới.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-xl bg-slate-950/60 border border-white/5">
              <span className="text-[10px] text-amber-400 uppercase font-bold block mb-1">Giai đoạn 1</span>
              <span className="text-2xl text-white font-mono font-black mb-2 block">1,000 Vệ tinh</span>
              <p className="text-slate-450 text-xs leading-relaxed font-semibold">Phóng loạt đầu tiên gồm 2 đợt (250 và 750 vệ tinh) để thử nghiệm hệ thống truyền dẫn LEO.</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-950/60 border border-white/5">
              <span className="text-[10px] text-cyan-400 uppercase font-bold block mb-1">Giai đoạn 2</span>
              <span className="text-2xl text-white font-mono font-black mb-2 block">1,000 Vệ tinh / Năm</span>
              <p className="text-slate-450 text-xs leading-relaxed font-semibold">Đẩy mạnh công suất lắp ráp tại Saigon Silicon để phóng định kỳ liên tục hàng năm.</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-950/60 border border-white/5">
              <span className="text-[10px] text-indigo-400 uppercase font-bold block mb-1">Tổng cộng 5 năm</span>
              <span className="text-2xl text-amber-450 font-mono font-black mb-2 block">5,000 Vệ tinh LEO</span>
              <p className="text-slate-450 text-xs leading-relaxed font-semibold">Hình thành siêu chùm vệ tinh tự chủ, đảm bảo khả năng giám sát 24/7 không có điểm mù.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── NEW COMPONENT: Subterranean Mining (Deep scanning solution & workflow) ───
const SubterraneanMining = () => {
  const [activeStep, setActiveStep] = useState(1)
  const ref = useFadeIn()

  const challenges = [
    { label: 'Tỷ lệ rủi ro cao', desc: 'Theo thống kê địa chất truyền thống, cứ 1,000 dự án khoan thăm dò thì tỷ lệ tìm ra vỉa quặng lớn chỉ khoảng 0.2%.' },
    { label: 'Chu kỳ kéo dài', desc: 'Các phương pháp khảo sát mặt đất cổ điển thường mất từ 3 đến 5 năm để chuyển từ khảo sát sơ bộ sang đánh giá trữ lượng.' },
    { label: 'Hạn chế độ sâu', desc: 'Các cảm biến thông thường hầu như bị suy hao tín hiệu mạnh và mất độ chính xác tại độ sâu quá 500 mét.' },
    { label: 'Chi phí khổng lồ', desc: 'Chi phí khoan mù trực tiếp tốn hàng trăm triệu USD mà hoàn toàn không có sự đảm bảo về hiệu quả thực tế.' }
  ]

  const workflow = [
    { step: 1, title: 'Thu nhận dữ liệu diện rộng', desc: 'Vệ tinh CMC SpaceY quét và chụp ảnh phổ nhiệt lượng, từ trường toàn bộ khu vực mục tiêu không bị cản trở bởi địa hình.' },
    { step: 2, title: 'Lọc phổ & loại bỏ nhiễu', desc: 'Hệ thống lọc bỏ nhiễu ánh sáng ban ngày, trích xuất và giữ lại tín hiệu bức xạ nguyên tử hạt từ lòng đất (Microlepton).' },
    { step: 3, title: 'Nhận dạng bằng thuật toán AI', desc: 'Đối chiếu tín hiệu thu nhận với cơ sở dữ liệu mẫu khoáng sản số hóa để xác định chính xác thành phần vật chất.' },
    { step: 4, title: 'Mô phỏng 3D tọa độ', desc: 'Sử dụng cụm siêu máy tính (HPC) phân tích độ suy hao phổ để dựng mô hình cấu trúc 3D, chiều sâu và biên giới của túi quặng.' },
    { step: 5, title: 'Kiểm chứng thực địa NMR', desc: 'Bố trí kỹ sư mang thiết bị quét cộng hưởng từ hạt nhân (NMR) đến chính xác tọa độ GPS được vệ tinh chỉ định để xác nhận.' }
  ]

  return (
    <section id="mining" className="py-32 bg-slate-900/30 relative">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-20">
          <div className="text-amber-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">Công nghệ vượt trội</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Thăm dò Địa chất quét sâu</h2>
          <p className="text-slate-450 max-w-2xl mx-auto text-sm leading-relaxed font-semibold">
            Giải pháp vệ tinh kết hợp với thuật toán AI đột phá để "nhìn thấu" lòng đất, giảm thiểu chi phí và thời gian thăm dò khoáng sản.
          </p>
        </div>

        {/* Traditional limits vs CMC SpaceY Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Left: Traditional Limits list */}
          <div className="lg:col-span-6">
            <h3 className="text-xl font-bold text-white mb-8 border-l-4 border-amber-500 pl-4">Rào cản lớn của Ngành khai khoáng cũ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {challenges.map((ch, i) => (
                <div key={i} className="p-5 rounded-2xl bg-slate-950/50 border border-white/5">
                  <h4 className="text-amber-450 font-bold text-sm mb-2">{ch.label}</h4>
                  <p className="text-slate-450 text-xs leading-relaxed font-semibold">{ch.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Premium AI Image explaining scanning */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="p-4 bg-slate-900/60 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
              <img 
                src="/images/satellite_mineral_scan.png" 
                alt="CMC SpaceY Subterranean Scanning" 
                className="w-full max-w-[420px] h-auto rounded-2xl object-cover hover:scale-[1.02] transition-transform duration-700" 
              />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 p-5 bg-slate-950/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl text-center">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block mb-1">Khả năng đâm xuyên địa tầng</span>
                <p className="text-sm text-white font-extrabold mb-3">Tìm Dầu khí / Nhiệt điện sâu 8,000m</p>
                <p className="text-xs text-slate-350 font-semibold leading-relaxed">Định vị quặng rắn và đất hiếm ở độ sâu lên đến 2,000m dưới lòng đất với độ chính xác cao.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive workflow stepper */}
        <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-slate-950/40">
          <h3 className="text-xl font-bold text-white text-center mb-12">Quy trình Khảo sát Địa chất Tích hợp 5 bước</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Stepper Steps Selection */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {workflow.map((w) => (
                <button
                  key={w.step}
                  onClick={() => setActiveStep(w.step)}
                  className={`p-4 rounded-xl border text-left flex items-center gap-4 transition-all duration-300 ${activeStep === w.step ? 'bg-cyan-500/10 border-cyan-400/50 shadow-md' : 'bg-slate-900/40 border-white/5 hover:border-slate-800'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-xs ${activeStep === w.step ? 'bg-cyan-500 text-white' : 'bg-slate-950 text-slate-500'}`}>
                    {w.step}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${activeStep === w.step ? 'text-white' : 'text-slate-400'}`}>{w.title}</h4>
                  </div>
                </button>
              ))}
            </div>

            {/* Stepper Step Details */}
            <div className="lg:col-span-7">
              <div className="p-8 rounded-2xl bg-slate-950/70 border border-white/5 glow-cyan min-h-[220px] flex flex-col justify-center">
                <span className="text-[10px] text-cyan-400 uppercase font-mono font-bold block mb-2">Quy trình chi tiết · Bước {activeStep}</span>
                <h4 className="text-lg font-bold text-white mb-4">{workflow[activeStep - 1].title}</h4>
                <p className="text-slate-300 text-xs font-semibold leading-relaxed">{workflow[activeStep - 1].desc}</p>
                <div className="mt-6 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  <span>Trực quan hóa quy trình</span>
                  <span className="text-cyan-500 font-mono">Đạt chứng nhận địa chất</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── Infrastructure Section & NEW Spaceport Component ────────────────────────────────
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
      bgColor: 'bg-cyan-500/10 border-cyan-500/20',
      iconColor: 'text-cyan-450'
    },
    {
      icon: Rocket,
      title: 'Sản xuất Vệ tinh',
      sub: 'Lắp ráp & Thử nghiệm',
      desc: 'Lắp ráp, tích hợp và thử nghiệm vệ tinh, sản xuất thiết bị phụ trợ, hình thành chuỗi cung ứng công nghệ cao.',
      num: '02',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-500/10 border-indigo-500/20',
      iconColor: 'text-indigo-450'
    },
    {
      icon: Database,
      title: 'Điều hành & Dữ liệu',
      sub: 'Vận hành Vệ tinh',
      desc: 'Điều hành vệ tinh viễn thám, tiếp nhận, giải mã, xử lý dữ liệu không gian lớn và bảo mật thông tin.',
      num: '03',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
      iconColor: 'text-emerald-450'
    },
    {
      icon: CreditCard,
      title: 'Phần mềm & Fintech',
      sub: 'Nền tảng số',
      desc: 'Phát triển ứng dụng di động, tích hợp thanh toán, quản trị tài sản số và hệ sinh thái số CMC SpaceY.',
      num: '04',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10 border-amber-500/20',
      iconColor: 'text-amber-450'
    },
    {
      icon: Users,
      title: 'Đào tạo Nhân lực',
      sub: 'Nguồn nhân lực CNC',
      desc: 'Đào tạo kỹ sư vệ tinh, chuyên gia viễn thám, xử lý dữ liệu AI, lập trình viên phần mềm hàng đầu Việt Nam.',
      num: '05',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-500/10 border-pink-500/20',
      iconColor: 'text-pink-450'
    },
  ]

  return (
    <section id="infrastructure" className="py-32 bg-slate-950 relative">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        
        {/* Saigon Silicon Section */}
        <div className="text-center mb-20">
          <div className="text-amber-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">Hạ tầng chiến lược</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">5 Trung tâm tại Việt Nam</h2>
          <p className="text-slate-450 max-w-2xl mx-auto text-sm leading-relaxed font-semibold mb-6">
            Hệ sinh thái hạ tầng khép kín do người Việt vận hành — kết nối nghiên cứu học thuật với hoạt động sản xuất công nghiệp thực tế.
          </p>
          <div className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl bg-slate-900 border border-white/5 text-xs text-slate-300 font-semibold shadow-inner shadow-black">
            <MapPin className="w-4.5 h-4.5 text-amber-500" />
            Tổ hợp 35 Hecta tại Khu Công nghệ cao TP. Hồ Chí Minh (Saigon Silicon City)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-28">
          {centers.map((c, i) => {
            const Icon = c.icon
            return (
              <div
                key={i}
                className="relative group p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
              >
                {/* Big faint outline number */}
                <div
                  className="text-5xl font-black absolute top-4 right-4 leading-none select-none opacity-5 font-mono text-white"
                >
                  {c.num}
                </div>
                
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 ${c.bgColor} border transition-transform group-hover:scale-115`}
                >
                  <Icon className={`w-6 h-6 ${c.iconColor}`} />
                </div>
                
                <div className="text-white font-extrabold text-sm mb-1">{c.title}</div>
                <div className={`text-[10px] uppercase tracking-widest mb-3 font-extrabold ${c.iconColor}`}>
                  {c.sub}
                </div>
                <p className="text-slate-450 text-xs font-semibold leading-relaxed">{c.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Saigon Silicon Complex detailed description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32 pt-12 border-t border-white/5">
          <div className="lg:col-span-7 text-left">
            <h3 className="text-2xl font-black text-white mb-6">Tổ hợp Nghiên cứu & Chế tạo Vệ tinh</h3>
            <p className="text-slate-350 text-sm leading-relaxed mb-8 font-semibold">
              Tổ hợp hạ tầng 35 ha đóng vai trò là "trái tim" công nghệ và sản xuất của toàn bộ mạng lưới chi nhánh và trạm thu phát sóng mặt đất của CMC SpaceY, làm cơ sở tự chủ kỹ thuật hàng không vũ trụ.
            </p>
            <div className="space-y-4.5">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                  <Radio className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-sm mb-1">Trung tâm Chế tạo Vệ tinh cốt lõi</h4>
                  <p className="text-slate-450 text-xs font-semibold leading-relaxed">Nghiên cứu mô phỏng, tích hợp lắp ráp và thử nghiệm môi trường chân không cho các dòng vệ tinh mini thương mại.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-sm mb-1">Trung tâm Đào tạo Nhân lực chuyên sâu</h4>
                  <p className="text-slate-450 text-xs font-semibold leading-relaxed">Nơi học tập, thực hành thực tế của hàng ngàn kỹ sư hàng không vũ trụ, chuyên gia xử lý dữ liệu viễn thám và tài chính số.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Server className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-sm mb-1">Big Data & Trung tâm xử lý siêu tính toán AI</h4>
                  <p className="text-slate-450 text-xs font-semibold leading-relaxed">Hệ thống siêu máy tính thu nhận tín hiệu vệ tinh trực tiếp, giải mã và xử lý ảnh viễn thám phục vụ chuyển đổi số quốc gia.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="p-4.5 bg-slate-900/60 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
              <img 
                src="/images/aerospace_factory.png" 
                alt="CMC SpaceY High Tech Assembly Line" 
                className="w-full max-w-[420px] h-auto rounded-2xl object-cover hover:scale-[1.02] transition-transform duration-500" 
              />
              <div className="absolute bottom-8 -left-4 bg-slate-950/95 backdrop-blur-md px-5 py-3.5 rounded-xl border border-white/10 shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Phòng sạch tiêu chuẩn</p>
                  <p className="text-xs text-white font-extrabold">Đạt chuẩn hàng không quốc tế</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── NEW SPACEPORT COMPONENT ─── */}
        <div id="spaceport" className="pt-24 border-t border-white/5">
          <div className="text-center mb-16">
            <div className="text-amber-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">Dự án trọng điểm</div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Cảng hàng không vũ trụ quốc gia Vũng Tàu</h3>
            <p className="text-slate-450 max-w-2xl mx-auto text-sm leading-relaxed font-semibold">
              Kế hoạch xây dựng sân bay vũ trụ độc lập phục vụ mục tiêu quốc gia và cung ứng dịch vụ phóng thương mại toàn cầu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Description */}
            <div className="lg:col-span-6 text-left">
              <h4 className="text-xl font-bold text-white mb-6 border-l-4 border-amber-500 pl-4">Siêu dự án lấn biển Vũng Tàu (1,000 ha)</h4>
              <p className="text-slate-350 text-xs font-semibold leading-relaxed mb-6">
                CMC SpaceY đặt tầm nhìn dài hạn sở hữu một bãi phóng độc lập để làm chủ hoàn toàn lịch phóng vệ tinh, tối ưu hóa tối đa chi phí vận hành và không phụ thuộc vào hạ tầng quốc tế.
              </p>
              
              <ul className="space-y-4.5 mb-8 text-slate-400">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mt-1 flex-shrink-0">
                    <Anchor className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="text-xs font-semibold text-slate-300"><strong>Đảo nhân tạo 100 Hecta:</strong> Xây dựng lấn biển cách đất liền 3–5 km ngoài khơi Vũng Tàu, đảm bảo an toàn tuyệt đối cho quỹ đạo phóng.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center mt-1 flex-shrink-0">
                    <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <span className="text-xs font-semibold text-slate-300"><strong>Kết nối giao thông:</strong> Liên kết trực tiếp với Sân bay Vũng Tàu đảm bảo hoạt động logistics chuyên dụng và chuyển giao linh kiện vệ tinh siêu tải.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center mt-1 flex-shrink-0">
                    <Compass className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <span className="text-xs font-semibold text-slate-300"><strong>Lịch trình phóng vệ tinh:</strong> Dự kiến bãi phóng độc lập này sẽ chính thức tiếp nhận và thực hiện vụ phóng vệ tinh thử nghiệm đầu tiên vào năm 2027.</span>
                </li>
              </ul>
            </div>

            {/* Right layout card with images */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              <div className="p-4.5 bg-slate-900/60 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl relative">
                <img 
                  src="/images/coastal_spaceport.png" 
                  alt="Offshore Launch Pad Island" 
                  className="w-full max-w-[440px] h-auto rounded-2xl object-cover hover:scale-[1.02] transition-transform duration-500" 
                />
                
                {/* Visual Specifications Panel */}
                <div className="absolute -bottom-6 -right-6 p-5 bg-slate-950/95 border border-white/10 rounded-2xl shadow-2xl text-left max-w-[240px]">
                  <span className="text-[9px] text-amber-400 uppercase font-mono font-bold block mb-1">Thông số hạ tầng</span>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] text-slate-500 block leading-tight">Diện tích bãi phóng</span>
                      <span className="text-xs text-white font-extrabold font-mono">100 Hécta</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block leading-tight">Vị trí địa lý</span>
                      <span className="text-xs text-white font-extrabold">Cách đất liền 3-5 km</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block leading-tight">Quy mô tổng dự án</span>
                      <span className="text-xs text-cyan-400 font-extrabold font-mono">1,000 Hécta</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    <section id="services" className="py-32 bg-slate-900/40 relative z-10">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-20">
          <div className="text-amber-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">Dịch vụ ứng dụng</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Giải pháp cho mọi ngành</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed font-semibold">
            Từ nông nghiệp công nghệ cao đến hạ tầng logistics, môi trường và tài chính số — CMC SpaceY mang dữ liệu viễn thám và AI vào thực tiễn kinh tế.
          </p>
        </div>

        {/* 2-Column Redesign showcasing AI Images and Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Visual Showcase Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
            
            {/* Visual Panel 1: Smart Agriculture */}
            <div className="p-4 bg-slate-950 border border-white/5 rounded-3xl shadow-xl">
              <img 
                src="/images/smart_agri_sensing.png" 
                alt="Smart Agriculture Satellite Imaging" 
                className="w-full h-44 object-cover rounded-2xl mb-4" 
              />
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 rounded-md">Ứng dụng thực tế</span>
                <span className="text-xs text-slate-500 font-bold">Nông nghiệp số</span>
              </div>
              <h4 className="text-sm font-bold text-white">Viễn thám & Quản lý vụ mùa</h4>
              <p className="text-slate-450 text-[11px] font-semibold leading-relaxed mt-2">Phân tích dữ liệu ảnh hồng ngoại của vệ tinh để dự báo sâu bệnh, chỉ số dinh dưỡng cây trồng tự động.</p>
            </div>

            {/* Visual Panel 2: Fintech exchange */}
            <div className="p-4 bg-slate-950 border border-white/5 rounded-3xl shadow-xl">
              <img 
                src="/images/fintech_exchange.png" 
                alt="Fintech Exchange and digital payment" 
                className="w-full h-44 object-cover rounded-2xl mb-4" 
              />
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-450 border border-amber-500/20 rounded-md">Mô hình Fintech</span>
                <span className="text-xs text-slate-500 font-bold">Thanh toán & tài sản số</span>
              </div>
              <h4 className="text-sm font-bold text-white">Hệ sinh thái giao dịch tài chính số</h4>
              <p className="text-slate-450 text-[11px] font-semibold leading-relaxed mt-2">Tích hợp cổng thanh toán trực tuyến cho các hợp đồng dữ liệu, hỗ trợ lưu ký tài sản mã hóa tuân thủ pháp luật.</p>
            </div>

          </div>

          {/* Right Column: Grid list of Services */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cats.map((cat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-slate-800 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl mb-5">{cat.emoji}</div>
                  <h3 className="text-white font-extrabold mb-5 text-base">{cat.title}</h3>
                  <ul className="space-y-3.5">
                    {cat.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-slate-400 text-xs font-semibold leading-relaxed">
                        <ChevronRight className="w-4 h-4 text-amber-450 mt-0.5 flex-shrink-0" />
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

// ─── NEW COMPONENT: International Branch Network ────────────────────────────────
const InternationalNetwork = () => {
  const ref = useFadeIn()
  
  const branches = [
    { name: 'Khu vực ASEAN', desc: 'Đồng loạt thiết lập văn phòng đại diện và trạm thu phát thông tin tại Lào, Campuchia, Thái Lan, Indonesia, Philippines và Myanmar (Lộ trình 2027).' },
    { name: 'Châu Phi & Châu Đại Dương', desc: 'Mở rộng cung ứng dữ liệu viễn thám, liên lạc biển và cung cấp giải pháp an ninh mạng cho chính quyền và doanh nghiệp hải đảo đối tác.' }
  ]

  return (
    <section id="network" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] spotlight-indigo opacity-15 pointer-events-none" />
      
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-20">
          <div className="text-cyan-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">Vươn tầm thế giới</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Mạng lưới Chi nhánh Quốc tế (2027)</h2>
          <p className="text-slate-450 max-w-2xl mx-auto text-sm leading-relaxed font-semibold">
            Sứ mệnh đưa công nghệ và thương hiệu không gian Việt Nam ghi dấu ấn đậm nét trên bản đồ thế giới, cung cấp độc quyền dịch vụ viễn thám đa quốc gia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: SVG Map Mesh */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <svg viewBox="0 0 600 400" className="w-full max-w-[500px] h-auto bg-slate-900/30 rounded-3xl border border-white/5 p-6 shadow-2xl">
              {/* Southeast Asia Map Mock Nodes */}
              <g className="stroke-indigo-500/25 stroke-1 fill-none">
                <path d="M 250 80 L 220 180 M 220 180 L 150 240 M 150 240 L 280 290 M 280 290 L 320 230 M 320 230 L 250 80" />
                <path d="M 220 180 L 320 230 M 150 240 L 320 230 M 250 80 L 400 320 L 480 340 M 320 230 L 400 320" strokeDasharray="5 3" />
              </g>

              {/* Pulsing connections to Vietnam center */}
              <g className="stroke-cyan-400 stroke-1 fill-none animate-dash stroke-dasharray">
                {/* Hanoi to Vientiane (Laos) */}
                <line x1="250" y1="80" x2="220" y2="180" />
                {/* Hanoi to Phnom Penh (Cambodia) */}
                <line x1="250" y1="80" x2="150" y2="240" />
                {/* Hanoi to Jakarta (Indonesia) */}
                <line x1="250" y1="80" x2="280" y2="290" />
                {/* Hanoi to Manila (Philippines) */}
                <line x1="250" y1="80" x2="320" y2="230" />
                {/* Hanoi to Africa node */}
                <line x1="250" y1="80" x2="80" y2="350" />
                {/* Hanoi to Oceania node */}
                <line x1="250" y1="80" x2="480" y2="340" />
              </g>

              {/* Central node (Hanoi - Vietnam Center) */}
              <circle cx="250" cy="80" r="8" className="fill-amber-400 stroke-white stroke-2" />
              <circle cx="250" cy="80" r="16" className="fill-none stroke-amber-400/50 stroke-1 pulse-ring-slow" />
              <text x="250" y="62" textAnchor="middle" className="fill-amber-400 font-extrabold text-[11px] font-mono">VIETNAM HUB</text>

              {/* Branch nodes */}
              <circle cx="220" cy="180" r="4.5" className="fill-cyan-400" />
              <circle cx="150" cy="240" r="4.5" className="fill-cyan-400" />
              <circle cx="280" cy="290" r="4.5" className="fill-cyan-400" />
              <circle cx="320" cy="230" r="4.5" className="fill-cyan-400" />
              <circle cx="80" cy="350" r="5" className="fill-indigo-400" />
              <circle cx="480" cy="340" r="5" className="fill-indigo-400" />

              {/* Labels */}
              <text x="228" y="194" className="fill-slate-400 text-[9px] font-semibold">Lào & Thái Lan</text>
              <text x="80" y="244" className="fill-slate-400 text-[9px] font-semibold">Campuchia</text>
              <text x="290" y="304" className="fill-slate-400 text-[9px] font-semibold">Indonesia</text>
              <text x="330" y="234" className="fill-slate-400 text-[9px] font-semibold">Philippines</text>
              <text x="80" y="370" textAnchor="middle" className="fill-indigo-400 font-bold text-[9px]">AFRICA</text>
              <text x="480" y="360" textAnchor="middle" className="fill-indigo-400 font-bold text-[9px]">OCEANIA</text>
            </svg>
          </div>

          {/* Right: Branch Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white border-l-4 border-amber-500 pl-4">Định vị thị trường toàn cầu</h3>
            
            {branches.map((br, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-amber-400/20 transition-all duration-300">
                <h4 className="text-white font-extrabold text-sm mb-2">{br.name}</h4>
                <p className="text-slate-400 text-xs font-semibold leading-relaxed">{br.desc}</p>
              </div>
            ))}

            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/10 text-cyan-400">
              <span className="text-[10px] font-bold uppercase tracking-widest block mb-1">Mục tiêu độc quyền</span>
              <p className="text-xs font-semibold leading-relaxed">Độc quyền phân phối dịch vụ internet vệ tinh, dữ liệu địa chất quét sâu và giải pháp an ninh mạng không gian cho chính quyền bản địa.</p>
            </div>
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
      color: 'bg-cyan-500 border-cyan-400 text-cyan-400',
      shadow: 'shadow-cyan-500/5'
    },
    {
      num: '02',
      title: 'Xây dựng Hạ tầng kỹ thuật',
      items: ['Thiết lập phòng thí nghiệm R&D cơ bản', 'Triển khai Data Center lưu trữ ảnh viễn thám', 'Sản xuất thử nghiệm thiết bị phụ trợ mặt đất', 'Công bố cổng thanh toán thử nghiệm'],
      color: 'bg-indigo-500 border-indigo-400 text-indigo-400',
      shadow: 'shadow-indigo-500/5'
    },
    {
      num: '03',
      title: 'Phát triển & Thương mại dịch vụ',
      items: ['Cung cấp dữ liệu viễn thám cho doanh nghiệp', 'Thương mại gói giải pháp nông nghiệp số', 'Tích hợp thanh toán dịch vụ hàng hải IoT', 'Vận hành sàn giao dịch tài sản số thử nghiệm'],
      color: 'bg-emerald-500 border-emerald-400 text-emerald-400',
      shadow: 'shadow-emerald-500/5'
    },
    {
      num: '04',
      title: 'Mở rộng quy mô thị trường',
      items: ['Liên kết dữ liệu quốc phòng, phòng chống thiên tai', 'Thương mại hóa diện rộng cổng API viễn thám', 'Chuyển giao giải pháp quản lý tài nguyên địa phương', 'Phát hành ví điện tử chuyên biệt kinh tế số'],
      color: 'bg-amber-500 border-amber-400 text-amber-400',
      shadow: 'shadow-amber-500/5'
    },
    {
      num: '05',
      title: 'Vươn tầm khu vực & Vũ trụ',
      items: ['Chuẩn bị hồ sơ phóng chùm vệ tinh mini Việt Nam', 'Xuất khẩu dịch vụ dữ liệu viễn thám ra Đông Nam Á', 'Liên minh công nghệ không gian khu vực châu Á', 'Đóng góp hạ tầng trung tâm CNC toàn cầu'],
      color: 'bg-pink-500 border-pink-400 text-pink-400',
      shadow: 'shadow-pink-500/5'
    },
  ]

  return (
    <section id="roadmap" className="py-32 bg-slate-950 relative z-10">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-20">
          <div className="text-amber-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">Lộ trình phát triển</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">5 Giai đoạn Chiến lược</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed font-semibold">
            Lộ trình phát triển bài bản từng bước để đảm bảo tính khả thi cao nhất, kết hợp nghiên cứu khoa học với tính thương mại hóa vững chắc.
          </p>
        </div>

        {/* Timeline block */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          
          {/* Desktop timeline connecting line */}
          <div className="hidden md:block absolute top-[28px] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-pink-500/30 pointer-events-none" />

          {phases.map((p, i) => (
            <div key={i} className="relative group">
              <div className={`p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-slate-800 shadow-lg ${p.shadow} transition-all duration-300`}>
                
                {/* Milestone Node */}
                <div
                  className={`w-9.5 h-9.5 rounded-full flex items-center justify-center text-xs font-black text-white mb-5 mx-auto md:mx-0 ${p.color.replace('text-', 'bg-').split(' ')[0]} shadow-lg`}
                >
                  {p.num}
                </div>
                
                <div className={`text-[10px] uppercase tracking-widest font-extrabold mb-2.5 ${p.color.split(' ').pop()}`}>
                  Giai đoạn {p.num}
                </div>
                
                <h3 className="text-white font-extrabold text-sm mb-5 leading-tight min-h-[44px]">{p.title}</h3>
                
                <ul className="space-y-3">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-slate-450 text-xs font-semibold leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-slate-700 group-hover:bg-amber-450 transition-colors" />
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
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10 border-cyan-500/20',
      borderColor: 'hover:border-cyan-400/45'
    },
    {
      icon: Brain,
      title: 'Khoa học – Công nghệ',
      desc: 'Làm chủ công nghệ vệ tinh, phát triển giải pháp Big Data & AI nội địa phục vụ giám sát lãnh thổ, chuyển giao công nghệ cho công nghiệp trong nước.',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10 border-indigo-500/20',
      borderColor: 'hover:border-indigo-400/45'
    },
    {
      icon: Heart,
      title: 'Giá trị Xã hội',
      desc: 'Cải thiện liên lạc ở các vùng xa xôi, đảo xa qua viễn thông vệ tinh, tạo công cụ cảnh báo sớm thiên tai, thu hẹp khoảng cách phát triển số.',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10 border-pink-500/20',
      borderColor: 'hover:border-pink-400/45'
    },
    {
      icon: Globe,
      title: 'Môi trường bền vững',
      desc: 'Giám sát thảm thực vật rừng, theo dõi xâm nhập mặn Đồng bằng sông Cửu Long, đánh giá sạt lở đất đai miền núi để ứng phó biến đổi khí hậu.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
      borderColor: 'hover:border-emerald-400/45'
    },
    {
      icon: Shield,
      title: 'Chuyển đổi số quốc gia',
      desc: 'Đóng góp hạ tầng dữ liệu vị trí vệ tinh đồng bộ với các phần mềm, mạng xã hội, ví điện tử giúp kiến tạo xã hội số toàn diện.',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20',
      borderColor: 'hover:border-amber-400/45'
    },
  ]

  return (
    <section className="py-32 bg-slate-900/30 relative z-10">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-20">
          <div className="text-amber-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">Tác động chiến lược</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Giá trị cho Việt Nam</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed font-semibold">
            CMC SpaceY định vị mình không chỉ là dự án kinh doanh thương mại thông thường — đây là nỗ lực tự cường công nghệ của người Việt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <div
                key={i}
                className={`group p-6 rounded-2xl bg-slate-950/40 border border-white/5 shadow-lg ${v.borderColor} hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 ${v.bgColor} border transition-transform group-hover:scale-110`}
                >
                  <Icon className={`w-6 h-6 ${v.color}`} />
                </div>
                <h3 className="text-white font-extrabold text-sm mb-3.5">{v.title}</h3>
                <p className="text-slate-450 text-xs font-semibold leading-relaxed">{v.desc}</p>
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
  <section className="py-24 border-y border-white/5 bg-slate-950 relative z-10">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <div className="text-amber-500 text-xs font-bold uppercase tracking-[0.25em] mb-5">Nguyên tắc cốt lõi</div>
      <h3 className="text-2xl md:text-3.5xl font-black text-white mb-16 max-w-4xl mx-auto leading-snug">
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
              <div className="w-16 h-16 rounded-full border border-amber-500/20 bg-amber-500/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-black/30">
                <Icon className="w-7 h-7 text-amber-400" />
              </div>
              <div className="text-white text-sm font-extrabold">{p.label}</div>
              <div className="text-slate-500 text-[10px] font-extrabold uppercase tracking-widest">{p.sub}</div>
            </div>
          )
        })}
      </div>
    </div>
  </section>
)

// ─── Vision 2045 Redesign (High impact metrics block) ──────────────────────────
const Vision2040 = () => {
  const ref = useFadeIn()
  return (
    <section className="relative py-40 overflow-hidden bg-slate-900/10">
      <DataField count={60} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.06),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_30%_40%,rgba(6,182,212,0.05),transparent)]" />

      <div ref={ref} className="fade-section relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="text-amber-500 text-xs font-bold uppercase tracking-[0.25em] mb-6 font-mono">Tầm nhìn 2045</div>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-tight">
          Biểu tượng mới của{' '}
          <span className="gradient-text font-black">Khát vọng Công nghệ Việt Nam</span>
        </h2>

        <p className="text-slate-350 text-lg leading-relaxed mb-16 max-w-3xl mx-auto font-semibold">
          Đến năm 2045, CMC SpaceY Group JSC. định hướng trở thành tập đoàn công nghệ vũ trụ — viễn thám — AI — tài chính số có tầm ảnh hưởng lớn, lấy Việt Nam làm cơ sở đầu não điều hành và thương mại hóa toàn cầu.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            { val: '100%', label: 'Vốn sở hữu Việt Nam', color: 'text-amber-400', border: 'border-amber-500/20' },
            { val: 'Khu vực', label: 'Tầm vóc hướng tới', color: 'text-cyan-400', border: 'border-cyan-500/20' },
            { val: '2045', label: 'Tầm nhìn dài hạn', color: 'text-indigo-400', border: 'border-indigo-500/20' },
          ].map((item, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${item.border} bg-slate-950/60 shadow-lg`}>
              <div className={`text-3xl font-black mb-2 ${item.color} font-mono`}>{item.val}</div>
              <div className="text-slate-500 font-bold text-xs uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>

        <blockquote className="border-l-4 border-amber-500 pl-6 text-left max-w-2xl mx-auto bg-slate-950/60 backdrop-blur-sm p-5 rounded-r-xl border border-white/5 shadow-xl">
          <p className="text-slate-300 text-lg italic leading-relaxed font-semibold">
            "Tự chủ hạ tầng không gian để kiến tạo tương lai phát triển bền vững cho nền kinh tế số nước nhà."
          </p>
          <footer className="mt-4.5 text-amber-450 text-sm font-bold">— Chu Minh Chiến, Chủ tịch CMC SpaceY</footer>
        </blockquote>
      </div>
    </section>
  )
}

// ─── Contact CTA Redesign (Gradient Container) ──────────────────────────────────
const ContactCTA = () => (
  <section id="contact" className="py-28 bg-slate-950 relative z-10">
    <div className="max-w-4xl mx-auto px-6">
      <div className="relative p-10 md:p-16 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white overflow-hidden shadow-2xl text-center border border-white/10 glow-gold">
        
        {/* Background visual detail */}
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-4 font-mono">Hợp tác phát triển</div>
          <h2 className="text-3xl md:text-4.5xl font-extrabold text-white mb-6 leading-snug">
            Cùng xây dựng tương lai công nghệ không gian Việt Nam
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-12 font-medium">
            CMC SpaceY Group JSC. nồng nhiệt chào đón các cơ quan Nhà nước, đối tác khoa học, quỹ đầu tư công nghệ và chuyên gia toàn cầu cùng đồng hành khai phóng tiềm năng kinh tế không gian.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="mailto:info@cmcspacey.com"
              className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 text-white font-bold rounded-full glow-btn
                         hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 border border-amber-400/20"
            >
              Liên hệ hợp tác
              <ArrowRight className="w-5.5 h-5.5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#about"
              className="w-full sm:w-auto text-center px-8 py-4 border border-white/10 text-white bg-white/5 font-bold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Tìm hiểu thêm
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// ─── Footer Redesign (Sleek dark footer with clear text) ─────────────────────────────
const Footer = () => (
  <footer className="border-t border-white/5 bg-slate-950 py-20 relative z-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-cyan-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Satellite className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-extrabold text-sm">CMC SpaceY</div>
              <div className="text-amber-400 text-[10px] font-bold tracking-widest uppercase">Group JSC.</div>
            </div>
          </div>
          <p className="text-slate-450 text-xs leading-relaxed mb-4 font-semibold">
            Tập đoàn Công nghệ Không gian — Vệ tinh — Dữ liệu — AI — Tài chính số 100% vốn sở hữu Việt Nam.
          </p>
          <p className="text-slate-500 text-xs italic font-semibold">"Khai phóng tiềm năng không gian Việt Nam"</p>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="text-white text-sm font-extrabold mb-6">Lĩnh vực trọng tâm</h4>
          <ul className="space-y-3.5">
            {['Công nghệ Vệ tinh viễn thám', 'Phân tích dữ liệu không gian', 'Ứng dụng AI chuyên sâu', 'Hạ tầng Sàn tài sản số', 'Cổng thanh toán dịch vụ', 'Hệ sinh thái Ngân hàng số'].map((item) => (
              <li key={item} className="text-slate-400 text-xs hover:text-amber-400 font-semibold cursor-pointer transition-colors">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Info Column */}
        <div>
          <h4 className="text-white text-sm font-extrabold mb-6">Thông tin tập đoàn</h4>
          <div className="space-y-4.5">
            {[
              { label: 'Trụ sở chính', value: 'Việt Nam' },
              { label: 'Đầu tư hạ tầng', value: 'Khu công nghệ cao TP. Hồ Chí Minh & Vũng Tàu' },
              { label: 'Cơ cấu sở hữu', value: '100% dòng vốn Việt Nam' },
              { label: 'Lĩnh vực đăng ký', value: 'Công nghệ không gian · Phân tích dữ liệu · Kinh tế số' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1.5">{item.label}</div>
                <div className="text-slate-350 text-xs font-semibold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-xs font-bold">
        <div>© 2026 CMC SpaceY Group JSC. All rights reserved.</div>
        <div className="text-slate-500">Tập đoàn Công nghệ Không gian Việt Nam | www.cmcspacey.com</div>
      </div>
    </div>
  </footer>
)

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-amber-500 selection:text-black">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <VisionMission />
      <BusinessAreas />
      <OrbitsConstellation />
      <SubterraneanMining />
      <Infrastructure />
      <Services />
      <InternationalNetwork />
      <Roadmap />
      <StrategicValue />
      <Principles />
      <Vision2040 />
      <ContactCTA />
      <Footer />
    </div>
  )
}
