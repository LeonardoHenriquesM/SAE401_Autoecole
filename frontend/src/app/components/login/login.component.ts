import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { id_user: '', password: '' };
  apiUrl = 'http://localhost:8000/backend/api/login'; //URL de l'API

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log('Tentative de connexion avec les données :', this.loginData);
    this.http.post<any>(this.apiUrl, this.loginData).subscribe(
      response => {
        console.log('Réponse reçue :', response);
        if (response.success) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        } else {
          alert('Identifiant ou mot de passe incorrect.');
        }
      },
      error => {
        console.error('Erreur de connexion', error);
        alert('Erreur de connexion au serveur. Vérifiez la console pour plus de détails.');
      }
    );
  }  
}