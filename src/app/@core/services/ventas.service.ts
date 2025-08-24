import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface ItemVenta {
  id?: number;
  productoId: number;
  productoNombre: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

export interface Venta {
  id?: number;
  numeroVenta: string;
  clienteId: number;
  clienteNombre: string;
  items: ItemVenta[];
  subtotal: number;
  iva: number;
  total: number;
  formaPago: string;
  estado: string;
  fecha: string;
  observaciones?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VentaResponse {
  success: boolean;
  data: Venta;
  message?: string;
}

export interface VentasResponse {
  success: boolean;
  data: Venta[];
  total: number;
  page: number;
  limit: number;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private endpoint = '/ventas';

  constructor(private apiService: ApiService) { }

  // Obtener todas las ventas con paginación
  getVentas(page: number = 1, limit: number = 10, search?: string): Observable<VentasResponse> {
    const params: any = { page, limit };
    if (search) params.search = search;
    return this.apiService.get<VentasResponse>(this.endpoint, params);
  }

  // Obtener una venta por ID
  getVenta(id: number): Observable<VentaResponse> {
    return this.apiService.get<VentaResponse>(`${this.endpoint}/${id}`);
  }

  // Crear una nueva venta
  crearVenta(venta: Venta): Observable<VentaResponse> {
    return this.apiService.post<VentaResponse>(this.endpoint, venta);
  }

  // Actualizar una venta
  actualizarVenta(id: number, venta: Venta): Observable<VentaResponse> {
    return this.apiService.put<VentaResponse>(`${this.endpoint}/${id}`, venta);
  }

  // Eliminar una venta
  eliminarVenta(id: number): Observable<VentaResponse> {
    return this.apiService.delete<VentaResponse>(`${this.endpoint}/${id}`);
  }

  // Cambiar estado de una venta
  cambiarEstado(id: number, estado: string): Observable<VentaResponse> {
    return this.apiService.patch<VentaResponse>(`${this.endpoint}/${id}/estado`, { estado });
  }

  // Obtener ventas por fecha
  getVentasPorFecha(fechaInicio: string, fechaFin: string): Observable<VentasResponse> {
    return this.apiService.get<VentasResponse>(`${this.endpoint}/por-fecha`, { fechaInicio, fechaFin });
  }

  // Obtener estadísticas de ventas
  getEstadisticas(): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/estadisticas`);
  }

  // Generar número de venta automático
  generarNumeroVenta(): Observable<{ numeroVenta: string }> {
    return this.apiService.get<{ numeroVenta: string }>(`${this.endpoint}/generar-numero`);
  }
}
