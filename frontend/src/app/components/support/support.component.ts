import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
  
})

export class SupportComponent {
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
