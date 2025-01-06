import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../store/list';
import { UserResponse } from '@app/store/user';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() products !: Product[]

  @Input() user !: UserResponse | null;

  constructor() { }

  ngOnInit(): void {
  }


}
