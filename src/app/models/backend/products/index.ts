export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  stock: number;
  marcaId: number;
  marcaNombre: string;
  categoriaId: number;
  categoriaNombre: string;
  precio: number;
  imagen: string;
}


export interface Item {
  id: number | null ;
  nombreProducto: string;
  precio: number;
  cantidad: number;
  imagen: string;
  marca: string;
  categoria: string;
}

export interface CarritoCompra {
  id: string;
  items: Item[];
}


export interface ItemCarrito {
  Id: number | undefined | null; // Asegúrate de usar el mismo nombre que recibes del servidor
  producto: string; // Asegúrate de usar el mismo nombre que recibes del servidor
  precio: number;
  cantidad: number;
  imagen: string;
  marca: string;
  categoria: string;
}


export interface OrderItem {
  productoId: number;
  productoName: string;
  productoImagen: string;
  precio: number;
  cantidad: number;
}

export interface Order {
  id: string;
  correoComprador: string;
  fechaOrdenCompra: string;
  envio: boolean;
  orderItems: OrderItem[];
  subTotal: number;
  total: number;
  status: string;
}
