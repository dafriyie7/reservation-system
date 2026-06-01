export enum Role {
	USER = "USER",
	ADMIN = "ADMIN"
}

// export user type
export type User = {
	name?: string;
	username?: string;
	email: string;
	password?: string;
	role: Role
};
