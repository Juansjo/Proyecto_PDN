import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as sha256 from 'js-sha256';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  employeename = '';
  email = '';
  password = '';
  showPassword = false;

  constructor(private afAuth: AngularFireAuth, 
  private router: Router, private firestore: AngularFirestore) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isPasswordValid(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecial
    );
  }

  async save() {
    
    if (!this.isPasswordValid(this.password)) {
      alert('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos');
      return;
    }

    try {
      // Crear usuario en Firebase Auth
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      
      if (userCredential.user) {
        // Hashear la contraseña con SHA-256 y un salt único
        const salt = this.generateSalt();
        const hashedPassword = sha256.sha256(this.password + salt);
        
        // Crear objeto de datos de usuario
        const userData = {
          uid: userCredential.user.uid,
          email: this.email,
          displayName: this.employeename,
          createdAt: new Date(),
          role: 'employee',
          passwordHash: hashedPassword,
          passwordSalt: salt,
          provider: 'email/password'
        };
        
        // Guardar en Firestore
        await this.firestore.collection('users').doc(userCredential.user.uid).set(userData);
        
        // Actualizar perfil en Auth
        await userCredential.user.updateProfile({
          displayName: this.employeename
        });
        
        alert("Registro exitoso!");
        // Redirigir al login o home
      }
    } catch (error) {
      console.error("Error en registro:", error);
      if (error instanceof Error) {
        alert("Error de registro: " + error.message);
      } else {
        alert("Error desconocido");
      }
    }
  }

  // Generar un salt aleatorio
  private generateSalt(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}