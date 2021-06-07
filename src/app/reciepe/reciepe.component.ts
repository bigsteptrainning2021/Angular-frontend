import { Component, OnInit } from '@angular/core';
import { RecipeServices } from '../Services/Recipe.services';
import { Recipe } from './Recipe';

@Component({
  selector: 'app-reciepe',
  templateUrl: './reciepe.component.html',
  styleUrls: ['./reciepe.component.css'],

})
export class ReciepeComponent implements OnInit {
  recipeDetail:Recipe;
  constructor(private recipeservices:RecipeServices) { }

  ngOnInit(): void {
    this.recipeservices.sendReq.subscribe(
      (recipe:Recipe)=>{
        this.recipeDetail=recipe;
      }
    )
  }

}
