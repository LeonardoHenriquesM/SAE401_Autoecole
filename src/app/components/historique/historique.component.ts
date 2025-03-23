import { Component } from '@angular/core';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent {
  statistiques = {
    tauxReussite: 63,
    testsPasses: 6,
    scoreMoyen: 23
  };

  testsRecents = [
    { date: '10/03', score: 35 },
    { date: '08/03', score: 24 },
    { date: '06/03', score: 27 },
    { date: '01/03', score: 20 },
    { date: '22/02', score: 22 },
    { date: '18/02', score: 18 }
  ];
}
