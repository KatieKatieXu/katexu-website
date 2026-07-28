import { clsx } from "clsx";

export type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  onClick?: () => void;
};

export function Button({
  label,
  variant = "primary",
  size = "md",
  disabled = false,
  iconLeft,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center gap-2 rounded-full font-medium transition-colors",
        {
          primary: "bg-[#00bc7d] text-white hover:bg-[#00915f]",
          secondary:
            "border border-gray-300 text-gray-900 hover:border-[#00bc7d]",
          ghost: "text-[#00915f] hover:bg-[#e6f7f0]",
        }[variant],
        {
          sm: "text-[12px] px-3 py-1.5",
          md: "text-[13px] px-4 py-2",
          lg: "text-[15px] px-5 py-2.5",
        }[size],
        disabled && "opacity-40 pointer-events-none"
      )}
    >
      {iconLeft}
      {label}
    </button>
  );
}
