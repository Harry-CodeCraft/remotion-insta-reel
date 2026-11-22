export type ReelCardConfig = {
  id: string | number;
  category: string;
  title: string;
  description: string;
  icon?: string;
  tags?: string[];
  /** How long the card stays on screen, in frames (30 fps = 30 frames per second). */
  duration: number;
  footer?: string;
  /**
   * Optional absolute start time for this card. If set, this overrides sequential placement.
   * Use frames or seconds (seconds are converted using 30 fps).
   */
  startFrame?: number;
  startSec?: number;
  /**
   * Overlap/gap before the next card (in frames). Defaults to 12 for smooth crossfade.
   * Use 0 if this card should fully finish/disappear before the next card starts.
   */
  overlapAfter?: number;
  /**
   * When true, this card is rendered but excluded from the progress stepper.
   * Useful for a standalone intro/outro card without adding an extra step.
   */
  excludeFromProgress?: boolean;
};

export const reelCards: ReelCardConfig[] = [
  {
    id: "intro",
    category: "INTRO",
    title: "7 AI Engineering Concepts",
    description:
      "1. RAG\n2. Fine-tuning\n3. Guardrails\n4. Caching\n5. User Feedback\n6. Agentic Evaluations\n7. Observability",
    icon: "sparkles",
    tags: ["AI", "Guide"],
    startSec: 5, // when to show (seconds). 0 = beginning of video; e.g. 2 for 2s in
    duration: 150, // how long to stay (frames). 90 frames = 3s at 30fps
    overlapAfter: 11, // 0 = disappear before next card; 12 = smooth crossfade into next
  },
  {
    id: 1,
    category: "AI Engineering Concepts 01 / 07",
    title: "RAG (Retrieval-Augmented Generation)",
    description:
      "Build AI applications that answer questions using your own data instead of relying only on an LLM's training knowledge.\n\nKey Concepts:\n• RAG architecture: Ingestion, chunking, embedding, retrieval, and generation.\n• Embeddings: Convert text into numerical vectors to capture semantic meaning.\n• Vector Databases: Store and retrieve embeddings using similarity search.\n• Chunking Strategies: Split documents into meaningful sections for better retrieval.\n• Retrieval Optimization: Understand hybrid search, metadata filtering, and reranking.\n• Advanced RAG: Query rewriting, contextual retrieval, and multi-hop retrieval.\n\nWhat to understand:\n• How RAG reduces hallucinations and provides context-aware responses.\n• RAG vs Fine-tuning: When to use each approach.\n• How to build an end-to-end RAG pipeline.",
    icon: "database",
    tags: ["LLMs", "Vector Databases", "Embeddings", "Chunking", "Retrieval"],
    duration: 30,
  },
  {
    id: 2,
    category: "AI Engineering Concepts 02 / 07",
    title: "Fine-tuning",
    description:
      "Customize pre-trained language models using domain-specific datasets to improve their behavior, style, and performance for specialized tasks.\n\nKey Concepts:\n• Fine-tuning Fundamentals: Understand pre-training vs fine-tuning.\n• Dataset Preparation: Data collection, cleaning, formatting, and validation.\n• Supervised Fine-tuning (SFT): Train models using instruction-response pairs.\n• LoRA: Adapt models by training low-rank matrices instead of all parameters.\n• QLoRA: Fine-tune quantized models with reduced GPU memory requirements.\n• PEFT: Parameter-Efficient Fine-Tuning techniques.\n• Model Evaluation: Compare base and fine-tuned model performance.\n\nWhat to understand:\n• When fine-tuning is better than RAG.\n• Full fine-tuning vs LoRA vs QLoRA.\n• Overfitting, catastrophic forgetting, and training data quality.\n• How to evaluate and deploy a fine-tuned model.",
    icon: "brain-circuit",
    tags: ["LLMs", "LoRA", "QLoRA", "SFT", "PEFT"],
    duration: 45,
  },
  {
    id: 3,
    category: "AI Engineering Concepts 03 / 07",
    title: "Guardrails",
    description:
      "Build security, safety, and validation layers around AI applications to protect against malicious inputs, unwanted outputs, and unreliable model behavior.\n\nKey Concepts:\n• Input Guardrails: Validate and sanitize user prompts before processing.\n• Output Guardrails: Check generated responses for safety and correctness.\n• Prompt Injection: Detect attempts to manipulate system instructions.\n• Jailbreak Prevention: Protect models against malicious instruction patterns.\n• PII Detection: Identify and protect sensitive user information.\n• Content Moderation: Filter harmful, abusive, or restricted content.\n• Structured Output Validation: Enforce JSON schemas and expected response formats.\n• Tool Permissions: Restrict agent access to sensitive operations.\n\nWhat to understand:\n• Input validation vs output validation.\n• Direct vs indirect prompt injection.\n• Defense-in-depth security strategies.\n• Why guardrails cannot guarantee complete protection.",
    icon: "shield-check",
    tags: ["AI Security", "Prompt Injection", "PII", "Validation", "Safety"],
    duration: 45,
  },
  {
    id: 4,
    category: "AI Engineering Concepts 04 / 07",
    title: "Caching",
    description:
      "Improve AI application speed, reduce infrastructure costs, and avoid unnecessary LLM API calls through intelligent caching strategies.\n\nKey Concepts:\n• Exact Match Caching: Reuse responses for identical requests.\n• Semantic Caching: Match similar queries using embedding similarity.\n• Prompt Caching: Reuse previously processed prompt prefixes where supported.\n• Response Caching: Store generated responses for repeated requests.\n• Redis: Use in-memory storage for fast cache retrieval.\n• Cache Invalidation: Handle expiration, stale responses, and data updates.\n• Cache Hit Ratio: Measure how effectively your caching strategy works.\n• TTL: Define how long cached responses remain valid.\n\nWhat to understand:\n• Exact caching vs semantic caching.\n• How caching reduces token consumption and API costs.\n• Cache invalidation and consistency challenges.\n• When caching can return outdated or incorrect answers.",
    icon: "zap",
    tags: ["Semantic Cache", "Redis", "Prompt Caching", "TTL", "Optimization"],
    duration: 40,
  },
  {
    id: 5,
    category: "AI Engineering Concepts 05 / 07",
    title: "User Feedback",
    description:
      "Build continuous improvement loops by collecting user feedback, analyzing AI responses, identifying quality issues, and using real-world signals to improve AI systems.\n\nKey Concepts:\n• Explicit Feedback: Collect thumbs-up, thumbs-down, ratings, and comments.\n• Implicit Feedback: Analyze user behavior, repeated queries, and interaction patterns.\n• Human-in-the-Loop: Allow humans to review and correct AI-generated responses.\n• Feedback Pipelines: Store and process feedback for future analysis.\n• Error Analysis: Identify hallucinations, irrelevant answers, and failure patterns.\n• Preference Data: Build datasets from user preferences and response comparisons.\n• RLHF: Understand Reinforcement Learning from Human Feedback.\n• Continuous Improvement: Use feedback to improve prompts, retrieval, and models.\n\nWhat to understand:\n• Explicit vs implicit feedback.\n• How feedback becomes training or evaluation data.\n• Human review and feedback quality.\n• Why user feedback alone is not a reliable measure of model quality.",
    icon: "message-square-heart",
    tags: ["Human-in-the-Loop", "Feedback Loops", "RLHF", "Preference Data"],
    duration: 45,
  },
  {
    id: 6,
    category: "AI Engineering Concepts 06 / 07",
    title: "Agentic Evaluations",
    description:
      "Evaluate AI agents that perform multi-step tasks, use external tools, make decisions, and execute workflows to ensure they are reliable, accurate, and safe.\n\nKey Concepts:\n• Task Completion: Measure whether an agent successfully achieves its objective.\n• Tool Calling Accuracy: Evaluate whether the correct tools and parameters are selected.\n• Trajectory Evaluation: Analyze the complete sequence of agent actions and decisions.\n• LLM-as-a-Judge: Use an LLM to assess the quality of another model's output.\n• Benchmarking: Test agents against predefined tasks and datasets.\n• Multi-step Reasoning: Evaluate planning, decision-making, and execution.\n• Regression Testing: Ensure changes do not break previously working workflows.\n• Failure Analysis: Identify tool errors, loops, incorrect decisions, and incomplete tasks.\n\nWhat to understand:\n• Agent evaluation vs traditional LLM evaluation.\n• Correctness, task success rate, and tool selection accuracy.\n• How to build evaluation datasets and test scenarios.\n• Deterministic vs LLM-based evaluation.",
    icon: "clipboard-check",
    tags: [
      "AI Agents",
      "LLM-as-a-Judge",
      "Benchmarks",
      "Evaluation",
      "Tool Calling",
    ],
    duration: 45,
  },
  {
    id: 7,
    category: "AI Engineering Concepts 07 / 07",
    title: "Observability",
    description:
      "Monitor, debug, and optimize production AI applications by tracking requests, model behavior, execution traces, performance metrics, and infrastructure costs.\n\nKey Concepts:\n• Distributed Tracing: Follow a request across multiple AI components and services.\n• Logging: Capture prompts, responses, errors, and execution details securely.\n• Metrics: Monitor latency, token usage, throughput, and error rates.\n• LLM Monitoring: Track model performance, response quality, and reliability.\n• Token & Cost Tracking: Measure input tokens, output tokens, and API expenses.\n• Agent Tracing: Inspect tool calls, intermediate steps, and agent execution flows.\n• Performance Monitoring: Identify bottlenecks and slow operations.\n• Alerts & Dashboards: Detect failures and monitor production health.\n\nWhat to understand:\n• Logs vs metrics vs traces.\n• How to debug failed LLM and agent workflows.\n• End-to-end request tracing.\n• How to monitor latency, reliability, and cost in production.",
    icon: "activity",
    tags: ["LLM Monitoring", "Tracing", "Logging", "Metrics", "Production AI"],
    duration: 60,
  },
  {
    id: "outro",
    category: "YOUR NEXT STEP",
    title: "Want the Complete AI Engineer Roadmap?",
    description:
      "Want to become an AI Engineer but don't know where to start?\n\n• Comment \"AI\" and I'll send you the complete AI Engineer roadmap directly to your DMs.\n• Follow for more AI engineering concepts, tutorials, and interview preparation.\n• Save this reel so you don't forget these 7 concepts.",
    icon: "sparkles",
    tags: ["❤️ Like", "🔁 Share", "💬 Comment AI", "🚀 Follow"],
    startSec: 25,
    duration: 210,
    overlapAfter: 0,
    excludeFromProgress: true,
  },
];
