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
  onDark?: boolean;
  target?: string;
  rel?: string;
  download?: boolean | string;
}

const ButtonWithIcon = ({
  children,
  href,
  onClick,
  className,
  type = "button",
  disabled = false,
  variant = "primary",
  onDark = false,
  target,
  rel,
  download,
}: ButtonWithIconProps) => {
  const baseClasses =
    "relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-[padding,transform,background-color] duration-200 ease-out hover:ps-14 hover:pe-6 active:scale-[0.97] w-fit overflow-hidden cursor-pointer";

  const variantClasses =
    variant === "outline"
      ? onDark
        ? "bg-white/15 border-2 border-white text-white hover:bg-white/25"
        : "bg-transparent border-2 border-[--navy] text-[--navy] hover:bg-transparent"
      : onDark
        ? "bg-white text-[--navy] hover:bg-white/90"
        : "";

  const iconBg =
    variant === "outline"
      ? onDark
        ? "bg-white text-[--navy]"
        : "bg-[--navy] text-white"
      : onDark
        ? "bg-[--navy] text-white"
        : "bg-background text-foreground";

  if (href) {
    return (
      <Button
        className={cn(baseClasses, variantClasses, className)}
        asChild
      >
        <a href={href} target={target} rel={rel} download={download}>
          <span className="relative z-10 transition-transform duration-200 ease-out">
            {children}
          </span>
          <div
            className={cn(
              "absolute right-1 w-10 h-10 rounded-full flex items-center justify-center transition-[right,transform] duration-200 ease-out group-hover:right-[calc(100%-44px)] group-hover:rotate-45",
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
      <span className="relative z-10 transition-transform duration-200 ease-out">
        {children}
      </span>
      <div
        className={cn(
          "absolute right-1 w-10 h-10 rounded-full flex items-center justify-center transition-[right,transform] duration-200 ease-out group-hover:right-[calc(100%-44px)] group-hover:rotate-45",
          iconBg
        )}
      >
        <ArrowUpRight size={16} />
      </div>
    </Button>
  );
};

export default ButtonWithIcon;
