import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { ConsulterComponent } from './pages/consulter/consulter.component';
import { HistoriqueComponent } from './pages/historique/historique.component';
import { FooterComponent } from './pages/footer/footer.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'consulter', component: ConsulterComponent },
    { path: 'historique', component: HistoriqueComponent },
    { path: 'footer', component: FooterComponent },
];
