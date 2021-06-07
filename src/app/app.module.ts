import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ReciepeComponent } from './reciepe/reciepe.component';
import { ReciepeListComponent } from './reciepe/reciepe-list/reciepe-list.component';
import { ReciepeItemComponent } from './reciepe/reciepe-item/reciepe-item.component';
import { ReciepeDetailsComponent } from './reciepe/reciepe-details/reciepe-details.component';
import { ShopingListComponent } from './shoping-list/shoping-list.component';
import { ShopingEditComponent } from './shoping-list/shoping-edit/shoping-edit.component';
import { Dropdown } from './Shared/dropdown.directives';
import { ShopingService } from './Services/Shoping.servive';
import { RecipeServices } from './Services/Recipe.services';
import { RecipeStartComponent } from './reciepe/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './reciepe/recipe-edit/recipe-edit.component';
// import { RecipeServices } from './Services/Recipe.services';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReciepeComponent,
    ReciepeListComponent,
    ReciepeItemComponent,
    ReciepeDetailsComponent,
    ShopingListComponent,
    ShopingEditComponent,
    Dropdown,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ShopingService,RecipeServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
