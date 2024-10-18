import { Component } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TimeLeftPipe } from '../../time-left.pipe';

@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [RouterModule,CommonModule,TimeLeftPipe],
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
