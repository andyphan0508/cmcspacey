import { useState, useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Satellite, Globe, Brain, TrendingUp, CreditCard, Building2,
  Zap, Smartphone, ChevronDown, Menu, X,
  MapPin, Shield, Rocket, Target, Eye, Heart, Users, Database,
  Layers, Award, ArrowRight, ChevronRight, Radio, Server, Anchor, Compass
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

// ─── Language Switch ──────────────────────────────────────────────────────────
const LANGS = [
  { code: 'vi', label: 'VI' },
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
]

const LangSwitch = ({ className = '' }) => {
  const { i18n } = useTranslation()
  const cur = LANGS.find(l => i18n.language?.startsWith(l.code))?.code || 'vi'
  return (
    <div className={`flex items-center rounded-full border border-white/15 p-0.5 ${className}`}>
      {LANGS.map(l => (
        <button key={l.code} onClick={() => i18n.changeLanguage(l.code)}
          className={`px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest rounded-full transition-colors ${cur === l.code ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}>
          {l.label}
        </button>
      ))}
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = t('nav.links', { returnObjects: true })

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/8 py-4' : 'bg-transparent py-6'}`}>
      <div className="w-full px-6 lg:px-10 flex items-center justify-between gap-10">
        <a href="#" className="flex items-center flex-shrink-0 group">
          <img src="/images/logo-line.png" alt="CMC SpaceY"
            className="logo-knockout h-5 md:h-6 w-auto object-contain" />
        </a>

        <div className="hidden xl:flex items-center justify-end flex-1 gap-7 2xl:gap-9">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-white/60 hover:text-white text-sm font-medium whitespace-nowrap transition-colors duration-200">
              {l.label}
            </a>
          ))}
          <a href="#contact"
            className="px-5 py-2 text-sm font-medium bg-white text-black rounded-full whitespace-nowrap hover:bg-white/90 transition-colors duration-200">
            {t('nav.cta')}
          </a>
          <LangSwitch className="flex-shrink-0" />
        </div>

        <div className="xl:hidden flex items-center gap-3">
          <LangSwitch />
          <button className="text-white/70 p-1" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
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
            {t('nav.ctaMobile')}
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const { t } = useTranslation()
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden bg-black">
      <DataField count={70} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-white/60 text-xs font-medium mb-10 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
              {t('hero.badge')}
            </div>

            <h1 className="mb-10">
              <img src="/images/logo-full.png" alt="CMC SpaceY Group JSC."
                className="logo-knockout w-full max-w-[340px] md:max-w-[460px] lg:max-w-[520px] h-auto" />
            </h1>

            <p className="text-xl md:text-2xl text-white font-medium mb-4 leading-snug">
              {t('hero.tagline')}
            </p>
            <p className="text-white/50 text-sm md:text-base max-w-xl mb-12 leading-relaxed">
              {t('hero.desc')}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a href="#about"
                className="glow-btn group flex items-center gap-2.5 px-7 py-3.5 rounded-full font-medium text-sm">
                {t('hero.explore')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#business"
                className="btn-outline px-7 py-3.5 rounded-full font-medium text-sm text-white">
                {t('hero.fields')}
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
                  <p className="text-white/50 text-[10px] uppercase font-medium tracking-wider">{t('hero.satLabel')}</p>
                  <p className="text-white text-xs font-medium">{t('hero.satValue')}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/45">
        <span className="text-[10px] uppercase font-medium tracking-widest">{t('hero.scroll')}</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────
const Stats = () => {
  const { t } = useTranslation()
  const icons = [Shield, Layers, Building2, Target]
  const items = t('stats', { returnObjects: true })
  return (
    <section className="theme-light border-y border-white/6">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-white/5">
          {items.map((item, i) => {
            const Icon = icons[i]
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
  const { t } = useTranslation()
  const ref = useFadeIn()
  const points = t('video.points', { returnObjects: true })
  return (
    <section id="video" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

      <div ref={ref} className="fade-section max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="label-tag mb-4">{t('video.tag')}</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-3">
            {t('video.title')}
          </h2>
          <div className="accent-line" />
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed mt-6">
            {t('video.desc')}
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
          {points.map((item, i) => (
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
  const { t } = useTranslation()
  const ref = useFadeIn()
  const info = t('about.info', { returnObjects: true })

  return (
    <section id="about" className="theme-light py-32 relative">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="label-tag mb-4">{t('about.tag')}</p>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-10 leading-tight">
              {t('about.title')}
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
                {t('about.quote')}
              </p>
              <div className="flex items-center gap-3.5 pt-5 border-t border-white/6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center font-medium text-xs text-white">CMC</div>
                <div>
                  <div className="text-white font-medium text-sm">{t('about.chairman')}</div>
                  <div className="accent-gold text-xs">{t('about.role')}</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 overflow-hidden relative group">
              <img src="/images/space_rd_center.png" alt="CMC SpaceY R&D Center"
                className="w-full h-48 object-cover group-hover:scale-[1.03] transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex items-end p-5">
                <div>
                  <p className="text-keep-white font-medium text-sm">{t('about.imgTitle')}</p>
                  <p className="text-keep-white-dim text-xs">{t('about.imgSub')}</p>
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
  const { t } = useTranslation()
  const ref = useFadeIn()
  const missions = t('vm.missions', { returnObjects: true })

  return (
    <section className="py-32 bg-black relative">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">{t('vm.tag')}</p>
          <h2 className="text-4xl md:text-5xl font-light text-white">{t('vm.title')}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-dark p-10 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-white/6 flex items-center justify-center mb-6">
              <Eye className="w-5 h-5 text-white/60" />
            </div>
            <p className="label-tag mb-2">{t('vm.visionTag')}</p>
            <h3 className="text-2xl font-light text-white mb-5">{t('vm.visionTitle')}</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {t('vm.visionDesc')}
            </p>
          </div>

          <div className="card-dark p-10 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-white/6 flex items-center justify-center mb-6">
              <Target className="w-5 h-5 text-white/60" />
            </div>
            <p className="label-tag mb-2">{t('vm.missionTag')}</p>
            <h3 className="text-2xl font-light text-white mb-5">{t('vm.missionTitle')}</h3>
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
  const { t } = useTranslation()
  const ref = useFadeIn()
  const icons = [Satellite, Globe, Brain, Zap, TrendingUp, CreditCard, Building2, Smartphone]
  const areas = t('business.areas', { returnObjects: true })

  return (
    <section id="business" className="theme-light py-32">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">{t('business.tag')}</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">{t('business.title')}</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            {t('business.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {areas.map((area, i) => {
            const Icon = icons[i]
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
  const { t } = useTranslation()
  const [activeOrbit, setActiveOrbit] = useState('leo')
  const ref = useFadeIn()

  const orbits = t('orbits.data', { returnObjects: true })
  const satCategories = t('orbits.cats', { returnObjects: true })
  const goals = t('orbits.goals', { returnObjects: true })

  return (
    <section id="orbits" className="py-32 bg-black relative overflow-hidden">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">{t('orbits.tag')}</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">{t('orbits.title')}</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            {t('orbits.desc')}
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
            <p className="text-white/45 text-xs font-medium uppercase tracking-widest mb-2">{t('orbits.infoLabel')}</p>
            <h3 className="text-lg font-medium text-white mb-5">{orbits[activeOrbit].name}</h3>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white/3 rounded-xl p-4 border border-white/6">
                <span className="text-white/45 text-[10px] uppercase font-medium block mb-1">{t('orbits.altLabel')}</span>
                <span className="text-white font-medium text-sm">{orbits[activeOrbit].alt}</span>
              </div>
              <div className="bg-white/3 rounded-xl p-4 border border-white/6">
                <span className="text-white/45 text-[10px] uppercase font-medium block mb-1">{t('orbits.latLabel')}</span>
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
          <h3 className="text-xl font-medium text-white text-center mb-8">{t('orbits.catsTitle')}</h3>
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
          <h3 className="text-2xl md:text-3xl font-light text-white mb-4">{t('orbits.goalTitle')}</h3>
          <p className="text-white/50 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
            {t('orbits.goalDesc')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {goals.map((g, i) => (
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
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(1)
  const ref = useFadeIn()

  const challenges = t('mining.challenges', { returnObjects: true })
  const workflow = t('mining.workflow', { returnObjects: true })

  return (
    <section id="mining" className="theme-light py-32">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">{t('mining.tag')}</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">{t('mining.title')}</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            {t('mining.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-white/20 inline-block" />
              {t('mining.challengesTitle')}
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
              <span className="text-white/45 text-xs uppercase font-medium block mb-1">{t('mining.penLabel')}</span>
              <p className="text-white font-medium text-sm">{t('mining.penValue')}</p>
            </div>
          </div>
        </div>

        <div className="card-dark p-8 rounded-2xl">
          <h3 className="text-lg font-medium text-white text-center mb-10">{t('mining.wfTitle')}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-3">
              {workflow.map((w, i) => (
                <button key={i} onClick={() => setActiveStep(i + 1)}
                  className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${activeStep === i + 1 ? 'bg-white/8 border-white/20' : 'bg-transparent border-white/5 hover:border-white/12'}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0 ${activeStep === i + 1 ? 'bg-white text-black' : 'bg-white/6 text-white/50'}`}>
                    {i + 1}
                  </div>
                  <span className={`text-xs font-medium ${activeStep === i + 1 ? 'text-white' : 'text-white/50'}`}>{w.title}</span>
                </button>
              ))}
            </div>
            <div className="bg-white/3 rounded-xl p-6 border border-white/6 min-h-[200px] flex flex-col justify-center">
              <span className="text-white/45 text-[10px] uppercase font-medium block mb-2">{t('mining.stepLabel')} {activeStep}</span>
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
  const { t } = useTranslation()
  const ref = useFadeIn()
  const centerIcons = [Brain, Rocket, Database, CreditCard, Users]
  const centers = t('infra.centers', { returnObjects: true })
  const complexIcons = [Radio, Users, Server]
  const complexItems = t('infra.complexItems', { returnObjects: true })
  const bulletIcons = [Anchor, Rocket, Compass]
  const bullets = t('infra.sp.bullets', { returnObjects: true })
  const specs = t('infra.sp.specs', { returnObjects: true })

  return (
    <section id="infrastructure" className="py-32 bg-black">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">{t('infra.tag')}</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">{t('infra.title')}</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed mb-6">
            {t('infra.desc')}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/3 border border-white/8 text-xs text-white/50 font-medium">
            <MapPin className="w-3.5 h-3.5" />
            {t('infra.location')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-24">
          {centers.map((c, i) => {
            const Icon = centerIcons[i]
            const num = String(i + 1).padStart(2, '0')
            return (
              <div key={i} className="card-dark group p-6 rounded-xl text-center relative">
                <div className="text-4xl font-light absolute top-4 right-4 opacity-4 text-white select-none">{num}</div>
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
            <h3 className="text-2xl font-light text-white mb-5">{t('infra.complexTitle')}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-7">
              {t('infra.complexDesc')}
            </p>
            <div className="space-y-4">
              {complexItems.map((item, i) => {
                const Icon = complexIcons[i]
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
                <p className="text-keep-white-dim text-[10px] uppercase font-medium">{t('infra.cleanLabel')}</p>
                <p className="text-keep-white text-xs font-medium">{t('infra.cleanValue')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spaceport */}
        <div id="spaceport" className="pt-16 border-t border-white/5">
          <div className="text-center mb-12">
            <p className="label-tag mb-4">{t('infra.sp.tag')}</p>
            <h3 className="text-3xl md:text-4xl font-light text-white mb-4">{t('infra.sp.title')}</h3>
            <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
              {t('infra.sp.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-xl font-medium text-white mb-5 flex items-center gap-3">
                <span className="w-6 h-0.5 bg-white/20 inline-block" />
                {t('infra.sp.subTitle')}
              </h4>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {t('infra.sp.subDesc')}
              </p>
              <ul className="space-y-4">
                {bullets.map((text, i) => {
                  const Icon = bulletIcons[i]
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/5 border border-white/8 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Icon className="w-3 h-3 text-white/50" />
                      </div>
                      <span className="text-white/60 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="card-dark p-4 rounded-2xl relative">
              <img src="/images/coastal_spaceport.png" alt="Offshore Launch Pad"
                className="w-full max-w-[440px] mx-auto h-auto rounded-xl object-cover hover:scale-[1.02] transition-transform duration-500" />
              <div className="absolute -bottom-5 -right-4 p-4 bg-black/95 border border-white/8 rounded-xl text-left max-w-[220px]">
                <span className="text-keep-white-dim text-[10px] uppercase font-medium block mb-2">{t('infra.sp.specLabel')}</span>
                <div className="space-y-1.5">
                  {specs.map((s, i) => (
                    <div key={i}>
                      <span className="text-keep-white-dim text-[10px] block">{s.label}</span>
                      <span className={`${i === 1 ? 'accent-gold' : 'text-keep-white'} text-xs font-medium`}>{s.value}</span>
                    </div>
                  ))}
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
  const { t } = useTranslation()
  const ref = useFadeIn()
  const cats = t('services.cats', { returnObjects: true })

  return (
    <section id="services" className="theme-light py-32">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">{t('services.tag')}</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">{t('services.title')}</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            {t('services.desc')}
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
  const { t } = useTranslation()
  const ref = useFadeIn()
  const phases = t('roadmap.phases', { returnObjects: true })

  return (
    <section id="roadmap" className="py-32 bg-black">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">{t('roadmap.tag')}</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">{t('roadmap.title')}</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            {t('roadmap.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          <div className="hidden md:block absolute top-7 left-[8%] right-[8%] h-px bg-white/6 pointer-events-none" />
          {phases.map((p, i) => (
            <div key={i} className="card-dark p-6 rounded-xl group">
              <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center text-xs font-light mb-5 mx-auto md:mx-0">
                {p.num}
              </div>
              <div className="label-tag text-[10px] mb-2">{t('roadmap.phaseLabel')} {p.num}</div>
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
  const { t } = useTranslation()
  const ref = useFadeIn()
  const branches = t('network.branches', { returnObjects: true })
  const countries = t('network.countries', { returnObjects: true })

  return (
    <section id="network" className="py-32 bg-[#050505]">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">{t('network.tag')}</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">{t('network.title')}</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            {t('network.desc')}
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
              <text x="250" y="63" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="500">{t('network.hub')}</text>
              {[{x:220,y:180},{x:150,y:240},{x:280,y:290},{x:320,y:230}].map((p,i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="rgba(255,255,255,0.5)" />)}
              {[{x:80,y:350},{x:480,y:340}].map((p,i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="rgba(255,255,255,0.3)" />)}
              <text x="228" y="194" fill="rgba(255,255,255,0.3)" fontSize="9">{countries[0]}</text>
              <text x="80" y="244" fill="rgba(255,255,255,0.3)" fontSize="9">{countries[1]}</text>
              <text x="290" y="305" fill="rgba(255,255,255,0.3)" fontSize="9">{countries[2]}</text>
              <text x="330" y="234" fill="rgba(255,255,255,0.3)" fontSize="9">{countries[3]}</text>
              <text x="80" y="370" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" fontWeight="500">{t('network.africa')}</text>
              <text x="480" y="360" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" fontWeight="500">{t('network.oceania')}</text>
            </svg>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-medium text-white flex items-center gap-3">
              <span className="w-6 h-0.5 bg-white/20 inline-block" />
              {t('network.mapTitle')}
            </h3>
            {branches.map((br, i) => (
              <div key={i} className="card-dark p-5 rounded-xl">
                <h4 className="text-white font-medium text-sm mb-2">{br.name}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{br.desc}</p>
              </div>
            ))}
            <div className="p-5 rounded-xl bg-white/3 border border-white/8">
              <span className="label-tag text-[10px] block mb-1">{t('network.exclTag')}</span>
              <p className="text-white/55 text-xs leading-relaxed">{t('network.exclDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Strategic Value ──────────────────────────────────────────────────────────
const StrategicValue = () => {
  const { t } = useTranslation()
  const ref = useFadeIn()
  const icons = [TrendingUp, Brain, Heart, Globe, Shield]
  const values = t('value.values', { returnObjects: true })

  return (
    <section className="theme-light py-32">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">{t('value.tag')}</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">{t('value.title')}</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            {t('value.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {values.map((v, i) => {
            const Icon = icons[i]
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
const Principles = () => {
  const { t } = useTranslation()
  const icons = [Shield, Eye, Users, Award]
  const items = t('principles.items', { returnObjects: true })
  return (
    <section className="py-20 border-y border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-xl md:text-2xl font-light text-white mb-14 max-w-3xl mx-auto">
          {t('principles.heading')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((p, i) => {
            const Icon = icons[i]
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
}

// ─── Vision 2045 ──────────────────────────────────────────────────────────────
const Vision2045 = () => {
  const { t } = useTranslation()
  const ref = useFadeIn()
  const stats = t('v2045.stats', { returnObjects: true })
  return (
    <section className="relative py-40 overflow-hidden bg-black">
      <DataField count={50} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(255,255,255,0.025),transparent)] pointer-events-none" />

      <div ref={ref} className="fade-section relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="label-tag mb-6">{t('v2045.tag')}</p>
        <h2 className="text-4xl md:text-6xl font-light text-white mb-10 leading-tight">
          {t('v2045.titleA')}<br />
          <span className="gradient-text">{t('v2045.titleB')}</span>
        </h2>
        <p className="text-white/50 text-base leading-relaxed mb-14 max-w-2xl mx-auto">
          {t('v2045.desc')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {stats.map((item, i) => (
            <div key={i} className="card-dark p-6 rounded-xl">
              <div className="text-2xl font-light text-white mb-1">{item.val}</div>
              <div className="text-white/45 text-xs uppercase font-medium tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>

        <blockquote className="border-l border-white/15 pl-6 text-left max-w-xl mx-auto">
          <p className="text-white/60 text-base italic leading-relaxed">
            {t('v2045.quote')}
          </p>
          <footer className="mt-3 accent-gold text-sm font-medium">{t('v2045.by')}</footer>
        </blockquote>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
const CONTACT_EMAIL = 'contact_hk@cmcspacey.com'

const ContactCTA = () => {
  const { t } = useTranslation()
  const ref = useFadeIn()
  const topics = t('contact.form.topics', { returnObjects: true })
  const [form, setForm] = useState({ name: '', email: '', org: '', topic: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | fallback

  const topic = form.topic || topics[0]
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const buildSubject = () =>
    `[CMC SpaceY] ${topic} — ${form.name}${form.org ? ` (${form.org})` : ''}`

  const openMailFallback = () => {
    const body = [
      t('contact.mail.header'),
      '==========================================',
      '',
      `${t('contact.mail.name')}: ${form.name}`,
      `${t('contact.mail.email')}: ${form.email}`,
      `${t('contact.mail.org')}: ${form.org || t('contact.mail.none')}`,
      `${t('contact.mail.topic')}: ${topic}`,
      '',
      `${t('contact.mail.content').toUpperCase()}:`,
      '------------------------------------------',
      form.message,
      '',
      '==========================================',
      t('contact.mail.footer'),
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
          [t('contact.mail.name')]: form.name,
          [t('contact.mail.email')]: form.email,
          [t('contact.mail.org')]: form.org || t('contact.mail.none'),
          [t('contact.mail.topic')]: topic,
          [t('contact.mail.content')]: form.message,
          _subject: buildSubject(),
          _replyto: form.email,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const data = await res.json()
      if (!res.ok || data.success === 'false' || data.success === false) throw new Error('send failed')
      setStatus('sent')
      setForm({ name: '', email: '', org: '', topic: '', message: '' })
    } catch {
      openMailFallback()
    }
  }

  return (
    <section id="contact" className="theme-light py-32">
      <div ref={ref} className="fade-section max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div className="lg:pt-6">
            <p className="label-tag mb-4">{t('contact.tag')}</p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 leading-snug">
              {t('contact.title')}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-md">
              {t('contact.desc')}
            </p>
            <div className="space-y-6">
              <div>
                <div className="label-tag text-[10px] mb-1.5">{t('contact.emailLabel')}</div>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-white text-sm font-medium hover:text-white/70 transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div>
                <div className="label-tag text-[10px] mb-1.5">{t('contact.hqLabel')}</div>
                <p className="text-white/55 text-sm">{t('contact.hq')}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card-dark p-8 md:p-10 rounded-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="label-tag text-[10px] block mb-2" htmlFor="ct-name">{t('contact.form.name')}</label>
                <input id="ct-name" name="name" required value={form.name} onChange={handleChange}
                  className="input-dark" placeholder={t('contact.form.nameP')} autoComplete="name" />
              </div>
              <div>
                <label className="label-tag text-[10px] block mb-2" htmlFor="ct-email">{t('contact.form.email')}</label>
                <input id="ct-email" name="email" type="email" required value={form.email} onChange={handleChange}
                  className="input-dark" placeholder={t('contact.form.emailP')} autoComplete="email" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="label-tag text-[10px] block mb-2" htmlFor="ct-org">{t('contact.form.org')}</label>
                <input id="ct-org" name="org" value={form.org} onChange={handleChange}
                  className="input-dark" placeholder={t('contact.form.orgP')} autoComplete="organization" />
              </div>
              <div>
                <label className="label-tag text-[10px] block mb-2" htmlFor="ct-topic">{t('contact.form.topic')}</label>
                <select id="ct-topic" name="topic" value={topic} onChange={handleChange} className="input-dark">
                  {topics.map(tp => <option key={tp}>{tp}</option>)}
                </select>
              </div>
            </div>
            <div className="mb-7">
              <label className="label-tag text-[10px] block mb-2" htmlFor="ct-message">{t('contact.form.message')}</label>
              <textarea id="ct-message" name="message" required rows={5} value={form.message} onChange={handleChange}
                className="input-dark resize-none" placeholder={t('contact.form.messageP')} />
            </div>
            <button type="submit" disabled={status === 'sending'}
              className="glow-btn group w-full flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-medium text-sm disabled:opacity-60 disabled:cursor-wait">
              {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
              {status !== 'sending' && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
            {status === 'sent' && (
              <p className="text-white/60 text-xs text-center mt-4 leading-relaxed">
                {t('contact.form.sent', { email: CONTACT_EMAIL })}
              </p>
            )}
            {status === 'fallback' && (
              <p className="text-white/60 text-xs text-center mt-4 leading-relaxed">
                {t('contact.form.fallback', { email: CONTACT_EMAIL })}
              </p>
            )}
          </form>

        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const { t } = useTranslation()
  const focus = t('footer.focus', { returnObjects: true })
  const info = t('footer.info', { returnObjects: true })
  return (
    <footer className="border-t border-white/5 bg-black py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          <div>
            <div className="inline-flex bg-white rounded-xl px-4 py-2.5 mb-5">
              <img src="/images/logo-full.png" alt="CMC SpaceY Group JSC."
                className="h-12 w-auto object-contain" />
            </div>
            <p className="text-white/45 text-xs leading-relaxed mb-3">
              {t('footer.desc')}
            </p>
            <p className="text-white/35 text-xs italic">{t('footer.slogan')}</p>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-5">{t('footer.focusTitle')}</h4>
            <ul className="space-y-2.5">
              {focus.map(item => (
                <li key={item} className="text-white/40 text-xs hover:text-white/60 cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-5">{t('footer.infoTitle')}</h4>
            <div className="space-y-4">
              {info.map(item => (
                <div key={item.label}>
                  <div className="text-white/35 text-[10px] uppercase font-medium tracking-widest mb-1">{item.label}</div>
                  <div className="text-white/55 text-xs">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-white/35 text-xs">
          <div>{t('footer.rights')}</div>
          <div>www.cmcspacey.com</div>
        </div>
      </div>
    </footer>
  )
}

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
