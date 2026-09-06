import { useEffect, useRef, useState } from 'react'

const OPTIONS = [
  {
    id: 'mandi',
    label: 'Local mandi',
    price: 2450,
    costs: { transport: 180, wastage: 95, commission: 120, delay: 40 },
  },
  {
    id: 'trader',
    label: 'Village trader',
    price: 2280,
    costs: { transport: 40, wastage: 30, commission: 0, delay: 15 },
  },
  {
    id: 'buyer',
    label: 'Direct buyer',
    price: 2380,
    costs: { transport: 90, wastage: 45, commission: 0, delay: 0 },
  },
]

function netOf(option) {
  const deductions = Object.values(option.costs).reduce((a, b) => a + b, 0)
  return option.price - deductions
}

const RANKED = [...OPTIONS]
  .map((o) => ({ ...o, net: netOf(o) }))
  .sort((a, b) => b.net - a.net)

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function Reveal({ children, className = '', delay = 0 }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState(RANKED[0].id)
  const selected = RANKED.find((o) => o.id === active) ?? RANKED[0]

  return (
    <div className="page">
      <header className="nav">
        <a className="nav-brand" href="#top">
          Haasil
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#compare">Compare</a>
          <a href="#how">How it works</a>
          <a href="#join" className="nav-cta">
            Join waitlist
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-label="Haasil introduction">
          <div className="hero-media" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2400&q=80"
              alt=""
              className="hero-image"
            />
            <div className="hero-shade" />
          </div>

          <div className="hero-content">
            <p className="brand-mark">Haasil</p>
            <h1>Sell where more money reaches your pocket.</h1>
            <p className="hero-lead">
              Compare buyers by expected net realisation — price minus transport,
              wastage, commissions, and payment delays.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#join">
                Start comparing
              </a>
              <a className="btn btn-ghost" href="#compare">
                See an example
              </a>
            </div>
          </div>
        </section>

        <section className="section problem" aria-labelledby="problem-title">
          <Reveal>
            <p className="eyebrow">The gap</p>
            <h2 id="problem-title">Market price is not pocket price.</h2>
            <p className="section-lead">
              Indian farmers lose 15–25% of potential income to information gaps
              and middleman dependency. Seeing ₹2,450/quintal means little until
              you know what remains after every cost.
            </p>
          </Reveal>
        </section>

        <section
          id="compare"
          className="section compare"
          aria-labelledby="compare-title"
        >
          <Reveal>
            <p className="eyebrow">Core idea</p>
            <h2 id="compare-title">Expected net realisation, ranked.</h2>
            <p className="section-lead">
              Same produce. Three selling options. Haasil ranks what you keep —
              not what the board shows.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="compare-panel" role="list">
              {RANKED.map((option, index) => {
                const isActive = option.id === active
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="listitem"
                    className={`rank-row ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActive(option.id)}
                    aria-pressed={isActive}
                  >
                    <span className="rank-index">{index + 1}</span>
                    <span className="rank-label">{option.label}</span>
                    <span className="rank-price">
                      Board ₹{option.price.toLocaleString('en-IN')}
                    </span>
                    <span className="rank-net">
                      Net ₹{option.net.toLocaleString('en-IN')}
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="breakdown" aria-live="polite">
              <h3>
                Cost breakdown · <span>{selected.label}</span>
              </h3>
              <dl>
                <div>
                  <dt>Selling price</dt>
                  <dd>₹{selected.price.toLocaleString('en-IN')}</dd>
                </div>
                <div>
                  <dt>Transport</dt>
                  <dd>−₹{selected.costs.transport}</dd>
                </div>
                <div>
                  <dt>Wastage</dt>
                  <dd>−₹{selected.costs.wastage}</dd>
                </div>
                <div>
                  <dt>Commission</dt>
                  <dd>−₹{selected.costs.commission}</dd>
                </div>
                <div>
                  <dt>Payment delay cost</dt>
                  <dd>−₹{selected.costs.delay}</dd>
                </div>
                <div className="breakdown-net">
                  <dt>Expected net realisation</dt>
                  <dd>₹{selected.net.toLocaleString('en-IN')}/qtl</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </section>

        <section id="how" className="section how" aria-labelledby="how-title">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 id="how-title">From produce details to a clear choice.</h2>
          </Reveal>

          <ol className="steps">
            {[
              {
                title: 'Tell us your produce',
                text: 'Quality, quantity, location, and when you need to sell.',
              },
              {
                title: 'We pull live options',
                text: 'Mandi rates and buyer offers, with every cost estimated.',
              },
              {
                title: 'Pick the best net',
                text: 'Ranked by what reaches your pocket — then manage the deal.',
              },
            ].map((step, i) => (
              <Reveal key={step.title} delay={i * 100} className="step">
                <li>
                  <span className="step-num">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        <section id="join" className="section join" aria-labelledby="join-title">
          <Reveal>
            <p className="eyebrow">Early access</p>
            <h2 id="join-title">Built for farmers who want clarity, not another price board.</h2>
            <p className="section-lead">
              Join the waitlist. We are opening first in select mandi belts —
              transparent rankings, offer tracking, and trust scores from real deals.
            </p>
            <form
              className="waitlist"
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.currentTarget
                const data = new FormData(form)
                const phone = String(data.get('phone') || '').trim()
                if (!phone) return
                form.reset()
                form.dataset.done = 'true'
              }}
            >
              <label className="sr-only" htmlFor="phone">
                Mobile number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                placeholder="Your mobile number"
                required
                autoComplete="tel"
              />
              <button type="submit" className="btn btn-primary">
                Join waitlist
              </button>
            </form>
            <p className="form-note">No spam. We will message only when your belt opens.</p>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <span className="nav-brand">Haasil</span>
        <p>Know what reaches your pocket.</p>
      </footer>
    </div>
  )
}
