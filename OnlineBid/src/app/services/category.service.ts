import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:5080/api/category';

  constructor(private http:HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addCategory(CategoryData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}`, CategoryData);
  }
}
