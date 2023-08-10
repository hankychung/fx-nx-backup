import { getParentNode } from '@flyele-nx/utils'
import { useEffect } from 'react'

const useDomClickToHide = (
  selectors: string[],
  hideFn: () => void,
  options?: { ignoreSelectors: string[] }
) => {
  useEffect(() => {
    const clickFn = (e: MouseEvent) => {
      const clickDom = e.target as HTMLElement

      if (options && options.ignoreSelectors.includes(clickDom.id)) {
        return
      }

      function bingo() {
        for (const selector of selectors) {
          if (getParentNode(clickDom, selector)) {
            return true
          }
        }

        return false
      }

      if (!bingo()) hideFn()
    }

    document.addEventListener('click', clickFn)

    return () => {
      document.removeEventListener('click', clickFn)
    }
  }, [hideFn, selectors, options])
}

export default useDomClickToHide
