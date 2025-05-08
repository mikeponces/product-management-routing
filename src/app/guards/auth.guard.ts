import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      // Check if route requires specific role
      const requiredRole = route.data['requiredRole'];
      if (requiredRole && !this.authService.hasRole(requiredRole)) {
        // User doesn't have required role
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
    // Store the attempted URL for redirecting
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
