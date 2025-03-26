import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './admin-support.component.html',
  styleUrls: ['./admin-support.component.css']
})
export class AdminSupportComponent {
  menuOpen = false; // Gère l'ouverture du menu mobile

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
