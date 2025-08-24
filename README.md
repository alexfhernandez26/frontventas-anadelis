# Sistema de Ventas e Inventario

Sistema completo de gestión de ventas e inventario desarrollado con Angular y Nebular (ngx-admin), preparado para integrarse con un backend NestJS.

## 🚀 Características

### 📊 Dashboard
- Panel principal con métricas de ventas
- Gráficos y estadísticas en tiempo real
- Resumen de actividades diarias

### 🛒 Gestión de Ventas
- Creación de nuevas ventas
- Selección de clientes y productos
- Cálculo automático de totales con descuentos
- Historial de ventas realizadas
- Gestión de estados de venta

### 📦 Gestión de Productos
- CRUD completo de productos
- Categorización de productos
- Control de precios y códigos
- Gestión de stock disponible
- Estados de stock (En stock, Bajo, Sin stock)

### 👥 Gestión de Clientes
- Registro completo de clientes
- Información de contacto y ubicación
- Historial de compras
- Datos demográficos (edad, etc.)

### 🧾 Sistema de Facturas
- Generación de facturas profesionales
- **Generación de PDF en formato A4**
- **Compartir por WhatsApp** con mensaje personalizado
- **Envío por correo electrónico** con adjunto
- Múltiples formas de pago
- Estados de facturación

### 📋 Control de Inventario
- Gestión de stock mínimo y máximo
- Alertas de stock crítico
- Ubicaciones en almacén
- Control de proveedores
- Valoración de inventario
- Ajustes de stock en tiempo real

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 15+** - Framework principal
- **Nebular (ngx-admin)** - UI Framework y componentes
- **TypeScript** - Lenguaje de programación
- **SCSS** - Estilos y diseño
- **Angular Reactive Forms** - Formularios
- **Angular Router** - Navegación

### Backend (Preparado para)
- **NestJS** - Framework backend
- **TypeScript** - Lenguaje de programación
- **PostgreSQL/MySQL** - Base de datos
- **TypeORM** - ORM para base de datos
- **JWT** - Autenticación

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── @core/
│   │   ├── services/
│   │   │   └── pdf.service.ts          # Servicio para generación de PDFs
│   │   └── ...
│   ├── @theme/
│   │   └── ...                         # Componentes de tema Nebular
│   └── pages/
│       ├── dashboard/                  # Dashboard principal
│       ├── ventas/                     # Gestión de ventas
│       │   ├── ventas.component.ts
│       │   ├── ventas.component.html
│       │   └── ventas.component.scss
│       ├── productos/                  # Gestión de productos
│       │   ├── productos.component.ts
│       │   ├── productos.component.html
│       │   └── productos.component.scss
│       ├── clientes/                   # Gestión de clientes
│       │   ├── clientes.component.ts
│       │   ├── clientes.component.html
│       │   └── clientes.component.scss
│       ├── facturas/                   # Sistema de facturas
│       │   ├── facturas.component.ts
│       │   ├── facturas.component.html
│       │   └── facturas.component.scss
│       ├── inventarios/                # Control de inventario
│       │   ├── inventarios.component.ts
│       │   ├── inventarios.component.html
│       │   └── inventarios.component.scss
│       ├── pages-menu.ts               # Menú de navegación
│       ├── pages-routing.module.ts     # Configuración de rutas
│       └── pages.module.ts             # Módulo principal
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 16+ 
- npm o yarn
- Angular CLI

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd frontventas-anadelis
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
ng serve
```

4. **Abrir en el navegador**
```
http://localhost:4200
```

### Construcción para Producción

```bash
ng build --prod
```

## 📋 Funcionalidades Principales

### 1. Dashboard
- Métricas de ventas diarias/mensuales
- Productos más vendidos
- Clientes frecuentes
- Alertas de inventario

### 2. Ventas
- Formulario de nueva venta
- Selección de cliente y productos
- Cálculo automático de totales
- Aplicación de descuentos
- Historial de ventas

### 3. Productos
- Gestión completa de productos
- Categorización
- Control de precios
- Estados de stock
- Códigos de producto

### 4. Clientes
- Registro de información completa
- Datos de contacto
- Dirección y ubicación
- Historial de compras

### 5. Facturas
- **Generación de PDF profesional**
- **Compartir por WhatsApp**
- **Envío por email**
- Múltiples formas de pago
- Estados de facturación

### 6. Inventario
- Control de stock mínimo/máximo
- Alertas automáticas
- Ubicaciones en almacén
- Valoración de inventario
- Ajustes de stock

## 🔧 Configuración de PDF

El sistema incluye un servicio de generación de PDF que permite:

- **Formato A4** para facturas
- **Diseño profesional** con logo y datos de la empresa
- **Descarga automática** del archivo
- **Compartir por WhatsApp** con mensaje personalizado
- **Envío por email** con adjunto

### Implementación de PDF

```typescript
// Ejemplo de uso del servicio PDF
this.pdfService.generateInvoicePDF(invoiceData);
this.pdfService.shareViaWhatsApp(invoiceData);
this.pdfService.shareViaEmail(invoiceData);
```

## 🔌 Integración con Backend

El sistema está preparado para integrarse con un backend NestJS:

### Endpoints Principales
- `GET /api/ventas` - Obtener ventas
- `POST /api/ventas` - Crear venta
- `GET /api/productos` - Obtener productos
- `POST /api/productos` - Crear producto
- `GET /api/clientes` - Obtener clientes
- `POST /api/clientes` - Crear cliente
- `GET /api/facturas` - Obtener facturas
- `POST /api/facturas` - Crear factura
- `GET /api/inventarios` - Obtener inventario
- `PUT /api/inventarios/:id` - Actualizar stock

## 🎨 Personalización

### Temas
El sistema utiliza Nebular que permite:
- Cambio de temas (claro/oscuro)
- Personalización de colores
- Componentes adaptables

### Componentes
Todos los componentes son standalone y pueden ser:
- Modificados fácilmente
- Reutilizados en otras partes
- Personalizados según necesidades

## 📱 Responsive Design

El sistema es completamente responsive y funciona en:
- Desktop
- Tablet
- Mobile

## 🔒 Seguridad

- Validación de formularios
- Sanitización de datos
- Protección contra XSS
- Preparado para autenticación JWT

## 🚀 Próximas Mejoras

- [ ] Integración completa con NestJS
- [ ] Autenticación y autorización
- [ ] Reportes avanzados
- [ ] Dashboard con gráficos interactivos
- [ ] Notificaciones en tiempo real
- [ ] Backup automático de datos
- [ ] API REST completa
- [ ] Documentación de API

## 📞 Soporte

Para soporte técnico o consultas:
- Email: [tu-email@dominio.com]
- Documentación: [link-a-documentacion]

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ usando Angular y Nebular**
