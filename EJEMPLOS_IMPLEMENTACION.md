# Ejemplos de Implementación - Frontend

## 📋 Índice
1. [Actualizar Componente Productos](#actualizar-componente-productos)
2. [Actualizar Componente Clientes](#actualizar-componente-clientes)
3. [Actualizar Componente Ventas](#actualizar-componente-ventas)
4. [Actualizar Componente Facturas](#actualizar-componente-facturas)
5. [Actualizar Componente Inventarios](#actualizar-componente-inventarios)
6. [Actualizar Dashboard](#actualizar-dashboard)

## 🔧 Actualizar Componente Productos

### product.component.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService, Producto } from '../../@core/services/productos.service';

@Component({
  selector: 'ngx-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productoForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;
  loading = false;
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 10;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      codigo: [''],
      imagen: ['']
    });
  }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.loading = true;
    this.productosService.getProductos(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          this.productos = response.data;
          this.totalItems = response.total;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error cargando productos:', error);
          this.loading = false;
        }
      });
  }

  onSubmit() {
    if (this.productoForm.valid) {
      const productoData = this.productoForm.value;
      
      if (this.isEditing && this.editingId) {
        this.productosService.actualizarProducto(this.editingId, productoData)
          .subscribe({
            next: (response) => {
              this.cargarProductos();
              this.resetForm();
              // Mostrar mensaje de éxito
            },
            error: (error) => {
              console.error('Error actualizando producto:', error);
              // Mostrar mensaje de error
            }
          });
      } else {
        this.productosService.crearProducto(productoData)
          .subscribe({
            next: (response) => {
              this.cargarProductos();
              this.resetForm();
              // Mostrar mensaje de éxito
            },
            error: (error) => {
              console.error('Error creando producto:', error);
              // Mostrar mensaje de error
            }
          });
      }
    }
  }

  editarProducto(producto: Producto) {
    this.isEditing = true;
    this.editingId = producto.id!;
    this.productoForm.patchValue(producto);
  }

  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productosService.eliminarProducto(id)
        .subscribe({
          next: (response) => {
            this.cargarProductos();
            // Mostrar mensaje de éxito
          },
          error: (error) => {
            console.error('Error eliminando producto:', error);
            // Mostrar mensaje de error
          }
        });
    }
  }

  resetForm() {
    this.productoForm.reset();
    this.isEditing = false;
    this.editingId = null;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.cargarProductos();
  }
}
```

## 👥 Actualizar Componente Clientes

### clientes.component.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService, Cliente } from '../../@core/services/clientes.service';

@Component({
  selector: 'ngx-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;
  loading = false;
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 10;

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      documento: [''],
      ciudad: [''],
      codigoPostal: ['']
    });
  }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.loading = true;
    this.clientesService.getClientes(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          this.clientes = response.data;
          this.totalItems = response.total;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error cargando clientes:', error);
          this.loading = false;
        }
      });
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.value;
      
      if (this.isEditing && this.editingId) {
        this.clientesService.actualizarCliente(this.editingId, clienteData)
          .subscribe({
            next: (response) => {
              this.cargarClientes();
              this.resetForm();
            },
            error: (error) => {
              console.error('Error actualizando cliente:', error);
            }
          });
      } else {
        this.clientesService.crearCliente(clienteData)
          .subscribe({
            next: (response) => {
              this.cargarClientes();
              this.resetForm();
            },
            error: (error) => {
              console.error('Error creando cliente:', error);
            }
          });
      }
    }
  }

  editarCliente(cliente: Cliente) {
    this.isEditing = true;
    this.editingId = cliente.id!;
    this.clienteForm.patchValue(cliente);
  }

  eliminarCliente(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      this.clientesService.eliminarCliente(id)
        .subscribe({
          next: (response) => {
            this.cargarClientes();
          },
          error: (error) => {
            console.error('Error eliminando cliente:', error);
          }
        });
    }
  }

  resetForm() {
    this.clienteForm.reset();
    this.isEditing = false;
    this.editingId = null;
  }
}
```

## 🛒 Actualizar Componente Ventas

### ventas.component.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VentasService, Venta, ItemVenta } from '../../@core/services/ventas.service';
import { ProductosService, Producto } from '../../@core/services/productos.service';
import { ClientesService, Cliente } from '../../@core/services/clientes.service';

