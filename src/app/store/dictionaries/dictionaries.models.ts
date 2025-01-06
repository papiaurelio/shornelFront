import {Item, ControlItem, Icon} from '@app/models/frontend';
export {Item, ControlItem} from '@app/models/frontend';


export interface Dictionaries{
  categoria : Dictionary,
  marca : Dictionary
}

export interface Dictionary{
  items: Item[];
  controlItems: ControlItem[];
}


