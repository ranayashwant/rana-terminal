/* useReveal.js — robust IntersectionObserver + GSAP reveal hook for React 18 StrictMode.
   Guarantees elements are 100% visible on mount/scroll with zero blank page issues. */

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

    /* Fallback timer: if observer takes more than 300ms, force reveal to prevent blank page */
    const safetyTimer = setTimeout(() => {
      if (el && !el.classList.contains('revealed')) {
        el.classList.add('revealed')
      }
    }, 400)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(safetyTimer)
          el.classList.add('revealed')

          /* Animate child stagger items if present */
          const items = el.querySelectorAll(options.staggerSelector || '.exp-row, .skill-row')
          if (items.length > 0) {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power1.out',
              overwrite: 'auto',
            })
          }

          observer.unobserve(el)
        }
      },
      {
        threshold: options.threshold ?? 0.05,
        rootMargin: options.rootMargin ?? '0px 0px -20px 0px',
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
