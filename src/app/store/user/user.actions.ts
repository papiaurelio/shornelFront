import { Action } from "@ngrx/store";
import {UserResponse, EmailPasswordCredentials, UserCreateRequest} from './user.models';

export enum Types{
  INIT = '[User] Init: Start',
  INIT_AUTHORIZED = '[User] Init: Authorized',
  INIT_UNAAUTHORIZED = '[User] Init: Unauthorized',
  INIT_ERROR = '[User] Init: Error',

  SIGIN_IN_EMAIL = '[User] Login: Start',
  SIGIN_IN_EMAIL_SUCCESS = '[User] Login: Success',
  SIGIN_IN_EMAIL_ERROR = '[User] Login: Error',

  SIGIN_UP_EMAIL = '[User] Sign Up con email: Start',
  SIGIN_UP_EMAIL_SUCCESS = '[User] Sign Up con email: Success',
  SIGIN_UP_EMAIL_ERROR = '[User] Sign Up con email: Error',

  SIGIN_OUT_EMAIL = '[User] Logout: Start',
  SIGIN_OUT_EMAIL_SUCCESS = '[User] Logout: Success',
  SIGIN_OUT_EMAIL_ERROR = '[User] Logout: Error',
}

//INIT
export class Init implements Action{
  readonly type = Types.INIT;
  constructor(){
  }
}

export class InitAuthorized implements Action{
  readonly type = Types.INIT_AUTHORIZED;
  constructor(public id: string, public user: UserResponse | null){
  }
}

export class InitUnauthorized implements Action{
  readonly type = Types.INIT_AUTHORIZED;
  constructor(){
  }
}

export class InitError implements Action{
  readonly type = Types.INIT_AUTHORIZED;
  constructor(error: string){
  }
}


//LOGIN

export class SignInEmail implements Action{
  readonly type = Types.SIGIN_IN_EMAIL;
  constructor(public credentials: EmailPasswordCredentials){
  }
}

export class SignInEmailSuccess implements Action{
  readonly type = Types.SIGIN_IN_EMAIL_SUCCESS;
  constructor(public id: string, public user: UserResponse | null){

  }
}

export class SignInEmailError implements Action{
  readonly type = Types.SIGIN_IN_EMAIL_ERROR;
  constructor(public error: string){

  }
}

//SignUp

export class SignUpEmail implements Action{
  readonly type = Types.SIGIN_UP_EMAIL;
  constructor(public user: UserCreateRequest){

  }
}

export class SignUpEmailSuccess implements Action{
  readonly type = Types.SIGIN_UP_EMAIL_SUCCESS;
  constructor(public id: string, public user: UserResponse | null){

  }
}

export class SignUpEmailError implements Action{
  readonly type = Types.SIGIN_UP_EMAIL_ERROR;
  constructor(public error: string){

  }
}

//Sign Out

export class SignOut implements Action{
  readonly type = Types.SIGIN_OUT_EMAIL;
  constructor(){

  }
}

export class SignOutSuccess implements Action{
  readonly type = Types.SIGIN_OUT_EMAIL_SUCCESS;
  constructor(){

  }
}

export class SignOutError implements Action{
  readonly type = Types.SIGIN_OUT_EMAIL_ERROR;
  constructor(public error: string){

  }
}

export type All =
    Init
    | InitAuthorized
    | InitUnauthorized
    | InitError
    | SignInEmail
    | SignInEmailSuccess
    | SignInEmailError
    | SignUpEmail
    | SignUpEmailSuccess
    | SignUpEmailError
    | SignOut
    | SignOutSuccess
    | SignOutError;
