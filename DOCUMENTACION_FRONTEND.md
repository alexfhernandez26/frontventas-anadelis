# Documentación del Frontend - Sistema de Ventas e Inventario

## 📋 Índice
1. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
2. [Configuración del Backend](#configuración-del-backend)
3. [Servicios y APIs](#servicios-y-apis)
4. [Estructura de Datos](#estructura-de-datos)
5. [Endpoints Requeridos](#endpoints-requeridos)
6. [Ejemplos de Uso](#ejemplos-de-uso)
7. [Configuración de CORS](#configuración-de-cors)
8. [Autenticación](#autenticación)

## 🏗️ Arquitectura del Proyecto

### Tecnologías Utilizadas
- **Angular 15.2.10**: Framework principal
- **Nebular (ngx-admin)**: UI Framework
- **TypeScript**: Lenguaje de programación
- **RxJS**: Manejo de observables
- **Angular Reactive Forms**: Formularios

### Estructura de Carpetas
```
src/
├── app/
│   ├── @core/
│   │   └── services/          # Servicios para comunicación con backend
│   ├── @theme/               # Componentes de UI (Nebular)
│   └── pages/
│       ├── dashboard/        # Panel principal
│       ├── ventas/          # Gestión de ventas
│       ├── productos/       # Gestión de productos
│       ├── clientes/        # Gestión de clientes
│       ├── facturas/        # Gestión de facturas
│       └── inventarios/     # Control de inventario
```

## ⚙️ Configuración del Backend

### URL Base
- **Desarrollo**: `http://localhost:3000/api`
- **Producción**: Configurar en `environment.prod.ts`

### Configuración en environment.ts
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};
```

## 🔌 Servicios y APIs

### Servicios Principales
1. **ApiService**: Servicio base para HTTP requests
2. **ProductosService**: Gestión de productos
3. **ClientesService**: Gestión de clientes
4. **VentasService**: Gestión de ventas
5. **FacturasService**: Gestión de facturas
6. **InventariosService**: Control de inventario
7. **DashboardService**: Estadísticas del dashboard

### Patrón de Respuesta
Todos los endpoints deben seguir este patrón:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  message?: string;
}
```

## 📊 Estructura de Datos

### Producto
```typescript
interface Producto {
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
```

### Cliente
```typescript
interface Cliente {
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
```

### Venta
```typescript
interface Venta {
  id?: number;
  numeroVenta: string;
  clienteId: number;
  clienteNombre: string;
  items: ItemVenta[];
  subtotal: number;
  iva: number;
  total: number;
  formaPago: string;
  estado: string;
  fecha: string;
  observaciones?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ItemVenta {
  id?: number;
  productoId: number;
  productoNombre: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}
```

### Factura
```typescript
interface Factura {
  id?: number;
  numero: string;
  clienteId: number;
  clienteNombre: string;
  items: ItemFactura[];
  subtotal: number;
  iva: number;
  total: number;
  estado: string;
  fecha: string;
  fechaVencimiento?: string;
  formaPago?: string;
  observaciones?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

### Inventario
```typescript
interface Inventario {
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
```

## 🌐 Endpoints Requeridos

### Productos
```
GET    /api/productos                    # Listar productos (con paginación)
GET    /api/productos/:id                # Obtener producto por ID
POST   /api/productos                    # Crear producto
PUT    /api/productos/:id                # Actualizar producto
DELETE /api/productos/:id                # Eliminar producto
PATCH  /api/productos/:id/stock          # Actualizar stock
GET    /api/productos/stock-bajo         # Productos con stock bajo
```

### Clientes
```
GET    /api/clientes                     # Listar clientes (con paginación)
GET    /api/clientes/:id                 # Obtener cliente por ID
POST   /api/clientes                     # Crear cliente
PUT    /api/clientes/:id                 # Actualizar cliente
DELETE /api/clientes/:id                 # Eliminar cliente
GET    /api/clientes/buscar              # Buscar por email
GET    /api/clientes/estadisticas        # Estadísticas de clientes
```

### Ventas
```
GET    /api/ventas                       # Listar ventas (con paginación)
GET    /api/ventas/:id                   # Obtener venta por ID
POST   /api/ventas                       # Crear venta
PUT    /api/ventas/:id                   # Actualizar venta
DELETE /api/ventas/:id                   # Eliminar venta
PATCH  /api/ventas/:id/estado            # Cambiar estado
GET    /api/ventas/por-fecha             # Ventas por fecha
GET    /api/ventas/estadisticas          # Estadísticas de ventas
GET    /api/ventas/generar-numero        # Generar número de venta
```

### Facturas
```
GET    /api/facturas                     # Listar facturas (con paginación)
GET    /api/facturas/:id                 # Obtener factura por ID
POST   /api/facturas                     # Crear factura
PUT    /api/facturas/:id                 # Actualizar factura
DELETE /api/facturas/:id                 # Eliminar factura
PATCH  /api/facturas/:id/estado          # Cambiar estado
GET    /api/facturas/:id/pdf             # Generar PDF
POST   /api/facturas/:id/enviar-email    # Enviar por email
GET    /api/facturas/cliente/:id         # Facturas por cliente
GET    /api/facturas/pendientes          # Facturas pendientes
GET    /api/facturas/generar-numero      # Generar número de factura
GET    /api/facturas/estadisticas        # Estadísticas de facturas
```

### Inventarios
```
GET    /api/inventarios                  # Listar inventarios (con paginación)
GET    /api/inventarios/:id              # Obtener inventario por ID
POST   /api/inventarios                  # Crear inventario
PUT    /api/inventarios/:id              # Actualizar inventario
DELETE /api/inventarios/:id              # Eliminar inventario
POST   /api/inventarios/ajustar-stock    # Ajustar stock
GET    /api/inventarios/stock-bajo       # Productos con stock bajo
GET    /api/inventarios/sin-stock        # Productos sin stock
GET    /api/inventarios/stock-critico    # Productos con stock crítico
GET    /api/inventarios/historial/:id    # Historial de movimientos
GET    /api/inventarios/estadisticas     # Estadísticas de inventario
GET    /api/inventarios/reporte          # Generar reporte
```

### Dashboard
```
GET    /api/dashboard                    # Estadísticas generales
GET    /api/dashboard/ventas-por-dia     # Ventas por día
GET    /api/dashboard/productos-mas-vendidos # Productos más vendidos
GET    /api/dashboard/actividad-reciente # Actividad reciente
GET    /api/dashboard/alertas            # Alertas del sistema
```

## 📝 Ejemplos de Uso

### Parámetros de Paginación
```typescript
// GET /api/productos?page=1&limit=10&search=laptop
{
  page: 1,        // Página actual
  limit: 10,      // Elementos por página
  search: "laptop" // Búsqueda opcional
}
```

### Respuesta de Paginación
```typescript
{
  success: true,
  data: Producto[],
  total: 150,     // Total de elementos
  page: 1,        // Página actual
  limit: 10,      // Elementos por página
  message: "Productos obtenidos exitosamente"
}
```

### Crear Producto
```typescript
// POST /api/productos
{
  nombre: "Laptop HP",
  descripcion: "Laptop HP Pavilion",
  precio: 1200.00,
  stock: 50,
  categoria: "Electrónicos",
  codigo: "LAP001"
}

// Respuesta
{
  success: true,
  data: {
    id: 1,
    nombre: "Laptop HP",
    // ... resto de campos
  },
  message: "Producto creado exitosamente"
}
```

### Crear Venta
```typescript
// POST /api/ventas
{
  numeroVenta: "V-001",
  clienteId: 1,
  clienteNombre: "Juan Pérez",
  items: [
    {
      productoId: 1,
      productoNombre: "Laptop HP",
      cantidad: 2,
      precio: 1200.00,
      subtotal: 2400.00
    }
  ],
  subtotal: 2400.00,
  iva: 504.00,
  total: 2904.00,
  formaPago: "efectivo",
  estado: "completada",
  fecha: "2024-01-15"
}
```

## 🔒 Configuración de CORS

El backend debe configurar CORS para permitir las peticiones del frontend:

```javascript
// NestJS
app.enableCors({
  origin: ['http://localhost:4200'], // URL del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});
```

## 🔐 Autenticación

### Headers de Autorización
```typescript
// Para endpoints protegidos
headers: {
  'Authorization': 'Bearer ' + token,
  'Content-Type': 'application/json'
}
```

### Interceptor de Autenticación
El frontend incluye un interceptor que automáticamente agrega el token a las peticiones:

```typescript
// src/app/@core/interceptors/auth.interceptor.ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
```

## 🚀 Implementación del Backend

### Estructura Recomendada (NestJS)
```
src/
├── modules/
│   ├── productos/
│   │   ├── productos.controller.ts
│   │   ├── productos.service.ts
│   │   ├── productos.module.ts
│   │   └── dto/
│   ├── clientes/
│   ├── ventas/
│   ├── facturas/
│   └── inventarios/
├── common/
│   ├── dto/
│   ├── interfaces/
│   └── guards/
└── main.ts
```

### Ejemplo de Controller (Productos)
```typescript
@Controller('productos')
export class ProductosController {
  constructor(private productosService: ProductosService) {}

  @Get()
  async findAll(@Query() query: any) {
    const { page = 1, limit = 10, search } = query;
    return this.productosService.findAll(page, limit, search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productosService.findOne(+id);
  }

  @Post()
  async create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productosService.remove(+id);
  }
}
```

## 📋 Checklist para el Backend

- [ ] Configurar CORS
- [ ] Implementar todos los endpoints listados
- [ ] Usar el patrón de respuesta especificado
- [ ] Implementar paginación en todos los listados
- [ ] Validar datos de entrada
- [ ] Manejar errores apropiadamente
- [ ] Implementar autenticación JWT
- [ ] Configurar base de datos
- [ ] Implementar generación de PDFs
- [ ] Configurar envío de emails
- [ ] Implementar logs de actividad
- [ ] Configurar variables de entorno

## 🔧 Configuración de Variables de Entorno

```env
# .env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/sistema_ventas
JWT_SECRET=tu_jwt_secret_super_seguro
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_password
```

## 📞 Soporte

Para cualquier duda sobre la implementación del frontend o la integración con el backend, revisar:

1. Los servicios en `src/app/@core/services/`
2. Las interfaces de datos en cada servicio
3. Los ejemplos de uso en esta documentación
4. La configuración en `environment.ts`

¡El frontend está listo para conectarse con tu backend NestJS! 🚀
