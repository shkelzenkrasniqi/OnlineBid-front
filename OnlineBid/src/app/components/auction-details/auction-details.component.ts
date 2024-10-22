import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BidService } from '../../services/bid.service';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { TimeLeftPipe } from '../../time-left.pipe';
import { ToastrService } from 'ngx-toastr';


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
  categoryName: string;
  photos?: Array<{ contentType: string, photoData: string }>;
}
interface Bid {
  userId: string;
  amount: number;
  auctionId: string;
  bidTime: Date;
}
@Component({
  selector: 'app-auction-details',
  standalone: true,
  imports: [CommonModule,RouterOutlet,FormsModule,TimeLeftPipe],
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuctionDetailsComponent implements OnInit {
  auction: Auction | null = null;
  auctionId: string | null = null;
  bids: any[] = [];
  currentImageIndex = 0;
  newBidAmount: number = 0;
  userId: string | null = null;

  constructor(
    public auctionService: AuctionService,
    public route: ActivatedRoute,
    public router: Router,
    public authService: AuthService,
    public bidService: BidService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.auctionId = params.get('id');
      if (this.auctionId) {
        this.fetchAuctionDetails(this.auctionId);
        this.fetchExistingBids(this.auctionId);
      }
    });
    this.userId = this.authService.getUserId();
    if (!this.userId) {
      console.error('User ID not found');
    }
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
  placeBid(): void {
    if (!this.auction || !this.userId) {
      console.error('Cannot place bid without auction or user ID');
      return;
    }

    const newBid: Bid = {
      auctionId: this.auction.id,
      amount: this.newBidAmount,
      userId: this.userId,
      bidTime: new Date()
    };

    this.bidService.placeBid(newBid).subscribe(
      (response) => {
        this.bids.push(response);
          this.toastr.success('You placed your bid successfully!');
             },
      () => {
        this.toastr.error('You did not place a bid! Try again.');
      }
    );
  }
}
