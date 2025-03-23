import { Component } from '@angular/core';

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

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfil(): void {
    this.isEditing = false;
    console.log('Profil sauvegardé', this.profil);
    // Ici, on pourrait ajouter une requête HTTP pour sauvegarder les modifications dans une base de données
  }
}