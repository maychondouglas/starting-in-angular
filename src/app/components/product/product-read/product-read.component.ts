import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  @Input()
  listaDeProdutos!: Product[];

  dataSource! : Product[];
  pageSize = 20;
  pageArray = Array();
  pageIterador = 0;
  currentPage!: string;

  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor() { }

  ngOnInit(): void {
    //this.dataSource = this.listaDeProdutos;
    this.pageSize = (this.listaDeProdutos.length < 20)? this.listaDeProdutos.length : 20;
    this.calculatePageArray();
    this.goToFirstPage();
  }

  //Retorna para a página anterior, caso não seja a primeira página
  getPrevPage(): void {
    if(this.pageIterador > 0) {
      this.pageIterador --;
      this.dataSource = this.listaDeProdutos.slice(
        this.pageArray[this.pageIterador].start,
        this.pageArray[this.pageIterador].end
      )
      this.currentPage = `${this.pageArray[this.pageIterador].start + 1} - ${this.pageArray[this.pageIterador].end} de ${this.listaDeProdutos.length}`;
    }
  }

  //Avança a página caso não seja a última página
  getNextPage(): void {
    if(this.pageIterador < this.pageArray.length - 1) {
      this.pageIterador ++;
      this.dataSource = this.listaDeProdutos.slice(
        this.pageArray[this.pageIterador].start,
        this.pageArray[this.pageIterador].end
      );

      this.currentPage = `${this.pageArray[this.pageIterador].start + 1} - ${this.pageArray[this.pageIterador].end} de ${this.listaDeProdutos.length}`;
    }
    
  }

  //Monta um Array de objetos para guardar o início e fim de cada página
  calculatePageArray(): void {
    for(let i = 0; i < this.listaDeProdutos.length; i += this.pageSize) {
      this.pageArray.push({start: i, end: (i + this.pageSize <= this.listaDeProdutos.length)? i + this.pageSize : this.listaDeProdutos.length});
    }
  }

  //Ordena o Array
  sortData(direction: 'asc' | 'desc'): void {
    if(direction === 'asc') {
      this.listaDeProdutos = this.listaDeProdutos.sort(
        (a : any, b: any) => (a.id < b.id) ? -1 : 1 );
    } else {
      this.listaDeProdutos = this.listaDeProdutos.sort( 
        (a : any, b: any) => (a.id > b.id) ? -1 : 1 );
    }

    this.goToFirstPage();
  }

  goToFirstPage() : void {
    this.pageIterador = 0;
      this.dataSource = this.listaDeProdutos.slice(
        this.pageArray[this.pageIterador].start,
        this.pageArray[this.pageIterador].end
      );

      this.currentPage = `${this.pageArray[this.pageIterador].start + 1} - ${this.pageArray[this.pageIterador].end} de ${this.listaDeProdutos.length}`;
  }
}
