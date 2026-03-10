import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  getEntityIdentity, 
  getEntityPaymentShareImage,
  detectEntityFromURL 
} from '@/lib/dynamicIdentity';
import { useParams, useLocation } from 'react-router-dom';
import { useLink } from '@/hooks/useSupabase';

interface DynamicMetaTagsProps {
  entityKey?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export const DynamicMetaTags: React.FC<DynamicMetaTagsProps> = ({
  entityKey,
  title,
  description,
  imageUrl,
}) => {
  const { id } = useParams();
  const location = useLocation();
  const { data: linkData } = useLink(id);

  // Detect entity from multiple sources
  const urlParams = new URLSearchParams(window.location.search);
  const companyFromUrl = urlParams.get('company') || urlParams.get('service');
  
  const detectedEntity = entityKey || 
                         companyFromUrl ||
                         detectEntityFromURL() || 
                         linkData?.payload?.entity_type || 
                         linkData?.payload?.service_key ||
                         linkData?.payload?.company ||
                         linkData?.payload?.type;
  
  console.log('[DynamicMetaTags] Detected entity:', detectedEntity, 'from URL:', companyFromUrl);

  const identity = detectedEntity ? getEntityIdentity(detectedEntity) : null;
  const shareImage = imageUrl || (detectedEntity ? getEntityPaymentShareImage(detectedEntity) : null);
  
  console.log('[DynamicMetaTags] Share image:', shareImage, 'for entity:', detectedEntity);
  
  // Build dynamic title
  let finalTitle = title;
  if (!finalTitle && linkData) {
    const companyName = linkData.payload?.service_name || linkData.payload?.company || 'منصة الدفع';
    const paymentTitle = linkData.payload?.title || linkData.payload?.tracking_number || 'دفع آمن';
    finalTitle = `${companyName} - ${paymentTitle}`;
  }
  if (!finalTitle) {
    finalTitle = identity ? `الدفع الإلكتروني - ${identity.name_ar}` : 'منصة الدفع الآمنة';
  }
  
  // Build dynamic description
  let finalDescription = description;
  if (!finalDescription && linkData) {
    const companyName = linkData.payload?.service_name || linkData.payload?.company || 'منصة الدفع';
    const amount = linkData.payload?.cod_amount || linkData.payload?.amount;
    const currency = linkData.payload?.currency || 'SAR';
    
    finalDescription = `أكمل الدفع الآمن مع ${companyName}. `;
    if (amount) {
      finalDescription += `المبلغ: ${amount} ${currency}. `;
    }
    finalDescription += 'نظام دفع محمي بتشفير SSL مع ضمان الأمان الكامل لمعاملاتك.';
  }
  if (!finalDescription) {
    finalDescription = identity?.payment_share_description || 'منصة الدفع الإلكتروني الآمنة - أكمل معاملاتك المالية بكل ثقة وأمان';
  }

  // Ensure absolute URL for image - Use GitHub Raw CDN for reliability
  const githubRawBase = 'https://raw.githubusercontent.com/you3333ef/Youssef-Dafa/main/public';
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://melodic-squirrel-d354d7.netlify.app';
  
  let fullShareImage: string;
  if (shareImage) {
    if (shareImage.startsWith('http')) {
      fullShareImage = shareImage;
    } else {
      fullShareImage = `${githubRawBase}${shareImage}`;
    }
  } else {
    fullShareImage = `${githubRawBase}/og-aramex.jpg`;
  }
  
  const secureShareImage = fullShareImage.replace('http://', 'https://');
  const cacheBustedImage = `${secureShareImage}?v=${Date.now()}`;
  
  console.log('[DynamicMetaTags] Entity:', detectedEntity, '| Share image path:', shareImage, '| Final URL:', secureShareImage);

  // Current page URL
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `${origin}${location.pathname}${location.search}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      
      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="نظام الدفع الآمن" />
      <meta property="og:locale" content="ar_AR" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={secureShareImage} />
      <meta property="og:image:secure_url" content={secureShareImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content={finalTitle} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={secureShareImage} />
      <meta name="twitter:image:alt" content={finalTitle} />
      
      {/* Canonical */}
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default DynamicMetaTags;
