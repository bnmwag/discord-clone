'use client';

import { Plus } from 'lucide-react';
import ActionTooltip from '../action-tooltip';
import { useModal } from '@/hooks/use-modal-store';

const NavigationAction: React.FC = () => {
	const { onOpen } = useModal();
	return (
		<div>
			<ActionTooltip label='Create a Server'>
				<button
					className='group flex items-center'
					onClick={() => onOpen('createServer')}
				>
					<div className='flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 overflow-hidden justify-center items-center'>
						<Plus className='group-hover:text-white transition text-emerald-500' />
					</div>
				</button>
			</ActionTooltip>
		</div>
	);
};

export default NavigationAction;
