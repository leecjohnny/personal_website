import { useEffect, useState } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from '@/components/ui/popover';

type Props = {
	title: string;
	url: string;
};

export default function SharePopover({ title, url }: Props) {
	const [copied, setCopied] = useState(false);
	const [useNativeShare, setUseNativeShare] = useState(false);
	const xUrl =
		'https://x.com/intent/post?text=' +
		encodeURIComponent(title) +
		'&url=' +
		encodeURIComponent(url);

	useEffect(() => {
		const mobileViewport = window.matchMedia(
			'(max-width: 767px), (pointer: coarse)',
		);
		setUseNativeShare(
			mobileViewport.matches && typeof navigator.share === 'function',
		);
	}, []);

	async function copyLink() {
		await navigator.clipboard.writeText(url);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1800);
	}

	async function shareNatively() {
		try {
			await navigator.share({ title, url });
		} catch (error) {
			if (!(error instanceof DOMException && error.name === 'AbortError')) {
				setUseNativeShare(false);
			}
		}
	}

	if (useNativeShare) {
		return (
			<Button
				className="min-h-11 sm:min-h-8"
				variant="outline"
				type="button"
				onClick={shareNatively}
			>
				Share
			</Button>
		);
	}

	return (
		<Popover>
			<PopoverTrigger
				render={<Button className="min-h-11 sm:min-h-8" variant="outline" />}
			>
				Share
			</PopoverTrigger>
			<PopoverContent
				align="start"
				side="bottom"
				sideOffset={8}
				className="w-[min(18rem,calc(100vw-2rem))]"
			>
				<PopoverHeader>
					<PopoverTitle>Share this article</PopoverTitle>
					<PopoverDescription>{title}</PopoverDescription>
				</PopoverHeader>
				<div className="flex flex-wrap gap-2">
					<Button
						className="min-h-11 sm:min-h-7"
						type="button"
						variant="outline"
						size="sm"
						onClick={copyLink}
					>
						{copied ? 'Copied' : 'Copy link'}
					</Button>
					<a
						data-slot="button"
						className={buttonVariants({
							variant: 'outline',
							size: 'sm',
							className: 'min-h-11 sm:min-h-7',
						})}
						href={xUrl}
						target="_blank"
						rel="noreferrer"
					>
						Post to X
					</a>
				</div>
			</PopoverContent>
		</Popover>
	);
}
