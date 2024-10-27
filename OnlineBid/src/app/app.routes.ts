import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuctionListComponent } from './components/auction-list/auction-list.component';
import { AuctionAddComponent } from './components/auction-add/auction-add.component';
import { AuctionDetailsComponent } from './components/auction-details/auction-details.component';
import { AuthGuardService } from './services/auth/auth.guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auctions', component: AuctionListComponent },
  { path: 'auctionadd', component: AuctionAddComponent },
  { path: 'auctions/:id', component: AuctionDetailsComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
];
