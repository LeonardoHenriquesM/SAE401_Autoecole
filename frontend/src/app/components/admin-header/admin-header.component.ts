import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {

  constructor(private authService: AuthService, private router: Router) {}

  menuOpen = false; // Variable pour contrôler l'état du menu

  // Fonction pour basculer l'état du menu
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Fonction pour fermer le menu
  closeMenu() {
    this.menuOpen = false;
  }
  deconnexion(): void {
    // Appeler la méthode seDeconnecter du service pour effacer les informations de l'utilisateur
    this.authService.seDeconnecter();
    this.router.navigate(['/login']);
  }
}
