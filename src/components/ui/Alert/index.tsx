import {
  Alert as ShadcnAlert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/shadcn/alert";
import {
  CheckCheckIcon,
  InfoIcon,
  OctagonAlert,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "default" | "destructive" | "success" | "warning" | "info";

const iconVariantMap: Record<Variant, React.ReactNode> = {
  default: null,
  destructive: <OctagonAlert />,
  success: <CheckCheckIcon />,
  warning: <TriangleAlert />,
  info: <InfoIcon />,
};

const classNameVariantMap: Record<Variant, string> = {
  default: "",
  destructive: "bg-destructive/10 text-destructive border-none",
  success:
    "border-none bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400",
  warning:
    "border-none bg-amber-600/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400",
  info: "border-none bg-sky-600/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400",
};

type OptionalProps = Partial<{
  variant: Variant;
  description: string;
  alertAction: React.ReactNode;
}>;

type AlertProps = {
  title: string;
} & OptionalProps &
  React.ComponentProps<typeof ShadcnAlert>;

export function Alert({
  variant = "default",
  title,
  description,
  alertAction,
  className,
  ...props
}: AlertProps) {
  return (
    <ShadcnAlert
      className={cn(classNameVariantMap[variant], className)}
      {...props}
    >
      {iconVariantMap[variant]}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      {alertAction && <AlertAction>{alertAction}</AlertAction>}
    </ShadcnAlert>
  );
}
