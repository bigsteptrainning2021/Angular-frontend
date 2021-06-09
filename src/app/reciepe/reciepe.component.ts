import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RecipeServices } from '../Services/Recipe.services';
import { Recipe } from './Recipe';

@Component({
  selector: 'app-reciepe',
  templateUrl: './reciepe.component.html',
  styleUrls: ['./reciepe.component.css'],

})
export class ReciepeComponent implements OnInit {
  recipeDetail;
  constructor(private recipeservices:RecipeServices,private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/getRecipe').subscribe((res:[])=>{
            this.recipeDetail=res
        })
    this.recipeservices.sendReq.subscribe(
      (recipe:Recipe)=>{
        this.recipeDetail=recipe;
      }
    )
  }

}
