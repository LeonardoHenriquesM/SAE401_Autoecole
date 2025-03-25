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
  
    this.http.post(this.apiUrl, this.loginData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true, 
      responseType: 'text'
    }).subscribe(
      (responseText) => {
        console.log('Réponse brute :', responseText);
        try {
          const response = JSON.parse(responseText);
          console.log('Réponse analysée :', response);
          
          if (response.message && response.message.includes("Connexion réussie")) {
            if (response.type === 'admin') {
              this.router.navigate(['/dashboard']); // Redirection admin
            } else if (response.type === 'eleve') {
              this.router.navigate([`historique/${response.id_user}`]); // Redirection élève avec son ID
            } else {
              console.error('Rôle inconnu:', response.type);
              alert('Rôle utilisateur non reconnu');
            }
          } else {
            alert('Échec de connexion : ' + response.message);
          }
  
        } catch (e) {
          console.error('Erreur lors du parsing JSON', e);
          alert('Erreur interne, veuillez réessayer.');
        }
      },
      error => {
        console.error('Erreur HTTP:', error);
        alert('Erreur de connexion');
      }
    );    
  }    
}
