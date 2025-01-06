
import { Action } from "@ngrx/store";
import { ProductForm } from "./form.models";

export enum Types {
  SET = '[Product] [Form] Set',
  UPDATE = '[Product] [Form] Update',
  CLEAR = '[Product] [Form] Clear',
}


export class Set implements Action {
  readonly type = Types.SET;
  constructor(public form: ProductForm){}
}

export class Update implements Action {
  readonly type = Types.UPDATE;
  constructor(public changes: Partial<ProductForm>){}
}

export class Clear implements Action {
  readonly type = Types.CLEAR;
  constructor(){}
}

export type All = Set | Update | Clear;
