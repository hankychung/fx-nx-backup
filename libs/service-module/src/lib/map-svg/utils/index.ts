export const StopPropagation = (e: Event): void => {
  e.stopPropagation()
}

export const wheelPreventDefault = (
  dom: HTMLElement | HTMLDivElement | null
) => {
  dom?.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault()
    },
    { passive: false }
  )
}
