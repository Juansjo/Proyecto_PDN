import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  imports: [],
  providers: [ 
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())

],
bootstrap: [AppComponent]
})
export class FirebaseModule {}