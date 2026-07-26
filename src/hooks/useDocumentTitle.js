/* useDocumentTitle.js — custom hook for setting dynamic per-page document titles */

import { useEffect } from 'react'

export function useDocumentTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = title
    }
  }, [title])
}
