import {
  Alert as ShadcnAlert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/shadcn/alert";
import {
  CircleCheckBig,
  InfoIcon,
  OctagonAlert,
  TriangleAlert,
} from "lucide-react";

type Variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "success"
  | "warning"
  | "info";

const iconVariantMap: Record<Variant, React.ReactNode> = {
  default: null,
  destructive: <OctagonAlert />,
  outline: null,
  secondary: null,
  success: <CircleCheckBig />,
  warning: <TriangleAlert />,
  info: <InfoIcon />,
};

type AlertProps = {
  variant?: Variant;
  title: string;
  description?: string;
  alertAction?: React.ReactNode;
} & React.ComponentProps<typeof ShadcnAlert>;

export function Alert({
  variant = "default",
  title,
  description,
  alertAction,
}: AlertProps) {
  return (
    <ShadcnAlert>
      {iconVariantMap[variant] /* You can change the variant here */}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      {alertAction && <AlertAction>{alertAction}</AlertAction>}
    </ShadcnAlert>
  );
}
