import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {Order } from '@app/models/backend';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://www.shornel.somee.com/api/ordencompra';

  constructor(private http: HttpClient) { }

  obtenerOrdenesCompra(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/my-orders`);
  }
}
