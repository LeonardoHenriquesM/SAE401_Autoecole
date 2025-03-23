import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  searchQuery: string = '';
  candidats = [
    { nom: 'Thibault', prenom: 'Mirador', email: 'thibault@email.com' },
    { nom: 'Alice', prenom: 'Dupont', email: 'alice@email.com' },
    { nom: 'Jean', prenom: 'Martin', email: 'jean@email.com' }
  ];
  candidatsFiltres = [...this.candidats];

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

  ajouterCandidat() {
    if (
      this.nouveauCandidat.nom &&
      this.nouveauCandidat.prenom &&
      this.nouveauCandidat.email
    ) {
      this.candidats.push({ ...this.nouveauCandidat });
      this.candidatsFiltres = [...this.candidats];
      this.nouveauCandidat = {
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
    this.candidatsFiltres = this.candidats.filter(c =>
      (c.nom + ' ' + c.prenom).toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
