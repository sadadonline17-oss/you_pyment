import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Building, 
  MapPin, 
  FileText, 
  FileSignature, 
  Heart, 
  CreditCard,
  ArrowRight,
  Palette
} from 'lucide-react';

const DynamicIdentityDemo = () => {
  const entities = [
    {
      key: 'chalets',
      name: 'حجز الشاليهات',
      nameEn: 'Chalet Booking',
      description: 'نظام حجز ودفع الشاليهات مع هوية مخصصة',
      path: '/chalet-payment',
      icon: Home,
      color: '#FF6F00',
    },
    {
      key: 'government_payment',
      name: 'الدفع الحكومي',
      nameEn: 'Government Payment',
      description: 'بوابة الدفع للخدمات الحكومية',
      path: '/government-payment',
      icon: Building,
      color: '#004080',
    },
    {
      key: 'health_links',
      name: 'الخدمات الصحية',
      nameEn: 'Health Services',
      description: 'حجز المواعيد الطبية والخدمات الصحية',
      path: '/health-payment',
      icon: Heart,
      color: '#008080',
    },
    {
      key: 'local_payment',
      name: 'الدفع المحلي',
      nameEn: 'Local Payment',
      description: 'بوابة الدفع للخدمات المحلية',
      path: '/?entity=local_payment',
      icon: MapPin,
      color: '#008000',
    },
    {
      key: 'invoices',
      name: 'الفواتير',
      nameEn: 'Invoices',
      description: 'عرض ودفع الفواتير',
      path: '/invoices/list/SA?entity=invoices',
      icon: FileText,
      color: '#800000',
    },
    {
      key: 'contracts',
      name: 'العقود',
      nameEn: 'Contracts',
      description: 'إدارة ودفع العقود',
      path: '/contracts/SA?entity=contracts',
      icon: FileSignature,
      color: '#000080',
    },
    {
      key: 'bank_pages',
      name: 'الصفحات البنكية',
      nameEn: 'Bank Pages',
      description: 'صفحات الدفع البنكي المخصصة',
      path: '/?entity=bank_pages',
      icon: CreditCard,
      color: '#0000FF',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
            <Palette className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dynamic Identity System
          </h1>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            نظام الهوية الديناميكية
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            استعرض مختلف الهويات البصرية المخصصة لكل نوع من أنواع الخدمات
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-2">
            Explore different visual identities customized for each type of service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {entities.map((entity) => {
            const Icon = entity.icon;
            return (
              <Link key={entity.key} to={entity.path}>
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border-2 hover:border-blue-400">
                  <div className="flex flex-col h-full">
                    <div 
                      className="w-16 h-16 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: entity.color }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">
                      {entity.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 font-semibold">
                      {entity.nameEn}
                    </p>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {entity.description}
                    </p>
                    
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                      <span>عرض النموذج</span>
                      <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Features | المميزات</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                <div className="text-4xl mb-3">🎨</div>
                <h4 className="font-bold text-xl mb-2">Custom Branding</h4>
                <p className="text-sm opacity-90">هوية بصرية مخصصة لكل خدمة</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                <div className="text-4xl mb-3">⚡</div>
                <h4 className="font-bold text-xl mb-2">Auto Detection</h4>
                <p className="text-sm opacity-90">كشف تلقائي للهوية من URL</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                <div className="text-4xl mb-3">🚀</div>
                <h4 className="font-bold text-xl mb-2">Easy Integration</h4>
                <p className="text-sm opacity-90">تكامل سهل مع React</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-12 text-center">
          <Card className="p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Documentation | التوثيق</h3>
            <p className="text-gray-600 mb-6">
              للمزيد من المعلومات حول كيفية استخدام نظام الهوية الديناميكية، راجع ملف التوثيق
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('/DYNAMIC_IDENTITY_SYSTEM.md', '_blank')}
            >
              <FileText className="w-5 h-5 ml-2" />
              اقرأ التوثيق الكامل
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DynamicIdentityDemo;
