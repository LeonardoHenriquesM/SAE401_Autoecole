import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { prenom: '', password: '' };
  apiUrl = 'https://api401.alwaysdata.net/backend/api/src/login/login.php';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    console.log('Tentative de connexion avec les données :', this.loginData);
    
    this.http.post<any>(this.apiUrl, this.loginData, {
      responseType: 'json'
    }).pipe(
      catchError(error => {
        console.error('Erreur HTTP:', error);
        alert('Erreur de connexion');
        return throwError(error);
      })
    ).subscribe(
      (response: any) => {
        console.log('Réponse brute :', response);
        if (response && response.message && response.message.includes("Connexion réussie")) {
          localStorage.setItem('id_user', response.id_user);
          localStorage.setItem('user_type', response.type);
          
          // Redirection
          if (response.type === 'admin') {
            this.router.navigate(['/dashboard']);
            console.log(localStorage.setItem('id_user', response.id_user));
          } else if (response.type === 'eleve') {
            console.log(localStorage.setItem('id_user', response.id_user));
            this.router.navigate(['/historique']);
          }
        } else {
          alert('Échec de connexion : ' + response.message);
        }
      }
    );
  }
}