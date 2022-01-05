import { Component, OnInit } from '@angular/core';
import { Search } from 'src/nested/models/search.model';
import { StockService } from 'src/nested/services/stock.service';
import {  formatDate } from '@angular/common';
  
import { Inject,  LOCALE_ID }  from '@angular/core';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  search: Search={companyCode:"",startDate:new Date(),endDate:new Date};
  companies: any[]=[];
  company:any;
  stocks: any;
  minPrice:any;
  maxPrice:any;
  avgPrice:any;
  constructor(public service : StockService,@Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {

  }

  findCompany(){
    this.service.getAllCompanies("info/"+this.search.companyCode).subscribe(data=>{
      console.log(data);
      this.companies = data["companyList"];
      this.company = this.companies[0];
      this.stocks=this.company.stocks;
    });
  }

  findStocks(){
    this.service.getAllCompanies("info/"+this.search.companyCode).subscribe(data=>{
      console.log(data);
      this.companies = data["companyList"];
      this.company = this.companies[0]; 
    if(this.search.startDate && this.search.endDate){
    this.service.getAllStocks('get/'+this.search.companyCode+"/"+formatDate(this.search.startDate, 'dd-MM-yyyy' ,this.locale)+"/"+ formatDate(this.search.endDate, 'dd-MM-yyyy' ,this.locale)).subscribe(data=>{
      this.stocks=data["stockList"];
      this.minPrice=data["minPrice"];
      this.avgPrice = data["averagePrice"];
      this.maxPrice=data["maxPrice"];
      console.log(this.stocks);
    });
}else{
  this.stocks=this.company.stocks;
}
});
  }
}
