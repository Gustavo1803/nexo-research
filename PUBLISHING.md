# Publish the NEXO website, then connect your domain

You can put this website online before purchasing a domain. The hosting service stores the website files; the domain is the address visitors type. Purchasing an address does not require rebuilding the website.

## 1. Publish the website on GitHub Pages

This is a convenient route because you already have a GitHub website. Use the separate `nexo-research` repository for NEXO and keep the existing `Gustavo1803.github.io` repository intact.

1. Sign into GitHub and create a **public** repository named `nexo-research`.
2. In that repository, choose **Add file → Upload files**. Upload all twenty public HTML pages (`index.html`, `es.html`, both versions of Research, Projects, Collaborators, Team, How do we work, and the four research areas), `sitemap.xml`, `styles.css`, `app.js`, `pages.js`, `areas.js`, `research-data.js`, `projects-data.js`, `people-data.js`, `areas-data.js`, and the entire `assets` folder. Keep the HTML files at the repository root. The `manage-*.html` editors, `*-editor.js`, `research-editor.css`, and documentation are optional support files; they are not needed for the public website. Extract the ZIP first; uploading a ZIP alone does not deploy its contents. Do not upload `.preview/` or the ZIP itself.
3. Create `.nojekyll` at the repository root using **Add file → Create new file**. If GitHub requires file content, a short comment is fine.
4. Commit the files to the `main` branch.
5. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then **main** and **/ (root)**, and save.
6. Use the published URL shown in Pages settings. With this account and repository name, it should be `https://gustavo1803.github.io/nexo-research/`.

GitHub Pages is available for public repositories on GitHub Free. Publication can take several minutes. See [GitHub’s Pages quickstart](https://docs.github.com/en/pages/quickstart).

Test both languages on all ten pages, the menu, area links, partnership page, news sources, research and project filters/search, paper links, coauthor profiles, photos, and email links on a phone and a computer. The paths in this website are relative, so the same files work on the project address and a later custom domain. Future updates use the editors described in `EDITING-CONTENT.md`; upload the downloaded data file and any new images or PDFs.

## 2. Buy a domain for NEXO

Choose an address that is easy to spell and works for your group’s long-term identity. Domain availability and prices should be checked at purchase time. The registrar is the company selling the address; its DNS settings connect that address to your hosting service.

You can use any registrar that lets you edit DNS records. No particular registrar or domain purchase is required to publish the website on GitHub Pages.

## 3. Verify ownership

In your GitHub **account settings → Pages**, add the domain. GitHub will provide a TXT record. Copy its exact name and value into the registrar’s DNS settings, then select **Verify** in GitHub. Leave the TXT record in place. Follow [GitHub’s domain verification instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).

## 4. Connect the domain to this repository

Assume the purchased domain is `yourdomain.com`:

1. Open `nexo-research` **Settings → Pages**, enter `yourdomain.com` under **Custom domain**, and save **before** changing the routing records at your registrar. For branch publishing, GitHub creates a `CNAME` file; preserve it when updating the website.
2. At the registrar, add these records:

| Type | Name / host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | gustavo1803.github.io |

The CNAME target has no `https://` prefix and no repository path. Replace conflicting website records for `@` or `www`; preserve unrelated email records.

3. Wait for the DNS check to pass, then enable **Enforce HTTPS** in GitHub Pages. DNS and certificate provisioning may take up to 24 hours.

These records and steps follow [GitHub’s custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). Check that page again when you buy the domain in case the instructions have changed.

## 5. Maintain the website

Update files in the repository and commit; GitHub Pages republishes them. Keep the local originals and a copy of the `CNAME` file once it exists. Confirm that both the main address and `www` reach the site over HTTPS.

Review the content items in `CONTENT-NOTES.md` when maintaining the website. When connecting the final domain, update the canonical URLs, language alternates, sharing URLs, and `sitemap.xml` to use that domain. Google Search Console steps are in `GOOGLE-SEARCH.md`. You can keep the existing academic website online so its publication and CV links continue to work.

Custom-domain email, such as `gustavo@yourdomain.com`, is a separate service. The website currently uses your Uniandes email. If you change it, update the pages, research catalog, and scripts as described in `README.md`.
