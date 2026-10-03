(() => {
  'use strict';
  const lang=document.documentElement.lang==='es'?'es':'en';
  const local=value=>typeof value==='string'?value:(value?.[lang]||value?.en||'');
  const ui=lang==='es'?{ongoing:'En curso',completed:'Finalizado',details:'Detalles del proyecto',read:'Ver el proyecto',discuss:'Conversar sobre el proyecto',website:'Sitio web / Perfil académico',cv:'Currículum',count:n=>`${n} ${n===1?'proyecto':'proyectos'}`,topics:{transportation:'Transporte',supply:'Cadenas de suministro',digital:'Economía digital',food:'Alimentos y comercio'}}:{ongoing:'Ongoing',completed:'Completed',details:'Project details',read:'View the project',discuss:'Discuss the project',website:'Website / Academic profile',cv:'Curriculum vitae',count:n=>`${n} ${n===1?'project':'projects'}`,topics:{transportation:'Transportation',supply:'Supply chains',digital:'Digital economics',food:'Food & trade'}};
  const el=(tag,cls,text)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(text)node.textContent=text;return node;};
  const safe=value=>{try{return /^https?:$/.test(new URL(value).protocol)?value:'';}catch{return '';}};
  const asset=value=>/^assets\/[a-zA-Z0-9/_ .-]+$/.test(value||'')&&!value.includes('..')?value:'';
  const localPDF=value=>/^(?:assets\/(?:[a-zA-Z0-9_ .-]+\/)*)?[a-zA-Z0-9_ .-]+\.pdf$/i.test(value||'')&&!value.includes('..')?value:'';
  const link=(label,url)=>{const a=el('a','text-link',label+' ↗');a.href=url;if(/^https?:/.test(url)||localPDF(url)){a.target='_blank';a.rel='noopener noreferrer';}return a;};
  const list=document.querySelector('#project-list');
  if(list){
    const data=window.NEXO_PROJECTS||{items:[]};
    data.items.forEach(item=>{
      const card=el('article','project-card');card.id='project-'+item.id;card.dataset.status=item.status;card.dataset.search=[local(item.title),item.authors,local(item.summary),local(item.methods),...(item.topics||[]).map(t=>ui.topics[t])].join(' ').toLocaleLowerCase(lang);
      if(asset(item.image)){const image=el('img');image.src=asset(item.image);image.alt='';image.loading='lazy';card.append(image);}
      const body=el('div','project-body');body.append(el('p','eyebrow',ui[item.status]||item.status),el('h2','',local(item.title)),el('p','project-summary',local(item.summary)));
      if(local(item.methods))body.append(el('p','project-methods',local(item.methods)));
      const details=el('details','project-details');details.append(el('summary','',ui.details));
      if(item.authors)details.append(el('p','',item.authors));if(local(item.citation))details.append(el('p','',local(item.citation)));
      if(local(item.abstract))details.append(el('p','',local(item.abstract)));body.append(details);
      const url=safe(item.url)||asset(item.url);body.append(link(url?ui.read:ui.discuss,url||`mailto:${data.email}?subject=${encodeURIComponent(local(item.title))}`));card.append(body);list.append(card);
    });
    let status='all';const search=document.querySelector('#project-search');
    function filter(){let count=0;const query=search.value.trim().toLocaleLowerCase(lang);[...list.children].forEach(card=>{card.hidden=!((status==='all'||card.dataset.status===status)&&(!query||card.dataset.search.includes(query)));if(!card.hidden)count++;});document.querySelector('#project-count').textContent=ui.count(count);document.querySelector('#project-empty').hidden=count!==0;}
    document.querySelectorAll('[data-project-status]').forEach(button=>button.addEventListener('click',()=>{status=button.dataset.projectStatus;document.querySelectorAll('[data-project-status]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});filter();}));search.addEventListener('input',filter);filter();
  }
  const people=document.querySelector('#people-list');
  if(people){
    const category=people.dataset.category;people.classList.toggle('team-directory',category==='team');
    (window.NEXO_PEOPLE?.items||[]).filter(person=>person.category===category).forEach(person=>{
      const card=el('article','person-card');
      if(asset(person.image)){const image=el('img','person-photo');image.src=person.image;image.alt=(lang==='es'?'Retrato de ':'Portrait of ')+person.name;image.loading='lazy';card.append(image);}else{const initials=el('div','person-placeholder',person.name.split(' ').filter(Boolean).map(s=>s[0]).slice(0,2).join(''));initials.setAttribute('aria-hidden','true');card.append(initials);}
      const body=el('div','person-body');body.append(el('p','eyebrow',local(person.role)),el('h2','',person.name));if(person.institution)body.append(el('p','person-institution',person.institution));if(local(person.bio))body.append(el('p','person-bio',local(person.bio)));
      const links=el('div','person-links');if(safe(person.url))links.append(link(ui.website,person.url));if(safe(person.linkedin))links.append(link('LinkedIn',person.linkedin));if(safe(person.scholar))links.append(link('Google Scholar',person.scholar));const cv=safe(person.cv)||localPDF(person.cv);if(cv)links.append(link(ui.cv,cv));body.append(links);card.append(body);people.append(card);
    });
  }
})();
