
import { Component, OnInit } from '@angular/core';
import { CarritoCompra } from '@app/models/backend';
import { NotificationService } from '@app/services';
import { UserService } from '@app/services/Users/user.service';
import { CarritoComprasService } from '@app/services/carritoCompras/carrito-compras.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.scss']
})
export class CarritoComprasComponent implements OnInit {

  user$!: Observable<any>; // Ajusta el tipo según tu definición real
  isAuthorized$!: Observable<boolean>;


  loading: boolean = true;
  carritoCompra!: CarritoCompra;
  totalPrice: number = 0;
  subtotalPrice: number = 0;
  impuestos: number = 0;

  constructor(private carritoCompraService: CarritoComprasService,
    private userService: UserService,
    private _notification: NotificationService
  ) {}

  cargarCarrito(): void {
    this.carritoCompraService.getCarritoCompra().subscribe(data => {
      this.loading = false;
      this.carritoCompra = data;
      this.calculateTotalPrice();
      this.calculateSubtotalPrice();;
    },   (error) => {
      this.loading = false; // Establecer loading a false en caso de error
    });
  }

  calculateTotalPrice(): void {
    // Calcula el precio total actual del carrito de compras
    this.totalPrice = this.carritoCompra?.items.reduce((acc: number, item: any) => acc + (item.precio * item.cantidad), 0) ?? 0;

    // Calcula el 15% del totalPrice
    const porcentaje = 0.15;
    this.impuestos = this.totalPrice * porcentaje;

    // Suma el 15% al totalPrice
    this.totalPrice += this.impuestos;
  }


  calculateSubtotalPrice(): void {
    this.subtotalPrice = parseFloat((this.totalPrice- this.impuestos).toFixed(2));
  }


  ngOnInit(): void {
    this.cargarCarrito();
    this.user$ = this.userService.user$;
    this.isAuthorized$ = this.userService.isAuthorized$;
  }

  deteteCarrito(){
    this.carritoCompraService.eliminarDelCarrito()
      .subscribe(
        response => {
          this._notification.error('Producto eliminado del carrito.');
          this.cargarCarrito();
          // Aquí podrías actualizar la lista de items en el carrito actual
        },
        error => {
          this._notification.error('Error.');
        }
      );
  }

  realizarCompra(){

    this.carritoCompraService.realizarCompra(false).subscribe(
      response => {
        this._notification.success('Compra realizada correctamente.');
        this.cargarCarrito();
      },
      error => {
        this._notification.error('Ocurrió un error en la compra.');
      }
    );

  }

}
