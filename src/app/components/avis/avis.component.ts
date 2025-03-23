import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any; // Import jQuery

interface Avis {
  note: number;
  prenom: string;
  nom: string;
  date: string;
  commentaire: string;
}

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent implements OnInit, AfterViewInit {
  avisList: Avis[] = [];
  nouvelAvis: Avis = { note: 5, prenom: '', nom: '', date: this.getTodayDate(), commentaire: '' };
  badgeMessage: string = '';
  showBadge: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.loadAvis();
  }

  ngAfterViewInit(): void {
    // Initialiser le Datepicker
    $('.datepicker').datepicker({
      format: 'dd-mm-yyyy',
      todayHighlight: true,
      autoclose: true
    }).on('changeDate', (e: any) => {
      this.nouvelAvis.date = e.format(); // Mettre à jour la date sélectionnée
    });
  }

  loadAvis(): void {
    const storedAvis = localStorage.getItem('avis');
    this.avisList = storedAvis ? JSON.parse(storedAvis) : [];
  }

  saveAvis(): void {
    localStorage.setItem('avis', JSON.stringify(this.avisList));
  }

  ajouterAvis(event: Event): void {
    event.preventDefault();
    
    if (!this.nouvelAvis.prenom || !this.nouvelAvis.nom || !this.nouvelAvis.commentaire || !this.nouvelAvis.date) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    this.avisList.unshift({ ...this.nouvelAvis });
    this.saveAvis();
    
    this.badgeMessage = `Merci ${this.nouvelAvis.prenom} ! Note: ${this.nouvelAvis.note}/5`;
    this.showBadge = true;
    setTimeout(() => this.showBadge = false, 3000);

    this.nouvelAvis = { note: 5, prenom: '', nom: '', date: this.getTodayDate(), commentaire: '' };
  }

  supprimerAvis(index: number): void {
    this.avisList.splice(index, 1);
    this.saveAvis();
  }

  getStars(note: number): string {
    return '⭐'.repeat(note);
  }

  getTodayDate(): string {
    return new Date().toLocaleDateString('fr-FR');
  }
}
