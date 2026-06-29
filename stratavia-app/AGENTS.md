<!-- BEGIN:nextjs-agent-rules -->

# Stratavia AI Development Guide

## 1. The Golden Rules (Non-Negotiable)

- Never use npm
- Use Yarn only
- Never generate `package-lock.json`
- Always keep `yarn.lock` updated
- Never commit directly to the `main` branch
- Always follow `DESIGN.md`
- Never create inconsistent visual patterns
- Never duplicate logic unnecessarily
- Always maintain a modular and scalable architecture
- Always prioritize readability and maintainability
- Always reuse existing components before creating new ones
- Never expose credentials or API keys
- Never commit `.env` files

---

## 2. Folder Structure (The "Stratavia Standard")

```txt
src/
├── app/          -> routes and pages
├── components/   -> reusable components
├── services/     -> external integrations and APIs
├── lib/          -> utilities and shared logic
├── hooks/        -> custom hooks
├── styles/       -> global styles
├── constants/    -> constants and configuration
└── data/         -> mocks and static data
```

### Rules

- Avoid massive components
- Separate responsibilities correctly
- Maintain consistent organization
- Avoid excessively long files
- Keep components decoupled
- Avoid business logic inside UI components
- Centralize external integrations

---

## 3. UI/UX & Design System

- `DESIGN.md` is the primary visual reference for the project
- Every interface must follow `DESIGN.md`
- The product must convey a premium SaaS appearance
- Prioritize minimalism and clarity
- Maintain visual consistency across the entire application

### Prioritize

- Consistent spacing
- Modern typography
- Responsiveness
- Intuitive UX
- Refined appearance
- Reusable components
- Smooth and subtle animations

### Avoid

- Cluttered interfaces
- Excessive colors
- Inconsistent layouts
- Exaggerated animations
- Visually conflicting components
- Excessive information per screen

---

## 4. Technical Standards

### Main Stack

#### Frontend

- Next.js 16
- React
- Tailwind CSS
- JavaScript

#### Backend

- Next.js App Router
- Server Actions
- API Routes

#### Database

- MongoDB

#### Artificial Intelligence

- Gemini API
- Antigravity 2
- Gemma 4 E4B

#### Infrastructure

- GitHub
- Google Stitch

#### Runtime

- Node.js 26.1.0
- Yarn

---

### APIs and External Services

#### Gemini API

The Gemini API will be used for:

- Intelligent analysis generation
- Prompt processing
- Fiscal insights generation
- Scenario comparison
- AI-powered features

#### MongoDB

MongoDB will be used as the main application database.

The connection must:

- Use environment variables
- Reuse connections whenever possible
- Follow security best practices
- Avoid unnecessary multiple connections

---

### Environment Variables

All credentials must use `.env.local`.

Examples:

```env
MONGODB_URI=
GEMINI_API_KEY=
```

Never:

- Expose keys on the frontend
- Commit `.env` files
- Hardcode credentials

The project must include:

- `.env.local`
- `.env.example`

---

### API Architecture

- Centralize integrations inside `src/services`
- Separate integration logic from UI logic
- Use reusable functions
- Standardize error handling
- Use async/await
- Avoid API logic directly inside components

### Recommended Structure

```txt
services/
├── ai/
├── database/
└── api/
```

---

### React Rules

- Use functional components
- Prefer Server Components whenever possible
- Use Client Components only when necessary
- Use async/await
- Avoid unnecessary complexity
- Avoid excessive prop drilling
- Prioritize component composition

---

### General Rules

- Use absolute imports with `@/`
- Prioritize reusability
- Avoid overengineering
- Avoid unnecessary dependencies
- Keep the code modular
- Follow modern Next.js best practices
- Maintain a clear separation between frontend and business logic

---

## 5. Performance & Accessibility

- Prioritize performance from the beginning
- Avoid unnecessary re-renders
- Optimize image loading
- Use lazy loading when necessary
- Ensure basic accessibility

### The application must

- Be responsive
- Load quickly
- Work well on mobile devices
- Maintain a good navigation experience
- Have strong visual hierarchy
- Maintain intuitive navigation

---

## 6. Git & Version Control

### Workflow

```txt
main      -> production
develop   -> integration
feature/* -> new features
fix/*     -> bug fixes
hotfix/*  -> urgent fixes
```

---

### Rules

- Never develop directly on `main`
- Always create branches from `develop`
- Use Pull Requests
- Keep commits small and organized
- Keep PRs focused on a single feature

---

### Conventional Commits

#### Examples

```txt
feat: create landing page
fix: resolve authentication issue
refactor: reorganize component structure
docs: update documentation
style: improve navbar responsiveness
chore: update dependencies
```

---

## 7. Testing Strategy

- Prioritize predictable and testable code
- Avoid excessive coupling
- Maintain reusable components
- Prepare the architecture for future testing

### Future Goals

- Unit tests
- Integration tests
- E2E tests

### Objective

The architecture must facilitate:

- Maintenance
- Scalability
- Testing
- Product evolution

<!-- END:nextjs-agent-rules -->
