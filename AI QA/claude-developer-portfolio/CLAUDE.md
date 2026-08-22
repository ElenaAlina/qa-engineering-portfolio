# claude-developer-portfolio

A hands-on portfolio exploring the Claude/Anthropic developer ecosystem, with an emphasis on QA engineering use cases.

## Repo relationship

This local folder is **not** its own GitHub repository. It corresponds to a subfolder inside a larger monorepo:

- Remote repo: https://github.com/ElenaAlina/qa-engineering-portfolio
- Remote path this folder syncs to: `AI QA/claude-developer-portfolio` (full URL: https://github.com/ElenaAlina/qa-engineering-portfolio/tree/main/AI%20QA/claude-developer-portfolio)
- Local repo root: `D:\claude-developer-portfolio` (git-initialized, `origin` remote set to the monorepo URL above, but **cannot be pushed directly** — see below)

## Why a direct push doesn't work

Local repo root == remote subfolder, not the remote repo root. A plain `git push origin main` from here would place these files at the monorepo's root instead of inside `AI QA/claude-developer-portfolio`, and would try to merge unrelated histories.

## How syncing to GitHub actually happens

To publish changes made here without touching any other part of the monorepo:

1. Clone the monorepo fresh into a temp location:
   `git clone https://github.com/ElenaAlina/qa-engineering-portfolio.git`
   (On Windows, `git config --global core.longpaths true` is required first — the monorepo has deeply nested `node_modules` paths under `cypress-tests/` that exceed the default path length limit.)
2. Copy this folder's tracked content into `AI QA/claude-developer-portfolio/` inside that clone (excluding `.git`, `.claude`, `__pycache__`, `.env`).
3. `git add "AI QA/claude-developer-portfolio"` in the clone — stages only that subfolder.
4. Commit and `git push origin main` from the clone.
5. Discard the temp clone (or keep it for the next sync).

This keeps every push scoped to this project's subfolder and leaves the rest of `qa-engineering-portfolio` untouched.

## Structure

- `01-anthropic-api/` — Messages API basics: system prompts, streaming, token usage, error handling
- `02-tool-use/` — Tool use / function calling examples
- `03-mcp/` — Model Context Protocol server and client examples
- `04-agents/` — Agent implementations, from basic to multi-step
- `05-subagents/` — Subagent patterns applied to QA
- `06-agent-skills/` — Custom Agent Skills for QA workflows
- `07-claude-code/` — Claude Code customizations: commands, agents, skills, hooks
- `08-cowork/` — Cowork examples
- `09-qa-use-cases/` — Applied QA tooling: test case generation, bug analysis, API test generation, test data generation
- `docs/` — Architecture notes and lessons learned

Empty leaf folders contain a `.gitkeep` placeholder so git tracks them until real content is added.

## Auth for pushes

GitHub auth is handled via Git Credential Manager (`credential.helper manager`), backed by a token stored in Windows Credential Manager. No token is stored in this repo or in any file here.

If the credential ever needs to be re-approved (token rotated, cache cleared): don't pipe a multi-line credential record straight into `git credential approve` via a PowerShell `|` pipe — it mangles the input and fails with "refusing to work with credential missing protocol field". Write the record (`protocol=https`, `host=github.com`, `username=x-access-token`, `password=<token>`, blank line) to a temp file with `[System.IO.File]::WriteAllText` (no BOM), then feed it in via `cmd /c "git credential approve < file"`, and delete the file immediately after.

Never ask for the token to be pasted into chat — have it set as a Windows user env var (`[System.Environment]::SetEnvironmentVariable("GH_TOKEN","<token>","User")`) outside the conversation, then just reload it with `[System.Environment]::GetEnvironmentVariable("GH_TOKEN","User")` in a command, never echoing the value.

## Local machine notes (this Windows box)

- Neither `git` nor `winget` is on PATH in a fresh PowerShell process. Every PowerShell command that needs them must first run:
  `$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")`
- If git isn't installed yet, `winget` itself is reachable via the bundled App Installer package even when not on PATH:
  ```powershell
  $p = Get-AppxPackage -Name "Microsoft.DesktopAppInstaller"
  $exe = Join-Path $p.InstallLocation "winget.exe"
  & $exe install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements
  ```
- A User-scope env var set outside the current session (e.g. via System Properties or another terminal) isn't visible via `$env:NAME` in a fresh process — reload explicitly with `[System.Environment]::GetEnvironmentVariable("NAME","User")`.
