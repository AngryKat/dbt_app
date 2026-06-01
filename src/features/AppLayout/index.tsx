import { AppHeader } from "./components/AppHeader"

export function AppLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppHeader />
      <main>
        {children}
      </main>
    </>
  )
}