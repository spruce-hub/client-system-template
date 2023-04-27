export const useHtmlFontSize = () => {
  const htmlFontSize = ref(0)

  const update = () => {
    const clientWidth = document.body.clientWidth
    if (clientWidth < 720) {
      htmlFontSize.value = 6
    } else if (clientWidth < 1000) {
      htmlFontSize.value = 7.5
    } else if (clientWidth < 1240) {
      htmlFontSize.value = 9
    } else if (clientWidth < 1480) {
      htmlFontSize.value = 10
    } else if (clientWidth < 1720) {
      htmlFontSize.value = 11
    } else {
      htmlFontSize.value = 12
    }
  }

  onMounted(() => update())
  onMounted(() => window.addEventListener('resize', update, false))
  onUnmounted(() => window.removeEventListener('resize', update, false))

  return { htmlFontSize }
}

export const useScroll = () => {
  let scrollTemp = 0
  const scrollTop = ref(0)
  const scrollOffsetTop = ref(0)
  const scrollWheel = ref<'top' | 'bottom' | null>(null)
  const getScroll = () => {
    scrollTop.value = window.scrollY
    scrollOffsetTop.value = window.innerHeight
    scrollWheel.value = window.scrollY - scrollTemp > 0 ? 'bottom' : 'top'
  }

  let ticking = false
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        getScroll()
        scrollTemp = window.scrollY
        ticking = false
      })

      ticking = true
    }
  }

  onMounted(() => window.addEventListener('scroll', handleScroll, false))
  onUnmounted(() => window.removeEventListener('scroll', handleScroll, false))
  return { scrollTop, scrollWheel, scrollOffsetTop }
}
