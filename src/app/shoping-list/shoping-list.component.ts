import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, DoCheck, OnInit } from '@angular/core';
import { ShopingService } from '../Services/Shoping.servive';
import { Ingredients } from '../Shared/Ingridents';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'],
  
})
export class ShopingListComponent implements OnInit,DoCheck {
Ingrident=[];

  constructor(private shopingservice:ShopingService,private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/getShopping').subscribe((res:[])=>{
      this.Ingrident=res;
      })
  }
  ngDoCheck(){
    this.http.get('http://localhost:3000/getShopping').subscribe((res:[])=>{
      this.Ingrident=res;
      })
    
  }

  onEditItem(index:number){
    this.shopingservice.editShopping.next(index);
  }
 
}
