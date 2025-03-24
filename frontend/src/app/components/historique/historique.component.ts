import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  statistiques = {
    tauxReussite: 90, // Augmenté pour être éligible
    testsPasses: 6,
    scoreMoyen: 33, // Score suffisant pour l'examen
    scoreTotal: 0,
    peutPasserExamen: false,
    dateExamen: ''
  };

  testsRecents = [
    { date: '10/03', score: 36, fautes: ['Stop non respecté'] },
    { date: '08/03', score: 34, fautes: ['Priorité non respectée'] },
    { date: '06/03', score: 35, fautes: ['Oubli de clignotant'] },
    { date: '01/03', score: 30, fautes: [] },
    { date: '22/02', score: 32, fautes: [] },
    { date: '18/02', score: 28, fautes: [] }
  ];

  selectedTest: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.calculerScores();
    this.generateChart();
  }

  generateChart() {
    new Chart('graph1', {
      type: 'line',
      data: {
        labels: this.testsRecents.map(test => test.date),
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

  calculerScores() {
    let total = this.testsRecents.reduce((sum, test) => sum + test.score, 0);
    let moyenne = total / this.testsRecents.length;
    let pourcentage = (moyenne / 40) * 100;

    this.statistiques.scoreTotal = total;
    this.statistiques.scoreMoyen = Math.round(moyenne);
    this.statistiques.peutPasserExamen = pourcentage >= 80;

    if (this.statistiques.peutPasserExamen) {
      this.statistiques.dateExamen = this.definirDateExamen();
    }
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
