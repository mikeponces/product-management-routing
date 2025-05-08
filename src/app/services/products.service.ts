import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 1299.99, description: 'High-performance laptop with SSD' },
    { id: 2, name: 'Smartphone', price: 799.99, description: 'Latest model with advanced camera' },
    { id: 3, name: 'Tablet', price: 499.99, description: 'Lightweight with long battery life' },
    { id: 4, name: 'Headphones', price: 199.99, description: 'Noise-cancelling wireless headphones' },
    { id: 5, name: 'Monitor', price: 349.99, description: '27-inch 4K display' }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProduct(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  addProduct(product: Product): Observable<Product> {
    // Generate a new ID
    const newId = Math.max(...this.products.map(p => p.id)) + 1;
    const newProduct = { ...product, id: newId };
    this.products.push(newProduct);
    return of(newProduct);
  }

  updateProduct(product: Product): Observable<Product> {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
    }
    return of(product);
  }

  deleteProduct(id: number): Observable<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
