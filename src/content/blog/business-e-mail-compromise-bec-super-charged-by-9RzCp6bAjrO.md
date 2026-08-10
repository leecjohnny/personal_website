---
title: "Business e-mail compromise (BEC): Super-charged by generative AI technologies"
pubDate: 2023-03-10
sourceUrl: "https://johnnyclee.com/i/business-e-mail-compromise-bec-super-charged-by-9RzCp6bAjrO/"
---

[![](/assets/archive/item-7762a9e1c5fe59058e71218b37623132.jpg)](/assets/archive/item-7762a9e1c5fe59058e71218b37623132.jpg)

**1. Background**

Generative AI is the buzzword for a category of machine learning technology made popular by OpenAI’s ChatGPT[1]. This category of technology will only continue to improve in the next few months and years. Compared to 2020, venture capital investment into generative AI had increased 425% in 2022[2]. Similarly, tech giants—both software and chip makers—are accelerating investments to meet and supply newfound demand in generative AI[3].

This brief provides Finance and IT leadership a review of new technologies, and an addendum to existing guidance to mitigate business e-mail compromises (BEC) within the enterprise.

**2. BEC overview**

Business e-mail compromises (BEC) is a type of financial internet crime. Criminals target businesses and individuals to steal funds, personal information, and/or merchandise. In the FBI’s 2021 report, BEC was most reported and financially damaging internet crime[4]. Compared to ransomware attacks, BEC attacks are much less technical in nature and focuses on using social engineering to obtain information and manipulate the victim.

Victims usually receive e-mail requests that appear to be legitimate from a known source (i.e., a vendor, a C-level executive, a financial firm). Using social manipulation and/or malware, criminals direct victims to transfer funds, provide or change information—ultimately resulting in a theft.

Common timeline of the attacker’s lifecycle:

1. Identify valuable targets by building profiles from open and stolen data sources.
2. Obtain initial access by establishing contact with a victim using an e-mail request from a seemingly legitimate source. Criminals can leverage previous BEC’s to increase the personalization of the e-mail request to trick the victim.
3. Escalate access by manipulating the victim and/or deploying malware to obtain private financial or personal information.
4. Exfiltrate funds or information to the criminal’s control.
5. Steps 3-4 can repeat until the victim detects and realizes fraudulent intent.

Here are some real-life scenarios of BEC:

- A vendor (compromised e-mail account) requests payment for an invoice.
- An internal executive (compromised) requests gift cards for a customer meeting.
- A real estate title company (compromised) requests wire transfer to complete a sale.
- A customer (compromised) requests updates to the shipping address of an existing order.

**3. Hypothetical applications of generative AI in BEC**

BEC attacks primarily target the human victim[5]. The attack can be much more effective if the attacker is able to create hyper personalized or deep-faked content to trick the victim in providing access.

Creating personalized content had been historically costly. Costs reduce the ROI for the attacker. However, generative AI tools greatly lowers the costs and thus the barrier to entry for attackers to generate hyper personalized content.

While BEC is primarily initiated through e-mail, the attacker can persist and escalate through other means of communications, like phone calls or virtual meeting software[6]. This expands communication mediums beyond text (e-mail) to other common virtual communication mediums (audio and video).

**3.1 Text generation**

Text generation, via chatbots like ChatGPT[7], is the most common application of generative AI. Using a templatized prompt, attackers can use a ChatGPT-like service to craft a simple phishing e-mail, or to craft personalized responses in an e-mail thread. These services are currently free or at very low cost.

Hypothetical usage in BEC flow:

Text generation can be used to both read and write in the highlighted steps, effectively enabling near-complete automation of the BEC attack cycle without a human in the loop.

1. Attacker identifies target, crafts and send personalized e-mail from target information.
2. Victim responds to e-mail.
3. Attacker reads victim’s response, crafts and send reply to continue BEC attempt.
4. Steps 2 and 3 continues until either victim detects BEC or the attacker successfully exfiltrates information or funds.

While ChatGPT may be a commercial service, similar large language models (LLMs) that provide the underlying machine learning model have already been leaked to the public[8]. A mature attacker can re-use the leaked model on owned commercial hardware without limits.

**3.2 Audio generation**

Audio generation, via services like ElevenLabs[9], is a more recent application of generative AI. Using a short vocal audio sample, ElevenLabs can convert text to speech that mimics closely the voice sample.

