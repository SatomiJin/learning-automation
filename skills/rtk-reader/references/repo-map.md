# RTK Repo Map

Local clone:

`D:\Workspace\WorkSpace\learning\learning-automation\vendor\rtk`

## Best starting points

- `README.md`: product overview, install modes, supported commands, quick start
- `CLAUDE.md`: contributor guidance, important warnings, architecture pointers
- `docs/contributing/TECHNICAL.md`: best end-to-end walkthrough
- `docs/contributing/ARCHITECTURE.md`: deeper architecture and filtering design

## Source layout

- `src/main.rs`: clap entrypoint and command routing
- `src/cmds/`: command-specific filters grouped by ecosystem
- `src/core/`: shared helpers, config, tracking, telemetry, formatting
- `src/discover/`: rewrite registry, command classification, shell parsing helpers
- `src/hooks/`: install, rewrite, integrity, trust, verification flows
- `src/analytics/`: gain/history/economics reporting
- `src/parser/`: parsing helpers used by filters
- `src/filters/`: shared filter logic
- `src/learn/`: learning or support commands

## Ecosystem folders under `src/cmds/`

- `system/`: `read`, `grep`, `find`, `ls`, `tree`, `json`, logs, env, deps
- `git/`: `git`, `gh`, `gt`, diff handling
- `js/`: lint, npm/pnpm, tsc, Next.js, Playwright, Vitest, Prisma
- `python/`: ruff, pytest, mypy, pip
- `rust/`: cargo build/test/clippy and runner helpers
- `go/`: go test/build/vet and golangci-lint
- `ruby/`: rspec, rubocop, rake
- `cloud/`: aws, curl, wget, psql, container tooling
- `dotnet/`: dotnet build/test/format/binlog

## Useful docs by topic

- Hook/install flow: `docs/guide/getting-started/` and `src/hooks/`
- Coverage and supported command types: `docs/guide/resources/what-rtk-covers.md`
- Troubleshooting: `docs/guide/resources/troubleshooting.md`
- Telemetry: `docs/TELEMETRY.md`
- Feature list: `docs/usage/FEATURES.md`
- Tracking internals: `docs/usage/TRACKING.md`

## Good drill-down pattern

1. Read `README.md` or `CLAUDE.md`
2. Read the relevant `docs/contributing/*.md`
3. Read `src/cmds/README.md`
4. Read the matching ecosystem `README.md`
5. Open the exact owning Rust file
