export enum Role {
	USER = "USER",
	ADMIN = "ADMIN"
}

// export user type
export type User = {
	id: number;
	name: string | undefined;
	username: string | undefined;
	email: string;
	password: string | undefined;
	role: Role
};
