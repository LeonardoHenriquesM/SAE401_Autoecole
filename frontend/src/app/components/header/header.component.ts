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

  constructor(public authService: AuthService, private router: Router) {}  // Constructeur incluant le service d'authentification ainsi que le routeur

  // Fonction pour basculer l'état du menu
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Fonction pour fermer le menu
  closeMenu() {
    this.menuOpen = false;
  }
  deconnecter() {
    // Appel méthode pour effacer les données utilisateur + redirection
    this.authService.seDeconnecter();
    this.router.navigate(['login']);
  } 
}