'use client';

import { useEffect, useState } from 'react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';
import { Channel } from '@prisma/client';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

interface IMediaRoomProps {
	chatId: string;
	video: boolean;
	audio: boolean;
}

const MediaRoom: React.FC<IMediaRoomProps> = ({ chatId, video, audio }) => {
	const { user } = useUser();
	const [token, setToken] = useState('');

	useEffect(() => {
		if (!user?.firstName || !user?.lastName) return;

		const name = `${user.firstName} ${user.lastName}`;

		(async () => {
			try {
				const res = await fetch(
					`/api/livekit?room=${chatId}&username=${name}`
				);
				const data = await res.json();
				setToken(data.token);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [chatId, user?.firstName, user?.lastName]);

	if (!token)
		return (
			<div className='flex flex-col items-center justify-center'>
				<Loader2 className='animate-spin h-7 w-7 text-zinc-500 py-4' />
				<p className='text-zinc-500 dark:text-zinc-400 text-xs'>
					Loading...
				</p>
			</div>
		);

	return (
		<LiveKitRoom
			token={token}
			data-lk-theme='default'
			serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
			connect={true}
			video={video}
			audio={audio}
		>
			<VideoConference />
		</LiveKitRoom>
	);
};

export default MediaRoom;
