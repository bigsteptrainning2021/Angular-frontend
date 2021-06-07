import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {Recipe} from '../reciepe/Recipe';
import { Ingredients } from '../Shared/Ingridents';
import { ShopingService } from './Shoping.servive';
@Injectable()
export class RecipeServices{
    
public sendReq=new EventEmitter<Recipe>();
recipeChanged=new Subject<Recipe[]>();

    private recipes:Recipe[]=[
        new Recipe("Test demo1",
        "this is for test purpose first",
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563",
        [
            new Ingredients("Aloo",20),
            new Ingredients("Pyaz",30)
        ]),
        new Recipe("Test demo2",
        "this is for test purpose",
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563",
        [
            new Ingredients("Tomato",20),
            new Ingredients("Onion",30)
        ])
      ];
      constructor(private shopingservice:ShopingService,private router:Router){}
      addToShoppingList(data:Ingredients[]){
            this.shopingservice.addShoping1(data);
          }
       
        
      
      getrecipes(){
          return this.recipes.slice();
      }

      getrecipe(index:number){
        return this.recipes.slice()[index];
    }
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe)
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number,recipe:Recipe){
        this.recipes[index]=recipe;
        this.recipeChanged.next(this.recipes.slice());
        alert("Successfully updated");
        this.router.navigate(['./recipe-box/'+index])

    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
        alert("Successfully Deleted");
    }
}