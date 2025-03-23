import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SupportComponent } from './components/support/support.component';
import { AvisComponent } from './components/avis/avis.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: 'app-home', component: HomeComponent },    
  { path: 'app-header', component: HeaderComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: 'avis', component: AvisComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'support', component: SupportComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
