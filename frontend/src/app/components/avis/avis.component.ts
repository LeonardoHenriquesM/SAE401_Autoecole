import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
  
  //Déclaration des varirables pour l'authentification
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
