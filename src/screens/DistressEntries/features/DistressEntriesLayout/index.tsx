export function DistressEntriesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-10 py-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-1">Log your state</h1>
      <p className="text-sm text-muted-foreground mb-6">Track how you feel right now — stress, emotions, and context.</p>
      {children}
    </div>
  );
}