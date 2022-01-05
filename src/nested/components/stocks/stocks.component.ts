import { Component, OnInit } from '@angular/core';
import { Search } from 'src/nested/models/search.model';
import { StockService } from 'src/nested/services/stock.service';
import {  formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';
  
import { Inject,  LOCALE_ID }  from '@angular/core';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  search: any={companyCode:"",startDate:'',endDate:''};
  companies: any[]=[];
  company:any;
  stocks: any;
  minPrice:any;
  maxPrice:any;
  avgPrice:any;
  constructor(public msgService : MessageService, public service : StockService,@Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {

  }

  findStocks(){
    if(!this.search.companyCode||this.search.companyCode==''||this.search.companyCode==null){
      this.msgService.add({severity:'warning', summary:'CompanyCode is required'+this.search.companyCode, detail:""});
    }
    this.service.getAllCompanies("info/"+this.search.companyCode).subscribe(data=>{
      console.log(data);
      this.companies = data["companyList"];
      if(this.companies.length==0){
        this.msgService.add({severity:'warning', summary:'No Company Available for companyCode '+this.search.companyCode, detail:""});
    
      }else{
      this.company = this.companies[0];
      this.stocks=this.company.stocks;
      if(this.companies.length!=0&&this.stocks?.length==0){
        this.msgService.add({severity:'warning', summary:'No Stocks Available for '+this.search.companyCode, detail:""});
      }
    }
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
