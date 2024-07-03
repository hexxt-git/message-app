export interface Room {
	name: string;
	is_private: boolean;
	password: string;
}

export interface RoomQuery {
	name: string;
	password: string;
}

export interface User {
	name: string;
	room: RoomQuery;
}

export interface Message {
	content: string;
	sender: string;
}
