import { Component, OnInit } from '@angular/core';
import {Order } from '@app/models/backend';
import { OrderService } from '@app/services/order/order.service';


@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {

  orders: Order[] = [];

  constructor(private _orderComprasSevices: OrderService) { }

  ngOnInit(): void {
    this._orderComprasSevices.obtenerOrdenesCompra().subscribe(
      datos => {
        this.orders = datos;
      },
      error => {
        console.error('Error al obtener las órdenes de compra:', error);
      }
    );
  }

}
