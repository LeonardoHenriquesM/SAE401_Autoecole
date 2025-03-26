import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-profil',
  templateUrl: './admin-profil.component.html',
  styleUrls: ['./admin-profil.component.css']
})

export class AdminProfilComponent {
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

  menuOpen: boolean = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
  deconnecter() {
    // Appel méthode pour effacer les données utilisateur + redirection
    this.authService.seDeconnecter();
    this.router.navigate(['login']);
  } 
}
