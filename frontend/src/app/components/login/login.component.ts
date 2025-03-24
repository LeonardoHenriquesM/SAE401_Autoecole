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
  apiUrl = 'https://api401.alwaysdata.net/backend/api/src/login/login.php';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log('Tentative de connexion avec les données :', this.loginData);
    const headers = { 'Content-Type': 'application/json' };
  
    this.http.post(this.apiUrl, this.loginData, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    }).subscribe(
      (responseText) => {
        try {
          const response = JSON.parse(responseText);
          console.log('Réponse reçue :', response);

          // Vérification si l'utilisateur est valide
          if (response.id_user != null) {
            localStorage.setItem('id_user', response.id_user);

            // Vérification du type d'utilisateur
            if (response.type === 'admin') {
              this.router.navigate(['/dashboard']); // Redirection vers le tableau de bord admin
            } else if (response.type === 'eleve') {
              this.router.navigate(['/historique']); // Redirection vers le tableau de bord élève
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