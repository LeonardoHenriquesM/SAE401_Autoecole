import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../stats.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public chart: any;

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.statsService.getStats().subscribe((data) => {
      console.log('Données de l\'API:', data);
  
      if (data) {
        this.createChart([
          data.percent80,
          data.passedCode,
          data.passedPermit,
          data.percent50,
          data.notStarted,
        ]);
      } else {
        console.error('Les données récupérées de l\'API sont vides');
      }
    });
  }

  createChart(data: number[]) {
    if (this.chart) {
      this.chart.destroy(); // Détruire l’ancien graphique s’il existe
    }

    const ctx = document.getElementById('canvas') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Canvas introuvable');
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          '80% Réussite Code',
          'A déjà eu le Code',
          'A eu le Permis',
          '50% Réussite Code',
          'Pas encore commencé',
        ],
        datasets: [{
          data: data,
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFC300', '#DAF7A6'],
        }]
      }
    });
  }
}
