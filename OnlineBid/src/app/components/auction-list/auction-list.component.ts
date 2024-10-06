import { Component } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.scss'
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
