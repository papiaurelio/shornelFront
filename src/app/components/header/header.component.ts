import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';

//evento
import { Output, EventEmitter } from '@angular/core';
import { UserResponse } from '@app/store/user';

//para ocultar header llamo a estas clases

import { NotificationService } from "@app/services";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Output() menuCliked = new EventEmitter();

  @Input() isAuthorized !: boolean | null;
  @Input() user !: UserResponse | null;

  @Output() signOut = new EventEmitter<void>();


  currentRoute!: string;

  constructor(
    private notification: NotificationService
  ) {
  }

  ngOnInit(): void {
  }

  onClicked(): void {
    this.menuCliked.emit();
  }
  onSignOut(): void {
    this.signOut.emit();
    this.notification.error("Sesión cerrada correctamente.");
  }

}
