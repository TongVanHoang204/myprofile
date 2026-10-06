export default function SkeletonLoader({ 
  className = "", 
  variant = "text" 
}: { 
  className?: string;
  variant?: "text" | "rectangular" | "circular";
}) {
  const baseClasses = "animate-pulse bg-slate-800 rounded";
  
  let variantClasses = "";
  if (variant === "text") variantClasses = "h-4 w-full";
  if (variant === "rectangular") variantClasses = "h-48 w-full";
  if (variant === "circular") variantClasses = "h-12 w-12 rounded-full";

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
    </div>
  );
}