Deepfake voices and calls have already led to phone scams[10], doxing and harassment[11], and bypassing of banks’ voice biometrics authentication systems[12]. The costs of using the services are minimal (less than $100/mo.).

While BEC’s generally begin with an e-mail, audio generation can be integrated to increase the attacker’s effectiveness at tricking the target.

**3.3 Image and video generation**

The last of the virtual communication mediums include images and videos. As videos are a combination of images (frames) and audio, it can also be thought of a combination of mediums.

Image generation is the most openly available for exploitation by attackers, compared to text and audio generation. Stable Diffusion’s image generation model is completely open source[13]. The model can be adjusted to run on consumer-grade hardware like a simple iPhone[14].

Combining image and audio generation, services—like Synthesia[15]—can create professional production quality videos using an AI-generated human. Because of its professional quality, the services are already being used to spread news disinformation[16].

Again, image and video generation can be integrated to increase the BEC attacker’s effectiveness at tricking the target. In 2021, the FBI issued an alert cautioning security professionals about the definite threat of synthetic content[17].

**3.4 Integrated applications**

The capabilities of text generation in section 3.1 will likely lower the cost of BEC attackers through automation. The integrated application of text, image, voice, and video generation services will likely greatly enhance a BEC attacker’s ability to fool a victim.

This is one example of an integrated application of generative AI technologies to potentially bolster a BEC attacker’s effectiveness.

Hypothetical integrated application in BEC flow:

Premise: Attacker pretends be a high-level executive to have met a key customer at a conference, requests an urgent refund of a recent mistaken purchase order.

1. Attacker identifies target, crafts personalized e-mail from target information, delays sending e-mail.
2. Attacker calls the target using an AI-generated voice to mimic the trusted source, instructing the target to wait for an e-mail with the request and the customer’s business card.
3. Attacker sends the initial e-mail, including an AI-generated photo of the customer’s business card.
4. Victim responds to e-mail.
5. Attacker reads victim’s response, crafts and send reply to continue BEC attempt.
6. Steps 4 and 5 continues until either victim detects BEC or the attacker successfully exfiltrates information or funds.

**4. Mitigations**

Enterprises should continue to follow well established guidelines to prevent and deter BEC attacks, such as guidance from the FBI[18]. Here are some of those mitigation tactics, including some tailored against synthetic content from generative AI technologies.

**4.1 Education**

1. **Remind business users of common phishing e-mail best practices.**Do not open attachments or click on links from suspicious e-mails. Do not provide personal or private information to unknown sources. Request transfer of private or sensitive information through a secondary trusted channel (separate from the request). Carefully inspect the sender’s contact information. Independently verify the sender’s contact information from a secondary trusted source, and re-initiate contact using the verified information.
2. **Educate users about examples of generated text, audio, image, and video content.**Teach users to spot generated content. Text content may be overtly verbose or not in the common tone. Visually inspect images and videos for noticeable distortions not found in real content. Audio content may be overly robotic or unable to express spontaneous emotions (i.e., laughter or attitude).

**4.2 Technology**

1. **Enable anti-phishing and anti-spoofing security measures in your e-mail system**. Highlight external or unknown senders. Filter known or likely phishing e-mail messages. Enable users to report phishing attempts through e-mail system.
2. **Enable multi-factor authentication to access corporate e-mail anywhere.**Prevent legacy e-mail clients from bypassing multi-factor methods. Monitor e-mail access from unfamiliar network origins.
3. **Enable automated mock phishing e-mail campaigns against e-mail users.** Send mock safe phishing e-mails to business users. Record and report on users’ engagement on mock e-mails for increased risk-based trainings.
4. **Enable internet scanning measures to regularly scan the known internet for company information and personnel information.** Alert security teams about exploitable public profiles of company personnel available on the internet.

**4.3 Process**

1. **Create policies and controls, subject to audit, to authenticate all the identities of all parties in company communications.** For e-mail, establish a method for users to validate the e-mail address of a contact in a trusted system. For calls, establish a method of initiating contact using verified phone numbers only.
2. **Create policies and controls, subject to audit, to authenticate requests for sensitive information.** If possible, engage more than one individual in the process.For funds, ensure transfers are only conducted via trusted channels, and exceptions must be reviewed by management. For sensitive information (i.e., personal or financial information), ensure information only flow within company networks under access controls, and external transmissions must be reviewed by management.
3. **Create policies and controls, subject to audit, to require key customers and vendors to adopt common cybersecurity standards.**BECs often originate from trusted sources that have been comprised by BEC attackers. To increase BEC attackers’ costs of finding compromised e-mail accounts, additional cybersecurity safeguards should be added as part of existing purchasing and customer onboarding processes. If a vendor or customer is required to adopt multi-factor authentication for their e-mail systems, this greatly reduces the technical possibility of e-mail comprise.

