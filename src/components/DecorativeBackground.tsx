interface DecorativeBackgroundProps {
  variant?: "default" | "alternate";
}

const DecorativeBackground = ({ variant = "default" }: DecorativeBackgroundProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Circles - NO BLUR, using opacity instead */}
      {variant === "default" ? (
        <>
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/8 rounded-full" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/12 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/8 rounded-full" />
          {/* Additional subtle circles for depth */}
          <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-primary/6 rounded-full" />
          <div className="absolute bottom-1/3 left-1/2 w-56 h-56 bg-accent/6 rounded-full" />
        </>
      ) : (
        <>
          <div className="absolute top-20 right-20 w-80 h-80 bg-primary/8 rounded-full" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/12 rounded-full" />
          <div className="absolute top-1/3 right-1/3 w-56 h-56 bg-accent/8 rounded-full" />
          <div className="absolute bottom-1/2 left-1/4 w-64 h-64 bg-primary/6 rounded-full" />
        </>
      )}

      {/* Wave Pattern Top - Enhanced */}
      <svg className="absolute top-0 left-0 right-0 w-full opacity-25" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
        <path
          d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 40C840 52 960 68 1080 68C1200 68 1320 52 1380 44L1440 36V0H0V60Z"
          fill="hsl(var(--primary))"
          fillOpacity="0.15"
        />
        <path
          d="M0 80L60 74C120 68 240 56 360 54C480 52 600 60 720 68C840 76 960 84 1080 82C1200 80 1320 68 1380 62L1440 56V0H0V80Z"
          fill="hsl(var(--primary))"
          fillOpacity="0.08"
        />
      </svg>

      {/* Wave Pattern Bottom - Enhanced */}
      <svg className="absolute bottom-0 left-0 right-0 w-full opacity-20" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
        <path
          d="M0 60L60 68C120 76 240 92 360 96C480 100 600 92 720 80C840 68 960 52 1080 52C1200 52 1320 68 1380 76L1440 84V120H0V60Z"
          fill="hsl(var(--primary))"
          fillOpacity="0.15"
        />
        <path
          d="M0 40L60 46C120 52 240 64 360 66C480 68 600 60 720 52C840 44 960 36 1080 36C1200 36 1320 44 1380 48L1440 52V120H0V40Z"
          fill="hsl(var(--primary))"
          fillOpacity="0.08"
        />
      </svg>

      {/* Floating Dots Pattern - More dynamic */}
      <div className="absolute top-16 right-16 grid grid-cols-3 gap-3 opacity-20">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full"
            style={{
              opacity: (i % 2 === 0) ? 0.6 : 1,
              transform: `scale(${(i % 3 === 0) ? 0.8 : 1})`
            }}
          />
        ))}
      </div>
      <div className="absolute bottom-24 left-16 grid grid-cols-3 gap-3 opacity-20">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full"
            style={{
              opacity: (i % 2 === 0) ? 1 : 0.6,
              transform: `scale(${(i % 3 === 0) ? 1 : 0.8})`
            }}
          />
        ))}
      </div>

      {/* Additional Corner Dots - Mobile Friendly */}
      <div className="absolute top-32 left-8 opacity-15">
        <div className="flex gap-2">
          <div className="w-1 h-1 bg-primary rounded-full" />
          <div className="w-1 h-1 bg-primary rounded-full" />
          <div className="w-1 h-1 bg-primary rounded-full" />
        </div>
      </div>
      <div className="absolute bottom-32 right-8 opacity-15">
        <div className="flex gap-2">
          <div className="w-1 h-1 bg-primary rounded-full" />
          <div className="w-1 h-1 bg-primary rounded-full" />
          <div className="w-1 h-1 bg-primary rounded-full" />
        </div>
      </div>

      {/* Decorative Lines - Enhanced */}
      <div className="absolute top-32 right-1/4 w-24 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-36 right-1/4 w-16 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      <div className="absolute bottom-32 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-36 left-1/4 w-20 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      {/* Corner Accent Lines */}
      <div className="absolute top-20 left-0 w-16 h-px bg-gradient-to-r from-primary/15 to-transparent" />
      <div className="absolute top-24 left-0 w-12 h-px bg-gradient-to-r from-primary/10 to-transparent" />
      <div className="absolute bottom-20 right-0 w-16 h-px bg-gradient-to-l from-primary/15 to-transparent" />
      <div className="absolute bottom-24 right-0 w-12 h-px bg-gradient-to-l from-primary/10 to-transparent" />
    </div>
  );
};

export default DecorativeBackground;