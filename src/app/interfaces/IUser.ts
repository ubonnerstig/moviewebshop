export interface IUser {
	firstName: string;
	lastName: string;
	address: {
		street: string;
		postal: number;
		city: string;
	};
	email: string;

}