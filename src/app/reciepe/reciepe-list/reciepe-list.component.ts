import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { RecipeServices } from 'src/app/Services/Recipe.services';
import { Recipe } from '../Recipe';

@Component({
  selector: 'app-reciepe-list',
  templateUrl: './reciepe-list.component.html',
  styleUrls: ['./reciepe-list.component.css']
})
export class ReciepeListComponent implements OnInit {
  
recipes;
  constructor(private recipeservice:RecipeServices,private http:HttpClient) { 
    
  }

  ngOnInit(): void {
    this.recipeservice.getrecipes();
    this.http.get('http://localhost:3000/getRecipe').subscribe((res:[])=>{
            this.recipes=res
        })
    this.recipeservice.recipeChanged.subscribe(
      (recipe)=>{
        this.recipes=recipe;
      }
    )
  
  }
 
}
