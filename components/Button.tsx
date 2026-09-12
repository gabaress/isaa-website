import Link from "next/link";
import { ExternalIcon } from "@/components/Icons";

// SPEC.md §5.3: rectangular, 4px radius, 44px min height, 20px horizontal padding,
// 500 weight. Primary = green fill; secondary = 1.5px green border. On dark (the
// hero) the pair inverts to white. Hover darkens; focus is the global orange ring.

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  onDark?: boolean;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

const styles = {
  light: {
    primary: "bg-green text-white hover:bg-green-dark",
    secondary: "border-[1.5px] border-green text-green hover:bg-green-tint",
  },
  dark: {
    primary: "bg-white text-green hover:bg-[#e6e6e6]",
    secondary: "border-[1.5px] border-white text-white hover:bg-white/10",
  },
};

export function Button({ href, variant = "primary", onDark = false, external = false, className = "", children }: ButtonProps) {
  const cls = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm px-5 text-[16px] font-medium leading-none transition-colors duration-[120ms] ${
    styles[onDark ? "dark" : "light"][variant]
  } ${className}`;

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
        <ExternalIcon />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
