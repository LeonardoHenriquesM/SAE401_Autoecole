import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public chart: any;

  constructor() {}

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy(); // Détruire l'ancien graphique s’il existe
    }

    const ctx = document.getElementById('canvas') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Canvas introuvable');
      return;
    }

    // Données ajustées pour un total de 5 candidats
    const data = [2, 1, 1, 1]; // Ex: 2 candidats en "80% Réussite Code", etc.

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          '80% Réussite Code',
          'A déjà eu le Code',
          'A eu le Permis',
          'Pas encore commencé'
        ],
        datasets: [{
          data: data,
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#DAF7A6'],
        }]
      }
    });

    // Affichage du nombre total de candidats sous le graphique
    const totalCandidats = data.reduce((acc, val) => acc + val, 0);
    const totalElement = document.getElementById('total-candidats');
    if (totalElement) {
      totalElement.textContent = `Nombre total de candidats concernés : ${totalCandidats}`;
    }
  }
}
