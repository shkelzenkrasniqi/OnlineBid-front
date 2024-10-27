import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuctionService } from '../../services/auction.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomepageComponent implements OnInit {
  auctions: any[] = [];
  categories = ['Art', 'Electronics', 'Furniture', 'Collectibles'];

  constructor(private auctionService: AuctionService) {}

  ngOnInit(): void {
    this.auctionService.getAuctions().subscribe((data: any[]) => {
      this.auctions = data;
    });
  }
}
