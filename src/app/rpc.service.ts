import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class RpcService {

  private static _productList: Product[] = [
    { id: 'productID1', name: 'product1', price: 1 },
    { id: 'productID2', name: 'product2', price: 2 },
    { id: 'productID3', name: 'product3', price: 3 },
    { id: 'productID4', name: 'product4', price: 4 },
  ]

  constructor() { }

  public product = {
    get: (id: any): Observable<Product> => {
      return of(RpcService._productList.filter(p => p.id === id)[0] || null);
    },
    list: (): Observable<Product[]> => {
      return of(
        RpcService._productList
      );
    },
    create: (name: any): Observable<string> => {
      const newProduct: Product = { id: 'productID' + (RpcService._productList.length + 1), name, price: 10 };
      RpcService._productList.push(newProduct);
      return of(newProduct.id);
    },
    delete: (id: any): Observable<string> => {
      RpcService._productList = RpcService._productList.filter(p => p.id !== id);
      return of(id);
    },
  };

}
