import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { RecipeServices } from 'src/app/Services/Recipe.services';
import { Recipe } from '../Recipe';

@Component({
  selector: 'app-reciepe-item',
  templateUrl: './reciepe-item.component.html',
  styleUrls: ['./reciepe-item.component.css']
})
export class ReciepeItemComponent implements OnInit {
  @Input() recipe:Recipe;
  @Input() index:number;
  
 constructor(){

 }

  ngOnInit(): void {
  }

}