interface DecorativeBackgroundProps {
  variant?: "default" | "alternate";
}

const DecorativeBackground = ({ variant = "default" }: DecorativeBackgroundProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Circles */}
      {variant === "default" ? (
        <>
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
        </>
      ) : (
        <>
          <div className="absolute top-20 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/3 w-56 h-56 bg-accent/5 rounded-full blur-2xl" />
        </>
      )}

      {/* Wave Pattern Top */}
      <svg className="absolute top-0 left-0 right-0 w-full opacity-20" viewBox="0 0 1440 80" fill="none">
        <path
          d="M0 40L60 35C120 30 240 20 360 22C480 24 600 38 720 44C840 50 960 48 1080 40C1200 32 1320 18 1380 11L1440 4V0H0V40Z"
          fill="hsl(var(--primary))"
          fillOpacity="0.1"
        />
      </svg>

      {/* Wave Pattern Bottom */}
      <svg className="absolute bottom-0 left-0 right-0 w-full opacity-15" viewBox="0 0 1440 80" fill="none">
        <path
          d="M0 40L60 46C120 52 240 64 360 60C480 56 600 36 720 30C840 24 960 32 1080 42C1200 52 1320 64 1380 70L1440 76V80H0V40Z"
          fill="hsl(var(--primary))"
          fillOpacity="0.12"
        />
      </svg>

      {/* Floating Dots Pattern */}
      <div className="absolute top-16 right-16 grid grid-cols-3 gap-2 opacity-15">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-primary rounded-full" />
        ))}
      </div>
      <div className="absolute bottom-24 left-16 grid grid-cols-3 gap-2 opacity-15">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-primary rounded-full" />
        ))}
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-32 right-1/4 w-24 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div className="absolute bottom-32 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
    </div>
  );
};

export default DecorativeBackground;
