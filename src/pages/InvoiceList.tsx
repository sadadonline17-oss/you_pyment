import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Country, getCountryByCode } from "@/lib/countries";
import { ArrowRight, FileText, Search, Eye, Edit, Trash2, Plus, Link as LinkIcon, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { useLinks } from "@/hooks/useSupabase";
import { generateInvoicePaymentLink } from "@/utils/invoicePaymentLink";

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  total: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "overdue";
  createdAt: string;
}

const InvoiceList = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const selectedCountry = getCountryByCode(country || "");
  
  const { data: allLinks, isLoading } = useLinks();
  const invoiceLinks = allLinks?.filter(link => 
    link.type === 'invoices' && link.country_code === country
  ) || [];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = invoiceLinks.filter((link) => {
    const invoice = link.payload;
    return (
      invoice?.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice?.client_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      draft: "secondary",
      sent: "default",
      paid: "default",
      pending: "default",
      active: "default",
      overdue: "destructive",
    };

    const labels: Record<string, string> = {
      draft: "مسودة",
      sent: "مرسلة",
      paid: "مدفوعة",
      pending: "قيد الانتظار",
      active: "نشطة",
      overdue: "متأخرة",
    };

    return (
      <Badge variant={variants[status] || "default"}>
        {labels[status] || status}
      </Badge>
    );
  };
  
  const handleCopyPaymentLink = (link: any) => {
    const invoice = link.payload;
    const paymentLink = generateInvoicePaymentLink({
      invoiceId: link.id,
      invoiceNumber: invoice.invoice_number,
      amount: invoice.total,
      currency: invoice.currency,
      countryCode: country || "SA",
      clientName: invoice.client_name,
      clientEmail: invoice.client_email,
    });
    
    navigator.clipboard.writeText(paymentLink);
    toast({
      title: "تم النسخ!",
      description: "تم نسخ رابط الدفع للفاتورة",
    });
  };

  const handleDeleteInvoice = async (linkId: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الفاتورة؟")) {
      toast({
        title: "تم حذف الفاتورة",
        description: "تم حذف الفاتورة بنجاح",
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (!selectedCountry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>دولة غير صحيحة</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4">
            <BackButton label="العودة للخدمات" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">قائمة الفواتير</h1>
                <p className="text-sm text-muted-foreground">
                  {selectedCountry.nameAr}
                </p>
              </div>
            </div>
            <Button onClick={() => navigate(`/invoices/create/${country}`)}>
              <Plus className="w-4 h-4 ml-2" />
              فاتورة جديدة
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card className="p-4 mb-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
            <Input
              placeholder="البحث برقم الفاتورة أو اسم العميل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
        </Card>

        {/* Invoices List */}
        {filteredInvoices.length > 0 ? (
          <div className="grid gap-4">
            {filteredInvoices.map((link) => {
              const invoice = link.payload;
              return (
                <Card key={link.id} className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold">{invoice.invoice_number}</h3>
                          {getStatusBadge(link.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          العميل: {invoice.client_name}
                        </p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>تاريخ الإصدار: {invoice.issue_date}</span>
                          <span>تاريخ الاستحقاق: {invoice.due_date}</span>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-2xl font-bold text-primary">
                          {invoice.total?.toFixed(2)} {invoice.currency}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleCopyPaymentLink(link)}
                        className="flex-1"
                      >
                        <LinkIcon className="w-4 h-4 ml-1" />
                        نسخ رابط الدفع
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/invoices/${link.id}/view`)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/invoices/${link.id}/edit?country=${country}`)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteInvoice(link.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-bold mb-2">لا توجد فواتير</h3>
            <p className="text-muted-foreground mb-4">
              لم يتم إنشاء أي فواتير بعد
            </p>
            <Button onClick={() => navigate(`/invoices/create/${country}`)}>
              <Plus className="w-4 h-4 ml-2" />
              إنشاء أول فاتورة
            </Button>
          </Card>
        )}
      </div>
      <div className="h-20" />
      <BottomNav />
    </div>
  );
};

export default InvoiceList;
