# Make the published NEXO website discoverable in Google

Public address checked on October 2, 2026: https://gustavo1803.github.io/nexo-research/

The local public pages now include individual canonical URLs, absolute English/Spanish alternate URLs, and search descriptions. `sitemap.xml` lists all 20 public pages. These local changes must be uploaded to GitHub before Google can use them. The editor pages are excluded from the sitemap and retain their noindex tags.

## 1. Upload the update

Extract the latest `NEXO-website.zip` and upload its contents to the existing `nexo-research` repository. Keep `index.html`, the other HTML files, and `sitemap.xml` at the repository root, with the complete `assets/` folder alongside them. Commit the changes and wait for GitHub Pages to publish.

Open https://gustavo1803.github.io/nexo-research/sitemap.xml to confirm that the sitemap is available. It should display XML containing the public page addresses.

## 2. Verify ownership in Search Console

1. Visit https://search.google.com/search-console and sign in with your Google account.
2. Add a property and choose **URL prefix**.
3. Enter exactly `https://gustavo1803.github.io/nexo-research/`, including the trailing slash.
4. Choose **HTML file** verification and download Google's verification file.
5. Upload that file to the root of your GitHub repository, alongside `index.html`. Keep its filename and contents unchanged.
6. Commit the upload and wait for publication. Open the exact verification URL Google provides to confirm that the file is publicly accessible.
7. Return to Search Console and click **Verify**. Keep the verification file in the repository during future updates.

Google provides the verification file for your account; it is not included in the website ZIP. If Google offers a homepage HTML tag instead, put the exact tag inside the `<head>` of `index.html`, upload that file, then verify.

Source: [Google's ownership-verification instructions](https://support.google.com/webmasters/answer/9008080).

## 3. Submit the sitemap and request indexing

1. In Search Console, open **Sitemaps**.
2. Under **Add a new sitemap**, enter `sitemap.xml` and click **Submit**. If the field expects a full address, use `https://gustavo1803.github.io/nexo-research/sitemap.xml`.
3. Use **URL inspection** to inspect the English homepage, then select **Test live URL** and **Request indexing** when available.
4. Repeat for `es.html`, `research.html`, and `research-es.html`. The sitemap helps Google discover the remaining pages.

Sources: [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [URL Inspection](https://support.google.com/webmasters/answer/9012289).

## 4. Help people and Google discover the site

Add the website link to your existing academic website, university profile where you can edit it, LinkedIn, and academic profiles. Keep the research catalog and contact details current. Search Console's indexing report gives a more complete status than a `site:` search.

Google may take days or weeks to discover a new website. Submission does not guarantee inclusion or a particular position in search results.

Source: [Get your website on Google](https://developers.google.com/search/docs/fundamentals/get-on-google).

## When you move to a purchased domain

Update the canonical URLs, `og:url`, English/Spanish alternate URLs, and every sitemap address to the final domain. Add and verify that domain in Search Console, then submit the updated sitemap. Preserve Google's verification file or tag when replacing website files. GitHub's domain `CNAME` file and Google's verification file have different purposes; retain both when they exist.

The project site's sitemap is submitted directly in Search Console. A robots.txt file at `/nexo-research/robots.txt` would not control crawling, because Google reads robots.txt at the hostname root. The existing hostname robots.txt was checked and does not block this project site.

Sources: [Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), [Robots.txt introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro).
