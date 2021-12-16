import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchComponent } from './components/search/search.component';
import { GyphyListComponent } from './components/gyphy-list/gyphy-list.component';
import { GyphyListItemComponent } from './components/gyphy-list-item/gyphy-list-item.component';
import { ImageModalComponent } from './modals/image-content.component';


const declartions = [
  SearchComponent,
  GyphyListComponent,
  GyphyListItemComponent,
  ImageModalComponent
];

const imports = [
  IonicModule,
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [...declartions],
  imports: [...imports],
  exports: [...imports, ...declartions]
})
export class SharedModule { }
