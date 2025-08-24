import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
}

@Component({
  selector: 'ngx-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  productoForm: FormGroup;
  productos: Producto[] = [];
  editando = false;
  isEditing = false; // Agregar esta propiedad para el template
  productoEditando: Producto | null = null;

  constructor(private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.productos = [
      { id: 1, nombre: 'Producto A', descripcion: 'Descripción del producto A', precio: 100, stock: 50, categoria: 'Electrónicos' },
      { id: 2, nombre: 'Producto B', descripcion: 'Descripción del producto B', precio: 150, stock: 30, categoria: 'Ropa' },
      { id: 3, nombre: 'Producto C', descripcion: 'Descripción del producto C', precio: 200, stock: 20, categoria: 'Hogar' },
    ];
  }

  guardarProducto(): void {
    if (this.productoForm.valid) {
      if (this.editando && this.productoEditando) {
        // Actualizar producto existente
        const index = this.productos.findIndex(p => p.id === this.productoEditando!.id);
        if (index !== -1) {
          this.productos[index] = { ...this.productoEditando, ...this.productoForm.value };
        }
      } else {
        // Agregar nuevo producto
        const nuevoProducto: Producto = {
          id: this.productos.length + 1,
          ...this.productoForm.value,
        };
        this.productos.push(nuevoProducto);
      }
      this.cancelarEdicion();
    }
  }

  editarProducto(producto: Producto): void {
    this.editando = true;
    this.isEditing = true; // Actualizar también esta propiedad
    this.productoEditando = producto;
    this.productoForm.patchValue(producto);
  }

  eliminarProducto(id: number): void {
    this.productos = this.productos.filter(p => p.id !== id);
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.isEditing = false; // Actualizar también esta propiedad
    this.productoEditando = null;
    this.productoForm.reset();
  }

  getStockStatus(stock: number): string {
    if (stock === 0) return 'Sin stock';
    if (stock < 10) return 'Stock bajo';
    return 'En stock';
  }

  getStockStatusClass(stock: number): string {
    if (stock === 0) return 'danger';
    if (stock < 10) return 'warning';
    return 'success';
  }
}
