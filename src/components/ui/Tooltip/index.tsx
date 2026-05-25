import { Tooltip as ShadcnTooltip, TooltipContent, TooltipTrigger } from "@/components/shadcn/tooltip";

type TooltipProps = React.ComponentProps<typeof ShadcnTooltip> & {
  content: React.ReactNode;
  children: React.ReactNode;
};

export function Tooltip({
  children,
  content,
  ...props
}: TooltipProps) {
  return (
    <ShadcnTooltip
      {...props}
    >
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        {content}
      </TooltipContent>
    </ShadcnTooltip>
  )
}
