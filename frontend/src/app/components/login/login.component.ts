import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
<<<<<<< HEAD
  loginData = { id_user: '', password: '' };
  apiUrl = 'http://localhost:8000/backend/api/login'; //URL de l'API
=======
  loginData = { prenom: '', password: '' };
  apiUrl = 'https://api401.alwaysdata.net/backend/api/src/login/login.php';
>>>>>>> 664ab07aa30101f075157bc41e84e494eacbf0b5

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log('Tentative de connexion avec les données :', this.loginData);
<<<<<<< HEAD
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
=======
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
>>>>>>> 664ab07aa30101f075157bc41e84e494eacbf0b5
