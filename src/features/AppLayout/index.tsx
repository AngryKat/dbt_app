import { AppHeader } from "./components/AppHeader"

export function AppLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <AppHeader />
      {children}
    </main>)
}