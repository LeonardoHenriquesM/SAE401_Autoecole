import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  apiUrl = 'https://api401.alwaysdata.net/backend/api/src/historique.php';
  id_user: string | null = null;  // Variable pour l'ID de l'utilisateur
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

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Vérifier si l'utilisateur est connecté en récupérant l'ID depuis localStorage
    this.id_user = localStorage.getItem('id_user');

    // Si l'ID utilisateur n'est pas dans localStorage, essayer de le récupérer depuis l'URL
    if (!this.id_user) {
      this.route.paramMap.subscribe(params => {
        this.id_user = params.get('id_user');
        this.chargerHistorique();
      });
    } else {
      // Si l'ID est trouvé dans le localStorage, charger l'historique
      this.chargerHistorique();
    }
  }

  chargerHistorique() {
    if (!this.id_user) {
      this.messageErreur = "L'ID utilisateur est manquant.";
      return;
    }
  
    this.http.get(this.apiUrl + `?id_user=${this.id_user}`, {
      withCredentials: true,
      responseType: 'text' // <-- On récupère la réponse en texte brut
    }).subscribe(
      (responseText) => {
        console.log('Réponse brute:', responseText);
        
        // Nettoyage : suppression du texte avant le JSON
        const jsonStartIndex = responseText.indexOf('{'); 
        if (jsonStartIndex === -1) {
          console.error("Réponse invalide :", responseText);
          this.messageErreur = 'Réponse invalide du serveur';
          return;
        }
        
        const jsonResponse = responseText.substring(jsonStartIndex);
  
        try {
          const response = JSON.parse(jsonResponse); // Maintenant, on parse le JSON propre
          console.log('Réponse analysée :', response);
          //Donnés pour les stats de l'historique
          this.statistiques.tauxReussite = parseFloat(response.stats.taux_reussite); // Le taux de réussite
          this.statistiques.testsPasses = parseInt(response.stats.tests_passes, 10);// Le nombre de test passés
          this.statistiques.scoreMoyen = parseFloat(response.stats.score_moyen); // Le score moyen
          this.testsRecents = response.tests; // Touts les test récents sont récupérés par cette ligne
          this.statistiques.peutPasserExamen = this.testsRecents.some(test => test.score >= 35); // Défini si l'élève peut passer l'examen (si au moins un score > 35)
          this.generateChart(); // Cette ligne ci génère notre graphique
        } catch (e) {
          console.error("Erreur lors du parsing JSON :", e); // Débuggage
          this.messageErreur = 'Erreur lors du traitement des données.'; // Message d'erreur pour de débuggage
        }
      },
      (error) => {
        console.error("Erreur HTTP:", error); //Débuggage
        this.messageErreur = 'Une erreur s\'est produite lors du chargement des données.'; // Msg d'erreur pour le débuggage
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
