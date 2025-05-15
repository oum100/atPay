// composables/useSessionWatcher.ts
export function useSessionWatcher(interval = 60_000) {
  let isWatching = false
  let timer: ReturnType<typeof setInterval>

  const startWatching = () => {
    if (isWatching || typeof window === 'undefined') return
    isWatching = true

    const { status, getSession } = useAuth()

    const refresh = async () => {
      if (status.value === 'authenticated') {
        await getSession()
      }
    }

    refresh()
    timer = setInterval(refresh, interval)
  }

  const stopWatching = () => {
    clearInterval(timer)
    isWatching = false
  }

  return { startWatching, stopWatching }
}
