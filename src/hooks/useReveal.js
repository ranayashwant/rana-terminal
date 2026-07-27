/* useReveal.js — Apple-style scale & spring reveal hook.
   Triggers hardware-accelerated scale expansion & depth pop on scroll. */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.classList.add('revealed')
      return
    }

    const safetyTimer = setTimeout(() => {
      if (el && !el.classList.contains('revealed')) {
        el.classList.add('revealed')
      }
    }, 450)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(safetyTimer)
          el.classList.add('revealed')

          /* Animate child stagger items with Apple spring timing */
          const items = el.querySelectorAll(options.staggerSelector || '.exp-row, .skill-row, .project-card')
          if (items.length > 0) {
            gsap.fromTo(
              items,
              { opacity: 0, y: 20, scale: 0.97 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.65,
                stagger: 0.08,
                ease: 'power3.out',
                overwrite: 'auto',
              }
            )
          }

          observer.unobserve(el)
        }
      },
      {
        threshold: options.threshold ?? 0.08,
        rootMargin: options.rootMargin ?? '0px 0px -30px 0px',
      }
    )

    observer.observe(el)

    return () => {
      clearTimeout(safetyTimer)
      observer.disconnect()
    }
  }, [options.threshold, options.rootMargin, options.staggerSelector])

  return ref
}
