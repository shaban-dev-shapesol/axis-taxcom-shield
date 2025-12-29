import { Scale, Calculator, Handshake } from "lucide-react";

interface PartnershipBannerProps {
  variant?: "light" | "dark" | "accent";
  size?: "sm" | "lg";
}

export const PartnershipBanner = ({ variant = "dark", size = "lg" }: PartnershipBannerProps) => {
  const baseClasses = "w-full py-3 border-y";
  
  const variantClasses = {
    light: "bg-muted/50 border-border",
    dark: "bg-navy border-navy-light/20",
    accent: "bg-gold/10 border-gold/30",
  };

  const textClasses = {
    light: "text-foreground",
    dark: "text-primary-foreground",
    accent: "text-foreground",
  };

  const iconClasses = {
    light: "text-gold",
    dark: "text-gold",
    accent: "text-gold",
  };

  if (size === "sm") {
    return (
      <div className={`${baseClasses} ${variantClasses[variant]}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <Scale className={`h-4 w-4 ${iconClasses[variant]}`} />
              <span className={`text-sm font-medium ${textClasses[variant]}`}>Business Crime Solicitors</span>
            </div>
            <Handshake className={`h-4 w-4 ${iconClasses[variant]}`} />
            <div className="flex items-center gap-2">
              <Calculator className={`h-4 w-4 ${iconClasses[variant]}`} />
              <span className={`text-sm font-medium ${textClasses[variant]}`}>Chartered Accountants</span>
            </div>
            <span className={`text-sm font-semibold ${iconClasses[variant]} ml-2`}>Working as Partners</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} py-6`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
              <Scale className={`h-5 w-5 ${iconClasses[variant]}`} />
            </div>
            <div className="text-center md:text-left">
              <span className={`text-base md:text-lg font-bold ${textClasses[variant]}`}>Business Crime Solicitors</span>
              <p className={`text-xs ${textClasses[variant]}/70`}>Legal privilege & defence</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg">
              <Handshake className="h-6 w-6 text-navy" />
            </div>
            <span className={`text-lg font-bold ${iconClasses[variant]} hidden md:inline`}>Partners</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
              <Calculator className={`h-5 w-5 ${iconClasses[variant]}`} />
            </div>
            <div className="text-center md:text-left">
              <span className={`text-base md:text-lg font-bold ${textClasses[variant]}`}>Chartered Accountants</span>
              <p className={`text-xs ${textClasses[variant]}/70`}>Numbers & compliance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
