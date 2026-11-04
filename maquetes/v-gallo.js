// Versão Gallo 1927: cabeçalho, rodapé, cartão e as três páginas. Dados em comum.js.
const GL = { inicio: "gallo-inicio.html", lista: "gallo-lista.html", produto: "gallo-produto.html" };
const CORACAO = '<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z"/></svg>';
const GL_ICO = {
  envio: '<svg viewBox="0 0 24 24"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
  troca: '<svg viewBox="0 0 24 24"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>',
  cadeado: '<svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="9.5" rx="1.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>',
  estrela: '<svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/></svg>',
};

function cabecalhoGL() {
  return `<div class="gl-anuncio"><span data-d="D3">−${REGRAS.pack3} % dès 3 paires</span><span data-d="D1">Livraison offerte dès ${REGRAS.freteGratis} €</span><span>◆ L’atelier · Paris 18<sup>e</sup></span></div>
  <header class="gl-topo"><div class="dentro">
    <nav aria-label="Menu principal"><a href="${GL.lista}">Chaussettes</a><a href="${GL.lista}">Accessoires</a><a href="${GL.inicio}#selecao">Coffrets</a><a href="#">L’association</a></nav>
    <a class="gl-menu-cel" href="#" aria-label="Menu">${ICONE.menu}</a>
    <a class="logo" href="${GL.inicio}"><img src="https://chaussettesorphelines.com/cdn/shop/files/Logo_Chaussettes_Orphelines_black_2024_1_450x.png?v=1726070443" alt="Chaussettes Orphelines"></a>
    <div class="direita"><a class="so-pc" href="#">Contact</a><a class="so-pc" href="#" aria-label="Rechercher">${ICONE.busca}</a><a class="so-pc" href="#" aria-label="Mon compte">${ICONE.conta}</a><a class="so-pc" href="#" aria-label="Favoris">${ICONE.coracao}</a><a href="${GL.produto}?panier=1" aria-label="Panier">${ICONE.sacola}<span class="contador">2</span></a></div>
  </div></header>`;
}

function cartaoGL(id) {
  const p = itemNM(id);
  const nome = ["bonnet", "echarpe", "mitaines"].includes(p.base) ? p.nome : p.tipoCurto.startsWith("Chaussettes") ? `${p.tipoCurto} ${p.nome}` : `Chaussettes ${p.tipoCurto.toLowerCase()} ${p.nome}`;
  return `<article class="gl-cartao${p.semFoto ? " sem-foto" : ""}">
    <div class="foto"><img src="${img(p.fotos[0], 600)}" alt="${nome}"><img src="${img(p.fotos[1], 600)}" alt="">${p.semFoto ? `<span class="aviso-foto">Foto « natureza morta » a fazer</span>` : ""}</div>
    <button class="coracao" aria-label="Ajouter aux favoris">${CORACAO}</button>
    <h3><a href="${GL.produto}">${nome}, ${p.cor.toLowerCase()} · ${p.materia.toLowerCase()}</a></h3>
    <span class="preco"><b>${euro(p.preco)}</b> · <span data-d="D3">${precoPack(p.preco)} dès 3</span></span>
  </article>`;
}

function confiancaRodapeGL() {
  return `<section class="gl-secao" style="padding-top:20px"><div class="gl-miolo gl-confianca">
    <div>${GL_ICO.envio}Expédiée sous 2 à 4 jours<small>Avec suivi</small></div>
    <div data-d="D12">${GL_ICO.troca}Échange gratuit<small>30 jours, 60 jours pour Noël</small></div>
    <div>${GL_ICO.cadeado}Paiement 100 % sécurisé<small>Données chiffrées</small></div>
    <div>${GL_ICO.estrela}Clients satisfaits<small>4,6/5 sur 201 avis</small></div>
  </div></section>
  <footer class="gl-rodape"><div class="gl-miolo">
    <div><img src="https://chaussettesorphelines.com/cdn/shop/files/Logo_Chaussettes_Orphelines_black_2024_1_450x.png?v=1726070443" alt="Chaussettes Orphelines"><p style="margin-top:12px;color:#555">Vos vieilles chaussettes, retricotées en France, depuis 2008.</p></div>
    <div><h4>Chaussettes Orphelines</h4><ul><li>Notre histoire</li><li>L’association Chaussettes Solidaires</li><li>Recycler vos chaussettes</li><li>Cadeaux d’entreprise</li></ul></div>
    <div><h4>Service client</h4><ul><li>Questions fréquentes</li><li>Livraison</li><li>Échanges et retours</li><li>Guide des tailles</li><li>Contact</li></ul></div>
    <div><h4>Newsletter</h4><p style="color:#555">Les nouvelles de l’atelier et les nouvelles couleurs.</p><form onsubmit="return false"><input type="email" placeholder="Votre e-mail" aria-label="E-mail"><button>S’inscrire</button></form></div>
    <div class="base"><span>© Chaussettes Orphelines · association Chaussettes Solidaires · Atelier : 2 rue des Gardes, Paris 18<sup>e</sup></span><span>Mentions légales · CGV · Confidentialité</span></div>
  </div></footer>`;
}

