import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FirebaseInterceptor } from './interceptors/firebase.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LibroListaComponent } from './components/libro-lista/libro-lista.component';
import { LibroDetalleComponent } from './components/libro-detalle/libro-detalle.component';
import { LibroFormComponent } from './components/libro-form/libro-form.component';
import { FirebaseModule } from './firebase.module';
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ManejoUserComponent } from './components/manejo-user/manejo-user.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    LibroListaComponent,
    LibroDetalleComponent,
    LibroFormComponent,
    ManejoUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FirebaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    CommonModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: FirebaseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}