@Component({
  selector: 'ngx-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  ventas: Venta[] = [];
  productos: Producto[] = [];
  clientes: Cliente[] = [];
  ventaForm: FormGroup;
  itemsVenta: ItemVenta[] = [];
  selectedProducto: Producto | null = null;
  loading = false;
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 10;

  constructor(
    private fb: FormBuilder,
    private ventasService: VentasService,
    private productosService: ProductosService,
    private clientesService: ClientesService
  ) {
    this.ventaForm = this.fb.group({
      clienteId: ['', Validators.required],
      formaPago: ['efectivo', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit() {
    this.cargarVentas();
    this.cargarProductos();
    this.cargarClientes();
  }

  cargarVentas() {
    this.loading = true;
    this.ventasService.getVentas(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          this.ventas = response.data;
          this.totalItems = response.total;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error cargando ventas:', error);
          this.loading = false;
        }
      });
  }

  cargarProductos() {
    this.productosService.getProductos(1, 1000)
      .subscribe({
        next: (response) => {
          this.productos = response.data;
        },
        error: (error) => {
          console.error('Error cargando productos:', error);
        }
      });
  }

  cargarClientes() {
    this.clientesService.getClientes(1, 1000)
      .subscribe({
        next: (response) => {
          this.clientes = response.data;
        },
        error: (error) => {
          console.error('Error cargando clientes:', error);
        }
      });
  }

  onProductoChange(event: any) {
    const productoId = event.target.value;
    this.selectedProducto = this.productos.find(p => p.id === parseInt(productoId)) || null;
  }

  agregarItem() {
    if (this.selectedProducto) {
      const cantidad = 1; // Obtener del formulario
      const item: ItemVenta = {
        productoId: this.selectedProducto.id!,
        productoNombre: this.selectedProducto.nombre,
        cantidad: cantidad,
        precio: this.selectedProducto.precio,
        subtotal: this.selectedProducto.precio * cantidad
      };
      this.itemsVenta.push(item);
      this.selectedProducto = null;
    }
  }

  removerItem(index: number) {
    this.itemsVenta.splice(index, 1);
  }

  calcularTotal(): number {
    return this.itemsVenta.reduce((total, item) => total + item.subtotal, 0);
  }

  onSubmit() {
    if (this.ventaForm.valid && this.itemsVenta.length > 0) {
      const ventaData = this.ventaForm.value;
      const subtotal = this.calcularTotal();
      const iva = subtotal * 0.21; // 21% IVA
      const total = subtotal + iva;

      const venta: Venta = {
        ...ventaData,
        items: this.itemsVenta,
        subtotal: subtotal,
        iva: iva,
        total: total,
        estado: 'completada',
        fecha: new Date().toISOString().split('T')[0]
      };

      this.ventasService.crearVenta(venta)
        .subscribe({
          next: (response) => {
            this.cargarVentas();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error creando venta:', error);
          }
        });
    }
  }

  resetForm() {
    this.ventaForm.reset();
    this.itemsVenta = [];
    this.selectedProducto = null;
  }
}
```

## 📄 Actualizar Componente Facturas

### facturas.component.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacturasService, Factura, ItemFactura } from '../../@core/services/facturas.service';
import { ProductosService, Producto } from '../../@core/services/productos.service';
import { ClientesService, Cliente } from '../../@core/services/clientes.service';

@Component({
  selector: 'ngx-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {
  facturas: Factura[] = [];
  productos: Producto[] = [];
  clientes: Cliente[] = [];
  facturaForm: FormGroup;
  itemsFactura: ItemFactura[] = [];
  selectedProducto: Producto | null = null;
  loading = false;
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 10;

  constructor(
    private fb: FormBuilder,
    private facturasService: FacturasService,
    private productosService: ProductosService,
    private clientesService: ClientesService
  ) {
    this.facturaForm = this.fb.group({
      clienteId: ['', Validators.required],
      fechaVencimiento: [''],
      formaPago: [''],
      observaciones: ['']
    });
  }

  ngOnInit() {
    this.cargarFacturas();
    this.cargarProductos();
    this.cargarClientes();
    this.generarNumeroFactura();
  }

  cargarFacturas() {
    this.loading = true;
    this.facturasService.getFacturas(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          this.facturas = response.data;
          this.totalItems = response.total;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error cargando facturas:', error);
          this.loading = false;
        }
      });
  }

  cargarProductos() {
    this.productosService.getProductos(1, 1000)
      .subscribe({
        next: (response) => {
          this.productos = response.data;
        },
        error: (error) => {
          console.error('Error cargando productos:', error);
        }
      });
  }

  cargarClientes() {
    this.clientesService.getClientes(1, 1000)
      .subscribe({
        next: (response) => {
          this.clientes = response.data;
        },
        error: (error) => {
          console.error('Error cargando clientes:', error);
        }
      });
  }

  generarNumeroFactura() {
    this.facturasService.generarNumeroFactura()
      .subscribe({
        next: (response) => {
          // Usar response.numero en el formulario
        },
        error: (error) => {
          console.error('Error generando número de factura:', error);
        }
      });
  }

  onProductoChange(event: any) {
    const productoId = event.target.value;
    this.selectedProducto = this.productos.find(p => p.id === parseInt(productoId)) || null;
  }

  agregarItem() {
    if (this.selectedProducto) {
      const cantidad = 1; // Obtener del formulario
      const item: ItemFactura = {
        productoId: this.selectedProducto.id!,
        productoNombre: this.selectedProducto.nombre,
        cantidad: cantidad,
        precio: this.selectedProducto.precio,
        subtotal: this.selectedProducto.precio * cantidad
      };
      this.itemsFactura.push(item);
      this.selectedProducto = null;
    }
  }

  removerItem(index: number) {
    this.itemsFactura.splice(index, 1);
  }

  calcularTotal(): number {
    return this.itemsFactura.reduce((total, item) => total + item.subtotal, 0);
  }

  onSubmit() {
    if (this.facturaForm.valid && this.itemsFactura.length > 0) {
      const facturaData = this.facturaForm.value;
      const subtotal = this.calcularTotal();
      const iva = subtotal * 0.21; // 21% IVA
      const total = subtotal + iva;

      const factura: Factura = {
        ...facturaData,
        items: this.itemsFactura,
        subtotal: subtotal,
        iva: iva,
        total: total,
        estado: 'pendiente',
        fecha: new Date().toISOString().split('T')[0]
      };

      this.facturasService.crearFactura(factura)
        .subscribe({
          next: (response) => {
            this.cargarFacturas();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error creando factura:', error);
          }
        });
    }
  }

  generarPDF(id: number) {
    this.facturasService.generarPDF(id)
      .subscribe({
        next: (response) => {
          window.open(response.pdfUrl, '_blank');
        },
        error: (error) => {
          console.error('Error generando PDF:', error);
        }
      });
  }

  enviarPorEmail(id: number) {
    const email = prompt('Ingrese el email para enviar la factura:');
    if (email) {
      this.facturasService.enviarPorEmail(id, email)
        .subscribe({
          next: (response) => {
            alert('Factura enviada exitosamente');
          },
          error: (error) => {
            console.error('Error enviando factura:', error);
          }
        });
    }
  }

  resetForm() {
    this.facturaForm.reset();
    this.itemsFactura = [];
    this.selectedProducto = null;
    this.generarNumeroFactura();
  }
}
```

## 📦 Actualizar Componente Inventarios

### inventarios.component.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventariosService, Inventario, AjusteStock } from '../../@core/services/inventarios.service';
import { ProductosService, Producto } from '../../@core/services/productos.service';

@Component({
  selector: 'ngx-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.scss']
})
export class InventariosComponent implements OnInit {
  inventarios: Inventario[] = [];
  productos: Producto[] = [];
  inventarioForm: FormGroup;
  ajusteForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;
  loading = false;
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 10;

  constructor(
    private fb: FormBuilder,
    private inventariosService: InventariosService,
    private productosService: ProductosService
  ) {
    this.inventarioForm = this.fb.group({
      productoId: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      stockMinimo: [0, [Validators.required, Validators.min(0)]],
      stockMaximo: [0, [Validators.required, Validators.min(0)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      proveedor: [''],
      costoUnitario: [0]
    });

    this.ajusteForm = this.fb.group({
      productoId: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      tipo: ['entrada', Validators.required],
      motivo: ['', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit() {
    this.cargarInventarios();
    this.cargarProductos();
  }

  cargarInventarios() {
    this.loading = true;
    this.inventariosService.getInventarios(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          this.inventarios = response.data;
          this.totalItems = response.total;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error cargando inventarios:', error);
          this.loading = false;
        }
      });
  }

  cargarProductos() {
    this.productosService.getProductos(1, 1000)
      .subscribe({
        next: (response) => {
          this.productos = response.data;
        },
        error: (error) => {
          console.error('Error cargando productos:', error);
        }
      });
  }

  onSubmit() {
    if (this.inventarioForm.valid) {
      const inventarioData = this.inventarioForm.value;
      
      if (this.isEditing && this.editingId) {
        this.inventariosService.actualizarInventario(this.editingId, inventarioData)
          .subscribe({
            next: (response) => {
              this.cargarInventarios();
              this.resetForm();
            },
            error: (error) => {
              console.error('Error actualizando inventario:', error);
            }
          });
      } else {
        this.inventariosService.crearInventario(inventarioData)
          .subscribe({
            next: (response) => {
              this.cargarInventarios();
              this.resetForm();
            },
            error: (error) => {
              console.error('Error creando inventario:', error);
            }
          });
      }
    }
  }

  onAjusteSubmit() {
    if (this.ajusteForm.valid) {
      const ajusteData: AjusteStock = this.ajusteForm.value;
      
      this.inventariosService.ajustarStock(ajusteData)
        .subscribe({
          next: (response) => {
            this.cargarInventarios();
            this.ajusteForm.reset();
          },
          error: (error) => {
            console.error('Error ajustando stock:', error);
          }
        });
    }
  }

  editarInventario(inventario: Inventario) {
    this.isEditing = true;
    this.editingId = inventario.id!;
    this.inventarioForm.patchValue(inventario);
  }

  eliminarInventario(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este registro de inventario?')) {
      this.inventariosService.eliminarInventario(id)
        .subscribe({
          next: (response) => {
            this.cargarInventarios();
          },
          error: (error) => {
            console.error('Error eliminando inventario:', error);
          }
        });
    }
  }

  cargarStockBajo() {
    this.inventariosService.getStockBajo()
      .subscribe({
        next: (response) => {
          this.inventarios = response.data;
        },
        error: (error) => {
          console.error('Error cargando stock bajo:', error);
        }
      });
  }

  cargarStockCritico() {
    this.inventariosService.getStockCritico()
      .subscribe({
        next: (response) => {
          this.inventarios = response.data;
        },
        error: (error) => {
          console.error('Error cargando stock crítico:', error);
        }
      });
  }

  resetForm() {
    this.inventarioForm.reset();
    this.isEditing = false;
    this.editingId = null;
  }
}
```

## 📊 Actualizar Dashboard

### dashboard.component.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { DashboardService, DashboardStats, VentasPorDia, ProductosMasVendidos, ActividadReciente } from '../../@core/services/dashboard.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  ventasPorDia: VentasPorDia[] = [];
  productosMasVendidos: ProductosMasVendidos[] = [];
  actividadReciente: ActividadReciente[] = [];
  loading = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.cargarDashboard();
  }

  cargarDashboard() {
    this.loading = true;
    
    // Cargar estadísticas principales
    this.dashboardService.getEstadisticas()
      .subscribe({
        next: (response) => {
          this.stats = response.data.stats;
          this.ventasPorDia = response.data.ventasPorDia;
          this.productosMasVendidos = response.data.productosMasVendidos;
          this.actividadReciente = response.data.actividadReciente;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error cargando dashboard:', error);
          this.loading = false;
        }
      });
  }

  cargarVentasPorDia() {
    this.dashboardService.getVentasPorDia(30)
      .subscribe({
        next: (response) => {
          this.ventasPorDia = response.data;
        },
        error: (error) => {
          console.error('Error cargando ventas por día:', error);
        }
      });
  }

  cargarProductosMasVendidos() {
    this.dashboardService.getProductosMasVendidos(10)
      .subscribe({
        next: (response) => {
          this.productosMasVendidos = response.data;
        },
        error: (error) => {
          console.error('Error cargando productos más vendidos:', error);
        }
      });
  }

  cargarActividadReciente() {
    this.dashboardService.getActividadReciente(10)
      .subscribe({
        next: (response) => {
          this.actividadReciente = response.data;
        },
        error: (error) => {
          console.error('Error cargando actividad reciente:', error);
        }
      });
  }
}
```

## 🔄 Pasos para Implementar

1. **Reemplazar los datos mock** en cada componente con las llamadas a los servicios
2. **Agregar manejo de errores** con mensajes de usuario
3. **Implementar loading states** para mejor UX
4. **Agregar validaciones** en los formularios
5. **Implementar paginación** en las tablas
6. **Agregar confirmaciones** para acciones destructivas
7. **Implementar búsqueda** en los listados
8. **Agregar filtros** por fecha, estado, etc.

## 🎯 Funcionalidades Adicionales

- **Exportar a Excel/PDF** para reportes
- **Notificaciones push** para alertas
- **Dashboard en tiempo real** con WebSockets
- **Filtros avanzados** en listados
- **Búsqueda global** en toda la aplicación
- **Modo oscuro/claro**
- **Responsive design** para móviles

¡Con estos ejemplos tienes todo lo necesario para conectar el frontend con tu backend NestJS! 🚀
