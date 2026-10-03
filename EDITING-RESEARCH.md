# Add or update your research / Agrega o actualiza tu investigación

## English

Open **manage-research.html** in your browser. The editor labels are in Spanish, and each paper has clearly marked English and Spanish summary fields.

1. Select a paper from the list, or click **Agregar un trabajo** to add one.
2. Enter the original title, all authors in citation order, and the status:
   - **Publicación**: published or accepted article.
   - **Documento de trabajo**: working paper.
   - **Trabajo en curso**: work in progress.
   - **Divulgación**: outreach article.
3. Add the journal/year/citation if applicable and choose the research topics.
4. Add the short summary in **English** and **Español**. You can also add longer abstracts for the detail dialog. If you omit a longer abstract, the website uses the short summary.
5. Add a document link if available. You can use a publisher URL, a shared manuscript URL, or a local PDF path such as `assets/papers/my-paper.pdf`. For a local PDF, copy the PDF into `assets/papers/` as well. Leave the link empty for unfinished work; the website offers an email request or project inquiry instead.
6. Click **Guardar en la lista**. This prepares the change in the editor.
7. Click **Descargar archivo actualizado**. Replace the existing **research-data.js** in the website folder with the downloaded file. Keep the exact filename; remove any `(1)` suffix added by your browser. Reload the English and Spanish pages to see your changes.
8. If the site is online, upload the replacement `research-data.js` and any new PDFs to the same GitHub repository and commit. The two languages update from that one research file.

You do not need to edit HTML, CSS, or the website’s application code. Keep a backup of the old `research-data.js` before replacing it.

To turn a working paper into a publication, select it, change **Estado** to **Publicación**, add the journal citation and status notes, and follow the same save/download steps. To remove a paper, use **Eliminar de la lista**, confirm the removal, and download the updated file.

The editor does not save directly to your website or GitHub. Closing the editor before saving/downloading can discard prepared changes; it warns you if there are unsaved changes. The optional **Abrir un archivo existente** control imports a previous `research-data.js` file without running its contents.

## Español

Abre **manage-research.html** en tu navegador.

1. Selecciona un trabajo de la lista o pulsa **Agregar un trabajo**.
2. Escribe el título original, los autores en el orden de la referencia y el **Estado**: publicación, documento de trabajo, trabajo en curso o divulgación.
3. Agrega la revista, el año o la referencia cuando corresponda, y selecciona las áreas de investigación.
4. Completa los resúmenes breves en **English** y **Español**. Los resúmenes completos son opcionales; si los dejas vacíos, se usa el resumen breve.
5. Incluye el enlace al artículo o al manuscrito si existe. Para un PDF propio, copia el documento en `assets/papers/` y escribe una ruta como `assets/papers/mi-articulo.pdf`. Si no hay manuscrito público, deja el campo vacío: el sitio ofrecerá solicitarlo o conversar sobre el proyecto por correo.
6. Pulsa **Guardar en la lista** y después **Descargar archivo actualizado**.
7. Reemplaza **research-data.js** en la carpeta del sitio con el archivo descargado. Si el navegador añade `(1)`, quítalo del nombre. Conserva una copia del archivo anterior.
8. Recarga las páginas en inglés y español. Si el sitio está publicado, sube el archivo actualizado y los nuevos PDF al mismo repositorio de GitHub.

Para pasar un documento de trabajo a publicación, cambia su **Estado**, agrega la referencia y las notas correspondientes, y guarda el archivo actualizado. Para eliminarlo, pulsa **Eliminar de la lista**, confirma y descarga el archivo.

Los cambios no se publican automáticamente: debes reemplazar el archivo en la carpeta del sitio y, cuando corresponda, en GitHub. El botón **Abrir un archivo existente** permite cargar un catálogo guardado previamente.
