import React from 'react';
import { Shield, Lock, CheckCircle, CreditCard } from 'lucide-react';

interface SecurityBadgesProps {
  companyKey?: string;
  variant?: 'default' | 'minimal' | 'detailed';
  showPCIDSS?: boolean;
  showSSL?: boolean;
  showEncrypted?: boolean;
  showTrusted?: boolean;
  className?: string;
}

export const SecurityBadges: React.FC<SecurityBadgesProps> = ({
  variant = 'default',
  showPCIDSS = true,
  showSSL = true,
  showEncrypted = true,
  showTrusted = true,
  className = '',
}) => {
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-center gap-4 py-4 ${className}`}>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Lock className="w-4 h-4" />
          <span>SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Shield className="w-4 h-4" />
          <span>PCI DSS Compliant</span>
        </div>
      </div>
    );
  }
  
  if (variant === 'detailed') {
    return (
      <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-green-600" />
          <h3 className="font-bold text-lg">دفع آمن ومحمي</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {showSSL && (
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Lock className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">256-bit SSL Encryption</p>
                <p className="text-xs text-gray-600">جميع البيانات مشفرة</p>
              </div>
            </div>
          )}
          
          {showPCIDSS && (
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">PCI DSS Level 1</p>
                <p className="text-xs text-gray-600">أعلى معايير الأمان</p>
              </div>
            </div>
          )}
          
          {showEncrypted && (
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <CreditCard className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Secure Payment</p>
                <p className="text-xs text-gray-600">معلوماتك آمنة 100%</p>
              </div>
            </div>
          )}
          
          {showTrusted && (
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Trusted Globally</p>
                <p className="text-xs text-gray-600">موثوق عالمياً</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 py-6 border-t border-b border-gray-200 ${className}`}>
      {showSSL && (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
            <Lock className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">SSL Encrypted</p>
            <p className="text-sm font-bold text-gray-800">تشفير آمن</p>
          </div>
        </div>
      )}
      
      {showPCIDSS && (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">PCI DSS</p>
            <p className="text-sm font-bold text-gray-800">معتمد دولياً</p>
          </div>
        </div>
      )}
      
      {showEncrypted && (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Secure Payment</p>
            <p className="text-sm font-bold text-gray-800">دفع آمن</p>
          </div>
        </div>
      )}
      
      {showTrusted && (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Verified</p>
            <p className="text-sm font-bold text-gray-800">موثوق</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const CardLogos: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-4 py-4 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 font-semibold">طرق الدفع المقبولة:</span>
        <div className="flex items-center gap-2">
          <div className="h-8 px-3 bg-white rounded border border-gray-200 flex items-center justify-center">
            <svg className="h-5" viewBox="0 0 48 32" fill="none">
              <rect width="48" height="32" rx="4" fill="#1434CB"/>
              <text x="8" y="20" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">VISA</text>
            </svg>
          </div>
          
          <div className="h-8 px-3 bg-white rounded border border-gray-200 flex items-center justify-center">
            <svg className="h-5" viewBox="0 0 48 32" fill="none">
              <circle cx="18" cy="16" r="10" fill="#EB001B"/>
              <circle cx="30" cy="16" r="10" fill="#F79E1B"/>
              <circle cx="24" cy="16" r="10" fill="#FF5F00" opacity="0.8"/>
            </svg>
          </div>
          
          <div className="h-8 px-3 bg-white rounded border border-gray-200 flex items-center justify-center">
            <svg className="h-5" viewBox="0 0 48 32" fill="none">
              <rect width="48" height="32" rx="4" fill="#00A651"/>
              <text x="6" y="20" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">mada</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;
