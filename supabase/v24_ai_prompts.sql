-- ══════════════════════════════════════════════════════════════════
-- v24 — AI Prompts (ai_prompts)
-- Run in: Supabase Dashboard → SQL Editor
-- Flat type — real columns for every field (matches the ai_glossary /
-- blog_posts / nano_banana_custom_prompts precedent — prompts have no
-- nested structure, just primitives + a tags string array).
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS ai_prompts (
  id            TEXT        PRIMARY KEY,                 -- = existing slug (e.g. 'build-website') — keeps links intact
  portal_id     TEXT        NOT NULL DEFAULT 'ai-academy',
  content_type  TEXT        NOT NULL DEFAULT 'prompt',
  status        TEXT        NOT NULL DEFAULT 'published'
                            CHECK (status IN ('published','draft','archived')),
  featured      BOOLEAN     NOT NULL DEFAULT false,
  sort_order    INT         NOT NULL DEFAULT 0,
  category      TEXT        NOT NULL DEFAULT '',
  title_ar      TEXT        NOT NULL DEFAULT '',
  title_en      TEXT        NOT NULL DEFAULT '',
  use_case_ar   TEXT        NOT NULL DEFAULT '',
  use_case_en   TEXT        NOT NULL DEFAULT '',
  prompt_text   TEXT        NOT NULL DEFAULT '',
  difficulty    TEXT        NOT NULL DEFAULT 'beginner'
                            CHECK (difficulty IN ('beginner','intermediate','advanced')),
  best_model    TEXT        NOT NULL DEFAULT '',
  tags          TEXT[]      NOT NULL DEFAULT '{}',
  created_by    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at   TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_ai_prompts_status   ON ai_prompts (status);
CREATE INDEX IF NOT EXISTS idx_ai_prompts_category ON ai_prompts (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_ai_prompts_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_ai_prompts_updated_at ON ai_prompts;
CREATE TRIGGER trg_ai_prompts_updated_at
  BEFORE UPDATE ON ai_prompts
  FOR EACH ROW EXECUTE FUNCTION update_ai_prompts_updated_at();

-- 3. RLS
ALTER TABLE ai_prompts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_ai_prompts" ON ai_prompts;
CREATE POLICY "public_read_published_ai_prompts"
  ON ai_prompts FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_ai_prompts" ON ai_prompts;
CREATE POLICY "admin_manage_ai_prompts"
  ON ai_prompts FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching the existing tables' convention.

-- ══════════════════════════════════════════════════════════════════
-- 4. Seed — the 31 existing static prompts, SAME ids, status='published'.
--    The DB now holds the full set; static array remains as fallback only.
--    Generated programmatically from src/data/prompts.ts (zero transcription risk).
-- ══════════════════════════════════════════════════════════════════
INSERT INTO ai_prompts (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, use_case_ar, use_case_en, prompt_text, difficulty, best_model, tags, published_at)
VALUES
  ('build-website', 'ai-academy', 'prompt', 'published', false, 0, 'Claude', 'بناء موقع ويب كامل', 'Build a Complete Website', 'بناء مواقع ويب من الصفر', 'Building websites from scratch', 'You are a senior full-stack developer. Build a complete, production-ready website based on these requirements:

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
4. Deployment guide', 'intermediate', 'Claude Sonnet', ARRAY['web', 'fullstack', 'coding']::text[], now()),
  ('audit-codebase', 'ai-academy', 'prompt', 'published', false, 10, 'Coding', 'مراجعة قاعدة الكود', 'Audit a Codebase', 'مراجعة كود قائم وتحسينه', 'Review existing code and improve it', 'You are a senior code reviewer. Perform a comprehensive audit of this codebase:

[PASTE CODE HERE]

Audit checklist:
- Security vulnerabilities (OWASP Top 10)
- Performance bottlenecks
- Code quality and maintainability
- Missing error handling
- Test coverage gaps
- Documentation gaps
- Dependency issues

For each issue found: severity (critical/high/medium/low), location, explanation, fix recommendation.', 'advanced', 'Claude Opus', ARRAY['code-review', 'security', 'quality']::text[], now()),
  ('fix-bug', 'ai-academy', 'prompt', 'published', false, 20, 'Coding', 'إصلاح خطأ برمجي', 'Fix a Bug', 'إيجاد وإصلاح الأخطاء البرمجية', 'Find and fix programming errors', 'Debug and fix this issue:

Error: [ERROR_MESSAGE]
Expected: [EXPECTED_BEHAVIOR]
Actual: [ACTUAL_BEHAVIOR]

Code:
```
[PASTE CODE]
```

Provide:
1. Root cause analysis
2. Fixed code
3. Explanation of the fix
4. Tests to prevent regression', 'beginner', 'Claude Sonnet', ARRAY['debugging', 'fix', 'coding']::text[], now()),
  ('create-tests', 'ai-academy', 'prompt', 'published', false, 30, 'Coding', 'إنشاء اختبارات', 'Create Tests', 'كتابة اختبارات شاملة للكود', 'Write comprehensive tests for code', 'Write comprehensive tests for this code:

[PASTE CODE]

Testing framework: [JEST/PYTEST/VITEST/etc]

Include:
- Unit tests for all functions
- Integration tests for complex flows
- Edge cases and boundary conditions
- Error handling tests
- Mock external dependencies
- Minimum 80% coverage target', 'intermediate', 'Claude Sonnet', ARRAY['testing', 'quality', 'automation']::text[], now()),
  ('refactor-component', 'ai-academy', 'prompt', 'published', false, 40, 'Coding', 'إعادة هيكلة مكون', 'Refactor a Component', 'تحسين وإعادة هيكلة مكونات الكود', 'Improve and restructure code components', 'Refactor this component for better readability, performance, and maintainability:

[PASTE COMPONENT]

Goals:
- Reduce complexity
- Improve naming
- Split into smaller pieces if needed
- Add proper TypeScript types
- Optimize re-renders (if React)
- Remove code duplication

Keep the same external API and behavior.', 'intermediate', 'Claude Sonnet', ARRAY['refactoring', 'clean-code', 'typescript']::text[], now()),
  ('course-outline', 'ai-academy', 'prompt', 'published', false, 50, 'Learning', 'بناء منهج دراسي', 'Build a Course Outline', 'تصميم منهج دراسي احترافي', 'Design a professional course curriculum', 'Design a comprehensive course curriculum for:

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
6. Recommended resources', 'beginner', 'Claude Sonnet', ARRAY['education', 'curriculum', 'content']::text[], now()),
  ('analyze-pdf', 'ai-academy', 'prompt', 'published', false, 60, 'Research', 'تحليل وثيقة PDF', 'Analyze a PDF', 'تحليل واستخراج المعلومات من الوثائق', 'Analyze and extract information from documents', 'Analyze this document thoroughly:

[PASTE DOCUMENT CONTENT]

Provide:
1. Executive summary (3-5 sentences)
2. Key findings and insights
3. Main arguments or claims
4. Data points and statistics
5. Methodology (if applicable)
6. Strengths and limitations
7. Actionable recommendations
8. Questions for further investigation', 'beginner', 'Claude Sonnet', ARRAY['analysis', 'research', 'documents']::text[], now()),
  ('research-brief', 'ai-academy', 'prompt', 'published', false, 70, 'Research', 'إنشاء موجز بحثي', 'Create a Research Brief', 'كتابة ملخصات بحثية منظمة', 'Write structured research summaries', 'Create a comprehensive research brief on:

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
8. Executive summary', 'intermediate', 'Claude Opus', ARRAY['research', 'writing', 'academic']::text[], now()),
  ('automation-workflow', 'ai-academy', 'prompt', 'published', false, 80, 'Automation', 'بناء سير عمل أتمتة', 'Build an Automation Workflow', 'تصميم سير عمل أتمتة كاملة', 'Design complete automation workflows', 'Design an automation workflow for:

Goal: [AUTOMATION_GOAL]
Current manual process: [DESCRIBE_PROCESS]
Tools available: [n8n/Make/Zapier/etc]
Trigger: [WHAT_STARTS_THE_WORKFLOW]

Deliver:
1. Workflow diagram (text description)
2. Step-by-step node configuration
3. Error handling strategy
4. Testing approach
5. Monitoring recommendations', 'intermediate', 'Claude Sonnet', ARRAY['automation', 'workflow', 'n8n']::text[], now()),
  ('business-strategy', 'ai-academy', 'prompt', 'published', false, 90, 'Business', 'استراتيجية عمل', 'Create a Business Strategy', 'تطوير استراتيجيات أعمال شاملة', 'Develop comprehensive business strategies', 'Create a business strategy for:

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
7. Success criteria', 'intermediate', 'Claude Opus', ARRAY['business', 'strategy', 'planning']::text[], now()),
  ('cloud-architecture', 'ai-academy', 'prompt', 'published', false, 100, 'Cloud', 'توليد بنية سحابية', 'Generate a Cloud Architecture', 'تصميم بنى تحتية سحابية', 'Design cloud infrastructure architectures', 'Design a cloud architecture for:

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
8. Monitoring setup', 'advanced', 'Claude Opus', ARRAY['cloud', 'architecture', 'devops']::text[], now()),
  ('rag-pipeline', 'ai-academy', 'prompt', 'published', false, 110, 'Claude', 'بناء خط RAG', 'Create a RAG Pipeline', 'تصميم وبناء أنظمة RAG', 'Design and build RAG systems', 'Build a production-ready RAG pipeline for:

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
8. Full code implementation', 'advanced', 'Claude Opus', ARRAY['rag', 'ai', 'langchain']::text[], now()),
  ('deployment-guide', 'ai-academy', 'prompt', 'published', false, 120, 'Cloud', 'دليل نشر', 'Create a Deployment Guide', 'توثيق خطوات النشر', 'Document deployment steps', 'Create a complete deployment guide for:

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
7. Monitoring setup', 'intermediate', 'Claude Sonnet', ARRAY['deployment', 'devops', 'docs']::text[], now()),
  ('seo-content', 'ai-academy', 'prompt', 'published', false, 130, 'Content Creation', 'محتوى SEO', 'Create SEO Content', 'كتابة محتوى محسّن لمحركات البحث', 'Write search engine optimized content', 'Write SEO-optimized content for:

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
- Schema markup recommendations', 'beginner', 'Claude Sonnet', ARRAY['seo', 'content', 'marketing']::text[], now()),
  ('learning-roadmap', 'ai-academy', 'prompt', 'published', false, 140, 'Learning', 'خارطة طريق التعلم', 'Create a Learning Roadmap', 'تصميم خطط تعلم مخصصة', 'Design personalized learning plans', 'Create a personalized learning roadmap for:

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
7. Community to join', 'beginner', 'Claude Sonnet', ARRAY['learning', 'planning', 'education']::text[], now()),
  ('mvp-plan', 'ai-academy', 'prompt', 'published', false, 150, 'Business', 'خطة MVP', 'Create an MVP Plan', 'تخطيط المنتج الأدنى قابلية للتطبيق', 'Plan minimum viable products', 'Create an MVP plan for:

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
7. Post-MVP roadmap', 'intermediate', 'Claude Sonnet', ARRAY['mvp', 'product', 'startup']::text[], now()),
  ('database-schema', 'ai-academy', 'prompt', 'published', false, 160, 'Coding', 'تصميم مخطط قاعدة البيانات', 'Create a Database Schema', 'تصميم هياكل قواعد البيانات', 'Design database structures', 'Design a database schema for:

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
7. Seeding strategy', 'intermediate', 'Claude Sonnet', ARRAY['database', 'schema', 'sql']::text[], now()),
  ('api-design', 'ai-academy', 'prompt', 'published', false, 170, 'Coding', 'تصميم API', 'Design an API', 'تصميم وتوثيق واجهات برمجة التطبيقات', 'Design and document application programming interfaces', 'Design a REST API for:

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
7. Example code snippets', 'intermediate', 'Claude Sonnet', ARRAY['api', 'rest', 'design']::text[], now()),
  ('security-review', 'ai-academy', 'prompt', 'published', false, 180, 'Security', 'مراجعة الأمان', 'Review Security Risks', 'تقييم وتحسين أمان التطبيقات', 'Assess and improve application security', 'Perform a security review on:

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

For each: severity, location, fix with code example.', 'advanced', 'Claude Opus', ARRAY['security', 'owasp', 'review']::text[], now()),
  ('ui-ux-improve', 'ai-academy', 'prompt', 'published', false, 190, 'UI/UX', 'تحسين UI/UX', 'Improve UI/UX', 'تحسين تجربة وواجهة المستخدم', 'Improve user experience and interface', 'Review and improve the UI/UX of:

[PASTE CODE OR DESCRIBE INTERFACE]

Evaluate:
1. Visual hierarchy and typography
2. Color contrast and accessibility
3. Mobile responsiveness
4. Navigation clarity
5. Loading states and feedback
6. Error handling UX
7. Performance perception

Deliver improved code and explanations.', 'intermediate', 'Claude Sonnet', ARRAY['ui', 'ux', 'design', 'accessibility']::text[], now()),
  ('translate-localize', 'ai-academy', 'prompt', 'published', false, 200, 'Content Creation', 'ترجمة وتوطين واجهة', 'Translate and Localize UI', 'ترجمة وتوطين الواجهات للغة العربية', 'Translate and localize interfaces to Arabic', 'Translate and localize this UI for Arabic:

[PASTE EN CONTENT/CODE]

Requirements:
- Natural, professional Arabic (not machine translation)
- RTL layout adjustments
- Date/number format localization
- Cultural appropriateness
- Maintain meaning and tone
- Flag cultural references that need adaptation

Deliver: translated strings, RTL CSS adjustments, localization notes.', 'beginner', 'Claude Sonnet', ARRAY['arabic', 'i18n', 'rtl', 'localization']::text[], now()),
  ('design-to-code', 'ai-academy', 'prompt', 'published', false, 210, 'Coding', 'تحويل التصميم إلى كود', 'Convert Design to Code', 'تحويل تصاميم Figma إلى كود قابل للتشغيل', 'Convert Figma designs to working code', 'Convert this design to production-ready code:

[DESCRIBE DESIGN OR PASTE IMAGE URL]

Stack: React + Tailwind CSS + TypeScript

Requirements:
- Pixel-perfect implementation
- Fully responsive
- Accessible markup
- Clean component structure
- Hover/focus states
- Dark mode support

Deliver the complete component.', 'intermediate', 'Claude Sonnet', ARRAY['design', 'figma', 'react', 'tailwind']::text[], now()),
  ('github-release', 'ai-academy', 'prompt', 'published', false, 220, 'Project Management', 'إعداد إصدار GitHub', 'Prepare GitHub Release', 'إعداد إصدارات GitHub احترافية', 'Prepare professional GitHub releases', 'Prepare a GitHub release for:

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
7. Contributors acknowledgment', 'beginner', 'Claude Sonnet', ARRAY['github', 'release', 'documentation']::text[], now()),
  ('vercel-deployment', 'ai-academy', 'prompt', 'published', false, 230, 'Cloud', 'خطة نشر على Vercel', 'Plan Vercel Deployment', 'التخطيط لنشر مشاريع Next.js على Vercel', 'Plan Next.js project deployments on Vercel', 'Create a Vercel deployment plan for:

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
7. Monitoring setup', 'beginner', 'Claude Sonnet', ARRAY['vercel', 'deployment', 'nextjs']::text[], now()),
  ('project-context', 'ai-academy', 'prompt', 'published', false, 240, 'Project Management', 'سياق استمرار المشروع', 'Create Project Continuation Context', 'توثيق سياق المشروع للاستمرارية', 'Document project context for continuity', 'Create a comprehensive project continuation context document for:

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
8. Important warnings and gotchas', 'beginner', 'Claude Sonnet', ARRAY['documentation', 'context', 'planning']::text[], now()),
  ('claude-system-prompt', 'ai-academy', 'prompt', 'published', false, 250, 'Claude', 'مطالبة نظام Claude', 'Claude System Prompt Designer', 'تصميم مطالبات نظام احترافية لـ Claude', 'Design professional system prompts for Claude', 'Design a system prompt for a Claude-powered assistant:

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
- Handles edge cases', 'intermediate', 'Claude Sonnet', ARRAY['claude', 'system-prompt', 'prompting']::text[], now()),
  ('explain-concept', 'ai-academy', 'prompt', 'published', false, 260, 'Learning', 'شرح مفهوم معقد ببساطة', 'Explain a Complex Concept Simply', 'تبسيط المفاهيم التقنية والعلمية لأي مستوى', 'Simplify technical and scientific concepts for any level', 'Explain this concept in a clear, simple way:

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
7. What to learn next', 'beginner', 'Claude Sonnet', ARRAY['teaching', 'learning', 'simplify', 'education']::text[], now()),
  ('data-analysis-prompt', 'ai-academy', 'prompt', 'published', false, 270, 'Data', 'تحليل بيانات بالذكاء الاصطناعي', 'Analyze Data with AI', 'تحليل جداول وCSV واستخراج الرؤى الرئيسية', 'Analyze tables and CSV files to extract key insights', 'Analyze this dataset and provide actionable insights:

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
7. Follow-up analyses worth doing', 'intermediate', 'Claude Opus', ARRAY['data', 'analysis', 'csv', 'insights', 'statistics']::text[], now()),
  ('linkedin-post', 'ai-academy', 'prompt', 'published', false, 280, 'Business', 'كتابة منشور LinkedIn احترافي', 'Write a Professional LinkedIn Post', 'كتابة محتوى LinkedIn يجذب التفاعل ويبني الحضور المهني', 'Write LinkedIn content that drives engagement and builds professional presence', 'Write an engaging LinkedIn post about:

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
- Optional: CTA (call to action)', 'beginner', 'Claude Sonnet', ARRAY['linkedin', 'social', 'content', 'personal-brand', 'writing']::text[], now()),
  ('cv-review', 'ai-academy', 'prompt', 'published', false, 290, 'Career', 'مراجعة وتحسين السيرة الذاتية', 'Review and Improve a CV', 'تحليل CV وتحسينه للحصول على درجة ATS أعلى وانطباع أقوى', 'Analyze and improve a CV for higher ATS score and stronger impression', 'Review and improve this CV for the following role:

CV content: [PASTE_CV_TEXT]
Target role: [JOB_TITLE_AND_INDUSTRY]
Years of experience: [NUMBER]

Analyze and provide:
1. ATS compatibility score (0-100) and what''s hurting it
2. Missing keywords for this role
3. Weak bullet points to rewrite (give improved versions)
4. Skills section gaps
5. Format and length issues
6. Top 3 strengths to highlight more
7. Fully rewritten summary/objective section
8. Overall priority fixes (ordered by impact)', 'beginner', 'Claude Sonnet', ARRAY['cv', 'resume', 'career', 'ats', 'job-search']::text[], now()),
  ('debug-performance', 'ai-academy', 'prompt', 'published', false, 300, 'Coding', 'تشخيص مشاكل الأداء', 'Debug Performance Issues', 'تحليل الكود البطيء وإيجاد اختناقات الأداء', 'Analyze slow code and find performance bottlenecks', 'Diagnose and fix performance issues in this code:

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
8. Monitoring recommendations', 'advanced', 'Claude Opus', ARRAY['performance', 'debugging', 'optimization', 'profiling']::text[], now());
