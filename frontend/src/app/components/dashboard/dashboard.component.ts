import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  menuOpen: boolean = false;
  searchQuery: string = '';

  // Initialisation des données pour éviter les erreurs
  candidats: any[] = [];
  candidatsFiltres: any[] = [];

  nouveauCandidat = {
    nom: '',
    prenom: '',
    email: '',
    dateNaissance: '',
    telephone: '',
    adresse: '',
    numeroDossier: '',
    dateInscription: '',
    typePermis: ''
  };

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  ajouterCandidat() {
    if (this.nouveauCandidat.nom && this.nouveauCandidat.prenom) {
      this.candidats.push({ ...this.nouveauCandidat });
      this.candidatsFiltres = [...this.candidats];
      this.nouveauCandidat = {  // Réinitialisation
        nom: '',
        prenom: '',
        email: '',
        dateNaissance: '',
        telephone: '',
        adresse: '',
        numeroDossier: '',
        dateInscription: '',
        typePermis: ''
      };
    }
  }

  filtrerCandidats() {
    this.candidatsFiltres = this.candidats.filter(candidat =>
      candidat.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      candidat.prenom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      candidat.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
