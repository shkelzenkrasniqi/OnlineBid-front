import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private hubConnection!: signalR.HubConnection;
  private bidsSource = new BehaviorSubject<any[]>([]);
  bids$ = this.bidsSource.asObservable();

  constructor(private http:HttpClient) {
    this.startConnection();
    this.addBidListener();
  }
  getBidsForAuction(auctionId: string) {
    return this.http.get<any[]>(`http://localhost:5080/api/bid/${auctionId}/bids`);
  }

  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5080/bidhub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch(err => console.log('Error connecting to SignalR: ', err));
  }

  private addBidListener() {
    this.hubConnection.on('ReceiveNewBid', (amount: number, bidTime: Date, userId: string, auctionId: string) => {
      console.log('New bid received:', { amount, bidTime, userId, auctionId });
      const newBid = { amount, bidTime, userId, auctionId };
      const currentBids = this.bidsSource.value;

    const updatedBids = [...currentBids, newBid];

    this.bidsSource.next(updatedBids);
    });
  }
}
