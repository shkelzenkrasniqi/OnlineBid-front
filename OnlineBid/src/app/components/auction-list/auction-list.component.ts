import { Component } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [NgFor, RouterModule,NgIf],
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.scss']
})

export class AuctionListComponent {

  auctions: any[] = [];

  constructor(private auctionService: AuctionService) { }

  ngOnInit(): void {
    this.auctionService.getAuctions().subscribe(data => {
      this.auctions = data;
    });
  }
}
