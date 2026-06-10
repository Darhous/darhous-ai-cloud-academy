# Validation Results

## npm run typecheck


> darhous-ai-cloud-academy@0.1.0 typecheck
> tsc --noEmit


Exit code: 0

## npm run lint


> darhous-ai-cloud-academy@0.1.0 lint
> eslint


C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\app\[locale]\certificates\CertificatesClient.tsx
   25:48  warning  '_locale' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   @typescript-eslint/no-unused-vars
  121:5   warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\app\[locale]\certificates\CertificatesClient.tsx:121:5
  119 |   useEffect(() => {
  120 |     if (!user || !supabaseConfigured) return;
> 121 |     setLoading(true);
      |     ^^^^^^^^^^ Avoid calling setState() directly within an effect
  122 |
  123 |     async function load() {
  124 |       const certRes = await fetch("/api/certificates").then((r) => r.json());  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\app\[locale]\courses\[slug]\page.tsx
  9:76  warning  'ChevronLeft' is defined but never used   @typescript-eslint/no-unused-vars
  9:89  warning  'ChevronRight' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\app\[locale]\learning-plans\LearningPlansClient.tsx
  31:5  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\app\[locale]\learning-plans\LearningPlansClient.tsx:31:5
  29 |   useEffect(() => {
  30 |     if (!user || !supabaseConfigured) return;
> 31 |     setLoading(true);
     |     ^^^^^^^^^^ Avoid calling setState() directly within an effect
  32 |     fetch("/api/learning-plans")
  33 |       .then((r) => r.json())
  34 |       .then((d) => setPlans(d.plans ?? []))  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\app\[locale]\mentor\MentorPageClient.tsx
  65:9  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\app\[locale]\mentor\MentorPageClient.tsx:65:9
  63 |       if (raw) {
  64 |         const ctx = JSON.parse(raw) as PageContext;
> 65 |         setPageContext(ctx);
     |         ^^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  66 |         sessionStorage.removeItem("ask_page_ctx");
  67 |       }
  68 |     } catch {}  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\app\[locale]\projects\[slug]\page.tsx
  9:10  warning  'ChevronLeft' is defined but never used   @typescript-eslint/no-unused-vars
  9:23  warning  'ChevronRight' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\app\api\mentor-stream\route.ts
   84:11  warning  'err' is assigned a value but never used  @typescript-eslint/no-unused-vars
  119:16  warning  'err' is defined but never used           @typescript-eslint/no-unused-vars

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\app\api\project-generator\route.ts
  18:62  warning  '_goal' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\app\api\search\route.ts
  177:52  warning  '_score' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\app\u\[username]\PublicProfileClient.tsx
  47:13  warning  Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\admin\AdminDashboardClient.tsx
    6:3   warning  'Users' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               @typescript-eslint/no-unused-vars
    6:10  warning  'Mail' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                @typescript-eslint/no-unused-vars
    8:3   warning  'TrendingUp' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          @typescript-eslint/no-unused-vars
    8:15  warning  'MessageSquare' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       @typescript-eslint/no-unused-vars
    8:48  warning  'Bot' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 @typescript-eslint/no-unused-vars
    9:3   warning  'Globe' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               @typescript-eslint/no-unused-vars
    9:10  warning  'Award' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               @typescript-eslint/no-unused-vars
    9:22  warning  'Palette' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             @typescript-eslint/no-unused-vars
    9:31  warning  'Bell' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                @typescript-eslint/no-unused-vars
   10:8   warning  'EyeOff' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              @typescript-eslint/no-unused-vars
   11:3   warning  'GraduationCap' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       @typescript-eslint/no-unused-vars
   11:18  warning  'Rocket' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              @typescript-eslint/no-unused-vars
   11:26  warning  'Map' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 @typescript-eslint/no-unused-vars
  296:18  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\admin\AdminDashboardClient.tsx:296:18
  294 |
  295 |   useEffect(() => {
> 296 |     if (isAdmin) fetchData();
      |                  ^^^^^^^^^ Avoid calling setState() directly within an effect
  297 |   }, [isAdmin, fetchData]);
  298 |
  299 |   // Fetch real system health on admin mount                                                                                                                                                             react-hooks/set-state-in-effect
  302:5   warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\admin\AdminDashboardClient.tsx:302:5
  300 |   useEffect(() => {
  301 |     if (!isAdmin) return;
> 302 |     setHealthLoading(true);
      |     ^^^^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  303 |     fetch("/api/admin/health")
  304 |       .then((r) => r.json())
  305 |       .then((data) => setHealth(data))                                                                                                                  react-hooks/set-state-in-effect
  315:5   warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\admin\AdminDashboardClient.tsx:315:5
  313 |     const supabase = createClient();
  314 |     if (!supabase) return;
> 315 |     setAnalyticsLoading(true);
      |     ^^^^^^^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  316 |     const PORTAL_EVENT_MAP: Record<string, string> = {
  317 |       prompt_copied: "ai-academy", prompt_scored: "ai-academy",
  318 |       prompt_battle: "ai-academy", nano_banana_saved: "ai-academy",  react-hooks/set-state-in-effect
  348:5   warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\admin\AdminDashboardClient.tsx:348:5
  346 |     const supabase = createClient();
  347 |     if (!supabase) return;
> 348 |     setLangLoading(true);
      |     ^^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  349 |     supabase
  350 |       .from("language_results")
  351 |       .select("id,score,level,stages_completed,is_incomplete,flags_count,certificate_id,created_at,user_id")                                             react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\admin\cms\DraftContentReviewPanel.tsx
  52:5  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\admin\cms\DraftContentReviewPanel.tsx:52:5
  50 |
  51 |   useEffect(() => {
> 52 |     setPage(1);
     |     ^^^^^^^ Avoid calling setState() directly within an effect
  53 |     setSelectedRow(null);
  54 |     fetchRows(1, search);
  55 |     // eslint-disable-next-line react-hooks/exhaustive-deps  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\admin\cms\GenericCmsTypePanel.tsx
  95:5  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\admin\cms\GenericCmsTypePanel.tsx:95:5
  93 |
  94 |   useEffect(() => {
> 95 |     setView("list");
     |     ^^^^^^^ Avoid calling setState() directly within an effect
  96 |     setMsg(null);
  97 |     setEditId(null);
  98 |     setForm(buildDefaultForm(config));  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\auth\ResetPasswordForm.tsx
  27:7  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\auth\ResetPasswordForm.tsx:27:7
  25 |     const supabase = createClient();
  26 |     if (!supabase) {
> 27 |       setHasSession(false);
     |       ^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  28 |       return;
  29 |     }
  30 |     supabase.auth.getSession().then(({ data }) => {  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\contact\ContactSuccessModal.tsx
  17:7  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\contact\ContactSuccessModal.tsx:17:7
  15 |   useEffect(() => {
  16 |     if (isSuccess) {
> 17 |       setOpen(true);
     |       ^^^^^^^ Avoid calling setState() directly within an effect
  18 |       // Auto-close after 6 seconds
  19 |       const t = setTimeout(() => setOpen(false), 6000);
  20 |       return () => clearTimeout(t);  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\dashboard\AICoachCard.tsx
  40:5   warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\dashboard\AICoachCard.tsx:40:5
  38 |
  39 |   useEffect(() => {
> 40 |     fetchCoach();
     |     ^^^^^^^^^^ Avoid calling setState() directly within an effect
  41 |   }, []); // eslint-disable-line react-hooks/exhaustive-deps
  42 |
  43 |   function copyPrompt() {  react-hooks/set-state-in-effect
  41:11  warning  Unused eslint-disable directive (no problems were reported from 'react-hooks/exhaustive-deps')

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\dashboard\StudentDashboardClient.tsx
  115:5   warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\dashboard\StudentDashboardClient.tsx:115:5
  113 |
  114 |   useEffect(() => {
> 115 |     setSavedCount(getSaved().length);
      |     ^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  116 |   }, []);
  117 |
  118 |   return (                                                                                                        react-hooks/set-state-in-effect
  406:7   warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\dashboard\StudentDashboardClient.tsx:406:7
  404 |     try {
  405 |       const raw = localStorage.getItem(NB_STORAGE_KEY);
> 406 |       setSavedCount(raw ? (JSON.parse(raw) as string[]).length : 0);
      |       ^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  407 |     } catch {
  408 |       setSavedCount(0);
  409 |     }  react-hooks/set-state-in-effect
  500:10  warning  '_dataLoading' is assigned a value but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          @typescript-eslint/no-unused-vars

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\exams\DigitalExamClient.tsx
   46:9  warning  '_router' is assigned a value but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             @typescript-eslint/no-unused-vars
  156:5  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\exams\DigitalExamClient.tsx:156:5
  154 |       return;
  155 |     }
> 156 |     startTimer();
      |     ^^^^^^^^^^ Avoid calling setState() directly within an effect
  157 |   }, [qIndex, phase]); // eslint-disable-line react-hooks/exhaustive-deps
  158 |
  159 |   async function finishExam(finalAnswers: Answer[], autoTerminated: boolean) {  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\exams\DigitalExamsHistoryClient.tsx
  45:29  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\exams\DigitalExamsHistoryClient.tsx:45:29
  43 |
  44 |   useEffect(() => {
> 45 |     if (!isAuthenticated) { setFetching(false); return; }
     |                             ^^^^^^^^^^^ Avoid calling setState() directly within an effect
  46 |     fetch("/api/exams/results?limit=100")
  47 |       .then((r) => r.json())
  48 |       .then(({ results: data }) => setResults(data ?? []))  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\features\CommandPalette.tsx
  141:9  warning  Expected an assignment or function call and instead saw an expression  @typescript-eslint/no-unused-expressions

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\features\CommandPaletteProvider.tsx
  10:19  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\features\CommandPaletteProvider.tsx:10:19
   8 | export default function CommandPaletteProvider({ locale }: { locale: string }) {
   9 |   const [mounted, setMounted] = useState(false);
> 10 |   useEffect(() => setMounted(true), []);
     |                   ^^^^^^^^^^ Avoid calling setState() directly within an effect
  11 |   if (!mounted) return null;
  12 |   return <CommandPalette locale={locale} />;
  13 | }  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\features\QuizSection.tsx
  24:18  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\features\QuizSection.tsx:24:18
  22 |     try {
  23 |       const saved = localStorage.getItem(storageKey);
> 24 |       if (saved) setBestScore(Number(saved));
     |                  ^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  25 |     } catch {}
  26 |   }, [storageKey]);
  27 |  react-hooks/set-state-in-effect
  91:17  warning  '_isWrong' is assigned a value but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   @typescript-eslint/no-unused-vars

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\landing\CinematicIntro.tsx
  23:14  warning  'e' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               @typescript-eslint/no-unused-vars
  29:5   warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\landing\CinematicIntro.tsx:29:5
  27 |
  28 |   useEffect(() => {
> 29 |     setMounted(true);
     |     ^^^^^^^^^^ Avoid calling setState() directly within an effect
  30 |     let seen = false;
  31 |     try {
  32 |       seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";  react-hooks/set-state-in-effect
  33:14  warning  'e' is defined but never used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               @typescript-eslint/no-unused-vars
  60:6   warning  React Hook useEffect has a missing dependency: 'dismiss'. Either include it or remove the dependency array                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  react-hooks/exhaustive-deps

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\landing\SmartPlatformTour.tsx
  33:7  warning  'OPEN_DELAY_MS' is assigned a value but never used  @typescript-eslint/no-unused-vars

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\landing\sections\MentorShowcase.tsx
  13:5  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\landing\sections\MentorShowcase.tsx:13:5
  11 |   const [done,      setDone]      = useState(false);
  12 |   useEffect(() => {
> 13 |     setDisplayed("");
     |     ^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  14 |     setDone(false);
  15 |     const t = setTimeout(() => {
  16 |       let i = 0;  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\layout\FeaturedShowcaseCarousel.tsx
  80:37  warning  Expected an assignment or function call and instead saw an expression  @typescript-eslint/no-unused-expressions

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\layout\Navbar.tsx
  182:5  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\layout\Navbar.tsx:182:5
  180 |
  181 |   useEffect(() => {
> 182 |     setMobileOpen(false);
      |     ^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  183 |     setStudioOpen(false);
  184 |     setPortalsOpen(false);
  185 |     setMobileStudioOpen(false);  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\layout\Premium3DShowcaseCarousel.tsx
  270:7  warning  Expected an assignment or function call and instead saw an expression  @typescript-eslint/no-unused-expressions

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\layout\ThemeToggle.tsx
  12:5  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\layout\ThemeToggle.tsx:12:5
  10 |     const stored = localStorage.getItem("theme") as "dark" | "light" | null;
  11 |     const initial = stored ?? "dark";
> 12 |     setTheme(initial);
     |     ^^^^^^^^ Avoid calling setState() directly within an effect
  13 |     applyTheme(initial);
  14 |   }, []);
  15 |  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\mentor\MentorFloatingButton.tsx
  39:7  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\mentor\MentorFloatingButton.tsx:39:7
  37 |   useEffect(() => {
  38 |     try {
> 39 |       setHintSeen(window.localStorage.getItem(HINT_STORAGE_KEY) === "1");
     |       ^^^^^^^^^^^ Avoid calling setState() directly within an effect
  40 |     } catch {
  41 |       setHintSeen(true);
  42 |     }  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\portal\PortalIdentityIntro.tsx
  28:7  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\portal\PortalIdentityIntro.tsx:28:7
  26 |     if (!active) return;
  27 |     if (shouldReduce) {
> 28 |       setCount(to);
     |       ^^^^^^^^ Avoid calling setState() directly within an effect
  29 |       return;
  30 |     }
  31 |  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\profile\ProfileSettingsClient.tsx
   54:5   warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\profile\ProfileSettingsClient.tsx:54:5
  52 |   useEffect(() => {
  53 |     if (!profile || dataLoaded) return;
> 54 |     setFullName(profile.full_name ?? "");
     |     ^^^^^^^^^^^ Avoid calling setState() directly within an effect
  55 |     setAvatarUrl(profile.avatar_url ?? "");
  56 |     setDataLoaded(true);
  57 |  react-hooks/set-state-in-effect
  237:19  warning  Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             @next/next/no-img-element

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\components\ui\SectionHeader.tsx
  16:11  warning  '_locale' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\hooks\useAuth.ts
  30:7  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\hooks\useAuth.ts:30:7
  28 |     const supabase = createClient();
  29 |     if (!supabase) {
> 30 |       setLoading(false);
     |       ^^^^^^^^^^ Avoid calling setState() directly within an effect
  31 |       return;
  32 |     }
  33 |  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\hooks\useAutomationProgress.ts
   35:5  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\hooks\useAutomationProgress.ts:35:5
  33 |
  34 |   useEffect(() => {
> 35 |     setSaved(lsToggle(recipeId) === false ? getSaved().includes(recipeId) : getSaved().includes(recipeId));
     |     ^^^^^^^^ Avoid calling setState() directly within an effect
  36 |     setSaved(getSaved().includes(recipeId));
  37 |
  38 |     if (!synced.current && supabase) {  react-hooks/set-state-in-effect
   77:5  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\hooks\useAutomationProgress.ts:77:5
  75 |   useEffect(() => {
  76 |     const ls = lsReadBoolArr(LAB_KEY(labId), totalItems);
> 77 |     setChecked(ls);
     |     ^^^^^^^^^^ Avoid calling setState() directly within an effect
  78 |
  79 |     if (!supabase) return;
  80 |     supabase.auth.getUser().then(({ data: { user } }) => {                            react-hooks/set-state-in-effect
  120:5  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\hooks\useAutomationProgress.ts:120:5
  118 |   useEffect(() => {
  119 |     const ls = lsReadBoolArr(CHECKLIST_KEY(recipeId), totalItems);
> 120 |     setChecked(ls);
      |     ^^^^^^^^^^ Avoid calling setState() directly within an effect
  121 |
  122 |     if (!supabase) return;
  123 |     supabase.auth.getUser().then(({ data: { user } }) => {           react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\hooks\useLocalFavorites.ts
  35:5  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\hooks\useLocalFavorites.ts:35:5
  33 |
  34 |   useEffect(() => {
> 35 |     setFavorites(getStored(key));
     |     ^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  36 |     setMounted(true);
  37 |   }, [key]);
  38 |                                                                                    react-hooks/set-state-in-effect
  65:5  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\hooks\useLocalFavorites.ts:65:5
  63 |
  64 |   useEffect(() => {
> 65 |     setData({
     |     ^^^^^^^ Avoid calling setState() directly within an effect
  66 |       tools:    getStored(STORAGE_KEYS.tool),
  67 |       prompts:  getStored(STORAGE_KEYS.prompt),
  68 |       courses:  getStored(STORAGE_KEYS.course),  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\hooks\useSavedPrompts.ts
  36:5  warning  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\hooks\useSavedPrompts.ts:36:5
  34 |
  35 |   useEffect(() => {
> 36 |     setSavedPrompts(getStored());
     |     ^^^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  37 |     setMounted(true);
  38 |   }, []);
  39 |  react-hooks/set-state-in-effect

C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\src\lib\ai-guard.ts
  25:31  warning  '_req' is defined but never used  @typescript-eslint/no-unused-vars

✖ 69 problems (0 errors, 69 warnings)
  0 errors and 1 warning potentially fixable with the `--fix` option.


Exit code: 0


## npm run build


> darhous-ai-cloud-academy@0.1.0 build
> next build

▲ Next.js 16.2.6 (Turbopack)
- Environments: .env.local

  Creating an optimized production build ...
✓ Compiled successfully in 99s
  Running TypeScript ...
  Finished TypeScript in 2.3min ...
  Collecting page data using 3 workers ...
⚠ Using edge runtime on a page currently disables static generation for that page
  Generating static pages using 3 workers (0/1274) ...
  Generating static pages using 3 workers (318/1274) 
  Generating static pages using 3 workers (636/1274) 
  Generating static pages using 3 workers (955/1274) 
✓ Generating static pages using 3 workers (1274/1274) in 2.8min
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ● /[locale]
│ ├ /ar
│ └ /en
├ ● /[locale]/about
│ ├ /ar/about
│ └ /en/about
├ ● /[locale]/admin
│ ├ /ar/admin
│ └ /en/admin
├ ● /[locale]/ai-academy
│ ├ /ar/ai-academy
│ └ /en/ai-academy
├ ● /[locale]/automation
│ ├ /ar/automation
│ └ /en/automation
├ ● /[locale]/automation-glossary
│ ├ /ar/automation-glossary
│ └ /en/automation-glossary
├ ● /[locale]/automation/automation-agent
│ ├ /ar/automation/automation-agent
│ └ /en/automation/automation-agent
├ ● /[locale]/automation/labs
│ ├ /ar/automation/labs
│ └ /en/automation/labs
├ ● /[locale]/automation/labs/[labId]
│ ├ /ar/automation/labs/lab-1
│ ├ /ar/automation/labs/lab-2
│ ├ /ar/automation/labs/lab-3
│ └ [+27 more paths]
├ ● /[locale]/automation/paths
│ ├ /ar/automation/paths
│ └ /en/automation/paths
├ ● /[locale]/automation/services
│ ├ /ar/automation/services
│ └ /en/automation/services
├ ● /[locale]/automation/templates
│ ├ /ar/automation/templates
│ └ /en/automation/templates
├ ● /[locale]/automation/templates/[slug]
│ ├ /ar/automation/templates/student-welcome-flow
│ ├ /ar/automation/templates/google-form-to-crm
│ ├ /ar/automation/templates/daily-ai-email-brief
│ └ [+57 more paths]
├ ● /[locale]/automation/tools
│ ├ /ar/automation/tools
│ └ /en/automation/tools
├ ● /[locale]/blog
│ ├ /ar/blog
│ └ /en/blog
├ ● /[locale]/blog/[slug]
│ ├ /ar/blog/start-ai-journey
│ ├ /ar/blog/chatgpt-vs-claude-vs-gemini
│ ├ /ar/blog/what-is-prompt-engineering
│ └ [+25 more paths]
├ ● /[locale]/career
│ ├ /ar/career
│ └ /en/career
├ ● /[locale]/career/builder
│ ├ /ar/career/builder
│ └ /en/career/builder
├ ● /[locale]/career/cv-analyzer
│ ├ /ar/career/cv-analyzer
│ └ /en/career/cv-analyzer
├ ● /[locale]/career/interview
│ ├ /ar/career/interview
│ └ /en/career/interview
├ ● /[locale]/career/jobs
│ ├ /ar/career/jobs
│ └ /en/career/jobs
├ ● /[locale]/career/templates
│ ├ /ar/career/templates
│ └ /en/career/templates
├ ● /[locale]/certificates
│ ├ /ar/certificates
│ └ /en/certificates
├ ƒ /[locale]/certificates/verify/[certId]
├ ● /[locale]/challenges
│ ├ /ar/challenges
│ └ /en/challenges
├ ● /[locale]/claude
│ ├ /ar/claude
│ └ /en/claude
├ ● /[locale]/claude-code-generator
│ ├ /ar/claude-code-generator
│ └ /en/claude-code-generator
├ ● /[locale]/cloud
│ ├ /ar/cloud
│ └ /en/cloud
├ ● /[locale]/coming-soon
│ ├ /ar/coming-soon
│ └ /en/coming-soon
├ ● /[locale]/compare-tools
│ ├ /ar/compare-tools
│ └ /en/compare-tools
├ ● /[locale]/contact
│ ├ /ar/contact
│ └ /en/contact
├ ● /[locale]/courses
│ ├ /ar/courses
│ └ /en/courses
├ ● /[locale]/courses/[slug]
│ ├ /ar/courses/ai-foundations
│ ├ /ar/courses/python-for-ai
│ ├ /ar/courses/machine-learning
│ └ [+33 more paths]
├ ● /[locale]/courses/[slug]/lessons/[lessonIndex]
│ ├ /ar/courses/ai-foundations/lessons/1
│ ├ /ar/courses/ai-foundations/lessons/2
│ ├ /ar/courses/ai-foundations/lessons/3
│ └ [+175 more paths]
├ ● /[locale]/dashboard
│ ├ /ar/dashboard
│ └ /en/dashboard
├ ● /[locale]/digital-exams
│ ├ /ar/digital-exams
│ └ /en/digital-exams
├ ● /[locale]/digital-exams/[subject]
│ ├ /en/digital-exams/it-fundamentals
│ ├ /en/digital-exams/microsoft-word
│ ├ /en/digital-exams/microsoft-excel
│ └ [+15 more paths]
├ ● /[locale]/digital-exams/history
│ ├ /ar/digital-exams/history
│ └ /en/digital-exams/history
├ ● /[locale]/digital-exams/library
│ ├ /ar/digital-exams/library
│ └ /en/digital-exams/library
├ ● /[locale]/digital-exams/mixed
│ ├ /ar/digital-exams/mixed
│ └ /en/digital-exams/mixed
├ ● /[locale]/forgot-password
│ ├ /ar/forgot-password
│ └ /en/forgot-password
├ ● /[locale]/glossary
│ ├ /ar/glossary
│ └ /en/glossary
├ ● /[locale]/iot-lab
│ ├ /ar/iot-lab
│ └ /en/iot-lab
├ ● /[locale]/iot-lab/challenges
│ ├ /ar/iot-lab/challenges
│ └ /en/iot-lab/challenges
├ ● /[locale]/iot-lab/challenges/[slug]
│ ├ /ar/iot-lab/challenges/blind-blink
│ ├ /ar/iot-lab/challenges/wrong-resistor
│ ├ /ar/iot-lab/challenges/button-read
│ └ [+77 more paths]
├ ● /[locale]/iot-lab/component-library
│ ├ /ar/iot-lab/component-library
│ └ /en/iot-lab/component-library
├ ● /[locale]/iot-lab/component-library/[slug]
│ ├ /ar/iot-lab/component-library/arduino-uno
│ ├ /ar/iot-lab/component-library/arduino-nano
│ ├ /ar/iot-lab/component-library/arduino-mega
│ └ [+157 more paths]
├ ● /[locale]/iot-lab/exams
│ ├ /ar/iot-lab/exams
│ └ /en/iot-lab/exams
├ ● /[locale]/iot-lab/lessons
│ ├ /ar/iot-lab/lessons
│ └ /en/iot-lab/lessons
├ ● /[locale]/iot-lab/lessons/[slug]
│ ├ /ar/iot-lab/lessons/what-is-arduino
│ ├ /ar/iot-lab/lessons/arduino-ide-setup
│ ├ /ar/iot-lab/lessons/digital-output-led
│ └ [+115 more paths]
├ ● /[locale]/iot-lab/paths
│ ├ /ar/iot-lab/paths
│ └ /en/iot-lab/paths
├ ● /[locale]/iot-lab/paths/[slug]
│ ├ /ar/iot-lab/paths/arduino-basics
│ ├ /ar/iot-lab/paths/electronics-fundamentals
│ ├ /ar/iot-lab/paths/breadboard-wiring-mastery
│ └ [+33 more paths]
├ ● /[locale]/iot-lab/projects
│ ├ /ar/iot-lab/projects
│ └ /en/iot-lab/projects
├ ● /[locale]/iot-lab/projects/[slug]
│ ├ /ar/iot-lab/projects/led-blink
│ ├ /ar/iot-lab/projects/traffic-light
│ ├ /ar/iot-lab/projects/smart-parking
│ └ [+141 more paths]
├ ● /[locale]/iot-lab/simulator
│ ├ /ar/iot-lab/simulator
│ └ /en/iot-lab/simulator
├ ● /[locale]/language
│ ├ /ar/language
│ └ /en/language
├ ● /[locale]/language/assessment
│ ├ /ar/language/assessment
│ └ /en/language/assessment
├ ● /[locale]/language/history
│ ├ /ar/language/history
│ └ /en/language/history
├ ● /[locale]/language/results
│ ├ /ar/language/results
│ └ /en/language/results
├ ƒ /[locale]/language/verify/[certId]
├ ● /[locale]/leaderboard
│ ├ /ar/leaderboard
│ └ /en/leaderboard
├ ● /[locale]/learning-plans
│ ├ /ar/learning-plans
│ └ /en/learning-plans
├ ● /[locale]/login
│ ├ /ar/login
│ └ /en/login
├ ● /[locale]/mentor
│ ├ /ar/mentor
│ └ /en/mentor
├ ● /[locale]/nano-banana-prompts
│ ├ /ar/nano-banana-prompts
│ └ /en/nano-banana-prompts
├ ● /[locale]/onboarding
│ ├ /ar/onboarding
│ └ /en/onboarding
├ ● /[locale]/paths
│ ├ /ar/paths
│ └ /en/paths
├ ● /[locale]/privacy
│ ├ /ar/privacy
│ └ /en/privacy
├ ● /[locale]/profile
│ ├ /ar/profile
│ └ /en/profile
├ ● /[locale]/project-generator
│ ├ /ar/project-generator
│ └ /en/project-generator
├ ● /[locale]/projects
│ ├ /ar/projects
│ └ /en/projects
├ ● /[locale]/projects/[slug]
│ ├ /ar/projects/ai-study-planner
│ ├ /ar/projects/prompt-generator
│ ├ /ar/projects/csv-analyzer
│ └ [+25 more paths]
├ ● /[locale]/projects/[slug]/build
│ ├ /ar/projects/ai-study-planner/build
│ ├ /en/projects/ai-study-planner/build
│ ├ /ar/projects/prompt-generator/build
│ └ [+25 more paths]
├ ● /[locale]/prompt-battle
│ ├ /ar/prompt-battle
│ └ /en/prompt-battle
├ ● /[locale]/prompt-score
│ ├ /ar/prompt-score
│ └ /en/prompt-score
├ ● /[locale]/prompt-studio
│ ├ /ar/prompt-studio
│ └ /en/prompt-studio
├ ● /[locale]/prompts
│ ├ /ar/prompts
│ └ /en/prompts
├ ● /[locale]/register
│ ├ /ar/register
│ └ /en/register
├ ● /[locale]/reset-password
│ ├ /ar/reset-password
│ └ /en/reset-password
├ ● /[locale]/roadmap-generator
│ ├ /ar/roadmap-generator
│ └ /en/roadmap-generator
├ ● /[locale]/search
│ ├ /ar/search
│ └ /en/search
├ ● /[locale]/terms
│ ├ /ar/terms
│ └ /en/terms
├ ● /[locale]/tool-recommender
│ ├ /ar/tool-recommender
│ └ /en/tool-recommender
├ ● /[locale]/tools
│ ├ /ar/tools
│ └ /en/tools
├ ● /[locale]/tools/[slug]
│ ├ /ar/tools/chatgpt
│ ├ /ar/tools/claude
│ ├ /ar/tools/gemini
│ └ [+133 more paths]
├ ƒ /api/admin/ai-courses
├ ƒ /api/admin/ai-courses/[id]
├ ƒ /api/admin/ai-glossary
├ ƒ /api/admin/ai-glossary/[id]
├ ƒ /api/admin/ai-paths
├ ƒ /api/admin/ai-paths/[id]
├ ƒ /api/admin/ai-projects
├ ƒ /api/admin/ai-projects/[id]
├ ƒ /api/admin/ai-prompts
├ ƒ /api/admin/ai-prompts/[id]
├ ƒ /api/admin/ai-tools
├ ƒ /api/admin/ai-tools/[id]
├ ƒ /api/admin/blog
├ ƒ /api/admin/blog/[id]
├ ƒ /api/admin/certificates/issue
├ ƒ /api/admin/cms/[table]
├ ƒ /api/admin/cms/[table]/[id]
├ ƒ /api/admin/draft-content-preview
├ ƒ /api/admin/feature-flags
├ ƒ /api/admin/health
├ ƒ /api/admin/mentor-settings
├ ƒ /api/admin/nano-banana
├ ƒ /api/admin/nano-banana/[id]
├ ƒ /api/admin/promote
├ ƒ /api/admin/site-settings
├ ƒ /api/admin/subscribers
├ ƒ /api/admin/users
├ ƒ /api/analytics/track
├ ƒ /api/automation/generate
├ ƒ /api/automation/progress
├ ƒ /api/avatar/upload
├ ƒ /api/career/analyze-cv
├ ƒ /api/career/evaluate-interview
├ ƒ /api/career/upload-cv
├ ƒ /api/certificates
├ ƒ /api/certificates/exams/[id]
├ ƒ /api/certificates/language/[id]
├ ƒ /api/certificates/preview/[portal]
├ ƒ /api/certificates/verify/[code]
├ ƒ /api/challenges/submit
├ ƒ /api/coach
├ ƒ /api/community/subscribe
├ ƒ /api/contact
├ ƒ /api/email/reengagement
├ ƒ /api/email/welcome
├ ƒ /api/exams/explain
├ ƒ /api/exams/library
├ ƒ /api/exams/results
├ ƒ /api/exams/submit
├ ƒ /api/language/email-result
├ ƒ /api/language/results
├ ƒ /api/language/submit
├ ƒ /api/learning-plans
├ ƒ /api/mentor
├ ƒ /api/mentor-stream
├ ƒ /api/nano-banana/enhance
├ ƒ /api/nano-banana/prompts
├ ƒ /api/progress/lesson
├ ƒ /api/project-generator
├ ƒ /api/prompt-battle
├ ƒ /api/prompt-score
├ ƒ /api/quiz/submit
├ ƒ /api/search
├ ƒ /auth/callback
├ ƒ /certificates/verify/[code]
├ ƒ /og
├ ○ /robots.txt
├ ○ /sitemap.xml
└ ƒ /u/[username]


ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand


Exit code: 0

