import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
  
})

export class SupportComponent implements OnInit {
  
//Déclaration de la variable permettant l'authentification
estAuthentifie: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}  // Constructeur incluant le service d'authentification ainsi que le routeur
  ngOnInit(): void {
    // Vérifie si l'utilisateur est authentifié
    this.estAuthentifie = this.authService.estAuthentifie();
    console.log('Est authentifié:', this.estAuthentifie);  // Ajoutez un log pour vérifier
  
    // Si l'utilisateur n'est pas authentifié, redirige vers la page de login
    if (!this.estAuthentifie) {
      console.log('Utilisateur non authentifié, redirection vers login');
      this.router.navigate(['/login']);
      alert("Vous n'êtes pas authentifié, veuillez vous connecter");
    }
  }  
}

document.addEventListener("DOMContentLoaded", () => {
  const faqs = document.querySelectorAll(".faq");

  faqs.forEach((faq) => {
    const questionContainer = faq.querySelector(".faq-question-container") as HTMLElement;
    const answerBox = faq.querySelector(".answer-box") as HTMLElement;

    if (!questionContainer || !answerBox) return;

    questionContainer.addEventListener("click", () => {
      const isActive = faq.classList.contains("active");

      // Ferme toutes les autres réponses
      faqs.forEach((otherFaq) => {
        if (otherFaq !== faq) {
          otherFaq.classList.remove("active");
          const otherAnswer = otherFaq.querySelector(".answer-box") as HTMLElement;
          if (otherAnswer) {
            otherAnswer.style.maxHeight = "0px";
          }
        }
      });

      // Ouvre/Ferme l'élément actuel
      if (isActive) {
        faq.classList.remove("active");
        answerBox.style.maxHeight = "0px";
      } else {
        faq.classList.add("active");
        answerBox.style.maxHeight = `${answerBox.scrollHeight}px`;
      }
    });
  });
});
