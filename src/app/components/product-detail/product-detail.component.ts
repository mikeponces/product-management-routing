import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate } from '../../guards/unsaved-changes.guard';
import { Product, ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit, CanComponentDeactivate {
  product?: Product;
  editedProduct?: Product;
  isEditing = false;
  hasUnsavedChanges = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    // Get the product ID from the route parameters
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadProduct(id);
    });
  }

  loadProduct(id: number): void {
    this.productsService.getProduct(id).subscribe(product => {
      if (product) {
        this.product = product;
        this.editedProduct = { ...product }; // Create a copy for editing
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }

  startEditing(): void {
    this.isEditing = true;
    this.editedProduct = { ...this.product! };
  }

  saveChanges(): void {
    if (this.editedProduct) {
      this.productsService.updateProduct(this.editedProduct).subscribe(updatedProduct => {
        this.product = updatedProduct;
        this.isEditing = false;
        this.hasUnsavedChanges = false;
      });
    }
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.hasUnsavedChanges = false;
  }

  onFieldChange(): void {
    this.hasUnsavedChanges = true;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isEditing && this.hasUnsavedChanges) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }
}
