(() => {
  'use strict';
  let data=structuredClone(window.NEXO_RESEARCH||{email:'ge.nino183@uniandes.edu.co',items:[]});
  let selected=null,formDirty=false,listDirty=false;
  const form=document.querySelector('#research-form');
  const field=id=>document.querySelector('#'+id);
  const local=(value,language)=>typeof value==='string'?value:(value?.[language]||'');
  const labels={publication:'Publicación',working:'Documento de trabajo',progress:'Trabajo en curso',outreach:'Divulgación'};
  const notice=text=>{field('editor-notice').textContent=text;};
  function renderList(){
    const list=field('editor-list');list.replaceChildren();field('editor-total').textContent=`(${data.items.length})`;
    data.items.forEach(item=>{
      const button=document.createElement('button');button.type='button';button.className='editor-list-button'+(item.id===selected?' active':'');button.dataset.id=item.id;button.textContent=local(item.title,'en');
      const status=document.createElement('span');status.textContent=labels[item.status]||item.status;button.append(status);
      button.addEventListener('click',()=>{
        if(formDirty){notice('Guarda el formulario en la lista antes de seleccionar otro trabajo.');return;}
        loadItem(item.id);
      });list.append(button);
    });
  }
  function loadItem(id){
    selected=id;const item=data.items.find(item=>item.id===id);form.reset();field('form-error').hidden=true;field('delete-confirm').hidden=true;
    field('form-title').textContent=item?'Editar trabajo':'Agregar un trabajo';
    field('item-id').value=item?.id||'';field('item-title').value=local(item?.title,'en');field('item-status').value=item?.status||'progress';field('title-language').value=item?.titleLanguage||'en';field('item-authors').value=item?.authors||'Gustavo Enrique Niño';field('item-citation').value=local(item?.citation,'en');field('item-url').value=item?.url||'';
    for(const lang of ['en','es']){field('note-'+lang).value=local(item?.note,lang);field('summary-'+lang).value=local(item?.summary,lang);field('abstract-'+lang).value=local(item?.abstract,lang);}
    form.querySelectorAll('[name="topics"]').forEach(input=>input.checked=(item?.topics||[]).includes(input.value));
    field('delete-research').hidden=!item;formDirty=false;renderList();
  }
  function readForm(){
    const topics=[...form.querySelectorAll('[name="topics"]:checked')].map(input=>input.value);
    if(!topics.length)throw new Error('Selecciona al menos un área de investigación.');
    const url=field('item-url').value.trim();
    if(url){
      const relative=/^assets\/[^\\]+\.pdf$/i.test(url)&&!url.includes('..');
      let external=false;try{external=['https:','http:'].includes(new URL(url).protocol);}catch{}
      if(!relative&&!external)throw new Error('Usa un enlace http/https o una ruta como assets/papers/documento.pdf.');
    }
    const previous=data.items.find(item=>item.id===selected)||{};
    return {...previous,id:selected||'paper-'+crypto.randomUUID(),title:field('item-title').value.trim(),titleLanguage:field('title-language').value,status:field('item-status').value,authors:field('item-authors').value.trim(),citation:field('item-citation').value.trim(),note:{en:field('note-en').value.trim(),es:field('note-es').value.trim()},topics,summary:{en:field('summary-en').value.trim(),es:field('summary-es').value.trim()},abstract:{en:field('abstract-en').value.trim(),es:field('abstract-es').value.trim()},url};
  }
  form.addEventListener('input',()=>formDirty=true);
  form.addEventListener('submit',event=>{
    event.preventDefault();try{
      const item=readForm();if(!item.title||!item.authors||!item.summary.en||!item.summary.es)throw new Error('Completa el título, los autores y los resúmenes en ambos idiomas.');
      const index=data.items.findIndex(existing=>existing.id===selected);if(index<0)data.items.push(item);else data.items[index]=item;
      selected=item.id;listDirty=true;loadItem(selected);notice('Trabajo guardado en la lista. Descarga el archivo actualizado para conservar los cambios.');
    }catch(error){field('form-error').textContent=error.message;field('form-error').hidden=false;}
  });
  field('add-research').addEventListener('click',()=>{if(formDirty){notice('Guarda el formulario antes de agregar otro trabajo.');return;}loadItem(null);field('item-title').focus();});
  function serialize(){return '/* Shared research catalog for both language versions. */\nwindow.NEXO_RESEARCH = '+JSON.stringify(data,null,2)+';\n';}
  field('export-research').addEventListener('click',()=>{
    if(formDirty){notice('Primero selecciona “Guardar en la lista” para incluir los cambios del formulario.');return;}
    const blob=new Blob([serialize()],{type:'application/javascript;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='research-data.js';link.click();setTimeout(()=>URL.revokeObjectURL(url),2000);
    listDirty=false;notice('Archivo descargado. Reemplaza research-data.js en la carpeta del sitio y recarga ambas versiones.');
  });
  field('import-research').addEventListener('change',async event=>{
    const file=event.target.files[0];if(!file)return;
    if(formDirty||listDirty){notice('Descarga tus cambios actuales antes de abrir otro archivo.');event.target.value='';return;}
    try{
      const text=await file.text();const match=text.match(/window\.NEXO_RESEARCH\s*=\s*([\s\S]*?)\s*;?\s*$/);if(!match)throw new Error('El archivo no tiene el formato esperado. Selecciona research-data.js.');
      const parsed=JSON.parse(match[1].replace(/;\s*$/,''));
      if(!Array.isArray(parsed.items)||typeof parsed.email!=='string')throw new Error('El catálogo debe incluir email e items.');
      const ids=new Set();for(const item of parsed.items){if(!item.id||ids.has(item.id)||!item.title||!labels[item.status])throw new Error('Hay un trabajo inválido o un identificador repetido.');ids.add(item.id);}
      data=parsed;listDirty=false;loadItem(data.items[0]?.id||null);notice('Archivo cargado. Puedes editar los trabajos.');
    }catch(error){notice(error.message);}finally{event.target.value='';}
  });
  field('delete-research').addEventListener('click',()=>field('delete-confirm').hidden=false);
  field('cancel-delete').addEventListener('click',()=>field('delete-confirm').hidden=true);
  field('confirm-delete').addEventListener('click',()=>{data.items=data.items.filter(item=>item.id!==selected);listDirty=true;loadItem(data.items[0]?.id||null);notice('Trabajo eliminado de la lista. Descarga el archivo para conservar el cambio.');});
  window.addEventListener('beforeunload',event=>{if(formDirty||listDirty){event.preventDefault();event.returnValue='';}});
  loadItem(data.items[0]?.id||null);
  // Used by the export button and local verification; never sends data to a server.
  window.NEXO_EDITOR={serialize:()=>serialize()};
})();
