import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {Recipe} from '../reciepe/Recipe';
import { Ingredients } from '../Shared/Ingridents';
import { ShopingService } from './Shoping.servive';
// import { ShopingService } from './Shoping.servive';
@Injectable()
export class RecipeServices{
    
public sendReq=new EventEmitter<Recipe>();
recipeChanged=new Subject<Recipe[]>();
public ref;
    private recipes=[];
        // new Recipe("Test demo1",
        // "this is for test purpose first",
        // "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563",
        // [
        //     new Ingredients("Aloo",20),
        //     new Ingredients("Pyaz",30)
        // ]),
        // new Recipe("Test demo2",
        // "this is for test purpose",
        // "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563",
        // [
        //     new Ingredients("Tomato",20),
        //     new Ingredients("Onion",30)
   
      constructor(private router:Router,private http:HttpClient,private shopingservice:ShopingService){}
      addToShoppingList(data:Ingredients[]){
            this.shopingservice.addShoping1(data);
          }
       
        
      
      getrecipes(){
        this.http.get('http://localhost:3000/getRecipe').subscribe((res:[])=>{
            this.recipes=res
        })
      }

    addRecipe(recipe){
        this.http.post('http://localhost:3000/newRecipe',recipe).subscribe(res=>{
        if(res)
          alert("SuccessFully Added");
          this.router.navigate(['./recipe-box/'])
        })
        this.recipes.push(recipe)
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index:string,recipe:Recipe){
        // this.recipes[index]=recipe;
        this.http.post('http://localhost:3000/editRecipe/' + index, recipe)
      .subscribe((res) => {
          if(res)
        alert('Successfully Updated')
      })
      this.ref = this.recipes.findIndex(id => id._id == index)
      this.recipes[this.ref]=recipe

      this.router.navigate(['./recipe-box/'])

      this.recipeChanged.next(this.recipes.slice());

    

    }

   async deleteRecipe(index:string){
        await this.http.post('http://localhost:3000/deleteRecipe/' + index, {})
        .subscribe((res) => {
          if (res) {
            alert("Successfully Deleted Item");
          }
          else {
            alert("unable to delet")
          }
        })
      this.ref = this.recipes.findIndex(id => id._id == index)
      this.recipes.splice(this.ref, 1);
      this.recipeChanged.next(this.recipes.slice());
      this.router.navigate(['./recipe-box/'])
        
    }
}