function abas(id, rotulos, ativo = 0) {
  return `<div class="gl-abas" role="group">${rotulos.map((r, i) => `<button aria-pressed="${i === ativo}" onclick="trocaAba('${id}', ${i}, this)">${r}</button>`).join("")}</div>`;
}
const ABAS = {};
function trocaAba(id, i, botao) {
  botao.parentNode.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b === botao));
  document.getElementById(id).innerHTML = ABAS[id][i]();
}

function paginaInicioGL() {
  ABAS.t1 = [() => VITRINE.map(cartaoGL).join(""), () => ["laska", "toundra", "cancan", "bonnet", "echarpe", "mitaines"].map(cartaoGL).join("")];
  ABAS.t2 = [() => LISTA.slice(0, 8).map(cartaoGL).join(""),
    () => COFFRETS.map(c => `<article class="gl-cartao sem-foto"><div class="foto"><img src="${img(c.foto, 600)}" alt="${c.nome}"></div><h3><a href="#">${c.nome} · ${c.conteudo}</a></h3><span class="preco"><b>${euro(c.preco)}</b> · <s>${euro(c.de)}</s></span></article>`).join(""),
    () => ["bonnet", "echarpe", "mitaines"].map(cartaoGL).join("")];
  const cats = [["Invisibles", 4, NM.summerGris.fotos[0]], ["Basses", 2, NM.funny.fotos[0]], ["Mi-hauteur", 4, NM.parisBleu.fotos[0]], ["Chaussons", 1, NM.slower.fotos[0]],
    ["Mi-mollet", 1, AMBIENTE.laskaChao, true], ["Hautes", 1, AMBIENTE.toundraBotas, true], ["Mi-cuisses", 1, AMBIENTE.cancanCafe, true], ["Bonnets, gants & écharpes", 4, AMBIENTE.acessorios, true]];
  document.write(`${cabecalhoGL()}
  <main>
    <section class="gl-hero"><img src="${img(AMBIENTE.laskaChao, 1900)}" alt="Chaussettes LASKA portées sur un parquet">
      <div class="texto"><small>Tricotées en France depuis 2008</small><h1>Une histoire <em>tricotée deux fois</em></h1>
        <div class="botoes"><a href="${GL.lista}">Chaussettes</a><a href="#selecao">Coffrets</a></div></div>
      <span class="setas">‹ &nbsp; ›</span><span class="contagem">01</span></section>

    <section class="gl-secao"><div class="gl-miolo">
      <div class="gl-titulo"><h2><em>L’essentiel</em> de la saison</h2><div class="lado"><a href="${GL.lista}">Voir tout</a><button aria-label="Précédent" onclick="document.getElementById('t1').scrollBy({left:-400,behavior:'smooth'})">‹</button><button aria-label="Suivant" onclick="document.getElementById('t1').scrollBy({left:400,behavior:'smooth'})">›</button></div></div>
      ${abas("t1", ["Les plus aimées", "Laine recyclée"])}
      <div class="gl-trilho" id="t1">${ABAS.t1[0]()}</div>
    </div></section>

    <section class="gl-duplo">
      <a href="${GL.lista}"><img src="${img(AMBIENTE.toundraTrio, 1000)}" alt=""><h2>La <em>laine</em> recyclée</h2><span><u>Chaussettes</u><u>Bonnets & gants</u></span></a>
      <a href="${GL.lista}"><img src="${img(AMBIENTE.summerPerna, 1000)}" alt=""><h2>Le <em>coton</em> recyclé</h2><span><u>Invisibles</u><u>Basses</u><u>Mi-hauteur</u></span></a>
    </section>

    <section class="gl-secao"><div class="gl-miolo">
      <div class="gl-titulo"><h2>Nos <em>incontournables</em></h2><div class="lado"><a href="${GL.lista}">Voir toutes les catégories</a></div></div>
      <div class="gl-categorias">${cats.map(([n, q, f, cheia]) => `<a href="${GL.lista}"><span class="img"><img${cheia ? ' class="cheia"' : ""} src="${img(f, 300)}" alt=""></span><span><b>${n}</b><small>${q} article${q > 1 ? "s" : ""}</small></span></a>`).join("")}</div>
    </div></section>

    <section class="gl-miolo"><div class="gl-faixa" data-d="D11"><img src="${img(AMBIENTE.novelos, 1800)}" alt="">
      <div><h2>L’<em>étiquette</em> retour</h2><p>Dès ${REGRAS.etiqueta} € d’achat en France métropolitaine, renvoyez-nous jusqu’à 500 g de vieilles chaussettes dans la même enveloppe. Elles deviennent le fil de nos prochaines paires.</p><a href="#">Comment ça marche</a></div></div></section>

    <section class="gl-secao" id="selecao"><div class="gl-miolo">
      <div class="gl-titulo"><h2>Sélection <em>exclusive</em></h2><div class="lado"><a href="${GL.lista}">Voir tout</a></div></div>
      ${abas("t2", ["Chaussettes", "Coffrets de Noël", "Accessoires"])}
      <div class="gl-grade" id="t2">${ABAS.t2[0]()}</div>
    </div></section>

    <section class="gl-secao" style="padding-top:0"><div class="gl-miolo gl-historia" data-d="D5">
      <img src="${img(AMBIENTE.vestido, 1000)}" alt="Une robe de l’atelier solidaire">
      <div class="texto"><h2>Recyclées, <em>depuis 2008</em></h2><p>Chaussettes Orphelines est la marque de l’association Chaussettes Solidaires. Vos achats financent des ateliers pour des femmes en situation d’isolement social et éloignées de l’emploi.</p>
        <div class="numeros"><div><b>35 t</b><span>de chaussettes collectées</span></div><div><b>≈ 200</b><span>femmes formées</span></div><div><b>100 %</b><span>fabriqué en France</span></div></div>
        <a href="#" style="font-size:10.5px;text-transform:uppercase;letter-spacing:.12em">Découvrir l’association</a></div>
    </div></section>

    <section class="gl-secao" style="padding-top:0"><div class="gl-miolo">
      <div class="gl-titulo"><h2>Le <em>journal</em> de l’atelier</h2><div class="lado"><a href="#">Visiter le journal</a></div></div>
      <div class="gl-journal">
        <a href="#"><img src="${img(AMBIENTE.novelosAzuis, 700)}" alt=""><b>Comment vos vieilles chaussettes redeviennent du fil</b><span>Lire</span></a>
        <a href="#"><img src="${img(AMBIENTE.pulover, 700)}" alt=""><b>Pièces uniques : l’atelier tricote aussi des pulls et des robes</b><span>Lire</span></a>
        <a href="#"><img src="${img(AMBIENTE.laskaAmigos, 700)}" alt=""><b>Quelle hauteur de chaussette choisir pour l’hiver ?</b><span>Lire</span></a>
      </div>
    </div></section>
  </main>
  ${confiancaRodapeGL()}`);
}

