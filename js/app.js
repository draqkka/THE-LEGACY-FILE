const L=window.LF,$=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const K='legacyfile.v3',DEF={step:1,max:1,ded:[],seen:[],num:false,read:false,q:0,prof:null};  // prof = índice do professor escolhido (os outros ficam bloqueados), q = pergunta atual (0-5)
let S=Object.assign({},DEF,JSON.parse(localStorage.getItem(K)||'{}')),AL=[];
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const ded=t=>{if(!S.ded.includes(t)){S.ded.push(t);save()}};
const ph=(f,a='')=>f?`<img src="${f}" alt="${a}" onerror="this.outerHTML='<div class=ph></div>'">`:'<div class="ph"></div>';
let lastF=null;
const modal=h=>{const m=$('#modal');lastF=document.activeElement;m.innerHTML=h;m.hidden=false;m.onclick=e=>{if(e.target===m)closeM()};const f=$('button',m);if(f)f.focus()};
const closeM=()=>{$('#modal').hidden=true;if(lastF&&lastF.isConnected)lastF.focus()};
const CL='<button class="btn" onclick="closeM()">Fechar</button>';
const norm=s=>s.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
// Gênero dos textos: usa o nome do professor ("Professora ..." = feminino) para "Bem-vinda", "investigadora" etc.
const GN=i=>{const f=i!=null&&L.professores[i]&&L.professores[i].nome.startsWith('Professora');return f?{bv:'Bem-vinda',inv:'investigadora',Inv:'Investigadora',dest:'Destinatária'}:{bv:'Bem-vindo',inv:'investigador',Inv:'Investigador',dest:'Destinatário'}};
/*HELPERS-RESPOSTA*/
const cl=s=>{let x=norm(s).replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim(),y;do{y=x;x=x.replace(/^(o|a|os|as|um|uma|e|eh|seria)\s+/,'')}while(x!=y);return x};
const ed=(a,b)=>{const d=[];for(let i=0;i<=a.length;i++){d[i]=[i];for(let j=1;j<=b.length;j++)d[i][j]=i?0:j}for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++){d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]==b[j-1]?0:1));if(i>1&&j>1&&a[i-1]==b[j-2]&&a[i-2]==b[j-1])d[i][j]=Math.min(d[i][j],d[i-2][j-2]+1)}return d[a.length][b.length]};
const tol=w=>w.includes(' ')?(w.length>=12?1:0):(w.length>=10?2:w.length>=5?1:0);  // erros leves só em palavras longas (evita aceitar "Ctrl V" no lugar de "Ctrl C")
const hit=(v,R)=>{const x=cl(v);return !!x&&R.some(r=>{const w=cl(r);return x==w||ed(x,w)<=tol(w)})};
/*FIM-HELPERS*/
function go(n){const f=$('#fade');f.classList.add('on');setTimeout(()=>{S.step=n;S.max=Math.max(S.max,n);save();reg('etapa',{etapa:n});$('#stage').className='';try{show()}finally{f.classList.remove('on')}},750)}
function hud(){const h=$('#hud'),n=S.step;h.hidden=n==1||n==11;if(h.hidden)return;
 h.innerHTML=`<span><b class="lb" style="font-weight:400">INVESTIGAÇÃO </b>Nº 018</span><span class="dots">${Array.from({length:11},(_,i)=>`<button class="${i<S.max?'on':''} ${i+1==n?'now':''}" data-n="${i+1}" aria-label="Etapa ${i+1}" ${i<S.max?'':'disabled'}></button>`).join('')}</span><span>DIA 0${Math.min(1+Math.floor((n-1)/3),4)}</span>`;
 $$('.dots button.on',h).forEach(d=>d.onclick=()=>go(+d.dataset.n))}
