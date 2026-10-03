# Maintain projects, collaborators, and team members

The public site has nine pages in each language: Home, Research, Projects, Collaborators, Team, and four research-area pages. The language switch stays on the equivalent page. The homepage contains an overview and one featured paper; the complete research catalog is on Research.

| Content | Open this editor | Replace this file |
| --- | --- | --- |
| Publications, working papers, work in progress | `manage-research.html` | `research-data.js` |
| Applied projects and ongoing initiatives | `manage-projects.html` | `projects-data.js` |
| Team members and external coauthors | `manage-people.html` | `people-data.js` |

1. Open the editor in your browser and select an existing entry or Add.
2. Complete the English and Spanish fields. For a project, choose Ongoing or Completed, add a summary, methods, and an optional report or website link.
3. Select **Guardar en la lista** (Save in list). Repeat for other entries.
4. Select **Descargar archivo actualizado** (Download updated file).
5. Replace the corresponding file in your website folder. Keep its exact name, removing any browser-added `(1)` suffix. Refresh the public pages.
6. When hosted, upload the replaced file and any new assets to the same GitHub repository. GitHub Pages republishes the changes.

These are local editors: they prepare a downloadable content file. They do not automatically write into your site folder or publish changes. Opening a public editor does not grant visitors write access to the website. Unsaved changes trigger a warning when leaving; finish saving and downloading first. Use “Abrir un archivo existente” to import an exported catalog without running its JavaScript.

## Update research-area pages

The homepage’s Explore links open the four dedicated area pages. Their explanatory paragraphs, questions, methods, research introduction, and global developments are in **areas-data.js**. Each text field has `en` and `es` versions. Change those texts and replace the file in the website folder (and GitHub when published); both language versions update. Page titles, hero headlines, and metadata are in the corresponding HTML files.

The `news` array for each area contains `source`, `date`, `title`, `summary`, `connection`, and `url`. Use publication dates in `YYYY-MM-DD` format, or `YYYY-MM` when only the month is verified. Write an original short summary, link directly to the primary source, and keep the `connection` field as your research perspective rather than a claim made by the source. Update `reviewed` when you check the sources. This is a curated section, not an automatically updating news feed; its current source review date is October 2, 2026.

Related research is selected from **research-data.js** by its topic; up to three works appear, with existing priority IDs in `preferred`. Applied projects are selected from **projects-data.js** by their topic. No separate copy of a paper or project needs maintaining. Individual links open the entry on its catalog page; “All research in this area” opens the catalog with its topic filter selected. An area without matching applied projects shows its research links only.

## Add a teammate

Open `manage-people.html`, select **Agregar una persona**, and choose **Equipo**. Add their name, institution, role in both languages, biography, website, and optional CV, LinkedIn, and Google Scholar links. For an external coauthor choose **Colaborador**. Team currently contains only Gustavo. Gustavo’s academic-profile link opens his Universidad de los Andes faculty profile.

Put a new portrait in `assets/people/` (for example `assets/people/maria.jpg`) and enter that exact path in the form. Upload the photo along with `people-data.js`. If the photo is blank, the site displays the person’s initials. Use JPG, PNG, WEBP, or SVG. External website and CV links must use `https://` or `http://`. The CV field also accepts a local PDF filename, such as `Resume_and_CV.pdf`, or a PDF under `assets/`, such as `assets/people/maria-cv.pdf`.

Gustavo’s homepage and Team links open `assets/Resume_and_CV.pdf`, an identical copy of the supplied `Resume_and_CV.pdf` in the website folder. To update his CV, replace the PDF in `assets/` and upload it with the website files, keeping the same filename. You can also retain the original in the website folder for your records. Local PDF links work with GitHub Pages and a custom domain.

Projects also accept a local image, such as `assets/city.jpg`, and a local report link such as `assets/papers/project-report.pdf`. Blank project links produce a “Discuss the project” email action. Project titles, summaries, methods, and details support both languages.

## En español

Cada sección tiene su propia página en inglés y español. La página principal presenta un panorama del grupo y un documento destacado; la lista completa está en **Investigación**.

Abre el editor correspondiente en la tabla. Edita la ficha, completa los campos en ambos idiomas, selecciona **Guardar en la lista**, y luego **Descargar archivo actualizado**. Reemplaza el archivo indicado en la carpeta del sitio y recarga las páginas. Si el navegador cambia el nombre, elimina el sufijo `(1)`. Para publicar, reemplaza ese mismo archivo en GitHub.

Para agregar integrantes, abre **manage-people.html**, selecciona **Agregar una persona** y elige **Equipo**. Para coautores externos, elige **Colaborador**. Coloca las fotos en **assets/people/** y escribe la ruta exacta, por ejemplo **assets/people/maria.jpg**. También debes subir las fotos a GitHub. Si no agregas una foto, se muestran las iniciales.

En **manage-projects.html** puedes agregar proyectos **En curso** o **Finalizados**, títulos y resúmenes bilingües, métodos, una imagen y un enlace al proyecto o informe. No es necesario publicar un informe para incluir un proyecto: sin enlace aparece una opción para conversar por correo.

Los editores preparan archivos descargables. No guardan directamente en tu carpeta ni publican automáticamente. Descarga tus cambios antes de cerrar la pestaña.

Las cuatro áreas tienen páginas propias en ambos idiomas. Sus descripciones, preguntas, métodos, introducciones y noticias se editan en **areas-data.js**, en los campos `en` y `es`. Reemplaza ese archivo para actualizar ambos idiomas. Cada noticia incluye fuente, fecha, título, resumen, conexión con tu investigación y enlace original. Son noticias seleccionadas manualmente: revisa las fuentes y actualiza `reviewed` al renovarlas. Los trabajos y proyectos relacionados se toman automáticamente de sus catálogos según el tema; los títulos principales y los metadatos de cada área se editan en su HTML.
