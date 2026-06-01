import { Header } from "@/components/ui/Header";

export function AppHeader() {
  return <Header navLinks={[
    {
      href: "/",
      label: "History"
    }
  ]}
    actionButtons={[
      {
        label: "Save entry",
      }
    ]} />
}