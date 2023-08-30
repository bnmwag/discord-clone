import ChatHeader from '@/components/chat/chat-header';
import ChatInput from '@/components/chat/chat-input';
import ChatMessages from '@/components/chat/chat-messages';
import MediaRoom from '@/components/media-room';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { ChannelType } from '@prisma/client';
import type { NextPage } from 'next';
import { redirect } from 'next/navigation';

interface IChannelIdPageProps {
	params: { serverId: string; channelId: string };
}

const ChannelIdPage: NextPage<IChannelIdPageProps> = async ({ params }) => {
	const profile = await currentProfile();

	if (!profile) return redirectToSignIn();

	const channel = await db.channel.findUnique({
		where: { id: params.channelId },
	});

	const member = await db.member.findFirst({
		where: { serverId: params.serverId, profileId: profile.id },
	});

	if (!channel || !member) return redirect('/');

	return (
		<div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
			<ChatHeader
				serverId={params.serverId}
				name={channel.name}
				type='channel'
			/>
			{channel.type === ChannelType.TEXT && (
				<>
					<ChatMessages
						member={member}
						name={channel.name}
						type='channel'
						apiUrl='/api/messages'
						socketUrl='/api/socket/messages'
						socketQuery={{
							serverId: channel.serverId,
							channelId: channel.id,
						}}
						chatId={channel.id}
						paramKey='channelId'
						paramValue={channel.id}
					/>
					<ChatInput
						name={channel.name}
						type='channel'
						apiUrl='/api/socket/messages'
						query={{
							serverId: channel.serverId,
							channelId: channel.id,
						}}
					/>
				</>
			)}
			{channel.type === ChannelType.AUDIO && (
				<MediaRoom chatId={channel.id} video={false} audio={true} />
			)}
			{channel.type === ChannelType.VIDEO && (
				<MediaRoom chatId={channel.id} video={true} audio={true} />
			)}
		</div>
	);
};

export default ChannelIdPage;
