import Link from "next/link";

// The ISAA mark, inlined (2.7KB) from public/logo/isaa-mark.svg — the vectorised logo
// with its 214KB hidden tracing raster removed. See scripts/ and CONTENT.md.
// Colours are hard-coded brand values from the logo file, not tokens, so the mark
// looks identical wherever it is placed. On dark panels use mono="white".

type MarkProps = { size?: number; className?: string; mono?: "white" };

export function IsaaMark({ size = 40, className, mono }: MarkProps) {
  const green = mono === "white" ? "#ffffff" : "#015a06";
  const orange = mono === "white" ? "#ffffff" : "#ff7e00";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 285.75 285.75"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M 218.05,100.62 A 97.6,96.95 0 0 1 199.29,229.39 97.6,96.95 0 0 1 68.43,223.66 97.6,96.95 0 0 1 61.15,93.75 97.6,96.95 0 0 1 190.56,73.63" fill="none" stroke={green} strokeWidth="20.0" strokeLinecap="butt" strokeLinejoin="round"/><circle cx="137.81" cy="153.89" r="38.18" fill="none" stroke={orange} strokeWidth="13.52" strokeLinecap="round" strokeLinejoin="round"/><path d="m 137.23,153.66 55.08,-55.08 -6.02,-29.39 41.08,-41.08 5.9,28.81 30.32,6.25 -40.15,40.15 -31.11,-4.73" fill="none" stroke={green} strokeWidth="13.52" strokeLinecap="round" strokeLinejoin="round"/><path d="m 125.02,70.04 c 0,0 7.07,-1.28 9.29,-1.52 2.22,-0.25 8.72,-0.53 8.72,-0.53 l -6.61,-2.82 c 0,0 -43.89,-4.86 -59.68,12.49 -15.79,17.35 -38.78,55.64 -36.0,78.46 2.78,22.83 19.89,59.92 28.8,69.64 8.91,9.72 56.93,26.61 68.62,24.53 11.69,-2.08 53.11,-12.03 59.94,-18.28 6.83,-6.25 22.22,-39.34 24.99,-45.59 2.78,-6.25 4.05,-27.54 4.05,-31.94 0,-4.4 -2.91,-8.88 -2.91,-8.88 0,0 -0.87,9.07 -1.17,11.14 -0.24,1.64 -1.63,8.69 -1.63,8.69 0,0 0.3,-12.11 0.1,-14.96 -0.2,-2.84 -1.19,-13.25 -3.48,-21.19 C 215.75,121.34 210.6,106.85 210.6,106.85 l 16.19,14.64 5.79,54.61 -11.8,36.33 -15.5,21.75 -31.7,12.73 -38.18,7.41 -52.99,-13.88 -22.91,-17.82 -18.51,-42.35 -0.69,-57.85 39.11,-49.75 61.33,-11.8 12.67,6.27 20.07,7.78 c 0,0 -8.83,-2.62 -26.78,-4.59 -4.25,-0.47 -21.64,-0.29 -21.64,-0.29 z" fill={green}/><path d="m 131.06,74.42 c -3.92,-0.11 -12.84,-0.01 -21.43,2.47 -11.46,3.3 -20.25,7.69 -26.21,13.6 -5.96,5.9 -11.55,11.69 -15.07,17.33 -3.52,5.65 -11.74,20.64 -13.01,35.73 -1.27,15.1 1.96,30.79 5.43,38.56 3.48,7.77 11.67,23.34 25.04,33.36 13.38,10.02 20.01,14.63 29.91,17.23 9.89,2.6 22.46,3.69 27.19,3.4 15.16,-0.93 29.42,-5.7 38.42,-11.34 9.0,-5.64 15.39,-11.37 21.12,-18.86 5.73,-7.49 12.92,-24.77 13.95,-32.28 0.98,-7.2 0.53,-14.89 0.53,-14.89 0,0 -1.02,11.5 -3.4,19.19 -2.37,7.69 -8.18,20.54 -13.62,26.43 -5.44,5.89 -12.78,13.46 -20.97,17.94 -8.18,4.48 -15.8,9.12 -29.11,10.58 -13.83,1.51 -25.28,0.45 -37.76,-4.09 -12.48,-4.54 -15.55,-8.75 -21.93,-13.3 -6.38,-4.54 -21.61,-22.53 -24.88,-29.82 -10.55,-23.49 -7.57,-44.14 -4.86,-53.43 4.5,-15.38 13.43,-29.28 24.38,-38.66 10.4,-8.91 16.4,-11.78 24.67,-14.44 8.26,-2.66 23.65,-4.6 23.65,-4.6 0,0 -0.75,-0.06 -2.06,-0.09 z" fill={green}/><path d="M 222.37,103.72 A 92.13,92.29 0 0 1 204.71,216.09 92.13,92.29 0 0 1 91.58,225.93 92.13,92.29 0 0 1 54.84,118.3" fill="none" stroke={green} strokeWidth="1.0" strokeLinecap="butt" strokeLinejoin="round"/><path d="M 157.16,232.29 A 77.15,76.56 0 0 1 83.0,218.72 77.15,76.56 0 0 1 55.93,148.86" fill="none" stroke={green} strokeWidth="1.0" strokeLinecap="butt" strokeLinejoin="round"/>
    </svg>
  );
}

/** Mark + wordmark lockup used in the header and footer. */
export function LogoLockup({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 rounded-sm ${onDark ? "text-white" : "text-green"} ${className}`}
      aria-label="Irish Student Archery Association — home"
    >
      <IsaaMark size={36} mono={onDark ? "white" : undefined} />
      <span className="flex flex-col leading-none">
        <span className="text-[17px] font-bold tracking-[0.02em]">ISAA</span>
        <span className={`mt-1 text-[11px] font-medium uppercase tracking-[0.08em] ${onDark ? "text-white/85" : "text-ink-muted"}`}>
          Irish Student Archery Association
        </span>
      </span>
    </Link>
  );
}
