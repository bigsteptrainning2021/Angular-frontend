import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


import { Ingredients } from '../Shared/Ingridents';
@Injectable()
export class ShopingService {
  shopingEmitter = new Subject<Ingredients[]>();
  editShopping = new Subject<string>();
  public Ingrident=[];
  public temp;
  public ref;
  private id;



  constructor(private router: Router, private http: HttpClient) { }



  getshoping() {
    this.http.get('http://localhost:3000/getShopping').subscribe((res: []) => {
      this.Ingrident = res;
    })
  }


  addShoping(data) {
    this.http.post('http://localhost:3000/newShopping', { name: data.value.name, amount: data.value.amount })
      .subscribe((res) => {
        if (res != null)
          alert('SuccessFully Added')
      }
      )
    this.Ingrident.push({ _id: this.id, name: data.value.name, amount: data.value.amount });
    this.shopingEmitter.next(this.Ingrident.slice());
  }

  
  addShoping1(data) {
    this.http.post('http://localhost:3000/addShoppingFromRecipe',data).subscribe();
    alert("Successfully Added Ingridents to Shopping List");

    this.Ingrident.push(...data);
    this.shopingEmitter.next(this.Ingrident.slice());
    this.router.navigate(["../shopping-list"]);
  }

  updateIngrident(index: string, data) {
    this.http.post('http://localhost:3000/editShopping/' + index, { name: data.value.name, amount: data.value.amount })
      .subscribe((res) => {
        alert('Successfully Updated')
      })
    this.ref = this.Ingrident.findIndex(id => id._id == index)
    this.temp = this.Ingrident[this.ref]
    this.Ingrident[this.ref] = { _id: this.temp._id, name: data.value.name, amount: data.value.amount }
    this.shopingEmitter.next(this.Ingrident.slice());
  }

  async deleteIngridents(index: string) {
    await this.http.post('http://localhost:3000/deleteShopping/' + index, {})
      .subscribe((res) => {
        if (res) {
          alert("Successfully Deleted Item");
        }
        else {
          alert("unable to delet")
        }
      })
    this.ref = this.Ingrident.findIndex(id => id._id == index)
    this.Ingrident.splice(this.ref, 1);
    this.shopingEmitter.next(this.Ingrident.slice());

  }




}