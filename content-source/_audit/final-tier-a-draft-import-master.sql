-- ==============================================================================
-- SECTION 1 — Pre-checks
-- ==============================================================================

SELECT count(*) AS pre_count_iot_resources FROM iot_resources;
SELECT count(*) AS pre_count_ai_resources FROM ai_resources;
SELECT count(*) AS pre_count_iot_glossary FROM iot_glossary;
SELECT count(*) AS pre_count_digital_exams_lessons FROM digital_exams_lessons;
SELECT count(*) AS pre_count_language_prompts FROM language_prompts;
SELECT count(*) AS pre_count_language_glossary FROM language_glossary;
SELECT count(*) AS pre_count_ai_lessons FROM ai_lessons;
SELECT count(*) AS pre_count_career_prompts FROM career_prompts;
SELECT count(*) AS pre_count_digital_exams_glossary FROM digital_exams_glossary;
SELECT count(*) AS pre_count_career_glossary FROM career_glossary;
SELECT count(*) AS pre_count_career_lessons FROM career_lessons;
SELECT count(*) AS pre_count_digital_exams_prompts FROM digital_exams_prompts;
SELECT count(*) AS pre_count_automation_lessons FROM automation_lessons;
SELECT count(*) AS pre_count_iot_prompts FROM iot_prompts;
SELECT count(*) AS pre_count_automation_resources FROM automation_resources;
SELECT count(*) AS pre_count_language_lessons FROM language_lessons;
SELECT count(*) AS pre_count_language_resources FROM language_resources;
SELECT count(*) AS pre_count_digital_exams_resources FROM digital_exams_resources;
SELECT count(*) AS pre_count_career_resources FROM career_resources;

-- confirm the 10 already-imported IDs exist and are all draft
SELECT id, status FROM career_glossary WHERE id IN ('career-glossary-career-shift-2', 'career-glossary-cover-letter', 'career-glossary-burnout', 'career-glossary-ats', 'career-glossary-career-shift', 'career-glossary-culture-fit', 'career-glossary-cover-letter-2', 'career-glossary-cv-optimization', 'career-glossary-ai-tools', 'career-glossary-ats-2');

-- confirm none of the 590 remaining IDs already exist in their target tables
SELECT count(*) AS exist_count_ai_resources FROM ai_resources WHERE id IN ('ai-academy-resource-ai-ethics-guidelines', 'ai-academy-resource-ai-safety-fundamentals', 'ai-academy-resource-ai-study-planner', 'ai-academy-resource-ai-tools-directory', 'ai-academy-resource-anthropic-alignment', 'ai-academy-resource-ar-ai-community', 'ai-academy-resource-canva-magic-studio', 'ai-academy-resource-chatgpt-2', 'ai-academy-resource-chatgpt', 'ai-academy-resource-claude-ai', 'ai-academy-resource-claude', 'ai-academy-resource-code-assistant', 'ai-academy-resource-coursera-ai-for-everyone', 'ai-academy-resource-deepl', 'ai-academy-resource-deeplearning-ai', 'ai-academy-resource-fact-checking-tool', 'ai-academy-resource-gemini', 'ai-academy-resource-github-copilot', 'ai-academy-resource-google-gemini', 'ai-academy-resource-hallucination-checker', 'ai-academy-resource-hugging-face-course', 'ai-academy-resource-hugging-face', 'ai-academy-resource-midjourney-2', 'ai-academy-resource-midjourney', 'ai-academy-resource-openai-docs', 'ai-academy-resource-perplexity-2', 'ai-academy-resource-perplexity', 'ai-academy-resource-prompt-engineering-guide', 'ai-academy-resource-prompt-library-repo', 'ai-academy-resource-research-assistant-ai');
SELECT count(*) AS exist_count_ai_lessons FROM ai_lessons WHERE id IN ('ai-academy-lesson-advanced-prompting', 'ai-academy-lesson-ai-ethics', 'ai-academy-lesson-ai-for-study-2', 'ai-academy-lesson-ai-for-study', 'ai-academy-lesson-ai-for-work-2', 'ai-academy-lesson-ai-for-work', 'ai-academy-lesson-ai-hallucination', 'ai-academy-lesson-detecting-hallucinations', 'ai-academy-lesson-evaluating-models', 'ai-academy-lesson-future-of-ai', 'ai-academy-lesson-how-to-prompt', 'ai-academy-lesson-independent-learning', 'ai-academy-lesson-intro-to-ai-2', 'ai-academy-lesson-intro-to-ai', 'ai-academy-lesson-prompt-engineering-basics', 'ai-academy-lesson-prompt-libraries', 'ai-academy-lesson-rag-basics', 'ai-academy-lesson-safe-ai', 'ai-academy-lesson-safety-and-security', 'ai-academy-lesson-workflow-automation');
SELECT count(*) AS exist_count_automation_resources FROM automation_resources WHERE id IN ('automation-resource-ai-automation-trends', 'automation-resource-ai-automation', 'automation-resource-api-security-best-practices', 'automation-resource-apis-beginners', 'automation-resource-automate-io-alt', 'automation-resource-automating-business-processes', 'automation-resource-automation-safety', 'automation-resource-automation-testing-frameworks', 'automation-resource-cloud-computing-intro', 'automation-resource-cron-job-syntax', 'automation-resource-data-mapping-basics', 'automation-resource-error-handling-best-practices', 'automation-resource-gas-guide-2', 'automation-resource-gas-guide', 'automation-resource-http-status-codes', 'automation-resource-json-guide', 'automation-resource-make-academy-2', 'automation-resource-make-academy', 'automation-resource-n8n-docs', 'automation-resource-n8n-documentation', 'automation-resource-oauth2-simplified', 'automation-resource-power-automate-docs', 'automation-resource-power-automate-learn', 'automation-resource-regex-data-extraction', 'automation-resource-rest-api-tutorial', 'automation-resource-retry-policies-guide', 'automation-resource-webhooks-explained-2', 'automation-resource-webhooks-explained', 'automation-resource-zapier-blog', 'automation-resource-zapier-university');
SELECT count(*) AS exist_count_automation_lessons FROM automation_lessons WHERE id IN ('automation-lesson-ai-automation-intro', 'automation-lesson-ai-in-automation', 'automation-lesson-api-basics-automation', 'automation-lesson-automation-documentation-testing', 'automation-lesson-automation-security-data-privacy', 'automation-lesson-bpa-case-study', 'automation-lesson-building-approval-workflow', 'automation-lesson-data-mapping-between-apps', 'automation-lesson-error-handling-automation', 'automation-lesson-error-handling', 'automation-lesson-intro-automation-thinking', 'automation-lesson-intro-automation', 'automation-lesson-intro-google-apps-script', 'automation-lesson-make-zapier-n8n-comparison', 'automation-lesson-retries-and-fallbacks', 'automation-lesson-triggers-actions', 'automation-lesson-understanding-triggers-actions', 'automation-lesson-webhooks-explained', 'automation-lesson-webhooks-integration', 'automation-lesson-zapier-vs-make');
SELECT count(*) AS exist_count_career_glossary FROM career_glossary WHERE id IN ('career-glossary-cv', 'career-glossary-elevator-pitch-2', 'career-glossary-elevator-pitch', 'career-glossary-freelance', 'career-glossary-gig-economy', 'career-glossary-hard-skills-2', 'career-glossary-hard-skills', 'career-glossary-imposter-syndrome', 'career-glossary-informational-interview', 'career-glossary-internship', 'career-glossary-interview', 'career-glossary-job-description-2', 'career-glossary-job-description', 'career-glossary-job-search-strategy', 'career-glossary-linkedin-optimization', 'career-glossary-linkedin', 'career-glossary-mentorship-2', 'career-glossary-mentorship', 'career-glossary-mock-interview', 'career-glossary-negotiation', 'career-glossary-networking-2', 'career-glossary-networking', 'career-glossary-onboarding', 'career-glossary-personal-branding-2', 'career-glossary-personal-branding', 'career-glossary-portfolio-2', 'career-glossary-portfolio', 'career-glossary-proof-of-work', 'career-glossary-remote-work-skills', 'career-glossary-remote-work', 'career-glossary-reskilling', 'career-glossary-salary-negotiation', 'career-glossary-skill-gap-analysis', 'career-glossary-soft-skills-2', 'career-glossary-soft-skills', 'career-glossary-star-method-2', 'career-glossary-star-method', 'career-glossary-transferable-skills', 'career-glossary-upskilling', 'career-glossary-work-life-balance');
SELECT count(*) AS exist_count_career_prompts FROM career_prompts WHERE id IN ('career-prompt-achievements-bullet-points', 'career-prompt-career-growth-discussion', 'career-prompt-career-shift-plan-2', 'career-prompt-career-shift-plan', 'career-prompt-cover-letter-gen', 'career-prompt-cover-letter-generation', 'career-prompt-cv-review', 'career-prompt-cv-tailoring', 'career-prompt-elevator-pitch-creation', 'career-prompt-ethical-ai-application', 'career-prompt-follow-up-after-interview', 'career-prompt-freelance-proposal', 'career-prompt-handling-rejection', 'career-prompt-interview-prep-star', 'career-prompt-interview-prep', 'career-prompt-job-search-keywords', 'career-prompt-linkedin-summary-2', 'career-prompt-linkedin-summary', 'career-prompt-mock-interview-simulation', 'career-prompt-networking-message', 'career-prompt-networking-msg', 'career-prompt-portfolio-ideas-2', 'career-prompt-portfolio-ideas', 'career-prompt-remote-work-readiness', 'career-prompt-resignation-letter', 'career-prompt-salary-negotiation-script', 'career-prompt-salary-negotiation', 'career-prompt-skill-gap-analysis', 'career-prompt-skills-gap', 'career-prompt-star-answer');
SELECT count(*) AS exist_count_career_resources FROM career_resources WHERE id IN ('career-resource-behance', 'career-resource-career-advice', 'career-resource-coursera', 'career-resource-cover-letter-examples', 'career-resource-cv-templates', 'career-resource-edx', 'career-resource-github', 'career-resource-glassdoor', 'career-resource-harvard-career-services', 'career-resource-hunter-io', 'career-resource-indeed', 'career-resource-interview-query', 'career-resource-interview-questions', 'career-resource-job-boards', 'career-resource-jobscan', 'career-resource-linkedin-guide', 'career-resource-linkedin-learning', 'career-resource-meetup', 'career-resource-my-interview-practice', 'career-resource-novoresume', 'career-resource-payscale', 'career-resource-portfolio-builder', 'career-resource-pramp', 'career-resource-remote-jobs', 'career-resource-remote-ok', 'career-resource-salary-calculator', 'career-resource-skills-courses', 'career-resource-the-muse', 'career-resource-upwork', 'career-resource-zety');
SELECT count(*) AS exist_count_career_lessons FROM career_lessons WHERE id IN ('career-lesson-ace-the-interview', 'career-lesson-ai-in-job-search', 'career-lesson-building-proof-of-work', 'career-lesson-career-change-strategies', 'career-lesson-career-transition', 'career-lesson-cover-letters-that-stand-out', 'career-lesson-cv-improvement', 'career-lesson-effective-job-search-systems', 'career-lesson-ethical-ai-job-search', 'career-lesson-interview-preparation-guide', 'career-lesson-linkedin-mastery', 'career-lesson-linkedin-profile-optimization', 'career-lesson-mastering-star-stories', 'career-lesson-networking-messaging', 'career-lesson-perfect-cv', 'career-lesson-portfolio-evidence', 'career-lesson-remote-work-readiness', 'career-lesson-salary-negotiation-basics', 'career-lesson-skill-gap-planning', 'career-lesson-star-method-guide');
SELECT count(*) AS exist_count_digital_exams_glossary FROM digital_exams_glossary WHERE id IN ('digital-exams-glossary-adaptive-generation', 'digital-exams-glossary-certainty-assessment', 'digital-exams-glossary-cognitive-reframing', 'digital-exams-glossary-confidence-calibration', 'digital-exams-glossary-deep-breathing', 'digital-exams-glossary-distractors', 'digital-exams-glossary-double-checking', 'digital-exams-glossary-educated-guess', 'digital-exams-glossary-elimination-strategy', 'digital-exams-glossary-environmental-readiness', 'digital-exams-glossary-exam-simulation', 'digital-exams-glossary-gap-analysis', 'digital-exams-glossary-instant-feedback', 'digital-exams-glossary-interleaving', 'digital-exams-glossary-item-01', 'digital-exams-glossary-item-02', 'digital-exams-glossary-item-03', 'digital-exams-glossary-item-04', 'digital-exams-glossary-item-05', 'digital-exams-glossary-item-06', 'digital-exams-glossary-item-07', 'digital-exams-glossary-item-08', 'digital-exams-glossary-item-09', 'digital-exams-glossary-item-10', 'digital-exams-glossary-item-11', 'digital-exams-glossary-item-12', 'digital-exams-glossary-item-13', 'digital-exams-glossary-item-14', 'digital-exams-glossary-item-15', 'digital-exams-glossary-item-16', 'digital-exams-glossary-item-17', 'digital-exams-glossary-item-18', 'digital-exams-glossary-item-19', 'digital-exams-glossary-item-20', 'digital-exams-glossary-keywords', 'digital-exams-glossary-last-days-plan', 'digital-exams-glossary-learning-from-slips', 'digital-exams-glossary-mistake-log', 'digital-exams-glossary-mock-exams', 'digital-exams-glossary-negative-tools', 'digital-exams-glossary-performance-dashboard', 'digital-exams-glossary-post-exam-eval', 'digital-exams-glossary-progress-analytics', 'digital-exams-glossary-random-practice', 'digital-exams-glossary-root-question-analysis', 'digital-exams-glossary-rushing-errors', 'digital-exams-glossary-spaced-revision', 'digital-exams-glossary-tech-check', 'digital-exams-glossary-time-allocation', 'digital-exams-glossary-two-minute-rule');
SELECT count(*) AS exist_count_digital_exams_prompts FROM digital_exams_prompts WHERE id IN ('digital-exams-prompt-analyze-mistake', 'digital-exams-prompt-brainstorm-study-methods', 'digital-exams-prompt-compare-concepts', 'digital-exams-prompt-create-study-plan', 'digital-exams-prompt-decode-trick-questions', 'digital-exams-prompt-evaluate-essay-answer', 'digital-exams-prompt-explain-concept-simply', 'digital-exams-prompt-focus-improvement', 'digital-exams-prompt-generate-mcq', 'digital-exams-prompt-identify-keywords', 'digital-exams-prompt-item-01', 'digital-exams-prompt-item-02', 'digital-exams-prompt-item-03', 'digital-exams-prompt-item-04', 'digital-exams-prompt-item-05', 'digital-exams-prompt-item-06', 'digital-exams-prompt-item-07', 'digital-exams-prompt-item-08', 'digital-exams-prompt-item-09', 'digital-exams-prompt-item-10', 'digital-exams-prompt-math-shortcuts', 'digital-exams-prompt-memorization-techniques', 'digital-exams-prompt-overcome-exam-anxiety', 'digital-exams-prompt-plan-last-week', 'digital-exams-prompt-post-exam-reflection', 'digital-exams-prompt-reading-comprehension', 'digital-exams-prompt-review-exam-results', 'digital-exams-prompt-simulate-exam-scenario', 'digital-exams-prompt-summarize-notes', 'digital-exams-prompt-time-management-strategy');
SELECT count(*) AS exist_count_digital_exams_resources FROM digital_exams_resources WHERE id IN ('digital-exams-resource-anki-flashcards', 'digital-exams-resource-deep-work-summary', 'digital-exams-resource-digital-readiness-checklist', 'digital-exams-resource-digital-sat-practice', 'digital-exams-resource-exam-diet-tips', 'digital-exams-resource-eye-care-software', 'digital-exams-resource-focus-music-playlist', 'digital-exams-resource-habit-tracker', 'digital-exams-resource-item-01', 'digital-exams-resource-item-02', 'digital-exams-resource-item-03', 'digital-exams-resource-item-04', 'digital-exams-resource-item-05', 'digital-exams-resource-item-06', 'digital-exams-resource-item-07', 'digital-exams-resource-item-08', 'digital-exams-resource-item-09', 'digital-exams-resource-item-10', 'digital-exams-resource-khan-academy-math', 'digital-exams-resource-math-way', 'digital-exams-resource-mindmeister', 'digital-exams-resource-mock-test-analysis-sheet', 'digital-exams-resource-notion-templates', 'digital-exams-resource-online-whiteboard', 'digital-exams-resource-pomodoro-tracker', 'digital-exams-resource-qiyas-official', 'digital-exams-resource-sleep-cycle-app', 'digital-exams-resource-speed-reading-tool', 'digital-exams-resource-test-anxiety-guide', 'digital-exams-resource-time-blocking-guide');
SELECT count(*) AS exist_count_digital_exams_lessons FROM digital_exams_lessons WHERE id IN ('digital-exams-lesson-ai-study-assistant', 'digital-exams-lesson-analyzing-mistakes', 'digital-exams-lesson-confidence-rating', 'digital-exams-lesson-digital-time-management', 'digital-exams-lesson-exam-night-routine', 'digital-exams-lesson-final-week-strategy', 'digital-exams-lesson-handling-distractors', 'digital-exams-lesson-interleaved-practice', 'digital-exams-lesson-item-01', 'digital-exams-lesson-item-02', 'digital-exams-lesson-item-03', 'digital-exams-lesson-item-04', 'digital-exams-lesson-item-05', 'digital-exams-lesson-item-06', 'digital-exams-lesson-keyword-spotting', 'digital-exams-lesson-mcq-elimination', 'digital-exams-lesson-overcoming-mind-blanks', 'digital-exams-lesson-post-exam-review', 'digital-exams-lesson-reading-comprehension-tricks', 'digital-exams-lesson-tech-preparedness');
SELECT count(*) AS exist_count_iot_glossary FROM iot_glossary WHERE id IN ('iot-lab-glossary-actuator', 'iot-lab-glossary-adc', 'iot-lab-glossary-analog-signal', 'iot-lab-glossary-arduino', 'iot-lab-glossary-baud-rate', 'iot-lab-glossary-bootloader', 'iot-lab-glossary-breadboard', 'iot-lab-glossary-capacitor', 'iot-lab-glossary-circuit-schematic', 'iot-lab-glossary-current', 'iot-lab-glossary-dac', 'iot-lab-glossary-data-logging', 'iot-lab-glossary-debounce', 'iot-lab-glossary-debugging', 'iot-lab-glossary-digital-signal', 'iot-lab-glossary-esp32', 'iot-lab-glossary-gpio', 'iot-lab-glossary-ground', 'iot-lab-glossary-i2c-2', 'iot-lab-glossary-i2c', 'iot-lab-glossary-interrupt', 'iot-lab-glossary-iot', 'iot-lab-glossary-jumper-wires', 'iot-lab-glossary-led', 'iot-lab-glossary-logic-level', 'iot-lab-glossary-microcontroller', 'iot-lab-glossary-mqtt', 'iot-lab-glossary-multimeter', 'iot-lab-glossary-ohm-law', 'iot-lab-glossary-pcb', 'iot-lab-glossary-pull-down', 'iot-lab-glossary-pull-up', 'iot-lab-glossary-pwm-2', 'iot-lab-glossary-pwm', 'iot-lab-glossary-raspberry-pi', 'iot-lab-glossary-relay-2', 'iot-lab-glossary-relay', 'iot-lab-glossary-resistance', 'iot-lab-glossary-resistor', 'iot-lab-glossary-schematic', 'iot-lab-glossary-sensor', 'iot-lab-glossary-serial-monitor', 'iot-lab-glossary-soldering', 'iot-lab-glossary-spi-2', 'iot-lab-glossary-spi', 'iot-lab-glossary-transistor', 'iot-lab-glossary-uart-2', 'iot-lab-glossary-uart', 'iot-lab-glossary-voltage', 'iot-lab-glossary-wifi-module');
SELECT count(*) AS exist_count_iot_prompts FROM iot_prompts WHERE id IN ('iot-lab-prompt-analog-circuit', 'iot-lab-prompt-arduino-blink', 'iot-lab-prompt-battery-monitor', 'iot-lab-prompt-button-debounce', 'iot-lab-prompt-calibrate-sensor', 'iot-lab-prompt-dht11-sensor', 'iot-lab-prompt-esp32-vs-arduino', 'iot-lab-prompt-esp32-webserver', 'iot-lab-prompt-esp32-wifi', 'iot-lab-prompt-explain-pwm', 'iot-lab-prompt-fix-arduino-code', 'iot-lab-prompt-i2c-lcd', 'iot-lab-prompt-interrupt-usage', 'iot-lab-prompt-mqtt-publish', 'iot-lab-prompt-pid-controller', 'iot-lab-prompt-pwm-led', 'iot-lab-prompt-python-script-rpi', 'iot-lab-prompt-raspberry-pi-gpio', 'iot-lab-prompt-relay-module', 'iot-lab-prompt-sd-card-log', 'iot-lab-prompt-sensor-read', 'iot-lab-prompt-serial-communication', 'iot-lab-prompt-servo-motor', 'iot-lab-prompt-setup-raspberry-pi', 'iot-lab-prompt-stepper-motor', 'iot-lab-prompt-suggest-iot-project', 'iot-lab-prompt-troubleshoot-mqtt', 'iot-lab-prompt-troubleshooting-guide', 'iot-lab-prompt-ultrasonic-distance', 'iot-lab-prompt-wire-sensor');
SELECT count(*) AS exist_count_iot_resources FROM iot_resources WHERE id IN ('iot-lab-resource-adafruit-learn', 'iot-lab-resource-adafruit-tutorials', 'iot-lab-resource-arduino-docs', 'iot-lab-resource-arduino-json', 'iot-lab-resource-arduino-reference', 'iot-lab-resource-blynk', 'iot-lab-resource-circuit-basics', 'iot-lab-resource-circuitpython', 'iot-lab-resource-datasheet-catalog', 'iot-lab-resource-esp32-datasheet', 'iot-lab-resource-esp32-idf-docs', 'iot-lab-resource-esphome', 'iot-lab-resource-fritzing-software', 'iot-lab-resource-fritzing', 'iot-lab-resource-home-assistant', 'iot-lab-resource-instructables-circuits', 'iot-lab-resource-micropython-guide', 'iot-lab-resource-micropython', 'iot-lab-resource-mosquitto', 'iot-lab-resource-mqtt-org', 'iot-lab-resource-mqtt-spec', 'iot-lab-resource-pinout-xyz', 'iot-lab-resource-random-nerd-tutorials', 'iot-lab-resource-raspberry-pi-docs', 'iot-lab-resource-rpi-guide', 'iot-lab-resource-sparkfun-tutorials', 'iot-lab-resource-thingspeak', 'iot-lab-resource-tinkercad-circuits-2', 'iot-lab-resource-tinkercad-circuits', 'iot-lab-resource-wokwi');
SELECT count(*) AS exist_count_language_glossary FROM language_glossary WHERE id IN ('language-glossary-accuracy', 'language-glossary-active-listening', 'language-glossary-ai-language-coach', 'language-glossary-cefr-a1', 'language-glossary-cefr-a2', 'language-glossary-cefr-b1', 'language-glossary-cefr-b2', 'language-glossary-cefr-c1', 'language-glossary-cefr-c2', 'language-glossary-chunking', 'language-glossary-collocation', 'language-glossary-comprehensible-input', 'language-glossary-fluency', 'language-glossary-glossary-1', 'language-glossary-glossary-10', 'language-glossary-glossary-11', 'language-glossary-glossary-12', 'language-glossary-glossary-13', 'language-glossary-glossary-14', 'language-glossary-glossary-15', 'language-glossary-glossary-16', 'language-glossary-glossary-17', 'language-glossary-glossary-18', 'language-glossary-glossary-19', 'language-glossary-glossary-2', 'language-glossary-glossary-20', 'language-glossary-glossary-3', 'language-glossary-glossary-4', 'language-glossary-glossary-5', 'language-glossary-glossary-6', 'language-glossary-glossary-7', 'language-glossary-glossary-8', 'language-glossary-glossary-9', 'language-glossary-grammar-in-context', 'language-glossary-idiom', 'language-glossary-immersion', 'language-glossary-intonation', 'language-glossary-language-acquisition', 'language-glossary-language-exchange', 'language-glossary-language-learning', 'language-glossary-minimal-pairs', 'language-glossary-mother-tongue-interference', 'language-glossary-passive-listening', 'language-glossary-phrasal-verb', 'language-glossary-pronunciation', 'language-glossary-self-correction', 'language-glossary-shadowing', 'language-glossary-spaced-repetition', 'language-glossary-stress', 'language-glossary-vocabulary-in-context');
SELECT count(*) AS exist_count_language_prompts FROM language_prompts WHERE id IN ('language-prompt-accent-coach', 'language-prompt-cultural-context', 'language-prompt-daily-journal', 'language-prompt-debate-opponent', 'language-prompt-email-drafter', 'language-prompt-grammar-checker', 'language-prompt-idiom-explainer', 'language-prompt-listening-comprehension', 'language-prompt-paragraph-improver', 'language-prompt-phrasal-verb-story', 'language-prompt-presentation-prep', 'language-prompt-prompt-1', 'language-prompt-prompt-10', 'language-prompt-prompt-2', 'language-prompt-prompt-3', 'language-prompt-prompt-4', 'language-prompt-prompt-5', 'language-prompt-prompt-6', 'language-prompt-prompt-7', 'language-prompt-prompt-8', 'language-prompt-prompt-9', 'language-prompt-pronunciation-guide', 'language-prompt-reading-summary', 'language-prompt-roleplay-interview', 'language-prompt-slang-translator', 'language-prompt-small-talk', 'language-prompt-speaking-partner', 'language-prompt-story-generator', 'language-prompt-translation-corrector', 'language-prompt-vocabulary-expander');
SELECT count(*) AS exist_count_language_resources FROM language_resources WHERE id IN ('language-resource-anki', 'language-resource-bbc-learning-english', 'language-resource-breaking-news-english', 'language-resource-british-council', 'language-resource-cambridge-dictionary', 'language-resource-coursera-english', 'language-resource-duolingo', 'language-resource-elllo', 'language-resource-english-club', 'language-resource-engvid', 'language-resource-esl-lab', 'language-resource-grammarly', 'language-resource-memrise', 'language-resource-oxford-learners-dictionaries', 'language-resource-quizlet', 'language-resource-rachel-english', 'language-resource-resource-1', 'language-resource-resource-10', 'language-resource-resource-2', 'language-resource-resource-3', 'language-resource-resource-4', 'language-resource-resource-5', 'language-resource-resource-6', 'language-resource-resource-7', 'language-resource-resource-8', 'language-resource-resource-9', 'language-resource-talk-english', 'language-resource-ted-talks', 'language-resource-voa-learning-english', 'language-resource-youglish');
SELECT count(*) AS exist_count_language_lessons FROM language_lessons WHERE id IN ('language-lesson-active-vs-passive-listening', 'language-lesson-conversation-practice', 'language-lesson-grammar-in-context-2', 'language-lesson-how-to-start-speaking', 'language-lesson-interview-english', 'language-lesson-introduction-to-cefr', 'language-lesson-lesson-1', 'language-lesson-lesson-2', 'language-lesson-lesson-3', 'language-lesson-lesson-4', 'language-lesson-lesson-5', 'language-lesson-lesson-6', 'language-lesson-mastering-shadowing', 'language-lesson-perfecting-pronunciation', 'language-lesson-self-correction-techniques', 'language-lesson-stop-translating', 'language-lesson-using-ai-coaches', 'language-lesson-vocabulary-systems', 'language-lesson-weekly-progress-tracking', 'language-lesson-writing-clear-paragraphs');

-- ==============================================================================
-- SECTION 2 — Begin transaction
-- ==============================================================================
BEGIN;

-- ==============================================================================
-- SECTION 3 — Insert remaining Tier-A draft records (590)
-- ==============================================================================

-- Insert into ai_resources (30 records)
INSERT INTO ai_resources (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('ai-academy-resource-ai-ethics-guidelines', 'ai-academy', 'resource', 'draft', false, 10, 'الذكاء الاصطناعي', 'إرشادات أخلاقيات الذكاء الاصطناعي', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "", "description": "وثيقة شاملة للمبادئ الأخلاقية عند استخدام وتطوير نماذج الذكاء الاصطناعي."}'::jsonb),
('ai-academy-resource-ai-safety-fundamentals', 'ai-academy', 'resource', 'draft', false, 20, 'الذكاء الاصطناعي', 'أساسيات أمان الذكاء الاصطناعي', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://course.aisafetyfundamentals.com/", "description": "مساقات متخصصة في فهم وتقليل المخاطر المرتبطة بالذكاء الاصطناعي المتقدم."}'::jsonb),
('ai-academy-resource-ai-study-planner', 'ai-academy', 'resource', 'draft', false, 30, 'الذكاء الاصطناعي', 'منظم الدراسة بالذكاء الاصطناعي', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "", "description": "تطبيق يساعد الطلاب على تنظيم وقتهم وبناء خطط دراسية مخصصة."}'::jsonb),
('ai-academy-resource-ai-tools-directory', 'ai-academy', 'resource', 'draft', false, 40, 'الذكاء الاصطناعي', 'دليل أدوات الذكاء الاصطناعي', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "", "description": "قائمة محدثة بأهم الأدوات المفيدة في مختلف المجالات العملية والتعليمية."}'::jsonb),
('ai-academy-resource-anthropic-alignment', 'ai-academy', 'resource', 'draft', false, 50, 'الذكاء الاصطناعي', 'أبحاث محاذاة النماذج', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://www.anthropic.com/research", "description": "أبحاث حول كيفية جعل الذكاء الاصطناعي أكثر أماناً وتوافقاً."}'::jsonb),
('ai-academy-resource-ar-ai-community', 'ai-academy', 'resource', 'draft', false, 60, 'الذكاء الاصطناعي', 'مجتمع الذكاء الاصطناعي العربي', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "", "description": "منتدى للنقاشات وتبادل الخبرات حول الذكاء الاصطناعي باللغة العربية."}'::jsonb),
('ai-academy-resource-canva-magic-studio', 'ai-academy', 'resource', 'draft', false, 210, 'الذكاء الاصطناعي', 'مورد Canva Magic Studio', 'Canva Magic Studio', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://www.canva.com/magic/", "description": "مجموعة أدوات الذكاء الاصطناعي داخل منصة كانفا لتسهيل تصميم الصور العروض التقديمية."}'::jsonb),
('ai-academy-resource-chatgpt-2', 'ai-academy', 'resource', 'draft', false, 220, 'الذكاء الاصطناعي', 'مورد Chatgpt', 'Chatgpt', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://chatgpt.com", "description": "نموذج لغوي متقدم من OpenAI يستخدم في المحادثة وتوليد النصوص وحل المشكلات."}'::jsonb),
('ai-academy-resource-chatgpt', 'ai-academy', 'resource', 'draft', false, 70, 'الذكاء الاصطناعي', 'شات جي بي تي', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://chat.openai.com/", "description": "أداة ذكاء اصطناعي تفاعلية لتوليد النصوص، البرمجة، والتعلم."}'::jsonb),
('ai-academy-resource-claude-ai', 'ai-academy', 'resource', 'draft', false, 80, 'الذكاء الاصطناعي', 'كلود', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://claude.ai/", "description": "مساعد ذكاء اصطناعي متقدم يتميز بنافذة سياق كبيرة وقدرات تحليلية عالية."}'::jsonb),
('ai-academy-resource-claude', 'ai-academy', 'resource', 'draft', false, 230, 'الذكاء الاصطناعي', 'مورد Claude', 'Claude', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://claude.ai", "description": "مساعد ذكاء اصطناعي من Anthropic معروف بقدرته العالية على التحليل وتلخيص الملفات الكبيرة."}'::jsonb),
('ai-academy-resource-code-assistant', 'ai-academy', 'resource', 'draft', false, 90, 'الذكاء الاصطناعي', 'المساعد البرمجي', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://github.com/features/copilot", "description": "أداة من جيت هاب تساعد المبرمجين في كتابة الكود بشكل أسرع وأدق."}'::jsonb),
('ai-academy-resource-coursera-ai-for-everyone', 'ai-academy', 'resource', 'draft', false, 240, 'الذكاء الاصطناعي', 'مورد Coursera Ai For Everyone', 'Coursera Ai For Everyone', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://www.coursera.org/learn/ai-for-everyone", "description": "دورة تدريبية مبسطة من أندرو نغ موجهة لغير المتخصصين لفهم أساسيات الذكاء الاصطناعي."}'::jsonb),
('ai-academy-resource-deepl', 'ai-academy', 'resource', 'draft', false, 250, 'الذكاء الاصطناعي', 'مورد Deepl', 'Deepl', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://www.deepl.com", "description": "أداة ترجمة تعتمد على التعلم العميق تقدم ترجمات دقيقة واحترافية للغاية بين اللغات."}'::jsonb),
('ai-academy-resource-deeplearning-ai', 'ai-academy', 'resource', 'draft', false, 100, 'الذكاء الاصطناعي', 'منصة ديب ليرنينج للذكاء الاصطناعي', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://www.deeplearning.ai/", "description": "دورات تعليمية متقدمة في مجالات الذكاء الاصطناعي من تقديم أندرو نج."}'::jsonb),
('ai-academy-resource-fact-checking-tool', 'ai-academy', 'resource', 'draft', false, 110, 'الذكاء الاصطناعي', 'أداة التحقق من الحقائق الذكية', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "", "description": "منصة متخصصة في تحليل وتدقيق المعلومات المولدة آلياً."}'::jsonb),
('ai-academy-resource-gemini', 'ai-academy', 'resource', 'draft', false, 120, 'الذكاء الاصطناعي', 'جيمناي', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://gemini.google.com/", "description": "نموذج الذكاء الاصطناعي متعدد الوسائط من جوجل."}'::jsonb),
('ai-academy-resource-github-copilot', 'ai-academy', 'resource', 'draft', false, 260, 'الذكاء الاصطناعي', 'مورد Github Copilot', 'Github Copilot', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://github.com/features/copilot", "description": "مساعد برمجة مدعوم بالذكاء الاصطناعي يقترح أكواد برمجية ويساعد في كتابتها بسرعة."}'::jsonb),
('ai-academy-resource-google-gemini', 'ai-academy', 'resource', 'draft', false, 270, 'الذكاء الاصطناعي', 'مورد Google Gemini', 'Google Gemini', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://gemini.google.com", "description": "نموذج الذكاء الاصطناعي من جوجل المدمج في محرك البحث ومساحة العمل الخاصة بها."}'::jsonb),
('ai-academy-resource-hallucination-checker', 'ai-academy', 'resource', 'draft', false, 130, 'الذكاء الاصطناعي', 'مكتشف الهلوسة', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "", "description": "أداة برمجية لمقارنة نصوص الذكاء الاصطناعي مع المصادر الأصلية لضمان الدقة."}'::jsonb),
('ai-academy-resource-hugging-face-course', 'ai-academy', 'resource', 'draft', false, 140, 'الذكاء الاصطناعي', 'دورة المعالجة اللغوية الطبيعية', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://huggingface.co/course/", "description": "دورة مجانية ممتازة لفهم آليات عمل النماذج اللغوية الكبيرة."}'::jsonb),
('ai-academy-resource-hugging-face', 'ai-academy', 'resource', 'draft', false, 280, 'الذكاء الاصطناعي', 'مورد Hugging Face', 'Hugging Face', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://huggingface.co", "description": "منصة مفتوحة المصدر لمشاركة وتطوير نماذج الذكاء الاصطناعي وتعلم الآلة."}'::jsonb),
('ai-academy-resource-midjourney-2', 'ai-academy', 'resource', 'draft', false, 290, 'الذكاء الاصطناعي', 'مورد Midjourney', 'Midjourney', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://www.midjourney.com", "description": "أداة ذكاء اصطناعي توليدي لإنشاء صور عالية الجودة بناءً على الوصف النصي."}'::jsonb),
('ai-academy-resource-midjourney', 'ai-academy', 'resource', 'draft', false, 150, 'الذكاء الاصطناعي', 'ميدجورني', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://www.midjourney.com/", "description": "أداة متقدمة لتوليد الصور عالية الجودة باستخدام الذكاء الاصطناعي."}'::jsonb),
('ai-academy-resource-openai-docs', 'ai-academy', 'resource', 'draft', false, 160, 'الذكاء الاصطناعي', 'مستندات أوبن إي آي', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://platform.openai.com/docs/", "description": "المرجع الرسمي لتعلم كيفية استخدام نماذج OpenAI."}'::jsonb),
('ai-academy-resource-perplexity-2', 'ai-academy', 'resource', 'draft', false, 300, 'الذكاء الاصطناعي', 'مورد Perplexity', 'Perplexity', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://www.perplexity.ai", "description": "محرك بحث مدعوم بالذكاء الاصطناعي يقدم إجابات مباشرة وموثقة بالمصادر."}'::jsonb),
('ai-academy-resource-perplexity', 'ai-academy', 'resource', 'draft', false, 170, 'الذكاء الاصطناعي', 'محرك بحث بيربليكسيتي', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://www.perplexity.ai/", "description": "محرك بحث يعتمد على الذكاء الاصطناعي لتقديم إجابات موثقة بالمصادر."}'::jsonb),
('ai-academy-resource-prompt-engineering-guide', 'ai-academy', 'resource', 'draft', false, 180, 'الذكاء الاصطناعي', 'دليل هندسة الأوامر', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "https://www.promptingguide.ai/", "description": "دليل شامل لتعلم تقنيات هندسة الأوامر من الصفر للاحتراف."}'::jsonb),
('ai-academy-resource-prompt-library-repo', 'ai-academy', 'resource', 'draft', false, 190, 'الذكاء الاصطناعي', 'مستودع الأوامر مفتوح المصدر', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "", "description": "مستودع يحتوي على قوالب جاهزة لأوامر ذكاء اصطناعي لمختلف المهام."}'::jsonb),
('ai-academy-resource-research-assistant-ai', 'ai-academy', 'resource', 'draft', false, 200, 'الذكاء الاصطناعي', 'مساعد البحث العلمي الذكي', '', ARRAY['الذكاء الاصطناعي', 'resource']::text[], NULL, '{"url": "", "description": "منصة تدعم الباحثين في تلخيص الأوراق العلمية واستخراج البيانات."}'::jsonb);

-- Insert into ai_lessons (20 records)
INSERT INTO ai_lessons (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('ai-academy-lesson-advanced-prompting', 'ai-academy', 'lesson', 'draft', false, 10, 'الذكاء الاصطناعي', 'تقنيات التوجيه المتقدمة', 'Advanced Prompting Techniques', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# تقنيات التوجيه المتقدمة

بعد إتقان الأساسيات، ننتقل إلى تقنيات متقدمة مثل Few-shot prompting (تقديم أمثلة) و Chain of Thought (سلسلة الأفكار). هذه التقنيات تساعد النماذج على حل المشكلات المعقدة والمنطقية من خلال إجبارها على توضيح خطوات تفكيرها قبل إعطاء الإجابة النهائية، مما يقلل من نسبة الأخطاء بشكل كبير.', '{}'::jsonb),
('ai-academy-lesson-ai-ethics', 'ai-academy', 'lesson', 'draft', false, 20, 'الذكاء الاصطناعي', 'الأخلاقيات والذكاء الاصطناعي', 'Ethics and AI', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# الأخلاقيات والذكاء الاصطناعي

مع القوة الكبيرة تأتي مسؤولية أكبر. نناقش هنا القضايا الأخلاقية المرتبطة باستخدام الذكاء الاصطناعي، مثل التحيز في البيانات، الخصوصية، وحقوق الملكية الفكرية، وكيف يمكننا استخدام هذه التكنولوجيا بطريقة عادلة ومسؤولة.', '{}'::jsonb),
('ai-academy-lesson-ai-for-study-2', 'ai-academy', 'lesson', 'draft', false, 150, 'الذكاء الاصطناعي', 'الذكاء الاصطناعي كمعلمك الخاص', 'Ai For Study', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# الذكاء الاصطناعي كمعلمك الخاص

## كيف يمكن للطلاب الاستفادة؟
يمكن للذكاء الاصطناعي أن يوفر وقتاً وجهداً كبيراً في عملية التعلم إذا تم استخدامه بذكاء وأمانة.

## طرق عملية:
- **شرح المفاهيم الصعبة:** "اشرح لي نظرية فيثاغورس بكلمات بسيطة".
- **تلخيص الملفات:** يمكنك رفع ملف PDF وطلب تلخيص لأهم النقاط فيه.
- **التدرب على الاختبارات:** "اسألني أسئلة خيارات متعددة عن تاريخ الحرب العالمية الثانية".

> **تحذير:** تجنب استخدام الذكاء الاصطناعي لحل الواجبات نيابة عنك (النسخ واللصق). استخدمه كأداة للفهم والمساعدة، فالمعلمون باتوا يستخدمون أدوات لاكتشاف النصوص المولدة بالذكاء الاصطناعي!

## الخلاصة
اجعل الذكاء الاصطناعي رفيق دراستك، وليس بديلاً عن جهدك العقلي.', '{}'::jsonb),
('ai-academy-lesson-ai-for-study', 'ai-academy', 'lesson', 'draft', false, 30, 'الذكاء الاصطناعي', 'استخدام الذكاء الاصطناعي للدراسة', 'AI for Study', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# استخدام الذكاء الاصطناعي للدراسة

كيف نستخدم الذكاء الاصطناعي كمدرس خصوصي بدلاً من أداة لحل الواجبات؟ سنتعلم كيفية توجيه الذكاء الاصطناعي لإنشاء خطط دراسية، شرح المفاهيم المعقدة بطرق مبسطة، وتوليد أسئلة اختبار لتقييم فهمك دون الاعتماد عليه بشكل يضعف قدرتك على التفكير.', '{}'::jsonb),
('ai-academy-lesson-ai-for-work-2', 'ai-academy', 'lesson', 'draft', false, 160, 'الذكاء الاصطناعي', 'تعزيز الإنتاجية باستخدام الذكاء الاصطناعي', 'Ai For Work', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# تعزيز الإنتاجية باستخدام الذكاء الاصطناعي

## لماذا تحتاج الذكاء الاصطناعي في عملك؟
الموظف الذي يستخدم الذكاء الاصطناعي سيحل محل الموظف الذي لا يستخدمه. الأداة تساعدك على إنجاز المهام الروتينية بسرعة للتفرغ للإبداع.

## استخدامات شائعة في العمل:
- **كتابة الرسائل الرسمية:** صياغة إيميلات احترافية للعملاء أو المدراء.
- **تحليل البيانات:** إدخال أرقام المبيعات وطلب استخراج الاتجاهات الرئيسية.
- **إعداد العروض التقديمية:** المساعدة في هيكلة وتسلسل شرائح العرض.

## مثال على موجه للعمل:
"أنا أعمل في قسم المبيعات. اكتب رسالة اعتذار احترافية لعميل تأخرت شحنته بسبب مشاكل لوجستية، واعرض عليه خصماً 10% على طلبه القادم كتعويض."

## الخلاصة
استثمر وقتك في تعلم هذه الأدوات لتصبح أكثر كفاءة وإنتاجية في مكان عملك.', '{}'::jsonb),
('ai-academy-lesson-ai-for-work', 'ai-academy', 'lesson', 'draft', false, 40, 'الذكاء الاصطناعي', 'استخدام الذكاء الاصطناعي للعمل', 'AI for Work', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# استخدام الذكاء الاصطناعي للعمل

في بيئة العمل، يمكن للذكاء الاصطناعي أن يكون مساعدك الشخصي الفعال. استكشف كيف يمكنك أتمتة صياغة رسائل البريد الإلكتروني، تلخيص الاجتماعات والمستندات الطويلة، وتوليد أفكار لمشاريع جديدة، مع الحفاظ على بصمتك الشخصية والمهنية.', '{}'::jsonb),
('ai-academy-lesson-ai-hallucination', 'ai-academy', 'lesson', 'draft', false, 170, 'الذكاء الاصطناعي', 'هلوسة الذكاء الاصطناعي: عندما تكذب الآلة بثقة', 'Ai Hallucination', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# هلوسة الذكاء الاصطناعي: عندما تكذب الآلة بثقة

## ما هي الهلوسة؟
هي الحالة التي يقدم فيها نموذج الذكاء الاصطناعي معلومات غير صحيحة، أو يختلق حقائق لا وجود لها، لكنه يصيغها بطريقة تبدو مقنعة جداً.

## لماذا تحدث؟
لأن هذه النماذج تعتمد على التنبؤ بالكلمة التالية بناءً على احتمالات إحصائية، ولا "تفهم" الحقيقة كما يفهمها البشر. هي تحاول إرضاءك بإجابة مهما كلف الأمر!

## كيف تتعامل معها؟
1. **التحقق المستقل:** لا تعتمد على الذكاء الاصطناعي كمصدر وحيد للمعلومات الحساسة (مثل الطب والقانون).
2. **اطلب المصادر:** اجعل من عادتك سؤاله: "ما هي مصادرك؟". (أدوات مثل Perplexity أفضل في هذا المجال).
3. **التشكيك المنطقي:** إذا بدت المعلومة غريبة أو جيدة لدرجة يصعب تصديقها، ابحث عنها في جوجل.

## الخلاصة
الثقة العمياء في الذكاء الاصطناعي خطيرة. كن دائماً المحرر والمراجع لما يتم توليده.', '{}'::jsonb),
('ai-academy-lesson-detecting-hallucinations', 'ai-academy', 'lesson', 'draft', false, 50, 'الذكاء الاصطناعي', 'اكتشاف الهلوسة', 'Detecting Hallucinations', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# اكتشاف الهلوسة

أحد أكبر تحديات النماذج اللغوية هو ''الهلوسة'' - تقديم معلومات خاطئة بثقة تامة. في هذا الدرس، سنتعلم استراتيجيات للتعرف على الهلوسة، مثل طلب المصادر، والتحقق المتقاطع (Cross-validation) مع مصادر خارجية، وتقييم منطقية الإجابة.', '{}'::jsonb),
('ai-academy-lesson-evaluating-models', 'ai-academy', 'lesson', 'draft', false, 60, 'الذكاء الاصطناعي', 'تقييم النماذج', 'Evaluating Models', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# تقييم النماذج

كيف تختار النموذج المناسب لمهمتك؟ مقارنة بين GPT-4، Claude، وGemini. سنتعلم كيفية تقييم النماذج بناءً على عوامل مثل الدقة، السرعة، طول نافذة السياق، والقدرة على البرمجة أو التحليل الرياضي.', '{}'::jsonb),
('ai-academy-lesson-future-of-ai', 'ai-academy', 'lesson', 'draft', false, 70, 'الذكاء الاصطناعي', 'مستقبل الذكاء الاصطناعي', 'Future of AI', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# مستقبل الذكاء الاصطناعي

نظرة مستقبلية على التقنيات الناشئة في مجال الذكاء الاصطناعي، مثل الوكلاء المستقلين (Autonomous Agents) والذكاء الاصطناعي العام (AGI). كيف نستعد لهذه التغييرات ونتكيف مع سوق العمل المتطور باستمرار؟', '{}'::jsonb),
('ai-academy-lesson-how-to-prompt', 'ai-academy', 'lesson', 'draft', false, 180, 'الذكاء الاصطناعي', 'هندسة الأوامر: فن التحدث مع الآلة', 'How To Prompt', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# هندسة الأوامر: فن التحدث مع الآلة

## ما هي هندسة الأوامر؟
هي الطريقة التي تصيغ بها سؤالك أو طلبك لنموذج الذكاء الاصطناعي (مثل ChatGPT) للحصول على أفضل إجابة ممكنة.

## سر الأمر الناجح
للحصول على نتيجة رائعة، اتبع هذه المنهجية:
1. **الدور:** أخبره من يكون (مثلاً: "تصرف كخبير تسويق").
2. **المهمة:** ماذا تريد بالضبط؟ (مثلاً: "اكتب خطة تسويقية").
3. **السياق:** لمن هذه الخطة؟ (مثلاً: "لمطعم بيتزا جديد في دبي").
4. **التنسيق:** كيف تريد شكل الإجابة؟ (مثلاً: "في نقاط قصيرة ومباشرة").

## مثال عملي
بدلاً من قول: "أعطني أفكار عشاء"، 
قل: "تصرف كطاهٍ محترف، واقترح لي 3 وصفات عشاء صحية وسريعة التحضير باستخدام الدجاج والخضار فقط."

## الخلاصة
الوضوح والتفصيل هما مفتاح النجاح في التفاعل مع الذكاء الاصطناعي.', '{}'::jsonb),
('ai-academy-lesson-independent-learning', 'ai-academy', 'lesson', 'draft', false, 80, 'الذكاء الاصطناعي', 'التعلم المستقل مع الذكاء الاصطناعي', 'Independent Learning with AI', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# التعلم المستقل مع الذكاء الاصطناعي

الهدف الأسمى هو استخدام الذكاء الاصطناعي لتعزيز مهاراتك لا استبدالها. استراتيجيات لتجنب ''الاعتماد المفرط'' (Over-reliance)، مثل محاولة حل المشكلة بنفسك أولاً، ثم طلب تلميحات بدلاً من الحلول المباشرة، لضمان نموك المستمر كمتعلم.', '{}'::jsonb),
('ai-academy-lesson-intro-to-ai-2', 'ai-academy', 'lesson', 'draft', false, 190, 'الذكاء الاصطناعي', 'مقدمة في الذكاء الاصطناعي', 'Intro To Ai', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# مقدمة في الذكاء الاصطناعي

## ما هو الذكاء الاصطناعي؟
الذكاء الاصطناعي هو مجال واسع يهدف إلى جعل الآلات قادرة على التفكير والتعلم مثل البشر. نستخدمه في حياتنا اليومية أكثر مما نتخيل.

## أين نرى الذكاء الاصطناعي؟
- **الملاحة والتوجيه:** مثل خرائط جوجل التي تتوقع الازدحام.
- **التوصيات:** ما يقترحه لك يوتيوب أو نتفليكس.
- **المساعدات الصوتية:** مثل سيري في هواتف الآيفون.

> **تحذير مهم:** الذكاء الاصطناعي أداة مساعدة وليس بديلاً عن التفكير البشري. تأكد دائماً من مراجعة قراراته.

## الخلاصة
الذكاء الاصطناعي هنا ليبقى، وتعلم استخدامه يعطيك ميزة كبيرة في عصرنا الحالي.', '{}'::jsonb),
('ai-academy-lesson-intro-to-ai', 'ai-academy', 'lesson', 'draft', false, 90, 'الذكاء الاصطناعي', 'مقدمة في الذكاء الاصطناعي', 'Introduction to AI', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# مقدمة في الذكاء الاصطناعي

الذكاء الاصطناعي هو محاكاة للذكاء البشري في الآلات. في هذا الدرس سنتعرف على أساسيات الذكاء الاصطناعي وأنواعه المختلفة، وكيف تطور من الأنظمة المبنية على القواعد إلى النماذج اللغوية الكبيرة (LLMs) التي نستخدمها اليوم. فهم هذه الأساسيات سيساعدك على التعامل مع هذه التقنيات بثقة أكبر في حياتك اليومية.', '{}'::jsonb),
('ai-academy-lesson-prompt-engineering-basics', 'ai-academy', 'lesson', 'draft', false, 100, 'الذكاء الاصطناعي', 'أساسيات هندسة الأوامر', 'Prompt Engineering Basics', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# أساسيات هندسة الأوامر

هندسة الأوامر هي مهارة صياغة مدخلات دقيقة لطلب معلومات من أنظمة الذكاء الاصطناعي. سنتعلم كيف ننتقل من الأوامر البسيطة إلى أوامر أكثر تحديداً ووضوحاً. أهم قاعدة هي: ''الوضوح والسياق''، فكلما أعطيت النموذج سياقاً أفضل وتحديداً أدق للمهمة، حصلت على نتائج أكثر جودة.', '{}'::jsonb),
('ai-academy-lesson-prompt-libraries', 'ai-academy', 'lesson', 'draft', false, 110, 'الذكاء الاصطناعي', 'بناء مكتبات الأوامر', 'Building Prompt Libraries', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# بناء مكتبات الأوامر

لتوفير الوقت وزيادة الإنتاجية، من المهم بناء ''مكتبة أوامر'' (Prompt Library) خاصة بك. سنتعلم كيفية توثيق وحفظ الأوامر الناجحة، تصنيفها حسب المهمة، وإعادة استخدامها في سيناريوهات مختلفة بدلاً من كتابتها من الصفر في كل مرة.', '{}'::jsonb),
('ai-academy-lesson-rag-basics', 'ai-academy', 'lesson', 'draft', false, 120, 'الذكاء الاصطناعي', 'التوليد المعزز بالاسترجاع للمبتدئين', 'RAG for Beginners', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# التوليد المعزز بالاسترجاع للمبتدئين

نموذج RAG يدمج بين قوة الاسترجاع من قاعدة بيانات دقيقة وقوة التوليد اللغوي. نشرح كيف يتم استخدام هذه التقنية لضمان أن الذكاء الاصطناعي يجيب من مصادر معتمدة فقط، وهو ما يقلل الهلوسة ويزيد الموثوقية في بيئات العمل الحساسة.', '{}'::jsonb),
('ai-academy-lesson-safe-ai', 'ai-academy', 'lesson', 'draft', false, 200, 'الذكاء الاصطناعي', 'الاستخدام الآمن للذكاء الاصطناعي', 'Safe Ai', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# الاستخدام الآمن للذكاء الاصطناعي

## حماية بياناتك
العديد من أدوات الذكاء الاصطناعي المجانية تستخدم محادثاتك لتدريب نماذجها المستقبلية. هذا يعني أن ما تكتبه اليوم قد يظهر لشخص آخر غداً!

## قواعد ذهبية للأمان:
- **لا تشارك معلومات شخصية:** مثل أرقام الهواتف، العناوين، أو الهويات.
- **لا تشارك بيانات سرية للعمل:** أسرار الشركة المالية أو الأكواد البرمجية المغلقة لا يجب إدخالها في ChatGPT أو غيره.
- **الوعي بالتحيز:** النماذج قد تعطي إجابات متحيزة بناءً على البيانات التي تدربت عليها. لا تأخذ رأيها كحقيقة مطلقة.

> **نصيحة:** إذا كنت بحاجة لتحليل بيانات حساسة لشركتك، ابحث عن أدوات الذكاء الاصطناعي للمؤسسات (Enterprise) التي تضمن عدم استخدام بياناتك للتدريب.

## الخلاصة
استمتع بقدرات الذكاء الاصطناعي، لكن حافظ على حدود واضحة تحمي خصوصيتك وخصوصية عملك.', '{}'::jsonb),
('ai-academy-lesson-safety-and-security', 'ai-academy', 'lesson', 'draft', false, 130, 'الذكاء الاصطناعي', 'أمان وحماية الذكاء الاصطناعي', 'AI Safety and Security', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# أمان وحماية الذكاء الاصطناعي

كيف تحمي بياناتك الحساسة أثناء استخدام أدوات الذكاء الاصطناعي السحابية؟ ممارسات أمنية هامة مثل تجنب إدخال معلومات سرية أو بيانات عملاء حقيقية، وفهم سياسات الخصوصية الخاصة بالشركات المزودة لهذه الخدمات.', '{}'::jsonb),
('ai-academy-lesson-workflow-automation', 'ai-academy', 'lesson', 'draft', false, 140, 'الذكاء الاصطناعي', 'أتمتة سير العمل بالذكاء الاصطناعي', 'AI Workflow Automation', ARRAY['الذكاء الاصطناعي', 'lesson']::text[], '# أتمتة سير العمل بالذكاء الاصطناعي

ربط أدوات الذكاء الاصطناعي ببرامجك اليومية (مثل Notion و Zapier) لأتمتة المهام الروتينية. سيوضح هذا الدرس خطوات عملية لبناء سير عمل (Workflow) يقوم باستلام بيانات، تحليلها، ثم تقديم ملخص أو إجراء مباشر.', '{}'::jsonb);

-- Insert into automation_resources (30 records)
INSERT INTO automation_resources (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('automation-resource-ai-automation-trends', 'automation', 'resource', 'draft', false, 40, 'الأتمتة', 'مورد AI in Automation Trends', 'AI in Automation Trends', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-next-frontier-of-process-automation", "description": "تقرير من McKinsey حول كيفية دمج الذكاء الاصطناعي مع الأتمتة لخلق الجيل الجديد من العمليات الذكية."}'::jsonb),
('automation-resource-ai-automation', 'automation', 'resource', 'draft', false, 10, 'الأتمتة', 'الذكاء الاصطناعي في الأتمتة', 'Ai Automation', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://www.forbes.com/sites/forbestechcouncil/2023/04/10/the-future-of-ai-and-automation/", "description": "مقال يتحدث عن مستقبل دمج الذكاء الاصطناعي مع تقنيات الأتمتة."}'::jsonb),
('automation-resource-api-security-best-practices', 'automation', 'resource', 'draft', false, 50, 'الأتمتة', 'مورد API Security Best Practices', 'API Security Best Practices', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://owasp.org/www-project-api-security/", "description": "موارد من منظمة OWASP العالمية حول أمان واجهات برمجة التطبيقات وكيفية حماية بياناتك أثناء استخدام الأتمتة."}'::jsonb),
('automation-resource-apis-beginners', 'automation', 'resource', 'draft', false, 20, 'الأتمتة', 'واجهات برمجة التطبيقات للمبتدئين', 'Apis Beginners', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://zapier.com/learn/apis/", "description": "كتاب إلكتروني مجاني من Zapier يشرح APIs بلغة بسيطة ومفهومة."}'::jsonb),
('automation-resource-automate-io-alt', 'automation', 'resource', 'draft', false, 30, 'الأتمتة', 'بدائل Automate.io', 'Automate Io Alt', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://zapier.com/apps/automateio/integrations", "description": "نظرة على الخيارات البديلة المتاحة بعد إغلاق منصة Automate.io."}'::jsonb),
('automation-resource-automating-business-processes', 'automation', 'resource', 'draft', false, 60, 'الأتمتة', 'مورد Automating Business Processes', 'Automating Business Processes', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://hbr.org/2018/06/before-you-automate-your-processes-redesign-them", "description": "مقال من مجلة هارفارد بزنس ريفيو يناقش أهمية إعادة تصميم العمليات التجارية قبل محاولة أتمتتها لتحقيق أقصى استفادة."}'::jsonb),
('automation-resource-automation-safety', 'automation', 'resource', 'draft', false, 240, 'الأتمتة', 'دليل أمان الأتمتة', 'Automation Safety', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://www.cybersecurity-insiders.com/automation-security/", "description": "نصائح وإرشادات حول كيفية تأمين مسارات العمل المؤتمتة الخاصة بك والبيانات الحساسة."}'::jsonb),
('automation-resource-automation-testing-frameworks', 'automation', 'resource', 'draft', false, 70, 'الأتمتة', 'مورد Automation Testing Frameworks', 'Automation Testing Frameworks', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://www.softwaretestinghelp.com/automation-testing-frameworks/", "description": "مقال يستعرض أطر عمل اختبار الأتمتة وأهميتها في التأكد من استقرار تدفقات العمل قبل إطلاقها الفعلي."}'::jsonb),
('automation-resource-cloud-computing-intro', 'automation', 'resource', 'draft', false, 80, 'الأتمتة', 'مورد Introduction to Cloud Computing', 'Introduction to Cloud Computing', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://aws.amazon.com/what-is-cloud-computing/", "description": "مقدمة من AWS حول مفاهيم الحوسبة السحابية، والتي تُبنى عليها الغالبية العظمى من منصات وأدوات الأتمتة الحديثة."}'::jsonb),
('automation-resource-cron-job-syntax', 'automation', 'resource', 'draft', false, 90, 'الأتمتة', 'مورد Cron Job Syntax Guide', 'Cron Job Syntax Guide', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://crontab.guru/", "description": "أداة بسيطة تشرح وتساعد في صياغة توقيتات Cron Jobs لجدولة العمليات الأتمتية لتشغيلها في أوقات محددة بدقة."}'::jsonb),
('automation-resource-data-mapping-basics', 'automation', 'resource', 'draft', false, 100, 'الأتمتة', 'مورد Data Mapping Basics', 'Data Mapping Basics', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://www.ibm.com/topics/data-mapping", "description": "نظرة عامة من IBM حول مفهوم تخطيط البيانات (Data Mapping) وكيف يتم نقل البيانات من أنظمة مختلفة والتأكد من مطابقتها."}'::jsonb),
('automation-resource-error-handling-best-practices', 'automation', 'resource', 'draft', false, 110, 'الأتمتة', 'مورد Error Handling Best Practices', 'Error Handling Best Practices', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://www.smashingmagazine.com/2020/08/error-handling-nodejs-error-classes/", "description": "دليل تقني حول أفضل الممارسات في معالجة الأخطاء (Error Handling) في البرمجة النصية والتي يمكن تطبيقها على الأتمتة المتقدمة."}'::jsonb),
('automation-resource-gas-guide-2', 'automation', 'resource', 'draft', false, 250, 'الأتمتة', 'أدلة Google Apps Script', 'Gas Guide', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://developers.google.com/apps-script/guides", "description": "تعلم كيفية أتمتة تطبيقات Google Workspace وإنشاء إضافات مخصصة."}'::jsonb),
('automation-resource-gas-guide', 'automation', 'resource', 'draft', false, 120, 'الأتمتة', 'مورد Google Apps Script Guide', 'Google Apps Script Guide', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://developers.google.com/apps-script", "description": "الدليل الرسمي من جوجل لكتابة وتطوير سكريبتات لمنتجات Google Workspace مثل Sheets و Docs و Gmail للقيام بالأتمتة."}'::jsonb),
('automation-resource-http-status-codes', 'automation', 'resource', 'draft', false, 130, 'الأتمتة', 'مورد HTTP Status Codes Directory', 'HTTP Status Codes Directory', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://httpstatuses.com/", "description": "دليل مرجعي شامل ومبسط لجميع رموز استجابة HTTP (مثل 200, 404, 500) التي تواجهها أثناء التعامل مع الـ APIs والويب هوك."}'::jsonb),
('automation-resource-json-guide', 'automation', 'resource', 'draft', false, 140, 'الأتمتة', 'مورد JSON Guide', 'JSON Guide', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://www.w3schools.com/js/js_json_intro.asp", "description": "مقدمة شاملة من W3Schools لفهم صيغة JSON، وكيفية كتابتها وقراءتها، وهو أمر أساسي في جميع مسارات الأتمتة تقريباً."}'::jsonb),
('automation-resource-make-academy-2', 'automation', 'resource', 'draft', false, 260, 'الأتمتة', 'أكاديمية Make', 'Make Academy', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://academy.make.com/", "description": "دورات تدريبية مجانية لتعلم كيفية استخدام منصة Make للمبتدئين والمحترفين."}'::jsonb),
('automation-resource-make-academy', 'automation', 'resource', 'draft', false, 150, 'الأتمتة', 'مورد Make.com Academy', 'Make.com Academy', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://academy.make.com/", "description": "أكاديمية منصة Make التي تقدم دورات مجانية لتعلم كيفية استخدام المنصة لبناء الأتمتة من الصفر وتصميم السيناريوهات المتقدمة."}'::jsonb),
('automation-resource-n8n-docs', 'automation', 'resource', 'draft', false, 270, 'الأتمتة', 'وثائق n8n', 'N8N Docs', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://docs.n8n.io/", "description": "الدليل الرسمي لاستخدام منصة n8n وبناء مسارات عمل مخصصة."}'::jsonb),
('automation-resource-n8n-documentation', 'automation', 'resource', 'draft', false, 160, 'الأتمتة', 'مورد n8n Documentation', 'n8n Documentation', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://docs.n8n.io/", "description": "التوثيق الرسمي لمنصة n8n للأتمتة المفتوحة المصدر. يحتوي على أدلة مفصلة حول كيفية بناء مسارات العمل والعقد المتاحة وتطوير العقد المخصصة."}'::jsonb),
('automation-resource-oauth2-simplified', 'automation', 'resource', 'draft', false, 170, 'الأتمتة', 'مورد OAuth 2.0 Simplified', 'OAuth 2.0 Simplified', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://aaronparecki.com/oauth-2-simplified/", "description": "شرح مبسط لآلية المصادقة OAuth 2.0 وكيفية عملها، وهو أمر حيوي لفهم كيفية ربط تطبيقات الأتمتة بشكل آمن."}'::jsonb),
('automation-resource-power-automate-docs', 'automation', 'resource', 'draft', false, 180, 'الأتمتة', 'مورد Microsoft Power Automate Docs', 'Microsoft Power Automate Docs', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://learn.microsoft.com/en-us/power-automate/", "description": "وثائق مايكروسوفت لتعلم كيفية إنشاء التدفقات وأتمتة العمليات باستخدام Power Automate ضمن بيئة Microsoft 365."}'::jsonb),
('automation-resource-power-automate-learn', 'automation', 'resource', 'draft', false, 280, 'الأتمتة', 'تعلم Power Automate', 'Power Automate Learn', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://learn.microsoft.com/en-us/power-automate/", "description": "وثائق مايكروسوفت الرسمية لتعلم أتمتة العمليات التجارية."}'::jsonb),
('automation-resource-regex-data-extraction', 'automation', 'resource', 'draft', false, 190, 'الأتمتة', 'مورد Regex for Data Extraction', 'Regex for Data Extraction', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://regexr.com/", "description": "أداة ومورد تعليمي رائع لاختبار وتعلم التعابير النمطية (Regular Expressions) المستخدمة لاستخراج بيانات محددة من نصوص داخل مسارات الأتمتة."}'::jsonb),
('automation-resource-rest-api-tutorial', 'automation', 'resource', 'draft', false, 200, 'الأتمتة', 'مورد REST API Tutorial', 'REST API Tutorial', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://restfulapi.net/", "description": "مورد ممتاز لتعلم أساسيات واجهات برمجة التطبيقات (REST APIs)، والأفعال المستخدمة (GET, POST, PUT, DELETE) والرموز المرجعية."}'::jsonb),
('automation-resource-retry-policies-guide', 'automation', 'resource', 'draft', false, 210, 'الأتمتة', 'مورد Retry Policies Guide', 'Retry Policies Guide', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/transient-faults", "description": "دليل تصميم الأنماط المعمارية للتعامل مع الأخطاء المؤقتة وآليات إعادة المحاولة (Retry Patterns) لضمان استقرار العمليات."}'::jsonb),
('automation-resource-webhooks-explained-2', 'automation', 'resource', 'draft', false, 290, 'الأتمتة', 'شرح خطافات الويب', 'Webhooks Explained', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://sendgrid.com/blog/webhook-vs-api-whats-difference/", "description": "مقال يشرح الفرق بين Webhooks و APIs ومتى تستخدم كل منها."}'::jsonb),
('automation-resource-webhooks-explained', 'automation', 'resource', 'draft', false, 220, 'الأتمتة', 'مورد Webhooks Explained', 'Webhooks Explained', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://zapier.com/blog/what-is-a-webhook/", "description": "مقال شامل من Zapier يشرح مفهوم الويب هوك (Webhooks) وكيفية عملها وكيف تختلف عن الاستعلام الدوري (Polling)."}'::jsonb),
('automation-resource-zapier-blog', 'automation', 'resource', 'draft', false, 300, 'الأتمتة', 'مدونة Zapier', 'Zapier Blog', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://zapier.com/blog", "description": "مقالات رائعة وأدلة عملية حول الأتمتة وزيادة الإنتاجية."}'::jsonb),
('automation-resource-zapier-university', 'automation', 'resource', 'draft', false, 230, 'الأتمتة', 'مورد Zapier University', 'Zapier University', ARRAY['الأتمتة', 'resource']::text[], NULL, '{"url": "https://zapier.com/university", "description": "دروس وفيديوهات تعليمية من Zapier مصممة لمساعدة المستخدمين على فهم الأتمتة وربط تطبيقاتهم المختلفة بشكل فعال."}'::jsonb);

-- Insert into automation_lessons (20 records)
INSERT INTO automation_lessons (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('automation-lesson-ai-automation-intro', 'automation', 'lesson', 'draft', false, 10, 'الأتمتة', 'الأتمتة المدعومة بالذكاء الاصطناعي', 'Ai Automation Intro', ARRAY['الأتمتة', 'lesson']::text[], '## عصر جديد للأتمتة

دمج الذكاء الاصطناعي (مثل ChatGPT) مع أدوات الأتمتة (مثل Zapier) ينقل قدراتك إلى مستوى سحري.

### ماذا يمكن للذكاء الاصطناعي أن يضيف؟
- **تحليل النصوص:** قراءة رسائل العملاء وتحديد ما إذا كانوا غاضبين أم سعداء (Sentiment Analysis).
- **توليد المحتوى:** كتابة مسودة ردود تلقائية أو تلخيص المقالات الطويلة.
- **استخراج البيانات:** استخراج الاسم ورقم الهاتف من رسالة نصية عشوائية وتنسيقها.

### مثال عملي:
عند استلام تذكرة دعم فني، يقوم ChatGPT بتحليل المشكلة واقتراح حل، ثم يتم إرسال الاقتراح للعميل تلقائياً عبر البريد.

**الخلاصة:** الذكاء الاصطناعي يعطي مسارات العمل الخاص بك ''عقلاً'' لتبدو وكأن إنساناً يقوم بها.', '{}'::jsonb),
('automation-lesson-ai-in-automation', 'automation', 'lesson', 'draft', false, 20, 'الأتمتة', 'دمج الذكاء الاصطناعي لتطوير الأتمتة', 'Integrating AI in Automation', ARRAY[]::text[], '# دمج الذكاء الاصطناعي لتطوير عمليات الأتمتة

الذكاء الاصطناعي (AI) أضاف بعداً جديداً كلياً للأتمتة؛ فبدلاً من أن تقوم الأداة بنقل البيانات فقط، أصبحت الآن قادرة على "فهم" البيانات وتصنيفها وتلخيصها.

## تطبيقات الذكاء الاصطناعي في الأتمتة
- **تحليل المشاعر (Sentiment Analysis):** قراءة مراجعات العملاء وتصنيفها فوراً إلى (إيجابية أو سلبية) وتوجيه المراجعات السلبية فوراً لفريق التدخل السريع.
- **استخراج البيانات (Data Extraction):** استقبال فاتورة مصورة (PDF/Image) واستخدام الذكاء الاصطناعي لاستخراج رقم الفاتورة، التاريخ، والمبلغ لإدخالها في النظام المحاسبي بدقة.
- **الردود الذكية:** تلخيص رسائل البريد الإلكتروني الطويلة وصياغة مسودة رد احترافية يراجعها الموظف قبل الإرسال.

دمج نماذج مثل OpenAI و Anthropic في منصات مثل Make و n8n جعل من الممكن بناء وكلاء ذكاء اصطناعي مصغرين داخل مسارات العمل الخاصة بك.', '{}'::jsonb),
('automation-lesson-api-basics-automation', 'automation', 'lesson', 'draft', false, 30, 'الأتمتة', 'أساسيات واجهات برمجة التطبيقات للأتمتة', 'API Basics for Automation', ARRAY['الأتمتة', 'lesson']::text[], '# أساسيات واجهات برمجة التطبيقات (APIs) للأتمتة

واجهة برمجة التطبيقات (API) هي لغة التواصل التي تستخدمها البرامج للتحدث مع بعضها البعض ومشاركة البيانات. في عالم الأتمتة، الـ APIs هي العمود الفقري.

## كيف تعمل الـ API؟
تخيل أنك في مطعم. أنت (التطبيق أ) تنظر إلى القائمة، وتطلب طعاماً من النادل (API). يأخذ النادل طلبك إلى المطبخ (التطبيق ب)، ثم يعود إليك بالطعام (البيانات).

## الأفعال الأساسية (HTTP Methods)
- **GET**: جلب بيانات (مثال: قراءة قائمة العملاء).
- **POST**: إنشاء بيانات جديدة (مثال: إضافة عميل جديد).
- **PUT / PATCH**: تحديث بيانات موجودة.
- **DELETE**: حذف بيانات.

فهم كيفية قراءة وثائق الـ API سيرفع من مستوى قدراتك في أتمتة أي خدمة متاحة على الإنترنت.', '{}'::jsonb),
('automation-lesson-automation-documentation-testing', 'automation', 'lesson', 'draft', false, 40, 'الأتمتة', 'توثيق واختبار عمليات الأتمتة', 'Documentation and Testing Automation', ARRAY['الأتمتة', 'lesson']::text[], '# توثيق واختبار عمليات الأتمتة

أن تبني الأتمتة شيء، وأن تضمن استمرارها وإمكانية صيانتها شيء آخر. التوثيق والاختبار هما الفارق بين الهواة والمحترفين في الأتمتة.

## أهمية التوثيق
عندما تدير الشركة أكثر من 20 مسار عمل، يصبح من الصعب تذكر كيفية عمل كل مسار. التوثيق الجيد يجب أن يشمل:
- الهدف من الأتمتة.
- التطبيقات المستخدمة وبيانات الاعتماد.
- مخطط انسيابي (Flowchart) يوضح مسار البيانات.
- الأخطاء المحتملة وكيفية حلها.

## كيف تختبر الأتمتة؟
- **استخدام بيانات وهمية:** لا تقم بالاختبار أبداً باستخدام بيانات حقيقية للعملاء، قم بإنشاء إيميلات وحسابات اختبارية.
- **تغطية كل المسارات الممكنة:** إذا كان سير العمل يحتوي على شروط (IF/Else)، تأكد من اختبار كل شرط على حدة.
- **المراقبة بعد الإطلاق (Soft Launch):** أطلق الأتمتة واستمر في مراجعة سجلات التنفيذ (Logs) في الأيام الأولى لضمان سير كل شيء على ما يرام.', '{}'::jsonb),
('automation-lesson-automation-security-data-privacy', 'automation', 'lesson', 'draft', false, 50, 'الأتمتة', 'أمان الأتمتة وحماية البيانات', 'Automation Security and Data Privacy', ARRAY['الأتمتة', 'lesson']::text[], '# أمان الأتمتة وحماية البيانات

في خضم حماسنا لربط التطبيقات وتسهيل العمل، قد نتجاهل الجانب الأمني، وهو ما قد يؤدي إلى تسريب بيانات حساسة أو اختراق الأنظمة. الأمان في الأتمتة ليس أمراً ثانوياً.

## أفضل الممارسات لأمان الأتمتة:
1. **مبدأ الامتياز الأقل (Least Privilege):** عندما تنشئ مفتاح API لربط تطبيقين، لا تعطه صلاحية كاملة للنظام. أعطه فقط الصلاحية اللازمة (مثلاً: صلاحية قراءة الملفات فقط بدلاً من حذفها وتعديلها).
2. **حماية مفاتيح الـ API:** لا تضع مفاتيح الـ API بصيغة نصية واضحة في أي مكان عام. استخدم متغيرات البيئة (Environment Variables) لحفظها بأمان خاصة في أنظمة مثل n8n.
3. **التدقيق المنتظم (Auditing):** راجع التطبيقات المربوطة بحسابات الشركة بشكل دوري وقم بإلغاء وصول أي أداة لم تعد قيد الاستخدام.
4. **حماية الويب هوك (Webhook Security):** تأكد من أن نقاط الويب هوك الخاصة بك تستخدم مصادقة (مثل رمز سري في الترويسة Header) لكي لا يقبل نظامك أي بيانات مزيفة من مصدر خارجي.', '{}'::jsonb),
('automation-lesson-bpa-case-study', 'automation', 'lesson', 'draft', false, 60, 'الأتمتة', 'أتمتة العمليات التجارية: دراسة حالة', 'Business Process Automation: Case Study', ARRAY['الأتمتة', 'lesson']::text[], '# أتمتة العمليات التجارية (BPA): دراسة حالة

أتمتة العمليات التجارية تعني أخذ عملية معقدة تتضمن عدة أقسام وأتمتتها بالكامل. لفهم ذلك، لندرس حالة عملية حقيقية (إلحاق موظف جديد - Onboarding).

## السيناريو التقليدي:
عند توظيف شخص جديد، يتوجب على قسم الموارد البشرية إرسال الإيميلات، وإبلاغ قسم الـ IT لتجهيز الكمبيوتر، والطلب من المدير المالي اعتماد الراتب... عملية تستغرق أياماً وفيها الكثير من الإيميلات الضائعة.

## السيناريو المؤتمت:
1. **المحفز:** الموارد البشرية تغير حالة المرشح إلى "مُعين" في نظام الـ HR.
2. **الإجراءات التلقائية:**
   - إرسال بريد إلكتروني ترحيبي للموظف مع روابط لملء معلوماته.
   - إنشاء حساب بريد إلكتروني رسمي للموظف في Google Workspace.
   - إرسال تذكرة في نظام الدعم للـ IT لتجهيز اللابتوب الخاص به.
   - إرسال رسالة في قناة الشركة على Slack للترحيب بالموظف الجديد.
   - إضافته لجدول الرواتب في نظام المحاسبة.

كل هذا يحدث في ثوانٍ، بدلاً من أيام، وبدون أي أخطاء بشرية.', '{}'::jsonb),
('automation-lesson-building-approval-workflow', 'automation', 'lesson', 'draft', false, 70, 'الأتمتة', 'بناء سير عمل موافقات', 'Building an Approval Workflow', ARRAY['الأتمتة', 'lesson']::text[], '# بناء سير عمل موافقات (Approval Workflow)

سير عمل الموافقات هو أحد أهم الاستخدامات للأتمتة في بيئات العمل المشتركة، حيث يتطلب اتخاذ القرار تدخلاً بشرياً ولكن يمكن أتمتة كل ما يسبق ويلحق هذا القرار.

## كيف يعمل سير الموافقات؟
1. **الطلب (الزناد):** موظف يملأ نموذجاً لطلب إجازة أو صرف ميزانية.
2. **توجيه الطلب:** تقوم الأتمتة بجمع بيانات الطلب وإرسالها للمدير المباشر (عبر الإيميل أو Slack أو Teams).
3. **التوقف (Pause / Wait):** يتوقف سير العمل في انتظار رد المدير (بالضغط على زر ''موافق'' أو ''مرفوض'').
4. **تنفيذ القرار (المنطق الشرطي):**
   - *إذا وافق:* تحديث سجل الموارد البشرية، وإشعار الموظف بالموافقة.
   - *إذا رفض:* إشعار الموظف بالرفض مع طلب الأسباب.

استخدام أدوات مثل Power Automate أو Make يسهل بناء مثل هذه السيناريوهات لتسريع العمليات الإدارية.', '{}'::jsonb),
('automation-lesson-data-mapping-between-apps', 'automation', 'lesson', 'draft', false, 80, 'الأتمتة', 'تخطيط البيانات بين التطبيقات', 'Data Mapping Between Apps', ARRAY['الأتمتة', 'lesson']::text[], '# تخطيط البيانات (Data Mapping) بين التطبيقات

أثناء نقل البيانات من تطبيق إلى آخر في الأتمتة، نادراً ما تتطابق أسماء الحقول والتنسيقات. هنا يأتي دور تخطيط البيانات (Data Mapping).

## ما هو تخطيط البيانات؟
هو عملية توجيه النظام إلى الحقل المناسب لكل معلومة. مثلاً، التطبيق (أ) قد يسمي حقل الهاتف `phone_number` بينما التطبيق (ب) يسميه `ContactPhone`. التخطيط يخبر الأداة بأن هذين الحقلين يمثلان نفس المعلومة.

## تحديات التنسيق
في كثير من الأحيان ستحتاج إلى تعديل التنسيق أثناء التخطيط، مثل:
- تحويل التواريخ (من `DD-MM-YYYY` إلى `MM/DD/YYYY`).
- دمج الحقول (مثل دمج حقل "الاسم الأول" وحقل "اسم العائلة" في حقل واحد "الاسم الكامل").

الإتقان في تخطيط البيانات يضمن عدم ضياع المعلومات ووصولها بالشكل السليم إلى الوجهة النهائية.', '{}'::jsonb),
('automation-lesson-error-handling-automation', 'automation', 'lesson', 'draft', false, 90, 'الأتمتة', 'معالجة الأخطاء في الأتمتة', 'Error Handling in Automation', ARRAY['الأتمتة', 'lesson']::text[], '# معالجة الأخطاء (Error Handling) في الأتمتة

حتى أفضل مسارات العمل الأتمتية عرضة للفشل. قد يتوقف سيرفر، أو تتغير صيغة بيانات الـ API، أو ينفد رصيد حسابك في خدمة معينة. معالجة الأخطاء تضمن عدم توقف كل شيء.

## استراتيجيات معالجة الأخطاء
1. **مسارات الخطأ (Error Routes):** في أدوات مثل Make، يمكنك إعداد مسار خاص يتم تفعيله فقط في حال فشل العقدة (Node) الأساسية. يمكن لهذا المسار إرسال تنبيه لك.
2. **الاستمرار عند الفشل (Continue on Fail):** أحياناً يكون فشل خطوة غير مؤثر على باقي العملية، يمكنك إعداد الأداة لتجاهل الخطأ والمتابعة.
3. **التنبيهات الفورية:** من المهم دائماً إضافة خطوة ترسل رسالة إلى البريد الإلكتروني أو Slack في حال حدوث خطأ حرج (Critical Error) لتتدخل فوراً لإصلاحه.

سير العمل القوي ليس الذي لا يخطئ أبداً، بل هو الذي يعرف كيف يتصرف عند حدوث الخطأ.', '{}'::jsonb),
('automation-lesson-error-handling', 'automation', 'lesson', 'draft', false, 160, 'الأتمتة', 'التعامل مع الأخطاء في الأتمتة', 'Error Handling', ARRAY['الأتمتة', 'lesson']::text[], '## ماذا تفعل عندما تفشل الأتمتة؟

حتى أفضل مسارات العمل يمكن أن تفشل (مثلاً: تغيرت كلمة المرور، أو توقف التطبيق الآخر عن العمل). لذلك، يجب بناء مسارات عمل قوية.

### استراتيجيات التعامل مع الأخطاء:
1. **إشعارات الفشل:** قم بإعداد تنبيه (عبر البريد أو Slack) يصلك فور توقف أي مسار عمل.
2. **تجاهل الأخطاء (في بعض الحالات):** في Make مثلاً، يمكنك توجيه النظام لتجاهل الخطأ والانتقال للخطوة التالية.
3. **إعادة المحاولة (Retry):** بعض التطبيقات تسمح بإعادة المحاولة تلقائياً بعد فترة زمنية.

> تحذير: لا تتجاهل الأخطاء دون تسجيلها (Logging) لكي تستطيع حل المشكلة لاحقاً.

**الخلاصة:** النظام القوي هو الذي يتعامل مع الأخطاء بذكاء ولا يتوقف بالكامل عند أول عقبة.', '{}'::jsonb),
('automation-lesson-intro-automation-thinking', 'automation', 'lesson', 'draft', false, 100, 'الأتمتة', 'مقدمة في التفكير الأتمتي', 'Intro to Automation Thinking', ARRAY['الأتمتة', 'lesson']::text[], '# مقدمة في التفكير الأتمتي

التفكير الأتمتي هو منهجية لحل المشكلات تعتمد على تحديد المهام المتكررة والبحث عن طرق لإنجازها باستخدام التكنولوجيا دون تدخل بشري مستمر.

## لماذا نحتاج إلى الأتمتة؟
- **توفير الوقت**: تقليل الساعات المهدرة في إدخال البيانات والمهام الروتينية.
- **تقليل الأخطاء**: العمليات الآلية لا تخطئ بسبب التعب أو النسيان.
- **التركيز على القيمة**: السماح للموظفين بالتركيز على المهام الإبداعية والاستراتيجية.

## كيف تبدأ؟
قبل أن تستخدم أي أداة، ابدأ بمراقبة سير عملك اليومي. اسأل نفسك:
1. ما هي المهام التي أكررها يومياً أو أسبوعياً؟
2. هل تعتمد هذه المهام على قواعد واضحة ومحددة؟
3. هل يمكن لبرنامج أن يقوم بها بنفس الجودة (أو أفضل)؟

بمجرد تحديد هذه المهام، تكون قد خطوت الخطوة الأولى نحو بناء أنظمة العمل الذكية.', '{}'::jsonb),
('automation-lesson-intro-automation', 'automation', 'lesson', 'draft', false, 170, 'الأتمتة', 'مقدمة في أتمتة سير العمل', 'Intro Automation', ARRAY['الأتمتة', 'lesson']::text[], '## مرحباً بك في عالم الأتمتة

الأتمتة ليست مجرد أداة تقنية للمبرمجين، بل هي مهارة أساسية لأي شخص يرغب في توفير وقته وجهده وتقليل الأخطاء البشرية. في هذا الدرس، سنتعرف على أساسيات أتمتة سير العمل.

### ما هي الأتمتة؟
هي إعداد نظام لتنفيذ المهام المتكررة بدلاً منك. تخيل أن لديك مساعداً رقمياً يعمل على مدار الساعة لنسخ البيانات، إرسال رسائل التذكير، وتحديث الملفات.

### أمثلة عملية:
- حفظ مرفقات البريد الإلكتروني تلقائيًا في مجلد.
- إرسال رسالة ترحيبية فور تسجيل حساب جديد.

> تحذير: لا تقم بأتمتة المهام المعقدة التي تتطلب حكماً بشرياً أو ذكاءً عاطفياً.

**الخلاصة:** الأتمتة تتيح لك التركيز على المهام الإبداعية بدلاً من المهام الروتينية المتكررة.', '{}'::jsonb),
('automation-lesson-intro-google-apps-script', 'automation', 'lesson', 'draft', false, 110, 'الأتمتة', 'مدخل إلى برمجة تطبيقات جوجل', 'Intro to Google Apps Script', ARRAY['الأتمتة', 'lesson']::text[], '# مدخل إلى برمجة تطبيقات جوجل (Google Apps Script)

برمجة تطبيقات جوجل (GAS) هي لغة تعتمد على JavaScript تتيح لك تطوير وأتمتة ميزات وتدفقات عمل ضمن بيئة Google Workspace (Sheets, Docs, Gmail, Forms... إلخ).

## لماذا تستخدم GAS؟
- **مجانية تماماً:** متوفرة مع أي حساب جوجل ولا توجد رسوم إضافية للاستخدام العادي.
- **تكامل عميق:** يمكنها التحكم في ملفات جوجل درايف، تعديل جداول البيانات، وحتى قراءة وإرسال الإيميلات.
- **استبدال أدوات الأتمتة:** في بعض الحالات، يمكن لسكريبت بسيط أن يغنيك عن دفع اشتراكات شهرية في Zapier أو غيره.

## مثال على ما يمكنك فعله:
- إنشاء فاتورة بصيغة PDF من نموذج مبيعات في Sheets وإرسالها بالبريد.
- مسح إيميلات Gmail بحثاً عن مرفقات معينة وحفظها تلقائياً في Drive.
- إنشاء واجهة ويب بسيطة لجمع بيانات الموظفين.', '{}'::jsonb),
('automation-lesson-make-zapier-n8n-comparison', 'automation', 'lesson', 'draft', false, 120, 'الأتمتة', 'مقارنة بين Make و Zapier و n8n', 'Make vs Zapier vs n8n Comparison', ARRAY['الأتمتة', 'lesson']::text[], '# مقارنة بين أدوات الأتمتة: Make و Zapier و n8n

اختيار الأداة المناسبة هو نصف الحل. كل أداة من هذه الأدوات لها نقاط قوة تناسب فئات معينة.

## Zapier
- **الميزة الأساسية:** الأسهل في الاستخدام وتدعم أكبر عدد من التطبيقات الجاهزة.
- **العيوب:** أسعارها مرتفعة جداً مع زيادة عدد المهام، وقدراتها في العمليات المنطقية المعقدة محدودة مقارنة بالمنافسين.
- **لمن؟:** المبتدئين والشركات التي تبحث عن حلول سريعة ولا تمانع التكلفة.

## Make (Integromat)
- **الميزة الأساسية:** واجهة مرئية رائعة جداً تبني مسارات عمل قوية ومعقدة بتكلفة معقولة جداً.
- **العيوب:** منحنى التعلم قد يكون حاداً قليلاً في البداية لتعدد الميزات.
- **لمن؟:** المستخدمين المتقدمين والشركات المتوسطة التي تحتاج أتمتات معقدة.

## n8n
- **الميزة الأساسية:** مفتوحة المصدر (Fair-code)، يمكن استضافتها على سيرفرك الخاص (مما يوفر آلاف الدولارات)، وتسمح بكتابة كود برمجي داخل العقد (Nodes).
- **العيوب:** تتطلب خبرة تقنية للاستضافة الذاتية ولتحقيق أقصى استفادة.
- **لمن؟:** المطورين والشركات التقنية والباحثين عن الاستقلالية وتقليل التكاليف.', '{}'::jsonb),
('automation-lesson-retries-and-fallbacks', 'automation', 'lesson', 'draft', false, 130, 'الأتمتة', 'استراتيجيات إعادة المحاولة والخطط البديلة', 'Retries and Fallbacks', ARRAY['الأتمتة', 'lesson']::text[], '# استراتيجيات إعادة المحاولة والخطط البديلة (Retries and Fallbacks)

في عالم الشبكات، يمكن أن تفشل طلبات البيانات لعدة أسباب مؤقتة (مثل انقطاع لحظي للشبكة أو تحديث سريع للسيرفر). لذلك نحتاج إلى استراتيجيات للتعامل مع هذا الأمر.

## آلية إعادة المحاولة (Retry)
بدلاً من الاستسلام وإيقاف سير العمل بمجرد حدوث فشل، يمكن إعداد الأتمتة لتقوم بإعادة المحاولة (مثلاً 3 مرات، بفاصل دقيقتين بين كل محاولة). إذا كانت المشكلة مؤقتة، فستنجح المحاولة الثانية أو الثالثة دون تدخل بشري.

## الخطط البديلة (Fallbacks)
ماذا لو فشلت كل محاولات إعادة الاتصال؟ هنا نحتاج إلى خطة بديلة (Fallback).
على سبيل المثال: إذا كانت الأتمتة تعتمد على إرسال رسالة نصية قصيرة (SMS) إلى العميل لتأكيد الحجز، ولكن خدمة الـ SMS متعطلة، يجب أن تنتقل الأتمتة إلى الـ Fallback وتقوم بإرسال بريد إلكتروني بدلاً من ذلك لضمان وصول الرسالة.', '{}'::jsonb),
('automation-lesson-triggers-actions', 'automation', 'lesson', 'draft', false, 180, 'الأتمتة', 'فهم المحفزات والإجراءات', 'Triggers Actions', ARRAY['الأتمتة', 'lesson']::text[], '## كيف تعمل أي أتمتة؟

تعتمد جميع منصات الأتمتة (مثل Zapier و Make) على مفهومين أساسيين: المحفز (Trigger) والإجراء (Action).

### المحفز (Trigger)
هو الحدث الذي يوقظ النظام ويأمره ببدء العمل. ببساطة هو ''عندما يحدث كذا...''

### الإجراء (Action)
هو المهمة التي ينفذها النظام بمجرد أن يستيقظ. ببساطة هو ''...افعل كذا''.

### مثال:
- **المحفز:** استلام بريد إلكتروني جديد في Gmail.
- **الإجراء:** إرسال إشعار في Slack.

> نصيحة: حدد المحفزات بعناية لتجنب تشغيل سير العمل بالخطأ.

**الخلاصة:** المحفزات هي نقطة البداية، والإجراءات هي النتائج المطلوبة.', '{}'::jsonb),
('automation-lesson-understanding-triggers-actions', 'automation', 'lesson', 'draft', false, 140, 'الأتمتة', 'فهم المحفزات والإجراءات', 'Understanding Triggers and Actions', ARRAY['الأتمتة', 'lesson']::text[], '# فهم المحفزات والإجراءات (Triggers and Actions)

تتكون أي عملية أتمتة من جزأين رئيسيين: المحفز (Trigger) والإجراء (Action). بدون فهم هذين العنصرين، لا يمكن بناء سير عمل سليم.

## المحفز (Trigger)
هو الحدث الذي يطلق سير العمل. تخيله كـ "زر التشغيل". المحفز ينتظر حدوث شيء معين لكي يبدأ الأتمتة.
*مثال:* تلقي بريد إلكتروني جديد، أو إضافة صف في قاعدة بيانات، أو حتى وقت محدد (الساعة 8 صباحاً).

## الإجراء (Action)
هو المهمة التي يتم تنفيذها كنتيجة للمحفز. يمكن أن يكون هناك إجراء واحد أو عدة إجراءات متسلسلة.
*مثال:* إرسال رسالة في Slack، وإنشاء ملف PDF، وتحديث سجل في نظام الـ CRM.

**القاعدة الذهبية:** كل سير عمل (Workflow) يجب أن يحتوي على (Trigger) واحد على الأقل، و (Action) واحد على الأقل.', '{}'::jsonb),
('automation-lesson-webhooks-explained', 'automation', 'lesson', 'draft', false, 150, 'الأتمتة', 'ما هو الويب هوك وكيف يعمل؟', 'What is a Webhook and How it Works?', ARRAY[]::text[], '# ما هو الويب هوك (Webhook) وكيف يعمل؟

الويب هوك (Webhook) هو طريقة فعالة جداً لنقل البيانات في الوقت الفعلي بين التطبيقات. وهو يعتمد على مبدأ "لا تتصل بنا، نحن سنتصل بك".

## الفرق بين الاستعلام (Polling) والـ Webhook
- **الاستعلام (Polling):** التطبيق يسأل بشكل متكرر: "هل هناك بيانات جديدة؟" (مثلاً كل 5 دقائق). هذا يستهلك موارد وقد يتأخر.
- **الويب هوك (Webhook):** التطبيق يقول: "أخبرني فوراً عندما تحدث بيانات جديدة". التطبيق الآخر يرسل البيانات بمجرد حدوثها.

## كيف تستخدمه في الأتمتة؟
في منصات مثل Zapier أو Make، يمكنك إنشاء "عنوان URL مخصص للويب هوك". تقوم بإعطاء هذا الرابط للتطبيق المصدر (مثلاً Stripe). عندما تحدث عملية دفع ناجحة، يقوم Stripe بإرسال تفاصيل الدفع فوراً إلى هذا الرابط ليبدأ سير العمل.', '{}'::jsonb),
('automation-lesson-webhooks-integration', 'automation', 'lesson', 'draft', false, 190, 'الأتمتة', 'ربط التطبيقات باستخدام خطافات الويب', 'Webhooks Integration', ARRAY['الأتمتة', 'lesson']::text[], '## ما هو خطاف الويب (Webhook)؟

في عالم الأتمتة، يعد Webhook بمثابة نظام إشعارات فوري. بدلاً من أن تسأل تطبيقك كل 5 دقائق ''هل هناك بيانات جديدة؟''، يقوم التطبيق بإخبارك فوراً ''مرحباً، لدي بيانات جديدة الآن!''

### أهمية الـ Webhooks:
1. **السرعة:** يتم نقل البيانات في الوقت الفعلي (Real-time).
2. **الكفاءة:** يوفر موارد النظام لأنه لا يعتمد على الفحص المستمر (Polling).

### كيفية الاستخدام:
غالباً ما يوفر لك تطبيق الأتمتة رابطاً فريداً (URL)، تقوم بنسخه ولصقه في التطبيق الآخر كمستقبل للإشعارات.

**الخلاصة:** استخدم Webhooks دائماً عندما تكون السرعة والفورية أمران حاسمان لعملك.', '{}'::jsonb),
('automation-lesson-zapier-vs-make', 'automation', 'lesson', 'draft', false, 200, 'الأتمتة', 'مقدمة إلى Zapier و Make', 'Zapier Vs Make', ARRAY['الأتمتة', 'lesson']::text[], '## مقارنة بين عمالقة الأتمتة

هناك العديد من المنصات لربط التطبيقات دون برمجة، ولكن الأشهر حالياً هما Zapier و Make (سابقاً Integromat).

### منصة Zapier:
- **المميزات:** سهلة الاستخدام جداً للمبتدئين، تدعم عدداً هائلاً من التطبيقات.
- **العيوب:** تكلفتها مرتفعة عند زيادة المهام.

### منصة Make:
- **المميزات:** واجهة بصرية مرنة جداً، أسعار معقولة، تدعم السيناريوهات المعقدة بشكل أفضل.
- **العيوب:** قد تتطلب منحنى تعلم أعلى قليلاً.

### أيهما أختار؟
إذا كنت مبتدئاً وتريد حلاً سريعاً، ابدأ بـ Zapier. إذا كانت لديك عمليات معقدة وتريد توفير المال، استخدم Make.

**الخلاصة:** الأداة الأفضل تعتمد على ميزانيتك ومستوى تعقيد احتياجاتك.', '{}'::jsonb);

-- Insert into career_glossary (40 records)
INSERT INTO career_glossary (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('career-glossary-cv', 'career', 'glossary', 'draft', false, 350, 'المسار المهني', 'السيرة الذاتية', 'Cv', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "وثيقة تقدم ملخصاً عن خبراتك ومهاراتك.", "example": "مثال على استخدام مصطلح السيرة الذاتية في السياق المهني."}'::jsonb),
('career-glossary-elevator-pitch-2', 'career', 'glossary', 'draft', false, 360, 'المسار المهني', 'الخطاب الموجز', 'Elevator Pitch', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "عرض تقديمي قصير جداً عن نفسك ومهاراتك.", "example": "مثال على استخدام مصطلح الخطاب الموجز في السياق المهني."}'::jsonb),
('career-glossary-elevator-pitch', 'career', 'glossary', 'draft', false, 90, 'المسار المهني', 'العرض التعريفي السريع', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "مقدمة قصيرة ومقنعة عن نفسك ومهاراتك وما تبحث عنه مهنياً، تستغرق وقتاً لا يتجاوز ركوب المصعد.", "example": "تقديم نفسك بوضوح في أقل من 30 ثانية في فعالية توظيف لإثارة اهتمام مسؤول التوظيف."}'::jsonb),
('career-glossary-freelance', 'career', 'glossary', 'draft', false, 370, 'المسار المهني', 'العمل الحر', 'Freelance', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "تقديم الخدمات بشكل مستقل لعدة عملاء.", "example": "مثال على استخدام مصطلح العمل الحر في السياق المهني."}'::jsonb),
('career-glossary-gig-economy', 'career', 'glossary', 'draft', false, 100, 'المسار المهني', 'اقتصاد العمل الحر', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "سوق عمل يعتمد على الوظائف المؤقتة، والعمل المستقل، والعقود قصيرة الأجل بدلاً من الوظائف الدائمة.", "example": "العمل كمصمم جرافيك مستقل (Freelancer) وتقديم خدمات للعديد من العملاء."}'::jsonb),
('career-glossary-hard-skills-2', 'career', 'glossary', 'draft', false, 380, 'المسار المهني', 'المهارات الصلبة', 'Hard Skills', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "قدرات تقنية ومعرفة متخصصة يمكن قياسها.", "example": "مثال على استخدام مصطلح المهارات الصلبة في السياق المهني."}'::jsonb),
('career-glossary-hard-skills', 'career', 'glossary', 'draft', false, 110, 'المسار المهني', 'المهارات التقنية (الصلبة)', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "القدرات والمعارف التقنية المحددة والمطلوبة لأداء وظيفة معينة، والتي يمكن قياسها وتقييمها.", "example": "البرمجة بلغة بايثون، تصميم الجرافيك باستخدام فوتوشوب، أو التحليل المالي."}'::jsonb),
('career-glossary-imposter-syndrome', 'career', 'glossary', 'draft', false, 120, 'المسار المهني', 'متلازمة المحتال', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "شعور داخلي بعدم الكفاءة والشك في الذات رغم وجود أدلة على النجاح، والخوف من أن يكتشف الآخرون أنك \"محتال\".", "example": "الشعور بأنك لا تستحق الترقية التي حصلت عليها وأنها كانت مجرد حظ."}'::jsonb),
('career-glossary-informational-interview', 'career', 'glossary', 'draft', false, 130, 'المسار المهني', 'المقابلة الاستكشافية', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "لقاء غير رسمي مع محترف في مجال معين للحصول على معلومات ونصائح حول هذا المجال، وليس لطلب وظيفة بشكل مباشر.", "example": "دعوة مدير منتج لتناول القهوة وسؤاله عن تحديات مهنته والمهارات المطلوبة للنجاح فيها."}'::jsonb),
('career-glossary-internship', 'career', 'glossary', 'draft', false, 390, 'المسار المهني', 'التدريب المهني', 'Internship', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "فترة عمل مؤقتة لاكتساب خبرة عملية في مجال معين.", "example": "مثال على استخدام مصطلح التدريب المهني في السياق المهني."}'::jsonb),
('career-glossary-interview', 'career', 'glossary', 'draft', false, 400, 'المسار المهني', 'المقابلة الشخصية', 'Interview', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "لقاء لتقييم مدى ملاءمتك للوظيفة.", "example": "مثال على استخدام مصطلح المقابلة الشخصية في السياق المهني."}'::jsonb),
('career-glossary-job-description-2', 'career', 'glossary', 'draft', false, 410, 'المسار المهني', 'الوصف الوظيفي', 'Job Description', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "وثيقة توضح المهام والمسؤوليات المطلوبة لوظيفة معينة.", "example": "مثال على استخدام مصطلح الوصف الوظيفي في السياق المهني."}'::jsonb),
('career-glossary-job-description', 'career', 'glossary', 'draft', false, 140, 'المسار المهني', 'الوصف الوظيفي', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "وثيقة تحدد مسؤوليات الوظيفة ومهامها والمهارات والمؤهلات المطلوبة لأدائها.", "example": "قراءة الوصف الوظيفي بعناية لتحديد ما إذا كانت الوظيفة تناسب خبراتك وأهدافك المهنية."}'::jsonb),
('career-glossary-job-search-strategy', 'career', 'glossary', 'draft', false, 150, 'المسار المهني', 'استراتيجية البحث عن عمل', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "خطة منظمة للبحث عن الوظائف المناسبة تتضمن استخدام شبكات العلاقات، المنصات المهنية، ومواقع التوظيف.", "example": "تخصيص ساعتين يومياً للبحث عن وظائف والتواصل مع مسؤولي التوظيف على لينكد إن."}'::jsonb),
('career-glossary-linkedin-optimization', 'career', 'glossary', 'draft', false, 160, 'المسار المهني', 'تحسين حساب لينكد إن', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "تحديث وتطوير الملف الشخصي على لينكد إن ليكون احترافياً وجاذباً لمسؤولي التوظيف والزملاء في نفس المجال.", "example": "إضافة صورة احترافية وكتابة ملخص جذاب وإدراج الكلمات المفتاحية المتعلقة بمسارك المهني."}'::jsonb),
('career-glossary-linkedin', 'career', 'glossary', 'draft', false, 420, 'المسار المهني', 'لينكد إن', 'Linkedin', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "منصة مهنية لبناء شبكة علاقات والبحث عن وظائف.", "example": "مثال على استخدام مصطلح لينكد إن في السياق المهني."}'::jsonb),
('career-glossary-mentorship-2', 'career', 'glossary', 'draft', false, 430, 'المسار المهني', 'الإرشاد المهني', 'Mentorship', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "علاقة مهنية يقوم فيها شخص ذو خبرة بتوجيه شخص أقل خبرة.", "example": "مثال على استخدام مصطلح الإرشاد المهني في السياق المهني."}'::jsonb),
('career-glossary-mentorship', 'career', 'glossary', 'draft', false, 170, 'المسار المهني', 'التوجيه المهني (المنترشيب)', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "علاقة مهنية يقوم فيها شخص ذو خبرة بتقديم النصح والإرشاد والدعم لشخص أقل خبرة في مساره المهني.", "example": "البحث عن مرشد (Mentor) في شركتك لمساعدتك في تطوير مهاراتك القيادية."}'::jsonb),
('career-glossary-mock-interview', 'career', 'glossary', 'draft', false, 180, 'المسار المهني', 'المقابلة التجريبية', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "محاكاة لمقابلة عمل حقيقية للتدرب على الإجابات وتقليل التوتر وتحسين الأداء.", "example": "إجراء مقابلة تجريبية مع صديق أو مستشار مهني وتلقي ملاحظات بناءة على أدائك."}'::jsonb),
('career-glossary-negotiation', 'career', 'glossary', 'draft', false, 440, 'المسار المهني', 'التفاوض', 'Negotiation', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "النقاش للوصول إلى اتفاق حول الراتب والمزايا.", "example": "مثال على استخدام مصطلح التفاوض في السياق المهني."}'::jsonb),
('career-glossary-networking-2', 'career', 'glossary', 'draft', false, 450, 'المسار المهني', 'التشبيك', 'Networking', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "بناء علاقات مهنية مفيدة لتبادل المعلومات والفرص.", "example": "مثال على استخدام مصطلح التشبيك في السياق المهني."}'::jsonb),
('career-glossary-networking', 'career', 'glossary', 'draft', false, 190, 'المسار المهني', 'بناء العلاقات المهنية', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "التواصل مع المهنيين الآخرين لتبادل المعلومات والخبرات واكتشاف الفرص الوظيفية.", "example": "حضور المؤتمرات والفعاليات المهنية للتواصل مع الخبراء والمهتمين بنفس المجال."}'::jsonb),
('career-glossary-onboarding', 'career', 'glossary', 'draft', false, 200, 'المسار المهني', 'التهيئة الوظيفية', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "العملية التي يتم من خلالها دمج الموظفين الجدد في المؤسسة وتعريفهم بثقافتها وأدوارهم ومسؤولياتهم.", "example": "حضور جلسات تعريفية عن سياسات الشركة وتلقي التدريب الأساسي في الأسبوع الأول من العمل."}'::jsonb),
('career-glossary-personal-branding-2', 'career', 'glossary', 'draft', false, 460, 'المسار المهني', 'العلامة التجارية الشخصية', 'Personal Branding', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "الطريقة التي تسوق بها نفسك مهنياً.", "example": "مثال على استخدام مصطلح العلامة التجارية الشخصية في السياق المهني."}'::jsonb),
('career-glossary-personal-branding', 'career', 'glossary', 'draft', false, 210, 'المسار المهني', 'العلامة التجارية الشخصية', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "الصورة والانطباع الذي تتركه لدى الآخرين عنك في مجالك المهني، وكيف تسوق لنفسك وخبراتك.", "example": "نشر مقالات متخصصة في مجالك على مدونتك أو حسابك في لينكد إن لبناء سمعة كخبير."}'::jsonb),
('career-glossary-portfolio-2', 'career', 'glossary', 'draft', false, 470, 'المسار المهني', 'معرض الأعمال', 'Portfolio', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "مجموعة من أعمالك السابقة التي تثبت مهاراتك.", "example": "مثال على استخدام مصطلح معرض الأعمال في السياق المهني."}'::jsonb),
('career-glossary-portfolio', 'career', 'glossary', 'draft', false, 220, 'المسار المهني', 'معرض الأعمال (البورتفوليو)', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "مجموعة من النماذج والمشاريع التي توضح مهاراتك وخبراتك وإنجازاتك العملية للمستفيدين المحتملين.", "example": "إنشاء موقع إلكتروني يعرض أفضل التصاميم أو المشاريع البرمجية التي قمت بتنفيذها."}'::jsonb),
('career-glossary-proof-of-work', 'career', 'glossary', 'draft', false, 230, 'المسار المهني', 'إثبات العمل', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "تقديم أدلة ملموسة على قدراتك ومهاراتك من خلال مشاريع حقيقية أو إنجازات سابقة بدلاً من الاعتماد فقط على الشهادات.", "example": "المساهمة في مشاريع مفتوحة المصدر (Open Source) لإثبات كفاءتك البرمجية."}'::jsonb),
('career-glossary-remote-work-skills', 'career', 'glossary', 'draft', false, 240, 'المسار المهني', 'مهارات العمل عن بعد', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "القدرات اللازمة للعمل بفعالية وكفاءة خارج بيئة المكتب التقليدية، مثل إدارة الوقت والتواصل الافتراضي.", "example": "استخدام أدوات مثل Slack و Trello لإدارة المهام والتواصل مع الفريق بسلاسة."}'::jsonb),
('career-glossary-remote-work', 'career', 'glossary', 'draft', false, 480, 'المسار المهني', 'العمل عن بعد', 'Remote Work', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "العمل من موقع خارج المكتب التقليدي.", "example": "مثال على استخدام مصطلح العمل عن بعد في السياق المهني."}'::jsonb),
('career-glossary-reskilling', 'career', 'glossary', 'draft', false, 250, 'المسار المهني', 'إعادة التأهيل المهني', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "تعلم مهارات جديدة ومختلفة تماماً عن مهاراتك الحالية للانتقال إلى مسار مهني جديد.", "example": "تعلم البرمجة للعاملين في مجال المبيعات بهدف تغيير مسارهم المهني إلى تطوير البرمجيات."}'::jsonb),
('career-glossary-salary-negotiation', 'career', 'glossary', 'draft', false, 260, 'المسار المهني', 'التفاوض على الراتب', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "مناقشة العرض المالي مع صاحب العمل للوصول إلى اتفاق يرضي الطرفين ويعكس القيمة السوقية لمهاراتك.", "example": "البحث عن متوسط الرواتب في السوق لوظيفتك واستخدام هذه المعلومات لدعم موقفك التفاوضي."}'::jsonb),
('career-glossary-skill-gap-analysis', 'career', 'glossary', 'draft', false, 270, 'المسار المهني', 'تحليل الفجوة في المهارات', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "عملية تحديد المهارات التي تنقصك للوصول إلى هدف مهني معين وكيفية اكتسابها.", "example": "مقارنة مهاراتك الحالية بمتطلبات وظيفة مدير مشروع وتحديد الحاجة للحصول على شهادة PMP."}'::jsonb),
('career-glossary-soft-skills-2', 'career', 'glossary', 'draft', false, 490, 'المسار المهني', 'المهارات الناعمة', 'Soft Skills', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "سمات شخصية ومهارات تواصل تؤثر على طريقة عملك.", "example": "مثال على استخدام مصطلح المهارات الناعمة في السياق المهني."}'::jsonb),
('career-glossary-soft-skills', 'career', 'glossary', 'draft', false, 280, 'المسار المهني', 'المهارات الشخصية (الناعمة)', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "السمات الشخصية والقدرات الاجتماعية التي تساعدك على التفاعل مع الآخرين والعمل في بيئة جماعية.", "example": "الذكاء العاطفي، حل المشكلات، العمل الجماعي، والمرونة."}'::jsonb),
('career-glossary-star-method-2', 'career', 'glossary', 'draft', false, 500, 'المسار المهني', 'طريقة STAR', 'Star Method', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "هيكلية للإجابة على أسئلة المقابلات السلوكية.", "example": "مثال على استخدام مصطلح طريقة STAR في السياق المهني."}'::jsonb),
('career-glossary-star-method', 'career', 'glossary', 'draft', false, 290, 'المسار المهني', 'طريقة ستار (STAR)', 'STAR', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "استراتيجية للإجابة على أسئلة المقابلات السلوكية تتضمن وصف الموقف (Situation)، المهمة (Task)، الإجراء (Action)، والنتيجة (Result).", "example": "استخدام طريقة ستار لشرح كيف قمت بحل مشكلة مع عميل غاضب وتحقيق نسبة رضا عالية."}'::jsonb),
('career-glossary-transferable-skills', 'career', 'glossary', 'draft', false, 300, 'المسار المهني', 'المهارات القابلة للنقل', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "المهارات التي تكتسبها في وظيفة أو تجربة معينة ويمكن استخدامها وتطبيقها في وظائف ومجالات أخرى.", "example": "مهارات القيادة والتواصل التي اكتسبتها في العمل التطوعي وتطبيقها في بيئة العمل للشركات."}'::jsonb),
('career-glossary-upskilling', 'career', 'glossary', 'draft', false, 310, 'المسار المهني', 'تطوير المهارات', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "عملية تعلم مهارات جديدة أو تحسين المهارات الحالية لمواكبة التطورات في سوق العمل والتأهل لفرص أفضل.", "example": "أخذ دورة تدريبية في الذكاء الاصطناعي لتعزيز مهاراتك التقنية."}'::jsonb),
('career-glossary-work-life-balance', 'career', 'glossary', 'draft', false, 320, 'المسار المهني', 'التوازن بين العمل والحياة', '', ARRAY['المسار المهني', 'مصطلحات']::text[], NULL, '{"definition": "القدرة على إدارة الوقت بفعالية بين متطلبات العمل والمسؤوليات الشخصية والراحة.", "example": "تحديد ساعات عمل محددة وتخصيص وقت للعائلة والهوايات لتجنب الإرهاق الوظيفي."}'::jsonb);

-- Insert into career_prompts (30 records)
INSERT INTO career_prompts (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('career-prompt-achievements-bullet-points', 'career', 'prompt', 'draft', false, 10, 'المسار المهني', 'صياغة نقاط إنجاز للسيرة الذاتية', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "حول هذه المهمة العادية: [وصف المهمة] إلى نقطة إنجاز قوية للسيرة الذاتية باستخدام صيغة (الفعل + المهمة + النتيجة أو التأثير) والأرقام إن أمكن.", "instructions": "ركز على التأثير الذي أحدثته بدلاً من مجرد سرد المهام اليومية."}'::jsonb),
('career-prompt-career-growth-discussion', 'career', 'prompt', 'draft', false, 20, 'المسار المهني', 'مناقشة التطور المهني مع المدير', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "أرغب في مناقشة فرص التطور المهني والترقية مع مديري. اقترح عليّ هيكلاً لهذه المناقشة، والنقاط التي يجب أن أركز عليها، وكيف يمكنني طلب دعم الشركة في خطتي التطويرية.", "instructions": "اجمع أدلة على إنجازاتك وقيمتك المضافة قبل هذا الاجتماع."}'::jsonb),
('career-prompt-career-shift-plan-2', 'career', 'prompt', 'draft', false, 210, 'المسار المهني', 'خطة تغيير المسار', 'Career Shift Plan', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "ضع لي خطة للانتقال من مجال [المجال الحالي] إلى مجال [المجال الجديد].", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني."}'::jsonb),
('career-prompt-career-shift-plan', 'career', 'prompt', 'draft', false, 30, 'المسار المهني', 'خطة التحول المهني', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "أرغب في تغيير مساري المهني من [المجال الحالي] إلى [المجال المستهدف]. ساعدني في وضع خطة عمل خطوة بخطوة للتحول المهني، بما في ذلك المهارات التي يجب تعلمها، وكيفية تسويق مهاراتي القابلة للنقل.", "instructions": "حدد الموارد التعليمية وابدأ بتنفيذ الخطة تدريجياً."}'::jsonb),
('career-prompt-cover-letter-gen', 'career', 'prompt', 'draft', false, 220, 'المسار المهني', 'كتابة خطاب مقدمة', 'Cover Letter Gen', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "اكتب خطاب مقدمة احترافي لوظيفة [المسمى الوظيفي] في شركة [اسم الشركة].", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني."}'::jsonb),
('career-prompt-cover-letter-generation', 'career', 'prompt', 'draft', false, 40, 'المسار المهني', 'كتابة خطاب مقدمة مقنع', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "بناءً على سيرتي الذاتية: [السيرة الذاتية] والوصف الوظيفي: [الوصف الوظيفي] لشركة [اسم الشركة]، اكتب خطاب مقدمة احترافي ومقنع يسلط الضوء على أبرز إنجازاتي وكيف يمكنني إضافة قيمة للشركة.", "instructions": "راجع الخطاب المنتج وعدل عليه ليحمل بصمتك الشخصية قبل إرساله."}'::jsonb),
('career-prompt-cv-review', 'career', 'prompt', 'draft', false, 230, 'المسار المهني', 'مراجعة السيرة الذاتية', 'Cv Review', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "قم بمراجعة سيرتي الذاتية التالية واقترح تحسينات: [نص السيرة]", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني."}'::jsonb),
('career-prompt-cv-tailoring', 'career', 'prompt', 'draft', false, 50, 'المسار المهني', 'تخصيص السيرة الذاتية للوظيفة', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "قم بمراجعة الوصف الوظيفي التالي: [الوصف الوظيفي] والسيرة الذاتية الخاصة بي: [السيرة الذاتية]. اقترح تعديلات على سيرتي الذاتية لتتناسب بشكل أفضل مع الوصف الوظيفي، مع التركيز على إبراز المهارات والخبرات ذات الصلة.", "instructions": "استخدم هذا الموجه لتعديل سيرتك الذاتية لكل وظيفة تتقدم إليها لزيادة فرصك في تجاوز أنظمة تتبع المتقدمين."}'::jsonb),
('career-prompt-elevator-pitch-creation', 'career', 'prompt', 'draft', false, 60, 'المسار المهني', 'صياغة العرض التعريفي السريع', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "استناداً إلى خبرتي في [مجال الخبرة] وإنجازي الأبرز وهو [الإنجاز]، قم بصياغة عرض تعريفي سريع (Elevator Pitch) يستغرق 30 ثانية أستخدمه في فعاليات التواصل المهني لتعريف الناس بما أقوم به وما أبحث عنه.", "instructions": "تدرب على إلقاء العرض بصوت عالٍ حتى يبدو طبيعياً وواثقاً."}'::jsonb),
('career-prompt-ethical-ai-application', 'career', 'prompt', 'draft', false, 70, 'المسار المهني', 'الاستخدام الأخلاقي للذكاء الاصطناعي في التوظيف', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "كيف يمكنني استخدام أدوات الذكاء الاصطناعي لتحسين سيرتي الذاتية والتحضير للمقابلات بطريقة أخلاقية وشفافة، دون المبالغة أو تقديم معلومات غير دقيقة؟", "instructions": "استخدم الذكاء الاصطناعي كأداة للمساعدة والتحسين وليس كبديل لجهدك الشخصي وصدقك."}'::jsonb),
('career-prompt-follow-up-after-interview', 'career', 'prompt', 'draft', false, 80, 'المسار المهني', 'رسالة متابعة بعد المقابلة', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "أجريت اليوم مقابلة لوظيفة [اسم الوظيفة] مع [اسم المقابل]. اكتب رسالة بريد إلكتروني للمتابعة أشكره فيها على وقته، وأؤكد على اهتمامي بالوظيفة، وأشير بإيجاز إلى موضوع مثير للاهتمام ناقشناه خلال المقابلة وهو [موضوع النقاش].", "instructions": "أرسل رسالة المتابعة خلال 24 ساعة من إجراء المقابلة."}'::jsonb),
('career-prompt-freelance-proposal', 'career', 'prompt', 'draft', false, 90, 'المسار المهني', 'كتابة عرض عمل حر (Proposal)', 'Proposal', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "أعمل كمستقل في مجال [مجالك]. اكتب لي نموذجاً لعرض عمل (Proposal) لتقديمه لعميل محتمل لتنفيذ مشروع [وصف المشروع]. يجب أن يتضمن العرض فهمي للمشكلة، الحل المقترح، الإطار الزمني، والتكلفة التقديرية.", "instructions": "قم بتخصيص العرض لكل عميل وتوضيح القيمة التي ستقدمها لمشروعه تحديداً."}'::jsonb),
('career-prompt-handling-rejection', 'career', 'prompt', 'draft', false, 100, 'المسار المهني', 'الرد على رسالة رفض وظيفي', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "تلقيت رسالة رفض بعد إجراء مقابلة لوظيفة كنت مهتماً بها. اكتب رداً احترافياً أشكرهم فيه على الفرصة، وأطلب ملاحظات بناءة (Feedback) حول أدائي في المقابلة لتحسين فرصي في المستقبل.", "instructions": "طلب الملاحظات يمكن أن يكون فرصة ممتازة للتعلم والتطور، وقد يترك انطباعاً إيجابياً دائماً."}'::jsonb),
('career-prompt-interview-prep-star', 'career', 'prompt', 'draft', false, 110, 'المسار المهني', 'التحضير للمقابلة بطريقة ستار', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "أنا أستعد لمقابلة لوظيفة [اسم الوظيفة]. يرجى تزويدي بـ 5 أسئلة سلوكية شائعة لهذه الوظيفة، واقترح كيف يمكنني الإجابة على كل منها باستخدام طريقة STAR بناءً على خبرتي في [مجال خبرتك].", "instructions": "استخدم الإجابات المقترحة كنقطة انطلاق لتدوين قصصك الواقعية."}'::jsonb),
('career-prompt-interview-prep', 'career', 'prompt', 'draft', false, 240, 'المسار المهني', 'التحضير للمقابلة', 'Interview Prep', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "اطرح علي أسئلة مقابلة شائعة لوظيفة [المسمى الوظيفي] وقيّم إجاباتي.", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني."}'::jsonb),
('career-prompt-job-search-keywords', 'career', 'prompt', 'draft', false, 120, 'المسار المهني', 'استخراج الكلمات المفتاحية للبحث', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "استخرج أهم الكلمات المفتاحية والمهارات من هذا الوصف الوظيفي: [نص الوصف الوظيفي]. قم بتصنيفها إلى مهارات تقنية، مهارات ناعمة، ومتطلبات أخرى.", "instructions": "استخدم هذه الكلمات المفتاحية في سيرتك الذاتية وملفك على لينكد إن لزيادة ظهورك."}'::jsonb),
('career-prompt-linkedin-summary-2', 'career', 'prompt', 'draft', false, 250, 'المسار المهني', 'ملخص لينكد إن', 'Linkedin Summary', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "اكتب ملخص احترافي لملفي الشخصي على لينكد إن بناءً على خبراتي: [الخبرات]", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني."}'::jsonb),
('career-prompt-linkedin-summary', 'career', 'prompt', 'draft', false, 130, 'المسار المهني', 'كتابة ملخص احترافي للينكد إن', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "اكتب ملخصاً جذاباً لحسابي على لينكد إن بناءً على المعلومات التالية عن خبراتي وأهدافي المهنية: [معلومات عن خبراتك وأهدافك]. اجعل الملخص يعكس شخصيتي المهنية ويشمل الكلمات المفتاحية لمجال [مجال عملك].", "instructions": "تأكد من أن الملخص يبرز ما يجعلك فريداً في مجالك."}'::jsonb),
('career-prompt-mock-interview-simulation', 'career', 'prompt', 'draft', false, 140, 'المسار المهني', 'محاكاة مقابلة عمل', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "أريدك أن تلعب دور مسؤول توظيف يجري مقابلة معي لوظيفة [اسم الوظيفة]. اطرح عليّ سؤالاً تلو الآخر، وانتظر إجابتي، ثم قدم لي تقييماً بناءً وكيف يمكنني تحسين إجابتي.", "instructions": "تفاعل مع النموذج وكأنك في مقابلة حقيقية لتعظيم الفائدة."}'::jsonb),
('career-prompt-networking-message', 'career', 'prompt', 'draft', false, 150, 'المسار المهني', 'رسالة تواصل مهني على لينكد إن', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "أريد التواصل مع [اسم الشخص أو المسمى الوظيفي] الذي يعمل في شركة [اسم الشركة] على لينكد إن. اكتب رسالة قصيرة ومهذبة لطلب التواصل وربما طلب مقابلة استكشافية قصيرة لمعرفة المزيد عن مساره المهني.", "instructions": "قم بتخصيص الرسالة وذكر سبب اهتمامك بالتواصل مع هذا الشخص تحديداً."}'::jsonb),
('career-prompt-networking-msg', 'career', 'prompt', 'draft', false, 260, 'المسار المهني', 'رسالة تشبيك', 'Networking Msg', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "اكتب رسالة تواصل احترافية لإرسالها لشخص يعمل في شركة أحلم بالعمل بها.", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني."}'::jsonb),
('career-prompt-portfolio-ideas-2', 'career', 'prompt', 'draft', false, 270, 'المسار المهني', 'أفكار لمعرض الأعمال', 'Portfolio Ideas', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "اقترح علي أفكار مشاريع أضيفها لمعرض أعمالي في مجال [مجال العمل].", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني."}'::jsonb),
('career-prompt-portfolio-ideas', 'career', 'prompt', 'draft', false, 160, 'المسار المهني', 'أفكار لمشاريع معرض الأعمال', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "أعمل في مجال [مجالك] وأرغب في بناء معرض أعمال (بورتفوليو) قوي. اقترح 3 أفكار لمشاريع عملية يمكنني تنفيذها وإضافتها لمعرض أعمالي لإثبات مهاراتي في [مهارة معينة].", "instructions": "اختر المشاريع التي تظهر شغفك وقدرتك على حل المشاكل الواقعية."}'::jsonb),
('career-prompt-remote-work-readiness', 'career', 'prompt', 'draft', false, 170, 'المسار المهني', 'تقييم الجاهزية للعمل عن بعد', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "أرغب في التقدم لوظيفة عن بعد بالكامل. ما هي أهم المهارات والأدوات التي يجب أن أتقنها، وكيف يمكنني إثبات قدرتي على العمل باستقلالية وإدارة وقتي بفعالية في سيرتي الذاتية؟", "instructions": "احرص على تضمين أمثلة لخبرات سابقة في العمل أو التعلم عن بعد إن وجدت."}'::jsonb),
('career-prompt-resignation-letter', 'career', 'prompt', 'draft', false, 180, 'المسار المهني', 'كتابة خطاب استقالة', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "أحتاج إلى كتابة خطاب استقالة رسمي لمديري في شركة [اسم الشركة] بمناسبة انتقالي لفرصة جديدة. سأغادر في تاريخ [تاريخ المغادرة]. اجعل الخطاب احترافياً، وإيجابياً، واعرض فيه المساعدة خلال فترة الانتقال.", "instructions": "احرص على ترك انطباع جيد والحفاظ على العلاقات المهنية حتى عند المغادرة."}'::jsonb),
('career-prompt-salary-negotiation-script', 'career', 'prompt', 'draft', false, 190, 'المسار المهني', 'سيناريو التفاوض على الراتب', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "تلقيت عرض عمل بوظيفة [اسم الوظيفة] براتب [الراتب المعروض]، لكنني أطمح للوصول إلى [الراتب المستهدف]. اكتب لي سيناريو احترافي للتفاوض على الراتب عبر البريد الإلكتروني أو الهاتف يبرز قيمتي وما يمكنني تقديمه للشركة.", "instructions": "تأكد من إجراء بحث حول متوسط الرواتب في السوق قبل التفاوض."}'::jsonb),
('career-prompt-salary-negotiation', 'career', 'prompt', 'draft', false, 280, 'المسار المهني', 'التفاوض على الراتب', 'Salary Negotiation', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "كيف أفاوض على راتب أعلى لوظيفة [المسمى الوظيفي]؟ أعطني سيناريو وحوار مقترح.", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني."}'::jsonb),
('career-prompt-skill-gap-analysis', 'career', 'prompt', 'draft', false, 200, 'المسار المهني', 'تحليل الفجوة في المهارات', '', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "هدفي المهني هو الوصول إلى منصب [المنصب المستهدف]. حالياً أمتلك المهارات التالية: [المهارات الحالية]. قم بتحليل الفجوة في المهارات واقترح خطة واضحة والمهارات التي يجب أن أتعلمها لتحقيق هدفي.", "instructions": "استخدم هذا الموجه لبناء خطة تطوير شخصية واقعية."}'::jsonb),
('career-prompt-skills-gap', 'career', 'prompt', 'draft', false, 290, 'المسار المهني', 'تحليل فجوة المهارات', 'Skills Gap', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "قارن بين مهاراتي الحالية ومتطلبات وظيفة [المسمى الوظيفي] وحدد المهارات التي أحتاج تطويرها.", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني."}'::jsonb),
('career-prompt-star-answer', 'career', 'prompt', 'draft', false, 300, 'المسار المهني', 'إجابة STAR', 'Star Answer', ARRAY['المسار المهني', 'prompt']::text[], NULL, '{"prompt_text": "ساعدني في صياغة إجابة بطريقة STAR لموقف واجهت فيه تحدياً في العمل.", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني."}'::jsonb);

-- Insert into career_resources (30 records)
INSERT INTO career_resources (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('career-resource-behance', 'career', 'resource', 'draft', false, 10, 'المسار المهني', 'بيهانس', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://www.behance.net", "description": "منصة رائدة للمصممين والمبدعين لعرض أعمالهم (Portfolio) واكتشاف الفرص المهنية."}'::jsonb),
('career-resource-career-advice', 'career', 'resource', 'draft', false, 210, 'المسار المهني', 'نصائح مهنية', 'Career Advice', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "", "description": "مدونة تقدم مقالات ونصائح قيمة لتطوير مسارك المهني."}'::jsonb),
('career-resource-coursera', 'career', 'resource', 'draft', false, 20, 'المسار المهني', 'كورسيرا', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://www.coursera.org", "description": "منصة تعليمية توفر برامج وشهادات من جامعات وشركات عالمية رائدة لتطوير المهارات."}'::jsonb),
('career-resource-cover-letter-examples', 'career', 'resource', 'draft', false, 220, 'المسار المهني', 'نماذج خطابات مقدمة', 'Cover Letter Examples', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "", "description": "مجموعة من خطابات المقدمة الناجحة لمختلف المجالات."}'::jsonb),
('career-resource-cv-templates', 'career', 'resource', 'draft', false, 230, 'المسار المهني', 'قوالب سيرة ذاتية', 'Cv Templates', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "", "description": "موقع يقدم قوالب سيرة ذاتية احترافية ومجانية."}'::jsonb),
('career-resource-edx', 'career', 'resource', 'draft', false, 30, 'المسار المهني', 'إي دي إكس', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://www.edx.org", "description": "منصة تعليمية توفر دورات مجانية ومدفوعة من أفضل الجامعات والمؤسسات حول العالم."}'::jsonb),
('career-resource-github', 'career', 'resource', 'draft', false, 40, 'المسار المهني', 'جيت هب', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://github.com", "description": "منصة أساسية للمبرمجين لبناء معرض أعمالهم ومشاركة الكود والمساهمة في مشاريع مفتوحة المصدر."}'::jsonb),
('career-resource-glassdoor', 'career', 'resource', 'draft', false, 50, 'المسار المهني', 'جلاس دور', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://www.glassdoor.com", "description": "موقع للبحث عن الوظائف ومراجعات الشركات ومقارنة الرواتب والتحضير للمقابلات."}'::jsonb),
('career-resource-harvard-career-services', 'career', 'resource', 'draft', false, 60, 'المسار المهني', 'خدمات التوظيف بجامعة هارفارد', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://careerservices.fas.harvard.edu", "description": "مكتبة غنية بالأدلة والنماذج المجانية لكتابة السير الذاتية وخطابات المقدمة والتحضير للمقابلات."}'::jsonb),
('career-resource-hunter-io', 'career', 'resource', 'draft', false, 70, 'المسار المهني', 'هانتر', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://hunter.io", "description": "أداة مفيدة للعثور على عناوين البريد الإلكتروني للمحترفين ومسؤولي التوظيف للتواصل المباشر."}'::jsonb),
('career-resource-indeed', 'career', 'resource', 'draft', false, 80, 'المسار المهني', 'إنديد', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://www.indeed.com", "description": "واحد من أكبر محركات البحث عن الوظائف في العالم، يوفر أيضاً معلومات حول الرواتب وتقييمات الشركات."}'::jsonb),
('career-resource-interview-query', 'career', 'resource', 'draft', false, 90, 'المسار المهني', 'إنترفيو كويري', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://www.interviewquery.com", "description": "منصة متخصصة للتحضير لمقابلات علوم البيانات والهندسة وتوفر أسئلة حقيقية من مقابلات شركات كبرى."}'::jsonb),
('career-resource-interview-questions', 'career', 'resource', 'draft', false, 240, 'المسار المهني', 'أسئلة المقابلات', 'Interview Questions', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "", "description": "بنك لأسئلة المقابلات الشخصية مع إجابات نموذجية."}'::jsonb),
('career-resource-job-boards', 'career', 'resource', 'draft', false, 250, 'المسار المهني', 'منصات التوظيف', 'Job Boards', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "", "description": "أهم المنصات للبحث عن وظائف في العالم العربي."}'::jsonb),
('career-resource-jobscan', 'career', 'resource', 'draft', false, 100, 'المسار المهني', 'جوب سكان', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://www.jobscan.co", "description": "أداة لمقارنة سيرتك الذاتية مع الوصف الوظيفي وتحديد الكلمات المفتاحية المفقودة لتحسين فرصك."}'::jsonb),
('career-resource-linkedin-guide', 'career', 'resource', 'draft', false, 260, 'المسار المهني', 'دليل لينكد إن', 'Linkedin Guide', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "", "description": "دليل شامل لتحسين ملفك الشخصي على لينكد إن."}'::jsonb),
('career-resource-linkedin-learning', 'career', 'resource', 'draft', false, 110, 'المسار المهني', 'دورات لينكد إن التعليمية', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://www.linkedin.com/learning", "description": "منصة تقدم آلاف الدورات التدريبية في مجالات الأعمال والتكنولوجيا والمهارات الإبداعية والناعمة."}'::jsonb),
('career-resource-meetup', 'career', 'resource', 'draft', false, 120, 'المسار المهني', 'ميت أب', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://www.meetup.com", "description": "منصة للعثور على مجموعات مهنية وتقنية وبناء شبكة علاقات (Networking) في منطقتك."}'::jsonb),
('career-resource-my-interview-practice', 'career', 'resource', 'draft', false, 130, 'المسار المهني', 'ماي إنترفيو براكتس', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://myinterviewpractice.com", "description": "أداة لمحاكاة مقابلات العمل وتسجيل إجاباتك لمراجعتها وتحسين أدائك."}'::jsonb),
('career-resource-novoresume', 'career', 'resource', 'draft', false, 140, 'المسار المهني', 'نوفو ريزومي', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://novoresume.com", "description": "أداة لإنشاء سير ذاتية احترافية تتوافق مع أنظمة تتبع المتقدمين (ATS) بخطوات بسيطة."}'::jsonb),
('career-resource-payscale', 'career', 'resource', 'draft', false, 150, 'المسار المهني', 'باي سكيل', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://www.payscale.com", "description": "موقع رائد لتقديم بيانات دقيقة حول الرواتب والتعويضات بناءً على المسمى الوظيفي والموقع والخبرة."}'::jsonb),
('career-resource-portfolio-builder', 'career', 'resource', 'draft', false, 270, 'المسار المهني', 'منشئ معارض الأعمال', 'Portfolio Builder', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "", "description": "أداة لبناء معرض أعمال رقمي بسهولة."}'::jsonb),
('career-resource-pramp', 'career', 'resource', 'draft', false, 160, 'المسار المهني', 'برامب', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://www.pramp.com", "description": "منصة مجانية لإجراء مقابلات تجريبية (Mock Interviews) مع زملاء في مجالات البرمجة والتصميم وإدارة المنتجات."}'::jsonb),
('career-resource-remote-jobs', 'career', 'resource', 'draft', false, 280, 'المسار المهني', 'وظائف عن بعد', 'Remote Jobs', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "", "description": "منصة متخصصة في الوظائف التي تتيح العمل عن بعد."}'::jsonb),
('career-resource-remote-ok', 'career', 'resource', 'draft', false, 170, 'المسار المهني', 'ريموت أوكيه', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://remoteok.com", "description": "موقع متخصص في عرض الوظائف التي يمكن أداؤها عن بعد بالكامل للمحترفين الرقميين."}'::jsonb),
('career-resource-salary-calculator', 'career', 'resource', 'draft', false, 290, 'المسار المهني', 'حاسبة الرواتب', 'Salary Calculator', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "", "description": "أداة لمعرفة متوسط الرواتب في مجالك."}'::jsonb),
('career-resource-skills-courses', 'career', 'resource', 'draft', false, 300, 'المسار المهني', 'دورات تطوير المهارات', 'Skills Courses', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "", "description": "منصة تعليمية تقدم دورات لتطوير المهارات المطلوبة في سوق العمل."}'::jsonb),
('career-resource-the-muse', 'career', 'resource', 'draft', false, 180, 'المسار المهني', 'ذا ميوز', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://www.themuse.com", "description": "موقع يقدم نصائح مهنية ممتازة، وأدلة للبحث عن عمل، ونظرة من الداخل لثقافة الشركات."}'::jsonb),
('career-resource-upwork', 'career', 'resource', 'draft', false, 190, 'المسار المهني', 'أب وورك', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://www.upwork.com", "description": "منصة عالمية للعمل الحر (Freelance) تربط الشركات بالمستقلين في مختلف المجالات."}'::jsonb),
('career-resource-zety', 'career', 'resource', 'draft', false, 200, 'المسار المهني', 'زيتي', '', ARRAY['المسار المهني', 'resource']::text[], NULL, '{"url": "https://zety.com", "description": "منصة شهيرة لبناء السير الذاتية وخطابات المقدمة مع تقديم نصائح وأمثلة عملية."}'::jsonb);

-- Insert into career_lessons (20 records)
INSERT INTO career_lessons (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('career-lesson-ace-the-interview', 'career', 'lesson', 'draft', false, 10, 'المسار المهني', 'النجاح في المقابلة الشخصية', 'Ace The Interview', ARRAY['المسار المهني', 'lesson']::text[], '# النجاح في المقابلة الشخصية

## مقدمة
استراتيجيات عملية للتحضير والإجابة على أسئلة المقابلات بثقة.

## الشرح
التحضير الجيد هو نصف النجاح. ابحث عن الشركة وتعرف على ثقافتها ومشاريعها. تدرب على الأسئلة الشائعة وحضر إجابات مبنية على تجاربك السابقة باستخدام طريقة STAR.

## مثال
عندما تُسأل ''حدثني عن نفسك''، قدم ملخصاً لخبراتك المهنية وأهدافك المستقبلية بدلاً من سرد تفاصيل حياتك الشخصية.

## تحذير
لا تتحدث بسوء عن أصحاب العمل السابقين، فهذا يعطي انطباعاً سلبياً عنك.

## الخلاصة
الثقة والتحضير الجيد يتركان انطباعاً قوياً لدى الشخص الذي يجري معك المقابلة.', '{}'::jsonb),
('career-lesson-ai-in-job-search', 'career', 'lesson', 'draft', false, 20, 'المسار المهني', 'استخدام الذكاء الاصطناعي في البحث عن وظيفة', 'Ai In Job Search', ARRAY['المسار المهني', 'lesson']::text[], '# استخدام الذكاء الاصطناعي في البحث عن وظيفة

## مقدمة
كيف تستفيد من أدوات الذكاء الاصطناعي بشكل أخلاقي وفعال لتعزيز فرصك.

## الشرح
أدوات الذكاء الاصطناعي يمكن أن تساعدك في صياغة السيرة الذاتية، كتابة خطابات المقدمة، والتدرب على المقابلات. ومع ذلك، يجب عليك دائماً مراجعة المخرجات وتعديلها لتعكس شخصيتك وتجربتك الحقيقية.

## مثال
استخدم الذكاء الاصطناعي لاقتراح هيكلية لخطاب المقدمة، ثم املأ التفاصيل بخبراتك ومشاعرك الصادقة تجاه الوظيفة.

## تحذير
الاعتماد الكلي على الذكاء الاصطناعي دون مراجعة بشرية قد يؤدي إلى نصوص غير دقيقة أو تبدو روبوتية.

## الخلاصة
الذكاء الاصطناعي أداة مساعدة قوية، لكن اللمسة البشرية هي ما يميزك عن بقية المرشحين.', '{}'::jsonb),
('career-lesson-building-proof-of-work', 'career', 'lesson', 'draft', false, 30, 'المسار المهني', 'أهمية بناء إثبات العمل في مسيرتك', 'The Importance of Building Proof of Work', ARRAY[]::text[], '# أهمية بناء إثبات العمل في مسيرتك (Proof of Work)

في الماضي، كانت الشهادات الجامعية هي جواز السفر الوحيد لسوق العمل. اليوم، الشهادات لا تزال مهمة، لكن "إثبات العمل" أصبح العامل الحاسم للتميز في العديد من المجالات، خاصة التقنية والإبداعية.

## ما هو إثبات العمل؟
هو أي دليل ملموس ومتاح للعلن يثبت أنك تمتلك المهارات التي تدعيها في سيرتك الذاتية. هو الانتقال من "أنا أستطيع فعل هذا" إلى "انظروا إلى ما فعلته هنا".

## أمثلة على إثبات العمل
- **المبرمجين:** تطبيقات حية، مساهمات في مشاريع مفتوحة المصدر، أو حساب نشط على GitHub.
- **المصممين:** دراسات حالة (Case Studies) توضح عملية حل المشكلات التصميمية، وليس فقط الصور النهائية.
- **المسوقين والكتّاب:** مدونة نشطة، حملات تسويقية تم إطلاقها ومقاييس نجاحها، أو نمو حسابات على وسائل التواصل الاجتماعي.

## لماذا يفضله أصحاب العمل؟
1. **يقلل المخاطر:** رؤية عملك الفعلي تقلل من مخاطرة توظيف شخص غير كفء.
2. **يظهر الشغف والمبادرة:** إثبات العمل، خاصة المشاريع الجانبية، يدل على أنك شغوف بمجالك لدرجة أنك تمارسه خارج ساعات العمل أو الدراسة.
3. **يبرز مهارات التواصل:** تقديم أعمالك بشكل منظم وواضح يدل على مهاراتك في التواصل والعرض.

ابدأ اليوم: خصص عطلة نهاية أسبوع للعمل على مشروع صغير واستعرضه للعالم. إثبات عمل صغير أفضل من لا شيء!', '{}'::jsonb),
('career-lesson-career-change-strategies', 'career', 'lesson', 'draft', false, 40, 'المسار المهني', 'استراتيجيات للتحول المهني الناجح', 'Strategies for a Successful Career Change', ARRAY['المسار المهني', 'lesson']::text[], '# استراتيجيات للتحول المهني الناجح

التحول المهني قد يكون مخيفاً، لكنه خطوة ضرورية للعديد من المهنيين للوصول إلى الرضا الوظيفي وتحقيق أهدافهم.

## الخطوة 1: تقييم المهارات القابلة للنقل
قبل أن تبدأ بتعلم مهارات جديدة، حدد المهارات التي تملكها بالفعل ويمكن تطبيقها في مجالك الجديد (مثل: التواصل، إدارة المشاريع، حل المشكلات، أو تحليل البيانات).

## الخطوة 2: تحديد الفجوة المعرفية
قارن مهاراتك الحالية بمتطلبات الوظيفة المستهدفة في مجالك الجديد. حدد المهارات التقنية والمعرفية التي تحتاج إلى اكتسابها، وضع خطة دراسية (دورات، شهادات، معسكرات تدريبية).

## الخطوة 3: بناء إثبات عمل في المجال الجديد
بما أنك لا تملك خبرة عمل سابقة في المجال الجديد، يجب أن تبني معرض أعمال من خلال مشاريع شخصية، أو العمل التطوعي، أو العمل الحر (Freelance) لإثبات قدراتك لأصحاب العمل المحتملين.

## الخطوة 4: إعادة صياغة السيرة الذاتية
لا ترسل نفس سيرتك الذاتية القديمة. استخدم الملخص المهني لشرح سبب تحولك المهني، وركز على المهارات القابلة للنقل، وضع قسم "المشاريع" في الأعلى لتعويض نقص الخبرة المهنية.', '{}'::jsonb),
('career-lesson-career-transition', 'career', 'lesson', 'draft', false, 170, 'المسار المهني', 'الانتقال السلس لمسار مهني جديد', 'Career Transition', ARRAY['المسار المهني', 'lesson']::text[], '# الانتقال السلس لمسار مهني جديد

## مقدمة
خطوات عملية لتغيير مسارك المهني بنجاح.

## الشرح
تغيير المسار المهني يتطلب تخطيطاً دقيقاً. ابدأ بتحديد المهارات القابلة للنقل (Transferable Skills) التي تمتلكها بالفعل، ثم حدد المهارات الجديدة التي تحتاج إلى تعلمها. فكر في العمل التطوعي أو المشاريع الجانبية لاكتساب الخبرة.

## مثال
إذا كنت تنتقل من المبيعات إلى التسويق، ركز على مهارتك في الإقناع وفهم احتياجات العملاء كمهارات قابلة للنقل.

## تحذير
لا تتوقع الانتقال إلى مستوى متقدم في المجال الجديد فوراً؛ قد تضطر للبدء من مستوى أقل لاكتساب الخبرة.

## الخلاصة
التعلم المستمر والمرونة هما مفتاح النجاح عند تغيير مسارك المهني.', '{}'::jsonb),
('career-lesson-cover-letters-that-stand-out', 'career', 'lesson', 'draft', false, 50, 'المسار المهني', 'كتابة خطاب مقدمة متميز', 'Writing a Standout Cover Letter', ARRAY[]::text[], '# كتابة خطاب مقدمة متميز

خطاب المقدمة هو فرصتك للتحدث المباشر مع صاحب العمل وشرح "السبب" وراء رغبتك في الانضمام إليهم، وليس فقط إعادة صياغة سيرتك الذاتية.

## الهيكل الأساسي لخطاب المقدمة

1. **الافتتاحية:** اجذب انتباه القارئ فوراً. تجنب العبارات التقليدية وابدأ بحقيقة مثيرة للاهتمام عن شغفك بالمجال أو إنجاز بارز.
2. **الصلب:** اربط بين مهاراتك واحتياجات الشركة. اذكر مثالاً محدداً يوضح كيف قمت بحل مشكلة مشابهة لتلك التي تواجهها الشركة.
3. **الخاتمة:** أعد التأكيد على حماسك واطلب خطوة تالية واضحة (Call to Action)، مثل طلب تحديد موعد لمقابلة.

## نصائح هامة
- قم بتوجيه الخطاب إلى شخص محدد كلما أمكن ذلك بدلاً من "لمن يهمه الأمر".
- حافظ على الإيجاز؛ لا يجب أن يتجاوز الخطاب صفحة واحدة.
- راجع الخطاب لتجنب الأخطاء اللغوية والإملائية التي تعكس عدم الاهتمام.', '{}'::jsonb),
('career-lesson-cv-improvement', 'career', 'lesson', 'draft', false, 60, 'المسار المهني', 'تحسين السيرة الذاتية لنتائج أفضل', 'CV Improvement for Better Results', ARRAY['المسار المهني', 'lesson']::text[], '# تحسين السيرة الذاتية لنتائج أفضل

السيرة الذاتية ليست مجرد سجل تاريخي لماضيك المهني، بل هي أداة تسويقية تهدف إلى إبراز قيمتك المستقبلية للشركة.

## فهم أنظمة تتبع المتقدمين (ATS)
معظم الشركات تعتمد اليوم على أنظمة آلية لفرز السير الذاتية. لتجاوز هذه الأنظمة، يجب أن تحتوي سيرتك الذاتية على:
- كلمات مفتاحية مأخوذة من الوصف الوظيفي.
- تصميم بسيط بدون جداول معقدة أو رسومات تعيق قراءة النصوص.
- عناوين قياسية للأقسام (خبرة العمل، التعليم، المهارات).

## التركيز على الإنجازات، ليس المهام
بدلاً من سرد المهام الروتينية، ركز على التأثير الذي أحدثته. استخدم الأرقام والنسب المئوية لدعم إنجازاتك.
*مثال ضعيف:* مسؤول عن إدارة حسابات وسائل التواصل الاجتماعي.
*مثال قوي:* زيادة التفاعل على وسائل التواصل الاجتماعي بنسبة 40% خلال ستة أشهر من خلال حملات تسويقية مستهدفة.

## تخصيص السيرة الذاتية
لا ترسل سيرة ذاتية واحدة لجميع الوظائف. قم بتعديل الملخص المهني وترتيب المهارات والخبرات بناءً على كل وظيفة تتقدم إليها.', '{}'::jsonb),
('career-lesson-effective-job-search-systems', 'career', 'lesson', 'draft', false, 70, 'المسار المهني', 'أنظمة فعالة للبحث عن عمل', 'Effective Job Search Systems', ARRAY['المسار المهني', 'lesson']::text[], '# أنظمة فعالة للبحث عن عمل

البحث عن عمل هو وظيفة بحد ذاتها، ويتطلب تنظيماً ونهجاً استراتيجياً للحصول على أفضل النتائج.

## استراتيجية البحث المتعدد

لا تعتمد فقط على التقديم المباشر عبر مواقع التوظيف. خصص وقتك كالتالي:
- 40% للتواصل وبناء العلاقات (Networking).
- 30% للتقديم المباشر للوظائف المستهدفة.
- 20% لتطوير المهارات وإنشاء معرض أعمال.
- 10% للتواجد عبر الإنترنت وتحسين الملفات الشخصية.

## استخدام جدول لتتبع التقديمات
تجنب الفوضى من خلال إنشاء جدول (Excel أو Notion) لتتبع كل وظيفة تقدمت لها. يجب أن يشمل:
- اسم الشركة والمسمى الوظيفي.
- رابط الإعلان.
- تاريخ التقديم.
- حالة الطلب (مقدم، مقابلة أولى، مرفوض).
- تاريخ المتابعة المتوقع.

## التواصل المباشر مع صناع القرار
بدلاً من التقديم في صمت، حاول الوصول إلى مدير التوظيف أو أعضاء الفريق عبر لينكد إن لتأكيد اهتمامك بالوظيفة وطرح أسئلة ذكية.', '{}'::jsonb),
('career-lesson-ethical-ai-job-search', 'career', 'lesson', 'draft', false, 80, 'المسار المهني', 'الاستخدام الأخلاقي للذكاء الاصطناعي في البحث عن عمل', 'Ethical Use of AI in Job Searching', ARRAY['المسار المهني', 'lesson']::text[], '# الاستخدام الأخلاقي للذكاء الاصطناعي في التوظيف

أدوات الذكاء الاصطناعي مثل ChatGPT يمكن أن تكون مساعداً قوياً في رحلة البحث عن عمل، ولكن يجب استخدامها بحذر ومسؤولية للحفاظ على مصداقيتك.

## ما يجب أن تفعله
- **تحسين الصياغة:** استخدم الذكاء الاصطناعي لإعادة صياغة نقاط في سيرتك الذاتية لتكون أكثر احترافية وقوة.
- **استخراج الكلمات المفتاحية:** اطلب من الذكاء الاصطناعي تحليل الوصف الوظيفي لاستخراج أهم الكلمات المفتاحية لمساعدتك في تخصيص سيرتك الذاتية.
- **محاكاة المقابلات:** استخدم الأدوات للتدرب على الإجابة على أسئلة المقابلات المحتملة والحصول على ملاحظات.
- **صياغة رسائل التواصل:** استعن به لإنشاء مسودات أولية لرسائل البريد الإلكتروني أو رسائل لينكد إن، ثم قم بتخصيصها.

## ما يجب تجنبه تماماً
- **اختلاق الخبرات:** لا تطلب من الذكاء الاصطناعي اختلاق مشاريع أو خبرات لم تقم بها.
- **النسخ واللصق الأعمى:** لا تقم بنسخ خطابات المقدمة أو الإجابات كما هي. قد تكون النغمة غير طبيعية أو قد يكتشف صاحب العمل استخدامك للأدوات.
- **الاعتماد الكلي:** الذكاء الاصطناعي لا يعرف شخصيتك، قيمك، أو الفروق الدقيقة في خبراتك. اجعل صوتك وإنسانيتك تظهر في كل ما تقدمه.', '{}'::jsonb),
('career-lesson-interview-preparation-guide', 'career', 'lesson', 'draft', false, 90, 'المسار المهني', 'الدليل الشامل للتحضير للمقابلات', 'Comprehensive Interview Preparation Guide', ARRAY['المسار المهني', 'lesson']::text[], '# الدليل الشامل للتحضير للمقابلات

التحضير الجيد هو المفتاح للتغلب على توتر المقابلات وإظهار ثقتك وكفاءتك.

## قبل المقابلة: البحث المكثف
- **دراسة الشركة:** تعرف على منتجاتهم، منافسيهم، ثقافتهم، وأحدث أخبارهم.
- **فهم الوظيفة:** اقرأ الوصف الوظيفي بتعمق وحدد المهارات الرئيسية المطلوبة لربطها بخبراتك.
- **التدريب على الأسئلة الشائعة:** حضر إجابات واضحة ومختصرة لأسئلة مثل "حدثني عن نفسك" و"لماذا تريد العمل هنا؟".

## أثناء المقابلة: الثقة والتواصل
- حافظ على تواصل بصري جيد ولغة جسد منفتحة.
- استمع جيداً للسؤال ولا تتردد في طلب توضيح إذا لم يكن مفهوماً.
- استخدم طريقة STAR (الموقف، المهمة، الإجراء، النتيجة) للإجابة على الأسئلة السلوكية.

## طرح أسئلة ذكية
في نهاية المقابلة، عندما يُسأل عما إذا كان لديك أسئلة، يجب أن تكون مستعداً. اسأل عن:
- تحديات الفريق الحالية.
- كيف يتم قياس النجاح في هذا الدور.
- الخطوات التالية في عملية التوظيف.', '{}'::jsonb),
('career-lesson-linkedin-mastery', 'career', 'lesson', 'draft', false, 180, 'المسار المهني', 'احتراف استخدام لينكد إن', 'Linkedin Mastery', ARRAY['المسار المهني', 'lesson']::text[], '# احتراف استخدام لينكد إن

## مقدمة
كيف تجعل ملفك الشخصي على لينكد إن مغناطيساً للفرص الوظيفية.

## الشرح
لينكد إن ليس مجرد سيرة ذاتية إلكترونية، بل هو منصة للتفاعل وبناء العلاقات. اهتم بالصورة الشخصية، العنوان المهني (Headline)، والملخص (Summary). قم بالتفاعل مع المحتوى في مجالك لتظهر كخبير.

## مثال
عنوان مهني جيد: ''مطور برمجيات | مهتم بتطبيقات الذكاء الاصطناعي | باحث عن تحديات جديدة''.

## تحذير
لا تستخدم لينكد إن كمنصة اجتماعية شخصية؛ حافظ على المهنية في كل ما تنشره وتتفاعل معه.

## الخلاصة
النشاط المستمر وبناء شبكة علاقات قوية هما مفتاح النجاح على منصة لينكد إن.', '{}'::jsonb),
('career-lesson-linkedin-profile-optimization', 'career', 'lesson', 'draft', false, 100, 'المسار المهني', 'بناء ملف شخصي احترافي على لينكد إن', 'Building a Professional LinkedIn Profile', ARRAY['المسار المهني', 'lesson']::text[], '# بناء ملف شخصي احترافي على لينكد إن

لينكد إن هو واجهتك الرقمية الأولى وأهم شبكة مهنية. الملف الشخصي القوي لا يجذب فقط أصحاب العمل بل يفتح لك أبواباً لفرص وتواصل غير متوقع.

## عناصر الملف الشخصي الناجح

### الصورة والخلفية
استخدم صورة شخصية احترافية، بخلفية بسيطة وملابس مناسبة لمجالك. أضف صورة خلفية (Cover Photo) تعبر عن هويتك المهنية.

### العنوان (Headline)
لا تجعله مجرد مسماك الوظيفي الحالي. استخدمه لإبراز قيمتك وتخصصك. (مثال: "مطور واجهات أمامية | متخصص في React وتجربة المستخدم | أساعد الشركات في بناء منتجات سريعة").

### الملخص (About)
اكتب قصتك بضمير المتكلم (أنا). شارك شغفك، إنجازاتك الرئيسية، وما تتطلع إليه في المستقبل. استخدم كلمات مفتاحية لتسهيل العثور عليك في محركات البحث.

### التوصيات (Recommendations)
اطلب توصيات من الزملاء أو المدراء السابقين، واحرص على تقديم توصيات للآخرين بالمقابل.', '{}'::jsonb),
('career-lesson-mastering-star-stories', 'career', 'lesson', 'draft', false, 110, 'المسار المهني', 'إتقان قصص طريقة ستار (STAR)', 'Mastering STAR Stories', ARRAY[]::text[], '# إتقان قصص طريقة ستار (STAR)

طريقة STAR هي الهيكل الأمثل للإجابة على أسئلة المقابلات السلوكية التي تبدأ عادة بـ "حدثني عن وقت..." أو "أعطني مثالاً على...".

## مكونات طريقة STAR

### S: Situation (الموقف)
حدد السياق والوقت والمكان. يجب أن يكون الموقف محدداً وليس عاماً.
*مثال:* "في وظيفتي السابقة، واجهنا مشكلة تأخير تسليم مشروع رئيسي بسبب نقص في الفريق."

### T: Task (المهمة)
اشرح دورك والمسؤولية الملقاة على عاتقك في ذلك الموقف.
*مثال:* "كانت مهمتي بصفتي مدير المشروع هي إيجاد طريقة لتسليم المشروع في الموعد المحدد دون التأثير على الجودة."

### A: Action (الإجراء)
هذا هو الجزء الأهم. ركز على ما فعلته *أنت* (استخدم "أنا" وليس "نحن"). اشرح الخطوات التي اتخذتها لحل المشكلة.
*مثال:* "قمت بإعادة توزيع المهام بناءً على نقاط قوة الفريق المتبقي، وعقدت اجتماعات يومية قصيرة لمتابعة التقدم وتذليل العقبات."

### R: Result (النتيجة)
شارك النتيجة الإيجابية التي حققتها، واستخدم الأرقام إن أمكن لتوضيح التأثير.
*مثال:* "تمكنا من تسليم المشروع قبل يومين من الموعد النهائي، وحصلنا على إشادة من العميل."

## بناء مكتبة قصصك
قم بتجهيز 5-7 قصص تغطي مواضيع مختلفة: القيادة، حل النزاعات، العمل تحت الضغط، والتعلم من الفشل. يمكن تكييف هذه القصص للإجابة على العديد من الأسئلة المختلفة.', '{}'::jsonb),
('career-lesson-networking-messaging', 'career', 'lesson', 'draft', false, 120, 'المسار المهني', 'فن كتابة رسائل التواصل المهني', 'The Art of Networking Messaging', ARRAY['المسار المهني', 'lesson']::text[], '# فن كتابة رسائل التواصل المهني

الوصول البارد (Cold Outreach) عبر لينكد إن أو البريد الإلكتروني يمكن أن يفتح أبواباً للفرص إذا تم بطريقة صحيحة واحترافية.

## قواعد الرسالة الناجحة

### 1. ابحث قبل أن تكتب
الرسائل العامة (Spam) غالباً ما تُتجاهل. اقرأ ملف الشخص الذي تتواصل معه واذكر شيئاً محدداً لفت انتباهك في الرسالة لإظهار أنك مهتم حقاً.

### 2. كن موجزاً ومباشراً
المهنيون مشغولون. ابدأ بتعريف قصير عن نفسك، واذكر سبب تواصلك بوضوح في الجملة الثانية، ولا تتجاوز الرسالة 3-4 فقرات قصيرة.

### 3. قدم قيمة قبل الطلب
إذا كان ممكناً، شارك مقالاً مثيراً للاهتمام في مجالهم، أو هنئهم على إنجاز حديث قبل أن تطلب المساعدة.

### 4. حدد طلباً بسيطاً (Call to Action)
لا تطلب وظيفة في رسالتك الأولى! اطلب شيئاً يسيراً مثل مكالمة قصيرة لمدة 15 دقيقة لطلب نصيحة، أو مجرد التواصل لتبادل الخبرات.

## مثال على رسالة تواصل
"مرحباً [الاسم]، لقد تابعت عملك في شركة [اسم الشركة] وأعجبت جداً بمقالك الأخير عن [الموضوع]. أنا مطور ويب في بداية مسيرتي وأتطلع للعمل في نفس مجالك. هل تمانع في إجراء مكالمة قصيرة لمدة 15 دقيقة الأسبوع القادم لمشاركتي بعض النصائح حول مسارك المهني؟ أقدر وقتك مسبقاً."', '{}'::jsonb),
('career-lesson-perfect-cv', 'career', 'lesson', 'draft', false, 190, 'المسار المهني', 'كتابة السيرة الذاتية المثالية', 'Perfect Cv', ARRAY['المسار المهني', 'lesson']::text[], '# كتابة السيرة الذاتية المثالية

## مقدمة
تعلم كيف تكتب سيرة ذاتية تبرز مهاراتك وتجذب انتباه أصحاب العمل.

## الشرح
السيرة الذاتية هي بوابتك الأولى للحصول على الوظيفة. يجب أن تكون واضحة، مختصرة، وتركز على إنجازاتك الحقيقية. استخدم الكلمات المفتاحية الموجودة في الوصف الوظيفي لزيادة فرص تجاوز أنظمة التتبع (ATS).

## مثال
بدلاً من كتابة ''مسؤول عن المبيعات''، اكتب ''زيادة المبيعات بنسبة 20% خلال 6 أشهر من خلال استراتيجيات تسويق جديدة''.

## تحذير
تجنب الأخطاء الإملائية والنحوية، ولا تبالغ في مهاراتك أو تكتب معلومات غير صحيحة.

## الخلاصة
السيرة الذاتية القوية هي مزيج من التصميم النظيف والمحتوى الدقيق الذي يبرز قيمتك كمرشح.', '{}'::jsonb),
('career-lesson-portfolio-evidence', 'career', 'lesson', 'draft', false, 130, 'المسار المهني', 'بناء معرض أعمال كدليل إثبات', 'Building Portfolio Evidence', ARRAY[]::text[], '# بناء معرض أعمال كدليل إثبات (Proof of Work)

في سوق العمل التنافسي اليوم، السيرة الذاتية لا تكفي وحدها. أصحاب العمل يريدون أن "يروا" قدراتك بدلاً من مجرد القراءة عنها.

## أهمية إثبات العمل
إثبات العمل يقلل من المخاطرة بالنسبة لصاحب العمل. عندما يرون مشاريع حقيقية قمت بإنجازها، يسهل عليهم تخيل قدرتك على حل مشاكلهم المماثلة.

## ماذا يجب أن يتضمن معرض الأعمال؟
1. **مشاريع واقعية:** لا تكتفِ بالمشاريع الأكاديمية البسيطة. قم بحل مشاكل حقيقية، أو إعادة تصميم مواقع موجودة، أو تحليل بيانات مفتوحة المصدر.
2. **شرح العملية (Case Studies):** العمل النهائي ليس كافياً. اشرح عملية التفكير، التحديات التي واجهتها، وكيف تغلبت عليها.
3. **الكود أو التصميم المصدري:** إذا كان ذلك متاحاً، شارك رابطاً لـ GitHub للبرمجيات، أو ملفات Figma للتصميم.

## أين تستضيف معرض أعمالك؟
- **للمبرمجين:** GitHub هو المنصة الأساسية. تأكد من كتابة ملفات README واضحة لمشاريعك.
- **للمصممين والمبدعين:** Behance، Dribbble، أو موقع شخصي مبني باستخدام Notion أو Webflow.
- **للكتّاب والمسوقين:** مدونة شخصية، مقالات على Medium، أو LinkedIn Articles.', '{}'::jsonb),
('career-lesson-remote-work-readiness', 'career', 'lesson', 'draft', false, 140, 'المسار المهني', 'الاستعداد والنجاح في العمل عن بعد', 'Readiness and Success in Remote Work', ARRAY['المسار المهني', 'lesson']::text[], '# الاستعداد والنجاح في العمل عن بعد

العمل عن بعد يتطلب مجموعة مختلفة من المهارات عن العمل المكتبي التقليدي، بدءاً من الانضباط الذاتي وحتى التواصل غير المتزامن.

## المهارات الأساسية للعمل عن بعد
1. **التواصل الاستباقي:** في بيئة العمل عن بعد، لا يوجد من يراك تعمل. يجب أن تبادر بتحديث فريقك بتقدمك، وتطرح الأسئلة بوضوح لتجنب سوء الفهم المكتوب.
2. **إدارة الوقت الذاتية:** القدرة على تحديد الأولويات وإدارة جدولك الزمني دون رقابة مستمرة، والالتزام بالمواعيد النهائية.
3. **الكفاءة التقنية:** الإلمام بأدوات التواصل (Slack, Zoom)، وأدوات إدارة المشاريع (Trello, Jira)، والقدرة على حل المشكلات التقنية الأساسية بشكل مستقل.

## إثبات جاهزيتك للعمل عن بعد في سيرتك الذاتية
عند التقدم لوظيفة عن بعد، أبرز قدراتك من خلال:
- الإشارة بوضوح إلى أي تجارب سابقة في العمل أو التعلم عن بعد أو العمل مع فرق موزعة جغرافياً.
- التركيز على إنجازاتك وكيف تمكنت من تسليم المشاريع بشكل مستقل.

## الحفاظ على التوازن بين العمل والحياة
الحدود بين العمل والحياة الشخصية قد تتلاشى عند العمل من المنزل. خصص مساحة عمل محددة، وضع أوقات بداية ونهاية واضحة ليوم عملك لتجنب الاحتراق الوظيفي (Burnout).', '{}'::jsonb),
('career-lesson-salary-negotiation-basics', 'career', 'lesson', 'draft', false, 150, 'المسار المهني', 'أساسيات التفاوض على الراتب بثقة', 'Basics of Confident Salary Negotiation', ARRAY['المسار المهني', 'lesson']::text[], '# أساسيات التفاوض على الراتب بثقة

العديد من المهنيين يتجنبون التفاوض على الراتب خوفاً من فقدان العرض الوظيفي، لكن التفاوض هو جزء طبيعي ومتوقع من عملية التوظيف.

## قبل التفاوض: البحث والتسعير
لا تدخل أي تفاوض دون معرفة القيمة السوقية لمهاراتك.
- استخدم مواقع مثل Glassdoor و Payscale لجمع البيانات.
- اسأل زملاء في نفس المجال والمدينة.
- حدد النطاق المالي المقبول بالنسبة لك، واعرف "نقطة الانسحاب" (أقل راتب يمكنك قبوله).

## استراتيجيات التفاوض الفعالة

1. **لا تكن أول من يعطي رقماً:** حاول قدر الإمكان معرفة ميزانية الشركة للوظيفة قبل تحديد راتبك المتوقع. إذا اضطررت للإجابة، قدم نطاقاً مالياً (مثلاً: بين X و Y) بدلاً من رقم ثابت.
2. **ركز على القيمة:** عندما تطلب راتباً أعلى، ادعم طلبك بأدلة حول ما ستقدمه للشركة من قيمة، بناءً على خبراتك ومهاراتك المتخصصة.
3. **التفاوض على أكثر من الراتب:** إذا كانت الشركة غير قادرة على زيادة الراتب الأساسي، تفاوض على المزايا الأخرى مثل: أيام إجازة إضافية، مرونة في ساعات العمل، العمل عن بعد، أو ميزانية للتدريب والتطوير.

## الحفاظ على الاحترافية
تذكر أنك تتفاوض مع مديرك أو زملائك المستقبليين. يجب أن يكون التفاوض ودياً وتعاونياً وليس مواجهة أو معركة لتسجيل النقاط.', '{}'::jsonb),
('career-lesson-skill-gap-planning', 'career', 'lesson', 'draft', false, 160, 'المسار المهني', 'التخطيط لسد الفجوة في المهارات', 'Skill Gap Planning', ARRAY['المسار المهني', 'lesson']::text[], '# التخطيط لسد الفجوة في المهارات

لتحقيق التطور المهني المستمر والوصول إلى أهدافك، يجب أن تكون قادراً على تحديد المهارات التي تنقصك ووضع خطة لاكتسابها.

## كيف تحدد الفجوة في مهاراتك؟
1. **تحليل إعلانات الوظائف:** ابحث عن 10 إعلانات للوظيفة التي تطمح إليها. استخرج المهارات والبرامج والأدوات المشتركة التي تُطلب باستمرار والتي لا تتقنها حالياً.
2. **طلب التقييم (Feedback):** تحدث مع مديرك المباشر أو زملائك واطلب تقييماً صادقاً عن المهارات التي تحتاج إلى تطويرها للارتقاء في عملك.
3. **المقابلات الاستكشافية:** تواصل مع أشخاص يشغلون المناصب التي تطمح إليها واسألهم عن أهم المهارات التي ساعدتهم على النجاح.

## بناء خطة التعلم
بعد تحديد الفجوة، ضع خطة تعلم (SMART Plan):
- **محددة:** "سأتعلم لغة بايثون لتحليل البيانات."
- **قابلة للقياس:** "سأكمل دورة متقدمة وأقوم بتنفيذ مشروعين عمليين."
- **قابلة للتحقيق:** تأكد من أن الخطة تناسب جدولك الزمني ولا تسبب لك الإرهاق.
- **ذات صلة:** المهارة ستساعدك مباشرة في الترقية أو الانتقال الوظيفي.
- **محددة بوقت:** "سأحقق هذا الهدف خلال 3 أشهر."

## التطبيق العملي
التعلم النظري لا يكفي. احرص على تطبيق كل ما تتعلمه في مشاريع عملية أو في بيئة عملك الحالية لترسيخ المعرفة وتحويلها إلى مهارة حقيقية.', '{}'::jsonb),
('career-lesson-star-method-guide', 'career', 'lesson', 'draft', false, 200, 'المسار المهني', 'الدليل الشامل لطريقة STAR', 'Star Method Guide', ARRAY['المسار المهني', 'lesson']::text[], '# الدليل الشامل لطريقة STAR

## مقدمة
كيف تجيب على الأسئلة السلوكية بشكل منظم ومقنع.

## الشرح
طريقة STAR تتكون من أربعة أجزاء: الموقف (Situation)، المهمة (Task)، الإجراء (Action)، والنتيجة (Result). هذه الهيكلية تساعدك على سرد قصص نجاحك المهني بشكل واضح ومحدد.

## مثال
الموقف: واجهنا تأخيراً في تسليم المشروع. المهمة: كان علي تسريع العمل. الإجراء: قمت بإعادة توزيع المهام وتنظيم وقت الفريق. النتيجة: تم تسليم المشروع في الموعد المحدد.

## تحذير
لا تطل في شرح الموقف وركز أكثر على الإجراءات التي اتخذتها أنت والنتائج التي حققتها.

## الخلاصة
طريقة STAR هي الأداة الأقوى لإثبات مهاراتك من خلال أمثلة واقعية.', '{}'::jsonb);

-- Insert into digital_exams_glossary (50 records)
INSERT INTO digital_exams_glossary (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('digital-exams-glossary-adaptive-generation', 'digital-exams', 'glossary', 'draft', false, 10, 'الاختبارات الرقمية', 'التوليد التكيفي', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "استخدام أدوات الذكاء الاصطناعي لتوليد أسئلة تتكيف مع مستوى الطالب وتركز على نقاط ضعفه.", "example": "الطلب من المعلم الذكي توليد 5 أسئلة صعبة في موضوع الكسور بعد اجتياز الأسئلة السهلة."}'::jsonb),
('digital-exams-glossary-certainty-assessment', 'digital-exams', 'glossary', 'draft', false, 20, 'الاختبارات الرقمية', 'تقييم اليقين', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "تحديد مستوى التأكد من الإجابة أثناء الحل لتسهيل قرار المراجعة لاحقاً.", "example": "وضع علامة نجمة بجوار الأسئلة التي تعتمد فيها على التخمين لتعود لها إن تبقى وقت."}'::jsonb),
('digital-exams-glossary-cognitive-reframing', 'digital-exams', 'glossary', 'draft', false, 30, 'الاختبارات الرقمية', 'إعادة التأطير المعرفي', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "تغيير النظرة السلبية للاختبار أو السؤال إلى تحدٍ إيجابي يمكن تجاوزه.", "example": "بدلاً من التفكير ''لن أستطيع حل هذا''، التفكير في ''سأستخدم استراتيجية الاستبعاد لأصل لأفضل خيار''."}'::jsonb),
('digital-exams-glossary-confidence-calibration', 'digital-exams', 'glossary', 'draft', false, 40, 'الاختبارات الرقمية', 'معايرة الثقة', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "القدرة على التقييم الدقيق لمدى صحة الإجابة التي تم اختيارها، وتجنب الثقة المفرطة أو الشك الزائد.", "example": "إعطاء نسبة مئوية لثقتك في الإجابة، ومراجعة الأسئلة التي تقل نسبة ثقتك فيها عن 70%."}'::jsonb),
('digital-exams-glossary-deep-breathing', 'digital-exams', 'glossary', 'draft', false, 50, 'الاختبارات الرقمية', 'التنفس العميق', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "تقنية استرخاء للسيطرة على التوتر أثناء الاختبار من خلال تنظيم الشهيق والزفير.", "example": "أخذ شهيق لمدة 4 ثوان، حبسه لثانيتين، ثم زفير لمدة 6 ثوان عند الشعور بالتوتر أثناء سؤال صعب."}'::jsonb),
('digital-exams-glossary-distractors', 'digital-exams', 'glossary', 'draft', false, 60, 'الاختبارات الرقمية', 'المشتتات', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "خيارات إجابة مصممة لتكون جذابة أو تبدو صحيحة للإيقاع بالطالب الذي لم يفهم المفهوم بشكل كامل.", "example": "خيار يحتوي على رقم صحيح لكن بوحدة قياس خاطئة."}'::jsonb),
('digital-exams-glossary-double-checking', 'digital-exams', 'glossary', 'draft', false, 70, 'الاختبارات الرقمية', 'المراجعة المزدوجة', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "التحقق من الإجابة مرة أخرى بطريقة مختلفة للتأكد من عدم وجود أخطاء حسابية أو منطقية.", "example": "حل المعادلة الرياضية ثم التعويض بالناتج في المعادلة الأصلية للتأكد من صحتها."}'::jsonb),
('digital-exams-glossary-educated-guess', 'digital-exams', 'glossary', 'draft', false, 80, 'الاختبارات الرقمية', 'التخمين المدروس', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "استنتاج الإجابة الأقرب للصحة بناءً على المعرفة السابقة أو السياق بدلاً من الاختيار العشوائي.", "example": "استخدام الجذور اللغوية للكلمات في الخيارات لتخمين المعنى الأقرب للسياق."}'::jsonb),
('digital-exams-glossary-elimination-strategy', 'digital-exams', 'glossary', 'draft', false, 90, 'الاختبارات الرقمية', 'استراتيجية الاستبعاد', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "تقنية لحل أسئلة الاختيار من متعدد تعتمد على حذف الخيارات الخاطئة بشكل مؤكد لزيادة احتمالية اختيار الإجابة الصحيحة.", "example": "عندما تواجه سؤالاً لا تعرف إجابته المباشرة، ابدأ باستبعاد الخيارين اللذين يبدوان غير منطقيين."}'::jsonb),
('digital-exams-glossary-environmental-readiness', 'digital-exams', 'glossary', 'draft', false, 100, 'الاختبارات الرقمية', 'التهيئة المكانية', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "إعداد بيئة هادئة ومناسبة لتقديم الاختبار وتجنب المشتتات المادية.", "example": "إغلاق باب الغرفة وإبعاد الهاتف المحمول والتأكد من إضاءة المكان قبل بدء المراقبة الإلكترونية."}'::jsonb),
('digital-exams-glossary-exam-simulation', 'digital-exams', 'glossary', 'draft', false, 110, 'الاختبارات الرقمية', 'محاكاة الاختبار', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "تطبيق نفس الظروف النفسية والجسدية والزمنية للاختبار الفعلي أثناء التدريب.", "example": "الجلوس على مكتب مشابه لمكتب الاختبار وارتداء ملابس مريحة والالتزام بفترات الراحة الرسمية."}'::jsonb),
('digital-exams-glossary-gap-analysis', 'digital-exams', 'glossary', 'draft', false, 120, 'الاختبارات الرقمية', 'تحليل الفجوات', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "تحديد المواضيع الدقيقة التي سببت فقدان الدرجات للتركيز عليها في المراجعة القادمة.", "example": "اكتشاف أن 80% من الأخطاء تركزت في موضوع الاحتمالات."}'::jsonb),
('digital-exams-glossary-instant-feedback', 'digital-exams', 'glossary', 'draft', false, 130, 'الاختبارات الرقمية', 'التغذية الراجعة الفورية', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "الحصول على تصحيح وشرح للإجابات مباشرة بعد الحل لفهم الأخطاء في وقتها.", "example": "قراءة شرح الذكاء الاصطناعي لسبب كون الخيار المختار خاطئاً وتصحيح المفهوم فوراً."}'::jsonb),
('digital-exams-glossary-interleaving', 'digital-exams', 'glossary', 'draft', false, 140, 'الاختبارات الرقمية', 'التشابك المعرفي', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "استراتيجية تعليمية تتضمن دمج مواضيع أو أنواع مختلفة من المسائل في جلسة دراسية واحدة لتحسين التمييز بينها.", "example": "بدل حل 50 مسألة على نفس القاعدة، يتم حل مسائل تتطلب اختيار القاعدة المناسبة من بين عدة قواعد."}'::jsonb),
('digital-exams-glossary-item-01', 'digital-exams', 'glossary', 'draft', false, 310, 'الاختبارات الرقمية', 'إدارة الوقت', 'Item 01', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "توزيع الوقت المتاح على أسئلة الاختبار بشكل استراتيجي.", "example": "مثال: تخصيص دقيقة واحدة لكل سؤال اختيار من متعدد."}'::jsonb),
('digital-exams-glossary-item-02', 'digital-exams', 'glossary', 'draft', false, 320, 'الاختبارات الرقمية', 'استبعاد المشتتات', 'Item 02', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "تقنية تعتمد على استبعاد الإجابات الخاطئة بوضوح لزيادة فرصة اختيار الإجابة الصحيحة.", "example": "مثال: استبعاد خيارين من أصل أربعة يرفع نسبة النجاح إلى 50%."}'::jsonb),
('digital-exams-glossary-item-03', 'digital-exams', 'glossary', 'draft', false, 330, 'الاختبارات الرقمية', 'المراجعة السريعة', 'Item 03', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "إلقاء نظرة سريعة على جميع الأسئلة قبل البدء في الحل لمعرفة مستوى الصعوبة.", "example": "مثال: تصفح الاختبار لمدة 5 دقائق قبل البدء بالحل."}'::jsonb),
('digital-exams-glossary-item-04', 'digital-exams', 'glossary', 'draft', false, 340, 'الاختبارات الرقمية', 'قلق الاختبار', 'Item 04', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "حالة نفسية تصيب الطالب قبل أو أثناء الاختبار وتؤثر على تركيزه.", "example": "مثال: الشعور بتسارع نبضات القلب عند قراءة سؤال صعب."}'::jsonb),
('digital-exams-glossary-item-05', 'digital-exams', 'glossary', 'draft', false, 350, 'الاختبارات الرقمية', 'الكلمات المفتاحية', 'Item 05', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "الكلمات الأساسية في السؤال التي تحدد المطلوب بدقة.", "example": "مثال: الانتباه لكلمات مثل (ليس، دائماً، باستثناء)."}'::jsonb),
('digital-exams-glossary-item-06', 'digital-exams', 'glossary', 'draft', false, 360, 'الاختبارات الرقمية', 'الاختبار التجريبي', 'Item 06', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "نموذج مشابه للاختبار الحقيقي يستخدم للتدريب وقياس المستوى.", "example": "مثال: حل اختبار تجريبي لشهادة PMP قبل الاختبار الفعلي."}'::jsonb),
('digital-exams-glossary-item-07', 'digital-exams', 'glossary', 'draft', false, 370, 'الاختبارات الرقمية', 'التخمين المدروس', 'Item 07', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "اختيار إجابة بناءً على المنطق والمعلومات السابقة عند عدم التأكد من الإجابة الصحيحة.", "example": "مثال: اختيار إجابة تبدو منطقية أكثر من غيرها بعد استبعاد المشتتات."}'::jsonb),
('digital-exams-glossary-item-08', 'digital-exams', 'glossary', 'draft', false, 380, 'الاختبارات الرقمية', 'المحاكاة', 'Item 08', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "تهيئة بيئة مشابهة لبيئة الاختبار الحقيقي أثناء التدريب.", "example": "مثال: الجلوس في غرفة هادئة وحل الاختبار بدون مقاطعة."}'::jsonb),
('digital-exams-glossary-item-09', 'digital-exams', 'glossary', 'draft', false, 390, 'الاختبارات الرقمية', 'التغذية الراجعة', 'Item 09', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "معرفة الأخطاء بعد الاختبار التجريبي وتصحيحها.", "example": "مثال: مراجعة الأسئلة الخاطئة ومعرفة سبب الخطأ."}'::jsonb),
('digital-exams-glossary-item-10', 'digital-exams', 'glossary', 'draft', false, 400, 'الاختبارات الرقمية', 'الأسئلة المقالية', 'Item 10', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "أسئلة تتطلب كتابة إجابة مفصلة وتعتمد على الفهم والتعبير.", "example": "مثال: اشرح أسباب الحرب العالمية الأولى."}'::jsonb),
('digital-exams-glossary-item-11', 'digital-exams', 'glossary', 'draft', false, 410, 'الاختبارات الرقمية', 'اختيار من متعدد', 'Item 11', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "سؤال يتطلب اختيار الإجابة الصحيحة من بين عدة خيارات.", "example": "مثال: ما هي عاصمة فرنسا؟ أ) لندن ب) باريس ج) روما."}'::jsonb),
('digital-exams-glossary-item-12', 'digital-exams', 'glossary', 'draft', false, 420, 'الاختبارات الرقمية', 'الصواب والخطأ', 'Item 12', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "سؤال يتطلب تحديد ما إذا كانت العبارة صحيحة أم خاطئة.", "example": "مثال: الأرض مسطحة. (خطأ)."}'::jsonb),
('digital-exams-glossary-item-13', 'digital-exams', 'glossary', 'draft', false, 430, 'الاختبارات الرقمية', 'تخطي الأسئلة', 'Item 13', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "ترك السؤال الصعب والعودة إليه لاحقاً لتوفير الوقت.", "example": "مثال: إذا استغرق السؤال أكثر من دقيقتين، تخطاه وعد إليه في النهاية."}'::jsonb),
('digital-exams-glossary-item-14', 'digital-exams', 'glossary', 'draft', false, 440, 'الاختبارات الرقمية', 'التنفس العميق', 'Item 14', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "تقنية استرخاء تساعد في تقليل التوتر أثناء الاختبار.", "example": "مثال: أخذ نفس عميق والعد إلى خمسة قبل الإجابة على سؤال صعب."}'::jsonb),
('digital-exams-glossary-item-15', 'digital-exams', 'glossary', 'draft', false, 450, 'الاختبارات الرقمية', 'الاستعداد المسبق', 'Item 15', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "المذاكرة والتحضير الجيد قبل الاختبار بفترة كافية.", "example": "مثال: وضع جدول زمني للمذاكرة قبل الاختبار بشهر."}'::jsonb),
('digital-exams-glossary-item-16', 'digital-exams', 'glossary', 'draft', false, 460, 'الاختبارات الرقمية', 'تظليل الإجابات', 'Item 16', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "تعبئة الدائرة المخصصة للإجابة الصحيحة في ورقة الإجابة بشكل كامل.", "example": "مثال: استخدام قلم رصاص من نوع HB لتظليل الدائرة."}'::jsonb),
('digital-exams-glossary-item-17', 'digital-exams', 'glossary', 'draft', false, 470, 'الاختبارات الرقمية', 'مراجعة الإجابات', 'Item 17', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "التأكد من صحة الإجابات قبل تسليم ورقة الاختبار.", "example": "مثال: تخصيص آخر 10 دقائق من وقت الاختبار لمراجعة الإجابات."}'::jsonb),
('digital-exams-glossary-item-18', 'digital-exams', 'glossary', 'draft', false, 480, 'الاختبارات الرقمية', 'المشتتات', 'Item 18', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "الخيارات الخاطئة في أسئلة الاختيار من متعدد والتي تبدو صحيحة.", "example": "مثال: وضع إجابة قريبة جداً من الإجابة الصحيحة لتشتيت الطالب."}'::jsonb),
('digital-exams-glossary-item-19', 'digital-exams', 'glossary', 'draft', false, 490, 'الاختبارات الرقمية', 'الأسئلة المركبة', 'Item 19', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "أسئلة تتكون من عدة أجزاء وتتطلب فهماً عميقاً للموضوع.", "example": "مثال: اقرأ النص التالي ثم أجب عن الأسئلة الخمسة المتعلقة به."}'::jsonb),
('digital-exams-glossary-item-20', 'digital-exams', 'glossary', 'draft', false, 500, 'الاختبارات الرقمية', 'التركيز', 'Item 20', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "توجيه الانتباه بالكامل نحو الاختبار وتجاهل المشتتات الخارجية.", "example": "مثال: عدم الالتفات للأصوات في قاعة الاختبار."}'::jsonb),
('digital-exams-glossary-keywords', 'digital-exams', 'glossary', 'draft', false, 150, 'الاختبارات الرقمية', 'الكلمات المفتاحية', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "المصطلحات أو الكلمات الأساسية في السؤال التي تحدد المطلوب بدقة وتوجه نحو الإجابة الصحيحة.", "example": "التركيز على كلمة ''أقصى'' أو ''أدنى'' في مسائل القيم العظمى والصغرى."}'::jsonb),
('digital-exams-glossary-last-days-plan', 'digital-exams', 'glossary', 'draft', false, 160, 'الاختبارات الرقمية', 'خطة الأيام الأخيرة', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "جدول مراجعة مكثف للأيام التي تسبق الاختبار يركز على الملخصات وسجل الأخطاء فقط.", "example": "الامتناع عن دراسة مواضيع جديدة قبل الاختبار بيومين والتركيز على مراجعة القوانين الأساسية."}'::jsonb),
('digital-exams-glossary-learning-from-slips', 'digital-exams', 'glossary', 'draft', false, 170, 'الاختبارات الرقمية', 'التعلم من الزلات', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "تحويل الأخطاء غير المقصودة إلى دروس من خلال وضع استراتيجيات لتجنب تكرارها.", "example": "اعتياد وضع دائرة حول الكلمات المفتاحية لتجنب زلة تخطيها."}'::jsonb),
('digital-exams-glossary-mistake-log', 'digital-exams', 'glossary', 'draft', false, 180, 'الاختبارات الرقمية', 'سجل الأخطاء', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "دفتر أو ملف لتدوين الأخطاء التي تم ارتكابها في الاختبارات التجريبية مع تحليل سبب الخطأ والإجابة الصحيحة.", "example": "كتابة السؤال الذي أخطأت فيه، وتوضيح أن السبب كان ''عدم قراءة أداة النفي''."}'::jsonb),
('digital-exams-glossary-mock-exams', 'digital-exams', 'glossary', 'draft', false, 190, 'الاختبارات الرقمية', 'الاختبارات التجريبية', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "نماذج امتحانية كاملة يتم حلها في ظروف مشابهة للاختبار الحقيقي لرفع الجاهزية.", "example": "أداء اختبار تجريبي كامل يوم الجمعة مع ضبط مؤقت زمني وعدم استخدام أي مصادر مساعدة."}'::jsonb),
('digital-exams-glossary-negative-tools', 'digital-exams', 'glossary', 'draft', false, 200, 'الاختبارات الرقمية', 'أدوات النفي والاستثناء', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "الكلمات التي تعكس معنى السؤال ويغفل عنها الطلاب غالباً وتؤدي لإجابات خاطئة.", "example": "الانتباه لكلمات مثل: ''ليس''، ''ما عدا''، ''باستثناء'' التي تغير المطلوب تماماً."}'::jsonb),
('digital-exams-glossary-performance-dashboard', 'digital-exams', 'glossary', 'draft', false, 210, 'الاختبارات الرقمية', 'لوحة الأداء', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "واجهة مرئية تعرض بيانات تقدم الطالب، الدرجات، ونقاط القوة والضعف لتوجيه مسار التعلم.", "example": "متابعة الرسم البياني الذي يوضح تحسن سرعة الحل في الأسئلة اللفظية عبر الأسابيع."}'::jsonb),
('digital-exams-glossary-post-exam-eval', 'digital-exams', 'glossary', 'draft', false, 220, 'الاختبارات الرقمية', 'التقييم البعدي', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "مراجعة الأداء فور انتهاء الاختبار لتحديد نقاط القوة والضعف في استراتيجية الحل.", "example": "تحليل ما إذا كان الوقت المخصص للقسم الكمي كافياً أم يحتاج لتعديل."}'::jsonb),
('digital-exams-glossary-progress-analytics', 'digital-exams', 'glossary', 'draft', false, 230, 'الاختبارات الرقمية', 'تحليلات التقدم', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "دراسة البيانات التفصيلية للأداء لتحديد الأنماط واتخاذ قرارات مبنية على البيانات لتحسين الدراسة.", "example": "ملاحظة أن الوقت المستغرق في حل أسئلة قسم معين يتناقص مع زيادة عدد الاختبارات التجريبية."}'::jsonb),
('digital-exams-glossary-random-practice', 'digital-exams', 'glossary', 'draft', false, 240, 'الاختبارات الرقمية', 'الممارسة العشوائية', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "حل أسئلة من مواضيع متعددة بشكل مختلط لتدريب الدماغ على التنقل السريع بين المفاهيم.", "example": "حل 10 أسئلة هندسة تليها 10 أسئلة جبر ثم 10 إحصاء بشكل متداخل."}'::jsonb),
('digital-exams-glossary-root-question-analysis', 'digital-exams', 'glossary', 'draft', false, 250, 'الاختبارات الرقمية', 'تحليل جذر السؤال', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "فهم المطلب الأساسي للسؤال دون التشتت بالتفاصيل الزائدة أو الحشو اللفظي.", "example": "تحديد المتغير المطلوب حسابه في مسألة فيزيائية مليئة بالأرقام غير الضرورية."}'::jsonb),
('digital-exams-glossary-rushing-errors', 'digital-exams', 'glossary', 'draft', false, 260, 'الاختبارات الرقمية', 'أخطاء التسرع', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "الأخطاء الناتجة عن قراءة السؤال بسرعة أو تجاوز بعض المعطيات دون انتباه.", "example": "اختيار الإجابة (أ) فوراً لأنها تبدو صحيحة دون إكمال قراءة باقي الخيارات (ب، ج، د)."}'::jsonb),
('digital-exams-glossary-spaced-revision', 'digital-exams', 'glossary', 'draft', false, 270, 'الاختبارات الرقمية', 'المراجعة المتباعدة', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "توزيع فترات دراسة ومراجعة المادة على فترات زمنية متزايدة لتثبيت المعلومات.", "example": "مراجعة قواعد الرياضيات اليوم، ثم بعد 3 أيام، ثم بعد أسبوع."}'::jsonb),
('digital-exams-glossary-tech-check', 'digital-exams', 'glossary', 'draft', false, 280, 'الاختبارات الرقمية', 'الفحص التقني المسبق', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "التأكد من جاهزية الجهاز، اتصال الإنترنت، والمتصفح قبل بدء الاختبار الرقمي بوقت كافٍ.", "example": "اختبار سرعة الإنترنت وتحديث متصفح الكروم قبل يوم من موعد الاختبار."}'::jsonb),
('digital-exams-glossary-time-allocation', 'digital-exams', 'glossary', 'draft', false, 290, 'الاختبارات الرقمية', 'تخصيص الوقت', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "تحديد مدة زمنية قصوى لكل سؤال أو قسم لتجنب استنزاف الوقت في جزء واحد من الاختبار.", "example": "تخصيص 90 ثانية كحد أقصى لكل سؤال في قسم القراءة لتتمكن من إكمال جميع الأسئلة."}'::jsonb),
('digital-exams-glossary-two-minute-rule', 'digital-exams', 'glossary', 'draft', false, 300, 'الاختبارات الرقمية', 'قاعدة الدقيقتين', '', ARRAY['الاختبارات الرقمية', 'مصطلحات']::text[], NULL, '{"definition": "مبدأ ينص على تجاوز السؤال الذي يستغرق أكثر من دقيقتين للعودة إليه لاحقاً.", "example": "إذا شعرت أنك عالق في مسألة رياضية وتجاوزت الدقيقتين، ضع علامة عليها وانتقل للتالي."}'::jsonb);

-- Insert into digital_exams_prompts (30 records)
INSERT INTO digital_exams_prompts (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('digital-exams-prompt-analyze-mistake', 'digital-exams', 'prompt', 'draft', false, 10, 'الاختبارات الرقمية', 'تحليل خطأ متكرر', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "لقد أخطأت في هذا السؤال: [نص السؤال]. إجابتي كانت [الإجابة الخاطئة] والإجابة الصحيحة هي [الإجابة الصحيحة]. اشرح لي بالتفصيل سبب خطئي وما هي القاعدة أو المفهوم الذي يجب أن أراجعه.", "instructions": "يفضل إرفاق السياق الكامل للسؤال لفهم أعمق لسبب الخطأ."}'::jsonb),
('digital-exams-prompt-brainstorm-study-methods', 'digital-exams', 'prompt', 'draft', false, 20, 'الاختبارات الرقمية', 'طرق دراسة مبتكرة', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "أشعر بالملل من طريقتي التقليدية في المراجعة. اقترح 5 طرق مبتكرة وتفاعلية لمراجعة مادة [اسم المادة] استعداداً للاختبار النهائي.", "instructions": "تطبيق الطرق المقترحة يكسر الروتين ويزيد من استبقاء المعلومات."}'::jsonb),
('digital-exams-prompt-compare-concepts', 'digital-exams', 'prompt', 'draft', false, 30, 'الاختبارات الرقمية', 'مقارنة بين مفهومين متشابهين', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "ما هو الفرق الدقيق بين [المفهوم الأول] و [المفهوم الثاني]؟ قدم جدولاً يوضح الفروقات الجوهرية مع إعطاء مثال لكل منهما للتمييز بينهما في الاختبار.", "instructions": "يساعدك هذا في حل أسئلة الاختيار من متعدد التي تعتمد على التمييز الدقيق."}'::jsonb),
('digital-exams-prompt-create-study-plan', 'digital-exams', 'prompt', 'draft', false, 40, 'الاختبارات الرقمية', 'إنشاء خطة مراجعة', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "قم بإنشاء خطة مراجعة مكثفة لمدة [عدد الأيام] أيام للتحضير لاختبار [اسم الاختبار]. ركز على تخصيص وقت أكبر لمواضيع الضعف وهي [المواضيع].", "instructions": "استخدم هذا الموجه مع الذكاء الاصطناعي لإنشاء جدول مرن يراعي أوقات ذروة التركيز لديك."}'::jsonb),
('digital-exams-prompt-decode-trick-questions', 'digital-exams', 'prompt', 'draft', false, 50, 'الاختبارات الرقمية', 'فك شفرة الأسئلة الخادعة', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "لماذا يعتبر هذا السؤال خادعاً؟ [نص السؤال والخيارات]. اشرح لي الفخ الذي يقع فيه الطلاب عادة وكيف أتجنبه مستقبلاً.", "instructions": "خاص للأسئلة التي تبدو سهلة ولكن إجابتها البديهية خاطئة."}'::jsonb),
('digital-exams-prompt-evaluate-essay-answer', 'digital-exams', 'prompt', 'draft', false, 60, 'الاختبارات الرقمية', 'تقييم إجابة مقالية قصيرة', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "هذا هو السؤال: [نص السؤال]، وهذه هي إجابتي: [نص الإجابة]. قيّم إجابتي من 10، وحدد ما ينقصها لتكون إجابة نموذجية، وأعد كتابتها بالشكل الأمثل.", "instructions": "مفيد للاختبارات التي تتضمن أسئلة ذات إجابات قصيرة أو تعليل."}'::jsonb),
('digital-exams-prompt-explain-concept-simply', 'digital-exams', 'prompt', 'draft', false, 70, 'الاختبارات الرقمية', 'شرح مفهوم معقد ببساطة', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "اشرح لي المفهوم التالي: [اسم المفهوم] وكأنني في المرحلة [المرحلة الدراسية]. استخدم أمثلة من الحياة اليومية لتوضيح الفكرة.", "instructions": "هذا الموجه ممتاز لكسر حاجز صعوبة المواضيع المجردة في الفيزياء والرياضيات."}'::jsonb),
('digital-exams-prompt-focus-improvement', 'digital-exams', 'prompt', 'draft', false, 80, 'الاختبارات الرقمية', 'تحسين التركيز الذهني', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "أعاني من تشتت الانتباه بعد 20 دقيقة من بدء حل الأسئلة. ما هي الاستراتيجيات المثبتة علمياً لزيادة مدة التركيز في الاختبارات الطويلة التي تتجاوز الساعتين؟", "instructions": "استخدم النصائح في جلسات المذاكرة لتدريب الدماغ تدريجياً."}'::jsonb),
('digital-exams-prompt-generate-mcq', 'digital-exams', 'prompt', 'draft', false, 90, 'الاختبارات الرقمية', 'توليد أسئلة اختيار من متعدد', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "اكتب لي 5 أسئلة اختيار من متعدد بمستوى صعوبة [مستوى الصعوبة] حول موضوع [الموضوع]. تأكد من أن المشتتات (الخيارات الخاطئة) تبدو منطقية، وقدم شرحاً لكل إجابة صحيحة في النهاية.", "instructions": "حدد مستوى الصعوبة (سهل، متوسط، صعب) بناءً على تقدمك الحالي."}'::jsonb),
('digital-exams-prompt-identify-keywords', 'digital-exams', 'prompt', 'draft', false, 100, 'الاختبارات الرقمية', 'استخراج الكلمات المفتاحية', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "إليك السؤال التالي: [نص السؤال الطويل]. ما هي الكلمات المفتاحية التي يجب أن أركز عليها للوصول للإجابة الصحيحة متجاهلاً الحشو الزائد؟", "instructions": "استخدم هذا الموجه للتدرب على تحليل الأسئلة الطويلة أو المعقدة لفظياً."}'::jsonb),
('digital-exams-prompt-item-01', 'digital-exams', 'prompt', 'draft', false, 210, 'الاختبارات الرقمية', 'استراتيجية حل أسئلة الاختيار من متعدد', 'Item 01', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اكتب استراتيجية مفصلة لحل أسئلة الاختيار من متعدد بفعالية.", "instructions": "اكتب استراتيجية مفصلة لحل أسئلة الاختيار من متعدد بفعالية."}'::jsonb),
('digital-exams-prompt-item-02', 'digital-exams', 'prompt', 'draft', false, 220, 'الاختبارات الرقمية', 'خطة مراجعة ليلة الاختبار', 'Item 02', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، قم بإنشاء خطة مراجعة شاملة لليلة التي تسبق الاختبار الرقمي.", "instructions": "قم بإنشاء خطة مراجعة شاملة لليلة التي تسبق الاختبار الرقمي."}'::jsonb),
('digital-exams-prompt-item-03', 'digital-exams', 'prompt', 'draft', false, 230, 'الاختبارات الرقمية', 'تقنيات تقليل قلق الاختبار', 'Item 03', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اذكر 5 تقنيات فعالة لتقليل التوتر والقلق أثناء الاختبارات الرقمية.", "instructions": "اذكر 5 تقنيات فعالة لتقليل التوتر والقلق أثناء الاختبارات الرقمية."}'::jsonb),
('digital-exams-prompt-item-04', 'digital-exams', 'prompt', 'draft', false, 240, 'الاختبارات الرقمية', 'كيفية التعامل مع الأسئلة الصعبة', 'Item 04', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اشرح خطوات التعامل مع الأسئلة التي لا تعرف إجابتها في الاختبار.", "instructions": "اشرح خطوات التعامل مع الأسئلة التي لا تعرف إجابتها في الاختبار."}'::jsonb),
('digital-exams-prompt-item-05', 'digital-exams', 'prompt', 'draft', false, 250, 'الاختبارات الرقمية', 'أهمية الاختبارات التجريبية', 'Item 05', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اكتب مقالاً قصيراً حول أهمية إجراء الاختبارات التجريبية قبل الاختبار الفعلي.", "instructions": "اكتب مقالاً قصيراً حول أهمية إجراء الاختبارات التجريبية قبل الاختبار الفعلي."}'::jsonb),
('digital-exams-prompt-item-06', 'digital-exams', 'prompt', 'draft', false, 260, 'الاختبارات الرقمية', 'تحليل الأخطاء بعد الاختبار التجريبي', 'Item 06', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اشرح كيفية تحليل الأخطاء والاستفادة منها لتحسين الأداء.", "instructions": "اشرح كيفية تحليل الأخطاء والاستفادة منها لتحسين الأداء."}'::jsonb),
('digital-exams-prompt-item-07', 'digital-exams', 'prompt', 'draft', false, 270, 'الاختبارات الرقمية', 'إدارة الوقت في الاختبارات الموقوتة', 'Item 07', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، قدم نصائح عملية لإدارة الوقت بفعالية في الاختبارات التي تعتمد على الوقت.", "instructions": "قدم نصائح عملية لإدارة الوقت بفعالية في الاختبارات التي تعتمد على الوقت."}'::jsonb),
('digital-exams-prompt-item-08', 'digital-exams', 'prompt', 'draft', false, 280, 'الاختبارات الرقمية', 'الاستعداد النفسي للاختبارات', 'Item 08', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، كيف يمكن للطالب الاستعداد نفسياً وذهنياً للاختبارات الرقمية؟", "instructions": "كيف يمكن للطالب الاستعداد نفسياً وذهنياً للاختبارات الرقمية؟"}'::jsonb),
('digital-exams-prompt-item-09', 'digital-exams', 'prompt', 'draft', false, 290, 'الاختبارات الرقمية', 'الفرق بين الاختبارات الورقية والرقمية', 'Item 09', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، قارن بين الاختبارات الورقية والرقمية من حيث المزايا والعيوب وتهيئة النفس.", "instructions": "قارن بين الاختبارات الورقية والرقمية من حيث المزايا والعيوب وتهيئة النفس."}'::jsonb),
('digital-exams-prompt-item-10', 'digital-exams', 'prompt', 'draft', false, 300, 'الاختبارات الرقمية', 'كيفية تدوين الملاحظات أثناء المذاكرة', 'Item 10', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اشرح أفضل الطرق لتدوين الملاحظات لتسهيل المراجعة قبل الاختبار.", "instructions": "اشرح أفضل الطرق لتدوين الملاحظات لتسهيل المراجعة قبل الاختبار."}'::jsonb),
('digital-exams-prompt-math-shortcuts', 'digital-exams', 'prompt', 'draft', false, 110, 'الاختبارات الرقمية', 'اختصارات ذهنية للرياضيات', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "هل هناك طرق سريعة أو اختصارات ذهنية لحل مسائل [نوع المسائل، مثال: التناسب الطردي والعكسي] بدون استخدام الآلة الحاسبة لربح الوقت؟", "instructions": "تطبيق الاختصارات يتطلب تدريباً لتجنب الأخطاء الحسابية العكسية."}'::jsonb),
('digital-exams-prompt-memorization-techniques', 'digital-exams', 'prompt', 'draft', false, 120, 'الاختبارات الرقمية', 'تقنيات الحفظ السريع', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "لدي قائمة من [عدد] مصطلحات أو قوانين أحتاج لحفظها: [القائمة]. اقترح علي طريقة (Mnemonics) أو قصة قصيرة أو اختصارات لحفظها بسهولة.", "instructions": "يفضل وضع قوائم مترابطة ليكون الاختصار أو القصة ذات معنى."}'::jsonb),
('digital-exams-prompt-overcome-exam-anxiety', 'digital-exams', 'prompt', 'draft', false, 130, 'الاختبارات الرقمية', 'تقنيات التغلب على قلق الاختبار', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "أشعر بتوتر شديد قبل اختبار [اسم الاختبار] بيوم. أعطني 3 تقنيات عملية وسريعة لتهدئة الأعصاب وتقليل القلق يمكنني ممارستها الآن وفي قاعة الاختبار.", "instructions": "استخدمه عندما تشعر بالضغط النفسي لتلقي نصائح إرشادية وتدريبات تنفس مفيدة."}'::jsonb),
('digital-exams-prompt-plan-last-week', 'digital-exams', 'prompt', 'draft', false, 140, 'الاختبارات الرقمية', 'خطة الأسبوع الأخير', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "بقي أسبوع واحد على اختبار [اسم الاختبار]. كيف أنظم الأيام السبعة المتبقية لضمان مراجعة شاملة دون إرهاق نفسي (Burnout)؟", "instructions": "يساعدك في الانتقال من مرحلة التعلم لمرحلة تثبيت المعلومات والتدريب."}'::jsonb),
('digital-exams-prompt-post-exam-reflection', 'digital-exams', 'prompt', 'draft', false, 150, 'الاختبارات الرقمية', 'التأمل بعد الاختبار', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "لقد انتهيت للتو من اختباري. أريد توثيق تجربتي. اسألني 4 أسئلة تقييمية حول أدائي، استراتيجياتي، وما يمكنني تحسينه في الاختبارات القادمة.", "instructions": "خطوة هامة لتحويل التجربة الحالية لدروس مستفادة للمستقبل."}'::jsonb),
('digital-exams-prompt-reading-comprehension', 'digital-exams', 'prompt', 'draft', false, 160, 'الاختبارات الرقمية', 'تحسين استيعاب المقروء', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "كيف أقرأ النصوص الطويلة في قسم الاستيعاب اللفظي بسرعة وبشكل فعال للإجابة على الأسئلة دون الحاجة لإعادة قراءة النص عدة مرات؟", "instructions": "مفيد جداً لاختبارات القدرات التي تعتمد على استيعاب المقروء."}'::jsonb),
('digital-exams-prompt-review-exam-results', 'digital-exams', 'prompt', 'draft', false, 170, 'الاختبارات الرقمية', 'مراجعة نتائج الاختبار التجريبي', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "لقد حصلت على درجة [الدرجة] من [الدرجة الكلية] في الاختبار التجريبي. أخطائي تركزت في أقسام [أسماء الأقسام]. ما هي استراتيجيتي للأسبوع القادم لتحسين درجتي؟", "instructions": "يقدم لك خطة عمل مبنية على نقاط ضعفك الحالية لرفع مستوى الأداء."}'::jsonb),
('digital-exams-prompt-simulate-exam-scenario', 'digital-exams', 'prompt', 'draft', false, 180, 'الاختبارات الرقمية', 'محاكاة سيناريو اختبار صعب', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "تخيل أنك تختبرني شفوياً في موضوع [الموضوع]. اسألني سؤالاً صعباً، وانتظر إجابتي، ثم صحح لي وأعطني السؤال التالي. كرر ذلك 3 مرات.", "instructions": "يستخدم للتدرب التفاعلي والمحاكاة الحية لمستوى الصعوبة."}'::jsonb),
('digital-exams-prompt-summarize-notes', 'digital-exams', 'prompt', 'draft', false, 190, 'الاختبارات الرقمية', 'تلخيص ملاحظات المراجعة', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "قم بتلخيص الملاحظات التالية في نقاط رئيسية مركزة لتسهيل حفظها واسترجاعها ليلة الاختبار: [النص أو الملاحظات].", "instructions": "يفضل ألا يتجاوز النص المدخل 1000 كلمة لضمان دقة التلخيص وتركيزه."}'::jsonb),
('digital-exams-prompt-time-management-strategy', 'digital-exams', 'prompt', 'draft', false, 200, 'الاختبارات الرقمية', 'استراتيجية إدارة الوقت', '', ARRAY['الاختبارات الرقمية', 'prompt']::text[], NULL, '{"prompt_text": "لدي اختبار يحتوي على [عدد الأسئلة] سؤالاً ومقسّم إلى [عدد الأقسام] أقسام، والوقت الإجمالي هو [المدة بالدقائق] دقيقة. كيف أوزع وقتي بشكل مثالي مع ترك 10 دقائق للمراجعة النهائية؟", "instructions": "احرص على إدخال أرقام دقيقة لضمان توزيع زمني واقعي وقابل للتطبيق."}'::jsonb);

-- Insert into digital_exams_resources (30 records)
INSERT INTO digital_exams_resources (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('digital-exams-resource-anki-flashcards', 'digital-exams', 'resource', 'draft', false, 10, 'الاختبارات الرقمية', 'بطاقات أنكي الذكية', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://apps.ankiweb.net", "description": "تطبيق يعتمد على خوارزميات التكرار المتباعد لمساعدتك على حفظ الكلمات المفتاحية والمصطلحات بسرعة."}'::jsonb),
('digital-exams-resource-deep-work-summary', 'digital-exams', 'resource', 'draft', false, 20, 'الاختبارات الرقمية', 'ملخص كتاب العمل العميق', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "", "description": "نصائح مستخلصة من كتاب ''العمل العميق'' لكال نيوبورت لتعزيز التركيز أثناء دراسة المواضيع الصعبة."}'::jsonb),
('digital-exams-resource-digital-readiness-checklist', 'digital-exams', 'resource', 'draft', false, 30, 'الاختبارات الرقمية', 'قائمة التحقق للجاهزية الرقمية', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "", "description": "ملف قابل للتحميل يحتوي على خطوات التأكد من جاهزية الحاسب الآلي للاختبارات عن بعد."}'::jsonb),
('digital-exams-resource-digital-sat-practice', 'digital-exams', 'resource', 'draft', false, 40, 'الاختبارات الرقمية', 'تطبيق بلو بوك للتدريب الرقمي', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://bluebook.collegeboard.org", "description": "تطبيق يحاكي بيئة الاختبارات الرقمية المعيارية للتدرب على الواجهة والأسئلة (مفيد لاختبارات مشابهة)."}'::jsonb),
('digital-exams-resource-exam-diet-tips', 'digital-exams', 'resource', 'draft', false, 50, 'الاختبارات الرقمية', 'نصائح التغذية لتعزيز الذاكرة', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "", "description": "دليل صحي لما يجب تناوله قبل وأثناء فترة الاختبارات لضمان أعلى مستويات النشاط الذهني."}'::jsonb),
('digital-exams-resource-eye-care-software', 'digital-exams', 'resource', 'draft', false, 60, 'الاختبارات الرقمية', 'برنامج حماية العين للشاشات', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://justgetflux.com", "description": "برنامج لتقليل إجهاد العين عبر تعديل إضاءة الشاشة تلقائياً أثناء المراجعة الطويلة أمام الحاسب."}'::jsonb),
('digital-exams-resource-focus-music-playlist', 'digital-exams', 'resource', 'draft', false, 70, 'الاختبارات الرقمية', 'موسيقى وأصوات بيضاء للتركيز', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "", "description": "قائمة تشغيل مصممة للمساعدة على التركيز العميق أثناء المذاكرة وتقليل المشتتات الخارجية."}'::jsonb),
('digital-exams-resource-habit-tracker', 'digital-exams', 'resource', 'draft', false, 80, 'الاختبارات الرقمية', 'متتبع العادات اليومية', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://loophabit.org", "description": "تطبيق بسيط لمساعدتك في بناء عادة المذاكرة اليومية والالتزام بالجدول الزمني."}'::jsonb),
('digital-exams-resource-item-01', 'digital-exams', 'resource', 'draft', false, 210, 'الاختبارات الرقمية', 'موقع كورسيرا', 'Item 01', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://www.coursera.org", "description": "منصة تعليمية تقدم دورات في مهارات الدراسة والتحضير للاختبارات."}'::jsonb),
('digital-exams-resource-item-02', 'digital-exams', 'resource', 'draft', false, 220, 'الاختبارات الرقمية', 'أكاديمية خان', 'Item 02', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://ar.khanacademy.org", "description": "دروس ومقاطع فيديو تعليمية مجانية في مختلف المواد."}'::jsonb),
('digital-exams-resource-item-03', 'digital-exams', 'resource', 'draft', false, 230, 'الاختبارات الرقمية', 'موقع كويزليت', 'Item 03', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://quizlet.com", "description": "أداة لإنشاء بطاقات تعليمية واختبارات تدريبية."}'::jsonb),
('digital-exams-resource-item-04', 'digital-exams', 'resource', 'draft', false, 240, 'الاختبارات الرقمية', 'تطبيق بومودورو', 'Item 04', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://pomofocus.io", "description": "تطبيق لإدارة الوقت أثناء المذاكرة باستخدام تقنية بومودورو."}'::jsonb),
('digital-exams-resource-item-05', 'digital-exams', 'resource', 'draft', false, 250, 'الاختبارات الرقمية', 'موقع إيديكس', 'Item 05', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://www.edx.org", "description": "دورات تدريبية من جامعات عالمية لتطوير مهارات التعلم."}'::jsonb),
('digital-exams-resource-item-06', 'digital-exams', 'resource', 'draft', false, 260, 'الاختبارات الرقمية', 'مدونة طالب', 'Item 06', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://www.studentblog.com", "description": "مقالات ونصائح للطلاب حول المذاكرة والتحضير للاختبارات."}'::jsonb),
('digital-exams-resource-item-07', 'digital-exams', 'resource', 'draft', false, 270, 'الاختبارات الرقمية', 'موقع يوديمي', 'Item 07', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://www.udemy.com", "description": "دورات في كيفية التغلب على قلق الاختبارات."}'::jsonb),
('digital-exams-resource-item-08', 'digital-exams', 'resource', 'draft', false, 280, 'الاختبارات الرقمية', 'تطبيق فورست', 'Item 08', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://www.forestapp.cc", "description": "تطبيق يساعد على التركيز والابتعاد عن الهاتف أثناء المذاكرة."}'::jsonb),
('digital-exams-resource-item-09', 'digital-exams', 'resource', 'draft', false, 290, 'الاختبارات الرقمية', 'موقع جوجل درايف', 'Item 09', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://drive.google.com", "description": "مساحة لتخزين ومشاركة الملاحظات والملفات الدراسية."}'::jsonb),
('digital-exams-resource-item-10', 'digital-exams', 'resource', 'draft', false, 300, 'الاختبارات الرقمية', 'موقع نوشن', 'Item 10', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://www.notion.so", "description": "أداة قوية لتنظيم الجداول الدراسية والملاحظات."}'::jsonb),
('digital-exams-resource-khan-academy-math', 'digital-exams', 'resource', 'draft', false, 90, 'الاختبارات الرقمية', 'أكاديمية خان (قسم الرياضيات)', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://ar.khanacademy.org", "description": "شروحات مرئية وتمارين تفاعلية ممتازة لتأسيس وتقوية المهارات الرياضية المطلوبة في الاختبارات المعيارية."}'::jsonb),
('digital-exams-resource-math-way', 'digital-exams', 'resource', 'draft', false, 100, 'الاختبارات الرقمية', 'حلّال المسائل الرياضية', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://www.mathway.com", "description": "أداة للتحقق من إجاباتك ومراجعة خطوات الحل الدقيقة في المسائل الجبرية والهندسية."}'::jsonb),
('digital-exams-resource-mindmeister', 'digital-exams', 'resource', 'draft', false, 110, 'الاختبارات الرقمية', 'أداة الخرائط الذهنية (مايند مايستر)', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://www.mindmeister.com", "description": "منصة لإنشاء خرائط ذهنية إلكترونية تساعد في تلخيص المواضيع المعقدة وربط الأفكار."}'::jsonb),
('digital-exams-resource-mock-test-analysis-sheet', 'digital-exams', 'resource', 'draft', false, 120, 'الاختبارات الرقمية', 'نموذج تحليل الاختبارات التجريبية', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "", "description": "جدول بيانات جاهز لمتابعة درجاتك في الاختبارات التجريبية وتحديد الفجوات المعرفية تلقائياً."}'::jsonb),
('digital-exams-resource-notion-templates', 'digital-exams', 'resource', 'draft', false, 130, 'الاختبارات الرقمية', 'قوالب نوشن للمراجعة', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://www.notion.so", "description": "استخدم قوالب نوشن الجاهزة لتنظيم جدول المراجعة وبناء سجل الأخطاء الخاص بك."}'::jsonb),
('digital-exams-resource-online-whiteboard', 'digital-exams', 'resource', 'draft', false, 140, 'الاختبارات الرقمية', 'السبورة البيضاء التفاعلية', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://awwapp.com", "description": "مساحة مسودة افتراضية للتدرب على حل المسائل وكأنك في بيئة اختبار رقمية غير ورقية."}'::jsonb),
('digital-exams-resource-pomodoro-tracker', 'digital-exams', 'resource', 'draft', false, 150, 'الاختبارات الرقمية', 'أداة تتبع بومودورو', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://pomofocus.io", "description": "أداة ممتازة لتقسيم وقت المذاكرة إلى فترات زمنية لزيادة التركيز وإدارة الوقت بفعالية."}'::jsonb),
('digital-exams-resource-qiyas-official', 'digital-exams', 'resource', 'draft', false, 160, 'الاختبارات الرقمية', 'موقع هيئة تقويم التعليم والتدريب (قياس)', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://etec.gov.sa", "description": "الموقع الرسمي للاطلاع على مواعيد الاختبارات الرقمية، تسجيل الدخول، ومعرفة الشروط والتعليمات."}'::jsonb),
('digital-exams-resource-sleep-cycle-app', 'digital-exams', 'resource', 'draft', false, 170, 'الاختبارات الرقمية', 'تطبيق تتبع دورة النوم', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "https://www.sleepcycle.com", "description": "يساعدك على ضبط مواعيد نومك لضمان الاستيقاظ في أقصى درجات النشاط يوم الاختبار."}'::jsonb),
('digital-exams-resource-speed-reading-tool', 'digital-exams', 'resource', 'draft', false, 180, 'الاختبارات الرقمية', 'أداة تدريب القراءة السريعة', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "", "description": "منصة لتحسين سرعة القراءة واستيعاب المقروء، مهارة أساسية للأقسام اللفظية."}'::jsonb),
('digital-exams-resource-test-anxiety-guide', 'digital-exams', 'resource', 'draft', false, 190, 'الاختبارات الرقمية', 'دليل التعامل مع قلق الاختبارات', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "", "description": "مقال شامل يقدم نصائح علمية للتغلب على القلق وتحسين الأداء تحت الضغط النفسي."}'::jsonb),
('digital-exams-resource-time-blocking-guide', 'digital-exams', 'resource', 'draft', false, 200, 'الاختبارات الرقمية', 'دليل استراتيجية حجب الوقت', '', ARRAY['الاختبارات الرقمية', 'resource']::text[], NULL, '{"url": "", "description": "شرح مفصل لكيفية استخدام استراتيجية Time Blocking لتنظيم يومك خلال فترة المراجعة النهائية."}'::jsonb);

-- Insert into digital_exams_lessons (20 records)
INSERT INTO digital_exams_lessons (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('digital-exams-lesson-ai-study-assistant', 'digital-exams', 'lesson', 'draft', false, 10, 'الاختبارات الرقمية', 'استخدام الذكاء الاصطناعي كمساعد شخصي', 'Using AI as a Personal Assistant', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# استخدام الذكاء الاصطناعي كمساعد شخصي

الذكاء الاصطناعي أداة ثورية في التحضير للاختبارات إذا استخدم بشكل صحيح.

## الاستخدامات الفعالة:
- **شرح المفاهيم**: اطلب منه شرح المعادلات المعقدة بأسلوب مبسط.
- **توليد الأسئلة**: اطلب منه صياغة أسئلة مشابهة للأسئلة التي تخطئ فيها للتدرب عليها.
- **المحاكاة**: لا تعتمد عليه لحل الأسئلة لك، بل لتقييم إجاباتك وإرشادك لطريقة التفكير الصحيحة.', '{}'::jsonb),
('digital-exams-lesson-analyzing-mistakes', 'digital-exams', 'lesson', 'draft', false, 20, 'الاختبارات الرقمية', 'كيف تحلل أخطاءك لبناء سجل الأخطاء', 'How to Analyze Mistakes for Mistake Log', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# كيف تحلل أخطاءك لبناء سجل الأخطاء

الخطأ في الاختبار التجريبي هو كنز من المعلومات إذا تم استغلاله بشكل صحيح. 

## خطوات بناء سجل الأخطاء:
1. **تصنيف الخطأ**: هل هو خطأ في المفهوم؟ أم خطأ حسابي؟ أم خطأ في قراءة السؤال؟
2. **تدوين الحل**: لا تكتب الإجابة (أ) أو (ب) بل اكتب الخطوات الدقيقة للحل الصحيح.
3. **المراجعة الدورية**: قبل الاختبار بيومين، راجع سجل الأخطاء بدلاً من قراءة المنهج كاملاً لضمان عدم تكرار زلاتك السابقة.', '{}'::jsonb),
('digital-exams-lesson-confidence-rating', 'digital-exams', 'lesson', 'draft', false, 30, 'الاختبارات الرقمية', 'معايرة الثقة أثناء الحل', 'Confidence Rating During Exams', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# معايرة الثقة أثناء الحل

الوعي الذاتي بمدى صحة إجابتك يوفر عليك وقت المراجعة.

## طريقة المعايرة:
أثناء حلك للاختبار، صنف إجاباتك في عقلك أو باستخدام مسودة خارجية إلى 3 مستويات:
- 100% متأكد: لا تراجعه أبداً لتوفير الوقت.
- 50% متأكد (استبعدت خيارين): راجعه إذا تبقى وقت.
- تخمين عشوائي: استخدم زر المراجعة (Flag) للعودة إليه حتماً ومحاولة تحليله مجدداً.', '{}'::jsonb),
('digital-exams-lesson-digital-time-management', 'digital-exams', 'lesson', 'draft', false, 40, 'الاختبارات الرقمية', 'إدارة الوقت في الاختبارات الرقمية', 'Time Management in Digital Exams', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# إدارة الوقت في الاختبارات الرقمية

في الاختبارات الورقية، كان من السهل تصفح الأوراق لتوزيع الوقت. أما رقمياً، فأنت تواجه الشاشة فقط. 

## قواعد ذهبية:
- **قاعدة 90 ثانية**: لا تمنح أي سؤال أكثر من دقيقة ونصف في القراءة الأولى.
- **استخدام خاصية التأجيل (Flag)**: إذا واجهت سؤالاً معقداً، قم بوضع علامة عليه وتجاوزه فوراً. حل الأسئلة السهلة يمنحك الثقة ويوفر لك الوقت للعودة للأسئلة الصعبة لاحقاً.', '{}'::jsonb),
('digital-exams-lesson-exam-night-routine', 'digital-exams', 'lesson', 'draft', false, 50, 'الاختبارات الرقمية', 'روتين ليلة الاختبار لتقليل القلق', 'Exam Night Routine to Reduce Anxiety', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# روتين ليلة الاختبار لتقليل القلق

ما تفعله في الليلة التي تسبق الاختبار يحدد أداءك بنسبة كبيرة. السهر للمراجعة هو أسوأ استراتيجية ممكنة.

## الروتين الأمثل:
1. **إيقاف الدراسة مبكراً**: توقف عن المذاكرة بحلول الساعة 8 مساءً.
2. **تجهيز الأدوات**: تأكد من جهازك، هويتك، والرقم السري إذا كان الاختبار عن بعد.
3. **تقنيات الاسترخاء**: مارس التنفس العميق، وابتعد عن الشاشات قبل النوم بساعة للحصول على جودة نوم عالية.', '{}'::jsonb),
('digital-exams-lesson-final-week-strategy', 'digital-exams', 'lesson', 'draft', false, 60, 'الاختبارات الرقمية', 'استراتيجية الأسبوع الحاسم', 'The Final Week Strategy', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# استراتيجية الأسبوع الحاسم

في الأسبوع الأخير، التعلم الجديد غير فعال. الهدف هو التثبيت والجاهزية.

## التركيز في الأسبوع الأخير:
- **توقف عن تعلم مواضيع جديدة** قد تسبب لك التشتت.
- **ركز على سجل الأخطاء** الخاص بك راجعه يومياً لضمان عدم تكرار الزلات.
- **أدِّ اختباراً تجريبياً أخيراً** قبل يومين من الاختبار لمحاكاة الظروف الحقيقية وضبط ساعتك البيولوجية.', '{}'::jsonb),
('digital-exams-lesson-handling-distractors', 'digital-exams', 'lesson', 'draft', false, 70, 'الاختبارات الرقمية', 'تفكيك المشتتات في أسئلة القدرات', 'Dismantling Distractors in Aptitude Tests', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# تفكيك المشتتات في أسئلة القدرات

واضعو الاختبارات يصممون خيارات تبدو صحيحة لمنطق الطالب المتسرع. هذه تسمى ''المشتتات''.

## أنواع المشتتات الشائعة:
- **المشتت نصف الصحيح**: خيار يحتوي على معلومة صحيحة ولكنه لا يجيب على السؤال المطلوب.
- **المشتت الحسابي**: خيار يمثل ناتج خطوة واحدة من الحل وليس الناتج النهائي (مثل ناتج الجمع قبل القسمة في حساب المتوسط).
ركز دائماً على المطلب النهائي للسؤال لتجنب هذه الفخاخ.', '{}'::jsonb),
('digital-exams-lesson-interleaved-practice', 'digital-exams', 'lesson', 'draft', false, 80, 'الاختبارات الرقمية', 'التشابك المعرفي: لا تدرس موضوعاً واحداً', 'Interleaved Practice: Don''t Study One Topic', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# التشابك المعرفي: لا تدرس موضوعاً واحداً

الدراسة التقليدية تعتمد على حل 30 سؤالاً على نفس القاعدة، مما يوهمك بالفهم. لكن في الاختبار، الأسئلة تأتي عشوائية.

## ميزة الممارسة المتشابكة:
قم بحل 5 أسئلة هندسة، ثم 5 جبر، ثم 5 إحصاء. هذا يجبر دماغك على التدرب على (اختيار القاعدة المناسبة) بالإضافة إلى (تطبيق القاعدة)، وهو المهارة الحقيقية المطلوبة في الاختبار.', '{}'::jsonb),
('digital-exams-lesson-item-01', 'digital-exams', 'lesson', 'draft', false, 150, 'الاختبارات الرقمية', 'أسرار إدارة الوقت في الاختبارات الرقمية', 'Item 01', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# أسرار إدارة الوقت في الاختبارات الرقمية

## مقدمة
كيف توزع وقتك بذكاء لتحقيق أعلى الدرجات.

## الشرح
إدارة الوقت هي مفتاح النجاح في أي اختبار. في هذا الدرس سنتعلم كيف نوزع الدقائق بفعالية.

## مثال تطبيقي
على سبيل المثال، إذا كان الاختبار يحتوي على 60 سؤالاً ومدته 60 دقيقة، يجب ألا تقضي أكثر من دقيقة واحدة في كل سؤال.

## تحذير
تجنب التوقف طويلاً عند الأسئلة الصعبة؛ فقد تفقد الوقت المخصص للأسئلة السهلة.

## الخلاصة
السر يكمن في الحركة المستمرة، أجب عن السهل أولاً ثم عد للصعب.', '{}'::jsonb),
('digital-exams-lesson-item-02', 'digital-exams', 'lesson', 'draft', false, 160, 'الاختبارات الرقمية', 'التعامل مع قلق الاختبارات', 'Item 02', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# التعامل مع قلق الاختبارات

## مقدمة
تقنيات عملية للهدوء والتركيز أثناء الاختبار.

## الشرح
التوتر قبل الاختبار أمر طبيعي، لكن يمكن السيطرة عليه. سنتعرف على طرق للتخلص من القلق.

## مثال تطبيقي
من أفضل التقنيات هي التنفس العميق: خذ نفساً عميقاً لمدة 4 ثوانٍ واكتمه لثانيتين ثم أخرجه ببطء.

## تحذير
تجنب شرب الكثير من الكافيين قبل الاختبار، فهو يزيد من القلق والتوتر.

## الخلاصة
الهدوء النفسي يساهم بنسبة كبيرة في استرجاع المعلومات بكفاءة.', '{}'::jsonb),
('digital-exams-lesson-item-03', 'digital-exams', 'lesson', 'draft', false, 170, 'الاختبارات الرقمية', 'استراتيجية استبعاد المشتتات', 'Item 03', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# استراتيجية استبعاد المشتتات

## مقدمة
كيف تزيد من فرصتك في اختيار الإجابة الصحيحة.

## الشرح
في أسئلة الاختيار من متعدد، غالباً ما تكون هناك إجابات خاطئة بوضوح. هذه تسمى المشتتات.

## مثال تطبيقي
إذا كان لديك 4 خيارات واستبعدت اثنين متأكد من خطئهما، ففرصتك الآن 50% لاختيار الصحيح.

## تحذير
لا تختر بناءً على النمط (مثل اختيار ج دائماً)، بل اقرأ واستبعد بذكاء.

## الخلاصة
استبعاد الخاطئ يقودك غالباً إلى الإجابة الصحيحة حتى لو لم تكن متأكداً منها 100%.', '{}'::jsonb),
('digital-exams-lesson-item-04', 'digital-exams', 'lesson', 'draft', false, 180, 'الاختبارات الرقمية', 'أهمية الاختبارات التجريبية', 'Item 04', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# أهمية الاختبارات التجريبية

## مقدمة
لماذا يجب أن تتدرب قبل الاختبار الفعلي؟

## الشرح
التدريب على اختبارات مشابهة للاختبار الحقيقي يهيئ عقلك لبيئة الاختبار.

## مثال تطبيقي
حل اختباراً تجريبياً في نفس الوقت الذي سيعقد فيه الاختبار الحقيقي وبدون أي مقاطعة.

## تحذير
احذر من حفظ إجابات الاختبارات التجريبية، فالأسئلة تتغير، والمهم هو فهم الفكرة.

## الخلاصة
الاختبارات التجريبية هي مقياس حقيقي لمستواك وتكشف لك نقاط ضعفك لتعالجها.', '{}'::jsonb),
('digital-exams-lesson-item-05', 'digital-exams', 'lesson', 'draft', false, 190, 'الاختبارات الرقمية', 'مراجعة الأخطاء بفعالية', 'Item 05', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# مراجعة الأخطاء بفعالية

## مقدمة
كيف تتعلم من أخطائك ولا تكررها.

## الشرح
بعد كل اختبار تجريبي، الخطوة الأهم هي مراجعة الأخطاء ومعرفة سببها.

## مثال تطبيقي
اكتب الأسئلة التي أخطأت فيها في دفتر خاص، واشرح لنفسك لماذا كانت إجابتك خاطئة.

## تحذير
لا تتجاهل الأخطاء بحجة أنها لن تتكرر، فالأخطاء غير المعالجة ستظهر مجدداً.

## الخلاصة
معرفة سبب الخطأ (نقص فهم، تسرع، عدم تركيز) هي أول خطوة لتجنبه مستقبلاً.', '{}'::jsonb),
('digital-exams-lesson-item-06', 'digital-exams', 'lesson', 'draft', false, 200, 'الاختبارات الرقمية', 'قراءة السؤال بدقة: الكلمات المفتاحية', 'Item 06', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# قراءة السؤال بدقة: الكلمات المفتاحية

## مقدمة
كيف تفهم المطلوب من السؤال بوضوح.

## الشرح
نصف الإجابة في فهم السؤال. الكلمات المفتاحية هي التي توجهك للإجابة الصحيحة.

## مثال تطبيقي
انتبه لكلمات مثل (دائماً، أبداً، ليس، باستثناء، جميع ما سبق). هذه الكلمات تغير معنى السؤال تماماً.

## تحذير
لا تتسرع في الإجابة بمجرد رؤية كلمة مألوفة، اقرأ السؤال حتى آخره.

## الخلاصة
القراءة المتأنية للسؤال توفر عليك الكثير من الأخطاء الساذجة وتضمن لك الدرجة.', '{}'::jsonb),
('digital-exams-lesson-keyword-spotting', 'digital-exams', 'lesson', 'draft', false, 90, 'الاختبارات الرقمية', 'اصطياد الكلمات المفتاحية وأدوات النفي', 'Spotting Keywords and Negative Tools', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# اصطياد الكلمات المفتاحية وأدوات النفي

الكلمة الواحدة قد تغير مسار إجابتك 180 درجة. 

## احذر من هذه الكلمات:
- النفي: (ليس، لا، ما عدا، باستثناء).
- التحديد: (أقصى، أدنى، الأقرب، الأقل احتمالاً).
قم بتظليل أو التركيز الذهني على هذه الكلمات فور قراءتك للسؤال. قراءة السؤال مرتين بسرعة أفضل من قراءته مرة واحدة ببطء واختيار إجابة متسرعة.', '{}'::jsonb),
('digital-exams-lesson-mcq-elimination', 'digital-exams', 'lesson', 'draft', false, 100, 'الاختبارات الرقمية', 'فن استراتيجية الاستبعاد', 'The Art of Elimination Strategy', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# فن استراتيجية الاستبعاد

يعتبر سؤال الاختيار من متعدد تحدياً ذهنياً أكثر منه اختباراً للحفظ. تعتمد استراتيجية الاستبعاد على مبدأ بسيط: إذا لم تعرف الإجابة الصحيحة، فابحث عن الإجابات الخاطئة وقم بحذفها. 

## كيف تطبقها؟
1. اقرأ السؤال بدقة وحدد المطلوب.
2. ابحث عن الإجابات المتناقضة تماماً مع المنطق العلمي أو سياق السؤال.
3. قم بحذف الخيارات التي تحتوي على كلمات التعميم المطلق مثل (دائماً، أبدأ، كل) غالباً ما تكون خاطئة.
4. بعد استبعاد خيارين، ترتفع نسبة إجابتك الصحيحة من 25% إلى 50%.', '{}'::jsonb),
('digital-exams-lesson-overcoming-mind-blanks', 'digital-exams', 'lesson', 'draft', false, 110, 'الاختبارات الرقمية', 'التعامل مع الصدمة الذهنية (Mind Blanking)', 'Handling Mind Blanking', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# التعامل مع الصدمة الذهنية (Mind Blanking)

يحدث أحياناً أن تقرأ سؤالاً فتشعر أن عقلك أصبح فارغاً تماماً نتيجة التوتر اللحظي.

## خطة الطوارئ:
1. **لا تتوقف**: تجاوز السؤال فوراً. البقاء فيه يزيد من إفراز هرمون التوتر الكورتيزول.
2. **إعادة التعيين الجسدي**: أغمض عينيك، خذ نفساً عميقاً، ثم ازفره ببطء. غيّر وضعية جلوسك.
3. ابدأ بحل سؤال سهل لاستعادة الثقة وتنشيط الذاكرة قبل العودة للسؤال الصعب.', '{}'::jsonb),
('digital-exams-lesson-post-exam-review', 'digital-exams', 'lesson', 'draft', false, 120, 'الاختبارات الرقمية', 'التقييم البعدي: ما بعد الاختبار التجريبي', 'Post-Exam Review: After the Mock Test', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# التقييم البعدي: ما بعد الاختبار التجريبي

إنهاء الاختبار التجريبي هو مجرد البداية. المرحلة الأهم هي المراجعة البعدية.

## الأسئلة الأربعة للتقييم:
1. ما هي الأسئلة التي استغرقت مني وقتاً أطول من اللازم ولماذا؟
2. ما هي المواضيع التي أخطأت فيها بسبب نقص المعرفة؟
3. ما هي الأسئلة التي أخطأت فيها بسبب التسرع؟
4. كيف سأعدل خطتي الدراسية بناءً على هذه النتائج في الأسبوع القادم؟', '{}'::jsonb),
('digital-exams-lesson-reading-comprehension-tricks', 'digital-exams', 'lesson', 'draft', false, 130, 'الاختبارات الرقمية', 'استيعاب المقروء: تقنيات القراءة الفعالة', 'Reading Comprehension: Effective Techniques', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# استيعاب المقروء: تقنيات القراءة الفعالة

في أقسام استيعاب المقروء، قراءة النص كاملاً بتمعن تستهلك كل وقتك. 

## استراتيجية (سؤال - نص - إجابة):
1. اقرأ الأسئلة أولاً لتحديد ما تبحث عنه (تاريخ، شخصية، سبب).
2. قم بقراءة سريعة (Skimming) للنص بحثاً عن الكلمات المفتاحية الموجودة في الأسئلة.
3. اقرأ الفقرة التي تحتوي على الإجابة بتأنٍ. هذا يوفر لك أكثر من 50% من الوقت.', '{}'::jsonb),
('digital-exams-lesson-tech-preparedness', 'digital-exams', 'lesson', 'draft', false, 140, 'الاختبارات الرقمية', 'الاستعداد التقني للاختبارات عن بعد', 'Tech Preparedness for Remote Exams', ARRAY['الاختبارات الرقمية', 'lesson']::text[], '# الاستعداد التقني للاختبارات عن بعد

المشاكل التقنية أثناء الاختبار قد تسبب توتراً يفسد أداءك بالكامل. يجب أن تكون مستعداً.

## قائمة التحقق:
- **الاتصال**: استخدام اتصال سلكي (Ethernet) إن أمكن لتجنب انقطاع الواي فاي.
- **الجهاز**: تعطيل التحديثات التلقائية للنظام وإغلاق جميع برامج الخلفية التي تستهلك الذاكرة.
- **البيئة**: توفير مصدر إضاءة جيد وعدم وجود أي أصوات أو أشخاص في محيط الكاميرا.', '{}'::jsonb);

-- Insert into iot_glossary (50 records)
INSERT INTO iot_glossary (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('iot-lab-glossary-actuator', 'iot-lab', 'glossary', 'draft', false, 10, 'إنترنت الأشياء', 'مشغل (Actuator)', 'Actuator', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "جهاز يحول الإشارة الكهربائية إلى حركة ميكانيكية أو فعل فيزيائي.", "example": "التحكم في محرك سيرفو لتدوير ذراع آلي."}'::jsonb),
('iot-lab-glossary-adc', 'iot-lab', 'glossary', 'draft', false, 150, 'إنترنت الأشياء', 'محول الإشارة التناظرية إلى رقمية (ADC)', 'ADC', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "وحدة إلكترونية تحول الإشارات الكهربائية المتغيرة (التناظرية) إلى أرقام يمكن للمتحكم قراءتها.", "example": "قراءة قيمة مستشعر الضوء LDR."}'::jsonb),
('iot-lab-glossary-analog-signal', 'iot-lab', 'glossary', 'draft', false, 20, 'إنترنت الأشياء', 'إشارة تماثلية (Analog Signal)', 'Analog Signal', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "إشارة مستمرة تتغير قيمتها بمرور الوقت، ويمكن أن تأخذ أي قيمة ضمن نطاق معين.", "example": "قراءة إشارة تماثلية من حساس حرارة متصل بمدخل تماثلي في الأردوينو."}'::jsonb),
('iot-lab-glossary-arduino', 'iot-lab', 'glossary', 'draft', false, 30, 'إنترنت الأشياء', 'أردوينو (Arduino)', 'Arduino', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "منصة إلكترونية مفتوحة المصدر تعتمد على أجهزة وبرمجيات سهلة الاستخدام.", "example": "برمجة أردوينو أونو لوميض مصباح LED."}'::jsonb),
('iot-lab-glossary-baud-rate', 'iot-lab', 'glossary', 'draft', false, 160, 'إنترنت الأشياء', 'معدل الباود', '', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "سرعة نقل البيانات عبر الاتصال التسلسلي، ويقاس بالبت في الثانية.", "example": "ضبط معدل الباود على 9600 في كل من الأردوينو والشاشة التسلسلية."}'::jsonb),
('iot-lab-glossary-bootloader', 'iot-lab', 'glossary', 'draft', false, 40, 'إنترنت الأشياء', 'محمل الإقلاع (Bootloader)', 'Bootloader', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "برنامج صغير مدمج في المتحكم الدقيق يهيئ الجهاز لبدء تشغيل البرنامج الرئيسي وتحديثه.", "example": "حرق محمل الإقلاع على شريحة ATmega328P جديدة."}'::jsonb),
('iot-lab-glossary-breadboard', 'iot-lab', 'glossary', 'draft', false, 50, 'إنترنت الأشياء', 'لوح التجارب (Breadboard)', 'Breadboard', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "لوح بلاستيكي يحتوي على ثقوب لتوصيل المكونات الإلكترونية بدون لحام.", "example": "توصيل دائرة بسيطة بمقاومة ومصباح LED على لوح التجارب."}'::jsonb),
('iot-lab-glossary-capacitor', 'iot-lab', 'glossary', 'draft', false, 60, 'إنترنت الأشياء', 'مكثف (Capacitor)', 'Capacitor', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "مكون يقوم بتخزين الطاقة الكهربائية بشكل مؤقت وتفريغها عند الحاجة.", "example": "استخدام مكثف لتنعيم إشارة الجهد الخارجة من مزود الطاقة."}'::jsonb),
('iot-lab-glossary-circuit-schematic', 'iot-lab', 'glossary', 'draft', false, 70, 'إنترنت الأشياء', 'مخطط الدائرة (Circuit Schematic)', 'Circuit Schematic', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "رسم توضيحي يمثل المكونات الإلكترونية وطريقة توصيلها باستخدام رموز قياسية.", "example": "رسم مخطط دائرة التحكم في محرك باستخدام الترانزستور قبل تنفيذها عملياً."}'::jsonb),
('iot-lab-glossary-current', 'iot-lab', 'glossary', 'draft', false, 80, 'إنترنت الأشياء', 'التيار الكهربائي (Current)', 'Current', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "معدل تدفق الشحنات الكهربائية في الدائرة، ويقاس بالأمبير.", "example": "حساب التيار المار في مقاومة باستخدام قانون أوم."}'::jsonb),
('iot-lab-glossary-dac', 'iot-lab', 'glossary', 'draft', false, 170, 'إنترنت الأشياء', 'محول الإشارة الرقمية إلى تناظرية (DAC)', 'DAC', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "وحدة تحول الأرقام الرقمية إلى إشارات جهد كهربائي متغير.", "example": "توليد إشارات صوتية من المتحكم الدقيق."}'::jsonb),
('iot-lab-glossary-data-logging', 'iot-lab', 'glossary', 'draft', false, 90, 'إنترنت الأشياء', 'تسجيل البيانات (Data Logging)', 'Data Logging', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "عملية جمع وتخزين البيانات بمرور الوقت، إما محلياً أو على خادم سحابي.", "example": "حفظ قراءات حساس الرطوبة كل 5 دقائق في بطاقة SD."}'::jsonb),
('iot-lab-glossary-debounce', 'iot-lab', 'glossary', 'draft', false, 180, 'إنترنت الأشياء', 'إزالة الارتداد (Debouncing)', 'Debouncing', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "معالجة برمجية أو فيزيائية لمنع قراءة ضغطات متكررة خاطئة عند ضغط الزر الميكانيكي مرة واحدة.", "example": "إضافة تأخير 50 مللي ثانية في الكود بعد اكتشاف ضغطة الزر."}'::jsonb),
('iot-lab-glossary-debugging', 'iot-lab', 'glossary', 'draft', false, 100, 'إنترنت الأشياء', 'تصحيح الأخطاء (Debugging)', 'Debugging', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "عملية اكتشاف وتحديد وإصلاح الأخطاء في البرمجيات أو الدوائر الإلكترونية.", "example": "استخدام شاشة الاتصال التسلسلي (Serial Monitor) لمراقبة قيم المتغيرات أثناء تشغيل الكود."}'::jsonb),
('iot-lab-glossary-digital-signal', 'iot-lab', 'glossary', 'draft', false, 110, 'إنترنت الأشياء', 'إشارة رقمية (Digital Signal)', 'Digital Signal', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "إشارة متقطعة تأخذ قيمتين فقط (عالي/منخفض أو 1/0).", "example": "قراءة حالة زر ضاغط كإشارة رقمية (مضغوط أو غير مضغوط)."}'::jsonb),
('iot-lab-glossary-esp32', 'iot-lab', 'glossary', 'draft', false, 120, 'إنترنت الأشياء', 'إي إس بي 32 (ESP32)', 'ESP32', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "شريحة تحكم دقيقة منخفضة التكلفة والطاقة تتميز بوجود Wi-Fi و Bluetooth مدمجين.", "example": "استخدام ESP32 لإرسال بيانات الحساسات إلى خادم سحابي."}'::jsonb),
('iot-lab-glossary-gpio', 'iot-lab', 'glossary', 'draft', false, 130, 'إنترنت الأشياء', 'دبابيس الإدخال والإخراج (GPIO)', 'Gpio', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "دبابيس عامة الأغراض على لوحة المتحكم يمكن برمجتها للعمل كمدخلات أو مخرجات.", "example": "توصيل LED بدبوس GPIO رقم 13 على الأردوينو."}'::jsonb),
('iot-lab-glossary-ground', 'iot-lab', 'glossary', 'draft', false, 190, 'إنترنت الأشياء', 'التأريض (Ground - GND)', 'Ground - GND', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "النقطة المرجعية في الدائرة الكهربائية التي تقاس بالنسبة لها جميع الجهود الأخرى، وهو مسار العودة للتيار.", "example": "يجب ربط الطرف السالب للبطارية بمنفذ GND."}'::jsonb),
('iot-lab-glossary-i2c-2', 'iot-lab', 'glossary', 'draft', false, 200, 'إنترنت الأشياء', 'بروتوكول I2C', '', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "بروتوكول اتصال تسلسلي يسمح لعدة أجهزة طرفية بالتواصل مع متحكم واحد باستخدام سلكين فقط.", "example": "توصيل شاشة LCD ومستشعر حرارة بنفس منافذ I2C."}'::jsonb),
('iot-lab-glossary-i2c', 'iot-lab', 'glossary', 'draft', false, 140, 'إنترنت الأشياء', 'بروتوكول I2C', 'Inter-Integrated Circuit', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "بروتوكول اتصال متسلسل يسمح بتوصيل أجهزة متعددة باستخدام سلكين فقط.", "example": "قراءة البيانات من حساس الضغط الجوي باستخدام بروتوكول I2C."}'::jsonb),
('iot-lab-glossary-interrupt', 'iot-lab', 'glossary', 'draft', false, 210, 'إنترنت الأشياء', 'المقاطعة (Interrupt)', 'Interrupt', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "إشارة تُرسل للمتحكم لإيقاف ما يفعله حالياً لتنفيذ مهمة أكثر أهمية وفورية.", "example": "استخدام زر ضغطي كمقاطعة لتشغيل إنذار فوري."}'::jsonb),
('iot-lab-glossary-iot', 'iot-lab', 'glossary', 'draft', false, 320, 'إنترنت الأشياء', 'إنترنت الأشياء (IoT)', 'Iot', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "شبكة من الأجهزة المادية المتصلة بالإنترنت لجمع وتبادل البيانات بذكاء.", "example": "نظام زراعة ذكي يروي النباتات تلقائياً عند جفاف التربة."}'::jsonb),
('iot-lab-glossary-jumper-wires', 'iot-lab', 'glossary', 'draft', false, 330, 'إنترنت الأشياء', 'أسلاك توصيل (Jumper Wires)', 'Jumper Wires', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "أسلاك قصيرة بأطراف صلبة تستخدم لتوصيل المكونات على لوح التجارب.", "example": "استخدام أسلاك توصيل من نوع (ذكر-ذكر) لربط الحساسات بلوح التجارب."}'::jsonb),
('iot-lab-glossary-led', 'iot-lab', 'glossary', 'draft', false, 340, 'إنترنت الأشياء', 'صمام ثنائي باعث للضوء (LED)', 'Light Emitting Diode', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "مكون إلكتروني يضيء عند مرور التيار الكهربائي فيه في اتجاه واحد.", "example": "استخدام LED أحمر كمؤشر لعمل الجهاز."}'::jsonb),
('iot-lab-glossary-logic-level', 'iot-lab', 'glossary', 'draft', false, 220, 'إنترنت الأشياء', 'مستوى الجهد المنطقي', '', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "مستويات الجهد الكهربائي التي تمثل الحالة 0 أو 1 في الدوائر الرقمية، عادة 3.3 فولت أو 5 فولت.", "example": "توصيل شريحة ESP32 التي تعمل بـ 3.3 فولت مع حساس 5 فولت يحتاج لمحول مستوى."}'::jsonb),
('iot-lab-glossary-microcontroller', 'iot-lab', 'glossary', 'draft', false, 350, 'إنترنت الأشياء', 'متحكم دقيق (Microcontroller)', 'Microcontroller', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "حاسوب صغير متكامل على شريحة واحدة مصمم للتحكم في الأجهزة والعمليات المحددة.", "example": "شريحة ATmega328P المستخدمة في لوحة الأردوينو أونو."}'::jsonb),
('iot-lab-glossary-mqtt', 'iot-lab', 'glossary', 'draft', false, 360, 'إنترنت الأشياء', 'بروتوكول MQTT', 'MQTT', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "بروتوكول مراسلة خفيف الوزن يعتمد على نموذج النشر/الاشتراك، يستخدم بكثرة في إنترنت الأشياء.", "example": "إرسال قراءات درجة الحرارة من ESP32 إلى وسيط MQTT."}'::jsonb),
('iot-lab-glossary-multimeter', 'iot-lab', 'glossary', 'draft', false, 370, 'إنترنت الأشياء', 'مقياس متعدد (Multimeter)', 'Multimeter', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "أداة قياس إلكترونية تستخدم لقياس الجهد، التيار، والمقاومة.", "example": "فحص استمرارية السلك باستخدام الملتيميتر للتأكد من عدم وجود قطع."}'::jsonb),
('iot-lab-glossary-ohm-law', 'iot-lab', 'glossary', 'draft', false, 380, 'إنترنت الأشياء', 'قانون أوم (Ohm''s Law)', 'Ohm''s Law', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "قانون فيزيائي يوضح العلاقة بين الجهد والتيار والمقاومة (V=I*R).", "example": "تطبيق قانون أوم لحساب قيمة المقاومة اللازمة لمصباح LED."}'::jsonb),
('iot-lab-glossary-pcb', 'iot-lab', 'glossary', 'draft', false, 230, 'إنترنت الأشياء', 'اللوحة المطبوعة (PCB)', 'PCB', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "لوحة من مادة عازلة تحتوي على مسارات نحاسية محفورة لربط المكونات الإلكترونية بدلاً من الأسلاك.", "example": "نقل المشروع من لوحة التجارب إلى PCB لجعله نهائياً ودائماً."}'::jsonb),
('iot-lab-glossary-pull-down', 'iot-lab', 'glossary', 'draft', false, 240, 'إنترنت الأشياء', 'مقاومة الخفض (Pull-down Resistor)', 'Pull-down Resistor', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "مقاومة توصل بين طرف الإدخال والأرضي لضمان قراءة مستوى منطقي منخفض (LOW) عند عدم وجود إدخال.", "example": "استخدام مقاومة خفض لضمان قراءة 0 فولت عند عدم ضغط الزر."}'::jsonb),
('iot-lab-glossary-pull-up', 'iot-lab', 'glossary', 'draft', false, 250, 'إنترنت الأشياء', 'مقاومة الرفع (Pull-up Resistor)', 'Pull-up Resistor', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "مقاومة توصل بين طرف الإدخال وجهد التغذية لضمان قراءة مستوى منطقي عالٍ (HIGH) عندما لا يكون هناك إدخال.", "example": "توصيل زر ضغطي مع مقاومة رفع لمنع القراءات العشوائية."}'::jsonb),
('iot-lab-glossary-pwm-2', 'iot-lab', 'glossary', 'draft', false, 390, 'إنترنت الأشياء', 'تعديل عرض النبضة (PWM)', 'Pulse Width Modulation', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "تقنية لمحاكاة إشارة تماثلية باستخدام إشارات رقمية سريعة التغيير.", "example": "التحكم في سرعة محرك أو شدة إضاءة LED باستخدام إشارات PWM."}'::jsonb),
('iot-lab-glossary-pwm', 'iot-lab', 'glossary', 'draft', false, 260, 'إنترنت الأشياء', 'تعديل عرض النبضة (PWM)', 'PWM', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "تقنية للحصول على نتائج تناظرية باستخدام وسائل رقمية عبر تغيير نسبة وقت التشغيل إلى وقت التوقف.", "example": "التحكم في سطوع مصباح LED أو سرعة محرك."}'::jsonb),
('iot-lab-glossary-raspberry-pi', 'iot-lab', 'glossary', 'draft', false, 400, 'إنترنت الأشياء', 'راسبيري باي (Raspberry Pi)', 'Raspberry Pi', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "حاسوب صغير بحجم بطاقة الائتمان يمكن استخدامه في مشاريع الإلكترونيات والحوسبة.", "example": "إعداد راسبيري باي كخادم ويب منزلي."}'::jsonb),
('iot-lab-glossary-relay-2', 'iot-lab', 'glossary', 'draft', false, 410, 'إنترنت الأشياء', 'مُرحل (Relay)', 'Relay', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "مفتاح كهرومغناطيسي يسمح لدائرة ذات جهد منخفض بالتحكم في دائرة ذات جهد عالي.", "example": "استخدام المُرحل للتحكم في تشغيل مضخة مياه 220 فولت بواسطة الأردوينو."}'::jsonb),
('iot-lab-glossary-relay', 'iot-lab', 'glossary', 'draft', false, 270, 'إنترنت الأشياء', 'المُرحِّل (Relay)', 'Relay', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "مفتاح كهرومغناطيسي يستخدم للتحكم بدائرة كهربائية ذات جهد عالي باستخدام إشارة ذات جهد منخفض.", "example": "استخدام الأردوينو لتشغيل مصباح 220 فولت عبر الريلاي."}'::jsonb),
('iot-lab-glossary-resistance', 'iot-lab', 'glossary', 'draft', false, 420, 'إنترنت الأشياء', 'المقاومة الكهربائية (Resistance)', 'Resistance', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "ممانعة المادة لمرور التيار الكهربائي فيها، وتقاس بالأوم.", "example": "استخدام مقاومة 220 أوم لحماية مصباح LED من الاحتراق."}'::jsonb),
('iot-lab-glossary-resistor', 'iot-lab', 'glossary', 'draft', false, 430, 'إنترنت الأشياء', 'مقاوم (Resistor)', 'Resistor', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "مكون إلكتروني سلبي يقلل من تدفق التيار الكهربائي.", "example": "توصيل مقاومة على التوالي مع LED لحمايته من التيار الزائد."}'::jsonb),
('iot-lab-glossary-schematic', 'iot-lab', 'glossary', 'draft', false, 280, 'إنترنت الأشياء', 'المخطط الكهربائي', '', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "رسم هندسي يوضح التوصيلات الكهربائية بين المكونات الإلكترونية باستخدام الرموز القياسية.", "example": "قراءة المخطط لتوصيل الدائرة بشكل صحيح على لوحة التجارب."}'::jsonb),
('iot-lab-glossary-sensor', 'iot-lab', 'glossary', 'draft', false, 440, 'إنترنت الأشياء', 'مستشعر (Sensor)', 'Sensor', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "جهاز يكتشف التغيرات في البيئة (مثل الحرارة، الضوء، أو الحركة) ويحولها إلى إشارات كهربائية.", "example": "استخدام مستشعر الموجات فوق الصوتية لقياس المسافة."}'::jsonb),
('iot-lab-glossary-serial-monitor', 'iot-lab', 'glossary', 'draft', false, 290, 'إنترنت الأشياء', 'الشاشة التسلسلية', '', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "أداة في بيئة تطوير الأردوينو لعرض البيانات المرسلة من المتحكم الدقيق وإرسال الأوامر إليه.", "example": "طباعة قيم المستشعر على الشاشة لمراقبتها أثناء التصحيح."}'::jsonb),
('iot-lab-glossary-soldering', 'iot-lab', 'glossary', 'draft', false, 450, 'إنترنت الأشياء', 'اللحام (Soldering)', 'Soldering', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "عملية دمج المكونات الإلكترونية على لوحة الدوائر المطبوعة (PCB) باستخدام سبيكة معدنية قابلة للذوبان.", "example": "لحام أسلاك التوصيل بمحرك تيار مستمر لضمان اتصال قوي."}'::jsonb),
('iot-lab-glossary-spi-2', 'iot-lab', 'glossary', 'draft', false, 460, 'إنترنت الأشياء', 'بروتوكول SPI', 'Serial Peripheral Interface', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "بروتوكول اتصال متسلسل متزامن لنقل البيانات بسرعة بين المتحكمات الدقيقة والملحقات.", "example": "توصيل شاشة LCD بالمتحكم الدقيق باستخدام واجهة SPI."}'::jsonb),
('iot-lab-glossary-spi', 'iot-lab', 'glossary', 'draft', false, 300, 'إنترنت الأشياء', 'بروتوكول SPI', '', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "بروتوكول اتصال تسلسلي سريع جداً لنقل البيانات بين المتحكم الدقيق والشرائح الأخرى.", "example": "قراءة البيانات من بطاقة SD باستخدام SPI."}'::jsonb),
('iot-lab-glossary-transistor', 'iot-lab', 'glossary', 'draft', false, 470, 'إنترنت الأشياء', 'ترانزستور (Transistor)', 'Transistor', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "عنصر شبه موصل يستخدم كمفتاح للتحكم في تدفق التيار، أو كمكبر للإشارة.", "example": "استخدام ترانزستور للتحكم في تشغيل محرك تيار مستمر (DC) بواسطة إشارة من الأردوينو."}'::jsonb),
('iot-lab-glossary-uart-2', 'iot-lab', 'glossary', 'draft', false, 480, 'إنترنت الأشياء', 'بروتوكول UART', 'Universal Asynchronous Receiver-Transmitter', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "بروتوكول اتصال متسلسل غير متزامن يستخدم لنقل البيانات بين جهازين.", "example": "التواصل بين شريحتي أردوينو عبر بروتوكول UART."}'::jsonb),
('iot-lab-glossary-uart', 'iot-lab', 'glossary', 'draft', false, 310, 'إنترنت الأشياء', 'بروتوكول UART', '', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "وحدة اتصال تسلسلية غير متزامنة تستخدم لنقل البيانات بين جهازين.", "example": "نقل البيانات بين الأردوينو وجهاز الكمبيوتر عبر منفذ USB."}'::jsonb),
('iot-lab-glossary-voltage', 'iot-lab', 'glossary', 'draft', false, 490, 'إنترنت الأشياء', 'الجهد الكهربائي (Voltage)', 'Voltage', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "مقدار القوة الدافعة للإلكترونات في الدائرة الكهربائية، ويقاس بالفولت.", "example": "قياس جهد بطارية باستخدام جهاز الملتيميتر."}'::jsonb),
('iot-lab-glossary-wifi-module', 'iot-lab', 'glossary', 'draft', false, 500, 'إنترنت الأشياء', 'وحدة واي فاي (Wi-Fi Module)', 'Wi-Fi Module', ARRAY['إنترنت الأشياء', 'مصطلحات']::text[], NULL, '{"definition": "مكون إلكتروني يتيح توصيل الأجهزة الدقيقة بشبكة الواي فاي للاتصال بالإنترنت.", "example": "توصيل وحدة ESP8266 بشبكة المنزل للتحكم في الإضاءة."}'::jsonb);

-- Insert into iot_prompts (30 records)
INSERT INTO iot_prompts (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('iot-lab-prompt-analog-circuit', 'iot-lab', 'prompt', 'draft', false, 10, 'إنترنت الأشياء', 'شرح دائرة تماثلية', 'Analog Circuit', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "كيف تعمل دائرة مقسم الجهد (Voltage Divider) ولماذا نستخدمها في مشاريعنا؟", "instructions": "قدم مثالاً يوضح استخدام مقاومتين لتقليل الجهد العالي ليناسب الأردوينو."}'::jsonb),
('iot-lab-prompt-arduino-blink', 'iot-lab', 'prompt', 'draft', false, 20, 'إنترنت الأشياء', 'كتابة كود وميض (Blink) للأردوينو', 'Arduino Blink Code Generation', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "اكتب كود أردوينو لجعل مصباح LED المتصل بالمنفذ [رقم_المنفذ] يومض بمعدل [مدة_التأخير] مللي ثانية. اشرح الكود سطرًا بسطر.", "instructions": "أدخل رقم المنفذ المتصل به المصباح ومدة التأخير المفضلة."}'::jsonb),
('iot-lab-prompt-battery-monitor', 'iot-lab', 'prompt', 'draft', false, 30, 'إنترنت الأشياء', 'مراقبة مستوى البطارية', 'Battery Level Monitor', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "اكتب برنامجًا لأردوينو لقراءة الجهد من بطارية [نوع_البطارية] متصلة عبر مقسم جهد بالمنفذ [رقم_المنفذ_التناظري] وعرض نسبة الشحن المتبقية.", "instructions": "حدد نوع البطارية ورقم المنفذ التناظري المستخدم."}'::jsonb),
('iot-lab-prompt-button-debounce', 'iot-lab', 'prompt', 'draft', false, 40, 'إنترنت الأشياء', 'قراءة حالة زر مع تفادي الارتداد (Debounce)', 'Button Reading with Debounce', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "قم بكتابة كود لقراءة حالة زر ضاغط متصل بالمنفذ [رقم_المنفذ] بشكل صحيح دون مشكلة الارتداد (Debouncing)، واستخدامه لتغيير حالة متغير.", "instructions": "حدد رقم المنفذ المتصل به الزر."}'::jsonb),
('iot-lab-prompt-calibrate-sensor', 'iot-lab', 'prompt', 'draft', false, 50, 'إنترنت الأشياء', 'معايرة مستشعر', 'Calibrate Sensor', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "كيف أستطيع معايرة مستشعر درجة الحرارة LM35 ليعطي قراءات دقيقة؟", "instructions": "اشرح الخطوات الرياضية المطلوبة لتحويل الإشارة التماثلية إلى درجة مئوية."}'::jsonb),
('iot-lab-prompt-dht11-sensor', 'iot-lab', 'prompt', 'draft', false, 60, 'إنترنت الأشياء', 'قراءة بيانات حساس DHT11', 'DHT11 Sensor Reading', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "أريد كود لاستخدام حساس الحرارة والرطوبة DHT11 مع [نوع_اللوحة] لعرض درجة الحرارة بالدرجة المئوية والرطوبة بالنسبة المئوية كل [ثواني] ثانية.", "instructions": "حدد نوع اللوحة (أردوينو أو ESP32) والفاصل الزمني بين القراءات."}'::jsonb),
('iot-lab-prompt-esp32-vs-arduino', 'iot-lab', 'prompt', 'draft', false, 70, 'إنترنت الأشياء', 'مقارنة بين إي إس بي وأردوينو', 'Esp32 Vs Arduino', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "ما الفرق بين لوحة الأردوينو أونو ولوحة ESP32، ومتى أستخدم كل منهما؟", "instructions": "قدم مقارنة تشمل التكلفة، الاتصال بالإنترنت، وقوة المعالجة."}'::jsonb),
('iot-lab-prompt-esp32-webserver', 'iot-lab', 'prompt', 'draft', false, 80, 'إنترنت الأشياء', 'إنشاء خادم ويب بسيط بـ ESP32', 'Simple ESP32 Webserver', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "اكتب كود لجعل لوحة ESP32 تعمل كخادم ويب يعرض صفحة HTML بسيطة تحتوي على زر لتشغيل وإطفاء LED متصل بالمنفذ [رقم_المنفذ].", "instructions": "حدد رقم المنفذ المتصل به الـ LED."}'::jsonb),
('iot-lab-prompt-esp32-wifi', 'iot-lab', 'prompt', 'draft', false, 90, 'إنترنت الأشياء', 'إعداد اتصال Wi-Fi في ESP32', 'ESP32 Wi-Fi Setup', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "قم بكتابة كود لربط لوحة ESP32 بشبكة Wi-Fi باسم (SSID) [اسم_الشبكة] وكلمة مرور [كلمة_المرور]، مع طباعة عنوان IP عند نجاح الاتصال.", "instructions": "قدم اسم الشبكة وكلمة المرور الخاصة بها."}'::jsonb),
('iot-lab-prompt-explain-pwm', 'iot-lab', 'prompt', 'draft', false, 100, 'إنترنت الأشياء', 'شرح تقنية PWM', 'Explain Pwm', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "اشرح كيف تعمل تقنية تعديل عرض النبضة (PWM) وكيف يمكنني استخدامها لتخفيت إضاءة LED.", "instructions": "استخدم لغة سهلة مع تقديم مثال لكود أردوينو بسيط."}'::jsonb),
('iot-lab-prompt-fix-arduino-code', 'iot-lab', 'prompt', 'draft', false, 110, 'إنترنت الأشياء', 'تصحيح كود أردوينو', 'Fix Arduino Code', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "لدي مشكلة في كود الأردوينو التالي، هل يمكنك تصحيحه؟ [أدخل الكود]", "instructions": "قم بشرح الخطأ وكيفية إصلاحه برمجياً."}'::jsonb),
('iot-lab-prompt-i2c-lcd', 'iot-lab', 'prompt', 'draft', false, 120, 'إنترنت الأشياء', 'عرض نص على شاشة LCD ببروتوكول I2C', 'Display Text on I2C LCD', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "أريد كودًا لعرض النص ''[النص_المطلوب]'' على شاشة LCD متصلة بـ [نوع_اللوحة] عبر بروتوكول I2C، مع تحديد عنوان الشاشة [عنوان_I2C].", "instructions": "أدخل النص المطلوب عرضه، ونوع اللوحة، وعنوان شاشة الـ I2C (غالباً 0x27)."}'::jsonb),
('iot-lab-prompt-interrupt-usage', 'iot-lab', 'prompt', 'draft', false, 130, 'إنترنت الأشياء', 'استخدام المقاطعات (Interrupts)', 'Using Interrupts', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "اكتب كودًا يشرح كيفية استخدام المقاطعة الخارجية (External Interrupt) على المنفذ [رقم_منفذ_المقاطعة] لتنفيذ دالة معينة عند تغير حالة المنفذ.", "instructions": "حدد رقم منفذ المقاطعة (مثال: 2 أو 3 في أردوينو أونو)."}'::jsonb),
('iot-lab-prompt-mqtt-publish', 'iot-lab', 'prompt', 'draft', false, 140, 'إنترنت الأشياء', 'نشر بيانات عبر MQTT', 'MQTT Data Publishing', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "اكتب كود للوحة [نوع_اللوحة] للاتصال بوسيط MQTT على العنوان [عنوان_الوسيط] ونشر بيانات درجة الحرارة على الموضوع (Topic) [اسم_الموضوع].", "instructions": "حدد نوع اللوحة (مثل ESP32) وعنوان وسيط MQTT واسم الموضوع."}'::jsonb),
('iot-lab-prompt-pid-controller', 'iot-lab', 'prompt', 'draft', false, 150, 'إنترنت الأشياء', 'تنفيذ متحكم PID بسيط', 'Simple PID Controller Implementation', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "اكتب هيكل كود أساسي لتنفيذ متحكم PID في أردوينو للحفاظ على درجة حرارة عند نقطة مستهدفة [النقطة_المستهدفة] باستخدام حساس وسخان.", "instructions": "حدد النقطة المستهدفة لدرجة الحرارة."}'::jsonb),
('iot-lab-prompt-pwm-led', 'iot-lab', 'prompt', 'draft', false, 160, 'إنترنت الأشياء', 'التحكم في شدة إضاءة LED بـ PWM', 'LED Brightness Control with PWM', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "قم بكتابة برنامج لأردوينو لزيادة وتقليل شدة إضاءة LED متصل بالمنفذ [رقم_المنفذ_PWM] تدريجيًا باستخدام تقنية PWM.", "instructions": "حدد رقم منفذ يدعم PWM (مثل 3, 5, 6, 9, 10, 11 في أردوينو أونو)."}'::jsonb),
('iot-lab-prompt-python-script-rpi', 'iot-lab', 'prompt', 'draft', false, 170, 'إنترنت الأشياء', 'كود بايثون لرازبري باي', 'Python Script Rpi', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "اكتب كود بايثون بسيط لتشغيل وإطفاء LED متصل بدبوس GPIO في رازبري باي.", "instructions": "أضف تعليقات توضيحية على الكود لشرح كل خطوة."}'::jsonb),
('iot-lab-prompt-raspberry-pi-gpio', 'iot-lab', 'prompt', 'draft', false, 180, 'إنترنت الأشياء', 'التحكم في منافذ GPIO في راسبيري باي', 'Raspberry Pi GPIO Control', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "اكتب سكريبت بلغة بايثون لتشغيل وإطفاء جهاز متصل بمنفذ GPIO رقم [رقم_المنفذ] في جهاز راسبيري باي، مع وضع فاصل زمني مقداره [ثواني] ثانية بين التشغيل والإطفاء.", "instructions": "أدخل رقم منفذ GPIO والفاصل الزمني بالثواني."}'::jsonb),
('iot-lab-prompt-relay-module', 'iot-lab', 'prompt', 'draft', false, 190, 'إنترنت الأشياء', 'التحكم في مُرحل (Relay)', 'Relay Module Control', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "اكتب كود لتشغيل مُرحل متصل بالمنفذ [رقم_المنفذ] عندما تصل قراءة حساس الضوء إلى أقل من [قيمة_عتبة].", "instructions": "حدد رقم المنفذ للمرحل وقيمة العتبة لحساس الضوء."}'::jsonb),
('iot-lab-prompt-sd-card-log', 'iot-lab', 'prompt', 'draft', false, 200, 'إنترنت الأشياء', 'تسجيل البيانات على بطاقة SD', 'Data Logging to SD Card', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "اكتب كود لـ [نوع_اللوحة] لحفظ قراءات حساس [نوع_الحساس] في ملف نصي باسم ''[اسم_الملف]'' على بطاقة SD متصلة عبر واجهة SPI.", "instructions": "حدد نوع اللوحة، نوع الحساس، واسم الملف (مثال: data.txt)."}'::jsonb),
('iot-lab-prompt-sensor-read', 'iot-lab', 'prompt', 'draft', false, 210, 'إنترنت الأشياء', 'قراءة حساس تناظري', 'Analog Sensor Reading', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "أحتاج إلى كود أردوينو لقراءة قيم من حساس [نوع_الحساس] متصل بالمنفذ التناظري [رقم_المنفذ]، مع عرض القيم على شاشة Serial Monitor.", "instructions": "حدد نوع الحساس ورقم المنفذ التناظري."}'::jsonb),
('iot-lab-prompt-serial-communication', 'iot-lab', 'prompt', 'draft', false, 220, 'إنترنت الأشياء', 'الاتصال التسلسلي بين لوحتين', 'Serial Communication Between Two Boards', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "قدم كودًا للوحة المرسلة ولوحة المستقبلة لإرسال واستقبال رسالة نصية ''[الرسالة]'' باستخدام الاتصال التسلسلي (UART) بين لوحتي أردوينو.", "instructions": "أدخل الرسالة المراد إرسالها."}'::jsonb),
('iot-lab-prompt-servo-motor', 'iot-lab', 'prompt', 'draft', false, 230, 'إنترنت الأشياء', 'التحكم في محرك سيرفو', 'Servo Motor Control', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "قم بإنشاء كود أردوينو لتحريك محرك سيرفو متصل بالمنفذ [رقم_المنفذ] من الزاوية 0 إلى 180 درجة، ثم العودة إلى 0 مرة أخرى.", "instructions": "حدد رقم المنفذ المتصل به محرك السيرفو."}'::jsonb),
('iot-lab-prompt-setup-raspberry-pi', 'iot-lab', 'prompt', 'draft', false, 240, 'إنترنت الأشياء', 'إعداد رازبري باي', 'Setup Raspberry Pi', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "ما هي الخطوات الأولى لتجهيز جهاز رازبري باي جديد للمرة الأولى؟", "instructions": "اذكر نظام التشغيل الموصى به وكيفية تثبيته وتوصيل الشاشة."}'::jsonb),
('iot-lab-prompt-stepper-motor', 'iot-lab', 'prompt', 'draft', false, 250, 'إنترنت الأشياء', 'التحكم في محرك خطوي (Stepper)', 'Stepper Motor Control', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "أريد كودًا لتشغيل محرك خطوي لإكمال دورة كاملة في اتجاه عقارب الساعة ثم عكس الاتجاه، باستخدام مكتبة Stepper.h والمنفذ [منافذ_التحكم].", "instructions": "حدد المنافذ المستخدمة للتحكم في المحرك (مثال: 8,9,10,11)."}'::jsonb),
('iot-lab-prompt-suggest-iot-project', 'iot-lab', 'prompt', 'draft', false, 260, 'إنترنت الأشياء', 'اقتراح مشروع ذكي', 'Suggest Iot Project', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "اقترح فكرة مشروع إنترنت الأشياء للمبتدئين.", "instructions": "اذكر المكونات المطلوبة وطريقة العمل بشكل مبسط."}'::jsonb),
('iot-lab-prompt-troubleshoot-mqtt', 'iot-lab', 'prompt', 'draft', false, 270, 'إنترنت الأشياء', 'استكشاف أخطاء MQTT', 'Troubleshoot Mqtt', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "جهازي لا يتصل بخادم MQTT، ما هي أهم الخطوات لاستكشاف هذه المشكلة وإصلاحها؟", "instructions": "اذكر أسباب شائعة مثل اسم المستخدم، كلمة المرور، أو مشاكل الشبكة."}'::jsonb),
('iot-lab-prompt-troubleshooting-guide', 'iot-lab', 'prompt', 'draft', false, 280, 'إنترنت الأشياء', 'دليل استكشاف الأخطاء', 'Troubleshooting Guide', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "أواجه مشكلة [وصف_المشكلة] في مشروعي الذي يستخدم [المكونات]. ما هي الخطوات المنهجية لتتبع المشكلة وحلها؟", "instructions": "صف المشكلة التي تواجهها واذكر المكونات المستخدمة."}'::jsonb),
('iot-lab-prompt-ultrasonic-distance', 'iot-lab', 'prompt', 'draft', false, 290, 'إنترنت الأشياء', 'قياس المسافة بحساس الموجات فوق الصوتية', 'Distance Measurement with Ultrasonic Sensor', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "اكتب كود لقياس المسافة بالسنتيمترات باستخدام حساس HC-SR04 المتصل بالمنفذين Trig [منفذ_trig] و Echo [منفذ_echo]، وطباعة النتيجة.", "instructions": "أدخل رقم منفذ Trig ورقم منفذ Echo."}'::jsonb),
('iot-lab-prompt-wire-sensor', 'iot-lab', 'prompt', 'draft', false, 300, 'إنترنت الأشياء', 'توصيل مستشعر', 'Wire Sensor', ARRAY['إنترنت الأشياء', 'prompt']::text[], NULL, '{"prompt_text": "كيف أقوم بتوصيل مستشعر الحركة PIR مع الأردوينو بشكل آمن؟", "instructions": "وضح التوصيلات (الطاقة، الأرضي، إشارة البيانات) وقدم نصيحة للسلامة."}'::jsonb);

-- Insert into iot_resources (30 records)
INSERT INTO iot_resources (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('iot-lab-resource-adafruit-learn', 'iot-lab', 'resource', 'draft', false, 10, 'إنترنت الأشياء', 'منصة تعليم Adafruit', 'Adafruit Learning System', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://learn.adafruit.com/", "description": "مئات الشروحات والمشاريع المفتوحة المصدر للميكروكنترولر والإلكترونيات."}'::jsonb),
('iot-lab-resource-adafruit-tutorials', 'iot-lab', 'resource', 'draft', false, 20, 'إنترنت الأشياء', 'دروس آدافروت التعليمية', 'Adafruit Tutorials', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://learn.adafruit.com/", "description": "مجموعة واسعة من الدروس والمشاريع المبتكرة لتوصيل وبرمجة المستشعرات."}'::jsonb),
('iot-lab-resource-arduino-docs', 'iot-lab', 'resource', 'draft', false, 30, 'إنترنت الأشياء', 'توثيق أردوينو الرسمي', 'Arduino Docs', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://www.arduino.cc/en/Guide", "description": "الدليل الرسمي من أردوينو لتعلم الأساسيات والبدء في بناء المشاريع."}'::jsonb),
('iot-lab-resource-arduino-json', 'iot-lab', 'resource', 'draft', false, 40, 'إنترنت الأشياء', 'مكتبة ArduinoJson', 'ArduinoJson Library', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://arduinojson.org/", "description": "مكتبة مساعدة لتحليل وتكوين كائنات JSON في بيئة الأردوينو بكفاءة."}'::jsonb),
('iot-lab-resource-arduino-reference', 'iot-lab', 'resource', 'draft', false, 50, 'إنترنت الأشياء', 'مرجع لغة أردوينو الرسمي', 'Arduino Language Reference', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://www.arduino.cc/reference/en/", "description": "المرجع الرسمي لجميع دوال ومكتبات لغة البرمجة الخاصة بالأردوينو."}'::jsonb),
('iot-lab-resource-blynk', 'iot-lab', 'resource', 'draft', false, 60, 'إنترنت الأشياء', 'تطبيق ومنصة Blynk', 'Blynk IoT Platform', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://blynk.io/", "description": "منصة لإنشاء واجهات تحكم للهواتف المحمولة للتحكم بمشاريع إنترنت الأشياء."}'::jsonb),
('iot-lab-resource-circuit-basics', 'iot-lab', 'resource', 'draft', false, 70, 'إنترنت الأشياء', 'أساسيات الدوائر الإلكترونية', 'Circuit Basics', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://www.circuitbasics.com/", "description": "موقع تعليمي ممتاز يقدم شروحات مبسطة لتوصيل وبناء الدوائر الإلكترونية."}'::jsonb),
('iot-lab-resource-circuitpython', 'iot-lab', 'resource', 'draft', false, 80, 'إنترنت الأشياء', 'سيركت بايثون', 'CircuitPython', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://circuitpython.org/", "description": "تفرع من مايكروبايثون موجه للمبتدئين ومدعوم بشكل كبير من Adafruit."}'::jsonb),
('iot-lab-resource-datasheet-catalog', 'iot-lab', 'resource', 'draft', false, 160, 'إنترنت الأشياء', 'دليل أوراق البيانات (Datasheets)', 'Datasheets', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://www.alldatasheet.com/", "description": "موقع يوفر أوراق البيانات التقنية الرسمية للمكونات الإلكترونية، والتي تعد ضرورية لمعرفة خصائص الجهد والتيار لأي شريحة."}'::jsonb),
('iot-lab-resource-esp32-datasheet', 'iot-lab', 'resource', 'draft', false, 90, 'إنترنت الأشياء', 'ورقة بيانات ESP32', 'Esp32 Datasheet', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://www.espressif.com/en/products/socs/esp32", "description": "المعلومات التقنية الرسمية والمواصفات الكاملة لمتحكم ESP32."}'::jsonb),
('iot-lab-resource-esp32-idf-docs', 'iot-lab', 'resource', 'draft', false, 100, 'إنترنت الأشياء', 'توثيق ESP-IDF للوحة ESP32', 'ESP-IDF Programming Guide', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://docs.espressif.com/projects/esp-idf/en/latest/esp32/", "description": "التوثيق الرسمي لإطار عمل تطوير إنترنت الأشياء من Espressif."}'::jsonb),
('iot-lab-resource-esphome', 'iot-lab', 'resource', 'draft', false, 110, 'إنترنت الأشياء', 'نظام ESPHome', 'ESPHome', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://esphome.io/", "description": "نظام لإنشاء أجهزة ذكية مخصصة تتكامل بسهولة مع Home Assistant."}'::jsonb),
('iot-lab-resource-fritzing-software', 'iot-lab', 'resource', 'draft', false, 120, 'إنترنت الأشياء', 'برنامج فريتزينج', 'Fritzing Software', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://fritzing.org/", "description": "برنامج مفتوح المصدر لتصميم الدوائر الإلكترونية على ألواح التجارب بشكل مرئي."}'::jsonb),
('iot-lab-resource-fritzing', 'iot-lab', 'resource', 'draft', false, 130, 'إنترنت الأشياء', 'برنامج فريتزينج لتصميم الدوائر', 'Fritzing', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://fritzing.org/", "description": "أداة مفتوحة المصدر لتصميم ورسم وتوثيق الدوائر الإلكترونية للمبتدئين."}'::jsonb),
('iot-lab-resource-home-assistant', 'iot-lab', 'resource', 'draft', false, 140, 'إنترنت الأشياء', 'المساعد المنزلي (Home Assistant)', 'Home Assistant', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://www.home-assistant.io/", "description": "نظام تشغيل مركزي مفتوح المصدر للتحكم في الأجهزة المنزلية الذكية."}'::jsonb),
('iot-lab-resource-instructables-circuits', 'iot-lab', 'resource', 'draft', false, 150, 'إنترنت الأشياء', 'قسم الدوائر في Instructables', 'Instructables Circuits', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://www.instructables.com/circuits/", "description": "آلاف المشاريع الإلكترونية المرفوعة من قبل مجتمع الصُناع (Makers)."}'::jsonb),
('iot-lab-resource-micropython-guide', 'iot-lab', 'resource', 'draft', false, 180, 'إنترنت الأشياء', 'دليل مايكروبايثون', 'Micropython Guide', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://micropython.org/", "description": "الموقع الرسمي لمايكروبايثون، لغة البايثون المخصصة للعمل على المتحكمات الدقيقة."}'::jsonb),
('iot-lab-resource-micropython', 'iot-lab', 'resource', 'draft', false, 190, 'إنترنت الأشياء', 'مايكروبايثون', 'MicroPython', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://micropython.org/", "description": "نسخة مصغرة من لغة بايثون مصممة للعمل على المتحكمات الدقيقة."}'::jsonb),
('iot-lab-resource-mosquitto', 'iot-lab', 'resource', 'draft', false, 200, 'إنترنت الأشياء', 'وسيط إكليبس موسكيتو (Eclipse Mosquitto)', 'Eclipse Mosquitto', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://mosquitto.org/", "description": "وسيط رسائل مفتوح المصدر يدعم بروتوكول MQTT."}'::jsonb),
('iot-lab-resource-mqtt-org', 'iot-lab', 'resource', 'draft', false, 210, 'إنترنت الأشياء', 'الموقع الرسمي لبروتوكول MQTT', 'MQTT.org', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://mqtt.org/", "description": "الموقع الرسمي لبروتوكول MQTT يحتوي على المواصفات والتوثيق."}'::jsonb),
('iot-lab-resource-mqtt-spec', 'iot-lab', 'resource', 'draft', false, 220, 'إنترنت الأشياء', 'مواصفات بروتوكول MQTT', 'Mqtt Spec', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://mqtt.org/", "description": "الموقع الرسمي لبروتوكول MQTT الذي يحتوي على التعريفات وآليات العمل."}'::jsonb),
('iot-lab-resource-pinout-xyz', 'iot-lab', 'resource', 'draft', false, 230, 'إنترنت الأشياء', 'دليل منافذ راسبيري باي', 'Raspberry Pi Pinout', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://pinout.xyz/", "description": "دليل تفاعلي يوضح وظائف منافذ GPIO الخاصة بجميع إصدارات راسبيري باي."}'::jsonb),
('iot-lab-resource-random-nerd-tutorials', 'iot-lab', 'resource', 'draft', false, 240, 'إنترنت الأشياء', 'شروحات Random Nerd Tutorials', 'Random Nerd Tutorials', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://randomnerdtutorials.com/", "description": "موقع ممتاز للمشاريع المتقدمة الخاصة بلوحات ESP32 و ESP8266."}'::jsonb),
('iot-lab-resource-raspberry-pi-docs', 'iot-lab', 'resource', 'draft', false, 250, 'إنترنت الأشياء', 'توثيق راسبيري باي', 'Raspberry Pi Documentation', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://www.raspberrypi.com/documentation/", "description": "أدلة المستخدم والتفاصيل التقنية لأجهزة ونظام تشغيل راسبيري باي."}'::jsonb),
('iot-lab-resource-rpi-guide', 'iot-lab', 'resource', 'draft', false, 260, 'إنترنت الأشياء', 'دليل البدء مع رازبري باي', 'Rpi Guide', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://www.raspberrypi.com/documentation/", "description": "الوثائق الرسمية لرازبري باي والتي تشمل الإعداد والبرمجة والمشاريع."}'::jsonb),
('iot-lab-resource-sparkfun-tutorials', 'iot-lab', 'resource', 'draft', false, 270, 'إنترنت الأشياء', 'دروس سبارك فن', 'SparkFun Tutorials', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://learn.sparkfun.com/", "description": "دروس تعليمية تغطي أساسيات الإلكترونيات وحتى المشاريع المعقدة."}'::jsonb),
('iot-lab-resource-thingspeak', 'iot-lab', 'resource', 'draft', false, 280, 'إنترنت الأشياء', 'منصة ThingSpeak لإنترنت الأشياء', 'ThingSpeak IoT Platform', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://thingspeak.com/", "description": "منصة لجمع وتحليل البيانات الخاصة بإنترنت الأشياء مدعومة من MATLAB."}'::jsonb),
('iot-lab-resource-tinkercad-circuits-2', 'iot-lab', 'resource', 'draft', false, 290, 'إنترنت الأشياء', 'محاكي الدوائر من Tinkercad', 'Tinkercad Circuits', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://www.tinkercad.com/circuits", "description": "أداة مجانية لمحاكاة دوائر الأردوينو والإلكترونيات الأساسية على المتصفح."}'::jsonb),
('iot-lab-resource-tinkercad-circuits', 'iot-lab', 'resource', 'draft', false, 170, 'إنترنت الأشياء', 'محاكي الدوائر Tinkercad', '', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://www.tinkercad.com/circuits", "description": "أداة مجانية من أوتوديسك لمحاكاة دوائر الأردوينو والإلكترونيات برمجياً قبل بنائها في الواقع، مما يحمي القطع من التلف."}'::jsonb),
('iot-lab-resource-wokwi', 'iot-lab', 'resource', 'draft', false, 300, 'إنترنت الأشياء', 'محاكي Wokwi', 'Wokwi Simulator', ARRAY['إنترنت الأشياء', 'resource']::text[], NULL, '{"url": "https://wokwi.com/", "description": "محاكي إلكترونيات عبر الإنترنت يدعم الأردوينو و ESP32 ومايكروبايثون."}'::jsonb);

-- Insert into language_glossary (50 records)
INSERT INTO language_glossary (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('language-glossary-accuracy', 'language', 'glossary', 'draft', false, 10, 'تعلم اللغات', 'الدقة', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "استخدام القواعد والمفردات بشكل صحيح.", "example": "Accuracy is important in formal writing."}'::jsonb),
('language-glossary-active-listening', 'language', 'glossary', 'draft', false, 20, 'تعلم اللغات', 'الاستماع النشط', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "التركيز الكامل على المتحدث لفهم المعنى وتفاصيل النطق.", "example": "Active listening improves comprehension."}'::jsonb),
('language-glossary-ai-language-coach', 'language', 'glossary', 'draft', false, 30, 'تعلم اللغات', 'مدرب اللغة الذكي', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "استخدام الذكاء الاصطناعي لممارسة المحادثة وتلقي الملاحظات.", "example": "ChatGPT can act as an AI language coach."}'::jsonb),
('language-glossary-cefr-a1', 'language', 'glossary', 'draft', false, 40, 'تعلم اللغات', 'مستوى A1', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "المستوى المبتدئ في الإطار الأوروبي المرجعي.", "example": "I am a beginner."}'::jsonb),
('language-glossary-cefr-a2', 'language', 'glossary', 'draft', false, 50, 'تعلم اللغات', 'مستوى A2', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "المستوى الأساسي.", "example": "I can understand simple sentences."}'::jsonb),
('language-glossary-cefr-b1', 'language', 'glossary', 'draft', false, 60, 'تعلم اللغات', 'مستوى B1', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "المستوى المتوسط.", "example": "I can describe experiences and events."}'::jsonb),
('language-glossary-cefr-b2', 'language', 'glossary', 'draft', false, 70, 'تعلم اللغات', 'مستوى B2', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "المستوى فوق المتوسط.", "example": "I can understand the main ideas of complex text."}'::jsonb),
('language-glossary-cefr-c1', 'language', 'glossary', 'draft', false, 80, 'تعلم اللغات', 'مستوى C1', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "المستوى المتقدم.", "example": "I can express ideas fluently and spontaneously."}'::jsonb),
('language-glossary-cefr-c2', 'language', 'glossary', 'draft', false, 90, 'تعلم اللغات', 'مستوى C2', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "المستوى المتقن.", "example": "I can understand with ease virtually everything heard or read."}'::jsonb),
('language-glossary-chunking', 'language', 'glossary', 'draft', false, 100, 'تعلم اللغات', 'تجميع الكلمات', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "تعلم العبارات ككتلة واحدة بدلاً من كلمات منفصلة.", "example": "Chunking helps you speak faster."}'::jsonb),
('language-glossary-collocation', 'language', 'glossary', 'draft', false, 110, 'تعلم اللغات', 'المتلازمات اللفظية', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "كلمات تأتي معاً بشكل طبيعي في اللغة.", "example": "Make a mistake is a collocation."}'::jsonb),
('language-glossary-comprehensible-input', 'language', 'glossary', 'draft', false, 120, 'تعلم اللغات', 'المدخلات المفهومة', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "نصوص أو مقاطع صوتية تفهم معظمها ولكن تحتوي على تحدي بسيط.", "example": "Reading graded readers is comprehensible input."}'::jsonb),
('language-glossary-fluency', 'language', 'glossary', 'draft', false, 130, 'تعلم اللغات', 'الطلاقة', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "القدرة على التحدث بسلاسة وبدون توقف متكرر.", "example": "She speaks English with great fluency."}'::jsonb),
('language-glossary-glossary-1', 'language', 'glossary', 'draft', false, 140, 'تعلم اللغات', 'مصطلح Glossary 1', 'Glossary 1', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "الإطار المرجعي الأوروبي المشترك للغات", "example": "يستخدم لتقييم مستوى اللغة."}'::jsonb),
('language-glossary-glossary-10', 'language', 'glossary', 'draft', false, 150, 'تعلم اللغات', 'مصطلح Glossary 10', 'Glossary 10', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "الدقة", "example": "استخدام اللغة بدون أخطاء."}'::jsonb),
('language-glossary-glossary-11', 'language', 'glossary', 'draft', false, 160, 'تعلم اللغات', 'مصطلح Glossary 11', 'Glossary 11', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "مصطلح", "example": "تعبير لا يمكن فهمه من معاني الكلمات المنفردة."}'::jsonb),
('language-glossary-glossary-12', 'language', 'glossary', 'draft', false, 170, 'تعلم اللغات', 'مصطلح Glossary 12', 'Glossary 12', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "فعل مركب", "example": "فعل يتكون من فعل وحرف جر."}'::jsonb),
('language-glossary-glossary-13', 'language', 'glossary', 'draft', false, 180, 'تعلم اللغات', 'مصطلح Glossary 13', 'Glossary 13', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "مرادف", "example": "كلمة لها نفس المعنى."}'::jsonb),
('language-glossary-glossary-14', 'language', 'glossary', 'draft', false, 190, 'تعلم اللغات', 'مصطلح Glossary 14', 'Glossary 14', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "مضاد", "example": "كلمة لها معنى معاكس."}'::jsonb),
('language-glossary-glossary-15', 'language', 'glossary', 'draft', false, 200, 'تعلم اللغات', 'مصطلح Glossary 15', 'Glossary 15', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "بادئة", "example": "حروف تضاف في بداية الكلمة."}'::jsonb),
('language-glossary-glossary-16', 'language', 'glossary', 'draft', false, 210, 'تعلم اللغات', 'مصطلح Glossary 16', 'Glossary 16', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "لاحقة", "example": "حروف تضاف في نهاية الكلمة."}'::jsonb),
('language-glossary-glossary-17', 'language', 'glossary', 'draft', false, 220, 'تعلم اللغات', 'مصطلح Glossary 17', 'Glossary 17', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "مقطع لفظي", "example": "جزء من الكلمة يحتوي على صوت متحرك."}'::jsonb),
('language-glossary-glossary-18', 'language', 'glossary', 'draft', false, 230, 'تعلم اللغات', 'مصطلح Glossary 18', 'Glossary 18', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "حرف متحرك", "example": "الحروف a, e, i, o, u."}'::jsonb),
('language-glossary-glossary-19', 'language', 'glossary', 'draft', false, 240, 'تعلم اللغات', 'مصطلح Glossary 19', 'Glossary 19', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "حرف ساكن", "example": "باقي الحروف الأبجدية."}'::jsonb),
('language-glossary-glossary-2', 'language', 'glossary', 'draft', false, 250, 'تعلم اللغات', 'مصطلح Glossary 2', 'Glossary 2', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "المفردات", "example": "زيادة المفردات تساعد في التحدث بطلاقة."}'::jsonb),
('language-glossary-glossary-20', 'language', 'glossary', 'draft', false, 260, 'تعلم اللغات', 'مصطلح Glossary 20', 'Glossary 20', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "التنغيم", "example": "ارتفاع وانخفاض الصوت عند التحدث."}'::jsonb),
('language-glossary-glossary-3', 'language', 'glossary', 'draft', false, 270, 'تعلم اللغات', 'مصطلح Glossary 3', 'Glossary 3', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "القواعد", "example": "القواعد السليمة تمنع سوء الفهم."}'::jsonb),
('language-glossary-glossary-4', 'language', 'glossary', 'draft', false, 280, 'تعلم اللغات', 'مصطلح Glossary 4', 'Glossary 4', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "النطق", "example": "النطق الصحيح يسهل التواصل."}'::jsonb),
('language-glossary-glossary-5', 'language', 'glossary', 'draft', false, 290, 'تعلم اللغات', 'مصطلح Glossary 5', 'Glossary 5', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "الاستماع", "example": "مهارة أساسية لفهم المتحدثين الأصليين."}'::jsonb),
('language-glossary-glossary-6', 'language', 'glossary', 'draft', false, 300, 'تعلم اللغات', 'مصطلح Glossary 6', 'Glossary 6', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "التحدث", "example": "التدرب على التحدث يوميا يحسن الثقة."}'::jsonb),
('language-glossary-glossary-7', 'language', 'glossary', 'draft', false, 310, 'تعلم اللغات', 'مصطلح Glossary 7', 'Glossary 7', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "الكتابة", "example": "كتابة فقرات واضحة مهارة مهمة."}'::jsonb),
('language-glossary-glossary-8', 'language', 'glossary', 'draft', false, 320, 'تعلم اللغات', 'مصطلح Glossary 8', 'Glossary 8', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "القراءة", "example": "قراءة المقالات الإنجليزية توسع المدارك."}'::jsonb),
('language-glossary-glossary-9', 'language', 'glossary', 'draft', false, 330, 'تعلم اللغات', 'مصطلح Glossary 9', 'Glossary 9', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "الطلاقة", "example": "القدرة على التحدث بسهولة ودون توقف."}'::jsonb),
('language-glossary-grammar-in-context', 'language', 'glossary', 'draft', false, 340, 'تعلم اللغات', 'القواعد في السياق', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "فهم القواعد من خلال النصوص والاستخدام الفعلي.", "example": "Read stories to learn grammar in context."}'::jsonb),
('language-glossary-idiom', 'language', 'glossary', 'draft', false, 350, 'تعلم اللغات', 'المصطلح', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "تعبير لا يمكن فهم معناه من الكلمات الفردية.", "example": "It''s raining cats and dogs."}'::jsonb),
('language-glossary-immersion', 'language', 'glossary', 'draft', false, 360, 'تعلم اللغات', 'الانغماس', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "إحاطة نفسك باللغة الهدف في كل جوانب حياتك.", "example": "Immersion accelerates learning."}'::jsonb),
('language-glossary-intonation', 'language', 'glossary', 'draft', false, 370, 'تعلم اللغات', 'التنغيم', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "ارتفاع وانخفاض الصوت أثناء الكلام للتعبير عن المعنى أو المشاعر.", "example": "A rising intonation is used for questions."}'::jsonb),
('language-glossary-language-acquisition', 'language', 'glossary', 'draft', false, 380, 'تعلم اللغات', 'اكتساب اللغة', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "التعلم الطبيعي واللاواعي للغة.", "example": "Children show rapid language acquisition."}'::jsonb),
('language-glossary-language-exchange', 'language', 'glossary', 'draft', false, 390, 'تعلم اللغات', 'تبادل اللغات', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "ممارسة اللغة مع متحدث أصلي يتعلم لغتك.", "example": "I met a language exchange partner online."}'::jsonb),
('language-glossary-language-learning', 'language', 'glossary', 'draft', false, 400, 'تعلم اللغات', 'تعلم اللغة', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "الدراسة الواعية للقواعد والمفردات.", "example": "Language learning requires active effort."}'::jsonb),
('language-glossary-minimal-pairs', 'language', 'glossary', 'draft', false, 410, 'تعلم اللغات', 'الأزواج الدنيا', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "كلمتان تختلفان في صوت واحد فقط، تستخدم للتدريب على النطق.", "example": "Ship and sheep are minimal pairs."}'::jsonb),
('language-glossary-mother-tongue-interference', 'language', 'glossary', 'draft', false, 420, 'تعلم اللغات', 'تأثير اللغة الأم', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "تأثير قواعد ونطق اللغة الأم على اللغة المتعلمة.", "example": "Translating directly causes mother tongue interference."}'::jsonb),
('language-glossary-passive-listening', 'language', 'glossary', 'draft', false, 430, 'تعلم اللغات', 'الاستماع السلبي', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "الاستماع للغة في الخلفية دون تركيز كامل.", "example": "Passive listening helps get used to the sounds."}'::jsonb),
('language-glossary-phrasal-verb', 'language', 'glossary', 'draft', false, 440, 'تعلم اللغات', 'الفعل المركب', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "فعل يتكون من فعل وحرف جر أو حال يغير معناه.", "example": "Give up means to stop trying."}'::jsonb),
('language-glossary-pronunciation', 'language', 'glossary', 'draft', false, 450, 'تعلم اللغات', 'النطق', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "طريقة إخراج الأصوات في اللغة.", "example": "Good pronunciation makes you understood."}'::jsonb),
('language-glossary-self-correction', 'language', 'glossary', 'draft', false, 460, 'تعلم اللغات', 'التصحيح الذاتي', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "ملاحظة وتصحيح أخطائك أثناء التحدث أو الكتابة.", "example": "Self-correction is a sign of progress."}'::jsonb),
('language-glossary-shadowing', 'language', 'glossary', 'draft', false, 470, 'تعلم اللغات', 'التظليل (Shadowing)', 'Shadowing', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "تقنية استماع وتكرار فوري لتحسين النطق والإيقاع.", "example": "Shadowing helps with pronunciation."}'::jsonb),
('language-glossary-spaced-repetition', 'language', 'glossary', 'draft', false, 480, 'تعلم اللغات', 'التكرار المتباعد', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "نظام مراجعة المفردات على فترات متباعدة لتثبيتها في الذاكرة.", "example": "Anki uses spaced repetition."}'::jsonb),
('language-glossary-stress', 'language', 'glossary', 'draft', false, 490, 'تعلم اللغات', 'النبر', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "التشديد على مقطع معين في الكلمة أو كلمة في الجملة.", "example": "In ''record'', the stress is on the first syllable for the noun."}'::jsonb),
('language-glossary-vocabulary-in-context', 'language', 'glossary', 'draft', false, 500, 'تعلم اللغات', 'المفردات في السياق', '', ARRAY['تعلم اللغات', 'مصطلحات']::text[], NULL, '{"definition": "تعلم الكلمات من خلال الجمل والمواقف وليس القوائم المنعزلة.", "example": "Learning vocabulary in context is more effective."}'::jsonb);

-- Insert into language_prompts (30 records)
INSERT INTO language_prompts (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('language-prompt-accent-coach', 'language', 'prompt', 'draft', false, 10, 'تعلم اللغات', 'مدرب اللهجات', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "What are the differences in pronouncing [الكلمة] in US vs UK English?", "instructions": "التعرف على الفروق بين اللهجات المختلفة."}'::jsonb),
('language-prompt-cultural-context', 'language', 'prompt', 'draft', false, 20, 'تعلم اللغات', 'السياق الثقافي', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Explain the cultural context behind the phrase [العبارة].", "instructions": "فهم الفروق الثقافية في اللغة."}'::jsonb),
('language-prompt-daily-journal', 'language', 'prompt', 'draft', false, 30, 'تعلم اللغات', 'يومياتي', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Review my daily journal entry and suggest better vocabulary: [اليوميات].", "instructions": "تحسين كتابتك اليومية وتطوير أسلوبك."}'::jsonb),
('language-prompt-debate-opponent', 'language', 'prompt', 'draft', false, 40, 'تعلم اللغات', 'خصم للمناظرة', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Argue against my opinion on [الموضوع]. My opinion is [رأيي].", "instructions": "طور مهارات الإقناع والمناقشة بالإنجليزية."}'::jsonb),
('language-prompt-email-drafter', 'language', 'prompt', 'draft', false, 50, 'تعلم اللغات', 'صائغ الإيميلات', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Help me draft a professional email about [الموضوع] to [المتلقي].", "instructions": "صياغة رسائل بريد إلكتروني احترافية."}'::jsonb),
('language-prompt-grammar-checker', 'language', 'prompt', 'draft', false, 60, 'تعلم اللغات', 'مصحح القواعد', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Correct my grammar and explain the mistakes: [النص].", "instructions": "اكتب نصك ليتم تصحيحه مع الشرح."}'::jsonb),
('language-prompt-idiom-explainer', 'language', 'prompt', 'draft', false, 70, 'تعلم اللغات', 'شارح المصطلحات', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Explain the idiom [المصطلح] and give 3 examples.", "instructions": "فهم المصطلحات الإنجليزية وكيفية استخدامها."}'::jsonb),
('language-prompt-listening-comprehension', 'language', 'prompt', 'draft', false, 80, 'تعلم اللغات', 'فهم المسموع', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Write a short dialogue about [الموضوع] and generate 3 comprehension questions.", "instructions": "تدريب على الفهم من خلال نصوص قصيرة."}'::jsonb),
('language-prompt-paragraph-improver', 'language', 'prompt', 'draft', false, 90, 'تعلم اللغات', 'محسن الفقرات', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Rewrite this paragraph to make it sound more natural and professional: [الفقرة].", "instructions": "تحسين صياغة فقراتك لتصبح طبيعية أكثر."}'::jsonb),
('language-prompt-phrasal-verb-story', 'language', 'prompt', 'draft', false, 100, 'تعلم اللغات', 'قصة الأفعال المركبة', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Write a story focusing on phrasal verbs related to [الموضوع].", "instructions": "تعلم الأفعال المركبة من خلال سياق قصصي."}'::jsonb),
('language-prompt-presentation-prep', 'language', 'prompt', 'draft', false, 110, 'تعلم اللغات', 'التحضير للعروض', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Give me feedback on the opening of my presentation: [مقدمة العرض].", "instructions": "تدرب على إلقاء العروض التقديمية."}'::jsonb),
('language-prompt-prompt-1', 'language', 'prompt', 'draft', false, 120, 'تعلم اللغات', 'ممارسة المحادثة اليومية', 'Prompt 1', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "قم بدور متحدث أصلي للغة الإنجليزية.", "instructions": "ابدأ المحادثة بسؤال بسيط عن يومي."}'::jsonb),
('language-prompt-prompt-10', 'language', 'prompt', 'draft', false, 130, 'تعلم اللغات', 'تكوين الجمل', 'Prompt 10', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "أعطني كلمات عشوائية لأكون منها جملاً.", "instructions": "قم بتصحيح الجمل التي أكتبها."}'::jsonb),
('language-prompt-prompt-2', 'language', 'prompt', 'draft', false, 140, 'تعلم اللغات', 'تدقيق القواعد', 'Prompt 2', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "قم بتصحيح الأخطاء النحوية في النص.", "instructions": "اشرح سبب كل خطأ وكيفية تصحيحه."}'::jsonb),
('language-prompt-prompt-3', 'language', 'prompt', 'draft', false, 150, 'تعلم اللغات', 'توسيع المفردات', 'Prompt 3', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "اقترح كلمات بديلة ومتقدمة.", "instructions": "استبدل الكلمات البسيطة بمرادفاتها المناسبة."}'::jsonb),
('language-prompt-prompt-4', 'language', 'prompt', 'draft', false, 160, 'تعلم اللغات', 'محاكاة مقابلة عمل', 'Prompt 4', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "اطرح أسئلة مقابلة عمل باللغة الإنجليزية.", "instructions": "انتظر إجابتي ثم قدم ملاحظاتك."}'::jsonb),
('language-prompt-prompt-5', 'language', 'prompt', 'draft', false, 170, 'تعلم اللغات', 'التدريب على الاستماع', 'Prompt 5', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "اكتب فقرة قصيرة ثم اطرح أسئلة حولها.", "instructions": "تأكد من تنوع الأسئلة لاختبار الفهم."}'::jsonb),
('language-prompt-prompt-6', 'language', 'prompt', 'draft', false, 180, 'تعلم اللغات', 'شرح المصطلحات', 'Prompt 6', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "اشرح المصطلح الإنجليزي المعطى.", "instructions": "قدم أمثلة على كيفية استخدامه في جمل مفيدة."}'::jsonb),
('language-prompt-prompt-7', 'language', 'prompt', 'draft', false, 190, 'تعلم اللغات', 'ممارسة الكتابة الأكاديمية', 'Prompt 7', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "قم بتقييم مقالي الأكاديمي.", "instructions": "ركز على بنية الجملة والترابط بين الأفكار."}'::jsonb),
('language-prompt-prompt-8', 'language', 'prompt', 'draft', false, 200, 'تعلم اللغات', 'تحسين النطق', 'Prompt 8', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "اقترح كلمات إنجليزية صعبة النطق.", "instructions": "اكتبها مع طريقة نطقها الصحيحة."}'::jsonb),
('language-prompt-prompt-9', 'language', 'prompt', 'draft', false, 210, 'تعلم اللغات', 'تعلم الأفعال المركبة', 'Prompt 9', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "اشرح معنى الفعل المركب.", "instructions": "قدم ثلاثة أمثلة في سياقات مختلفة."}'::jsonb),
('language-prompt-pronunciation-guide', 'language', 'prompt', 'draft', false, 220, 'تعلم اللغات', 'دليل النطق', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "How do I pronounce [الكلمة]? Describe the mouth movements.", "instructions": "تعلم النطق الصحيح للكلمات الصعبة."}'::jsonb),
('language-prompt-reading-summary', 'language', 'prompt', 'draft', false, 230, 'تعلم اللغات', 'ملخص القراءة', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Summarize this article in simple B1 level English: [المقال].", "instructions": "تبسيط المقالات لتناسب مستواك."}'::jsonb),
('language-prompt-roleplay-interview', 'language', 'prompt', 'draft', false, 240, 'تعلم اللغات', 'محاكاة مقابلة عمل', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Conduct a job interview in English for the position of [الوظيفة].", "instructions": "تدرب على مقابلات العمل باللغة الإنجليزية."}'::jsonb),
('language-prompt-slang-translator', 'language', 'prompt', 'draft', false, 250, 'تعلم اللغات', 'مترجم العامية', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Translate this slang phrase into formal English: [العبارة].", "instructions": "تعرف على العامية وما يقابلها رسمياً."}'::jsonb),
('language-prompt-small-talk', 'language', 'prompt', 'draft', false, 260, 'تعلم اللغات', 'أحاديث عابرة', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Let''s practice small talk. Start a conversation about [الموضوع].", "instructions": "التدرب على المحادثات الخفيفة في المواقف الاجتماعية."}'::jsonb),
('language-prompt-speaking-partner', 'language', 'prompt', 'draft', false, 270, 'تعلم اللغات', 'شريك محادثة', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Act as an English speaking partner. Ask me questions about [الموضوع].", "instructions": "تحدث مع الذكاء الاصطناعي كشريك محادثة."}'::jsonb),
('language-prompt-story-generator', 'language', 'prompt', 'draft', false, 280, 'تعلم اللغات', 'مولد القصص', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Write a short story using these vocabulary words: [الكلمات].", "instructions": "قصص قصيرة لتثبيت الكلمات الجديدة."}'::jsonb),
('language-prompt-translation-corrector', 'language', 'prompt', 'draft', false, 290, 'تعلم اللغات', 'مصحح الترجمة', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "I translated this from Arabic: [الترجمة]. How would a native speaker say it?", "instructions": "تجنب الترجمة الحرفية وتحدث كأصحاب اللغة."}'::jsonb),
('language-prompt-vocabulary-expander', 'language', 'prompt', 'draft', false, 300, 'تعلم اللغات', 'موسع المفردات', '', ARRAY['تعلم اللغات', 'prompt']::text[], NULL, '{"prompt_text": "Give me 5 synonyms and antonyms for [الكلمة] with example sentences.", "instructions": "احصل على مرادفات وأضداد للكلمات."}'::jsonb);

-- Insert into language_resources (30 records)
INSERT INTO language_resources (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('language-resource-anki', 'language', 'resource', 'draft', false, 10, 'تعلم اللغات', 'أنكي', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://apps.ankiweb.net/", "description": "برنامج لإنشاء بطاقات استذكار ذكية."}'::jsonb),
('language-resource-bbc-learning-english', 'language', 'resource', 'draft', false, 20, 'تعلم اللغات', 'بي بي سي لتعلم الإنجليزية', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.bbc.co.uk/learningenglish", "description": "مصدر ممتاز للدروس الصوتية والمرئية."}'::jsonb),
('language-resource-breaking-news-english', 'language', 'resource', 'draft', false, 30, 'تعلم اللغات', 'أخبار إنجليزية مبسطة', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://breakingnewsenglish.com/", "description": "دروس مبنية على الأخبار بمستويات قراءة متعددة."}'::jsonb),
('language-resource-british-council', 'language', 'resource', 'draft', false, 40, 'تعلم اللغات', 'المجلس الثقافي البريطاني', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://learnenglish.britishcouncil.org/", "description": "دروس وتدريبات لكافة المستويات."}'::jsonb),
('language-resource-cambridge-dictionary', 'language', 'resource', 'draft', false, 50, 'تعلم اللغات', 'قاموس كامبريدج', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://dictionary.cambridge.org/", "description": "قاموس شامل مع أمثلة ونطق."}'::jsonb),
('language-resource-coursera-english', 'language', 'resource', 'draft', false, 60, 'تعلم اللغات', 'كورسيرا للإنجليزية', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.coursera.org/courses?query=english", "description": "دورات أكاديمية لتحسين اللغة."}'::jsonb),
('language-resource-duolingo', 'language', 'resource', 'draft', false, 70, 'تعلم اللغات', 'دوولينجو', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.duolingo.com/", "description": "تطبيق مشهور للتدريب اليومي."}'::jsonb),
('language-resource-elllo', 'language', 'resource', 'draft', false, 80, 'تعلم اللغات', 'مكتبة الاستماع', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://elllo.org/", "description": "مكتبة ضخمة لمقاطع الاستماع مع نصوص."}'::jsonb),
('language-resource-english-club', 'language', 'resource', 'draft', false, 90, 'تعلم اللغات', 'نادي الإنجليزية', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.englishclub.com/", "description": "موارد شاملة للقواعد والمفردات والمنتديات."}'::jsonb),
('language-resource-engvid', 'language', 'resource', 'draft', false, 100, 'تعلم اللغات', 'إنج فيد', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.engvid.com/", "description": "دروس فيديو مجانية من معلمين ناطقين باللغة."}'::jsonb),
('language-resource-esl-lab', 'language', 'resource', 'draft', false, 110, 'تعلم اللغات', 'مختبر الاستماع', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.esl-lab.com/", "description": "اختبارات استماع مسجلة بمستويات مختلفة."}'::jsonb),
('language-resource-grammarly', 'language', 'resource', 'draft', false, 120, 'تعلم اللغات', 'جرامرلي', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.grammarly.com/", "description": "أداة لتصحيح القواعد والكتابة."}'::jsonb),
('language-resource-memrise', 'language', 'resource', 'draft', false, 130, 'تعلم اللغات', 'ميمرايز', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.memrise.com/", "description": "تطبيق لتعلم المفردات باستخدام التكرار المتباعد."}'::jsonb),
('language-resource-oxford-learners-dictionaries', 'language', 'resource', 'draft', false, 140, 'تعلم اللغات', 'قواميس أكسفورد', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.oxfordlearnersdictionaries.com/", "description": "قاموس موجه لمتعلمي اللغة الإنجليزية."}'::jsonb),
('language-resource-quizlet', 'language', 'resource', 'draft', false, 150, 'تعلم اللغات', 'كويزلت', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://quizlet.com/", "description": "أداة لإنشاء ومراجعة قوائم المفردات."}'::jsonb),
('language-resource-rachel-english', 'language', 'resource', 'draft', false, 160, 'تعلم اللغات', 'راشيل إنجليش', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://rachelsenglish.com/", "description": "قناة وموقع ممتاز لتعلم النطق الأمريكي."}'::jsonb),
('language-resource-resource-1', 'language', 'resource', 'draft', false, 170, 'تعلم اللغات', 'مورد Resource 1', 'Resource 1', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.bbc.co.uk/learningenglish", "description": "موقع ممتاز لتحسين مهارات الاستماع والقراءة."}'::jsonb),
('language-resource-resource-10', 'language', 'resource', 'draft', false, 180, 'تعلم اللغات', 'مورد Resource 10', 'Resource 10', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.engvid.com", "description": "دروس فيديو مجانية من معلمين ناطقين باللغة الإنجليزية."}'::jsonb),
('language-resource-resource-2', 'language', 'resource', 'draft', false, 190, 'تعلم اللغات', 'مورد Resource 2', 'Resource 2', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://dictionary.cambridge.org", "description": "قاموس إنجليزي موثوق مع أمثلة ونطق."}'::jsonb),
('language-resource-resource-3', 'language', 'resource', 'draft', false, 200, 'تعلم اللغات', 'مورد Resource 3', 'Resource 3', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.duolingo.com", "description": "تطبيق مجاني لتعلم الأساسيات بطريقة ممتعة."}'::jsonb),
('language-resource-resource-4', 'language', 'resource', 'draft', false, 210, 'تعلم اللغات', 'مورد Resource 4', 'Resource 4', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.ted.com", "description": "مقاطع فيديو ملهمة لتحسين مهارة الاستماع."}'::jsonb),
('language-resource-resource-5', 'language', 'resource', 'draft', false, 220, 'تعلم اللغات', 'مورد Resource 5', 'Resource 5', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.cambridge.org", "description": "كتاب مرجعي رائع للقواعد."}'::jsonb),
('language-resource-resource-6', 'language', 'resource', 'draft', false, 230, 'تعلم اللغات', 'مورد Resource 6', 'Resource 6', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.oxfordlearnersdictionaries.com", "description": "قاموس ممتاز للمتعلمين مع شروحات مبسطة."}'::jsonb),
('language-resource-resource-7', 'language', 'resource', 'draft', false, 240, 'تعلم اللغات', 'مورد Resource 7', 'Resource 7', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.coursera.org", "description": "دورة مجانية لتحسين الإنجليزية لأغراض العمل."}'::jsonb),
('language-resource-resource-8', 'language', 'resource', 'draft', false, 250, 'تعلم اللغات', 'مورد Resource 8', 'Resource 8', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://learnenglish.britishcouncil.org", "description": "موارد تعليمية مجانية للطلاب من جميع المستويات."}'::jsonb),
('language-resource-resource-9', 'language', 'resource', 'draft', false, 260, 'تعلم اللغات', 'مورد Resource 9', 'Resource 9', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://rachelsenglish.com", "description": "قناة يوتيوب ممتازة لتحسين النطق الأمريكي."}'::jsonb),
('language-resource-talk-english', 'language', 'resource', 'draft', false, 270, 'تعلم اللغات', 'تحدث الإنجليزية', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.talkenglish.com/", "description": "دروس محادثة ونطق وتدريبات استماع."}'::jsonb),
('language-resource-ted-talks', 'language', 'resource', 'draft', false, 280, 'تعلم اللغات', 'محادثات تيد', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://www.ted.com/", "description": "محاضرات ملهمة مفيدة للاستماع المتقدم."}'::jsonb),
('language-resource-voa-learning-english', 'language', 'resource', 'draft', false, 290, 'تعلم اللغات', 'صوت أمريكا - تعلم الإنجليزية', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://learningenglish.voanews.com/", "description": "أخبار ومقالات بلغة مبسطة."}'::jsonb),
('language-resource-youglish', 'language', 'resource', 'draft', false, 300, 'تعلم اللغات', 'يوجليش', '', ARRAY['تعلم اللغات', 'resource']::text[], NULL, '{"url": "https://youglish.com/", "description": "ابحث عن نطق أي كلمة في سياقات حقيقية على يوتيوب."}'::jsonb);

-- Insert into language_lessons (20 records)
INSERT INTO language_lessons (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES
('language-lesson-active-vs-passive-listening', 'language', 'lesson', 'draft', false, 10, 'تعلم اللغات', 'الاستماع النشط مقابل السلبي', 'Active vs. Passive Listening', ARRAY['تعلم اللغات', 'lesson']::text[], '# الاستماع النشط مقابل السلبي

الفرق بين النوعين وكيف توظف كل منهما لرفع كفاءة فهمك للمسموع.', '{}'::jsonb),
('language-lesson-conversation-practice', 'language', 'lesson', 'draft', false, 20, 'تعلم اللغات', 'التدريب الفعال على المحادثة', 'Effective Conversation Practice', ARRAY['تعلم اللغات', 'lesson']::text[], '# التدريب الفعال على المحادثة

كيف تجد شركاء لغة وكيف تدير محادثة ناجحة لتعظيم الاستفادة.', '{}'::jsonb),
('language-lesson-grammar-in-context-2', 'language', 'lesson', 'draft', false, 30, 'تعلم اللغات', 'تعلم القواعد من السياق', 'Learning Grammar in Context', ARRAY['تعلم اللغات', 'lesson']::text[], '# تعلم القواعد من السياق

توقف عن حفظ القواعد وابدأ في استيعابها من خلال القراءة والاستماع.', '{}'::jsonb),
('language-lesson-how-to-start-speaking', 'language', 'lesson', 'draft', false, 40, 'تعلم اللغات', 'كيف تبدأ التحدث بثقة', 'How to Start Speaking with Confidence', ARRAY['تعلم اللغات', 'lesson']::text[], '# كيف تبدأ التحدث بثقة

نصائح عملية للتغلب على حاجز الخوف والبدء بالمحادثة فوراً.', '{}'::jsonb),
('language-lesson-interview-english', 'language', 'lesson', 'draft', false, 50, 'تعلم اللغات', 'لغة المقابلات الشخصية', 'English for Job Interviews', ARRAY['تعلم اللغات', 'lesson']::text[], '# لغة المقابلات الشخصية

أهم العبارات والأسئلة الشائعة في مقابلات العمل وكيفية الإجابة عنها بثقة.', '{}'::jsonb),
('language-lesson-introduction-to-cefr', 'language', 'lesson', 'draft', false, 60, 'تعلم اللغات', 'مقدمة عن مستويات CEFR', 'Introduction to CEFR Levels', ARRAY['تعلم اللغات', 'lesson']::text[], '# مقدمة عن مستويات CEFR

شرح تفصيلي لمستويات اللغة الأوروبية المرجعية وكيف تحدد مستواك.', '{}'::jsonb),
('language-lesson-lesson-1', 'language', 'lesson', 'draft', false, 70, 'تعلم اللغات', 'مقدمة إلى مستويات CEFR', 'Lesson 1', ARRAY['تعلم اللغات', 'lesson']::text[], 'مرحباً بك في هذا الدرس حول مقدمة إلى مستويات CEFR.

كيف تحدد مستواك في اللغة الإنجليزية وماذا تعني المستويات من A1 إلى C2.

نأمل أن تستفيد من هذه النصائح في رحلتك لتعلم اللغة الإنجليزية.', '{}'::jsonb),
('language-lesson-lesson-2', 'language', 'lesson', 'draft', false, 80, 'تعلم اللغات', 'أساسيات المحادثة', 'Lesson 2', ARRAY['تعلم اللغات', 'lesson']::text[], 'مرحباً بك في هذا الدرس حول أساسيات المحادثة.

تعلم كيفية تقديم نفسك وإجراء محادثات بسيطة في الحياة اليومية.

نأمل أن تستفيد من هذه النصائح في رحلتك لتعلم اللغة الإنجليزية.', '{}'::jsonb),
('language-lesson-lesson-3', 'language', 'lesson', 'draft', false, 90, 'تعلم اللغات', 'كيف تكتب فقرة إنجليزية واضحة', 'Lesson 3', ARRAY['تعلم اللغات', 'lesson']::text[], 'مرحباً بك في هذا الدرس حول كيف تكتب فقرة إنجليزية واضحة.

خطوات بسيطة لكتابة فقرة متماسكة (Topic sentence, Supporting sentences, Concluding sentence).

نأمل أن تستفيد من هذه النصائح في رحلتك لتعلم اللغة الإنجليزية.', '{}'::jsonb),
('language-lesson-lesson-4', 'language', 'lesson', 'draft', false, 100, 'تعلم اللغات', 'تحسين مهارة الاستماع', 'Lesson 4', ARRAY['تعلم اللغات', 'lesson']::text[], 'مرحباً بك في هذا الدرس حول تحسين مهارة الاستماع.

نصائح عملية لفهم المتحدثين الأصليين وكيفية التعامل مع اللهجات المختلفة.

نأمل أن تستفيد من هذه النصائح في رحلتك لتعلم اللغة الإنجليزية.', '{}'::jsonb),
('language-lesson-lesson-5', 'language', 'lesson', 'draft', false, 110, 'تعلم اللغات', 'نظام فعال لحفظ المفردات', 'Lesson 5', ARRAY['تعلم اللغات', 'lesson']::text[], 'مرحباً بك في هذا الدرس حول نظام فعال لحفظ المفردات.

استراتيجيات لتذكر الكلمات الجديدة لفترة طويلة باستخدام التكرار المتباعد (Spaced Repetition).

نأمل أن تستفيد من هذه النصائح في رحلتك لتعلم اللغة الإنجليزية.', '{}'::jsonb),
('language-lesson-lesson-6', 'language', 'lesson', 'draft', false, 120, 'تعلم اللغات', 'الذكاء الاصطناعي كمدرب لغوي', 'Lesson 6', ARRAY['تعلم اللغات', 'lesson']::text[], 'مرحباً بك في هذا الدرس حول الذكاء الاصطناعي كمدرب لغوي.

كيفية استخدام أدوات الذكاء الاصطناعي لممارسة المحادثة وتصحيح الأخطاء الكتابية.

نأمل أن تستفيد من هذه النصائح في رحلتك لتعلم اللغة الإنجليزية.', '{}'::jsonb),
('language-lesson-mastering-shadowing', 'language', 'lesson', 'draft', false, 130, 'تعلم اللغات', 'إتقان تقنية التظليل', 'Mastering the Shadowing Technique', ARRAY['تعلم اللغات', 'lesson']::text[], '# إتقان تقنية التظليل

خطوات عملية لاستخدام تقنية التظليل لتحسين النطق بشكل جذري.', '{}'::jsonb),
('language-lesson-perfecting-pronunciation', 'language', 'lesson', 'draft', false, 140, 'تعلم اللغات', 'تحسين النطق والأصوات', 'Perfecting Pronunciation and Sounds', ARRAY['تعلم اللغات', 'lesson']::text[], '# تحسين النطق والأصوات

التركيز على الأصوات الصعبة للناطقين بالعربية وتدريبات للتغلب عليها.', '{}'::jsonb),
('language-lesson-self-correction-techniques', 'language', 'lesson', 'draft', false, 150, 'تعلم اللغات', 'تقنيات التصحيح الذاتي', 'Self-Correction Techniques', ARRAY['تعلم اللغات', 'lesson']::text[], '# تقنيات التصحيح الذاتي

كيف تلاحظ أخطاءك أثناء الكلام وتصححها لتحسين دقة لغتك.', '{}'::jsonb),
('language-lesson-stop-translating', 'language', 'lesson', 'draft', false, 160, 'تعلم اللغات', 'توقف عن الترجمة في عقلك', 'Stop Translating in Your Head', ARRAY['تعلم اللغات', 'lesson']::text[], '# توقف عن الترجمة في عقلك

استراتيجيات للتفكير باللغة الإنجليزية مباشرة بدلاً من الترجمة من العربية.', '{}'::jsonb),
('language-lesson-using-ai-coaches', 'language', 'lesson', 'draft', false, 170, 'تعلم اللغات', 'استخدام الذكاء الاصطناعي كمدرب', 'Using AI as a Language Coach', ARRAY['تعلم اللغات', 'lesson']::text[], '# استخدام الذكاء الاصطناعي كمدرب

طرق فعالة لاستخدام ChatGPT وأدوات الذكاء الاصطناعي لتحسين لغتك.', '{}'::jsonb),
('language-lesson-vocabulary-systems', 'language', 'lesson', 'draft', false, 180, 'تعلم اللغات', 'بناء نظام فعال للمفردات', 'Building an Effective Vocabulary System', ARRAY['تعلم اللغات', 'lesson']::text[], '# بناء نظام فعال للمفردات

كيفية استخدام تطبيقات مثل Anki لتذكر الكلمات للأبد.', '{}'::jsonb),
('language-lesson-weekly-progress-tracking', 'language', 'lesson', 'draft', false, 190, 'تعلم اللغات', 'تتبع التقدم الأسبوعي', 'Weekly Progress Tracking', ARRAY['تعلم اللغات', 'lesson']::text[], '# تتبع التقدم الأسبوعي

كيفية قياس تطورك في اللغة الإنجليزية بشكل دوري وموضوعي.', '{}'::jsonb),
('language-lesson-writing-clear-paragraphs', 'language', 'lesson', 'draft', false, 200, 'تعلم اللغات', 'كتابة فقرات إنجليزية واضحة', 'Writing Clear English Paragraphs', ARRAY['تعلم اللغات', 'lesson']::text[], '# كتابة فقرات إنجليزية واضحة

أساسيات كتابة جمل صحيحة وربطها لتكوين فقرة متماسكة.', '{}'::jsonb);

-- ==============================================================================
-- SECTION 4 — Assertion guards before commit
-- ==============================================================================
DO $$
DECLARE
  total_draft INT := 0;
  total_pub INT := 0;
  tbl_count INT := 0;
  prev_10 INT := 0;
BEGIN
  SELECT count(*) INTO tbl_count FROM iot_resources WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM iot_resources WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM ai_resources WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM ai_resources WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM iot_glossary WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM iot_glossary WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM digital_exams_lessons WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM digital_exams_lessons WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM language_prompts WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM language_prompts WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM language_glossary WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM language_glossary WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM ai_lessons WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM ai_lessons WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM career_prompts WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM career_prompts WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM digital_exams_glossary WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM digital_exams_glossary WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM career_glossary WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM career_glossary WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM career_lessons WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM career_lessons WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM digital_exams_prompts WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM digital_exams_prompts WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM automation_lessons WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM automation_lessons WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM iot_prompts WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM iot_prompts WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM automation_resources WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM automation_resources WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM language_lessons WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM language_lessons WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM language_resources WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM language_resources WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM digital_exams_resources WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM digital_exams_resources WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO tbl_count FROM career_resources WHERE status = 'draft';
  total_draft := total_draft + tbl_count;
  SELECT count(*) INTO tbl_count FROM career_resources WHERE status = 'published';
  total_pub := total_pub + tbl_count;
  SELECT count(*) INTO prev_10 FROM career_glossary WHERE id IN ('career-glossary-career-shift-2', 'career-glossary-cover-letter', 'career-glossary-burnout', 'career-glossary-ats', 'career-glossary-career-shift', 'career-glossary-culture-fit', 'career-glossary-cover-letter-2', 'career-glossary-cv-optimization', 'career-glossary-ai-tools', 'career-glossary-ats-2');
  IF total_draft != 600 THEN
    RAISE EXCEPTION 'Assertion failed: expected 600 total draft records, got %', total_draft;
  END IF;
  IF total_pub != 0 THEN
    RAISE EXCEPTION 'Assertion failed: expected 0 published records, got %', total_pub;
  END IF;
  IF prev_10 != 10 THEN
    RAISE EXCEPTION 'Assertion failed: expected 10 previous records, got %', prev_10;
  END IF;
END $$;

-- ==============================================================================
-- SECTION 5 — Commit
-- ==============================================================================
COMMIT;

-- ==============================================================================
-- SECTION 6 — Post-commit verification queries
-- ==============================================================================
SELECT 'iot_resources' AS table_name, count(*) AS final_count FROM iot_resources;
SELECT 'ai_resources' AS table_name, count(*) AS final_count FROM ai_resources;
SELECT 'iot_glossary' AS table_name, count(*) AS final_count FROM iot_glossary;
SELECT 'digital_exams_lessons' AS table_name, count(*) AS final_count FROM digital_exams_lessons;
SELECT 'language_prompts' AS table_name, count(*) AS final_count FROM language_prompts;
SELECT 'language_glossary' AS table_name, count(*) AS final_count FROM language_glossary;
SELECT 'ai_lessons' AS table_name, count(*) AS final_count FROM ai_lessons;
SELECT 'career_prompts' AS table_name, count(*) AS final_count FROM career_prompts;
SELECT 'digital_exams_glossary' AS table_name, count(*) AS final_count FROM digital_exams_glossary;
SELECT 'career_glossary' AS table_name, count(*) AS final_count FROM career_glossary;
SELECT 'career_lessons' AS table_name, count(*) AS final_count FROM career_lessons;
SELECT 'digital_exams_prompts' AS table_name, count(*) AS final_count FROM digital_exams_prompts;
SELECT 'automation_lessons' AS table_name, count(*) AS final_count FROM automation_lessons;
SELECT 'iot_prompts' AS table_name, count(*) AS final_count FROM iot_prompts;
SELECT 'automation_resources' AS table_name, count(*) AS final_count FROM automation_resources;
SELECT 'language_lessons' AS table_name, count(*) AS final_count FROM language_lessons;
SELECT 'language_resources' AS table_name, count(*) AS final_count FROM language_resources;
SELECT 'digital_exams_resources' AS table_name, count(*) AS final_count FROM digital_exams_resources;
SELECT 'career_resources' AS table_name, count(*) AS final_count FROM career_resources;