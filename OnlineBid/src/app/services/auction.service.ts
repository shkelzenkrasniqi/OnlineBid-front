import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private baseUrl = 'http://localhost:5080/api/auctions';

  constructor(private http:HttpClient) { }

  getAuctions(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getAuctionById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addAuction(auction: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, auction);
  }
}
