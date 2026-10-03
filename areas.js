(() => {
 'use strict';
 const container=document.querySelector('[data-area-page]');if(!container)return;
 const lang=document.documentElement.lang==='es'?'es':'en',data=window.NEXO_AREAS;
 const area=data?.areas.find(a=>a.id===container.dataset.areaPage);if(!area)return;
 const local=value=>typeof value==='string'?value:(value?.[lang]||value?.en||'');
 const ui=lang==='es'?{source:'Leer la fuente',perspective:'Conexión con nuestra investigación',published:'Publicado',research:'Ver en Investigación',project:'Ver en Proyectos',statuses:{publication:'Publicación',working:'Documento de trabajo',progress:'Trabajo en curso',outreach:'Divulgación'},projects:{ongoing:'En curso',completed:'Finalizado'},allResearch:'Toda la investigación del área',allProjects:'Todos los proyectos'}:{source:'Read the source',perspective:'Connection to our research',published:'Published',research:'View in Research',project:'View in Projects',statuses:{publication:'Publication',working:'Working paper',progress:'Work in progress',outreach:'Outreach'},projects:{ongoing:'Ongoing',completed:'Completed'},allResearch:'All research in this area',allProjects:'All projects'};
 const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text)el.textContent=text;return el;};
 const page=(name)=>name+(lang==='es'?'-es':'')+'.html';
 const anchor=(label,href)=>{const a=node('a','text-link',label+' ↗');a.href=href;return a;};
 document.querySelector('#area-overview').replaceChildren(...local(area.overview).map(text=>node('p','',text)));
 document.querySelector('#area-questions').replaceChildren(...local(area.questions).map(text=>node('li','',text)));
 document.querySelector('#area-methods').textContent=local(area.methods);
 document.querySelector('#area-research-intro').textContent=local(area.researchIntro);
 const date=(value)=>new Intl.DateTimeFormat(lang==='es'?'es-CO':'en-GB',{...(value.length>7?{day:'numeric'}:{}),month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(value.length===7?value+'-01T12:00:00Z':value+'T12:00:00Z'));
 const review=document.querySelector('#area-reviewed');review.dateTime=data.reviewed;review.textContent=date(data.reviewed);
 const newsList=document.querySelector('#area-news');
 area.news.forEach(item=>{
  const card=node('article','news-card');const meta=node('p','eyebrow',item.source+' / ');const time=node('time','',date(item.date));time.dateTime=item.date;meta.append(time);card.append(meta,node('h3','',local(item.title)),node('p','news-summary',local(item.summary)));
  const source=anchor(ui.source,item.url);source.target='_blank';source.rel='noopener noreferrer';card.append(source);
  const connection=node('div','news-connection');connection.append(node('p','connection-label',ui.perspective),node('p','',local(item.connection)));card.append(connection);newsList.append(card);
 });
 const research=window.NEXO_RESEARCH?.items||[],related=research.filter(item=>(item.topics||[]).includes(area.id));
 related.sort((a,b)=>{const ai=area.preferred.indexOf(a.id),bi=area.preferred.indexOf(b.id);return (ai<0?999:ai)-(bi<0?999:bi);});
 const list=document.querySelector('#area-research');
 related.slice(0,3).forEach(item=>{const card=node('article','area-work');card.append(node('p','eyebrow',ui.statuses[item.status]||item.status));const title=node('h3');const a=anchor(local(item.title),page('research')+'#paper-'+encodeURIComponent(item.id));a.className='area-work-title';a.lang=item.titleLanguage||'en';title.append(a);card.append(title);if(item.authors)card.append(node('p','area-work-authors',item.authors));card.append(node('p','area-work-summary',local(item.summary)),anchor(ui.research,a.href));list.append(card);});
 document.querySelector('#area-all-research').href=page('research')+'?topic='+encodeURIComponent(area.id)+'#research';
 const projects=(window.NEXO_PROJECTS?.items||[]).filter(item=>(item.topics||[]).includes(area.id));
 const projectList=document.querySelector('#area-projects');
 if(projects.length){projects.slice(0,2).forEach(item=>{const card=node('article','area-project');card.append(node('p','eyebrow',ui.projects[item.status]||item.status),node('h3','',local(item.title)),node('p','',local(item.summary)),anchor(ui.project,page('projects')+'#project-'+encodeURIComponent(item.id)));projectList.append(card);});}else{document.querySelector('#area-project-section').hidden=true;}
})();
