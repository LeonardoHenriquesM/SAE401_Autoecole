// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Cette ligne permet d'injecter ce service dans toute l'application
})
export class AuthService {

  constructor() {}

  // Vérifier si l'utilisateur est connecté
  estAuthentifie(): boolean {
    return !!localStorage.getItem('id_user'); // Vérifie si l'ID utilisateur est dans le localStorage
  }

  // Vérifier si l'utilisateur est un admin
  estAdmin(): boolean {
    return localStorage.getItem('user_type') === 'admin'; // Vérifie si le type d'utilisateur est admin
  }

  // Se déconnecter (supprimer les informations de l'utilisateur du localStorage)
  seDeconnecter(): void {
    localStorage.removeItem('id_user');
    localStorage.removeItem('user_type');
  }

  // Obtenir l'ID de l'utilisateur
  obtenirIdUtilisateur(): string | null {
    return localStorage.getItem('id_user');
  }
}
