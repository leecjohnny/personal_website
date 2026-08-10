---
title: "DeepSeek: Compounding progress… delayed market reactions"
pubDate: 2025-01-28
sourceUrl: "https://johnnyclee.com/i/deepseek-compounding-progress-delayed-market-rea-q6bGDu4MqPr/"
---

It may surprise some people, but many of the improvements that [DeepSeek](https://deepseek.com/) ([High Flyer](https://www.high-flyer.cn/en/blog/)’s AI lab) incorporated into DeepSeek V3 were released on May 7, 2024 as part of their [DeepSeek V2](https://arxiv.org/abs/2405.04434) –almost 2 full months before Meta released their groundbreaking Llama 3 [paper](https://arxiv.org/abs/2407.21783) in July 2024.

Almost 9 months later, suddenly, public markets [decided](https://www.wsj.com/tech/chip-stocks-tumble-after-chinas-deepseek-ai-models-raise-doubts-over-u-s-tech-dominance-9799591b) that NVIDIA should be worth ~$500B less. Okay…, there was a catalyst, DeepSeek released [R1](https://arxiv.org/abs/2501.12948), their o1/3 comparable model the week before.

# **Not an overnight affair: Random walk with upward drift**

Yet, the progress was gradual; an o1/3 class model in the public was an eventuality in 2025 [1].

Modern ML is mostly based on intuition, gut, and grunt work–betting on big ideas and empirically validating the results. One idea, built on top of the last useful one, without a clear line of sight on the next research breakthrough.

Most AI researchers are still compute/GPU constrained (or some people like to say the GPU rich vs. the GPU poor; maybe not the best turn of phrase). There is often a mile-long laundry list of experiments they wish they can implement/run on any given day. But not enough compute.

With some luck and sheer grunt work, researchers often stumble on new clever ideas that work. Folks have learned a long time ago ([The Bitter Lesson](https://www.cs.utexas.edu/~eunsol/courses/data/bitter_lesson.pdf)) that letting machines learn is often the best way. By sheer coincidence, another team of researchers (from the Hong Kong University of Science and Technology) converged on the same R1 reinforcement learning findings as DeepSeek, [published](https://github.com/hkust-nlp/simpleRL-reason) only a few days apart.

DeepSeek’s journey training LLMs did not start in 2024, it started long before as a side project at High Flyer [2] from around 2019 [3].

# **From DeepSeek V1 to R1: Leveraging other open source research**

DeepSeek’s progress emerged from a sea of impressive and accelerating research. Mistrial and META’s open source stance only accelerated their progress. You can clearly see DeepSeek took many architectural and scaling guidance from the other labs (size of training runs in tokens trained, hyper parameters, etc..).

## Timeline of highlighted milestones related to DeepSeek LLM development

- **JUNE 27, 2023:** High Flyer announces proprietary internal [HAI-LLM](https://www.high-flyer.cn/en/blog/hai-llm/) training framework
- **JULY 18, 2023:** [Llama 2](https://arxiv.org/abs/2307.09288) released - 2T token runs - 7B to 70B models
- **AUGUST 9, 2023:** [Reports](https://on.ft.com/40BWNea) of Chinese cloud providers stockpiling GPUs
- **SEPTEMBER 23, 2023:**[Mistrial 7B](https://mistral.ai/news/announcing-mistral-7b/) - rumored [8T](https://x.com/ManuelFaysse/status/1706949891358859624) tokens - beats Llama 2 7B
- **OCTOBER 23, 2023:** Biden administration phase 1 GPU restrictions effective
- **DECEMBER 11, 2023:** [Mixtrial of Experts](https://mistral.ai/news/mixtral-of-experts/) - open source MoE 8x7B (12.9B active)

Likely compounded/leveraged on top of their Mistrial 7B runs/checkpoints

- **JANUARY 5, 2024:** [DeepSeek V1](https://arxiv.org/abs/2401.02954) - 2T token runs - 7B & 67B models

Very similar to Llama 2 runs, uses GQA but deeper instead of wider models.

- **MARCH 8, 2024:** [Gemini 1.5](https://arxiv.org/abs/2403.05530) - close source acknowledgement of MoE in frontier model
- **MAY 7, 2024:** [DeepSeek V2](https://arxiv.org/abs/2405.04434) - 8T run - 236B MoE (21B active) close to Llama 2 70B performance

DeepSeek starts varying from the pack substantially…

1. **New form of attention:**Introduced MLA, improvement alone ~80%+ reduction in KV cache memory requirements (compared to comparable GQA). When combined with other memory optimizations, DeepSeek claims 93.3% reduction in KV cache.
2. **New form of MoE:**Introduced more flexible form of MoE with shared experts while still using auxiliary loss for load balancing
3. With these improvements, compared to a dense 67B model, DeepSeek claims ~578% inference throughput improvement.

- **JULY 31, 2024:** [Llama 3](https://arxiv.org/abs/2407.21783): META continuing their scaling program to 405B while increasing to 15T of tokens trained.
- **DECEMBER 27, 2024:** [DeepSeek V3](https://arxiv.org/abs/2412.19437v1): scaling up 15T run 671B (with 37B active) close to frontier models, GPT-4o, LLama 3 405B, Claude 3.5 sonnet.

DeepSeek continues their drive for training and inference efficiencies, faced with chips constraints (primarily memory bandwidth, as H800’s have ½ the bandwidth of H100’s)... the path now is clearly their own:

1. **Improved MoE training:** without auxiliary loss (learned routing, vs. heuristic)
2. **Multi-token prediction objective during training:** taking a lead from speculative decoding, though not used in inference
3. **DualPipe training pipeling/scheduling framework:**reduces bubble and communication bottlenecks during training
4. **FP8 training dynamics:** while accumulating in full precision without substantial loss in quality to reduce memory bottlenecks
5. **NVIDIA SM’s allocation adjustments:**Low level adjustment to allocate SM’s only for communication to reduce bandwidth bottleneck
6. **Modular inference infra [4]:**2 inference infra setups specialized in (A) prompt processing (input tokens) and then (B) sampling (output tokens) to separate and scale to fit workloads and optimize distributed batch processing at scale.

- **JANUARY 22, 2025:**[**DeekSeek R1**](https://arxiv.org/abs/2501.12948)**:**R1 model built on top of DeepSeek V3, close to OpenAI o1 performance and enables test-time compute regime

## LLM development is a compounding phenomenon.

Labs leverages their last generation of models and builds on top of them. This is seen countless times again and again.

- Mixtrial 8x7B is a MoE of their 7B (rumored).
- Llama 3 models use Llama 2 models for filtering and data curation.
- Gemini 1.5 teams used Gemini 1.0 generation models for evaluations, data curation, and hyperparameter extrapolations. Gemini 1.5 Flash distilled from Gemini 1.5 Pro.
- DeepSeek V3 used DeepSeek V2.5 models for data generation in post-training.
- DeepSeek R1 is built on top of V3 base model.

DeepSeek V2 release in May 2024 was the beginning of DeepSeek charting its own path, rather than simply imitating others.

Its V3 release very much cemented their self-efficiency in continuing to progress LLM research. From DualPipe, multi-token prediction, FP8 training dynamics without little loss in quality, and finally to providing 2 full pages of hardware “suggestions” to “hardware designers” (read NVIDIA), these are not behaviors of imitators.

# **R1: Reinforcement learning and test-time compute will accelerate inference demands**

DeepSeek R1 claims to be on par with OpenAI o1/3 in benchmarks. LLM expert users are already [impressed](https://simonwillison.net/2025/Jan/20/deepseek-r1/) and running these models on different infra and model configurations (DeepSeek released R1 distillations down to 1.5B size, which can run on most modern MacBook Pro’s with 16+GB memory).

As reinforcement learning will require some method of evaluation (to give feedback to the system whether something is correct or not), inference as a type of workload will only continue to increase.

For OpenAI, in the middle of 2024 (before the release of o1), inference costs are already [dominating](https://www.datacenterdynamics.com/en/news/openai-training-and-inference-costs-could-reach-7bn-for-2024-ai-startup-set-to-lose-5bn-report/) training costs (~$7B in compute costs, ~$4B for inference towards ChatGPT). This shifts from training to inference workloads will accelerate, to include inference workloads targeted for research for test-time compute regime models (evaluations, sample generation, etc..).

# **Hundreds of Billions of CapEx in 2024-2026: Will only accelerate model scale ups and intelligence progress**

> "I will say that Deep Learning has a legendary ravenous appetite for compute, like no other algorithm that has ever been developed in AI. You may not always be utilizing it fully but I would never bet against compute as the upper bound for achievable intelligence in the long run. Not just for an individual final training run, but also for the entire innovation / experimentation engine that silently underlies all the algorithmic innovations."

– [Andrej Karpathy](https://x.com/karpathy/status/1883941452738355376)

With [open](https://github.com/hkust-nlp/simpleRL-reason) [replications](https://huggingface.co/blog/open-r1) of R1 findings either in progress or complete, inference demands will only accelerate. Any model can become a reasoning model; where you can adjust a “knob” to increase test-time compute to get a more reliable answer.

Labs will be more comfortable scaling up when inference is cheaper with new forms of attention (MLA) and MoE’s. The test-time compute regime gives consumers of models the power of accuracy as a function of cost.

How much do you care about a more accurate response for a given task? $1k? $6k? $15k? This can now be within your control.

---

[^1]: Whether it was META open sourcing their work with LLAMA 4, or the community finding the needle in the haystack of [speculation/experiments](https://github.com/srush/awesome-o1).

[^2]: See interviews from [2023](https://www.chinatalk.media/p/deepseek-from-hedge-fund-to-frontier) and [2024](https://www.chinatalk.media/p/deepseek-ceo-interview-with-chinas) with the High Flyer CEO Liang Wenfeng.

[^3]: See High Flyer AI blog [posts](https://www.high-flyer.cn/en/blog/) going back to 2019

[^4]: This is probably not entirely [novel](https://www.cursor.com/blog/llama-inference#how-exactly-are-closed-source-models-cheaper), and already being done by most inference providers, prompt processing can be incredibly cheap and speed up inference when done with enough volume in the workload. Though DeepSeek’s wide MoE footprint will make extra benefit from this modular approach by increased parallelism across nodes (as shown by their minimal 40-node sampling setup).
