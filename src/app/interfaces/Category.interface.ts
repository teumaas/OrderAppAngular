import { Product } from './Product.interface';

export interface Category {
    _id?: string;
    title?: string;
    product?: Product;
    imagePath?: string;
 }
