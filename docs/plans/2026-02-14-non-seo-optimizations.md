# Non-SEO Hardening and UX Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade security, reliability, and UX for encode/decode flows without changing core product scope.

**Architecture:** Keep existing single-page architecture and improve in-place. Cryptography will move from legacy XOR format to AES-GCM with PBKDF2 while preserving backward decode compatibility. UI safeguards (capacity estimation, verification before download, secure auto-clear, status announcements) are implemented in app layer.

**Tech Stack:** Vanilla JS, Web Crypto API, Node test runner (`node:test`).

---

### Task 1: Add failing tests for new hardening requirements

**Files:**
- Create: `tests/quality-optimizations.test.js`

**Step 1: Write failing tests**
- Assert AES-GCM + PBKDF2 markers in `steganography.js`.
- Assert legacy `ENCRYPTED2` compatibility remains.
- Assert capacity estimator and verification toggle UI exist.
- Assert secure-page auto-clear hooks exist.
- Assert clipboard API usage exists.
- Assert local server security headers are strengthened.

**Step 2: Run tests to verify failure**
Run: `node --test tests/quality-optimizations.test.js`
Expected: FAIL on missing new requirements.

### Task 2: Implement cryptography and capacity upgrades

**Files:**
- Modify: `steganography.js`

**Step 1: Add modern crypto implementation**
- Add AES-GCM encryption format (`ENCRYPTED3:` payload).
- Add PBKDF2 key derivation and random salt/IV generation.
- Add backward compatibility decode path for `ENCRYPTED2:` / `ENCRYPTED:`.

**Step 2: Add capacity helper methods**
- Add helpers to estimate max message bytes by image + algorithm.

### Task 3: Implement UX/reliability safeguards

**Files:**
- Modify: `index.html`
- Modify: `app.js`
- Modify: `style.css`

**Step 1: Add UI controls/status**
- Add capacity status blocks and verification-before-download checkbox.
- Add `aria-live` status region.

**Step 2: Wire app behavior**
- Show capacity estimate on file/message/algorithm/password change.
- Enforce pre-check when message exceeds capacity.
- Verify decode round-trip before allowing download when toggle enabled.
- Use clipboard API with fallback.
- Add page hide/unload auto-clear hooks for sensitive fields.

### Task 4: Strengthen local server runtime headers

**Files:**
- Modify: `server.js`

**Step 1: Add modern security headers and remove permissive CORS wildcard**

### Task 5: Verify

**Files:**
- Modify: `package.json`

**Step 1: Add/extend test script if required**

**Step 2: Run full verification**
Run: `node --test tests/seo-config.test.js tests/quality-optimizations.test.js`
Expected: PASS (0 failures)
