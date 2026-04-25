export function NoEmotionsFound({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="grid h-full w-full place-items-center gap-2">
      <p className="text-muted-foreground">
        {`No emotions found for "${searchTerm}" entry :(`}
      </p>
    </div>
  );
}
