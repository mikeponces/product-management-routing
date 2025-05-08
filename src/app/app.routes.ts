import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { 
        path: 'products/:id', 
        component: ProductDetailComponent, 
        canDeactivate: [UnsavedChangesGuard] },
    {
        path: 'admin', 
        component: AdminComponent, 
        canActivate: [AuthGuard],
        data: { requiredRole: 'admin' }
    },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent }
];
