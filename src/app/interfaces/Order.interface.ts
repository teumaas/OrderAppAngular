import { Product } from './Product.interface';

export interface Order {
    _id?: string;
    product?: Product;
    table?: string;
 }
