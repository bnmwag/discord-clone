'use client';

import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import ActionTooltip from '../action-tooltip';
import { cn } from '@/lib/utils';

interface INavigationItemProps {
	id: string;
	imageUrl: string;
	name: string;
}

const NavigationItem: React.FC<INavigationItemProps> = ({
	id,
	imageUrl,
	name,
}) => {
	const router = useRouter();
	const { serverId } = useParams();

	const onClick = () => {
		router.push(`/servers/${id}`);
	};

	return (
		<ActionTooltip side='right' align='center' label={name}>
			<button
				className='group relative flex items-center'
				onClick={onClick}
			>
				<div
					className={cn(
						'absolute left-0 bg-indigo-500 rounded-r-full transition-all w-[4px]',
						serverId !== id && 'group-hover:h-[20px]',
						serverId === id ? 'h-[36px]' : 'h-[8px]'
					)}
				/>
				<div
					className={cn(
						'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-over:rounded-[16px] transition-all overflow-hidden',
						serverId === id &&
							'bg-primary/10 text-primary rounded-[16px] '
					)}
				>
					<Image fill src={imageUrl} alt='Server Image' />
				</div>
			</button>
		</ActionTooltip>
	);
};

export default NavigationItem;
