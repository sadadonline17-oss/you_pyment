import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, Building, Heart, FileText, FileSignature, MapPin, CreditCard,
  CheckCircle, ArrowRight, Palette, Eye, Code
} from 'lucide-react';

const DynamicIdentityTest = () => {
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  const entities = [
    { key: 'chalets', name: 'الشاليهات', nameEn: 'Chalets', icon: Home, color: '#FF6F00' },
    { key: 'government_payment', name: 'الدفع الحكومي', nameEn: 'Government', icon: Building, color: '#004080' },
    { key: 'health_links', name: 'الخدمات الصحية', nameEn: 'Health', icon: Heart, color: '#008080' },
    { key: 'local_payment', name: 'الدفع المحلي', nameEn: 'Local', icon: MapPin, color: '#008000' },
    { key: 'invoices', name: 'الفواتير', nameEn: 'Invoices', icon: FileText, color: '#800000' },
    { key: 'contracts', name: 'العقود', nameEn: 'Contracts', icon: FileSignature, color: '#000080' },
    { key: 'bank_pages', name: 'البنوك', nameEn: 'Banks', icon: CreditCard, color: '#0000FF' },
  ];

  const testUrls = [
    { page: 'recipient', path: '/pay/test123/recipient' },
    { page: 'details', path: '/pay/test123/details' },
    { page: 'bank-selector', path: '/pay/test123/bank-selector' },
    { page: 'card-input', path: '/pay/test123/card-input' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-6 shadow-xl">
            <Palette className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dynamic Identity Test
          </h1>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            اختبار نظام الهوية الديناميكية
          </h2>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <CheckCircle className="w-4 h-4 mr-2" />
            Auto-Apply Enabled
          </Badge>
        </div>

        <Card className="p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Eye className="w-6 h-6 text-blue-600" />
            Select Entity to Test | اختر الجهة للاختبار
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
            {entities.map((entity) => {
              const Icon = entity.icon;
              return (
                <button
                  key={entity.key}
                  onClick={() => setSelectedEntity(entity.key)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedEntity === entity.key 
                      ? 'border-blue-500 shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div 
                    className="w-12 h-12 rounded-lg mx-auto mb-2 flex items-center justify-center"
                    style={{ backgroundColor: entity.color }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs font-semibold text-center">{entity.name}</p>
                  <p className="text-xs text-gray-500 text-center">{entity.nameEn}</p>
                </button>
              );
            })}
          </div>

          {selectedEntity && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-600" />
                Test URLs for {selectedEntity}
              </h4>
              <div className="space-y-3">
                {testUrls.map((url) => (
                  <div key={url.page} className="flex items-center gap-3">
                    <Badge>{url.page}</Badge>
                    <a
                      href={`${url.path}?entity=${selectedEntity}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 p-3 bg-white rounded-lg hover:shadow-md transition-all text-sm font-mono group"
                    >
                      <span className="text-gray-500">{url.path}</span>
                      <span className="text-blue-600">?entity={selectedEntity}</span>
                      <ArrowRight className="w-4 h-4 inline ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-bold text-lg mb-2">Auto-Detection</h3>
            <p className="text-sm text-gray-600">
              كشف تلقائي للهوية من URL والـ Payload
            </p>
          </Card>

          <Card className="p-6">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-bold text-lg mb-2">Auto-Styling</h3>
            <p className="text-sm text-gray-600">
              تطبيق تلقائي للألوان والخطوط والشعارات
            </p>
          </Card>

          <Card className="p-6">
            <div className="text-4xl mb-3">🔄</div>
            <h3 className="font-bold text-lg mb-2">Auto-Carousel</h3>
            <p className="text-sm text-gray-600">
              عرض تلقائي للصور المتحركة في الهيدر
            </p>
          </Card>
        </div>

        <Card className="p-8 mt-8 bg-gradient-to-r from-green-50 to-blue-50">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Integration Status | حالة التكامل
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold">PaymentRecipient</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold">PaymentDetails</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold">PaymentBankSelector</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold">PaymentCardInput</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold">PaymentBankLogin</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold">PaymentOTP</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold">PaymentReceipt</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold">DynamicPaymentLayout</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DynamicIdentityTest;
