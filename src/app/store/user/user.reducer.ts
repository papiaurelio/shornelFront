import {UserResponse} from './user.models';
import * as fromAction from './user.actions';

export interface UserState {
  entity: UserResponse | null;
  id: string | null;
  loading: boolean | null;
  error: string | null;
}

const initialState : UserState = {
  entity: null,
  id: null,
  loading: null,
  error: null
}

export function reducer(state = initialState, action: fromAction.All | any): UserState{

  switch(action.type){

    //init
    case fromAction.Types.INIT:{
      return {...state, loading: true};
    }

    case fromAction.Types.INIT_AUTHORIZED:{
      return {...state, loading: false, entity: action.user, id: action.id, error: null};
    }

    case fromAction.Types.INIT_UNAAUTHORIZED:{
      return {...state, loading: false, entity: null, id: null, error: null};
    }

    case fromAction.Types.INIT_ERROR:{
      return {...state, loading: false, entity: null, id: null, error: action.error};
    }

    //login

    case fromAction.Types.SIGIN_IN_EMAIL:{
      return {...state, loading: true, entity: null, id: null, error: null};
    }

    case fromAction.Types.SIGIN_IN_EMAIL_SUCCESS:{
      return {...state, loading: false, entity: action.user, id: action.id, error: null};
    }

    case fromAction.Types.SIGIN_IN_EMAIL_ERROR:{
      return {...state, loading: false, entity: null, id: null, error: action.error};
    }

    //signUp

    case fromAction.Types.SIGIN_UP_EMAIL:{
      return {...state, loading: true, entity: null, id: null, error: null};
    }

    case fromAction.Types.SIGIN_UP_EMAIL_SUCCESS:{
      return {...state, loading: false, entity: action.user, id: action.id, error: null};
    }

    case fromAction.Types.SIGIN_UP_EMAIL_ERROR:{
      return {...state, loading: false, entity: null, id: null, error: action.error};
    }

    //logOut

    case fromAction.Types.SIGIN_OUT_EMAIL:{
      return {...initialState};
    }

    case fromAction.Types.SIGIN_OUT_EMAIL_SUCCESS:{
      return {...initialState};
    }

    case fromAction.Types.SIGIN_OUT_EMAIL_ERROR:{
      return {...state, loading: false, entity: null, id: null, error: action.error};
    }

    default :{
      return state;
    }

  }
}


