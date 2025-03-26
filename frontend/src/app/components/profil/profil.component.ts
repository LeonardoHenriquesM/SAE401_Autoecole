import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  isEditing: boolean = false;
  profil = {
    prenom: 'Jean',
    nom: 'Dupont',
    email: 'jean.dupont@example.com',
    dateNaissance: '12/05/1990',
    telephone: '+33 6 12 34 56 78',
    adresse: '10 rue des Lilas, 75000 Paris',
    numeroDossier: '123456',
    dateInscription: '01/01/2024'
  };
    //Déclaration de la variable permettant l'authentification
  estAuthentifie: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}  // Constructeur incluant le service d'authentification ainsi que le routeur

  ngOnInit(): void {
    // Vérifie si l'utilisateur est authentifié
    this.estAuthentifie = this.authService.estAuthentifie();
    // + redirection vers login
    if (!this.estAuthentifie) {
      this.router.navigate(['/login']);
      alert("Vous n'êtes pas authentifié, veuillez vous connecter")
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfil(): void {
    this.isEditing = false;
    console.log('Profil sauvegardé', this.profil);
    // Ici, on pourrait ajouter une requête HTTP pour sauvegarder les modifications dans une base de données
  }
  
}