import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '../../services/products.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { id: 0, name: '', price: 0, description: '' };
  showAddForm = false;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addProduct(): void {
    if (this.newProduct.name && this.newProduct.price > 0) {
      this.productsService.addProduct(this.newProduct).subscribe(() => {
        this.loadProducts();
        this.resetNewProduct();
        this.showAddForm = false;
      });
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  resetNewProduct(): void {
    this.newProduct = { id: 0, name: '', price: 0, description: '' };
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
