import { Button } from "@/components/shadcn/button";

export function Header({
  navLinks,
  actionButtons
}: {
  navLinks?: { href: string, label: string }[];
  actionButtons?: {
    label: string;
    variant?: "outline" | "default";
  }[]
}) {
  return (
    <header className="bg-card border-b border-border px-10 py-4 flex items-center justify-between gap-4">
      <nav className="grow">
        <ul className="flex items-center gap-4">
          <li className="mr-auto"><a className="text-muted-foreground" href="#" aria-label="Home page">
            Distress Journal</a></li>
          {navLinks?.map((link) => (
            <li key={link.href}><a className="text-muted-foreground" href={link.href}>{link.label}</a></li>
          ))}
        </ul>
      </nav>
      {actionButtons?.map((button) => (
        <Button key={button.label} variant={button.variant}>{button.label}</Button>
      ))}
    </header>
  )
}