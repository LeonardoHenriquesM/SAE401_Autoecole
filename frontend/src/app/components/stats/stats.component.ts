import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../stats.service';
import { Chart } from 'chart.js';

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
        const statsData = {
          labels: [
            '80% Réussite Code',
            'A déjà eu le Code',
            'A eu le Permis',
            '50% Réussite Code',
            'Pas encore commencé',
          ],
          datasets: [
            {
              data: [
                data.percent80,
                data.passedCode,
                data.passedPermit,
                data.percent50,
                data.notStarted,
              ],
              backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFC300', '#DAF7A6'],
            },
          ],
        };
  
        this.createChart(statsData);
      } else {
        console.error('Les données récupérées de l\'API sont vides');
      }
    });
  }
  

  createChart(data: any) {
    // Si le graphique existe déjà, on le détruit pour le recréer
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('canvas', {
      type: 'pie', // Type de graphique
      data: data,
    });
  }
}
