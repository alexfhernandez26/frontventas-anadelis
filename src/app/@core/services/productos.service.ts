import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  codigo?: string;
  imagen?: string;
  activo?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductoResponse {
  success: boolean;
  data: Producto;
  message?: string;
}

export interface ProductosResponse {
  success: boolean;
  data: Producto[];
  total: number;
  page: number;
  limit: number;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private endpoint = '/productos';

  constructor(private apiService: ApiService) { }

  // Obtener todos los productos con paginación
  getProductos(page: number = 1, limit: number = 10, search?: string): Observable<ProductosResponse> {
    const params: any = { page, limit };
    if (search) params.search = search;
    return this.apiService.get<ProductosResponse>(this.endpoint, params);
  }

  // Obtener un producto por ID
  getProducto(id: number): Observable<ProductoResponse> {
    return this.apiService.get<ProductoResponse>(`${this.endpoint}/${id}`);
  }

  // Crear un nuevo producto
  crearProducto(producto: Producto): Observable<ProductoResponse> {
    return this.apiService.post<ProductoResponse>(this.endpoint, producto);
  }

  // Actualizar un producto
  actualizarProducto(id: number, producto: Producto): Observable<ProductoResponse> {
    return this.apiService.put<ProductoResponse>(`${this.endpoint}/${id}`, producto);
  }

  // Eliminar un producto
  eliminarProducto(id: number): Observable<ProductoResponse> {
    return this.apiService.delete<ProductoResponse>(`${this.endpoint}/${id}`);
  }

  // Actualizar stock de un producto
  actualizarStock(id: number, stock: number): Observable<ProductoResponse> {
    return this.apiService.patch<ProductoResponse>(`${this.endpoint}/${id}/stock`, { stock });
  }

  // Obtener productos con stock bajo
  getProductosStockBajo(): Observable<ProductosResponse> {
    return this.apiService.get<ProductosResponse>(`${this.endpoint}/stock-bajo`);
  }
}
