import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserResponse } from '@app/store/user';
import { NotificationService } from "@app/services";


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  @Output() menuToggle = new EventEmitter();

  @Input() isAuthorized !: boolean | null;
  @Input() user !: UserResponse | null;

  @Output() signOut = new EventEmitter<void>();

  constructor(
    private notification: NotificationService

  ) { }

  ngOnInit(): void {
  }

  closeMenu() : void {
    this.menuToggle.emit();
  }

  onSignOut(): void {
    this.signOut.emit();
    this.notification.error("Sesión cerrada correctamente.");
  }


}
