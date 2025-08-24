import { Injectable } from '@angular/core';

export interface InvoiceData {
  numeroFactura: string;
  cliente: string;
  fecha: Date;
  items: any[];
  total: number;
  formaPago: string;
  observaciones?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generateInvoicePDF(invoiceData: InvoiceData): void {
    // This is a placeholder for PDF generation
    // In a real implementation, you would use a library like jsPDF or similar
    
    console.log('Generating PDF for invoice:', invoiceData);
    
    // Simulate PDF generation
    const pdfContent = this.createPDFContent(invoiceData);
    
    // Create a blob and download
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `factura-${invoiceData.numeroFactura}.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  private createPDFContent(invoiceData: InvoiceData): string {
    // This is a simple text representation
    // In a real implementation, you would generate actual PDF content
    
    const content = `
FACTURA

Número: ${invoiceData.numeroFactura}
Cliente: ${invoiceData.cliente}
Fecha: ${invoiceData.fecha.toLocaleDateString()}
Forma de Pago: ${invoiceData.formaPago}

ITEMS:
${invoiceData.items.map(item => 
  `${item.producto} - Cantidad: ${item.cantidad} - Precio: $${item.precio} - Subtotal: $${item.subtotal}`
).join('\n')}

TOTAL: $${invoiceData.total}

${invoiceData.observaciones ? `Observaciones: ${invoiceData.observaciones}` : ''}
    `;
    
    return content;
  }

  shareViaWhatsApp(invoiceData: InvoiceData): void {
    const message = `Factura ${invoiceData.numeroFactura}\nCliente: ${invoiceData.cliente}\nTotal: $${invoiceData.total}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  shareViaEmail(invoiceData: InvoiceData): void {
    const subject = `Factura ${invoiceData.numeroFactura}`;
    const body = `Adjunto factura ${invoiceData.numeroFactura} por un total de $${invoiceData.total}`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  }
}
