import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { prenom: '', password: '' };
  apiUrl = 'https://api401.alwaysdata.net/backend/api/src/login/login.php';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log('Tentative de connexion avec les données :', this.loginData);
    const headers = { 'Content-Type': 'application/json' };
  
    this.http.post(this.apiUrl, this.loginData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true, 
      responseType: 'text'
    }).subscribe(
      (responseText) => {
        console.log('Réponse brute :', responseText); // Affichez la réponse brute ici
        try {
          const response = JSON.parse(responseText);
          console.log('Réponse analysée :', response);
          // Traitement de la réponse
        } catch (e) {
          console.error('Erreur lors du parsing JSON', e);
        }
      },
      error => {
        console.error('Erreur HTTP:', error);
        alert('Erreur de connexion');
      }
    );    
  }  
}