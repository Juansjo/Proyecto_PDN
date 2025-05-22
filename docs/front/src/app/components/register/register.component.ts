import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  employeename: string ="";
  email: string ="";
  password: string ="";


  constructor(private http: HttpClient, private auth: Auth )
  {

  }
  async save()
  {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );
      
      // Opcional: Guardar datos adicionales en tu backend
      alert("Registro exitoso!");
    } catch (error) {
      if (error instanceof Error) {
        alert("Error de registro: " + error.message);
      } else {
        alert("Error desconocido");
      }
    }
  /*
    let bodyData = {
      "employeename" : this.employeename,
      "email" : this.email,
      "password" : this.password
    };
    this.http.post("http://localhost:8085/api/v1/employee/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully");

    });
  }
*/
  }
}