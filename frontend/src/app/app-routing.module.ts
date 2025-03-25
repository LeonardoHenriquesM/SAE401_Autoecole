import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SupportComponent } from './components/support/support.component';
import { AvisComponent } from './components/avis/avis.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactComponent } from './components/contact/contact.component';
import { RdvComponent } from './components/rdv/rdv.component';
import { StatsComponent } from './components/stats/stats.component';

const routes: Routes = [
  { path: 'stats', component: StatsComponent },   
  { path: 'app-header', component: HeaderComponent },
  { path: 'historique/:id', component: HistoriqueComponent },
  { path: 'avis', component: AvisComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'rdv', component: RdvComponent },
  { path: 'support', component: SupportComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