**5. Conclusions**

Business e-mail compromise attacks are likely to increase in scale and sophistication from the widespread low-cost availability of generative AI technologies. BEC attacks can expand beyond e-mail mediums to include audio, video, and images using synthetically generated content from these technologies.

Leaders of Finance and IT organizations should stay up to date of the latest capabilities of these technologies. Educate your direct reports and organizations about the capabilities of generative AI and make necessary adjustments to existing policies to mitigate risks to BEC.

[1] [https://www.wsj.com/articles/chatgpt-ai-chatbot-app-explained-11675865177](https://www.wsj.com/articles/chatgpt-ai-chatbot-app-explained-11675865177)

[2] [https://www.ft.com/content/9c5f7154-5222-4be3-a6a9-f23879fd0d6a](https://www.ft.com/content/9c5f7154-5222-4be3-a6a9-f23879fd0d6a)

[3] [https://www.wsj.com/articles/tech-giants-are-chipping-in-fast-on-ai-8899208](https://www.wsj.com/articles/tech-giants-are-chipping-in-fast-on-ai-8899208)

[4] [https://www.ic3.gov/Media/PDF/AnnualReport/2021_IC3Report.pdf](https://www.ic3.gov/Media/PDF/AnnualReport/2021_IC3Report.pdf)

[5] [https://www.rsaconference.com/Library/presentation/USA/2022/BEC%20%20Ransomware%20Two%20Sides%20of%20the%20Same%20Cybercrime%20Coin](https://www.rsaconference.com/Library/presentation/USA/2022/BEC%20%20Ransomware%20Two%20Sides%20of%20the%20Same%20Cybercrime%20Coin)

[6] [https://www.ic3.gov/Media/Y2022/PSA220216](https://www.ic3.gov/Media/Y2022/PSA220216)

[7] [https://chat.openai.com/](https://chat.openai.com/)

[8] [https://www.theverge.com/2023/3/8/23629362/meta-ai-language-model-llama-leak-online-misuse](https://www.theverge.com/2023/3/8/23629362/meta-ai-language-model-llama-leak-online-misuse)

[9] [https://elevenlabs.io](https://elevenlabs.io/)

[10] [https://www.washingtonpost.com/technology/2023/03/05/ai-voice-scam/](https://www.washingtonpost.com/technology/2023/03/05/ai-voice-scam/)

[11] [https://www.vice.com/en/article/93axnd/voice-actors-doxed-with-ai-voices-on-twitter](https://www.vice.com/en/article/93axnd/voice-actors-doxed-with-ai-voices-on-twitter)

[12] [https://www.vice.com/en/article/dy7axa/how-i-broke-into-a-bank-account-with-an-ai-generated-voice](https://www.vice.com/en/article/dy7axa/how-i-broke-into-a-bank-account-with-an-ai-generated-voice)

[13] [https://github.com/Stability-AI/stablediffusion](https://github.com/Stability-AI/stablediffusion)

[14] [https://arstechnica.com/information-technology/2022/11/stable-diffusion-in-your-pocket-draw-things-brings-ai-images-to-iphone/](https://arstechnica.com/information-technology/2022/11/stable-diffusion-in-your-pocket-draw-things-brings-ai-images-to-iphone/)

[15] [https://www.synthesia.io](https://www.synthesia.io/)

[16] [https://www.nytimes.com/2023/02/07/technology/artificial-intelligence-training-deepfake.html](https://www.nytimes.com/2023/02/07/technology/artificial-intelligence-training-deepfake.html)

[17] [https://www.lawfareblog.com/fbi-warns-deepfakes-will-be-used-increasingly-foreign-influence-operations](https://www.lawfareblog.com/fbi-warns-deepfakes-will-be-used-increasingly-foreign-influence-operations)

[18] [https://www.fbi.gov/file-repository/email-compromise_508.pdf/view](https://www.fbi.gov/file-repository/email-compromise_508.pdf/view)
