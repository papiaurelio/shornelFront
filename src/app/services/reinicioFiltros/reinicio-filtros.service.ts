import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReinicioFiltrosService {
  private reinicioSubject = new Subject<void>();

  reinicioClicked$ = this.reinicioSubject.asObservable();

  constructor() { }

  emitirReinicio() {
    this.reinicioSubject.next();
  }

}
