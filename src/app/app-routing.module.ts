import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CreateComponent } from './component/create/create.component';
import { ImportComponent } from './component/import/import.component';
import { ImportHelperComponent } from './component/import-helper/import-helper.component';
import { ExportLinkComponent } from './component/export-link/export-link.component';

const routes: Routes = [
    { path: '', component: HomeComponent  },
    { path: 'create', component: CreateComponent  },
    { path: 'import/:conversationId', component: ImportHelperComponent  },
    { path: 'import', component: ImportComponent  },
    { path: 'export/:id', component: ExportLinkComponent  },
    { path: 'edit/:id', component: CreateComponent  },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
