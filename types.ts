import { Server as NetServer, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as ServerIo } from 'socket.io';
import { Member, Message, Profile, Server } from '@prisma/client';

export type ServerWithMembersWithProfile = Server & {
	members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
	socket: Socket & { server: NetServer & { io: ServerIo } };
};

export type MessageWithMemberWithProfile = Message & {
	member: Member & { profile: Profile };
};
