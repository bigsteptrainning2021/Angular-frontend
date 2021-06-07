import { Component, OnInit} from '@angular/core';
import { RecipeServices } from 'src/app/Services/Recipe.services';
import { Recipe } from '../Recipe';

@Component({
  selector: 'app-reciepe-list',
  templateUrl: './reciepe-list.component.html',
  styleUrls: ['./reciepe-list.component.css']
})
export class ReciepeListComponent implements OnInit {
  
recipes:Recipe[];
  constructor(private recipeservice:RecipeServices) { 
    
  }

  ngOnInit(): void {
    this.recipes=this.recipeservice.getrecipes();
    this.recipeservice.recipeChanged.subscribe(
      (recipe:Recipe[])=>{
        this.recipes=this.recipeservice.getrecipes();
      }
    )
  
  }
 
}
