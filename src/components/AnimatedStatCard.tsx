import { useCountAnimation } from "@/hooks/use-count-animation";
import { LucideIcon } from "lucide-react";

interface AnimatedStatCardProps {
  icon: LucideIcon;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  colorScheme: "gold" | "crimson";
}

export const AnimatedStatCard = ({
  icon: Icon,
  value,
  prefix = "",
  suffix = "",
  label,
  colorScheme,
}: AnimatedStatCardProps) => {
  const { ref, displayValue } = useCountAnimation({
    end: value,
    duration: 2000,
    prefix,
    suffix,
  });

  const colors = {
    gold: {
      glow: "from-gold/20 to-gold/5",
      border: "hover:border-gold/50",
      iconBg: "bg-gold/20",
      iconColor: "text-gold",
      textColor: "text-gold",
    },
    crimson: {
      glow: "from-crimson/20 to-crimson/5",
      border: "hover:border-crimson/50",
      iconBg: "bg-crimson/20",
      iconColor: "text-crimson",
      textColor: "text-crimson",
    },
  };

  const scheme = colors[colorScheme];

  return (
    <div ref={ref} className="group relative">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${scheme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`}
      />
      <div
        className={`relative bg-primary-foreground/10 backdrop-blur-sm p-8 rounded-2xl border border-primary-foreground/20 ${scheme.border} transition-all hover:-translate-y-2`}
      >
        <div
          className={`w-14 h-14 ${scheme.iconBg} rounded-xl flex items-center justify-center mb-6`}
        >
          <Icon className={`h-7 w-7 ${scheme.iconColor}`} />
        </div>
        <div className={`text-4xl md:text-5xl font-bold ${scheme.textColor} mb-2`}>
          {displayValue}
        </div>
        <p className="text-primary-foreground/70 font-medium">{label}</p>
      </div>
    </div>
  );
};
