import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Cliente {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  direccion: string;
  documento?: string;
  ciudad?: string;
  codigoPostal?: string;
  activo?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClienteResponse {
  success: boolean;
  data: Cliente;
  message?: string;
}

export interface ClientesResponse {
  success: boolean;
  data: Cliente[];
  total: number;
  page: number;
  limit: number;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private endpoint = '/clientes';

  constructor(private apiService: ApiService) { }

  // Obtener todos los clientes con paginación
  getClientes(page: number = 1, limit: number = 10, search?: string): Observable<ClientesResponse> {
    const params: any = { page, limit };
    if (search) params.search = search;
    return this.apiService.get<ClientesResponse>(this.endpoint, params);
  }

  // Obtener un cliente por ID
  getCliente(id: number): Observable<ClienteResponse> {
    return this.apiService.get<ClienteResponse>(`${this.endpoint}/${id}`);
  }

  // Crear un nuevo cliente
  crearCliente(cliente: Cliente): Observable<ClienteResponse> {
    return this.apiService.post<ClienteResponse>(this.endpoint, cliente);
  }

  // Actualizar un cliente
  actualizarCliente(id: number, cliente: Cliente): Observable<ClienteResponse> {
    return this.apiService.put<ClienteResponse>(`${this.endpoint}/${id}`, cliente);
  }

  // Eliminar un cliente
  eliminarCliente(id: number): Observable<ClienteResponse> {
    return this.apiService.delete<ClienteResponse>(`${this.endpoint}/${id}`);
  }

  // Buscar clientes por email
  buscarPorEmail(email: string): Observable<ClientesResponse> {
    return this.apiService.get<ClientesResponse>(`${this.endpoint}/buscar`, { email });
  }

  // Obtener estadísticas de clientes
  getEstadisticas(): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/estadisticas`);
  }
}
