import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
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
  id_user: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Récupérer l'ID utilisateur depuis le localStorage
    this.id_user = localStorage.getItem('id_user');
    if (!this.id_user) {
      // Si l'ID utilisateur n'est pas trouvé, rediriger vers la page de login
      this.router.navigate(['/login']);
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