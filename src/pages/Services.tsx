import { useState, useMemo } from "react";
import { Home, Package, FileText, Heart, Truck, Building2, CreditCard, Landmark } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { Country, COUNTRIES } from "@/lib/countries";
import SEOHead from "@/components/SEOHead";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Services = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

  // Get government payment system name based on selected country
  const govSystemName = useMemo(() => {
    if (!selectedCountry) return "السداد الحكومي";
    const govSystem = getGovernmentPaymentSystem(selectedCountry.code);
    return govSystem.nameAr;
  }, [selectedCountry]);

  const services = [
    {
      title: "Chalet Booking",
      titleAr: "حجز الشاليهات",
      description: "احجز شاليه أحلامك بأسعار مخصصة",
      icon: Home,
      href: selectedCountry ? `/create/${selectedCountry.code}/chalet` : "#",
      gradient: "var(--gradient-primary)",
    },
    {
      title: "Shipping Services",
      titleAr: "خدمات الشحن",
      description: "شحن سريع وآمن مع شركات محلية معتمدة",
      icon: Package,
      href: selectedCountry ? `/create/${selectedCountry.code}/shipping` : "#",
      gradient: "var(--gradient-success)",
    },
    {
      title: "Invoices",
      titleAr: "الفواتير",
      description: "إنشاء وإدارة الفواتير بسهولة",
      icon: FileText,
      href: selectedCountry ? `/invoices/create/${selectedCountry.code}` : "#",
      gradient: "linear-gradient(135deg, hsl(210 95% 50%), hsl(220 90% 60%))",
      sublinks: [
        {
          title: "إنشاء فاتورة جديدة",
          href: selectedCountry ? `/invoices/create/${selectedCountry.code}` : "#",
        },
        {
          title: "عرض جميع الفواتير",
          href: selectedCountry ? `/invoices/list/${selectedCountry.code}` : "#",
        },
      ],
    },
    {
      title: "Health Services",
      titleAr: "الخدمات الصحية",
      description: "خدمات طبية وصحية معتمدة",
      icon: Heart,
      href: selectedCountry ? `/health/${selectedCountry.code}` : "#",
      gradient: "linear-gradient(135deg, hsl(0 85% 55%), hsl(10 80% 60%))",
      sublinks: [
        {
          title: "حجز موعد طبي (ميكروسايت)",
          href: selectedCountry ? `/health/${selectedCountry.code}` : "#",
        },
        {
          title: "إنشاء رابط دفع للخدمات الصحية",
          href: selectedCountry ? `/create/${selectedCountry.code}/health-link` : "#",
        },
      ],
    },
    {
      title: "Logistics",
      titleAr: "الخدمات اللوجستية",
      description: "حلول لوجستية متكاملة",
      icon: Truck,
      href: selectedCountry ? `/logistics/${selectedCountry.code}` : "#",
      gradient: "linear-gradient(135deg, hsl(260 95% 55%), hsl(280 90% 60%))",
      sublinks: [
        {
          title: "حجز شحنة (ميكروسايت)",
          href: selectedCountry ? `/logistics/${selectedCountry.code}` : "#",
        },
        {
          title: "إنشاء رابط دفع للخدمات اللوجستية",
          href: selectedCountry ? `/create/${selectedCountry.code}/logistics-link` : "#",
        },
      ],
    },
    {
      title: "Contracts",
      titleAr: "العقود",
      description: "إدارة وتوثيق العقود الإلكترونية",
      icon: Building2,
      href: selectedCountry ? `/contracts/${selectedCountry.code}` : "#",
      gradient: "linear-gradient(135deg, hsl(40 95% 55%), hsl(30 90% 50%))",
      sublinks: [
        {
          title: "إنشاء عقد إلكتروني (ميكروسايت)",
          href: selectedCountry ? `/contracts/${selectedCountry.code}` : "#",
        },
        {
          title: "إنشاء رابط دفع لعقد",
          href: selectedCountry ? `/create/${selectedCountry.code}/contracts-link` : "#",
        },
      ],
    },
    {
      title: "Payment Links",
      titleAr: "روابط الدفع",
      description: "إنشاء روابط دفع متغيرة وسريعة",
      icon: CreditCard,
      href: selectedCountry ? `/create/${selectedCountry.code}/payment` : "#",
      gradient: "linear-gradient(135deg, hsl(260 85% 55%), hsl(200 90% 60%))",
    },
    {
      title: "Government Payment",
      titleAr: govSystemName,
      description: `دفع رسوم الخدمات الحكومية عبر ${govSystemName} - جواز السفر، المخالفات، رخصة القيادة والمزيد`,
      icon: Landmark,
      href: selectedCountry ? `/create/${selectedCountry.code}/government/sadad` : "#",
      gradient: "linear-gradient(135deg, #F58220, #E67317)",
    },
  ];



  const handleCountryChange = (countryCode: string) => {
    const country = COUNTRIES.find((c) => c.code === countryCode);
    setSelectedCountry(country);
  };

  return (
    <>
      <SEOHead 
        title="خدمات الشحن في دول الخليج"
        description="اختر شركة الشحن المفضلة لديك من بين جميع شركات الشحن الكبرى في دول الخليج: أرامكس، دي إتش إل، فيديكس، يو بي إس، سمسا، زاجل، ناقل، والبريد الوطني"
        image="/og-aramex.jpg"
        type="website"
      />
      <div className="min-h-screen py-6 bg-gradient-to-br from-background via-background to-muted/20" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-4">
          <BackButton />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            اختر خدمتك
          </h1>
          <p className="text-base text-muted-foreground">
            ابدأ بتحديد الدولة، ثم اختر الخدمة المناسبة
          </p>
        </div>

        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <label className="block text-lg font-bold mb-3 text-center">
              اختر الدولة
            </label>
            <Select onValueChange={handleCountryChange}>
              <SelectTrigger className="w-full h-14 text-lg bg-card/80 backdrop-blur-sm border-2 hover:border-primary transition-all shadow-lg">
                <SelectValue placeholder="اختر دولة..." />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {COUNTRIES.map((country) => (
                  <SelectItem
                    key={country.code}
                    value={country.code}
                    className="text-base py-3 cursor-pointer hover:bg-accent"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div className="text-right">
                        <div className="font-bold text-base">{country.nameAr}</div>
                        <div className="text-sm text-muted-foreground">
                          {country.name}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedCountry ? (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              الخدمات المتاحة في {selectedCountry.nameAr}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {services.map((service, index) => (
                <ServiceCard key={`${service.title}-${index}`} {...service} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse shadow-2xl">
              <Package className="w-10 h-10 text-primary-foreground" />
            </div>
            <p className="text-base text-muted-foreground">
              الرجاء اختيار دولة لعرض الخدمات المتاحة
            </p>
          </div>
        )}
      </div>
      <div className="h-20" />
    </div>
    <BottomNav />
    </>
  );
};

export default Services;
