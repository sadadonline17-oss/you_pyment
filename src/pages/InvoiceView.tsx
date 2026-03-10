import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Country, getCountryByCode } from "@/lib/countries";
import { ArrowRight, FileText, Download, Edit, Send, CheckCircle, Link as LinkIcon, Copy, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLink } from "@/hooks/useSupabase";
import { generateInvoicePaymentLink } from "@/utils/invoicePaymentLink";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  clientTaxNumber: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  vatRate: number;
  notes: string;
  items: InvoiceItem[];
  subtotal: number;
  vatAmount: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue";
  createdAt: string;
}

const InvoiceView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: linkData, isLoading } = useLink(id);
  const invoice = linkData?.payload as any;
  const countryCode = linkData?.country_code || "SA";
  const selectedCountry = getCountryByCode(countryCode);
  
  const [paymentLink, setPaymentLink] = useState<string>("");

  useEffect(() => {
    if (linkData && invoice) {
      const link = generateInvoicePaymentLink({
        invoiceId: linkData.id,
        invoiceNumber: invoice.invoice_number,
        amount: invoice.total,
        currency: invoice.currency,
        countryCode: countryCode,
        clientName: invoice.client_name,
        clientEmail: invoice.client_email,
      });
      setPaymentLink(link);
    }
  }, [linkData, invoice, countryCode]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      draft: "secondary",
      sent: "default",
      paid: "default",
      overdue: "destructive",
    };

    const labels: Record<string, string> = {
      draft: "مسودة",
      sent: "مرسلة",
      paid: "مدفوعة",
      overdue: "متأخرة",
    };

    return (
      <Badge variant={variants[status] || "default"}>
        {labels[status] || status}
      </Badge>
    );
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentLink);
    toast({
      title: "تم النسخ!",
      description: "تم نسخ رابط الدفع بنجاح",
    });
  };
  
  const handleShareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: `فاتورة ${invoice?.invoice_number}`,
        text: `رابط دفع فاتورة ${invoice?.invoice_number}`,
        url: paymentLink,
      });
    } else {
      handleCopyLink();
    }
  };

  const handleDownload = () => {
    window.print();
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

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>الفاتورة غير موجودة</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 print:hidden">
          <Button
            variant="ghost"
            onClick={() => navigate(`/invoices/list/${countryCode}`)}
            className="mb-4"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للقائمة
          </Button>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">فاتورة رقم {invoice?.invoice_number}</h1>
                <p className="text-sm text-muted-foreground">
                  {selectedCountry?.nameAr}
                </p>
              </div>
            </div>
            
            {paymentLink && (
              <Card className="p-4 border-2 border-blue-500 bg-blue-50/50">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <Label className="text-xs font-bold mb-2 block flex items-center gap-2">
                      <LinkIcon className="w-3.5 h-3.5" />
                      رابط الدفع
                    </Label>
                    <div className="flex gap-2">
                      <Input 
                        value={paymentLink} 
                        readOnly 
                        className="text-xs font-mono bg-white"
                        dir="ltr"
                      />
                      <Button 
                        onClick={handleCopyLink}
                        size="sm"
                        variant="outline"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={handleShareLink}
                        size="sm"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" onClick={handleDownload}>
                <Download className="w-4 h-4 ml-2" />
                طباعة PDF
              </Button>
              <Button onClick={() => navigate(`/invoices/${id}/edit?country=${countryCode}`)}>
                <Edit className="w-4 h-4 ml-2" />
                تعديل
              </Button>
            </div>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="bg-white print:shadow-none">
          {/* Invoice Header */}
          <div className="border-b-2 border-primary pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">فاتورة</h1>
                <p className="text-lg">رقم الفاتورة: {invoice?.invoice_number}</p>
                <p>تاريخ الإصدار: {invoice?.issue_date}</p>
                <p>تاريخ الاستحقاق: {invoice?.due_date}</p>
              </div>
              <div className="text-left">
                <div className="text-6xl mb-2">{selectedCountry?.flag}</div>
                <h2 className="font-bold">{selectedCountry?.nameAr}</h2>
                <p className="text-sm text-muted-foreground">{selectedCountry?.name}</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mb-6 print:hidden">
            <div className="flex items-center gap-2">
              <span>الحالة:</span>
              {getStatusBadge(linkData?.status || "draft")}
            </div>
          </div>

          {/* Client Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6">
              <h3 className="font-bold mb-3">فاتورة إلى:</h3>
              <p className="font-semibold">{invoice.clientName}</p>
              <p>{invoice.clientEmail}</p>
              <p>{invoice.clientPhone}</p>
              <p>{invoice.clientAddress}</p>
              {invoice.clientTaxNumber && (
                <p>الرقم الضريبي: {invoice.clientTaxNumber}</p>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-3">تفاصيل الفاتورة:</h3>
              <p>العملة: {invoice.currency}</p>
              <p>معدل الضريبة: {invoice.vatRate}%</p>
            </Card>
          </div>

          {/* Items Table */}
          <Card className="p-6 mb-6">
            <h3 className="font-bold mb-4">عناصر الفاتورة</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-right p-3">الوصف</th>
                    <th className="text-right p-3">الكمية</th>
                    <th className="text-right p-3">السعر</th>
                    <th className="text-right p-3">الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice?.items?.map((item: any) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3">{item.description}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3">
                        {item.unitPrice?.toFixed(2)} {invoice.currency}
                      </td>
                      <td className="p-3">
                        {item.total?.toFixed(2)} {invoice.currency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Totals */}
          <div className="flex justify-end mb-6">
            <Card className="p-6 w-full md:w-1/2">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span>
                    {invoice?.subtotal?.toFixed(2)} {invoice?.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>الضريبة ({invoice?.vat_rate}%):</span>
                  <span>
                    {invoice?.vat_amount?.toFixed(2)} {invoice?.currency}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between text-xl font-bold text-primary">
                  <span>الإجمالي:</span>
                  <span>
                    {invoice?.total?.toFixed(2)} {invoice?.currency}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Notes */}
          {invoice?.notes && (
            <Card className="p-6 mb-6">
              <h3 className="font-bold mb-3">ملاحظات</h3>
              <p>{invoice.notes}</p>
            </Card>
          )}

          {/* Footer */}
          <div className="border-t-2 border-primary pt-6 text-center text-muted-foreground">
            <p>شكراً لتعاملكم معنا</p>
            <p className="text-sm">
              تم إنشاء هذه الفاتورة باستخدام نظام الفواتير الإلكتروني
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
