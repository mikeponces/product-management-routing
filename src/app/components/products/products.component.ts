import { Component } from '@angular/core';
import { Product, ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }
}
