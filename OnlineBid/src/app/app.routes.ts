import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuctionListComponent } from './components/auction-list/auction-list.component';
import { AuctionAddComponent } from './components/auction-add/auction-add.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auctions', component: AuctionListComponent },
  { path: 'auctionadd', component: AuctionAddComponent },

  //{ path: '', redirectTo: 'login', pathMatch: 'full' }
];
