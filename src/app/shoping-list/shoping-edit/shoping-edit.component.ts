import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShopingService } from 'src/app/Services/Shoping.servive';



@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit, AfterContentInit {
  @ViewChild('f') slform: NgForm;
  subscription: Subscription;
  index: string;
  editMode: boolean = false;
  ingrident;
  constructor(private http: HttpClient, private shopingrecipe: ShopingService) { }

  ngOnInit(): void {

  }
  ngAfterContentInit() {
    this.subscription = this.shopingrecipe.editShopping.subscribe((index: string) => {
      this.index = index;
      this.editMode = true;
      this.http.get('http://localhost:3000/getShoppingById/' + index).subscribe(res => {
        console.log(res)
        this.ingrident = res;
        this.slform.setValue({
          name: this.ingrident.name,
          amount: this.ingrident.amount
        })
      })
    })
  }


  // Add and Update shopping List
  onAddDetail(data: NgForm) {
    if (this.editMode) {
      this.shopingrecipe.updateIngrident(this.index,data);
      this.editMode = false;
    }
    else 
      this.shopingrecipe.addShoping(data);
    data.reset();
  }


  //Clear form data
  onClear() {
    this.slform.reset();
  }


  onDelete(index: string) {
    this.onClear();
    this.shopingrecipe.deleteIngridents(index);
    this.editMode=false;
   

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