const FD=[['palavra','Palavra-chave'],['marcante','Característica marcante'],['mania','Mania'],['jeito','Método de ensino'],['momento','Momento marcante'],['registrado','Momento registrado'],['ensinamento','Ensinamento'],['deixado','Ensinamento deixado'],['pista','Pista do caso']];
const ficha=i=>{const p=L.professores[i],f=p.nome.startsWith('Professora')?'Professora':'Professor',rev=S.max>=10;
 return `<div class="paper dos"><small>Ficha de ${GN(i).inv} Nº 0${i+1}</small><div class="photo big" style="border-width:8px 8px 22px">${ph(rev?p.foto:'',p.nome)}</div><h2>${p.nome}</h2><dl><dt>Função</dt><dd>${f}</dd>${FD.map(([k,t])=>`<dt>${t}</dt><dd>${p[k]||'<span class="red" role="img" aria-label="informação sigilosa"></span>'}</dd>`).join('')}<dt>Status</dt><dd>${rev?'Caso encerrado':'Sob investigação'}</dd></dl><button class="btn" id="cl">Fechar</button></div>`};
const caderno=()=>`<div class="paper"><small>Caderno de Dedução</small><h2>Registros</h2>${S.ded.length?S.ded.map(d=>`<p>✓ ${d}</p>`).join(''):'<p>Nenhuma dedução registrada ainda.</p>'}${CL}</div>`;
// Registro de progresso e respostas (Neon via /api/registrar). Falha em silêncio: o site funciona sem o banco.
const VID=(()=>{try{let v=localStorage.getItem('legacyfile.vid');if(!v){v=(crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random());localStorage.setItem('legacyfile.vid',v)}return v}catch(e){return 'anon'}})();
const reg=(tipo,x={})=>{if(location.protocol=='file:')return;try{fetch('/api/registrar',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.assign({vid:VID,prof:S.prof,tipo},x)),keepalive:true}).catch(()=>{})}catch(e){}};
let V2='pick';  // tela 2: 'pick' = escolha de perfil | 'desk' = mesa do escritório
const ini=p=>p.nome.split(' ').pop()[0];
const PICK=()=>`<div class="paper tilt"><small>Arquivo confidencial</small><h2>Quem está sob investigação?</h2><p>Escolha o seu perfil para abrir o seu interrogatório. Depois da escolha, os outros perfis ficam bloqueados.</p></div><nav class="pks">${L.professores.map((p,i)=>S.prof!=null&&S.prof!==i?`<div class="pk lock" aria-label="Bloqueado"><span class="av">🔒</span>Bloqueado</div>`:`<button class="pk" data-k="${i}"><span class="av">${ini(p)}</span>${p.nome}<span class="ch">›</span></button>`).join('')}</nav>`;
const pickInit=()=>$$('.pk[data-k]').forEach(b=>b.onclick=()=>{const i=+b.dataset.k,p=L.professores[i];
 if(S.prof===i){V2='desk';go(2);return}
 modal(`<div class="paper"><small>Confirmação</small><h2>${p.nome}</h2><p>Este é o seu perfil? Depois de confirmar, os outros perfis ficam bloqueados.</p><button class="btn" onclick="closeM()">Voltar</button> <button class="btn" id="cf">Confirmar</button></div>`);
 $('#cf').onclick=()=>{closeM();S.prof=i;S.q=0;S.seen=[];save();reg('escolha');V2='desk';go(2)}});
