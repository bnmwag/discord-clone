'use client';

import { useModal } from '@/hooks/use-modal-store';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import { useState } from 'react';
import axios from 'axios';

export const InviteModal = () => {
	const { onOpen, isOpen, onClose, type, data } = useModal();
	const origin = useOrigin();

	const isModalOpen = isOpen && type === 'invite';
	const { server } = data;

	const [copied, setCopied] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

	const onCopy = () => {
		navigator.clipboard.writeText(inviteUrl);
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 1000);
	};

	const onNew = async () => {
		try {
			setIsLoading(true);

			const res = await axios.patch(
				`/api/servers/${server?.id}/invite-code`
			);

			onOpen('invite', { server: res.data });
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className='bg-white p-0 text-black overflow-hidden'>
				<DialogHeader className='pt-8 px-6'>
					<DialogTitle className='text-center text-2xl font-bold'>
						Invite Friends
					</DialogTitle>
				</DialogHeader>
				<div className='p-6'>
					<Label className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
						Server Invite Link
					</Label>
					<div className='flex items-center mt-2 gap-x-2'>
						<Input
							className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
							value={inviteUrl}
							disabled={isLoading}
						/>
						<Button
							size={'icon'}
							onClick={onCopy}
							disabled={isLoading}
						>
							{copied ? (
								<Check className='h-4 w-4' />
							) : (
								<Copy className='h-4 w-4' />
							)}
						</Button>
					</div>
					<Button
						variant={'link'}
						size={'sm'}
						onClick={onNew}
						disabled={isLoading}
						className='text-xs text-zinc-500 mt-4'
					>
						Generate a new link
						<RefreshCw className='h-4 w-4 ml-2' />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
