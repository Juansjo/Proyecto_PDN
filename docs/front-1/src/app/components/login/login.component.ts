import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import firebase from 'firebase/compat/app'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as sha256 from 'js-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;

  @ViewChild('passwordField') passwordField!: ElementRef<HTMLInputElement>;

  private isValidEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  }

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordField?.nativeElement) {
      this.passwordField.nativeElement.type = this.showPassword ? 'text' : 'password';
    }
  }

  // Generar un salt aleatorio
  private generateSalt(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  async loginWithGoogle() {
    
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      
      provider.addScope('email');
      
      const credential = await this.afAuth.signInWithPopup(provider);
      const user = credential.user;
      
      if (!user) throw new Error("No se pudo obtener el usuario");
      
      const token = await user.getIdToken();
      localStorage.setItem('firebaseToken', token);
  
      const email = user.email || user.providerData[0]?.email;
      if (!email) throw new Error("No se pudo obtener el email");

      const userData = {
        uid: user.uid,
        email: email,
        displayName: user.displayName || "Usuario Google",
        photoURL: user.photoURL,
        lastLogin: new Date(),
        provider: 'google',
        role: 'empleado',
        createdAt: new Date()
      };
      
      // Usar set con merge para no sobrescribir datos existentes
      await this.firestore.collection('users').doc(user.uid).set(userData, { merge: true });
      
      this.router.navigate(['/home']);
    } catch (error) {
      console.error("Error en login con Google:", error);
      alert("Error: " + (error as Error).message);
    }
  }

  async loginWithFacebook() {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('email'); // Solicitar email
      
      const credential = await this.afAuth.signInWithPopup(provider);
      const user = credential.user;
      
      if (!user) throw new Error("No se pudo obtener el usuario");
      
      const token = await user.getIdToken();
      localStorage.setItem('firebaseToken', token);
  
      const email = user.email || user.providerData[0]?.email;
      if (!email) throw new Error("No se pudo obtener el email");
  
      const userData = {
        uid: user.uid,
        email: email,
        displayName: user.displayName || "Usuario Facebook",
        photoURL: user.photoURL,
        lastLogin: new Date(),
        provider: 'facebook',
        role: 'employee',
        createdAt: new Date()
      };
      
      await this.firestore.collection('users').doc(user.uid).set(userData, { merge: true });
      
      this.router.navigate(['/home']);
    } catch (error) {
      alert("Error: " + (error as Error).message);
    }
  }

  async loginWithGithub() {
    try {
      const provider = new firebase.auth.GithubAuthProvider();
      provider.addScope('user:email'); // Scope específico de GitHub para emails
      
      const credential = await this.afAuth.signInWithPopup(provider);
      const user = credential.user;
      
      if (!user) throw new Error("No se pudo obtener el usuario");
      
      const token = await user.getIdToken();
      localStorage.setItem('firebaseToken', token);
  
      const email = user.email || user.providerData[0]?.email;
      if (!email) {
        // GitHub requiere un paso adicional para obtener el email
        const githubEmail = await this.getGithubEmail(credential);
        if (!githubEmail) throw new Error("No se pudo obtener el email");
      }
  
      const userData = {
        uid: user.uid,
        email: email || this.getGithubEmail,
        displayName: user.displayName || "Usuario GitHub",
        photoURL: user.photoURL,
        lastLogin: new Date(),
        provider: 'github',
        role: 'employee',
        createdAt: new Date()
      };
      
      await this.firestore.collection('users').doc(user.uid).set(userData, { merge: true });
      
      this.router.navigate(['/home']);
    } catch (error) {
      alert("Error: " + (error as Error).message);
    }
  }
  
  // Método adicional para GitHub
  private async getGithubEmail(credential: firebase.auth.UserCredential): Promise<string | null> {
    try {
      const accessToken = (credential.credential as any).accessToken;
      if (!accessToken) return null;
      
      const response = await fetch('https://api.github.com/user/emails', {
        headers: { Authorization: `token ${accessToken}` }
      });
      
      const emails = await response.json();
      const primaryEmail = emails.find((email: any) => email.primary);
      
      return primaryEmail ? primaryEmail.email : emails[0]?.email || null;
    } catch (error) {
      console.error("Error obteniendo email de GitHub:", error);
      return null;
    }
  }

  async login() {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      
      const token = await credential.user?.getIdToken();
      if (token && credential.user) {
        localStorage.setItem('firebaseToken', token);

        // Actualizar último inicio de sesión
        await this.firestore.collection('users').doc(credential.user.uid).update({
          lastLogin: new Date()
        });

        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      console.error("Error detallado de Firebase:", error.code);
      alert("Error: " + (error.message || "Credenciales inválidas"));
    }
  }

  async resetPassword(event: Event) {
    event.preventDefault();
    
    let email = this.email.trim();
    if (!email) {
      const input = prompt('Por favor ingresa tu correo electrónico registrado:');
      if (!input) return;
      email = input.trim();
    }

    if (!this.isValidEmail(email)) {
      alert('Por favor ingrese un email válido');
      return;
    }

    try {
      await this.afAuth.sendPasswordResetEmail(email);
      alert(`Se ha enviado un enlace de restablecimiento a ${email}`);
    } catch (error) {
      alert("Error: " + (error as Error).message);
    }
  }
}