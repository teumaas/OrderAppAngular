import { Category } from './Category.interface';

export interface Product {
    _id?: string;
    name: string;
    brand: string;
    description: string;
    imagePath?: string;
    alcoholPercentage?: number;
    category?: Category;
    price: number;
 }
