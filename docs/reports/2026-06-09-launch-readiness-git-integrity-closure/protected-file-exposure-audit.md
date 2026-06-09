# Protected File Exposure Audit

| Path | Currently Tracked | In `git log` | Added Commit | Removed Commit | Exposure Classification | Sensitive context? |
|------|-------------------|--------------|--------------|----------------|-------------------------|--------------------|
| `.claude/` | No | Yes | `b760425` | `6007f93` | Case B | No (Skill context) |
| `.codex/` | No | Yes | `b760425` | `6007f93` | Case B | No (Skill datasets) |
| `README.backup.20260607-135220.md` | No | Yes | `b760425` | `6007f93` | Case B | No (Documentation) |
| `UX PROMAX.MD` | No | Yes | `b760425` | `6007f93` | Case B | No (Documentation) |
| `content-source/_audit/generate-core-reports.py` | No | Yes | `b760425` | `6007f93` | Case B | No (Local scripts) |
| `content-source/_audit/generate-final-closure.py` | No | Yes | `b760425` | `6007f93` | Case B | No (Local scripts) |
| `content-source/_audit/generate_10_inserts.py` | No | Yes | `b760425` | `6007f93` | Case B | No (Local scripts) |
| `content-source/_audit/generate_10_inserts_fixed.py` | No | Yes | `b760425` | `6007f93` | Case B | No (Local scripts) |
| `content-source/_audit/generate_10_persistent_inserts.py` | No | Yes | `b760425` | `6007f93` | Case B | No (Local scripts) |
| `eslint-output.txt` | No | Yes | `b760425` | `6007f93` | Case B | No (Linter logs) |

*Note: No secret values or environment variables were exposed. The exposed data consists of AI agent context records and backup logs.*
