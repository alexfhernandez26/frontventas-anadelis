import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Venta {
  id: number;
  fecha: string;
  cliente: string;
  productos: string;
  total: number;
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

interface Cliente {
  id: number;
  nombre: string;
  email: string;
}

@Component({
  selector: 'ngx-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  ventaForm: FormGroup;
  ventas: Venta[] = [];
  productos: Producto[] = [
    { id: 1, nombre: 'Producto A', precio: 100, stock: 50 },
    { id: 2, nombre: 'Producto B', precio: 150, stock: 30 },
    { id: 3, nombre: 'Producto C', precio: 200, stock: 20 },
  ];
  clientes: Cliente[] = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com' },
    { id: 2, nombre: 'María García', email: 'maria@email.com' },
    { id: 3, nombre: 'Carlos López', email: 'carlos@email.com' },
  ];

  constructor(private fb: FormBuilder) {
    this.ventaForm = this.fb.group({
      cliente: ['', Validators.required],
      productos: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    // Cargar ventas existentes
    this.ventas = [
      { id: 1, fecha: '2024-01-15', cliente: 'Juan Pérez', productos: 'Producto A', total: 100 },
      { id: 2, fecha: '2024-01-14', cliente: 'María García', productos: 'Producto B', total: 150 },
    ];
  }

  onProductoChange(event: any): void {
    const producto = this.productos.find(p => p.id === event);
    if (producto) {
      this.ventaForm.patchValue({
        precio: producto.precio
      });
    }
  }

  calcularTotal(): number {
    const cantidad = this.ventaForm.get('cantidad')?.value || 0;
    const precio = this.ventaForm.get('precio')?.value || 0;
    return cantidad * precio;
  }

  guardarVenta(): void {
    if (this.ventaForm.valid) {
      const nuevaVenta: Venta = {
        id: this.ventas.length + 1,
        fecha: new Date().toISOString().split('T')[0],
        cliente: this.ventaForm.get('cliente')?.value,
        productos: this.ventaForm.get('productos')?.value,
        total: this.calcularTotal(),
      };
      this.ventas.push(nuevaVenta);
      this.ventaForm.reset();
    }
  }

  eliminarVenta(id: number): void {
    this.ventas = this.ventas.filter(venta => venta.id !== id);
  }
}
