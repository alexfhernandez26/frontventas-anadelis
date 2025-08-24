import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface DashboardStats {
  ventasHoy: number;
  ventasMes: number;
  totalProductos: number;
  totalClientes: number;
  facturasPendientes: number;
  stockBajo: number;
  stockCritico: number;
  valorTotalInventario: number;
}

export interface VentasPorDia {
  fecha: string;
  total: number;
  cantidad: number;
}

export interface ProductosMasVendidos {
  productoId: number;
  productoNombre: string;
  cantidadVendida: number;
  totalVendido: number;
}

export interface ActividadReciente {
  id: number;
  tipo: 'venta' | 'cliente' | 'factura' | 'inventario';
  descripcion: string;
  fecha: Date;
  monto?: number;
}

export interface DashboardResponse {
  success: boolean;
  data: {
    stats: DashboardStats;
    ventasPorDia: VentasPorDia[];
    productosMasVendidos: ProductosMasVendidos[];
    actividadReciente: ActividadReciente[];
  };
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private endpoint = '/dashboard';

  constructor(private apiService: ApiService) { }

  // Obtener estadísticas del dashboard
  getEstadisticas(): Observable<DashboardResponse> {
    return this.apiService.get<DashboardResponse>(this.endpoint);
  }

  // Obtener ventas por día (últimos 30 días)
  getVentasPorDia(dias: number = 30): Observable<{ data: VentasPorDia[] }> {
    return this.apiService.get<{ data: VentasPorDia[] }>(`${this.endpoint}/ventas-por-dia`, { dias });
  }

  // Obtener productos más vendidos
  getProductosMasVendidos(limite: number = 10): Observable<{ data: ProductosMasVendidos[] }> {
    return this.apiService.get<{ data: ProductosMasVendidos[] }>(`${this.endpoint}/productos-mas-vendidos`, { limite });
  }

  // Obtener actividad reciente
  getActividadReciente(limite: number = 10): Observable<{ data: ActividadReciente[] }> {
    return this.apiService.get<{ data: ActividadReciente[] }>(`${this.endpoint}/actividad-reciente`, { limite });
  }

  // Obtener alertas del sistema
  getAlertas(): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/alertas`);
  }
}
