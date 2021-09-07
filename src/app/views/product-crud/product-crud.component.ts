import { ProductService } from './../../components/product/product.service';
import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/components/product/product.model';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  produtosObtidos!: Product[];

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private productService: ProductService
  ) { 
    this.headerService.headerData = {
      title: 'Cadastro de Produtos',
      icon: 'storefront',
      routeUrl: '/products'
    }
  }

  ngOnInit(): void {
    this.getProductsList();
  }

  navigateToProductCreate(): void {
    this.router.navigate(['products/create']);
  }

  getProductsList(): void {
    this.productService.read().subscribe(products => {
      this.produtosObtidos = products;
      console.log(this.produtosObtidos)
      return;
    })
  }

}
