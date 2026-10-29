import React from 'react';
import Link from 'next/link';

interface EvionLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  theme?: 'light' | 'dark';
}

export const EvionLogo: React.FC<EvionLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  theme = 'light',
}) => {
  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  const isDark = theme === 'dark';

  return (
    <Link
      href="/"
      className={`inline-flex items-center group cursor-pointer select-none transition-transform duration-300 hover:scale-[1.02] ${className}`}
      aria-label="EVION Electric Mobility - Home"
    >
      {/* Clean Wordmark - Circular icon & CHARGE badge permanently removed */}
      <div className="flex flex-col">
        <div className="flex items-center tracking-tight">
          <span
            className={`font-black tracking-wider font-display transition-colors duration-300 ${
              textSizes[size]
            } ${isDark ? 'text-white' : 'text-charcoal'}`}
          >
            EVI<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#08DCC5] to-[#00E85A]">O</span>N
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[9px] uppercase font-semibold tracking-wider -mt-0.5 transition-colors duration-300 ${
              isDark ? 'text-white/60' : 'text-secondary-text'
            }`}
          >
            Electric Mobility Network
          </span>
        )}
      </div>
    </Link>
  );
};