function libera(){S=Object.assign({},DEF,{ded:[],seen:[]});save();V2='pick';history.replaceState(null,'',location.pathname+location.search)}  // acesse /#liberar para destravar o perfil neste navegador
const T={
1:()=>`<div class="seal a1">INVESTIGAÇÃO SECRETA</div><h1 class="a2"><small>THE</small>LEGACY FILE</h1><p class="sub a3">Uma investigação sobre aquilo que permanece.</p><div class="stamp a4">CONFIDENCIAL</div><button class="btn a5" id="go">Acessar investigação →</button>`,
2:()=>V2=='pick'?PICK():`<div class="paper tilt"><h2>${GN(S.prof).bv}, ${L.professores[S.prof].nome}.</h2><p>Aqui começa uma investigação especial. Explore a mesa e descubra as primeiras pistas.</p><button class="btn" data-o="c">Abrir a primeira correspondência</button></div><nav class="objs">${[['obj-envelope','Correspondências','c'],['obj-fotos','Evidências','e'],['obj-caderno','Caderno de Dedução','d'],['obj-arquivo','Arquivo','a']].map(([c,t,o])=>`<button class="obj" data-o="${o}"><img src="assets/${c}.webp" alt="">${t}</button>`).join('')}</nav><p class="msg" aria-live="polite" id="m"></p>`,
3:()=>{const c=L.carta;return`<div class="paper tilt"><small>Correspondência Nº ${c.n}</small><br><small>${GN(S.prof).dest}: ${GN(S.prof).Inv}</small><h2 class="fadeline" style="animation-delay:.8s">${c.palavra}</h2>${c.texto.map((t,i)=>`<p class="fadeline" style="animation-delay:${2+i*1.5}s">${t}</p>`).join('')}<p style="text-align:right;font-style:italic">${c.assinatura}</p><img class="pena" src="assets/pena.webp" alt=""><i class="wax"></i></div><button class="btn" id="ok">Registrar Dedução</button>`},
4:()=>`<div class="photo" style="${L.fotoEvidencia?`background-image:url(${L.fotoEvidencia})`:''}"><b class="num" id="n">${L.numero}</b><canvas id="sc"></canvas><img class="lupa" src="assets/lupa.webp" alt=""></div><div class="paper" style="max-width:340px"><small>Evidência Nº 01</small><p>Ao revelar a imagem, você descobrirá um número especial.</p><p class="msg" aria-live="polite" id="m">Arraste o dedo ou o mouse para raspar a imagem.</p></div><button class="btn dim" id="rv">Revelar sem raspar</button> <button class="btn" id="nx" hidden>Levar o número adiante</button>`,
5:()=>`<p>Seu número da sorte é:</p><div class="gears">${[...L.numero].map(d=>`<b>${d}</b>`).join('')}</div><div class="paper tilt" style="max-width:440px"><small id="pf"></small><br><small id="qn"></small><p id="qt" style="font-size:1.35rem;font-style:italic"></p></div><ol class="dicas" id="dc"></ol><div id="ctl"><input id="r" aria-label="Sua resposta" placeholder="Digite sua resposta..." autocomplete="off"> <button class="btn" id="ok">Confirmar</button> <button class="btn dim" id="dica">Pedir dica</button></div><p class="msg" aria-live="polite" id="m"></p><button class="btn" id="nx5" hidden>Continuar</button>`,
6:()=>`<h2>Quadro de Investigação</h2><div class="board" id="bd"><svg id="sv"></svg>${L.professores.map((p,i)=>i===S.prof?`<button class="card ${S.seen.includes(i)?'seen':''}" data-i="${i}">${ph(S.max>=10?p.foto:'',p.nome)}<br>${p.nome}</button>`:`<div class="card lock" aria-label="Bloqueado"><div class="ph"></div><br>🔒 Bloqueado</div>`).join('')}<div class="center">Conexões formando um quadro...</div></div><p class="msg" aria-live="polite" id="m">Toque na sua fotografia para ler a sua ficha.</p><button class="btn" id="nx" hidden>Seguir a pista</button>`,
7:()=>`<div class="paper" style="max-width:420px"><p>Reorganize os elementos para formar a frase correta.</p></div><div class="zone" id="z"><div class="words" id="zw"></div></div><div class="words" id="pl"></div><p class="msg" aria-live="polite" id="m"></p><div><button class="btn" id="ok">Confirmar</button> <button class="btn" id="hint">Dica</button> <button class="btn" id="nx" hidden>Continuar</button></div>`,
8:()=>`<div><div class="sil"></div></div><div><h2 class="fadeline" style="animation-delay:1s">O responsável foi identificado.</h2><p class="fadeline" style="animation-delay:2.5s">As evidências apontam para alguém que esteve presente em todos os registros, mas nunca apareceu como suspeito.</p><p class="fadeline" style="animation-delay:4s">A identidade será revelada após a última dedução.</p><button class="btn fadeline" style="animation-delay:5.5s" id="go">Identificar o informante</button><div id="sp" hidden></div></div>`,
// ▶ VÍDEO DO DEPOIMENTO FINAL: o arquivo é definido em data.js (campo "video" no fim do arquivo). Vazio = a TV mostra "O depoimento será exibido aqui."
9:()=>`<div class="tv"><img class="tvf" src="assets/tv-retro.webp" alt=""><span class="rec">● REC</span><div class="tvs">${L.video?`<video id="v" src="${L.video}" controls playsinline preload="metadata"></video>`:'<div class="none">O depoimento será exibido aqui.</div>'}</div></div><p style="max-width:520px">Durante toda esta investigação, você analisou pistas, resolveu charadas e descobriu o que realmente importa...</p><div><button class="btn" id="go">${L.video?'▶ Assistir Depoimento':'Continuar'}</button> ${L.video?'<button class="btn dim" id="sk">Seguir para o álbum</button>':''}</div>`,
10:()=>{AL=[...L.professores.map(p=>({foto:p.foto,t:p.nome})),...L.albumExtra.map(a=>({foto:a.foto,t:a.legenda||''}))];return`<div class="album">${AL.map((a,i)=>`<button class="pol" data-p="${i}">${ph(a.foto,a.t)}<br>${a.t}</button>`).join('')}</div><div class="paper tilt" style="max-width:340px"><h2 style="font-size:1.8rem">Caso encerrado.</h2><p>Memórias preservadas. ♡</p></div><div class="regs">${[['w','Todas as Palavras'],['f','As Fotos'],['c','O Caderno'],['l','A Carta'],['v','O Vídeo']].map(([k,t])=>`<button class="btn" data-r="${k}">${t}</button>`).join('')}</div>`},
11:()=>`<div class="paper tilt" style="padding:34px">${L.final.map((t,i)=>`<p class="fadeline" style="animation-delay:${1.5+i*1.6}s">${t}</p>`).join('')}<p class="fadeline" style="animation-delay:${2+L.final.length*1.6}s;text-align:right;font-style:italic">${L.assinaturaFinal}</p><i class="wax"></i></div><button class="btn fadeline dim" id="re" style="animation-delay:${16+L.final.length}s">Reabrir investigação</button>`};
const I={
1:()=>{$('#go').onclick=()=>{$('.stamp').classList.add('hot');$('#stage').classList.add('zoom');setTimeout(()=>{V2='pick';go(2)},900)}},
2:()=>V2=='pick'?pickInit():$$('[data-o]').forEach(b=>b.onclick=()=>{const o=b.dataset.o;if(o=='c')go(3);else if(o=='e'){S.max>=4?go(4):($('#m').textContent='Esta evidência ainda não foi encontrada. Comece pela correspondência.')}else if(o=='d')modal(caderno());else modal(`<div class="paper"><small>Arquivo</small><h2>Registros da investigação</h2><p>Correspondências lidas: ${S.read?1:0}</p><p>Evidências: ${S.num?1:0}</p><p>Fichas abertas: ${S.seen.length}/1</p>${CL}</div>`)}),
3:()=>$('#ok').onclick=()=>{S.read=true;ded('Correspondência Nº 001 lida: '+L.carta.palavra.replace('.',''));go(4)},
4:()=>{const c=$('#sc'),x=c.getContext('2d',{willReadFrequently:true}),w=c.width=c.offsetWidth,h=c.height=c.offsetHeight;$('#nx').onclick=()=>go(5);
 if(S.num){c.remove();$('#rv').hidden=true;$('#nx').hidden=false;$('#m').textContent='Número registrado: '+L.numero;return}
 x.fillStyle='#342c26';x.fillRect(0,0,w,h);for(let i=0;i<500;i++){x.fillStyle=`rgba(192,161,106,${Math.random()*.15})`;x.fillRect(Math.random()*w,Math.random()*h,3,3)}
 const done=()=>{if(S.num)return;S.num=true;ded('Evidência Nº 01: número '+L.numero+' encontrado');c.style.transition='opacity 1s';c.style.opacity=0;setTimeout(()=>c.remove(),1000);$('#n').classList.add('glow');$('#rv').hidden=true;$('#m').textContent='Evidência registrada. Número: '+L.numero;$('#nx').hidden=false};
 let last=null,n=0;const dr=e=>{const r=c.getBoundingClientRect(),p=[e.clientX-r.left,e.clientY-r.top];x.globalCompositeOperation='destination-out';x.lineWidth=56;x.lineCap='round';x.beginPath();x.moveTo(...(last||p));x.lineTo(...p);x.stroke();last=p;if(++n%10==0)chk()};
 const chk=()=>{if(S.num)return;const d=x.getImageData(0,0,w,h).data;let t=0,k=0;for(let i=3;i<d.length;i+=64){k++;if(d[i]<20)t++}if(t/k>.45)done()};
 c.onpointerdown=e=>{c.setPointerCapture(e.pointerId);last=null;dr(e)};c.onpointermove=e=>{if(e.buttons)dr(e)};c.onpointerup=()=>{last=null;chk()};
 $('#rv').onclick=done},
5:()=>{const p=L.professores[S.prof],Q=p.perguntas;let h=0,busy=false;
 // Interrogatório do professor escolhido: uma pergunta por vez (S.q). Só avança com resposta correta.
 const dots=(n,t)=>Array.from({length:t},(_,i)=>i<n?'●':'○').join(' ');
 const show=()=>{busy=false;$('#dc').innerHTML='';$('#m').textContent='';h=0;const nx=$('#nx5'),ctl=$('#ctl');nx.hidden=true;ctl.hidden=false;
  $('#pf').textContent=`Interrogatório · ${p.nome}${p.area?' · Área: '+p.area:''}`;
  if(S.q>=Q.length){ // interrogatório concluído
   $('#qn').textContent=dots(Q.length,Q.length)+'  Concluído';$('#qt').textContent=`${p.nome} respondeu a tudo. Uma nova pista foi liberada.`;
   // ▶ VÍDEO DO PROFESSOR: se p.video (data.js) estiver preenchido, o vídeo aparece aqui, ao concluir o interrogatório. Vazio = nada aparece.
   if(p.video&&!$('#qt video'))$('#qt').insertAdjacentHTML('afterend',`<video src="${p.video}" controls playsinline preload="metadata" style="width:100%;margin-top:12px"></video>`);
   ctl.hidden=true;nx.textContent='Continuar';nx.hidden=false;nx.onclick=()=>go(6);return}
  const q=Q[S.q];
  $('#qn').textContent=`Pergunta ${S.q+1} de ${Q.length}  ${dots(S.q,Q.length)}`;$('#qt').textContent=q.texto;$('#r').value='';$('#r').focus();$('#dica').disabled=false;$('#dica').textContent=`Pedir dica (1/${q.dicas.length})`};
 const ok=()=>{if(busy||S.q>=Q.length)return;const v=$('#r').value;if(!norm(v)){$('#r').focus();return}
  const q=Q[S.q];
  if(hit(v,q.respostas)){busy=true;reg('resposta',{q:S.q,r:v,ok:1});ded(`${S.q+1}. ${q.texto} → ${q.respostas[0]}`);S.q++;save();if(S.q>=Q.length)reg('concluiu');$('#m').textContent='Correto.';setTimeout(show,900)}
  else{reg('resposta',{q:S.q,r:v,ok:0});$('#m').textContent='Ainda não. Observe novamente as pistas.';$('#r').classList.add('shake');setTimeout(()=>$('#r').classList.remove('shake'),400)}};
 $('#dica').onclick=()=>{const q=Q[S.q];if(!q)return;if(h<q.dicas.length){reg('dica',{q:S.q,n:h+1});$('#dc').insertAdjacentHTML('beforeend',`<li>${q.dicas[h]}</li>`);h++;if(h>=q.dicas.length){$('#dica').disabled=true;$('#dica').textContent='Sem mais dicas'}else $('#dica').textContent=`Pedir dica (${h+1}/${q.dicas.length})`}};
 $('#ok').onclick=ok;$('#r').onkeydown=e=>e.key=='Enter'&&ok();show()},
6:()=>{const bd=$('#bd'),sv=$('#sv');const lines=()=>{if(!$('#bd'))return;sv.innerHTML='';const b=bd.getBoundingClientRect(),c=$('.center',bd).getBoundingClientRect();S.seen.forEach(i=>{const r=$$('.card',bd)[i].getBoundingClientRect();sv.insertAdjacentHTML('beforeend',`<line x1="${r.left+r.width/2-b.left}" y1="${r.top+r.height/2-b.top}" x2="${c.left+c.width/2-b.left}" y2="${c.top+c.height/2-b.top}"/>`)})};
 const fin=()=>{lines();if(S.seen.includes(S.prof)){ded('Ficha de '+GN(S.prof).inv+' aberta: '+L.professores[S.prof].nome);$('#nx').hidden=false;$('#m').textContent='A ficha aponta para alguém que não está neste quadro.'}};
 $$('button.card',bd).forEach(c=>c.onclick=()=>{const i=+c.dataset.i,p=L.professores[i];modal(ficha(i));$('#cl').onclick=()=>{closeM();if(!S.seen.includes(i)){S.seen.push(i);save();c.classList.add('seen')}fin()}});
 $('#nx').onclick=()=>go(7);setTimeout(fin,80);addEventListener('resize',lines)},
7:()=>{const W=L.frase.replace('.','').toLowerCase().split(' ');let pool=[...W].sort(()=>Math.random()-.5),zone=[],lvl=0;if(pool.join()==W.join())pool.reverse();
 const zw=$('#zw'),pl=$('#pl'),m=$('#m');const tile=w=>`<button class="tile" data-w="${w}">${w}</button>`;
 const draw=()=>{zw.innerHTML=zone.map(tile).join('');pl.innerHTML=pool.map(tile).join('');$$('.tile').forEach(bind)};
 const flip=w=>{if(zone.includes(w)){zone=zone.filter(x=>x!=w);pool.push(w)}else{pool=pool.filter(x=>x!=w);zone.push(w)}draw()};
 function bind(t){t.onkeydown=e=>{if(e.key==' '||e.key=='Enter'){e.preventDefault();const w=t.dataset.w;flip(w);const q=$(`.tile[data-w="${w}"]`);q&&q.focus()}};t.onpointerdown=e=>{const w=t.dataset.w,sx=e.clientX,sy=e.clientY;let g=null;t.setPointerCapture(e.pointerId);
  t.onpointermove=ev=>{if(!g&&Math.hypot(ev.clientX-sx,ev.clientY-sy)>7){g=t.cloneNode(true);g.classList.add('drag');document.body.append(g)}if(g){g.style.left=ev.clientX-30+'px';g.style.top=ev.clientY-20+'px'}};
  t.onpointerup=ev=>{t.onpointermove=t.onpointerup=null;const inZ=zone.includes(w);if(g){g.remove();const el=document.elementFromPoint(ev.clientX,ev.clientY);const ts=$$('.tile',zw).filter(q=>q.dataset.w!=w);zone=zone.filter(x=>x!=w);pool=pool.filter(x=>x!=w);
    if(el&&el.closest('#z')){const idx=ts.findIndex(q=>{const r=q.getBoundingClientRect();return ev.clientY<r.top||(ev.clientY<r.bottom&&ev.clientX<r.left+r.width/2)});zone.splice(idx<0?zone.length:idx,0,w)}else pool.push(w)}
   else{flip(w);return}draw()}}}
 $('#ok').onclick=()=>{if(zone.join(' ')==W.join(' ')){$('#z').classList.add('ok');m.textContent=L.frase;ded('Frase reconstruída: '+L.frase);$('#ok').hidden=$('#hint').hidden=true;$('#nx').hidden=false}else{m.textContent='Ainda não é essa a frase. Reorganize e tente de novo.';zw.classList.add('shake');setTimeout(()=>zw.classList.remove('shake'),400)}};
 $('#hint').onclick=()=>{lvl=Math.min(lvl+1,3);const k=[0,3,6,8][lvl];zone=W.slice(0,k);pool=W.slice(k).sort(()=>Math.random()-.5);m.textContent=['','Começa com “ensinar”.','Metade da frase já está no lugar.','Falta apenas o final.'][lvl];draw()};
 $('#nx').onclick=()=>go(8);draw()},
8:()=>$('#go').onclick=()=>{const sp=$('#sp');$('#go').hidden=true;sp.hidden=false;
 sp.innerHTML=`<p class="fadeline">Quem você acredita ser o informante?</p><div class="regs">${L.professores.map((p,i)=>`<button class="btn" data-s="${i}">${p.nome}</button>`).join('')}<button class="btn" data-s="n">Nenhum deles</button></div><div id="cd" hidden><p>Digite o código secreto formado pelas iniciais das perguntas.</p><input id="cod" aria-label="Código secreto" autocomplete="off" placeholder="Código..."> <button class="btn" id="cok">Confirmar</button> <button class="btn dim" id="cad">Abrir o caderno</button></div><p class="msg" aria-live="polite" id="m8"></p><button class="btn" id="nx8" hidden>Seguir para o depoimento</button>`;
 let wrong=0;const m=$('#m8');
 $$('[data-s]',sp).forEach(b=>b.onclick=()=>{const k=b.dataset.s;
  if(k=='n'){m.textContent='Você percebeu. A identidade será revelada após a última dedução.';ded('Os quatro professores foram descartados como suspeitos');$$('[data-s]',sp).forEach(x=>x.disabled=true);m.textContent='Você percebeu. Falta o código secreto.';$('#cd').hidden=false;$('#cod').focus();return}
  wrong++;b.disabled=true;b.classList.add('dim');m.textContent=L.professores[+k].nome+' deixou registros nesta investigação, mas não foi quem os guardou. Releia as pistas.'+(wrong>=2?' Nem todo mundo que guarda uma história aparece nela.':'')});
 const cod=()=>{if(norm($('#cod').value)==norm(L.codigo)){m.textContent='Código aceito. O informante está prestes a falar.';ded('Código secreto decifrado');$('#cd').hidden=true;$('#nx8').hidden=false}else{m.textContent='Ainda não. Compare a primeira letra de cada pergunta no caderno.';$('#cod').classList.add('shake');setTimeout(()=>$('#cod').classList.remove('shake'),400)}};
 $('#cok').onclick=cod;$('#cod').onkeydown=e=>e.key=='Enter'&&cod();$('#cad').onclick=()=>modal(caderno());
 $('#nx8').onclick=()=>{$('#stage').classList.add('zoom');setTimeout(()=>go(9),900)}},
9:()=>{const v=$('#v'),b=$('#go');if(!v){b.onclick=()=>go(10);return}b.onclick=()=>{v.play();b.hidden=true};v.onplay=()=>b.hidden=true;v.onended=()=>go(10);v.onerror=()=>{$('.rec').textContent='● vídeo indisponível';b.hidden=true};$('#sk').onclick=()=>go(10)},
10:()=>{$$('[data-p]').forEach(b=>b.onclick=()=>{const a=AL[+b.dataset.p];modal(`<div class="paper" style="max-width:380px"><div class="photo big" style="border-width:8px 8px 22px">${ph(a.foto,a.t)}</div><p>${a.t}</p>${CL}</div>`)});
 $$('[data-r]').forEach(b=>b.onclick=()=>{const r=b.dataset.r;if(r=='l')go(11);else if(r=='v')go(9);else if(r=='c')modal(caderno());else if(r=='w')modal(`<div class="paper"><small>Todas as Palavras</small>${(L.palavras||[]).map(w=>`<p><b>${w}</b></p>`).join('')}${CL}</div>`);else modal(`<div class="paper"><div class="album">${AL.map(a=>`<div class="pol">${ph(a.foto,a.t)}<br>${a.t}</div>`).join('')}</div>${CL}</div>`)})},
11:()=>$('#re').onclick=()=>{S=Object.assign({},DEF,{ded:[],seen:[],prof:S.prof});save();go(1)}};
function show(){if(S.step>2&&S.prof==null)S.step=2;const n=S.step;$('#stage').innerHTML=`<section class="scr s${n}">${T[n]()}</section>`;hud();I[n]()}
addEventListener('keydown',e=>e.key=='Escape'&&closeM());
addEventListener('hashchange',()=>{if(location.hash=='#liberar'){libera();show()}});
if(location.hash=='#liberar')libera();
show();
