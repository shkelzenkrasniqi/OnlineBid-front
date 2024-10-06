import { Component } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction-add',
  standalone: true,
  imports: [],
  templateUrl: './auction-add.component.html',
  styleUrl: './auction-add.component.scss'
})
export class AuctionAddComponent {
  auction = {
    title: '',
    description: '',
    startingPrice: 0,
    startDate: '',
    endDate: '',
    userId:'',
    category:'1'
  };

  constructor(private auctionService: AuctionService, private router: Router) { }

  addAuction(): void {
    this.auctionService.addAuction(this.auction).subscribe(() => {
      this.router.navigate(['/auctions']);
    });
  }
}
