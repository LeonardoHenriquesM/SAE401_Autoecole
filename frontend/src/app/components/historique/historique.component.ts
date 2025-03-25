import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  apiUrl = 'https://api401.alwaysdata.net/backend/api/src/historique.php';
  id_user = localStorage.getItem('id_user');
  messageErreur: string | null = null;
  
  statistiques = {
    tauxReussite: 0,
    testsPasses: 0,
    scoreMoyen: 0,
    scoreTotal: 0,
    peutPasserExamen: false,
    dateExamen: ''
  };

  testsRecents: any[] = [];
  selectedTest: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.chargerHistorique();
  }

  chargerHistorique() {
    if (!this.id_user) {
      this.messageErreur = "L'ID utilisateur est manquant.";
      return; // Empêcher la requête si l'ID utilisateur est incorrect
    }
    

    this.http.get(`${this.apiUrl}?id_user=${this.id_user}`, {
      withCredentials: true  // Très important pour envoyer le cookie PHP
    }).subscribe(
      (data: any) => {
        if (data && data.message) {
          this.messageErreur = data.message;
          console.error("Erreur depuis le serveur :", data.message);
        } else {
          this.statistiques = data.stats;
          this.testsRecents = data.tests;
          this.generateChart();
        }
      },
      (error) => {
        console.error("Erreur HTTP:", error);
        this.messageErreur = 'Une erreur s\'est produite lors du chargement des données.';
      }
    );
        
  }

  generateChart() {
    new Chart('graph1', {
      type: 'line',
      data: {
        labels: this.testsRecents.map(test => test.date_test),
        datasets: [{
          label: 'Score sur 40',
          data: this.testsRecents.map(test => test.score),
          borderColor: 'blue',
          borderWidth: 2,
          fill: false
        }]
      }
    });
  }

  afficherDetails(testItem: any) {
    this.selectedTest = testItem;
  }

  definirDateExamen(): string {
    let today = new Date();
    let examDate = new Date();
    examDate.setDate(today.getDate() + 7);
    return examDate.toLocaleDateString();
  }

  allerPrendreRdv() {
    this.router.navigate(['/rdv']);
  }
}