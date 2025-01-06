import {Product} from '@app/models/backend/products';
export {Product as ProductResponse} from '@app/models/backend/products';

export type ProductCreateRequest = Omit<Product, 'id' | 'categoriaNombre' | 'marcaNombre'>;

export type ProductUpdateRequest = Omit<Product, 'categoriaNombre' | 'marcaNombre'>;



