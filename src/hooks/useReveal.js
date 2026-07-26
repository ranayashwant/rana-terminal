/* useReveal.js — GSAP & ScrollTrigger reveal hook with prefers-reduced-motion check (spec §6, Step 11).
   Handles section fade-up, row-by-row staggers (80ms delay), and reduced-motion fallback. */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    /* ── Reduced motion check: skip animations if user requested reduced motion ── */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.classList.add('revealed')
      gsap.set(el, { opacity: 1, y: 0 })
      const children = el.querySelectorAll('.exp-row, .skill-row, .reveal')
      if (children.length) gsap.set(children, { opacity: 1, y: 0 })
      return
    }

    /* Base section reveal */
    el.classList.add('revealed')
    
    const ctx = gsap.context(() => {
      /* Main section fade + 16px slide up */
      gsap.fromTo(
        el,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: options.start || 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      /* Row-by-row stagger (~80ms) for child rows if present */
      const staggerItems = el.querySelectorAll(options.staggerSelector || '.exp-row, .skill-row')
      if (staggerItems.length > 0) {
        gsap.fromTo(
          staggerItems,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08, /* 80ms stagger per row */
            ease: 'power1.out',
            scrollTrigger: {
              trigger: el,
              start: options.start || 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, ref)

    return () => ctx.revert()
  }, [options.start, options.staggerSelector])

  return ref
}
