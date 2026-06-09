import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Bike, Compass, Gauge, Mountain, Star, Quote, Instagram,
  Shield, Wrench, MapPin, Calendar, Users, Award, Headphones, Fuel,
  ChevronDown, Play,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import trips from "@/assets/trips.jpg";
import lessons from "@/assets/lessons.jpg";
import advanced from "@/assets/advanced.jpg";
import scooty from "@/assets/scooty.jpg";
import about from "@/assets/about.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nomad Bikers Club — For Women, By Women" },
      { name: "description", content: "India's first women-only riding community. Bike & scooty training, personal coaching and getaways — making the road an equal space for women." },
      { property: "og:title", content: "Nomad Bikers Club — For Women, By Women" },
      { property: "og:description", content: "Making the road an equal space for women." },
    ],
  }),
  component: Home,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setV(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[560px] overflow-hidden">
        <motion.div style={{ scale, y }} className="absolute inset-0">
          <img src={hero} alt="Rider on mountain road" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent,oklch(0.08_0.01_40/0.6))]" />
        </motion.div>
        <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 self-start px-3 sm:px-4 py-1.5 rounded-full glass text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary mb-4 sm:mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> For Women, By Women — Estd 2021
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}
            className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] max-w-4xl">
            Making the road <br /> <span className="text-gradient">an equal space.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-muted-foreground">
            From your first throttle twist to confident highway rides — Nomad Bikers Club is India's women-only training community. Trained by women, for women.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
            <Link to="/booking" className="group inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-4 rounded-full bg-ember-gradient text-primary-foreground font-semibold shadow-glow hover:scale-105 transition text-sm sm:text-base">
              Book Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/careers" className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-4 rounded-full glass font-semibold hover:shadow-glow transition text-sm sm:text-base">
              <Play className="h-3.5 w-3.5" /> Join Us
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="mt-10 sm:mt-14 hidden sm:flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-primary" /> Women-only batches</span>
            <span className="inline-flex items-center gap-2"><Users className="h-3.5 w-3.5 text-primary" /> 5,000+ women trained</span>
            <span className="inline-flex items-center gap-2"><Award className="h-3.5 w-3.5 text-primary" /> Across 24+ cities</span>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* CITIES MARQUEE */}
      <section className="py-8 border-y border-border bg-secondary/30 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-muted-foreground/70">
          {[...Array(2)].flatMap((_, k) => (
            ["Bangalore", "Chennai", "Pune", "Mumbai", "Coimbatore", "Hyderabad", "Trivandrum", "Kochi", "Mysore", "Vizag", "Erode"].map((b, i) => (
              <span key={`${k}-${i}`} className="font-display text-xl sm:text-2xl tracking-widest">{b}</span>
            ))
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-16 sm:py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {[
            { n: 5000, s: "+", l: "Women Trained" },
            { n: 24, s: "+", l: "Cities" },
            { n: 100, s: "+", l: "New Bikers" },
            { n: 4.9, s: "★", l: "Avg. Rating", float: true },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-gradient">
                {s.float ? "4.9" : <Counter to={s.n} />}{s.s}
              </div>
              <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader eyebrow="What We Do" title="Crafted for every woman" desc="From the first wobble to confident highway riding." />
          <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { icon: Gauge, t: "Regular Training Batch", d: "3-hour group sessions for women already comfortable on a scooty — refine your skills.", img: advanced },
              { icon: Bike, t: "Beginner Training Batch", d: "Group of 5 — 20 hours over 4 days. Start from zero with confidence.", img: lessons },
              { icon: Mountain, t: "Getaways", d: "Women-only rides to a new location every 3 months.", img: trips },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group tilt-card relative overflow-hidden rounded-3xl glass shadow-elevated">
                <div className="tilt-inner">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.t} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="inline-flex p-3 rounded-2xl bg-ember-gradient text-primary-foreground mb-4">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                  <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="relative py-20 sm:py-28 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader eyebrow="Cities We Train In" title="A community across India" desc="Find us in your city." />
          <div className="mt-10 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {[
              { name: "Bangalore", days: "Active", img: trips, d: "Regular, Beginner & PT" },
              { name: "Chennai", days: "Active", img: hero, d: "Regular & PT" },
              { name: "Pune", days: "Active", img: about, d: "Regular & PT" },
              { name: "Mumbai", days: "Active", img: advanced, d: "Regular & PT" },
              { name: "Coimbatore", days: "Active", img: lessons, d: "Regular & PT" },
              { name: "Hyderabad", days: "Active", img: scooty, d: "Regular & PT" },
              { name: "Kochi", days: "Active", img: trips, d: "Regular & PT" },
              { name: "& more across India", days: "Coming Soon", img: hero, d: "New cities every quarter" },
            ].map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.07 }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[3/4]">
                <img src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest text-primary mb-1 inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {d.days}
                  </div>
                  <div className="font-display text-base sm:text-xl font-bold">{d.name}</div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground">{d.d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader eyebrow="The Process" title="From sign-up to sunset ride" desc="Four simple steps to get rolling." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: "01", icon: Calendar, t: "Book your slot", d: "Confirm your slot on the service you have chosen." },
              { n: "02", icon: Wrench, t: "Learn to Ride", d: "Hands-on practice — patient, supportive and judgement-free." },
              { n: "03", icon: Users, t: "Journey continues", d: "Practice sessions available each month." },
              { n: "04", icon: MapPin, t: "Own the Road", d: "Ride with confidence, explore with us." },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="relative glass rounded-3xl p-6 hover:shadow-glow transition">
                <div className="absolute -top-3 -right-3 font-display text-5xl font-bold text-primary/20">{s.n}</div>
                <div className="inline-flex p-3 rounded-2xl bg-ember-gradient text-primary-foreground mb-4">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TRIP */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img src={advanced} alt="Advanced rider" loading="lazy" className="w-full h-[360px] sm:h-[460px] md:h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/60 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-6 glass rounded-2xl p-4">
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-primary">Next Getaway</div>
                <div className="font-display text-xl sm:text-2xl font-bold mt-1">A new destination — every 3 months</div>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  <span className="glass rounded-full px-2.5 py-1">Women-only</span>
                  <span className="glass rounded-full px-2.5 py-1">All-levels</span>
                  <span className="glass rounded-full px-2.5 py-1">Curated routes</span>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Why Choose Us</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">A community that serves with purpose.</h2>
            <p className="mt-4 sm:mt-6 text-muted-foreground">
              Women trainers, judgement-free batches, gear guidance, and a community that thrives in creating a safe space for women.
            </p>
            <ul className="mt-6 sm:mt-8 grid sm:grid-cols-2 gap-3">
              {[
                { i: Shield, t: "Women trainers only" },
                { i: Users, t: "Small group batches of 5" },
                { i: Headphones, t: "1-on-1 personal training" },
                { i: Compass, t: "Getaways every 3 months" },
                { i: Award, t: "5,000+ women graduated" },
                { i: MapPin, t: "24+ cities across India" },
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3 glass rounded-xl px-3 py-2.5 text-sm">
                  <f.i className="h-4 w-4 text-primary shrink-0" /> {f.t}
                </li>
              ))}
            </ul>
            <Link to="/about" className="mt-8 sm:mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full glass font-semibold hover:shadow-glow transition">
              Our Story <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS PREVIEW */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader eyebrow="Nomad Stories" title="Loved by women across India" desc="Real voices from riders who learnt with us." />
          <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { n: "Priya S.", t: "Learnt scooty as a complete beginner — patient trainers and a truly safe space for women." },
              { n: "Sneha I.", t: "From scared of the throttle to riding solo in 7 days. The personal training is unmatched." },
              { n: "Aditi M.", t: "Found a community here. The getaways are unforgettable — women supporting women on the road." },
            ].map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-6 sm:p-7 shadow-elevated">
                <Quote className="h-6 w-6 text-primary mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed">"{r.t}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-ember-gradient flex items-center justify-center font-bold text-primary-foreground">{r.n[0]}</div>
                  <div>
                    <div className="font-semibold text-sm">{r.n}</div>
                    <div className="flex gap-0.5 mt-0.5">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3 w-3 fill-primary text-primary" />)}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/testimonials" className="inline-flex items-center gap-2 text-primary font-semibold">Read all Nomad Stories <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeader eyebrow="FAQ" title="Common questions" desc="Everything you need before signing up." />
          <div className="mt-10 space-y-3">
            {[
              { q: "Is this only for women?", a: "Yes — Nomad Bikers Club is a women-only training community. All our trainers and batches are exclusively for women." },
              { q: "Do I need my own bike?", a: "No — we provide a bike for training, including fuel, bike maintenance and safety gear." },
              { q: "What if I've never ridden anything before?", a: "You can join our beginner group training programme or opt for Personal Training." },
              { q: "How is Personal Training different?", a: "If you already know how to ride a scooter, you can opt for a 2-day personal training. If you're a complete beginner to scooter, you can opt for a 7-day personal training — both come with flexible dates and timings." },
              { q: "What are the Getaways?", a: "Women-only group rides to a new destination every 3 months. Routes are curated and beginner-friendly." },
              { q: "Which cities do you operate in?", a: "Bangalore, Chennai, Pune, Mumbai, Coimbatore, Hyderabad, Trivandrum, Kochi, Mysore, Vizag, Erode and more — 24+ cities." },
            ].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} i={i} />)}
          </div>
        </div>
      </section>

      {/* INSTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8 sm:mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Follow the journey</div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">@nomadbikersclub</h2>
            </div>
            <a href="https://www.instagram.com/nomadbikersclub" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass font-semibold hover:shadow-glow transition">
              <Instagram className="h-4 w-4" /> Follow
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {[hero, trips, advanced, lessons, scooty, about].map((src, i) => (
              <a key={i} href="https://www.instagram.com/nomadbikersclub" target="_blank" rel="noreferrer"
                className="relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl group">
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition flex items-center justify-center">
                  <Instagram className="h-6 w-6 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 md:p-20 text-center glass shadow-elevated">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.88_0.19_95/0.25),transparent_70%)]" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold">The road is yours. Take it.</h2>
              <p className="mt-3 sm:mt-4 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">Book a training batch, a personal session or join the next getaway. Slots fill up fast.</p>
              <Link to="/booking" className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-ember-gradient text-primary-foreground font-semibold shadow-glow hover:scale-105 transition">
                Book your spot <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
      className="glass rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
        <span className="font-semibold text-sm sm:text-base">{q}</span>
        <ChevronDown className={`h-4 w-4 text-primary shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto px-2">
      <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">{eyebrow}</div>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">{title}</h2>
      {desc && <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base">{desc}</p>}
    </div>
  );
}
