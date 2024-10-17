import { Component, NgModule, OnInit } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { AuthService } from '../../services/auth/auth.service';
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
    category: ''
  };
  selectedFiles: File[] = [];

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

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    console.log(this.selectedFiles);
  }

  addAuction(): void {
    const formData = new FormData();
    formData.append('title', this.auction.title);
    formData.append('description', this.auction.description);
    formData.append('startingPrice', this.auction.startingPrice.toString());
    formData.append('startDate', this.auction.startDate);
    formData.append('endDate', this.auction.endDate);
    formData.append('userId', this.auction.userId);
    formData.append('category', this.auction.category.toString());

    // Append images to FormData
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('photos', this.selectedFiles[i], this.selectedFiles[i].name);
      }
  }


    this.auctionService.addAuction(formData).subscribe(
      response => {
        console.log('Auction added successfully');
        this.router.navigate(['/auctions']);
      },
      error => {
        console.error('Error adding auction:', error);
        console.log('Full error response:', error);
      }
    );
  }
}
