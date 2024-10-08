import { Component } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
export interface Auction {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  startDate: Date;
  endDate: Date;
  currentPrice?: number;
  isActive: boolean;
  userId: string;
  category: string;
}
@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [NgFor,RouterModule],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.scss'
})

export class AuctionListComponent {

  auctions: Auction[] = [];

  constructor(private auctionService: AuctionService) { }

  ngOnInit(): void {
    this.auctionService.getAuctions().subscribe(data => {
      this.auctions = data;
    });
  }

}
