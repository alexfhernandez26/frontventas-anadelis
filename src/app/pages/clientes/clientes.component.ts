import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  direccion: string;
}

@Component({
  selector: 'ngx-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  clienteForm: FormGroup;
  clientes: Cliente[] = [];
  editando = false;
  isEditing = false; // Agregar esta propiedad para el template
  clienteEditando: Cliente | null = null;

  constructor(private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.clientes = [
      { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@email.com', telefono: '123456789', fechaNacimiento: '1990-01-01', direccion: 'Calle 123' },
      { id: 2, nombre: 'María', apellido: 'García', email: 'maria@email.com', telefono: '987654321', fechaNacimiento: '1985-05-15', direccion: 'Avenida 456' },
      { id: 3, nombre: 'Carlos', apellido: 'López', email: 'carlos@email.com', telefono: '555555555', fechaNacimiento: '1992-12-20', direccion: 'Plaza 789' },
    ];
  }

  guardarCliente(): void {
    if (this.clienteForm.valid) {
      if (this.editando && this.clienteEditando) {
        const index = this.clientes.findIndex(c => c.id === this.clienteEditando!.id);
        if (index !== -1) {
          this.clientes[index] = { ...this.clienteEditando, ...this.clienteForm.value };
        }
      } else {
        const nuevoCliente: Cliente = {
          id: this.clientes.length + 1,
          ...this.clienteForm.value,
        };
        this.clientes.push(nuevoCliente);
      }
      this.cancelarEdicion();
    }
  }

  editarCliente(cliente: Cliente): void {
    this.editando = true;
    this.isEditing = true; // Actualizar también esta propiedad
    this.clienteEditando = cliente;
    this.clienteForm.patchValue(cliente);
  }

  eliminarCliente(id: number): void {
    this.clientes = this.clientes.filter(c => c.id !== id);
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.isEditing = false; // Actualizar también esta propiedad
    this.clienteEditando = null;
    this.clienteForm.reset();
  }

  getNombreCompleto(cliente: Cliente): string {
    return `${cliente.nombre} ${cliente.apellido}`;
  }

  getEdad(fechaNacimiento: string): number {
    const fecha = new Date(fechaNacimiento);
    const hoy = new Date();
    return hoy.getFullYear() - fecha.getFullYear();
  }
}
