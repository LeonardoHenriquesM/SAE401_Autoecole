import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css']
})
export class RdvComponent {
      
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

  days = [
    { date: new Date('2025-03-01') },
    { date: new Date('2025-03-02') },
    { date: new Date('2025-03-03') },
    { date: new Date('2025-03-04') },
    { date: new Date('2025-03-05') },
    { date: new Date('2025-03-06') },
    { date: new Date('2025-03-07') },
    { date: new Date('2025-03-08') },
    { date: new Date('2025-03-09') },
    { date: new Date('2025-03-10') },
    { date: new Date('2025-03-11') },
    { date: new Date('2025-03-12') },
    { date: new Date('2025-03-13') },
    { date: new Date('2025-03-14') },
    { date: new Date('2025-03-15') },
    { date: new Date('2025-03-16') },
    { date: new Date('2025-03-17') },
    { date: new Date('2025-03-18') },
    { date: new Date('2025-03-19') },
    { date: new Date('2025-03-20') },
    { date: new Date('2025-03-21') },
    { date: new Date('2025-03-22') },
    { date: new Date('2025-03-23') },
    { date: new Date('2025-03-24') },
    { date: new Date('2025-03-25') },
  ];

  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  hours = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  selectDay(day: any) {
    this.selectedDate = day.date;
    this.selectedTime = null; // reset time selection when a new day is selected
  }

  selectTime(hour: string) {
    this.selectedTime = hour;
  }

  confirmRdv() {
    if (this.selectedDate && this.selectedTime) {
      alert(`Votre rendez-vous pour le ${this.selectedDate.toLocaleDateString()} à ${this.selectedTime} est confirmé.`);
    } else {
      alert('Veuillez sélectionner une date et une heure.');
    }
  }

  isSelected(day: any) {
    return this.selectedDate && this.selectedDate.getDate() === day.date.getDate();
  }
  
}
