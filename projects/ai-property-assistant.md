# AI-Powered Property Management Assistant (MVP v1)

⋘══════════════ ⋆⋅☆⋅⋆ ══════════════⋙

## Problem
Property maintenance requests come in as messy, incomplete text. The business needs fast, consistent decisions: priority, category, next actions, and documentation requirements.

## Constraints
- MVP must work with no backend and no paid services
- Must be usable on mobile/tablet
- Outputs must be clear enough to paste into a work order system
- Designed to upgrade later into Python + LLM + logging

## Solution (Architecture)
A deterministic triage engine (rule-based) that classifies common request types and generates:
- priority + category
- immediate actions + safety checks
- tools/parts checklist
- documentation checklist
- work order draft text

## Implementation
- `triage.html` UI form
- `assets/js/triage.js` rule engine and output generator
- Uses keyword/phrase signals (leak, toilet, roaches, lock/key, turnover)

## Demo Requests Used
1. Bathroom ceiling leak (Gravois Ave)
2. Key stuck in lock (Gravois Ave)
3. Cockroach issue (Winona Ave)
4. Toilet won’t flush (Schirmer St)
5. Turnover make-ready for occupancy inspection (Crosswinds Dr)

## What I Learned
- How to translate real operations into deterministic logic and structured outputs
- How to design an MVP that is immediately useful while being upgradeable
- How to build a user-friendly demo without backend complexity

## Next Improvements
- Add severity questions (active leak? overflow? multi-unit impact?)
- Save output to a downloadable text file
- Add issue logging and history
- Upgrade to Python service + LLM-assisted summarization
- Add evaluation: compare outputs across multiple scenarios
