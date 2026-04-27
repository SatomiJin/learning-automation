---
name: rtk-reader
description: Read and navigate the local clone of rtk-ai/rtk, including its source code, architecture docs, and command modules. Use when the user asks about RTK behavior, supported commands, hook rewriting, or wants to adapt ideas from RTK to this workspace.
---

# RTK Reader

Use this skill when work depends on the local RTK clone at:

`D:\Workspace\WorkSpace\learning\learning-automation\vendor\rtk`

## Goal

Build fast context for RTK without scanning the whole repo blindly. Start from the smallest set of files that answers the user's request, then drill into the exact module that owns the behavior.

## Read Order

### 1. Start with repo-level intent

Open these first unless the user already narrowed the scope:

- `vendor/rtk/README.md`
- `vendor/rtk/CLAUDE.md`
- `vendor/rtk/docs/contributing/TECHNICAL.md`
- `vendor/rtk/docs/contributing/ARCHITECTURE.md`

### 2. If the question is about command support or filtering

Read:

- `vendor/rtk/src/cmds/README.md`
- The ecosystem README under `vendor/rtk/src/cmds/<ecosystem>/README.md`
- The concrete module that owns the command, such as:
  - `vendor/rtk/src/cmds/system/read.rs`
  - `vendor/rtk/src/cmds/system/grep_cmd.rs`
  - `vendor/rtk/src/cmds/git/git.rs`
  - `vendor/rtk/src/cmds/js/playwright_cmd.rs`
  - `vendor/rtk/src/cmds/rust/cargo_cmd.rs`

### 3. If the question is about hook rewriting or agent integration

Read:

- `vendor/rtk/src/hooks/`
- `vendor/rtk/hooks/` if present
- `vendor/rtk/docs/contributing/TECHNICAL.md`
- `vendor/rtk/src/discover/registry.rs`
- `vendor/rtk/src/hooks/rewrite_cmd.rs`

### 4. If the question is about tracking, analytics, or savings

Read:

- `vendor/rtk/docs/usage/TRACKING.md`
- `vendor/rtk/docs/guide/analytics/gain.md`
- `vendor/rtk/src/core/tracking.rs`
- `vendor/rtk/src/analytics/`

## Working Style

- Prefer `rg` to locate a command, module, or feature before opening files.
- Read the matching ecosystem README before diving into a leaf file.
- Treat `CLAUDE.md` as implementation guidance for this repo.
- When answering, name the exact RTK file or module that owns the behavior.
- When adapting RTK ideas into this workspace, explain whether the idea comes from docs, hook logic, or a command filter implementation.

## High-Value Paths

- Repo map: `skills/rtk-reader/references/repo-map.md`
- Main entry: `vendor/rtk/src/main.rs`
- Command registry: `vendor/rtk/src/discover/registry.rs`
- Core utilities: `vendor/rtk/src/core/`
- Command filters: `vendor/rtk/src/cmds/`
- Hook logic: `vendor/rtk/src/hooks/`
- Parser helpers: `vendor/rtk/src/parser/`

## Output Expectations

- Keep summaries architecture-first.
- For behavior questions, include the owning file path.
- For implementation tasks, identify the smallest module to change before editing anything.
