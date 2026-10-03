# NEXO Research Group — bilingual academic website

NEXO Research Group is led by Gustavo Enrique Niño at the Universidad de los Andes School of Management (Facultad de Administración), connecting economic and business research in transportation, supply chains, digital economics, and food trade. NEXO means “connection” in Spanish.

## Preview

Double-click **index.html** for English or **es.html** for Spanish in Chrome, Edge, Firefox, or Safari. The EN / ES switch moves between the two pages. No installation or build step is needed. Fonts, photography, and scripts are local. Publication links and email actions require an internet connection and an email application, respectively.

Alternatively, run `powershell -NoProfile -ExecutionPolicy Bypass -File preview.ps1` from this folder and visit `http://127.0.0.1:4173`. This optional server uses Windows PowerShell and only serves the website files on this computer. It is not public hosting.

The site has responsive layouts, a mobile menu, research status and topic filters, search, bilingual research dialogs, dedicated research-area pages, keyboard support, and email links. The email buttons open a draft; the website does not submit or store inquiries.

## Files

| File | Purpose |
| --- | --- |
| `index.html` / `es.html` | English / Spanish homepage overview, research areas, collaboration approach, and contact |
| `research.html` / `research-es.html` | Complete research catalog and filters |
| `projects.html` / `projects-es.html` | Applied projects, search, status filters, and details |
| `collaborators.html` / `collaborators-es.html` | Coauthors with locally stored portraits and academic websites |
| `team.html` / `team-es.html` | Current team: Gustavo, with support for adding teammates |
| `transportation.html` / `transportation-es.html` | Transportation and mobility area |
| `supply-chains.html` / `supply-chains-es.html` | Supply chains and resilience area |
| `digital-economics.html` / `digital-economics-es.html` | Digital markets and economics area |
| `food-trade.html` / `food-trade-es.html` | Food systems and trade area |
| `areas-data.js` / `areas.js` | Bilingual explanations, dated global developments, and related research/project links |
| `styles.css` | Layout, typography, colors, mobile layouts, and print styling |
| `app.js` | Shared bilingual interactions and research rendering |
| `research-data.js` | Single research catalog supplying both languages |
| `manage-research.html` | Local form editor for publications, working papers, and work in progress |
| `manage-projects.html` / `projects-data.js` | Project editor and shared bilingual project catalog |
| `manage-people.html` / `people-data.js` | Team/collaborator editor and shared people catalog |
| `pages.js` | Project and people page rendering |
| `research-editor.js` / `research-editor.css` | Local editor behavior and styling |
| `assets/` | Photos, fonts, favicon, and font licenses |
| `.nojekyll` | Tells GitHub Pages to serve the static files directly |
| `preview.ps1` | Optional local Windows preview server |
| `PUBLISHING.md` | Instructions for hosting and adding a purchased domain |
| `sitemap.xml` / `GOOGLE-SEARCH.md` | Public page addresses and instructions for Google Search Console |
| `CONTENT-NOTES.md` | Sources and content to confirm for the final version |
| `EDITING-RESEARCH.md` | English and Spanish instructions for updating the research catalog |
| `EDITING-CONTENT.md` | English and Spanish instructions for projects, collaborators, and team |
| `COLLABORATOR-SOURCES.md` | Verified profile/portrait sources and notes on applied projects |

## Editing

For publications, working papers, and work in progress, open **manage-research.html**, save the entry in the list, download **research-data.js**, and replace that file. For applied projects use **manage-projects.html** and **projects-data.js**. For teammates or coauthors use **manage-people.html** and **people-data.js**. Both languages update together. See **EDITING-RESEARCH.md** and **EDITING-CONTENT.md** for complete instructions.

Other page text is edited in the corresponding English and Spanish HTML files. Area descriptions and sourced news are in `areas-data.js`; related research and projects come from the existing catalogs. See `EDITING-CONTENT.md` for area updates. To change the email, update **all** occurrences of `ge.nino183@uniandes.edu.co` in the pages, catalogs, and scripts. To change the group name, update the title, metadata, header, footer, and NEXO references in these documents. The favicon is a simple network motif, so it also works with a different name.

Colors are defined at the top of `styles.css`. The fonts are DM Sans and Libre Caslon Display; their licenses are included in `assets/`.

The curriculum vitae links open `assets/Resume_and_CV.pdf`, an identical copy of the supplied `Resume_and_CV.pdf` in the website folder. Replace the PDF in `assets/` to update Gustavo’s CV and include it when uploading the site. Local edits must be uploaded to GitHub to update the published website.

## What to finalize

Check final publication status and complete author lists, and add the group’s actual members as the team grows. The current appointment and institutional email were checked against the Uniandes faculty directory. The site uses the supplied affiliation and existing research; it does not invent clients, team members, impact metrics, or testimonials.

The current canonical URLs, language alternates, social sharing URLs, and sitemap use `https://gustavo1803.github.io/nexo-research/`. When the final domain is known, update all of these to that address. Hosting and domain steps are in `PUBLISHING.md`; Google Search Console instructions are in `GOOGLE-SEARCH.md`.
