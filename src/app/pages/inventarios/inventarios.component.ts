import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Inventario {
  id: number;
  producto: string;
  stock: number;
  stockMinimo: number;
  stockMaximo: number;
  precio: number;
  categoria: string;
  ubicacion: string;
}

@Component({
  selector: 'ngx-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.scss'],
})
export class InventariosComponent implements OnInit {
  inventarioForm: FormGroup;
  inventarios: Inventario[] = [];
  editando = false;
  isEditing = false; // Agregar esta propiedad para el template
  inventarioEditando: Inventario | null = null;
  productos: any[] = [ // Agregar esta propiedad para el template
    { id: 1, nombre: 'Producto A' },
    { id: 2, nombre: 'Producto B' },
    { id: 3, nombre: 'Producto C' },
  ];

  constructor(private fb: FormBuilder) {
    this.inventarioForm = this.fb.group({
      producto: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      stockMinimo: [0, [Validators.required, Validators.min(0)]],
      stockMaximo: [0, [Validators.required, Validators.min(0)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.inventarios = [
      { id: 1, producto: 'Producto A', stock: 50, stockMinimo: 10, stockMaximo: 100, precio: 100, categoria: 'Electrónicos', ubicacion: 'Estante A1' },
      { id: 2, producto: 'Producto B', stock: 5, stockMinimo: 10, stockMaximo: 50, precio: 150, categoria: 'Ropa', ubicacion: 'Estante B2' },
      { id: 3, producto: 'Producto C', stock: 0, stockMinimo: 5, stockMaximo: 30, precio: 200, categoria: 'Hogar', ubicacion: 'Estante C3' },
    ];
  }

  guardarInventario(): void {
    if (this.inventarioForm.valid) {
      if (this.editando && this.inventarioEditando) {
        const index = this.inventarios.findIndex(i => i.id === this.inventarioEditando!.id);
        if (index !== -1) {
          this.inventarios[index] = { ...this.inventarioEditando, ...this.inventarioForm.value };
        }
      } else {
        const nuevoInventario: Inventario = {
          id: this.inventarios.length + 1,
          ...this.inventarioForm.value,
        };
        this.inventarios.push(nuevoInventario);
      }
      this.cancelarEdicion();
    }
  }

  editarInventario(inventario: Inventario): void {
    this.editando = true;
    this.isEditing = true; // Actualizar también esta propiedad
    this.inventarioEditando = inventario;
    this.inventarioForm.patchValue(inventario);
  }

  eliminarInventario(id: number): void {
    this.inventarios = this.inventarios.filter(i => i.id !== id);
  }

  ajustarStock(id: number, cantidad: number): void {
    const inventario = this.inventarios.find(i => i.id === id);
    if (inventario) {
      inventario.stock = Math.max(0, inventario.stock + cantidad);
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.isEditing = false; // Actualizar también esta propiedad
    this.inventarioEditando = null;
    this.inventarioForm.reset();
  }

  getStockStatus(stock: number, stockMinimo: number): string {
    if (stock === 0) return 'Sin stock';
    if (stock <= stockMinimo) return 'Stock crítico';
    if (stock <= stockMinimo * 2) return 'Stock bajo';
    return 'En stock';
  }

  getStockStatusClass(stock: number, stockMinimo: number): string {
    if (stock === 0) return 'danger';
    if (stock <= stockMinimo) return 'danger';
    if (stock <= stockMinimo * 2) return 'warning';
    return 'success';
  }

  getStockPercentage(stock: number, stockMaximo: number): number {
    return Math.min(100, (stock / stockMaximo) * 100);
  }

  getValorTotal(inventario: Inventario): number {
    return inventario.stock * inventario.precio;
  }

  getStockCriticoCount(): number {
    return this.inventarios.filter(i => i.stock <= i.stockMinimo).length;
  }

  getStockBajoCount(): number {
    return this.inventarios.filter(i => i.stock > i.stockMinimo && i.stock <= i.stockMinimo * 2).length;
  }

  getValorTotalInventario(): number {
    return this.inventarios.reduce((total, inventario) => total + this.getValorTotal(inventario), 0);
  }
}
