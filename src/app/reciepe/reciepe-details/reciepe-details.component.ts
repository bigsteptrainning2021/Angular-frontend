import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeServices } from 'src/app/Services/Recipe.services';
import { Ingredients } from 'src/app/Shared/Ingridents';
import { Recipe } from '../Recipe';

@Component({
  selector: 'app-reciepe-details',
  templateUrl: './reciepe-details.component.html',
  styleUrls: ['./reciepe-details.component.css']
})
export class ReciepeDetailsComponent implements OnInit {
  recipeDetail:Recipe;
  id:number;
  constructor(private recipeservice:RecipeServices,private route:ActivatedRoute,private http:HttpClient) { }

  ngOnInit(): void {

    this.route.params.subscribe((params:Params)=>{
      this.id=+params['id'];
      this.recipeDetail=this.recipeservice.getrecipe(this.id);
      this.data();
    })
  }
  onClickSave(){
    this.recipeservice.addToShoppingList(this.recipeDetail.ingridents);
  }
  onDelete(index:number){
    this.recipeservice.deleteRecipe(index);
  }

  data(){
    this.http.get('http://localhost:3000/m').subscribe(data=>{
      console.log(data[0])
    })
  }
}
