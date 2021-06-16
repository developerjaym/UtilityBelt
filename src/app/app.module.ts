import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FunctionFormComponent } from './component/function-form/function-form.component';
import { FunctionItemComponent } from './component/function-item/function-item.component';
import { HomeComponent } from './component/home/home.component';
import { LogoComponent } from './component/logo/logo.component';
import { ToolBarComponent } from './component/tool-bar/tool-bar.component';
import { CreateComponent } from './component/create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFunctionItemComponent } from './component/custom-function-item/custom-function-item.component';
import { ImportComponent } from './component/import/import.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FunctionFormComponent,
    FunctionItemComponent,
    ToolBarComponent,
    LogoComponent,
    CreateComponent,
    CustomFunctionItemComponent,
    ImportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
