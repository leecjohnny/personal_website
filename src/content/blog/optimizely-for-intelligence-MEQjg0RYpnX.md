---
title: "Optimizely for Intelligence"
pubDate: 2025-03-12
sourceUrl: "https://johnnyclee.com/i/optimizely-for-intelligence-MEQjg0RYpnX/"
---

### The Road Towards Intelligence

The AI community continues to drive model improvements by pulling 2 key levers:

#### 1. Compute

- **Algorithmic Improvements**: Innovations such as new forms of reinforcement learning, and attention mechanisms contribute to increasing efficiency. Improvements also focus on achieving the same performance with less compute intensity.
- **Access to More Computing Power**: The industry–for the most part–relies on NVIDIA chips, large-scale data centers, and capital investment to expand computational resources and supply.

#### 2. Data

- AI models learn from structured and unstructured data sources.
- High quality data with previously unincluded knowledge is non-negotiable in improving intelligence.
- Companies continuously invest in refining/curating datasets, via humans or machines.

### Country of Geniuses vs. Country of Yes-Men

Dario Amodei, CEO of Anthropic, envisions a future where data centers house a "country of geniuses," a concept he explores in his essay [*Machines of Loving Grace*](https://darioamodei.com/machines-of-loving-grace). He argues that intelligence will continue to advance, though with physical constraints in sectors like biology, where real-world rate limitations affect progress.

Conversely, Thomas Wolf of Hugging Face (unsurprisingly, the open source foil to the close-sourced AI CEO) presents a counterpoint, arguing that we won’t experience a “compressed 21st century” of rapid innovation. He argues that AI models could function more like a "[country of yes-men](https://thomwolf.io/blog/scientific-ai.html)" rather than a "country of geniuses." While models will be a valuable source of knowledge, he believes it’s more akin to a very obedient and A+ student than it is a genius for scientific discoveries.

Personally, I’m more inclined to believe in Thomas’s argument, AI models primarily predict the most probable token during pre-training. While post-training techniques like reinforcement learning introduce more nuanced rewards for exploration (a la search), the core predictive mechanism may limit the model’s ability to challenge existing knowledge or pursue unconventional reasoning–esspecially if it is deemed improbable by historic data.

Regardless, I do believe Tyler Cowen’s [viewpoint](https://marginalrevolution.com/marginalrevolution/2025/02/why-i-think-ai-take-off-is-relatively-slow.html). Humans and our “sticky” modes of societal interaction will be a rate limiting factor in how quickly we can leverage the new sources of intelligence.

### AI usage today

Right now, there are a few ways most people access large language models (LLMs) and AI:

#### **Chatbot Products**

People simply use the labs’ chatbot products like ChatGPT, Claude, or Gemini, and interact with them in a chat interface.

- The chatbot application might select some default model settings or have access to certain tools to make the conversation more insightful.
- If you’re more knowledgeable, you might pick a different model—like gpt-4o vs. o1, o3, or some other variation—but for a typical user, those model names and versions don’t mean much.

#### **LLMs Embedded in Existing Applications**

A straightforward example is in software engineering, where developers use an AI-augmented IDE like Cursor.

- The model’s text understanding and knowledge base helps autocomplete and suggest code.
- If you define a new function or module and your codebase is well documented—or is otherwise known to the model—it can help you quickly generate boilerplate or complete new code.
- You then run and test it to ensure correctness. Essentially, it’s augmenting existing software (an IDE) with capabilities that can enhance developer productivity.

#### **APIs in the Background**

This is where LLMs are accessed through APIs to add conversational or classification features, object identification, editing suggestions, and so on.

- For example, if you contact customer support via a chat, there’s likely a large language model in the background analyzing or drafting replies.
- A human agent might still finalize the response—or it may be fully automated—depending on the setup.
- In either case, the AI is an API-powered component within a larger process.

### Adapting to the New Age of Intelligence & Cost-Benefit Analysis

Users need to adapt, change, or add new modes of interacting with computers. I think that will be critical for how we bring this technology into the world. Intelligence that creates leverage and growth.

It may be slightly unhelpful to think we can simply apply deterministic frameworks from the last couple of decades and hope they apply similarly here.

For instance, there’s a lot of hype and optimism around the word “agents.” The idea is that you can delegate a certain task to an AI system.

Think about the agent loop:

1. **User Input**: A user provides a task, specification, or request to an AI system.
2. **Inference + Tools**: The AI system—powered by one or multiple large language models—interprets that request and makes inferences. Part of the inference involves accessing various tools, which might be deterministic ones like a calculator, a code interpreter, a web browser, or even other models (e.g., an image generator if you need an image).
3. **Execution & Feedback**: The system predicts what it should do next using these tools, retrieves the result, and repeats this loop until it believes the request has been completed.
4. **Response**: Finally, it returns the response to the user.

In a classic API setting, you have a request and a defined contract with an expected response type. You typically get back a success status or some outcome. Here, we’re trying to fit that framework onto a probabilistic system by slowly injecting and abstracting away the probabilistic compute under the hood.

That’s a good way to start adopting these tools, but the challenge remains that these systems will make mistakes.

Some tasks can tolerate that, and others cannot. In cases where error rates are relatively low and the cost of an error isn’t too high, the cost-benefit equation may still favor deploying these agents.

This often applies to areas like customer service or fraud detection, where the cost of a false positive might not be extremely high, but manually reviewing each case would be very expensive.

In effect, you’re balancing the cost of mistakes against the total volume of tasks.

### Optimizely for Intelligence

“Optimizely for Intelligence,” in my mind, is another way of saying we should help the average user navigate the world of AI in a way that feels more deterministic and controlled.

Optimizely gave creative marketers a deterministic method of navigating a probabilistic decision making process of choosing the right content and creative for their audiences.

In a world where we have variable-cost intelligence—easily supplied, nearly a commodity—and yet so many different “SKUs” or choices, the current market paradox is that people are not actually leveraging any choice.

They’re just sticking to a single model or setup.

So the question is: How can we inject that choice in a way that empowers the user or consumer to pick what’s best for them?

Maybe this doesn’t have to be explicit, it may be abstracted away with signals from the user’s experience.

The challenge remains, also challenging for humans:

**Choosing the right mode of intelligence at the right time for the right task.**
