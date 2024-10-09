import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BidService } from '../../services/bid.service';

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
  bids: any[] = [];

  constructor(
    public auctionService: AuctionService,
    public route: ActivatedRoute,
    public router: Router,
    public bidService: BidService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.auctionId = params.get('id');
      if (this.auctionId) {
        this.fetchAuctionDetails(this.auctionId);
        this.fetchExistingBids(this.auctionId);
      }
    });
    this.subscribeToBids();
  }

  fetchExistingBids(auctionId: string): void {
    this.bidService.getBidsForAuction(auctionId).subscribe(
      (existingBids: any[]) => {
        this.bids = existingBids;
      },
      error => {
        console.error('Error fetching existing bids:', error);
      }
    );
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

  private subscribeToBids() {
    this.bidService.bids$.subscribe((newBids) => {
      console.log("Bids updated:", newBids);
      if (newBids && newBids.length > 0) {
        this.bids = newBids;
      } else {
        console.log('No bids received or bids list is empty');
      }
    });
  }

}
