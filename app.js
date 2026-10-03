(() => {
  'use strict';
  const lang = document.documentElement.lang === 'es' ? 'es' : 'en';
  const ui = {
    en: {menu:'Menu',close:'Close',statuses:{publication:'Publication',working:'Working paper',progress:'Work in progress',outreach:'Outreach'},topics:{transportation:'Transportation',supply:'Supply chains',digital:'Digital economics',food:'Food & trade'},overview:'Abstract & details',read:'Read the paper',outreach:'Read the article',request:'Request the manuscript',discuss:'Discuss the project',collaborate:'Discuss a collaboration',expertise:'Research areas / Academic collaboration',subject:'Research inquiry: ',count:n=>`${n} ${n===1?'work':'works'}`},
    es: {menu:'Menú',close:'Cerrar',statuses:{publication:'Publicación',working:'Documento de trabajo',progress:'Trabajo en curso',outreach:'Divulgación'},topics:{transportation:'Transporte',supply:'Cadenas de suministro',digital:'Economía digital',food:'Alimentos y comercio'},overview:'Resumen y detalles',read:'Leer el documento',outreach:'Leer el artículo',request:'Solicitar el manuscrito',discuss:'Conversar sobre el proyecto',collaborate:'Proponer una colaboración',expertise:'Áreas de investigación / Colaboración académica',subject:'Consulta de investigación: ',count:n=>`${n} ${n===1?'trabajo':'trabajos'}`}
  }[lang];
  const data = window.NEXO_RESEARCH || {items:[],email:'ge.nino183@uniandes.edu.co'};
  const local = value => typeof value === 'string' ? value : (value?.[lang] || value?.en || '');
  const validURL = value => {
    if (!value) return '';
    try { const url = new URL(value, location.href); return ['https:','http:'].includes(url.protocol) || (value.startsWith('assets/') && !value.includes('..')) ? value : ''; } catch { return ''; }
  };
  const items = data.items.filter(item => item.id && item.title && ui.statuses[item.status]);
  const papers = new Map(items.map(item => [item.id, item]));
  const requestURL = title => `mailto:${data.email}?subject=${encodeURIComponent(ui.subject + title)}`;
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  function setMenu(open) {menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);menu.querySelector('.menu-label').textContent=open?ui.close:ui.menu;}
  menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){setMenu(false);menu.focus();}});
  window.matchMedia('(min-width: 1281px)').addEventListener('change',event=>{if(event.matches)setMenu(false);});
  document.querySelectorAll('.language-switch a').forEach(link=>link.addEventListener('click',()=>{link.href=link.getAttribute('href').split(/[?#]/)[0]+location.search+location.hash;}));
  // Catalog entries are rendered after parsing, so honor links from area pages once they exist.
  document.addEventListener('DOMContentLoaded',()=>{
    if(!/^#(?:paper|project)-/.test(location.hash))return;
    const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if(target&&!target.hidden)document.fonts.ready.then(()=>target.scrollIntoView({block:'start',behavior:'instant'}));
  });
  function element(tag, className, text) {const node=document.createElement(tag);if(className)node.className=className;if(text)node.textContent=text;return node;}
  const list=document.querySelector('#research-list');
  if(list) items.forEach(item=>{
    const card=element('article','research-card research-item');
    card.id='paper-'+item.id;
    card.dataset.topics=(item.topics||[]).join(' ');card.dataset.status=item.status;card.dataset.id=item.id;
    const body=element('div','research-item-body');
    const status=element('p','paper-type',ui.statuses[item.status]);
    if(local(item.note)&&local(item.note).toLowerCase()!==ui.statuses[item.status].toLowerCase())status.append(document.createTextNode(' · '+local(item.note)));
    body.append(status);
    const heading=element('h3');
    const title=element('a','',local(item.title));title.href=validURL(item.url)||requestURL(local(item.title));title.dataset.paper=item.id;title.lang=item.titleLanguage||'en';heading.append(title);body.append(heading);
    if(item.authors)body.append(element('p','research-authors',item.authors));
    if(local(item.citation))body.append(element('p','research-citation',local(item.citation)));
    body.append(element('p','research-summary',local(item.summary)));
    const tags=element('div','research-topics');(item.topics||[]).forEach(topic=>{if(ui.topics[topic])tags.append(element('span','',ui.topics[topic]));});body.append(tags);card.append(body);
    const actions=element('div','research-item-actions');
    const overview=element('button','card-link',ui.overview);overview.type='button';overview.dataset.paper=item.id;overview.append(element('span','','↗'));actions.append(overview);
    if(!validURL(item.url)){const request=element('a','manuscript-link',item.status==='progress'?ui.discuss:ui.request);request.href=requestURL(local(item.title));actions.append(request);}
    card.append(actions);list.append(card);
  });
  document.querySelectorAll('[data-status-count]').forEach(node=>{node.textContent=String(items.filter(item=>item.status===node.dataset.statusCount).length);});
  if(list){
  const params=new URLSearchParams(location.search),requestedTopic=params.get('topic'),requestedStatus=params.get('status');
  function linkedPaper(){try{return location.hash.startsWith('#paper-')?papers.get(decodeURIComponent(location.hash.slice(7))):undefined;}catch{return undefined;}}
  const initialPaper=linkedPaper();
  let topic=initialPaper?'all':(Object.hasOwn(ui.topics,requestedTopic)?requestedTopic:'all');
  let status=initialPaper?.status||(Object.hasOwn(ui.statuses,requestedStatus)?requestedStatus:'publication');
  const search=document.querySelector('#research-search');
  search.value=initialPaper?'':(params.get('q')||'');
  const normalize=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase(lang);
  function filterResearch(){
    const query=normalize(search.value.trim());let count=0;
    document.querySelectorAll('.research-item').forEach(card=>{
      const item=papers.get(card.dataset.id);
      const haystack=normalize([local(item.title),item.authors,local(item.summary),local(item.abstract),local(item.citation),...(item.topics||[]).map(key=>ui.topics[key])].join(' '));
      const visible=(topic==='all'||(item.topics||[]).includes(topic))&&item.status===status&&(!query||haystack.includes(query));
      card.hidden=!visible;if(visible)count++;
    });
    document.querySelector('#research-count').textContent=ui.count(count);document.querySelector('#research-empty').hidden=count!==0;
    const url=new URL(location.href);url.searchParams.set('status',status);
    if(topic==='all')url.searchParams.delete('topic');else url.searchParams.set('topic',topic);
    if(search.value.trim())url.searchParams.set('q',search.value.trim());else url.searchParams.delete('q');
    const linked=linkedPaper();if(linked&&document.getElementById('paper-'+linked.id)?.hidden)url.hash='research';
    history.replaceState(null,'',url);
  }
  function activate(selector,chosen){document.querySelectorAll(selector).forEach(button=>{const selected=button===chosen;button.classList.toggle('active',selected);button.setAttribute('aria-pressed',String(selected));});}
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{topic=button.dataset.filter;activate('[data-filter]',button);filterResearch();}));
  document.querySelectorAll('.status-filter').forEach(button=>button.addEventListener('click',()=>{status=button.dataset.status;activate('.status-filter',button);filterResearch();}));
  search.addEventListener('input',filterResearch);
  document.querySelector('#reset-research').addEventListener('click',()=>{topic='all';search.value='';activate('[data-filter]',document.querySelector('[data-filter="all"]'));filterResearch();});
  activate('[data-filter]',document.querySelector(`[data-filter="${topic}"]`));
  activate('.status-filter',document.querySelector(`.status-filter[data-status="${status}"]`));
  filterResearch();
  window.addEventListener('hashchange',()=>{
    const item=linkedPaper();if(!item)return;
    status=item.status;topic='all';search.value='';
    activate('[data-filter]',document.querySelector('[data-filter="all"]'));
    activate('.status-filter',document.querySelector(`.status-filter[data-status="${status}"]`));filterResearch();
    document.fonts.ready.then(()=>document.getElementById('paper-'+item.id).scrollIntoView({block:'start',behavior:'instant'}));
  });
  }
  const dialog=document.querySelector('#detail-dialog');let opener;
  function openDetail(content,source){
    if(typeof dialog.showModal!=='function')return false;
    opener=source;document.querySelector('#dialog-label').textContent=content.label;document.querySelector('#dialog-title').textContent=content.title;document.querySelector('#dialog-meta').textContent=content.meta;
    document.querySelector('#dialog-body').replaceChildren(...content.paragraphs.filter(Boolean).map(text=>element('p','',text)));
    const link=document.querySelector('#dialog-link');link.href=content.url;link.replaceChildren(document.createTextNode(content.action+' '));const arrow=element('span','','↗');arrow.setAttribute('aria-hidden','true');link.append(arrow);
    if(/^https?:/.test(content.url)||content.url.startsWith('assets/')){link.target='_blank';link.rel='noopener noreferrer';}else{link.removeAttribute('target');link.removeAttribute('rel');}
    dialog.showModal();document.body.classList.add('dialog-open');return true;
  }
  document.addEventListener('click',event=>{
    const source=event.target.closest('[data-paper]');if(!source||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    const item=papers.get(source.dataset.paper);if(!item)return;
    const url=validURL(item.url);
    const content={label:ui.statuses[item.status],title:local(item.title),meta:[item.authors,local(item.citation),local(item.note)].filter(Boolean).join(' · '),paragraphs:(local(item.abstract)||local(item.summary)).split('\n').filter(Boolean),url:url||requestURL(local(item.title)),action:url?(item.status==='outreach'?ui.outreach:ui.read):(item.status==='progress'?ui.discuss:ui.request)};
    if(openDetail(content,source))event.preventDefault();
  });
  document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{const box=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom))dialog.close();});
  dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');if(opener?.isConnected)opener.focus();});
  document.querySelector('#year').textContent=new Date().getFullYear();
})();
