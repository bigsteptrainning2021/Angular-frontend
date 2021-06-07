import { HttpClient } from '@angular/common/http';
import { DoCheck, EventEmitter, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Ingredients } from '../Shared/Ingridents';
@Injectable()
export class ShopingService{
    shopingEmitter=new Subject<Ingredients[]>();
    editShopping=new Subject<number>();
    Ingrident=[];

    constructor(private router:Router,private http:HttpClient){}

   

    getshoping(){
        return this.Ingrident.slice();
    }

    getShopingByIndex(index:number){
        return this.Ingrident[index];
    }

    addShoping(data){
        this.http.post('http://localhost:3000/newShopping',data).subscribe(res=>{
        if(res){
          alert("Item Added SuccessFully")
        }
        else{
          alert("unable to Save")
        }
      })
    }
    addShoping1(data:Ingredients[]){
        this.Ingrident.push(...data);
        this.shopingEmitter.next(this.Ingrident.slice());
        alert("Successfully Added Ingridents to Shopping List");
        this.router.navigate(["../shopping-list"]);
    }

    updateIngrident(index:number,data:Ingredients){
        this.Ingrident[index]=data;
        alert("Successfully Upate the Item");
        this.shopingEmitter.next(this.Ingrident.slice());    
    }

    deleteIngridents(index:number){
        this.Ingrident.splice(index,1);
        this.shopingEmitter.next(this.Ingrident.slice());
    }
}