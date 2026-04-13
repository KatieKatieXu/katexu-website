<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of your portfolio. PostHog is initialized via `instrumentation-client.ts` (the Next.js 15.3+ recommended approach), with a reverse proxy in `next.config.ts`. This session extended the existing integration by adding **14 new events** across 6 component files, covering project section navigation depth, presentation deck clicks, live app/App Store/Kickstarter conversion CTAs, and all already-instrumented existing events.

| Event | Description | File |
|---|---|---|
| `project_selected` | User clicks a project thumbnail | `src/components/KatesWebsite.tsx` |
| `project_navigated` | User clicks prev/next arrow to browse projects | `src/components/KatesWebsite.tsx` |
| `project_read_more_clicked` | User clicks "Read More" to open a case study | `src/components/KatesWebsite.tsx` |
| `resume_downloaded` | User downloads the resume PDF | `src/app/resume/page.tsx` |
| `how_i_think_tab_switched` | User switches between Research and AI Workflow tabs | `src/app/how-i-think/page.tsx` |
| `research_paper_clicked` | User clicks a research paper link | `src/app/how-i-think/page.tsx` |
| `contact_email_clicked` | User clicks a contact email link | `src/app/how-i-think/page.tsx` |
| `project_section_navigated` | User navigates between sections within a project detail page (property: `project_name`, `section`) | `src/components/BofaCloudPage.tsx`, `WorkITPage.tsx`, `JobpilotPage.tsx`, `PawpawStoryPage.tsx`, `IonboardPage.tsx`, `OnecoPage.tsx` |
| `project_deck_clicked` | User clicks to view the presentation deck for a project (property: `project_name`) | `src/components/BofaCloudPage.tsx`, `WorkITPage.tsx`, `PawpawStoryPage.tsx`, `IonboardPage.tsx` |
| `live_app_clicked` | User clicks to try the live app — Jobpilot or Oneco (property: `project_name`, `url`) | `src/components/JobpilotPage.tsx`, `OnecoPage.tsx` |
| `app_store_clicked` | User clicks the App Store download link for PawpawStory | `src/components/PawpawStoryPage.tsx` |
| `kickstarter_link_clicked` | User clicks the Kickstarter campaign link for Ionboard | `src/components/IonboardPage.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/379742/dashboard/1459802
- **Project exploration funnel** (project_selected → read more → live app): https://us.posthog.com/project/379742/insights/TO5XVomj
- **Project section navigation by project** (engagement depth): https://us.posthog.com/project/379742/insights/vBoF7aCk
- **Presentation deck clicks by project** (high-intent signal): https://us.posthog.com/project/379742/insights/9bjc53ho
- **Conversion CTAs over time** (live app, App Store, Kickstarter, resume): https://us.posthog.com/project/379742/insights/oGXoLSxH
- **How I Think content engagement** (papers, contact, tab switches): https://us.posthog.com/project/379742/insights/KsTnCCJ3

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
