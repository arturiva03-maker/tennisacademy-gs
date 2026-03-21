import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonWithIconProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "outline";
}

const ButtonWithIcon = ({
  children,
  href,
  onClick,
  className,
  type = "button",
  disabled = false,
  variant = "primary",
}: ButtonWithIconProps) => {
  const baseClasses =
    "relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer";

  const variantClasses =
    variant === "outline"
      ? "bg-transparent border-2 border-[--navy] text-[--navy] hover:bg-transparent"
      : "";

  const iconBg =
    variant === "outline"
      ? "bg-[--navy] text-white"
      : "bg-background text-foreground";

  if (href) {
    return (
      <Button
        className={cn(baseClasses, variantClasses, className)}
        asChild
      >
        <a href={href}>
          <span className="relative z-10 transition-all duration-500">
            {children}
          </span>
          <div
            className={cn(
              "absolute right-1 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45",
              iconBg
            )}
          >
            <ArrowUpRight size={16} />
          </div>
        </a>
      </Button>
    );
  }

  return (
    <Button
      className={cn(baseClasses, variantClasses, className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <span className="relative z-10 transition-all duration-500">
        {children}
      </span>
      <div
        className={cn(
          "absolute right-1 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45",
          iconBg
        )}
      >
        <ArrowUpRight size={16} />
      </div>
    </Button>
  );
};

export default ButtonWithIcon;
