interface ProgressBarProps {
  value: number;
  max: number;
  /** Accessible label, also shown above the bar when `showLabel` is true. */
  label: string;
  showLabel?: boolean;
  barClassName?: string;
  trackClassName?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max,
  label,
  showLabel = true,
  barClassName = "bg-sky-500",
  trackClassName = "bg-slate-100",
  className = "",
}: ProgressBarProps) {
  const ratio = max > 0 ? Math.min(value / max, 1) : 0;

  return (
    <div className={className}>
      {showLabel && (
        <div className="mb-1.5 flex items-center justify-between text-sm font-bold">
          <span>{label}</span>
          <span className="tabular-nums opacity-70">
            {Math.round(ratio * 100)}%
          </span>
        </div>
      )}
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={`h-3 overflow-hidden rounded-full ${trackClassName}`}
      >
        {/* scaleX keeps the animation on the compositor */}
        <div
          className={`h-full origin-left rounded-full transition-transform duration-700 ease-out ${barClassName}`}
          style={{ transform: `scaleX(${ratio})` }}
        />
      </div>
    </div>
  );
}
