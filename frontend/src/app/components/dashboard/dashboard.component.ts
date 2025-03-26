import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  candidats: any[] = [];
  candidatsFiltres: any[] = [];
  searchQuery: string = '';
  nouveauCandidat: any = {};
  estAuthentifie: boolean = false;
  estAdmin: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.chargerCandidats();  // Charge les candidats au démarrage
    this.estAuthentifie = this.authService.estAuthentifie();
    this.estAdmin = this.authService.estAdmin();

    // Si l'utilisateur n'est pas authentifié, redirige vers la page de login
    if (!this.estAuthentifie) {
      this.router.navigate(['/login']);
    }

    // Si l'utilisateur n'est pas admin, redirige vers une autre page ou affiche un message d'erreur
    if (this.estAuthentifie && !this.estAdmin) {
      this.router.navigate(['/login']);
    }
  }

  // Méthode pour charger les candidats depuis l'API
  chargerCandidats(): void {
    this.http.get<any[]>('https://api401.alwaysdata.net/backend/api/src/candidats.php?action=getCandidats')
      .pipe(
        catchError(this.handleError)  // Gère les erreurs
      )
      .subscribe(
        (data) => {
          this.candidats = data;
          this.candidatsFiltres = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des candidats:', error);
        }
      );
  }

  // Méthode pour ajouter un candidat
  ajouterCandidat(): void {
    this.http.post('https://api401.alwaysdata.net/backend/api/src/candidats.php?action=ajouterCandidat', this.nouveauCandidat)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(
        (response) => {
          console.log('Candidat ajouté:', response);
          this.chargerCandidats();  // Recharge les candidats après l'ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du candidat:', error);
        }
      );
  }

  filtrerCandidats(): void {
    // Si la requête de recherche est vide, on réinitialise le tableau filtré
    if (this.searchQuery.trim() === '') {
      this.candidatsFiltres = [...this.candidats]; // Remet tous les candidats
    } else {
      // Filtrage des candidats par nom, prénom ou email
      this.candidatsFiltres = this.candidats.filter(candidat =>
        candidat.Nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        candidat.Prenom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        candidat.Email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
  

  supprimerCandidat(id_user: number): void {
    this.http.post(`https://api401.alwaysdata.net/backend/api/src/candidats.php?action=supprimerCandidat`, { id_user: id_user })
      .pipe(catchError((error) => {
        console.error('Erreur lors de la suppression du candidat:', error);
        return throwError(error);
      }))
      .subscribe(
        (response) => {
          console.log('Réponse de la suppression du candidat:', response);
          this.chargerCandidats(); // Recharge les candidats après la suppression
        },
        (error) => {
          console.error('Code d\'erreur:', error.status);
          console.error('Message d\'erreur:', error.message);
        }
      );
  }
  
  // Gestion des erreurs
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Une erreur est survenue!';
    if (error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  deconnecter() {
    // Appel méthode pour effacer les données utilisateur + redirection
    this.authService.seDeconnecter();
    this.router.navigate(['login']);
  }
}
