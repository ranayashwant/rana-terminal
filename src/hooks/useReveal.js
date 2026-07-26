/* useReveal.js — custom hook for scroll-triggered reveal animations.
   Attaches an IntersectionObserver to a ref element. When the element enters
   the viewport, adds the 'revealed' class which triggers the CSS transition
   defined in animations.css.
   
   Usage in any component:
     const ref = useReveal()
     return <section ref={ref} className="my-section reveal"> */

import { useEffect, useRef } from 'react'

export function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    /* Check prefers-reduced-motion — if the user has requested less motion,
       skip the animation and immediately mark the element as visible */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      el.classList.add('revealed')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          /* Unobserve after first reveal — the animation only fires once */
          observer.unobserve(el)
        }
      },
      {
        threshold:   options.threshold   ?? 0.1,    /* trigger when 10% of element is visible */
        rootMargin:  options.rootMargin  ?? '0px 0px -40px 0px',  /* fire slightly before bottom edge */
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return ref
}
