import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Inventario {
  id?: number;
  productoId: number;
  productoNombre: string;
  stock: number;
  stockMinimo: number;
  stockMaximo: number;
  precio: number;
  categoria: string;
  ubicacion: string;
  proveedor?: string;
  costoUnitario?: number;
  ultimaActualizacion?: Date;
  activo?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InventarioResponse {
  success: boolean;
  data: Inventario;
  message?: string;
}

export interface InventariosResponse {
  success: boolean;
  data: Inventario[];
  total: number;
  page: number;
  limit: number;
  message?: string;
}

export interface AjusteStock {
  productoId: number;
  cantidad: number;
  tipo: 'entrada' | 'salida' | 'ajuste';
  motivo: string;
  observaciones?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventariosService {
  private endpoint = '/inventarios';

  constructor(private apiService: ApiService) { }

  // Obtener todos los inventarios con paginación
  getInventarios(page: number = 1, limit: number = 10, search?: string): Observable<InventariosResponse> {
    const params: any = { page, limit };
    if (search) params.search = search;
    return this.apiService.get<InventariosResponse>(this.endpoint, params);
  }

  // Obtener un inventario por ID
  getInventario(id: number): Observable<InventarioResponse> {
    return this.apiService.get<InventarioResponse>(`${this.endpoint}/${id}`);
  }

  // Crear un nuevo registro de inventario
  crearInventario(inventario: Inventario): Observable<InventarioResponse> {
    return this.apiService.post<InventarioResponse>(this.endpoint, inventario);
  }

  // Actualizar un inventario
  actualizarInventario(id: number, inventario: Inventario): Observable<InventarioResponse> {
    return this.apiService.put<InventarioResponse>(`${this.endpoint}/${id}`, inventario);
  }

  // Eliminar un inventario
  eliminarInventario(id: number): Observable<InventarioResponse> {
    return this.apiService.delete<InventarioResponse>(`${this.endpoint}/${id}`);
  }

  // Ajustar stock de un producto
  ajustarStock(ajuste: AjusteStock): Observable<InventarioResponse> {
    return this.apiService.post<InventarioResponse>(`${this.endpoint}/ajustar-stock`, ajuste);
  }

  // Obtener productos con stock bajo
  getStockBajo(): Observable<InventariosResponse> {
    return this.apiService.get<InventariosResponse>(`${this.endpoint}/stock-bajo`);
  }

  // Obtener productos sin stock
  getSinStock(): Observable<InventariosResponse> {
    return this.apiService.get<InventariosResponse>(`${this.endpoint}/sin-stock`);
  }

  // Obtener productos con stock crítico
  getStockCritico(): Observable<InventariosResponse> {
    return this.apiService.get<InventariosResponse>(`${this.endpoint}/stock-critico`);
  }

  // Obtener historial de movimientos de stock
  getHistorialStock(productoId: number): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/historial/${productoId}`);
  }

  // Obtener estadísticas de inventario
  getEstadisticas(): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/estadisticas`);
  }

  // Generar reporte de inventario
  generarReporte(): Observable<{ reporteUrl: string }> {
    return this.apiService.get<{ reporteUrl: string }>(`${this.endpoint}/reporte`);
  }
}
