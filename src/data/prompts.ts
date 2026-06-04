export interface Prompt {
  id: string;
  titleAr: string;
  titleEn: string;
  category: string;
  useCaseAr: string;
  useCaseEn: string;
  promptText: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  bestModel: string;
  tags: string[];
}

export const prompts: Prompt[] = [
  {
    id: "build-website",
    titleAr: "بناء موقع ويب كامل",
    titleEn: "Build a Complete Website",
    category: "Claude",
    useCaseAr: "بناء مواقع ويب من الصفر",
    useCaseEn: "Building websites from scratch",
    promptText: `You are a senior full-stack developer. Build a complete, production-ready website based on these requirements:

Project: [PROJECT_NAME]
Stack: [STACK]
Features: [FEATURE_LIST]

Requirements:
- Clean, modern UI with Tailwind CSS
- Fully responsive mobile design
- TypeScript strict mode
- SEO optimized
- Accessible (WCAG 2.1 AA)
- Performance optimized

Deliver:
1. Complete file structure
2. All source files
3. Setup instructions
4. Deployment guide`,
    difficulty: "intermediate",
    bestModel: "Claude Sonnet",
    tags: ["web", "fullstack", "coding"],
  },
  {
    id: "audit-codebase",
    titleAr: "مراجعة قاعدة الكود",
    titleEn: "Audit a Codebase",
    category: "Coding",
    useCaseAr: "مراجعة كود قائم وتحسينه",
    useCaseEn: "Review existing code and improve it",
    promptText: `You are a senior code reviewer. Perform a comprehensive audit of this codebase:

[PASTE CODE HERE]

Audit checklist:
- Security vulnerabilities (OWASP Top 10)
- Performance bottlenecks
- Code quality and maintainability
- Missing error handling
- Test coverage gaps
- Documentation gaps
- Dependency issues

For each issue found: severity (critical/high/medium/low), location, explanation, fix recommendation.`,
    difficulty: "advanced",
    bestModel: "Claude Opus",
    tags: ["code-review", "security", "quality"],
  },
  {
    id: "fix-bug",
    titleAr: "إصلاح خطأ برمجي",
    titleEn: "Fix a Bug",
    category: "Coding",
    useCaseAr: "إيجاد وإصلاح الأخطاء البرمجية",
    useCaseEn: "Find and fix programming errors",
    promptText: `Debug and fix this issue:

Error: [ERROR_MESSAGE]
Expected: [EXPECTED_BEHAVIOR]
Actual: [ACTUAL_BEHAVIOR]

Code:
\`\`\`
[PASTE CODE]
\`\`\`

Provide:
1. Root cause analysis
2. Fixed code
3. Explanation of the fix
4. Tests to prevent regression`,
    difficulty: "beginner",
    bestModel: "Claude Sonnet",
    tags: ["debugging", "fix", "coding"],
  },
  {
    id: "create-tests",
    titleAr: "إنشاء اختبارات",
    titleEn: "Create Tests",
    category: "Coding",
    useCaseAr: "كتابة اختبارات شاملة للكود",
    useCaseEn: "Write comprehensive tests for code",
    promptText: `Write comprehensive tests for this code:

[PASTE CODE]

Testing framework: [JEST/PYTEST/VITEST/etc]

Include:
- Unit tests for all functions
- Integration tests for complex flows
- Edge cases and boundary conditions
- Error handling tests
- Mock external dependencies
- Minimum 80% coverage target`,
    difficulty: "intermediate",
    bestModel: "Claude Sonnet",
    tags: ["testing", "quality", "automation"],
  },
  {
    id: "refactor-component",
    titleAr: "إعادة هيكلة مكون",
    titleEn: "Refactor a Component",
    category: "Coding",
    useCaseAr: "تحسين وإعادة هيكلة مكونات الكود",
    useCaseEn: "Improve and restructure code components",
    promptText: `Refactor this component for better readability, performance, and maintainability:

[PASTE COMPONENT]

Goals:
- Reduce complexity
- Improve naming
- Split into smaller pieces if needed
- Add proper TypeScript types
- Optimize re-renders (if React)
- Remove code duplication

Keep the same external API and behavior.`,
    difficulty: "intermediate",
    bestModel: "Claude Sonnet",
    tags: ["refactoring", "clean-code", "typescript"],
  },
  {
    id: "course-outline",
    titleAr: "بناء منهج دراسي",
    titleEn: "Build a Course Outline",
    category: "Learning",
    useCaseAr: "تصميم منهج دراسي احترافي",
    useCaseEn: "Design a professional course curriculum",
    promptText: `Design a comprehensive course curriculum for:

Topic: [TOPIC]
Target audience: [AUDIENCE]
Duration: [DURATION]
Level: [BEGINNER/INTERMEDIATE/ADVANCED]

Deliver:
1. Course overview and learning objectives
2. Module breakdown (8-12 modules)
3. Each module: lessons, topics, exercises, projects
4. Assessment strategy
5. Prerequisites
6. Recommended resources`,
    difficulty: "beginner",
    bestModel: "Claude Sonnet",
    tags: ["education", "curriculum", "content"],
  },
  {
    id: "analyze-pdf",
    titleAr: "تحليل وثيقة PDF",
    titleEn: "Analyze a PDF",
    category: "Research",
    useCaseAr: "تحليل واستخراج المعلومات من الوثائق",
    useCaseEn: "Analyze and extract information from documents",
    promptText: `Analyze this document thoroughly:

[PASTE DOCUMENT CONTENT]

Provide:
1. Executive summary (3-5 sentences)
2. Key findings and insights
3. Main arguments or claims
4. Data points and statistics
5. Methodology (if applicable)
6. Strengths and limitations
7. Actionable recommendations
8. Questions for further investigation`,
    difficulty: "beginner",
    bestModel: "Claude Sonnet",
    tags: ["analysis", "research", "documents"],
  },
  {
    id: "research-brief",
    titleAr: "إنشاء موجز بحثي",
    titleEn: "Create a Research Brief",
    category: "Research",
    useCaseAr: "كتابة ملخصات بحثية منظمة",
    useCaseEn: "Write structured research summaries",
    promptText: `Create a comprehensive research brief on:

Topic: [TOPIC]
Purpose: [PURPOSE]
Audience: [TARGET_AUDIENCE]

Include:
1. Background and context
2. Current state of knowledge
3. Key research questions
4. Major findings from literature
5. Gaps in current research
6. Methodology recommendations
7. Resource list
8. Executive summary`,
    difficulty: "intermediate",
    bestModel: "Claude Opus",
    tags: ["research", "writing", "academic"],
  },
  {
    id: "automation-workflow",
    titleAr: "بناء سير عمل أتمتة",
    titleEn: "Build an Automation Workflow",
    category: "Automation",
    useCaseAr: "تصميم سير عمل أتمتة كاملة",
    useCaseEn: "Design complete automation workflows",
    promptText: `Design an automation workflow for:

Goal: [AUTOMATION_GOAL]
Current manual process: [DESCRIBE_PROCESS]
Tools available: [n8n/Make/Zapier/etc]
Trigger: [WHAT_STARTS_THE_WORKFLOW]

Deliver:
1. Workflow diagram (text description)
2. Step-by-step node configuration
3. Error handling strategy
4. Testing approach
5. Monitoring recommendations`,
    difficulty: "intermediate",
    bestModel: "Claude Sonnet",
    tags: ["automation", "workflow", "n8n"],
  },
  {
    id: "business-strategy",
    titleAr: "استراتيجية عمل",
    titleEn: "Create a Business Strategy",
    category: "Business",
    useCaseAr: "تطوير استراتيجيات أعمال شاملة",
    useCaseEn: "Develop comprehensive business strategies",
    promptText: `Create a business strategy for:

Business: [BUSINESS_DESCRIPTION]
Goal: [STRATEGIC_GOAL]
Timeline: [TIMEFRAME]
Resources: [AVAILABLE_RESOURCES]
Market: [TARGET_MARKET]

Deliver:
1. Situation analysis (SWOT)
2. Strategic objectives
3. Action plan with milestones
4. KPIs and metrics
5. Risk mitigation
6. Resource allocation
7. Success criteria`,
    difficulty: "intermediate",
    bestModel: "Claude Opus",
    tags: ["business", "strategy", "planning"],
  },
  {
    id: "cloud-architecture",
    titleAr: "توليد بنية سحابية",
    titleEn: "Generate a Cloud Architecture",
    category: "Cloud",
    useCaseAr: "تصميم بنى تحتية سحابية",
    useCaseEn: "Design cloud infrastructure architectures",
    promptText: `Design a cloud architecture for:

Application: [APP_DESCRIPTION]
Cloud provider: [AWS/Azure/GCP]
Scale: [EXPECTED_TRAFFIC]
Budget: [BUDGET_RANGE]
Requirements: [PERFORMANCE/COMPLIANCE/etc]

Deliver:
1. Architecture diagram (text)
2. Service selection and justification
3. Network design
4. Security configuration
5. Scaling strategy
6. Cost estimate
7. IaC approach (Terraform/CDK)
8. Monitoring setup`,
    difficulty: "advanced",
    bestModel: "Claude Opus",
    tags: ["cloud", "architecture", "devops"],
  },
  {
    id: "rag-pipeline",
    titleAr: "بناء خط RAG",
    titleEn: "Create a RAG Pipeline",
    category: "Claude",
    useCaseAr: "تصميم وبناء أنظمة RAG",
    useCaseEn: "Design and build RAG systems",
    promptText: `Build a production-ready RAG pipeline for:

Use case: [USE_CASE]
Documents: [DOCUMENT_TYPES]
Expected queries: [QUERY_TYPES]
Stack preference: [LANGCHAIN/LLAMAINDEX/etc]

Deliver:
1. Complete pipeline architecture
2. Chunking strategy
3. Embedding selection
4. Vector DB configuration
5. Retrieval strategy (hybrid/dense)
6. Prompt templates
7. Evaluation metrics
8. Full code implementation`,
    difficulty: "advanced",
    bestModel: "Claude Opus",
    tags: ["rag", "ai", "langchain"],
  },
  {
    id: "deployment-guide",
    titleAr: "دليل نشر",
    titleEn: "Create a Deployment Guide",
    category: "Cloud",
    useCaseAr: "توثيق خطوات النشر",
    useCaseEn: "Document deployment steps",
    promptText: `Create a complete deployment guide for:

Application: [APP_NAME]
Stack: [TECH_STACK]
Target platform: [VERCEL/AWS/etc]
Environment: [PRODUCTION/STAGING]

Deliver:
1. Prerequisites checklist
2. Environment variables list
3. Step-by-step deployment commands
4. Common errors and solutions
5. Rollback procedure
6. Health check verification
7. Monitoring setup`,
    difficulty: "intermediate",
    bestModel: "Claude Sonnet",
    tags: ["deployment", "devops", "docs"],
  },
  {
    id: "seo-content",
    titleAr: "محتوى SEO",
    titleEn: "Create SEO Content",
    category: "Content Creation",
    useCaseAr: "كتابة محتوى محسّن لمحركات البحث",
    useCaseEn: "Write search engine optimized content",
    promptText: `Write SEO-optimized content for:

Topic: [TOPIC]
Target keyword: [PRIMARY_KEYWORD]
Secondary keywords: [SECONDARY_KEYWORDS]
Word count: [TARGET_LENGTH]
Audience: [TARGET_AUDIENCE]

Requirements:
- Include keyword naturally (1-2% density)
- Compelling meta title and description
- Clear H1, H2, H3 structure
- Internal linking opportunities
- Call to action
- Schema markup recommendations`,
    difficulty: "beginner",
    bestModel: "Claude Sonnet",
    tags: ["seo", "content", "marketing"],
  },
  {
    id: "learning-roadmap",
    titleAr: "خارطة طريق التعلم",
    titleEn: "Create a Learning Roadmap",
    category: "Learning",
    useCaseAr: "تصميم خطط تعلم مخصصة",
    useCaseEn: "Design personalized learning plans",
    promptText: `Create a personalized learning roadmap for:

Goal: [LEARNING_GOAL]
Current level: [CURRENT_KNOWLEDGE]
Available time: [HOURS_PER_WEEK]
Timeline: [TOTAL_MONTHS]
Learning style: [VISUAL/READING/PROJECTS]

Deliver:
1. Phase-by-phase plan with milestones
2. Weekly schedule template
3. Resource recommendations (free & paid)
4. Projects to build
5. Skills to acquire
6. Metrics to track progress
7. Community to join`,
    difficulty: "beginner",
    bestModel: "Claude Sonnet",
    tags: ["learning", "planning", "education"],
  },
  {
    id: "mvp-plan",
    titleAr: "خطة MVP",
    titleEn: "Create an MVP Plan",
    category: "Business",
    useCaseAr: "تخطيط المنتج الأدنى قابلية للتطبيق",
    useCaseEn: "Plan minimum viable products",
    promptText: `Create an MVP plan for:

Product idea: [PRODUCT_IDEA]
Target users: [TARGET_USERS]
Problem solved: [PROBLEM]
Budget: [BUDGET]
Timeline: [WEEKS]

Deliver:
1. MVP feature set (must-have vs nice-to-have)
2. Tech stack recommendation
3. Week-by-week build plan
4. Success metrics
5. User testing approach
6. Launch strategy
7. Post-MVP roadmap`,
    difficulty: "intermediate",
    bestModel: "Claude Sonnet",
    tags: ["mvp", "product", "startup"],
  },
  {
    id: "database-schema",
    titleAr: "تصميم مخطط قاعدة البيانات",
    titleEn: "Create a Database Schema",
    category: "Coding",
    useCaseAr: "تصميم هياكل قواعد البيانات",
    useCaseEn: "Design database structures",
    promptText: `Design a database schema for:

Application: [APP_DESCRIPTION]
Database: [PostgreSQL/MySQL/MongoDB]
Entities: [LIST_MAIN_ENTITIES]
Scale: [EXPECTED_USERS]

Deliver:
1. Full schema with all tables/collections
2. Relationships and foreign keys
3. Indexes for performance
4. Example SQL/queries
5. Migration scripts
6. RLS policies (if Supabase)
7. Seeding strategy`,
    difficulty: "intermediate",
    bestModel: "Claude Sonnet",
    tags: ["database", "schema", "sql"],
  },
  {
    id: "api-design",
    titleAr: "تصميم API",
    titleEn: "Design an API",
    category: "Coding",
    useCaseAr: "تصميم وتوثيق واجهات برمجة التطبيقات",
    useCaseEn: "Design and document application programming interfaces",
    promptText: `Design a REST API for:

Service: [SERVICE_DESCRIPTION]
Resources: [LIST_RESOURCES]
Authentication: [JWT/API_KEY/OAuth]
Scale: [EXPECTED_REQUESTS/DAY]

Deliver:
1. OpenAPI/Swagger specification
2. All endpoints with methods, paths, parameters
3. Request/response schemas
4. Error codes and messages
5. Rate limiting strategy
6. Versioning approach
7. Example code snippets`,
    difficulty: "intermediate",
    bestModel: "Claude Sonnet",
    tags: ["api", "rest", "design"],
  },
  {
    id: "security-review",
    titleAr: "مراجعة الأمان",
    titleEn: "Review Security Risks",
    category: "Security",
    useCaseAr: "تقييم وتحسين أمان التطبيقات",
    useCaseEn: "Assess and improve application security",
    promptText: `Perform a security review on:

[PASTE CODE OR ARCHITECTURE]

Check for:
1. OWASP Top 10 vulnerabilities
2. Authentication/authorization flaws
3. Data exposure risks
4. Injection vulnerabilities (SQL, XSS, etc)
5. Insecure dependencies
6. API security issues
7. Secrets management
8. Infrastructure misconfigurations

For each: severity, location, fix with code example.`,
    difficulty: "advanced",
    bestModel: "Claude Opus",
    tags: ["security", "owasp", "review"],
  },
  {
    id: "ui-ux-improve",
    titleAr: "تحسين UI/UX",
    titleEn: "Improve UI/UX",
    category: "UI/UX",
    useCaseAr: "تحسين تجربة وواجهة المستخدم",
    useCaseEn: "Improve user experience and interface",
    promptText: `Review and improve the UI/UX of:

[PASTE CODE OR DESCRIBE INTERFACE]

Evaluate:
1. Visual hierarchy and typography
2. Color contrast and accessibility
3. Mobile responsiveness
4. Navigation clarity
5. Loading states and feedback
6. Error handling UX
7. Performance perception

Deliver improved code and explanations.`,
    difficulty: "intermediate",
    bestModel: "Claude Sonnet",
    tags: ["ui", "ux", "design", "accessibility"],
  },
  {
    id: "translate-localize",
    titleAr: "ترجمة وتوطين واجهة",
    titleEn: "Translate and Localize UI",
    category: "Content Creation",
    useCaseAr: "ترجمة وتوطين الواجهات للغة العربية",
    useCaseEn: "Translate and localize interfaces to Arabic",
    promptText: `Translate and localize this UI for Arabic:

[PASTE EN CONTENT/CODE]

Requirements:
- Natural, professional Arabic (not machine translation)
- RTL layout adjustments
- Date/number format localization
- Cultural appropriateness
- Maintain meaning and tone
- Flag cultural references that need adaptation

Deliver: translated strings, RTL CSS adjustments, localization notes.`,
    difficulty: "beginner",
    bestModel: "Claude Sonnet",
    tags: ["arabic", "i18n", "rtl", "localization"],
  },
  {
    id: "design-to-code",
    titleAr: "تحويل التصميم إلى كود",
    titleEn: "Convert Design to Code",
    category: "Coding",
    useCaseAr: "تحويل تصاميم Figma إلى كود قابل للتشغيل",
    useCaseEn: "Convert Figma designs to working code",
    promptText: `Convert this design to production-ready code:

[DESCRIBE DESIGN OR PASTE IMAGE URL]

Stack: React + Tailwind CSS + TypeScript

Requirements:
- Pixel-perfect implementation
- Fully responsive
- Accessible markup
- Clean component structure
- Hover/focus states
- Dark mode support

Deliver the complete component.`,
    difficulty: "intermediate",
    bestModel: "Claude Sonnet",
    tags: ["design", "figma", "react", "tailwind"],
  },
  {
    id: "github-release",
    titleAr: "إعداد إصدار GitHub",
    titleEn: "Prepare GitHub Release",
    category: "Project Management",
    useCaseAr: "إعداد إصدارات GitHub احترافية",
    useCaseEn: "Prepare professional GitHub releases",
    promptText: `Prepare a GitHub release for:

Project: [PROJECT_NAME]
Version: [VERSION_NUMBER]
Changes: [LIST_CHANGES]

Deliver:
1. Release notes in Markdown
2. CHANGELOG.md update
3. Git tag commands
4. GitHub release body
5. Migration guide (if breaking changes)
6. Known issues section
7. Contributors acknowledgment`,
    difficulty: "beginner",
    bestModel: "Claude Sonnet",
    tags: ["github", "release", "documentation"],
  },
  {
    id: "vercel-deployment",
    titleAr: "خطة نشر على Vercel",
    titleEn: "Plan Vercel Deployment",
    category: "Cloud",
    useCaseAr: "التخطيط لنشر مشاريع Next.js على Vercel",
    useCaseEn: "Plan Next.js project deployments on Vercel",
    promptText: `Create a Vercel deployment plan for:

Project: [PROJECT_NAME]
Framework: [NEXT.JS/VITE/etc]
Environment variables: [LIST_ENV_VARS]
Custom domain: [DOMAIN if any]

Deliver:
1. Pre-deployment checklist
2. vercel.json configuration
3. Environment variable setup
4. Build optimization settings
5. Edge/Serverless function configuration
6. Domain and DNS setup
7. Monitoring setup`,
    difficulty: "beginner",
    bestModel: "Claude Sonnet",
    tags: ["vercel", "deployment", "nextjs"],
  },
  {
    id: "project-context",
    titleAr: "سياق استمرار المشروع",
    titleEn: "Create Project Continuation Context",
    category: "Project Management",
    useCaseAr: "توثيق سياق المشروع للاستمرارية",
    useCaseEn: "Document project context for continuity",
    promptText: `Create a comprehensive project continuation context document for:

Project: [PROJECT_NAME]
Current state: [WHAT_IS_DONE]
Tech stack: [TECHNOLOGIES]

Include:
1. Project overview and goals
2. Current implementation status
3. File structure and key files
4. Architecture decisions made
5. Known issues and limitations
6. Next steps in priority order
7. Exact continuation prompts for AI
8. Important warnings and gotchas`,
    difficulty: "beginner",
    bestModel: "Claude Sonnet",
    tags: ["documentation", "context", "planning"],
  },
  {
    id: "claude-system-prompt",
    titleAr: "مطالبة نظام Claude",
    titleEn: "Claude System Prompt Designer",
    category: "Claude",
    useCaseAr: "تصميم مطالبات نظام احترافية لـ Claude",
    useCaseEn: "Design professional system prompts for Claude",
    promptText: `Design a system prompt for a Claude-powered assistant:

Role: [ASSISTANT_ROLE]
Domain: [KNOWLEDGE_DOMAIN]
Tone: [PROFESSIONAL/FRIENDLY/TECHNICAL]
Constraints: [WHAT_IT_SHOULD_NOT_DO]
Users: [WHO_WILL_USE_IT]

Create a system prompt that:
- Establishes clear role and persona
- Sets appropriate tone and style
- Defines output format expectations
- Includes safety boundaries
- Provides domain expertise signals
- Handles edge cases`,
    difficulty: "intermediate",
    bestModel: "Claude Sonnet",
    tags: ["claude", "system-prompt", "prompting"],
  },
  // C2 additions
  {
    id: "explain-concept",
    titleAr: "شرح مفهوم معقد ببساطة",
    titleEn: "Explain a Complex Concept Simply",
    category: "Learning",
    useCaseAr: "تبسيط المفاهيم التقنية والعلمية لأي مستوى",
    useCaseEn: "Simplify technical and scientific concepts for any level",
    promptText: `Explain this concept in a clear, simple way:

Concept: [CONCEPT_NAME]
Audience level: [BEGINNER/INTERMEDIATE/EXPERT]
Context: [WHERE_THEY_WILL_USE_THIS]

Structure your explanation as:
1. One-sentence definition
2. Real-world analogy (no jargon)
3. How it actually works (step by step)
4. Concrete example they can relate to
5. Common misconceptions
6. Why it matters
7. What to learn next`,
    difficulty: "beginner",
    bestModel: "Claude Sonnet",
    tags: ["teaching", "learning", "simplify", "education"],
  },
  {
    id: "data-analysis-prompt",
    titleAr: "تحليل بيانات بالذكاء الاصطناعي",
    titleEn: "Analyze Data with AI",
    category: "Data",
    useCaseAr: "تحليل جداول وCSV واستخراج الرؤى الرئيسية",
    useCaseEn: "Analyze tables and CSV files to extract key insights",
    promptText: `Analyze this dataset and provide actionable insights:

Data: [PASTE DATA OR DESCRIBE IT]
Business context: [WHAT_THIS_DATA_REPRESENTS]
Key question to answer: [MAIN_QUESTION]

Provide:
1. Data quality assessment (missing values, outliers, issues)
2. Key statistics (mean, median, distributions where relevant)
3. Top 5 insights and patterns
4. Answer to the key question with evidence
5. Anomalies or interesting findings
6. Recommendations based on the data
7. Follow-up analyses worth doing`,
    difficulty: "intermediate",
    bestModel: "Claude Opus",
    tags: ["data", "analysis", "csv", "insights", "statistics"],
  },
  {
    id: "linkedin-post",
    titleAr: "كتابة منشور LinkedIn احترافي",
    titleEn: "Write a Professional LinkedIn Post",
    category: "Business",
    useCaseAr: "كتابة محتوى LinkedIn يجذب التفاعل ويبني الحضور المهني",
    useCaseEn: "Write LinkedIn content that drives engagement and builds professional presence",
    promptText: `Write an engaging LinkedIn post about:

Topic: [TOPIC_OR_ACHIEVEMENT]
My role/industry: [YOUR_BACKGROUND]
Target audience: [WHO_YOU_WANT_TO_REACH]
Goal: [AWARENESS/LEADS/NETWORK/JOBS]
Tone: [PROFESSIONAL/PERSONAL/THOUGHT_LEADERSHIP]

Requirements:
- Hook in the first line (stop the scroll)
- Share a specific insight or lesson, not generic advice
- 3-5 short paragraphs max
- End with a question to spark comments
- 3-5 relevant hashtags
- Optional: CTA (call to action)`,
    difficulty: "beginner",
    bestModel: "Claude Sonnet",
    tags: ["linkedin", "social", "content", "personal-brand", "writing"],
  },
  {
    id: "cv-review",
    titleAr: "مراجعة وتحسين السيرة الذاتية",
    titleEn: "Review and Improve a CV",
    category: "Career",
    useCaseAr: "تحليل CV وتحسينه للحصول على درجة ATS أعلى وانطباع أقوى",
    useCaseEn: "Analyze and improve a CV for higher ATS score and stronger impression",
    promptText: `Review and improve this CV for the following role:

CV content: [PASTE_CV_TEXT]
Target role: [JOB_TITLE_AND_INDUSTRY]
Years of experience: [NUMBER]

Analyze and provide:
1. ATS compatibility score (0-100) and what's hurting it
2. Missing keywords for this role
3. Weak bullet points to rewrite (give improved versions)
4. Skills section gaps
5. Format and length issues
6. Top 3 strengths to highlight more
7. Fully rewritten summary/objective section
8. Overall priority fixes (ordered by impact)`,
    difficulty: "beginner",
    bestModel: "Claude Sonnet",
    tags: ["cv", "resume", "career", "ats", "job-search"],
  },
  {
    id: "debug-performance",
    titleAr: "تشخيص مشاكل الأداء",
    titleEn: "Debug Performance Issues",
    category: "Coding",
    useCaseAr: "تحليل الكود البطيء وإيجاد اختناقات الأداء",
    useCaseEn: "Analyze slow code and find performance bottlenecks",
    promptText: `Diagnose and fix performance issues in this code:

Code: [PASTE_CODE]
Language/Framework: [TECH_STACK]
Observed issue: [DESCRIBE_SLOWNESS_OR_PROBLEM]
Scale: [USERS/REQUESTS_PER_SECOND]

Provide:
1. Performance bottleneck analysis (identify top issues)
2. Big-O complexity analysis of key functions
3. Memory usage issues
4. Database query problems (N+1, missing indexes)
5. Unnecessary re-renders or recomputations
6. Optimized version of the code
7. Benchmarking approach to verify improvement
8. Monitoring recommendations`,
    difficulty: "advanced",
    bestModel: "Claude Opus",
    tags: ["performance", "debugging", "optimization", "profiling"],
  },
];

export const promptCategories = [...new Set(prompts.map((p) => p.category))];
