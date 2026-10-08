import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  inverted?: boolean;
}

export const MaisonCherryLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  inverted = false,
}) => {
  const textColor = inverted ? 'text-white' : 'text-[#111111]';
  const strokeColor = inverted ? '#ffffff' : '#111111';
  const subtitleColor = inverted ? 'text-neutral-400' : 'text-neutral-600';
  const dividerColor = inverted ? 'border-neutral-700' : 'border-[#111111]/30';

  const iconSizes = {
    sm: 'w-7 h-9',
    md: 'w-9 h-12',
    lg: 'w-14 h-18',
    xl: 'w-20 h-26',
  };

  const textSizes = {
    sm: 'text-sm tracking-[0.2em]',
    md: 'text-lg md:text-xl tracking-[0.22em]',
    lg: 'text-2xl md:text-3xl tracking-[0.25em]',
    xl: 'text-4xl md:text-5xl tracking-[0.28em]',
  };

  const subSizes = {
    sm: 'text-[8px] tracking-[0.25em]',
    md: 'text-[9px] md:text-[10px] tracking-[0.3em]',
    lg: 'text-xs tracking-[0.35em]',
    xl: 'text-sm tracking-[0.4em]',
  };

  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* Signature Arch & Cherry Icon */}
      <svg
        className={`${iconSizes[size]} mb-1.5 transition-transform duration-300 hover:scale-105`}
        viewBox="0 0 100 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Arch outline */}
        <path
          d="M 18 120 V 50 C 18 25 32 12 50 12 C 68 12 82 25 82 50 V 120"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Stems */}
        <path
          d="M 50 48 Q 42 75 36 94"
          stroke={strokeColor}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M 50 48 Q 58 75 64 94"
          stroke={strokeColor}
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Small leaf node */}
        <circle cx="50" cy="48" r="2.5" fill={strokeColor} />

        {/* Left Cherry */}
        <circle cx="36" cy="98" r="16" fill="#c9182b" stroke={strokeColor} strokeWidth="2.4" />
        <ellipse cx="32" cy="93" rx="4" ry="7" transform="rotate(-25 32 93)" fill="#ffffff" opacity="0.55" />

        {/* Right Cherry */}
        <circle cx="64" cy="98" r="16" fill="#c9182b" stroke={strokeColor} strokeWidth="2.4" />
        <ellipse cx="60" cy="93" rx="4" ry="7" transform="rotate(-25 60 93)" fill="#ffffff" opacity="0.55" />
      </svg>

      {/* Brand Typography */}
      <div className={`font-serif font-light leading-none uppercase ${textColor} ${textSizes[size]}`}>
        <div>MAISON</div>
        <div className="font-medium tracking-[0.26em]">CHERRY</div>
      </div>

      {showSubtitle && (
        <>
          <div className={`w-full max-w-[140px] my-1 border-t ${dividerColor}`} />
          <div className={`font-sans font-medium uppercase ${subtitleColor} ${subSizes[size]}`}>
            CONCEPT STORE &nbsp;|&nbsp; CATAMARCA
          </div>
        </>
      )}
    </div>
  );
};
