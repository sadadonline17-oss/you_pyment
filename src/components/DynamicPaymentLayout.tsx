import React from 'react';
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getBrandingByCompany, shippingCompanyBranding } from "@/lib/brandingSystem";
import { DynamicBranding } from "@/components/DynamicBranding";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import BrandedTopBar from "@/components/BrandedTopBar";
import BrandedCarousel from "@/components/BrandedCarousel";
import { useAutoApplyIdentity } from "@/hooks/useAutoApplyIdentity";
import { DynamicMetaTags } from "@/components/DynamicMetaTags";
import { CreditCard, ArrowLeft } from "lucide-react";
import heroAramex from "@/assets/hero-aramex.jpg";
import heroDhl from "@/assets/hero-dhl.jpg";
import heroFedex from "@/assets/hero-fedex.jpg";
import heroSmsa from "@/assets/hero-smsa.jpg";
import heroUps from "@/assets/hero-ups.jpg";
import heroEmpost from "@/assets/hero-empost.jpg";
import heroZajil from "@/assets/hero-zajil.jpg";
import heroNaqel from "@/assets/hero-naqel.jpg";
import heroSaudipost from "@/assets/hero-saudipost.jpg";
import heroKwpost from "@/assets/hero-kwpost.jpg";
import heroQpost from "@/assets/hero-qpost.jpg";
import heroOmanpost from "@/assets/hero-omanpost.jpg";
import heroBahpost from "@/assets/hero-bahpost.jpg";
import heroGenacom from "@/assets/hero-genacom.jpg";
import heroAlbaraka from "@/assets/hero-albaraka.jpg";
import heroAlfuttaim from "@/assets/hero-alfuttaim.jpg";
import heroAlshaya from "@/assets/hero-alshaya.jpg";
import heroBahri from "@/assets/hero-bahri.jpg";
import heroShipco from "@/assets/hero-shipco.jpg";
import heroHellmann from "@/assets/hero-hellmann.jpg";
import heroDsv from "@/assets/hero-dsv.jpg";
import heroBg from "@/assets/hero-bg.jpg";

interface DynamicPaymentLayoutProps {
  children: React.ReactNode;
  serviceName: string;
  serviceKey?: string;
  amount: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  showHero?: boolean;
  bankId?: string;
  countryCode?: string;
}

const DynamicPaymentLayout: React.FC<DynamicPaymentLayoutProps> = ({
  children,
  serviceName,
  serviceKey,
  amount,
  title,
  description,
  icon = <CreditCard className="w-7 h-7 sm:w-10 sm:h-10 text-white" />,
  showHero = true,
  bankId,
  countryCode
}) => {
  const { entity, identity } = useAutoApplyIdentity();
  const actualServiceKey = serviceKey || serviceName;
  const branding = getServiceBranding(actualServiceKey);
  const enhancedBranding = getBrandingByCompany(actualServiceKey);
  const companyBranding = shippingCompanyBranding[actualServiceKey.toLowerCase()] || null;
  
  const displayBackground = identity?.colors.background || companyBranding?.colors.background || '#FFFFFF';
  const displayFont = identity?.fonts[0] || companyBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif';
  
  const heroImages: Record<string, string> = {
    'aramex': heroAramex,
    'dhl': heroDhl,
    'dhlkw': heroDhl,
    'dhlqa': heroDhl,
    'dhlom': heroDhl,
    'dhlbh': heroDhl,
    'fedex': heroFedex,
    'smsa': heroSmsa,
    'ups': heroUps,
    'empost': heroEmpost,
    'zajil': heroZajil,
    'naqel': heroNaqel,
    'saudipost': heroSaudipost,
    'kwpost': heroKwpost,
    'qpost': heroQpost,
    'omanpost': heroOmanpost,
    'bahpost': heroBahpost,
    'genacom': heroGenacom,
    'jinaken': heroGenacom,
    'albaraka': heroAlbaraka,
    'alfuttaim': heroAlfuttaim,
    'alshaya': heroAlshaya,
    'bahri': heroBahri,
    'national': heroBahri,
    'shipco': heroShipco,
    'hellmann': heroHellmann,
    'dsv': heroDsv,
  };
  
  const heroImage = heroImages[actualServiceKey.toLowerCase()] || heroBg;

  return (
    <>
      <DynamicBranding companyKey={actualServiceKey}>
        <DynamicMetaTags 
          entityKey={entity || undefined}
          title={title}
          description={description}
        />
        <PaymentMetaTags 
        serviceName={serviceName}
        serviceKey={actualServiceKey}
        amount={amount}
        title={title}
        description={description}
      />
      <BrandedTopBar 
        serviceKey={actualServiceKey}
        serviceName={serviceName}
        showBackButton={true}
        bankId={bankId}
        showCarousel={false}
        countryCode={countryCode}
      />

      <BrandedCarousel serviceKey={actualServiceKey} className="mb-0" />

      <div 
        className="min-h-screen" 
        dir="rtl"
        style={{
          background: displayBackground,
          fontFamily: displayFont
        }}
      >
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="max-w-2xl mx-auto">
            <Card 
              className="p-4 sm:p-8 shadow-2xl border-t-4" 
              style={{ 
                borderTopColor: branding.colors.primary,
                background: showHero ? undefined : `linear-gradient(135deg, ${branding.colors.primary}02, ${branding.colors.secondary}02)`,
                boxShadow: enhancedBranding?.shadows.lg || '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                borderRadius: enhancedBranding?.borderRadius.lg || '12px'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-3xl font-bold">{title}</h1>
                
                <div
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
                  }}
                >
                  {icon}
                </div>
              </div>

              {children}
            </Card>
          </div>
        </div>
      </div>
      </DynamicBranding>
    </>
  );
};

export default DynamicPaymentLayout;