import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface ItemFactura {
  id?: number;
  productoId: number;
  productoNombre: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

export interface Factura {
  id?: number;
  numero: string;
  clienteId: number;
  clienteNombre: string;
  items: ItemFactura[];
  subtotal: number;
  iva: number;
  total: number;
  estado: string;
  fecha: string;
  fechaVencimiento?: string;
  formaPago?: string;
  observaciones?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FacturaResponse {
  success: boolean;
  data: Factura;
  message?: string;
}

export interface FacturasResponse {
  success: boolean;
  data: Factura[];
  total: number;
  page: number;
  limit: number;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private endpoint = '/facturas';

  constructor(private apiService: ApiService) { }

  // Obtener todas las facturas con paginación
  getFacturas(page: number = 1, limit: number = 10, search?: string): Observable<FacturasResponse> {
    const params: any = { page, limit };
    if (search) params.search = search;
    return this.apiService.get<FacturasResponse>(this.endpoint, params);
  }

  // Obtener una factura por ID
  getFactura(id: number): Observable<FacturaResponse> {
    return this.apiService.get<FacturaResponse>(`${this.endpoint}/${id}`);
  }

  // Crear una nueva factura
  crearFactura(factura: Factura): Observable<FacturaResponse> {
    return this.apiService.post<FacturaResponse>(this.endpoint, factura);
  }

  // Actualizar una factura
  actualizarFactura(id: number, factura: Factura): Observable<FacturaResponse> {
    return this.apiService.put<FacturaResponse>(`${this.endpoint}/${id}`, factura);
  }

  // Eliminar una factura
  eliminarFactura(id: number): Observable<FacturaResponse> {
    return this.apiService.delete<FacturaResponse>(`${this.endpoint}/${id}`);
  }

  // Cambiar estado de una factura
  cambiarEstado(id: number, estado: string): Observable<FacturaResponse> {
    return this.apiService.patch<FacturaResponse>(`${this.endpoint}/${id}/estado`, { estado });
  }

  // Generar PDF de factura
  generarPDF(id: number): Observable<{ pdfUrl: string }> {
    return this.apiService.get<{ pdfUrl: string }>(`${this.endpoint}/${id}/pdf`);
  }

  // Enviar factura por email
  enviarPorEmail(id: number, email: string): Observable<FacturaResponse> {
    return this.apiService.post<FacturaResponse>(`${this.endpoint}/${id}/enviar-email`, { email });
  }

  // Obtener facturas por cliente
  getFacturasPorCliente(clienteId: number): Observable<FacturasResponse> {
    return this.apiService.get<FacturasResponse>(`${this.endpoint}/cliente/${clienteId}`);
  }

  // Obtener facturas pendientes
  getFacturasPendientes(): Observable<FacturasResponse> {
    return this.apiService.get<FacturasResponse>(`${this.endpoint}/pendientes`);
  }

  // Generar número de factura automático
  generarNumeroFactura(): Observable<{ numero: string }> {
    return this.apiService.get<{ numero: string }>(`${this.endpoint}/generar-numero`);
  }

  // Obtener estadísticas de facturas
  getEstadisticas(): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/estadisticas`);
  }
}
