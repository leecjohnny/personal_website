---
title: "Embracing the new era of computing, communication ... and energy"
pubDate: 2025-01-23
sourceUrl: "https://johnnyclee.com/i/embracing-the-new-era-of-computing-communication-EFlLO18J4MF/"
---

> We're still in punchcard era of LLMs, designing prompts, copy pasting context around, hitting go, reading the thing, prompting occasionally. Pretty lame. If there are fewer than a few thousand tok/s of sustained throughput generated on my behalf do we even have AI

- [Andrej Karpathy](https://x.com/karpathy/status/1878896895839642040)

## Making it easier to communicate -- Attention

If we take a short journey back in time, generative AI (LLMs, diffusion models, etc..) started to emerge in the late 2010's, primarily driven by the clever introduction of attention into existing neural network architectures.

At the time in 2014, researchers were still trying to make deep learning work for [machine](https://arxiv.org/abs/1409.0473) [translation](https://arxiv.org/pdf/1409.3215). Ultimately, attention was a clever mechanism to help models adopt a method of communication between parts of a sequence (whether its nodes within the same vector i.e. self-attention, or nodes across different vectors i.e. cross-attention, etc...). Since 2017 transformers formally appeared as a new neural network architecture, it has transformed into a powerful tool partially because it was possible to parallelize the computation of attention across the modern computing accelerators (GPUs, TPUs). Then, it was possible to make bigger models, and train them on more data... i.e. scaling pre-training.

Scaling large language models was a slow start and took almost half a decade: the GPT's (1-3), BERT, T5, LaMDA, PaLM, etc... from [2018 to 2022](https://epoch.ai/data/large-scale-ai-models).

But progress has been tremendous, and the quality of models has improved dramatically from new entrants and incumbents alike: GPT-4, GPT-4o, Claude, Gemini, Llama, Mistral, Cohere, Qwen, DeepSeek, O1, etc... until today.

## Measuring progress, the year of benchmarks and evals

In addition to the cost of inference, measuring progress is becoming more difficult as the models are getting better and better and beating many contemporary benchmarks.

To measure a model's ability to reason with acquired knowledge from training, [MMLU](https://arxiv.org/abs/2009.03300) was released in 202. In 2024, models were reaching 90+% on MMLU. In 2024, [MMLU Pro](https://arxiv.org/abs/2406.01574) was released to provide more difficult tasks, and in early 2025, models were already scoring 80+% on MMLU Pro.

For coding and software engineering, [SWE-bench](https://www.swebench.com/) was released as realistic real world software engineering tasks in 2024, and in early 2025, models were already scoring 70+% on SWE-bench.

Leading AI labs have always been transparent about engaging the community to create new novel benchmarks/evals to evaluate their models. Recently, some of these labs have been criticized for waiting to disclose [funding](https://techcrunch.com/2025/01/19/ai-benchmarking-organization-criticized-for-waiting-to-disclose-funding-from-openai/) to fund new benchmarks. Personally, I doubt there was any bad intent.

It's clear that existing benchmarks are being saturated. Progress is increasingly subjective to the type of task and domain. 2025 will be the year of evals; perhaps new standards and systematic methods will emerge between the labs and the community.

## Curse of success -- scaling inference supply to meet demand vs. research progress

Frontier AI labs have had tremendous success in distributing their models to the public. OpenAI [expects](https://www.nytimes.com/2024/09/27/technology/openai-chatgpt-investors-funding.html) $3.7B and $11.6B in sales in 2024 and 2025. Azure, AWS, GCP, Oracle Cloud, and others had fantastic AI-driven tailwinds in their cloud computing businesses [1].

For research organizations like OpenAI, there is a rising [tension](https://www.wsj.com/tech/ai/open-ai-division-for-profit-da26c24b) between compute for inference vs. compute for research.

At the same time, the cost of measuring progress is becoming more difficult--and costly. At the end of 2024, for the o3 model's ARC benchmark, OpenAI spent at least $1M-2M [2] to run a single [benchmark](https://arcprize.org/blog/oai-o3-pub-breakthrough#:~:text=The%20amount%20of%20compute%20was%20roughly%20172x%20the%20low%2Dcompute%20configuration.) (once!).

Through model development, it's understood as a training run progresses, evals are run at intervals to measure progress of training. If we assumed that while training o3, it took 5 ablation experiments, for each experiment it took the equivalent of 10,000 training steps. Then, if the ARC benchmark was run at every 1,000 step, then it would have run 5 x 10 = 50 times. 50 x $1.5M is $75M (!!). While this is pure speculation in the details, it's a good proxy to understand the cost of measuring progress. For $75M (which is some X% of the cost of o3 development cost, as it **does not** include GPU hours for **training** the model), one can train a GPT-2 class (circa 2019 generation LLM) model ~110,000 times [3].

Yet, there's a lot of research progress to be excited about.

### Progressing transformer architectures

Simply within the transformer architecture, DeepSeek's developments mostly from DeepSeek ([V3](https://arxiv.org/abs/2412.19437) and [R1](https://github.com/deepseek-ai/DeepSeek-R1/blob/main/DeepSeek_R1.pdf)) in MLA (new form of attention), MoE routing without auxiliary loss (taking inspiration to allow models to learn routing vs. heuristics), multi token prediction (incorporating the insights from speculative decoding), RL pipeline for reasoning with R1 (progressing to the first open source test-time compute frontier class model) show that a small team that's not distracted with inference demands can accelerate the rate of experimentation from ideas [4]. Their DualPipe distributed training improvement shows GPU continued algorithmic improvements in resource allocation/scheduling to maximize hardware use (they also made other clever adaptations like FP8 mixed precision to reduce memory use, as H800 has lower memory resources).

Meta's findings with [byte latent transformer](https://arxiv.org/abs/2412.09871) shows that there may be a path away from fixed tokenizers and vocabs and they can be learned. Tokenizers can be blamed for a lot of problems with LLMs (i.e. the infamous how many R's are in the strawberry question). This could also provide a path to consume more data in training without using heuristics to pre-process data into sequences.

DeepSeek's models and Meta's Llama both acknowledge using the previous generation's model to generate data to progress to the next generation of models, signs of compounding progress. Previous work compounds and yet open sourcing allows the entire community to progress at a lower global capital cost which accrues value to more of the community.

### Reducing compute burden for the same tasks and performance

Other than continuing to optimize and progress the transformer architecture, there are other ways to reduce the compute burden for the same tasks and performance.

There are many teams working on a variety of bets, some cool examples:

1. State space models (non-attention based architectures): [Mamba](https://github.com/state-spaces/mamba/), [rwkv](https://github.com/BlinkDL/RWKV-LM), etc.. to reduce the attention quadratic runtime complexity.
2. Extreme quantization: [BitNet](https://github.com/microsoft/BitNet) models are 1.6 bit models (with 4 bit activations) which are much cheaper to run and can run on CPU's as matrix multiplications are removed.

For the leading AI labs and hyperscalers, they are racing to build more data centers designed for AI workloads. In the short term, compute remain in a supply crunch (primarily due to chips shortage--see [NVIDIA stock price](https://www.google.com/finance/quote/NVDA:NASDAQ?hl=en&window=5Y)). Data center construction has [skyrocketed](https://thedailyshot.com/wp-content/uploads/US-Constr-Spend-Data-Centers2501030320.png) with the inflow of capital. The next physical constraint will be energy.

## Energy and AI

Vaclav Smil published a book in 2022 called "How the World Really Works: The Science Behind How We Got Here and Where We're Going". The short answer: energy. Taking aside how Smil may feel about the progress/solutions of the energy transition, it is clear that our modern world--particularly the developed world--runs on energy.

> An average inhabitant of the Earth nowadays has at their disposal nearly 700 times more useful energy than their ancestors had at the beginning of the 19th century.

> [...]

> Translating the last rate into more readily imaginable equivalents, it is as if an average Earthling has every year at their personal disposal about 800 kilograms (0.8 tons, or nearly six barrels) of crude oil, or about 1.5 tons of good bituminous coal. **And when put in terms of physical labor, it is as if 60 adults would be working non-stop, day and night, for each average person; and for the inhabitants of affluent countries this equivalent of steadily laboring adults would be, depending on the specific country, mostly between 200 and 240.**

-- Vaclav Smil, How the World Really Works (emphasis mine)

The continued adoption and development of AI will require more energy than ever.

In 2025, Microsoft announced $80B of [capex](https://blogs.microsoft.com/on-the-issues/2025/01/03/the-golden-opportunity-for-american-ai/) for AI data centers. In January 2025, The White House, OpenAI, Softbank, and Oracle announced a [$500B](https://apnews.com/article/trump-ai-openai-oracle-softbank-son-altman-ellison-be261f8a8ee07a0623d4170397348c41) investment in data centers and energy over the next 4 years. Amazon expected $75B in [capex](https://seekingalpha.com/article/4731865-amazon-com-inc-amzn-q3-2024-earnings-call-transcript#:~:text=Yeah%2C%20I'll%20take%20the%20capex%20part%20of%20that.%20As%20Brian%20said%20in%20his%20opening%20comments%2C%20we%20expect%20to%20spend%20about%20$75%20billion%20in%202024.%20I%20suspect%20we'll%20spend%20more%20than%20that%20in%202025.%20And%20the%20majority%20of%20it%20is%20for%20AWS%20and%20specifically%2C%20the%20increased%20bumps%20here%20are%20really%20driven%20by%20Generative%20AI.) in 2024 mostly related to AWS, only to grow in 2025. The trend is the same for other players like GCP, Meta, etc...

AI data centers are joining the ranks of other items in the energy transition (i.e. electric vehicles, etc...). Forecasts of AI energy demands vary widely (from ~2x to 5x current data center energy demands by 2030). BloombergNEF's Michael Liebreich lays out a more nuanced [perspective](https://about.bnef.com/blog/liebreich-generative-ai-the-power-and-the-glory/) in this new generation of data center growth: we've seen this before but market dynamics, stakeholders governance, and energy consumption efficiency will all play a factor at moderating demand and supply.

Personally, I'm optimistic that physical constraints won't bottleneck the rate of progress derived from adding more compute. Capital is moving rapidly to balance the supply, and energy constraints are likely to be mitigated by more algorithm and hardware improvements (similar to the 2000's and 2010's as cloud computing adoption took off, when similar stakeholders cried out for more energy, but as a proportion of US energy demand, data center energy consumption grew relatively gradually due to more efficient hardware and software design).

## AI and the Physical World -- How Humans Communicate With Machines

In 2025, in the developed world, most consumers spend their time on their phones and laptops. Let's look at how humans do a common task: shopping on Amazon's mobile app.

### Tapping on a phone screen: Shopping on Amazon

Each user interaction follows a carefully orchestrated flow:

1. Physical Input → Mobile OS

- User taps or swipes generate touch events
- OS interprets and routes events to the application layer

2. App ↔ Server Communication

- App sends HTTP/TCP requests to backend servers (i.e. Amazon ecommerce backends with product listings, ads, etc...)
- Servers process requests (database lookups, payment validation)
- Communication is via the internet backbone (i.e. TCP/UDP connections) that route through a host of hardware and network software; not to mention the cryptography to ensure the data is secure.

3. Server ↔ Services

- Servers coordinate with other systems (inventory, payments, authentication, etc...)
- Data flows through multiple service layers to aggregate the information needed to respond to the user's request.

4. Response → User Interface

- Results return to device via the internet backbone
- App updates UI based on new state
- User perceives change and decides next action

Each loop is tightly scoped and optimized, typically requiring only 100,000 to 100,000,000 FLOPs [5] per iteration of this loop . The system is engineered for speed and responsiveness through these **small, discrete steps**, which are then repeated in very rapid succession hundreds or thousands of times in a normal user session.

### The Human Factor: Bearing the Cognitive Load

While the visible computation is relatively lightweight, humans shoulder most of the cognitive burden:

1. Persistent and Context-Aware Computation

- Users must constantly perceive and interpret their environment
- Humans translate intent into discrete interface actions

2. Interface Navigation

- Humans learn and adapt to predetermined UI patterns
- Users bridge gaps between their intent, environment, time, and available actions

The system's efficiency comes from delegating most adaptive intelligence to the human user, keeping machine computation minimal but requiring significant human cognitive work.

Yet, the efficiency didn't come for free. On the other side of the user consuming the interface, the interface was designed by other humans on top of a stack of software and hardware to enable the loop: chipset, operating system, network, application, etc...

The fixed cost is amortized over the many users that consume the interface over its lifetime.

### LLM Inference: A Different Paradigm

Large language models with 70B parameters take a contrasting approach, requiring 20,000,000,000,000 to 200,000,000,000,000 FLOPs [6] per inference - 200,000-2,000,000x times more than typical app interactions. However, they enable open-ended, natural language communication in a single pass.

With a fixed defined vocabulary space, the model can consume sequences of arbitrary length (up to a fixed length) and output a sequence of arbitrary length (up to a fixed length).

This is unlike programming, where there are syntax constraints that will limit the runtime/execution of the program with the underlying stack.

### Can new AI systems balance the communication burden?

The evolution of human-computer interaction may point to a future where we're gradually shifting cognitive load from humans to machines. Traditional interfaces require humans to:

- Learn specific interaction patterns
- Maintain context and state
- Translate high-level goals into discrete steps

The integration of LLMs into system architectures could happen at multiple levels:

1. Application Layer

- LLMs could augment existing interfaces as an intelligent assistance layer
- Natural language could complement rather than replace traditional UI elements
- UI's can be fluid and generated on the fly depending on input from the user and the environment

2. Framework Layer

- Web and mobile frameworks could incorporate LLM-powered components
- Development tools could use LLMs to generate more adaptive interfaces easily

3. System Layer

- Operating systems could employ LLMs for more intelligent resource management
- System calls and memory allocation could become more context-aware (i.e. hardware aware, workload aware, etc...)
- Kernel operations could adapt to usage patterns and requirements instead of using heuristics

### Remembering attention is a form of communication

Large language models are marvels of deep learning. Modern human language is excellent at compressing information. Attention mechanisms allowed machines to learn via communication between many many different nodes of a sequence in multidimensional spaces.

If we move the unit of analysis from language and sequences to humans and the physical world, where else could we leverage the added benefits of learned machine communication?

## In the LLM paradigm: Learned data processing vs. pre-determined data processing

Since the explosion of AI, industry has been [predicting](https://www.blackstone.com/insights/article/the-convergence-of-data-centers-and-power-a-generational-investment-opportunity-the-connection/#:~:text=Figure%201:%20Data%20Created%2C%20Consumed%20and%20Stored) the explosion of data generated/stored/consumed. At 2024 NeurIPS, Ilya Sutskever [predicted](https://neurips.cc/virtual/2024/test-of-time/105032) that the era of pre-training is over, but data continues to be the fossil fuel of the AI era.

But if we extend the previous section's analysis of human-computer interaction, we can see that data today is mostly generated and consumed in small discrete steps/iterations. Media content is slightly more continuous (i.e. videos, audio) but the data are still discretely packaged, collected, and consumed at the user's direction.

Since 2024, the frontier models have also expanded in modalities (both input and output; image, audio, etc...) and inference speed (i.e. realtime voice/video API's from OpenAI and Google).

There are applications of transformers where the inputs and outputs are more continuous in nature, such as in the classic self-driving car example: Waymo Research's 2024 [work](https://arxiv.org/pdf/2404.19531) on transformer driven trajectory prediction–taking realtime continuous perception and scene data inputs to predict future motion trajectories of objects in the environment.

Yet, the data is still discretized and processed into features and tokens to be made into a sequence for processing; researchers spent effort empirically to find the best way to process the data into a sequence to achieve the best performance.

To add new modalities and formats of data to models, models have to be re-trained or trained for longer with the new data in a different way. The vast majority of this is still determined by humans based on empirical heuristics.

Perhaps, this is the reason why I have a lot of excitement around ideas like Meta's [byte latent transformer](https://arxiv.org/pdf/2412.09871). All data can be encoded into a sequence of bytes, and the model can learn to process the data in a way that is optimal for the task. The caveat is that this will likely require larger compute budgets than labs are willing to experiment with (especially when the current methods are working well for their existing use cases and users).

## Other interesting questions/possibilities in the LLM paradigm

Because LLMs are so good at taking arbitrary inputs and generating usable outputs, if computation budgets are not a concern, it's natural to ask how we can use LLMs to generate arbitrary outputs on the fly **all the time**.

Instead of having to hire an engineer to write web applications, we can use LLMs to generate the web application (this is also related to the idea that software agents will probably be the 1st proven class of agents from LLMs).

As opposed to the fixed cost / economies of scale dynamics of current software development, LLMs can perhaps increase the accessibility of software development to the masses; but at the same time change the cost dynamics of fixed vs variable costs in software.

This is unlikely to be adopted for all use-cases, there are many use-cases where fixed costs / economies of scale are still king (i.e. most of all of the web applications we use today). But there are certainly a long tail of un-designed bespoke software applications that can be invented (but was never invented because it had a user of 1, or the user was already doing it manually and charging a very high rate for the service, etc...).

Bespoke software will become more accessible; it already is an enormous market (think how much system integrators like Accenture make per year; they are the definition of providing a labor force to develop customized software for their corporate clients).

---

[1]: Azure and Oracle provide GPUs to OpenAI, while also providing LLM inferences services separately. AWS provide inference for open source models and Anthropic models, while powering Anthropic's GPU clusters. GCP likewise serves as a cloud provider for its own Gemini models and other open source models.

[2]: The [results](https://arcprize.org/blog/oai-o3-pub-breakthrough#:~:text=Here%20are%20the%20results.) reported retail costs of $2,012 and $6,677 ($8,689) for the low compute configuration, with a note the high compute configuration cost roughly 172x the low compute configuration. 172 times $8,689 is $1,494,508 (~$1.5M). Now, these are retail costs, so the actual costs can possibly be 25-50% lower when considering the actual cost to OpenAI with its optimized inference stack and wholesale hardware costs.

[3]: In 2024, Karpathy [reproduced](https://github.com/karpathy/llm.c/discussions/677) GPT-2 using llm.c for $672 in 24 hours of training.

[4]: The DeepSeek team is quite secretive even within China, they are based in Hangzhou, and are not that well known even within China. They predominantly hire younger talent from domestic universities (vs. the approaches of other China AI labs that hire more senior talent from Western education backgrounds). There's an argument to be made that (behind the backdrop of GPU constraints and cost constraints), the added focus of a fast talented team enabled it to basically conduct more experiments and ablations to produce more empirically impactful results.

[5]: FLOPs here is being use as an umbrella term (for simplicity) to includes integer operations, etc.. that may occur when completing instructions. This is a very rough estimation that is not meant to be precise, there are many variables that could impact the estimate: cryptography costs, network memory movement costs, ML/recommendation systems, etc...

[6]: Again, this is a very rough estimation, with the assumption of 70B parameters and 100 to 1000 tokens of total tokens processed/generated. It can easily be much higher with greater context length and longer output.
