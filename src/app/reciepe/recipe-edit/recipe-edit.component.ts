import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeServices } from 'src/app/Services/Recipe.services';
import { Recipe } from '../Recipe';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  @ViewChild('f') submitForm: NgForm;
  id: string;
  editMode: boolean;
  recipe;
  recipeForm:FormGroup;
  constructor(private route: ActivatedRoute, private recipeservice: RecipeServices,private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      })
    
  }


  private initForm(){
    let recipeName="";
    let recipeImgPath=""
    let recipeDescription=""
    let recipeIngridents=new FormArray([]);
    if(this.editMode){
      // this.recipe = this.recipeservice.getrecipe(this.id);
      this.http.post('http://localhost:3000/getRecipeById/'+this.id,{}).subscribe(res=>{
        this.recipe=res;
        recipeName=this.recipe.name;
        recipeImgPath=this.recipe.imgPath;
        recipeDescription=this.recipe.desc;
        if(this.recipe['ingridents']){
          for(let ingrident of this.recipe.ingridents){
            recipeIngridents.push(
              new FormGroup({
                name:new FormControl(ingrident.name),
                amount:new FormControl(ingrident.amount,[
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            )
          }
        }
        this.recipeForm=new FormGroup({
          'name':new FormControl(recipeName, Validators.required),
          'imgPath':new FormControl(recipeImgPath, Validators.required),
          'description':new FormControl(recipeDescription, Validators.required),
          'ingridents':recipeIngridents
        })
        // console.log(this.recipeDetail)
      })
         }
         this.recipeForm=new FormGroup({
          'name':new FormControl(recipeName, Validators.required),
          'imgPath':new FormControl(recipeImgPath, Validators.required),
          'description':new FormControl(recipeDescription, Validators.required),
          'ingridents':recipeIngridents
        })
  
  }


  onSubmit() {
    const recipe=new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imgPath'],
      this.recipeForm.value['ingridents'],
    )
    if(this.editMode){
      this.recipeservice.updateRecipe(this.id,recipe);
    
    }
    else{
      
      this.recipeservice.addRecipe(recipe)
    }
  }

  onAddItem(){

    (<FormArray>this.recipeForm.get('ingridents')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )

  }

  onCancel(){
    if(this.editMode)
    this.router.navigate(['/recipe-box/'+this.id])

    else
    this.router.navigate(['/recipe-box'])
  }
}
