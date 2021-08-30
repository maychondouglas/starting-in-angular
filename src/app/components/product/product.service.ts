import { catchError, map } from 'rxjs/operators';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


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
  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'OK', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
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
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandle(e))
    );
  }

  errorHandle(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro', true);
    return EMPTY;
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandle(e))
    );
  }

  readById(id: string): Observable<Product> {
    const urlQuery = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(urlQuery).pipe(
      map(obj => obj),
      catchError(e => this.errorHandle(e))
    );
  }

  update(product: Product): Observable<Product> {
    const urlQuery = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(urlQuery, product);
  }

  delete(product: Product): Observable<Product> {
    const urlQuery = `${this.baseUrl}/${product.id}`;
    return this.http.delete<Product>(urlQuery).pipe(
      map(obj => obj),
      catchError(e => this.errorHandle(e))
    );
  }
}
