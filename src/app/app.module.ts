import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CodeEditorModule } from '@ngstack/code-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './component/create/create.component';
import { CustomFunctionItemComponent } from './component/custom-function-item/custom-function-item.component';
import { HomeComponent } from './component/home/home.component';
import { ImportComponent } from './component/import/import.component';
import { LogoComponent } from './component/logo/logo.component';
import { ToolBarComponent } from './component/tool-bar/tool-bar.component';
import { ImportHelperComponent } from './component/import-helper/import-helper.component';
import { ExportLinkComponent } from './component/export-link/export-link.component';
import { ToastComponent } from './component/toast/toast.component';
import { ModalComponent } from './component/modal/modal.component';
import { IconComponent } from './component/icon/icon.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolBarComponent,
    LogoComponent,
    CreateComponent,
    CustomFunctionItemComponent,
    ImportComponent,
    ImportHelperComponent,
    ExportLinkComponent,
    ToastComponent,
    ModalComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CodeEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
