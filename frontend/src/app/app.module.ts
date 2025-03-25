import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SupportComponent } from './components/support/support.component';
import { AvisComponent } from './components/avis/avis.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';
import { RdvComponent } from './components/rdv/rdv.component';
import { StatsComponent } from './components/stats/stats.component'; 


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HistoriqueComponent,
    ProfilComponent,
    SupportComponent,
    AvisComponent,
    DashboardComponent,
    ContactComponent,
    RdvComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    CommonModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
