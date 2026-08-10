import { Popover } from '@base-ui/react/popover';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

type Props = {
	title: string;
	url: string;
};

export default function SharePopover({ title, url }: Props) {
	const [copied, setCopied] = useState(false);
	const xUrl =
		'https://x.com/intent/post?text=' +
		encodeURIComponent(title) +
		'&url=' +
		encodeURIComponent(url);

	async function copyLink() {
		await navigator.clipboard.writeText(url);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1800);
	}

	return (
		<Popover.Root>
			<Popover.Trigger
				render={<Button variant="outline" size="sm">Share</Button>}
			/>
			<Popover.Portal>
				<Popover.Positioner sideOffset={8}>
					<Popover.Popup className="share-popover">
						<Popover.Title>Share this article</Popover.Title>
						<Popover.Description>{title}</Popover.Description>
						<div className="share-actions">
							<button type="button" onClick={copyLink}>
								{copied ? 'Copied' : 'Copy link'}
							</button>
							<a href={xUrl} target="_blank" rel="noreferrer">Post to X</a>
						</div>
					</Popover.Popup>
				</Popover.Positioner>
			</Popover.Portal>
		</Popover.Root>
	);
}
