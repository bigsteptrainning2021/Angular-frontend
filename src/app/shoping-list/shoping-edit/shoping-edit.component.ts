import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShopingService } from 'src/app/Services/Shoping.servive';
import { Ingredients } from 'src/app/Shared/Ingridents';


@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slform: NgForm;
  subscription: Subscription;
  index: number;
  editMode: boolean = false;
  ingrident: Ingredients;
  constructor(private shopingrecipe: ShopingService,private http:HttpClient) { }

  ngOnInit(): void {
    this.subscription = this.shopingrecipe.editShopping.subscribe((index: number) => {
      this.index = index;
      this.editMode = true;
      this.ingrident = this.shopingrecipe.getShopingByIndex(this.index);
      this.slform.setValue({
        name: this.ingrident.name,
        amount: this.ingrident.amount
      })
    })
  }
  
  
  // Connected with Database
  onAddDetail(data: NgForm) {

    const data1 = new Ingredients(data.value.name, data.value.amount);
    if (this.editMode){
      this.shopingrecipe.updateIngrident(this.index, data1);
      this.editMode=false;
    }
    else
      this.shopingrecipe.addShoping(data1);

    data.reset();

  }

  onClear(){
    this.slform.reset();
  }

  onDelete(index:number){
    this.onClear();
    this.shopingrecipe.deleteIngridents(index);
    this.editMode=false;
    alert("Successfully Deleted Item");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
