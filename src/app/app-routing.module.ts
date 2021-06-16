import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CreateComponent } from './component/create/create.component';
import { ImportComponent } from './component/import/import.component';

const routes: Routes = [
    { path: '', component: HomeComponent  },
    { path: 'create', component: CreateComponent  },
    { path: 'import', component: ImportComponent  },
    { path: 'edit/:id', component: CreateComponent  },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
