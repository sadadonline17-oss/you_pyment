import { generatePaymentLink } from './paymentLinks';

export interface InvoicePaymentLinkParams {
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  countryCode: string;
  clientName: string;
  clientEmail: string;
}

export const generateInvoicePaymentLink = ({
  invoiceId,
  invoiceNumber,
  amount,
  currency,
  countryCode,
  clientName,
  clientEmail,
}: InvoicePaymentLinkParams): string => {
  const productionDomain = window.location.origin;
  
  const params = new URLSearchParams({
    company: 'invoices',
    service: 'invoices',
    currency: currency,
    amount: amount.toString(),
    title: `فاتورة ${invoiceNumber}`,
    invoice_id: invoiceId,
    invoice_number: invoiceNumber,
    client_name: clientName,
    client_email: clientEmail,
    country: countryCode,
  });

  return `${productionDomain}/pay/${invoiceId}?${params.toString()}`;
};

export const createInvoicePaymentPayload = (
  invoiceData: any,
  items: any[],
  subtotal: number,
  vatAmount: number,
  total: number
) => {
  return {
    invoice_number: invoiceData.invoiceNumber,
    client_name: invoiceData.clientName,
    client_email: invoiceData.clientEmail,
    client_phone: invoiceData.clientPhone,
    client_address: invoiceData.clientAddress,
    client_tax_number: invoiceData.clientTaxNumber,
    issue_date: invoiceData.issueDate,
    due_date: invoiceData.dueDate,
    currency: invoiceData.currency,
    vat_rate: invoiceData.vatRate,
    items: items,
    subtotal: subtotal,
    vat_amount: vatAmount,
    total: total,
    notes: invoiceData.notes,
    service_type: 'invoices',
    service_key: 'invoices',
    service_name: `فاتورة ${invoiceData.invoiceNumber}`,
    cod_amount: total,
  };
};
