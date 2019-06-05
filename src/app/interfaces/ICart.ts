import { ICartItem } from './ICartItem';

export interface ICart {
	cartItems: ICartItem[];
	totalQty: number;
	totalPrice: number;
}