---
name: pr-description
description: Writes the pull request title and description for a branch. Use when opening, drafting, reviewing or updating a PR, when the user asks for a PR title, body, summary or changelog line, when filling a PR template, or when summarizing a branch before merge. Covers the Conventional Commits PR title, the "why" first body, verification evidence, migrations/env/breaking changes, deliberate exclusions and `gh pr create` usage.
applies_to: [git]
---
# Skill: Pull Request Title & Description

This repository squash-merges pull requests, so the PR title becomes the permanent commit subject and the PR body is the only place the reviewer sees the reasoning. Both are written for a reviewer who has not read the diff.

## 1. Title

- Format: `<type>(<scope>): <short description>` — the same rules as `git-standards`.
- Imperative mood, lowercase, no trailing period, max 72 characters.
- Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`, `perf`.
- Scope: the primary area in kebab-case (`auth`, `router`, `user-card`). Omit only when the change is genuinely cross-cutting.
- One type per PR: pick the dominant intent (`feat` for a feature that also contains a fix) and mention the rest in the body.

## 2. Body

Start with the **why**, never with a file list. The diff already shows the what.

```markdown
## Summary
<The problem, constraint or requirement that made this change necessary.>

## What changed
- <area>: <decision and the reason for it>

## Verification
- `<command>` — <observed result, with numbers>

## Notes
- Migrations: <name, or "none">
- Env/config: <new keys, or "none">
- Deliberate exclusions: <what was intentionally left out>
- Follow-ups: <known gaps, or "none">
```

### Rules

- **Reuse the commits.** Each commit body already explains its reasoning; group those bodies under `## What changed` so the PR reads like its commits. This is how the merged history in this repository is written.
- **Explain decisions, not mechanics.** "Empty strings are still accepted so the checks stay branch-free" beats "modified two files".
- **State the verification you actually ran**, with the numbers or file paths, and say when something was not run.
- **Call out anything a reviewer must act on**: migrations, new env vars, config keys, breaking changes, dependency additions.
- **Name the deliberate exclusions.** A requirement that is deliberately out of scope belongs in the body (it prevents "you forgot X" reviews).
- **Be honest about gaps.** If part of the feature is not wired up yet, say so under Notes.
- Link the issue when one exists (`Closes #123`) and never paste secrets, tokens or full env values.

## 3. Creating the PR

Prefer the CLI so the body comes from the commits:

```bash
gh pr create --base main --title "<type>(<scope>): <description>" --body-file /tmp/opencode/pr-body.md
```

- Compose the body in a file (`/tmp/opencode/`) so multi-line markdown is preserved, then pass it with `--body-file`.
- Check `gh` is available first (`command -v gh`). When it is not, give the user the title and body to paste, plus the `compare` URL:
  `https://github.com/<owner>/<repo>/compare/main...<branch>?expand=1`
- Run `gh pr view --json title,body` after creating or editing a PR to confirm what was published.
