import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { NgModule } from "@angular/core";
import { LibroListaComponent } from "./components/libro-lista/libro-lista.component";
import { LibroFormComponent } from "./components/libro-form/libro-form.component";
import { LibroDetalleComponent } from "./components/libro-detalle/libro-detalle.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { 
    path: '',
    redirectTo: '/login',  // Redirige a login por defecto
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: LibroListaComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { 
    path: 'libros', 
    component: LibroListaComponent,
    //canActivate: [AuthGuard]
  },
  { 
    path: 'libros/nuevo', 
    component: LibroFormComponent,
    //canActivate: [AuthGuard]
  },
  { 
    path: 'libros/editar/:id', 
    component: LibroFormComponent,
    //canActivate: [AuthGuard]
  },
  { 
    path: 'libros/:id', 
    component: LibroDetalleComponent,
    //canActivate: [AuthGuard]
  },
 
  { 
    path: '**', 
    redirectTo: '/libros' 
  }
];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
