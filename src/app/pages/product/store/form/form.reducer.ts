import { ProductForm } from "./form.models";
import * as fromActions from './form.actions';

export type FormState = ProductForm;

const initialState: FormState = {
  nombre: null,
  descripcion: null,
  categoria: null,
  marca: null,
  photoURL: null,
  precio: null,
  stock: null
}

export function reducer(state = initialState, action: fromActions.All | any): FormState {

  switch (action.type) {
    case fromActions.Types.SET: {
      return { ...state, ...action.form }
    }

    case fromActions.Types.UPDATE: {
      return { ...state, ...action.changes }
    }

    case fromActions.Types.CLEAR: {
      return { ...initialState }
    }

    default: {
      return state;
    }

  }


}
