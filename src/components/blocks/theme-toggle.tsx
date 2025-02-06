import { Toggle } from "@/components/ui/toggle"
import { SunIcon, MoonIcon } from "@radix-ui/react-icons"
import { useTheme } from "@/theme/use-theme"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Toggle
      pressed={theme === "dark"}
      onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`fixed top-4 right-4 z-50 px-3 py-2 rounded-md flex items-center gap-2 transition-colors hover:bg-accent
        ${theme === "dark"
          ? "bg-accent text-accent-foreground"
          : "bg-background text-foreground border border-border"
        }`}
    >
      {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </Toggle>
  )
}