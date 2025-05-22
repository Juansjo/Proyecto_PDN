import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from '@angular/fire/auth';
import { signal, computed } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  mostrarCorreo() {
    alert("Correo actual: " + this.email());
  }

  email = signal<string>('');
  password= signal<string>('');
  showPassword: boolean = false;

 @ViewChild('passwordField') passwordField!: ElementRef<HTMLInputElement>;

  togglePasswordVisibility(): void {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) { 
      this.showPassword = !this.showPassword;
      passwordField.type = this.showPassword ? 'text' : 'password';
  }
  }

  constructor(private router: Router,private auth: Auth) {}
 
  

  async loginWithFacebook() {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem('firebaseToken', token);
      this.router.navigate(['/home']);
    } catch (error) {
      alert("Error: " + (error as Error).message);
    }
  }

  


 async Login() {
  console.log("Correo capturado:", this.email);
  try {
    const email = this.email   
    
    const password = this.password
   
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      this.email(),
      this.password()
    );

    const token = await userCredential.user.getIdToken();
    localStorage.setItem('firebaseToken', token); // Guarda el token
    this.router.navigateByUrl('/home');
  } catch (error: any) {
    if (error instanceof Error) {
      alert("Error de autenticación: " + error.message);
    } else {
      alert("Error desconocido");
    }
    console.error("Error detallado de Firebase:", (error as any).code);
  alert("Error: " + (error as Error).message);
  }
}
 
 
 
  /*
    console.log(this.email);
    console.log(this.password);
 
    let bodyData = {
      email: this.email,
      password: this.password,
    };
 
        this.http.post("http://localhost:8085/api/v1/employee/login", bodyData).subscribe(  (resultData: any) => {
        console.log(resultData);
 
        if (resultData.message == "Email not exits")
        {
      
          alert("Email not exits");
    
 
        }
        else if(resultData.message == "Login Success")
    
         {
          this.router.navigateByUrl('/home');
        }
        else
        {
          alert("Incorrect Email and Password not match");
        }

      });
    }
*/
}