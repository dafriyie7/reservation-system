export enum TicketStatus {
	RESERVED = "RESERVED",
	PAID = "PAID",
	CANCELLED = "CANCELLED",
	USED = "USED",
}

export type Ticket = {
	status: TicketStatus;
	userId?: string;
	paidAt: Date;
};
