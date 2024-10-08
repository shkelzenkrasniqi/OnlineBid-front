import { Component, NgModule, OnInit } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-auction-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auction-add.component.html',
  styleUrl: './auction-add.component.scss'
})
export class AuctionAddComponent{
  auction = {
    title: '',
    description: '',
    startingPrice: 0,
    startDate: '',
    endDate: '',
    userId: '',
    category: 1
  };

  userId: string | null = null;


  constructor(public authService: AuthService, public auctionService: AuctionService, public router: Router) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    if (this.userId) {
      this.auction.userId = this.userId;
    } else {
      console.error('User ID not found');
    }
  }

  addAuction() {
    this.auctionService.addAuction(this.auction).subscribe(response => {
      console.log('Auction added successfully');
      this.router.navigate(['/auctions']);
    }, error => {
      console.error('Error adding auction:', error);
      console.log('Full error response:', error);
    });
  }
}
