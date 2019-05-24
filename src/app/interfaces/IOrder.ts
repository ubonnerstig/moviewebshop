import { IOrderItem } from './IOrderItem';

export interface IOrder {
	orderContent: IOrderItem[];
	user: {
		firstName: string;
		lastName: string;
		address: string;
		postal: number;
		city: string;
		email: string;
		paymentMethod: string;
	};
	total: number;
}