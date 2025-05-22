import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';


export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;
  
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // Obtener el estado de autenticación del usuario
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        return user
        ? this.afs.doc<User>(`users/${user.uid}`).valueChanges().pipe(
            map(userData => userData as User | null)
          ) 
        : of(null);
    })
  ) as Observable<User | null>;
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/libros']);
    } catch (error) {
      console.error('Error durante el login', error);
      throw error;
    }
  }

  async googleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      this.updateUserData(credential.user as any);
      this.router.navigate(['/libros']);
    } catch (error) {
      console.error('Error durante el login con Google', error);
      throw error;
    }
  }

  async register(email: string, password: string, displayName: string): Promise<void> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await credential.user?.updateProfile({ displayName });
      this.updateUserData({ ...credential.user, displayName } as any);
      this.router.navigate(['/libros']);
    } catch (error) {
      console.error('Error durante el registro', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  private updateUserData(user: User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Usuario',
      photoURL: user.photoURL || 'assets/default-user.png',
      emailVerified: user.emailVerified,
      role: user.role || 'user'
    };

    return userRef.set(data, { merge: true });
  }

  // Método para obtener el token de autenticación para llamadas a la API
  async getAuthToken(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    if (user) {
      return user.getIdToken();
    }
    return null;
  }
}