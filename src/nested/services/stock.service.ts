import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
 stockUrl='http://localhost:9089/stocks/';
 companyUrl='http://localhost:9089/company/';

  constructor( private http : HttpClient ) { }

  getAllStocks(query:string): Observable<any>{
    console.log(query);
    return  this.http.get<any>(this.stockUrl+query);
   }

   getAllCompanies(query:string): Observable<any>{
    return  this.http.get<any>(this.companyUrl+query);
   }
}