function paginaListaGL() {
  const alturas = ["Toutes", "Invisibles", "Basses", "Mi-hauteur", "Mi-mollet", "Hautes", "Mi-cuisses", "Chaussons"];
  document.write(`${cabecalhoGL()}
  <main class="gl-miolo">
    <div class="gl-lista-topo"><h1>Chaussettes</h1><img src="${img(AMBIENTE.laskaGrupo, 1600)}" alt="">
      <div class="gl-chips" role="group" aria-label="Hauteur">${alturas.map((a, i) => `<button aria-pressed="${!i}">${a}</button>`).join("")}</div></div>
    <div class="gl-filtros"><div class="esq"><button>Filtres ⌄</button><span class="conta">Affichage<b>${LISTA.length} sur ${LISTA.length}</b></span><span data-d="D3" style="color:var(--destaque)">−${REGRAS.pack3} % dès 3 paires · −${REGRAS.pack5} % dès 5</span></div><button>Les plus aimées ⌄</button></div>
    <div class="gl-grade" style="padding-bottom:40px">${LISTA.map(cartaoGL).join("")}</div>
  </main>
  ${confiancaRodapeGL()}`);
}

function paginaProdutoGL() {
  document.write(`${cabecalhoGL()}
  <main class="gl-miolo">
    <a class="gl-voltar" href="${GL.lista}">‹ Retour</a>
    <section class="gl-produto">
      <div><div class="gl-palco"><div class="fotos" id="fotos"></div><svg class="coracao" viewBox="0 0 24 24"><path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z"/></svg></div><div class="gl-miniaturas" id="minis"></div></div>
      <div class="gl-info">
        <span class="ref">◇ ${PARIS.ref}</span>
        <div><h1 id="titulo"></h1><p class="preco" style="margin-top:6px">${euro(PARIS.preco)}<small>TTC</small></p><p class="pack" data-d="D3">${precoPack(PARIS.preco)} la paire dès 3 paires, en mélangeant les modèles</p></div>
        <div><p class="gl-rot">Couleur <b id="nome-cor"></b></p><div class="gl-tecidos" id="cores"></div></div>
        <div><p class="gl-rot">Taille <b id="nome-tam"></b> · <a href="#" style="text-transform:none;letter-spacing:0">Guide des tailles</a></p><div class="gl-tam" id="tamanhos"></div><p id="esgotado" style="font-size:12px;color:var(--tinta-2);margin-top:8px" hidden>Taille épuisée dans cette couleur · <a href="#">me prévenir</a></p></div>
        <a class="btn btn-largo" href="?panier=1" onclick="document.body.classList.add('aberto');return false">Ajouter au panier</a>
        <div class="confianca2">
          <div data-d="D1">${GL_ICO.envio}Livraison offerte dès ${REGRAS.freteGratis} €</div><div data-d="D12">${GL_ICO.troca}Échange gratuit</div>
          <div>${GL_ICO.cadeado}Paiement 100 % sécurisé</div><div>${GL_ICO.estrela}${PARIS.nota.toLocaleString("fr-FR")}/5 · ${PARIS.avis} avis</div>
        </div>
        <div>
          <details open><summary>Description</summary><div><p>${PARIS.descricao.join("</p><p>")}</p></div></details>
          <details><summary>Composition</summary><div><p>${PARIS.composicao}</p></div></details>
          <details><summary>Entretien</summary><div><p>${PARIS.detalhes}</p></div></details>
          <details><summary>L’étiquette retour</summary><div><p data-d="D11">Dès ${REGRAS.etiqueta} € d’achat en France métropolitaine, une étiquette prépayée pour nous renvoyer jusqu’à 500 g de vieilles chaussettes.</p></div></details>
          <details><summary>Avis clients</summary><div>${PARIS.avaliacoes.map(([n, d, e, t]) => `<p>${"★".repeat(e)}${"☆".repeat(5 - e)} « ${t} » <small>${n}, ${d}</small></p>`).join("")}</div></details>
          <details><summary>Livraison et retours</summary><div><p>Expédiée sous 2 à 4 jours avec suivi. Livraison offerte dès ${REGRAS.freteGratis} € en France métropolitaine.</p></div></details>
        </div>
      </div>
    </section>
    <div class="gl-titulo"><h2>Vous pourriez <em>aussi aimer</em></h2></div>
    <div class="gl-trilho" style="padding-bottom:56px">${["summerBicolores", "summerEcru", "funny", "slower", "funnylin", "parisVert"].map(cartaoGL).join("")}</div>
  </main>
  <section class="gl-faq"><div class="dentro"><h2>Réponses à vos <em>questions</em></h2>
    <details><summary>Comment choisir la bonne taille ?</summary><div><p>Prenez votre pointure habituelle. Entre deux tailles, prenez la plus petite : le tricot épouse le pied.</p></div></details>
    <details><summary>Comment fonctionne l’étiquette retour ?</summary><div><p>Dès ${REGRAS.etiqueta} € d’achat en France métropolitaine, elle arrive dans votre colis. Glissez jusqu’à 500 g de vieilles chaussettes dans la même enveloppe et postez-la dans n’importe quelle boîte aux lettres.</p></div></details>
    <details><summary>Puis-je mélanger les modèles pour la remise ?</summary><div><p>Oui : −${REGRAS.pack3} % dès 3 paires et −${REGRAS.pack5} % dès 5, tous modèles, couleurs et tailles confondus. La remise se fait toute seule dans le panier.</p></div></details>
    <details><summary>Quand ma commande sera-t-elle expédiée ?</summary><div><p>Sous 2 à 4 jours, avec suivi.</p></div></details>
  </div></section>
  ${confiancaRodapeGL()}
  <div class="barra-fixa"><div><b>${PARIS.nome} · ${euro(PARIS.preco)}</b><br><span id="resumo"></span></div><a class="btn" href="?panier=1" onclick="document.body.classList.add('aberto');return false">Ajouter</a></div>
  ${carrinhoParis()}`);
  let cor = 0, tam = "39/41", atual = 0;
  const fotos = document.getElementById("fotos"), minis = document.getElementById("minis");
  const marcar = () => minis.querySelectorAll("button").forEach((b, i) => b.setAttribute("aria-current", i === atual));
  window.irGL = i => { atual = i; fotos.scrollTo({ left: i * fotos.clientWidth, behavior: "smooth" }); marcar(); };
  fotos.addEventListener("scroll", () => { atual = Math.round(fotos.scrollLeft / fotos.clientWidth); marcar(); }, { passive: true });
  function montar() {
    const c = PARIS.cores[cor];
    const lista = [{ nm: true, src: c.foto }, { falta: "De côté" }, { falta: "Le tricot de près" }, { nm: true, src: PARIS.grupo }, ...PARIS.usada.map(src => ({ src }))];
    fotos.innerHTML = lista.map(f => f.falta ? `<figure>${fotoFalta(f.falta)}</figure>` : `<figure class="${f.nm ? "nm" : ""}"><img src="${img(f.src, 1200)}" alt=""></figure>`).join("");
    minis.innerHTML = lista.map((f, i) => f.falta ? `<button class="falta" onclick="irGL(${i})">a fotografar</button>` : `<button class="${f.nm ? "nm" : ""}" onclick="irGL(${i})"><img src="${img(f.src, 150)}" alt=""></button>`).join("");
    document.getElementById("titulo").textContent = `Chaussettes mi-hauteur ${PARIS.nome}, ${c.nome.toLowerCase()}, en jersey recyclé`;
    document.getElementById("cores").innerHTML = PARIS.cores.map((x, i) => `<button aria-pressed="${i === cor}" aria-label="${x.nome}" title="${x.nome}" style="background-image:url('${img(x.foto, 500)}')" onclick="window.trocaCor(${i})"></button>`).join("");
    document.getElementById("nome-cor").textContent = c.nome;
    if (c.esgotados.includes(tam)) tam = PARIS.tamanhos.find(t => !c.esgotados.includes(t));
    document.getElementById("tamanhos").innerHTML = PARIS.tamanhos.map(t => `<button aria-pressed="${t === tam}"${c.esgotados.includes(t) ? " disabled" : ""} onclick="window.trocaTam('${t}')">${t}</button>`).join("");
    document.getElementById("nome-tam").textContent = tam;
    document.getElementById("esgotado").hidden = !c.esgotados.length;
    document.getElementById("resumo").textContent = `${c.nome} · ${tam}`;
    atual = 0; fotos.scrollLeft = 0; marcar();
  }
  window.trocaCor = i => { cor = i; montar(); };
  window.trocaTam = t => { tam = t; montar(); };
  montar();
  addEventListener("load", () => { fotos.scrollLeft = 0; atual = 0; marcar(); });   // o snap às vezes para na 2ª foto enquanto as imagens carregam
}
