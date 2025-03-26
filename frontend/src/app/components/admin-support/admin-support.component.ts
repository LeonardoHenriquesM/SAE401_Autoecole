import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-faq',
  templateUrl: './admin-support.component.html',
  styleUrls: ['./admin-support.component.css']
})
export class AdminSupportComponent {
  menuOpen = false; // Gère l'ouverture du menu mobile
  //Déclaration des varirables pour l'authentification
  estAuthentifie: boolean = false;
  estAdmin: boolean = false;
  constructor(public authService: AuthService, private router: Router) {}  // Constructeur incluant le service d'authentification ainsi que le routeur

  ngOnInit(): void {
    // Vérifie si l'utilisateur est authentifié
    this.estAuthentifie = this.authService.estAuthentifie();
    
    // Vérifie si l'utilisateur est admin
    this.estAdmin = this.authService.estAdmin();

    // Si l'utilisateur n'est pas authentifié, redirige vers la page de login
    if (!this.estAuthentifie) {
      this.router.navigate(['/login']);
      alert("Veuillez vous connecter");
    }

    // Si l'utilisateur n'est pas admin, redirige vers login
    if (this.estAuthentifie && !this.estAdmin) {
      this.router.navigate(['/login']);
      alert("Il vous faut être un administrateur pour accéder à cette page");
    }
  }

  // Liste des questions existantes avec état d'expansion
  faqs = [
    { id: 1, question: "Je ne suis pas satisfait du moniteur, que puis-je faire ?", answer: "Parlez-en avec l’auto-école.", expanded: false },
    { id: 2, question: "Quels sont les documents demandés pour l'inscription ?", answer: "Carte d’identité, photos, certificat de recensement, etc.", expanded: false },
    { id: 3, question: "À quel âge peut-on se présenter à l’examen du code ?", answer: "Dès l’âge de 15 ans.", expanded: false },
    { id: 4, question: "Quelles sont les erreurs éliminatoires au permis de conduire ?", answer: "Une faute qui met en danger les usagers est éliminatoire.", expanded: false },
    { id: 5, question: "Peut-on faire des heures de conduite et le code en même temps ?", answer: "Oui, c'est possible.", expanded: false }
  ];

  newQuestion: string = '';
  newAnswer: string = '';

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  // Méthode pour alterner l'état d'expansion de la réponse
  toggleAnswer(index: number) {
    this.faqs[index].expanded = !this.faqs[index].expanded;
  }

  addFaq() {
    if (this.newQuestion.trim() && this.newAnswer.trim()) {
      const newFaq = {
        id: this.faqs.length + 1, 
        question: this.newQuestion,
        answer: this.newAnswer,
        expanded: false // Assure que la nouvelle question est fermée par défaut
      };
      this.faqs.push(newFaq); 

      // Réinitialisation des champs du formulaire
      this.newQuestion = '';
      this.newAnswer = '';
    }
  }

  trackByFaq(index: number, faq: any) {
    return faq.id; 
  }
}
