# Routing & Navigation
## How Routing Works
- Single Page Application (SPA)
- Configure a route for each component
- Uses `RoutingModule`
    - Need to invoke `RoutineModule.forRoot([])`
- Tie a route to each option
- Activate the route based on user action
- Activating a route displays the component's view
- `<router-outlet>` is where the component will be renedered

```html
<pm-root ng-version="12.0.2">
  <nav class="navbar navbar-expand navbar-light bg-light">...</nav>
  <router-outlet></router-outlet>

  <ng-component _nghost-jvs-c47>
    <div _ngcontent-jvs-c47 class="card">
      <div _ngcontent-jvs-c47 class="card-header"> Product List </div>
      <div _ngcontent-jvs-c47 class="card-body">
        <div _ngcontent-jvs-c47 class="row"></div>
        <div _ngcontent-jvs-c47 class="row"></div>
        <div _ngcontent-jvs-c47 class="table-responsive"></div>
      </div>
    </div>
  </ng-component>
</pm-root>
```

`<a routerLink="/products">Product List</a>`

`this.router.navigate(['/products']);`

`{ path: 'products', component: ProductListComponent }`

## Configure Routes
### app.routes
Or under `RoutingModule.forRoot([])`
```ts
[
    { path: 'products', component: ProductListComponent },
    { path: 'products/id', component: ProductDetailComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent } // captures any undefined routes
]
```
### Navigating the application routes
- Menu option, link, image or button
- Typing the url
- The browser's back or forward buttons

## Tying Routes to Actions

```html
// app.component.ts
@Component({
  selector: 'pm-root',
  template: `
    <ul class='nav navbar-nav'>
      <li><a [routerLink]="['/welcome']">Home</a></li>
      <li><a [routerLink]="['/products']">Product List</a></li>
    </ul>
    <router-outlet></router-outlet>
  `,
})
```

```ts
{ path: 'products', component: ProductListComponent },
{ path: 'welcome', component: WelcomeComponent }
```

### `app.routing.module`
```ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

# Routing and Navigation Techniques
## Passing parameters to routes
- Pass the parameter/s in the `routerLink`
- Use `ActivatedRoute` 
```html
<a routerLink="['/products', product.id]">View Details</a>
```
```ts
constructor(private route: ActivatedRoute)

this.route.snapshot.paramMap.get('id');
```

## Protecting routes with Guards
- Limit access to routes
- Restrict access to only certain users
- Require confirmation before navigating away
- `CanActivate`: guard navigation **to** a route
- `CanDeactivate`: guard navigation **from** a route
- `Resolve`: pre-fetch data before activating a route
- `CanLoad`: prevent asynchronous routing

```ts
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```

```ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

```

