// 📄 composables/useTheme.ts
export const useAppTheme = () => {
    const theme = useState<'light' | 'dark'>('theme', () => 'light')
    return theme
  }
  