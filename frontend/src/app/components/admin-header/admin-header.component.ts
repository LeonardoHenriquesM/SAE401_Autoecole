import { Component } from '@angular/core';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {

  menuOpen = false; // Variable pour contrôler l'état du menu

  // Fonction pour basculer l'état du menu
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Fonction pour fermer le menu
  closeMenu() {
    this.menuOpen = false;
  }
}
