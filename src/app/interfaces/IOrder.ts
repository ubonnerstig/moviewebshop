import { IOrderItem } from './IOrderItem';

export interface IOrder {
	id: number;
	companyId: number;
	created: string;
	orderRows: IOrderItem[];
	createdBy: string;
	// {
	// 	firstName: string;
	// 	lastName: string;
	// 	address: {
	// 		street: string;
	// 		postal: number;
	// 		city: string;
	// 	};
	// 	email: string;
	// };
	paymentMethod: string;
	status: number;
	totalPrice: number;
}
