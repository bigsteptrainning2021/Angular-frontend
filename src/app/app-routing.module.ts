import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReciepeDetailsComponent } from './reciepe/reciepe-details/reciepe-details.component';
import { ReciepeComponent } from './reciepe/reciepe.component';
import { RecipeEditComponent } from './reciepe/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './reciepe/recipe-start/recipe-start.component';
import { ShopingListComponent } from './shoping-list/shoping-list.component';

const routes: Routes = [
  
  {path:'recipe-box', component:ReciepeComponent ,children:[
    {path:'' , component:RecipeStartComponent},
    {path:'new' , component:RecipeEditComponent},
    {path:':id' , component:ReciepeDetailsComponent},
    {path:':id/edit' , component:RecipeEditComponent}
  ]},
  {path:'shopping-list', component:ShopingListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
