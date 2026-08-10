import { Popover } from '@base-ui/react/popover';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

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
				className="share-trigger"
				variant="outline"
				size="sm"
				type="button"
				onClick={shareNatively}
			>
				Share
			</Button>
		);
	}

	return (
		<Popover.Root>
			<Popover.Trigger
				render={
					<Button className="share-trigger" variant="outline" size="sm">
						Share
					</Button>
				}
			/>
			<Popover.Portal>
				<Popover.Positioner
					className="share-positioner"
					positionMethod="fixed"
					side="bottom"
					align="start"
					sideOffset={8}
					collisionPadding={12}
				>
					<Popover.Popup className="share-popover">
						<Popover.Title className="share-popover__title">
							Share this article
						</Popover.Title>
						<Popover.Description className="share-popover__description">
							{title}
						</Popover.Description>
						<div className="share-actions">
							<Button type="button" variant="outline" size="sm" onClick={copyLink}>
								{copied ? 'Copied' : 'Copy link'}
							</Button>
							<a href={xUrl} target="_blank" rel="noreferrer">
								Post to X
							</a>
						</div>
					</Popover.Popup>
				</Popover.Positioner>
			</Popover.Portal>
		</Popover.Root>
	);
}
