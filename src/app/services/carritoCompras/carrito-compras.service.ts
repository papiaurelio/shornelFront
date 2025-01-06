import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarritoCompra } from '@app/models/backend';
import { ItemCarrito } from '@app/models/backend';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CarritoComprasService {
  private apiUrl = 'https://www.shornel.somee.com/api/carritocompra';
  private apiUrl2 = 'https://www.shornel.somee.com/api/ordencompra';

  constructor(private http: HttpClient) {}

  getCarritoCompra(): Observable<CarritoCompra> {
    return this.http.get<CarritoCompra>(this.apiUrl);
  }


  getCarritoCompra2(): Observable<ItemCarrito[]> {
    return this.http.get<{ items: ItemCarrito[] }>(this.apiUrl)
      .pipe(
        map(response => response.items) // Extrae solo la propiedad 'items' del objeto de respuesta
      );
  }

  agregarAlCarrito(items: ItemCarrito[]): Observable<any> {
    return this.http.post<any>(this.apiUrl, { items });
  }

  eliminarDelCarrito(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}`);
  }

  realizarCompra(envio: boolean): Observable<any> {
    const body = { Envio: envio };
    return this.http.post(this.apiUrl2, body);
  }
}
