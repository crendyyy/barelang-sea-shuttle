interface DecorativeBackgroundProps {
  variant?: "default" | "alternate";
}

const DecorativeBackground = ({ variant = "default" }: DecorativeBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <div className={`absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse ${
        variant === "default" 
          ? "bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" 
          : "bg-gradient-to-br from-secondary/30 via-primary/10 to-transparent"
      }`} />
      <div className={`absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full blur-3xl animate-pulse ${
        variant === "default"
          ? "bg-gradient-to-tr from-secondary/20 via-primary/5 to-transparent"
          : "bg-gradient-to-tr from-primary/15 via-secondary/10 to-transparent"
      }`} style={{ animationDelay: "1s" }} />
      
      {/* Geometric patterns */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-2xl rotate-12 animate-[spin_20s_linear_infinite]" />
      <div className="absolute top-40 right-20 w-24 h-24 border border-secondary/15 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
      <div className="absolute bottom-32 left-1/4 w-20 h-20 border-2 border-dashed border-primary/10 rounded-lg rotate-45 animate-[spin_25s_linear_infinite]" />
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDuration: "3s" }} />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary/40 rounded-full animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
      <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-primary/25 rounded-full animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "1s" }} />
      <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-accent/30 rounded-full animate-bounce" style={{ animationDuration: "2.8s", animationDelay: "0.3s" }} />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Diagonal lines */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="40" stroke="hsl(var(--primary))" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalLines)" />
      </svg>
      
      {/* Wave decoration top */}
      <svg className="absolute top-0 left-0 w-full h-24 text-primary/5" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,50 C360,100 720,0 1080,50 C1260,75 1350,25 1440,50 L1440,0 L0,0 Z" />
      </svg>
      
      {/* Wave decoration bottom */}
      <svg className="absolute bottom-0 left-0 w-full h-24 text-primary/5" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,50 C360,0 720,100 1080,50 C1260,25 1350,75 1440,50 L1440,100 L0,100 Z" />
      </svg>
      
      {/* Radial gradient center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-2xl" />
      
      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-secondary/10 to-transparent" />
      
      {/* Hexagon pattern */}
      <div className="absolute top-1/2 right-10 w-16 h-16 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-1/3 left-20 w-12 h-12 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-secondary">
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

export default DecorativeBackground;
