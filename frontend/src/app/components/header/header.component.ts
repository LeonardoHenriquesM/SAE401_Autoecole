import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen = false;  // Variable pour contrôler l'état du menu

  // Le service doit être injecté comme une propriété publique
  constructor(public authService: AuthService, private router: Router) {}  // Assurez-vous que c'est 'public' ici

  // Fonction pour basculer l'état du menu
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Fonction pour fermer le menu
  closeMenu() {
    this.menuOpen = false;
  }

  // Fonction de déconnexion
  logout() {
    this.authService.seDeconnecter();  // Appeler la méthode de déconnexion
  }
  deconnexion(): void {
    // Appeler la méthode seDeconnecter du service pour effacer les informations de l'utilisateur
    this.authService.seDeconnecter();
    this.router.navigate(['/login']);
  }
}