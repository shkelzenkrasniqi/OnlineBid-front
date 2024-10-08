import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Auction {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  startDate: Date;
  endDate: Date;
  currentPrice?: number | null;
  isActive: boolean;
  userId: string;
  category: string;
}

@Component({
  selector: 'app-auction-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.scss']
})
export class AuctionDetailsComponent implements OnInit {
  auction: Auction | null = null;
  auctionId: string | null = null;

  constructor(
    public auctionService: AuctionService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.auctionId = params.get('id');
      if (this.auctionId) {
        this.fetchAuctionDetails(this.auctionId);
      }
    });
  }

  fetchAuctionDetails(id: string): void {
    this.auctionService.getAuctionById(id).subscribe(
      (auction: Auction) => {
        this.auction = auction;
      },
      error => {
        console.error('Error fetching auction details:', error);
        this.router.navigate(['/auctions']);
      }
    );
  }
}
