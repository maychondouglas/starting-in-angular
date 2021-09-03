import { MyDashboardComponent } from './views/my-dashboard/my-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component'
import { ProductCrudComponent } from './views/product-crud/product-crud.component'
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';

const routes: Routes = [
    {
        path: "",
        component:  HomeComponent
    },
    {
        path: "products",
        component:  ProductCrudComponent
    },
    {
        path: "products/create",
        component:  ProductCreateComponent
    },
    {
        path: "products/update/:id",
        component:  ProductUpdateComponent
    },
    {
        path: "products/delete/:id",
        component:  ProductDeleteComponent
    },
    {
        path: "dashboard",
        component:  MyDashboardComponent
    }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }