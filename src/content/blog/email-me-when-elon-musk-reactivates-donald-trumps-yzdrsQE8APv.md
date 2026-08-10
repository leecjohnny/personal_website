---
title: "Email me when Elon Musk reactivates Donald Trump’s Twitter account"
pubDate: 2022-11-20
sourceUrl: "https://johnnyclee.com/i/email-me-when-elon-musk-reactivates-donald-trumps-yzdrsQE8APv/"
---

[![](/assets/archive/item-3a96998e990ead068ef476d925d123c7.png)](/assets/archive/item-3a96998e990ead068ef476d925d123c7.png)

On October 27, 2022, Elon Musk finally became the [new owner of Twitter](https://www.ft.com/content/b429b624-bf82-4ccd-bf69-b75055403952). It was a long six months since he sent Bret Taylor a [letter](https://www.sec.gov/Archives/edgar/data/1418091/000110465922049844/tm2213189d8_ex99-g.htm) with an ultimatum offer of $54.20 per share.

Expecting Mr. Musk to unwind Twitter's moderation policies, I wanted to countdown to when Elon Musk would reactivate Donald Trump’s twitter account after its [deactivation](https://apnews.com/article/election-2020-donald-trump-media-michael-flynn-social-media-f41b11060d7703e3a3136ddb5eefa055) after the January 6 capital insurrection.

I could check the former President’s twitter account manually every day. But this seems like an easier task for a computer to automate.

Normally, an easy way to do this is to setup a cron job and check the Twitter regularly. This time, I decided to try using Cloudflare’s new [Workers](https://blog.cloudflare.com/cloudflare-workers-unleashed/) product, which includes a [cron trigger](https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/) feature, ability to [send e-mails for free](https://blog.cloudflare.com/sending-email-from-workers-with-mailchannels/), and a very generous [free usage tier](https://developers.cloudflare.com/workers/platform/limits/#worker-limits).

It took a tiny bit of doing: getting a Twitter [API](https://developer.twitter.com/en) token and writing some [JavaScript](https://github.com/leecjohnny/is_twitter_user_active/blob/88d75eaa53d548f6b7c072a522afc28ab279b4ed/index.js). The day after the deal closed, I had a Worker setup to check if a Twitter account was active, every 5 minutes. If the account is active, it would e-mail me immediately.

Less than a month later, the e-mail arrived at 8:15pm on a Saturday night.

![](/assets/archive/image-f41c2817f371b8e5b2a37d07241df428.png)

Apparently, 23 minutes earlier at 7:53pm, Mr. Musk [decided](https://twitter.com/elonmusk/status/1594131768298315777) he will reinstate Trump’s account after his public poll.

Curiously, I checked when the news hit the wires. It was a Saturday night, and most wires did not print until a couple hours later.

![](/assets/archive/image-1da49e853c51f9e08daeff45932acaa7.png)
