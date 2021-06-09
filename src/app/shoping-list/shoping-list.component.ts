import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
// import { Ingredient } from '../shared/Ingredient';
import { ShopingService } from 'src/app/Services/Shoping.servive';


@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent implements OnInit, OnDestroy {
  public ingredients;
  public data;

  constructor(private slService:ShopingService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.slService.getshoping();
   this.http.get('http://localhost:3000/getShopping').subscribe((res:[]) => {
        this.ingredients = res;
      })
      this.slService.shopingEmitter.subscribe((ingridient:[])=>{
        this.ingredients=ingridient
        console.log(this.ingredients)
      })
    
   
  }

  


  onEdit(index: string) {
    this.slService.editShopping.next(index)
  }

  ngOnDestroy() {
  }
}