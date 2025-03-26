import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
      
      //Déclaration de la variable permettant l'authentification
      estAuthentifie: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}  // Constructeur incluant le service d'authentification ainsi que le routeur
  ngOnInit(): void {
    // Vérifie si l'utilisateur est authentifié
    this.estAuthentifie = this.authService.estAuthentifie();
    // + redirection vers login
    if (!this.estAuthentifie) {
      this.router.navigate(['/login']);
      alert("Vous n'êtes pas authentifié, veuillez vous connecter")
    }
  }
  // Définir un objet pour stocker les valeurs du formulaire
  formData = {
    name: '',
    object: '',  // Nouveau champ pour l'objet de la demande
    message: ''
  };

  // Méthode qui est appelée lorsque le formulaire est soumis
  onSubmit() {
    const { name, object, message } = this.formData;

    // Définir l'objet et le corps du message
    const subject = `Demande de contact - ${object}`;
    const body = `Nom: ${name}\nObjet: ${object}\n\nMessage:\n${message}`;

    // Créer l'URL mailto
    const mailtoLink = `mailto:nicolas.buisset@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Ouvrir le client de messagerie avec le mailto
    window.location.href = mailtoLink;
  }
}
