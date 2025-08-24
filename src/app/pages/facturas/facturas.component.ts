import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ItemFactura {
  id: number;
  producto: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

interface Factura {
  id: number;
  numero: string;
  fecha: string;
  cliente: string;
  items: ItemFactura[];
  subtotal: number;
  iva: number;
  total: number;
  estado: string;
}

@Component({
  selector: 'ngx-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss'],
})
export class FacturasComponent implements OnInit {
  facturaForm: FormGroup;
  itemForm: FormGroup;
  facturas: Factura[] = [];
  items: ItemFactura[] = [];
  itemsFactura: ItemFactura[] = []; // Agregar esta propiedad para el template
  selectedProducto: any = null; // Agregar esta propiedad para el template
  productos: any[] = [
    { id: 1, nombre: 'Producto A', precio: 100 },
    { id: 2, nombre: 'Producto B', precio: 150 },
    { id: 3, nombre: 'Producto C', precio: 200 },
  ];
  clientes: any[] = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María García' },
    { id: 3, nombre: 'Carlos López' },
  ];

  constructor(private fb: FormBuilder) {
    this.facturaForm = this.fb.group({
      numero: ['', Validators.required],
      fecha: [new Date().toISOString().split('T')[0], Validators.required],
      cliente: ['', Validators.required],
    });

    this.itemForm = this.fb.group({
      producto: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.facturas = [
      {
        id: 1,
        numero: 'FAC-001',
        fecha: '2024-01-15',
        cliente: 'Juan Pérez',
        items: [
          { id: 1, producto: 'Producto A', cantidad: 2, precio: 100, subtotal: 200 },
        ],
        subtotal: 200,
        iva: 42,
        total: 242,
        estado: 'Pagada',
      },
    ];
    this.itemsFactura = this.items; // Inicializar itemsFactura
  }

  agregarItem(): void {
    if (this.itemForm.valid) {
      const item: ItemFactura = {
        id: this.items.length + 1,
        ...this.itemForm.value,
        subtotal: this.itemForm.get('cantidad')?.value * this.itemForm.get('precio')?.value,
      };
      this.items.push(item);
      this.itemsFactura = this.items; // Actualizar itemsFactura
      this.itemForm.reset({ cantidad: 1, precio: 0 });
      this.actualizarSubtotal();
    }
  }

  actualizarSubtotal(): void {
    this.facturaForm.patchValue({
      subtotal: this.items.reduce((sum, item) => sum + item.subtotal, 0),
    });
  }

  eliminarItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.itemsFactura = this.items; // Actualizar itemsFactura
    this.actualizarSubtotal();
  }

  calcularTotal(): number {
    const subtotal = this.items.reduce((sum, item) => sum + item.subtotal, 0);
    const iva = subtotal * 0.21; // 21% IVA
    return subtotal + iva;
  }

  guardarFactura(): void {
    if (this.facturaForm.valid && this.items.length > 0) {
      const nuevaFactura: Factura = {
        id: this.facturas.length + 1,
        ...this.facturaForm.value,
        items: [...this.items],
        subtotal: this.items.reduce((sum, item) => sum + item.subtotal, 0),
        iva: this.items.reduce((sum, item) => sum + item.subtotal, 0) * 0.21,
        total: this.calcularTotal(),
        estado: 'Pendiente',
      };
      this.facturas.push(nuevaFactura);
      this.facturaForm.reset();
      this.items = [];
      this.itemsFactura = this.items; // Actualizar itemsFactura
    }
  }

  generarPDF(factura: Factura): void {
    console.log('Generando PDF para factura:', factura.numero);
    // Aquí iría la lógica de generación de PDF
  }

  enviarWhatsApp(factura: Factura): void {
    const mensaje = `Factura ${factura.numero} - Total: $${factura.total}`;
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  enviarEmail(factura: Factura): void {
    const asunto = `Factura ${factura.numero}`;
    const mensaje = `Adjunto factura ${factura.numero} por un total de $${factura.total}`;
    const url = `mailto:?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`;
    window.open(url);
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Pagada': return 'success';
      case 'Pendiente': return 'warning';
      case 'Vencida': return 'danger';
      default: return 'info';
    }
  }
}
