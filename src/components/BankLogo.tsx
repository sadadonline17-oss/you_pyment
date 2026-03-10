import React, { useState } from 'react';
import { getBankById } from '@/lib/banks';

interface BankLogoProps {
  bankId: string;
  bankName: string;
  bankNameAr: string;
  color?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const BankLogo: React.FC<BankLogoProps> = ({ 
  bankId, 
  bankName, 
  bankNameAr, 
  color = '#004B87',
  className = '',
  size = 'md'
}) => {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-sm',
    lg: 'h-16 w-16 text-base',
    xl: 'h-24 w-24 text-lg'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const bank = getBankById(bankId);
  const logoPath = bank?.logo;

  if (logoPath && !imageError) {
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 ${className}`}>
        <img
          src={logoPath}
          alt={`${bankName} logo`}
          className="object-contain max-w-full max-h-full"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))' }}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  const initials = getInitials(bankName);

  return (
    <div 
      className={`${sizeClasses[size]} rounded-lg flex items-center justify-center font-bold text-white shadow-md ${className}`}
      style={{ 
        backgroundColor: color,
        background: `linear-gradient(135deg, ${color}, ${color}dd)`
      }}
    >
      <span className="drop-shadow-sm">{initials}</span>
    </div>
  );
};

export default BankLogo;
