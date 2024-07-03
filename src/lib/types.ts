export interface Room {
	name: string;
	is_private: boolean;
	password: string;
	max_participants: number;
}

export interface RoomQuery {
	name: string;
	password: string;
}

export interface Message {
	content: string;
	sender: string;
}