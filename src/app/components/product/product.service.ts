import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3001/produtos';

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  /**
   * Este método irá mostrar uma mensagem no canto superior direito
   * 
   * tags: mensagem de ok, custom alert 
   */
  showMessage(msg: string): void {
    this.snackBar.open(msg, 'OK', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
  /**
   * Aqui estou criando um método para inserir no backend um produto
   * O retorno do método será um Observable do tipo produto, ou seja, retornará um produto
   * Observable = pra ser observado quando a resposta acontecer
   * 
   * tags: programação reativa, observer, observable, subject
   */
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }
}
