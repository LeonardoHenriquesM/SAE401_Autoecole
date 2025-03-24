import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { prenom: '', password: '' };  // Changement de id_user en prenom
  apiUrl = 'https://api401.alwaysdata.net/backend/api/src/login/login.php';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log('Tentative de connexion avec les données :', this.loginData);

    this.http.post(this.apiUrl, this.loginData, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    }).subscribe(
      (responseText) => {
        try {
          const response = JSON.parse(responseText);
          console.log('Réponse reçue :', response);

          if (response.id_user != null) {
            localStorage.setItem('id_user', response.id_user);
            localStorage.setItem('prenom', response.prenom);  // Stocker le prénom

            // Redirection selon le type d'utilisateur
            if (response.type === 'admin') {
              this.router.navigate(['/dashboard']);
            } else if (response.type === 'eleve') {
              this.router.navigate(['/historique']);
            }
          } else {
            alert('Identifiants incorrects');
          }
        } catch (e) {
          console.error('Réponse non valide JSON', responseText);
          alert('Erreur serveur (réponse invalide)');
        }
      },
      error => {
        console.error('Erreur de connexion', error);
        alert('Identifiants incorrects');
      }
    );
  }
}
