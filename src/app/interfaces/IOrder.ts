import { IOrderItem } from './IOrderItem';
import { IUser } from './IUser';

export interface IOrder {
	id: number;
	companyId: number;
	created: string;
	orderRows: IOrderItem[];
	createdBy: string;
	paymentMethod: string;
	status: number;
	totalPrice: number;
}
