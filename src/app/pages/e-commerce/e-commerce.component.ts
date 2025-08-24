import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@nebular/theme';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NbCardModule,
  ],
})
export class ECommerceComponent {
}
