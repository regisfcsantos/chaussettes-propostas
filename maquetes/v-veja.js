// Versão Veja: cabeçalho, rodapé, cartão e as três páginas (início, lista, produto). Dados em comum.js.
const VJ = { inicio: "veja-inicio.html", lista: "veja-lista.html", produto: "veja-produto.html" };
const SETA = d => `<svg viewBox="0 0 24 24"><path d="${d === "esq" ? "m15 4-8 8 8 8" : "m9 4 8 8-8 8"}"/></svg>`;
const VISTO = '<svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6"/></svg>';

function cabecalhoVJ(ativo = "") {
  const item = (nome, href, id) => `<a href="${href}"${ativo === id ? ' aria-current="page"' : ""}>${nome}</a>`;
  return `<div class="vj-anuncio" data-d="D1 · D3">Livraison offerte dès ${REGRAS.freteGratis} € · −${REGRAS.pack3} % dès 3 paires, −${REGRAS.pack5} % dès 5</div>
  <header class="vj-topo"><div class="dentro">
    <a class="vj-menu-cel" href="#" aria-label="Menu">${ICONE.menu}</a>
    <a class="logo" href="${VJ.inicio}"><img src="https://chaussettesorphelines.com/cdn/shop/files/Logo_Chaussettes_Orphelines_black_2024_1_450x.png?v=1726070443" alt="Chaussettes Orphelines"></a>
    <nav aria-label="Menu principal">${item("Chaussettes", VJ.lista, "lista")}${item("Bonnets, gants & écharpes", VJ.lista)}${item("Coffrets cadeaux", VJ.inicio + "#coffrets")}${item("Packs", VJ.lista)}${item("Pièces uniques", "#")}${item("Projet", VJ.inicio + "#projet")}</nav>
    <div class="icones"><a class="so-pc" href="#" aria-label="Rechercher">${ICONE.busca}</a><a class="so-pc" href="#" aria-label="Mon compte">${ICONE.conta}</a><a href="${VJ.produto}?panier=1" aria-label="Panier">${ICONE.sacola}<span class="contador">2</span></a></div>
  </div></header>`;
}

function cartaoVJ(id) {
  const p = itemNM(id);
  return `<article class="vj-cartao${p.semFoto ? " sem-foto" : ""}">
    <div class="foto">${p.selo ? `<span class="selo-vj">${p.selo}</span>` : ""}<img src="${img(p.fotos[0], 700)}" alt="${p.nome} ${p.cor}"><img src="${img(p.fotos[1], 700)}" alt="">${p.semFoto ? `<span class="aviso-foto">Foto « natureza morta » a fazer</span>` : ""}</div>
    <div class="texto"><h3><a href="${VJ.produto}">${p.nome} ${p.cor}</a></h3><span class="preco">${euro(p.preco)}</span><span class="pack" data-d="D3">${precoPack(p.preco)} la paire dès 3</span></div>
  </article>`;
}

function newsInstaRodapeVJ() {
  const insta = [AMBIENTE.linMocassim, AMBIENTE.laskaAmigos, AMBIENTE.toundraBotas, AMBIENTE.cancanCafe];
  return `<section class="vj-news"><h2>Newsletter</h2><input type="email" placeholder="E-mail *" aria-label="E-mail"><button>S’inscrire</button></section>
  <section class="vj-insta"><h2>Suivez-nous</h2><div class="fotos">${insta.map(f => `<img src="${img(f, 500)}" alt="">`).join("")}</div></section>
  <footer class="vj-rodape">
    <div><h4>Aide</h4><ul><li>Questions fréquentes</li><li>Livraison</li><li>Échanges et retours</li><li>Guide des tailles</li><li>Nous contacter</li></ul></div>
    <div><h4>Informations</h4><ul><li>L’étiquette retour</li><li>Cadeaux d’entreprise</li><li>Cartes cadeaux</li><li>Atelier : 2 rue des Gardes, Paris 18<sup>e</sup></li></ul></div>
    <div><h4>Le projet</h4><ul><li>Notre histoire</li><li>L’association Chaussettes Solidaires</li><li>Recycler vos chaussettes</li><li>Faire un don</li></ul></div>
    <div><h4>Suivez-nous</h4><ul><li>Instagram</li><li>Facebook</li><li>LinkedIn</li></ul></div>
    <div class="base"><span>© 2026 Chaussettes Orphelines · une marque de l’association Chaussettes Solidaires</span><span>Mentions légales · CGV · Confidentialité</span></div>
  </footer>`;
}

function faixaProdutosVJ(titulo, ids, link, idFaixa) {
  return `<div class="vj-titulo"><h2>${titulo}</h2><div class="setas"><a href="${link}" style="margin-right:14px">Tout voir</a><button aria-label="Précédent" onclick="rolar('${idFaixa}',-1)">${SETA("esq")}</button><button aria-label="Suivant" onclick="rolar('${idFaixa}',1)">${SETA("dir")}</button></div></div>
  <div class="vj-faixa" id="${idFaixa}">${ids.map(cartaoVJ).join("")}</div>`;
}
function rolar(id, d) { const el = document.getElementById(id); el.scrollBy({ left: d * el.clientWidth * .66, behavior: "smooth" }); }

function paginaInicioVJ() {
  const slides = [
    { f: AMBIENTE.laskaSofa, nome: "LASKA", sub: "Laine recyclée · mi-mollet · 25 €" },
    { f: AMBIENTE.toundraTrio, nome: "TOUNDRA", sub: "Chaussettes hautes · 29 €" },
    { f: AMBIENTE.laskaGrupo, nome: "Coffrets de Noël", sub: "3 paires LASKA · 67,50 €" },
  ];
  const cats = [["Invisibles", AMBIENTE.summerPerna], ["Basses", AMBIENTE.linMocassim], ["Mi-mollet", AMBIENTE.laskaSentada], ["Hautes", AMBIENTE.toundraBotas]];
  const projeto = [
    { img: AMBIENTE.novelosAzuis, nome: "Fil 100 % recyclé" },
    { num: "35 t", txt: "de chaussettes collectées", nome: "La collecte" },
    { img: AMBIENTE.vestido, nome: "L’atelier solidaire" },
    { num: `${REGRAS.etiqueta} €`, txt: "dès cet achat, l’étiquette retour est offerte", nome: "Renvoyez vos vieilles chaussettes", coral: true },
    { img: AMBIENTE.pulover, nome: "Pièces uniques" },
    { num: "≈ 200", txt: "femmes formées à l’atelier", nome: "Réinsertion" },
  ];
  document.write(`${cabecalhoVJ()}
  <main>
    <section class="vj-hero" id="hero">
      ${slides.map((s, i) => `<a class="slide${i ? "" : " ativo"}" href="${VJ.lista}"><img src="${img(s.f, 1900)}" alt=""><span class="legenda"><b>${s.nome}</b>${s.sub}<span>Découvrir</span></span></a>`).join("")}
      <button class="vj-seta esq" aria-label="Précédent" onclick="slide(-1)">${SETA("esq")}</button><button class="vj-seta dir" aria-label="Suivant" onclick="slide(1)">${SETA("dir")}</button>
      <div class="vj-pontos">${slides.map((s, i) => `<i${i ? "" : ' class="ativo"'}></i>`).join("")}</div>
    </section>
    <nav class="vj-categorias" aria-label="Choisir par hauteur">${cats.map(([n, f]) => `<a href="${VJ.lista}"><img src="${img(f, 800)}" alt=""><b>${n}</b></a>`).join("")}</nav>
    ${faixaProdutosVJ("Les plus aimées", VITRINE, VJ.lista, "faixa1")}
    <section class="vj-projeto" id="projeto" data-d="D5"><img src="${img(AMBIENTE.novelos, 1900)}" alt=""><div><h2>Projet</h2><p>Vos vieilles chaussettes deviennent du fil neuf, tricoté en France. Les ventes financent les ateliers de l’association Chaussettes Solidaires.</p><a href="#">En savoir plus</a></div></section>
    <div class="vj-cartoes-projeto">${projeto.map(c => `<a href="#"><div class="img">${c.img ? `<img src="${img(c.img, 600)}" alt="">` : `<div class="numero${c.coral ? " coral" : ""}"><b>${c.num}</b><span>${c.txt}</span></div>`}</div><span class="nome">${c.nome}</span></a>`).join("")}</div>
    ${faixaProdutosVJ("Laine recyclée · l’hiver", LA, VJ.lista, "faixa2")}
    <div id="coffrets"></div>
  </main>
  ${newsInstaRodapeVJ()}`);
}
let slideAtual = 0;
function slide(d) {
  const s = document.querySelectorAll("#hero .slide"), p = document.querySelectorAll("#hero .vj-pontos i");
  slideAtual = (slideAtual + d + s.length) % s.length;
  s.forEach((e, i) => e.classList.toggle("ativo", i === slideAtual)); p.forEach((e, i) => e.classList.toggle("ativo", i === slideAtual));
}

function paginaListaVJ() {
  const alturas = ["Toutes", "Invisibles", "Basses", "Mi-hauteur", "Mi-mollet", "Hautes", "Mi-cuisses", "Chaussons"];
  document.write(`${cabecalhoVJ("lista")}
  <main>
    <div class="vj-trilha"><span>Accueil &nbsp;›&nbsp; <b>Chaussettes</b></span><span class="vistas"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16"/><path d="M12 4v16"/></svg><svg viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/></svg></span></div>
    <div class="vj-filtros"><nav class="alturas" aria-label="Hauteur">${alturas.map((a, i) => `<a href="#"${i ? "" : ' aria-current="true"'}>${a}</a>`).join("")}</nav><div class="direita"><span>${LISTA.length} articles</span><button>Filtres <span>+</span></button></div></div>
    <p class="vj-aviso-pack" data-d="D3">Mélangez les modèles : <b>−${REGRAS.pack3} % dès 3 paires</b>, <b>−${REGRAS.pack5} % dès 5</b>, automatiquement dans le panier.</p>
    <div class="vj-grade">${LISTA.map(cartaoVJ).join("")}</div>
  </main>
  ${newsInstaRodapeVJ()}`);
}

function paginaProdutoVJ() {
  document.write(`${cabecalhoVJ("lista")}
  <main>
    <section class="vj-produto">
      <div class="vj-galeria"><div class="fotos" id="fotos"></div>
        <button class="vj-seta esq" aria-label="Photo précédente" onclick="irFoto(-1)">${SETA("esq")}</button><button class="vj-seta dir" aria-label="Photo suivante" onclick="irFoto(1)">${SETA("dir")}</button>
        <span class="conta" id="conta"></span><svg class="lupa" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg></div>
      <div class="vj-painel">
        <div class="topo">
          <div><h1>${PARIS.nome}</h1><div class="preco" style="margin-top:6px">${euro(PARIS.preco)}</div><div class="pack" data-d="D3">${precoPack(PARIS.preco)} la paire dès 3 paires</div></div>
          <div><div class="vj-cores" id="cores"></div><div class="vj-rotulo" style="margin:6px 0 0"><span id="nome-cor"></span></div></div>
          <div><div class="vj-rotulo"><span>Taille</span><a href="#">Guide des tailles</a></div><div class="vj-tamanhos" id="tamanhos"></div><p class="vj-rotulo" id="esgotado" style="margin:8px 0 0" hidden>Épuisée dans cette taille · <a href="#">Me prévenir du retour</a></p></div>
          <a class="btn btn-largo" href="?panier=1" onclick="document.body.classList.add('aberto');return false">Ajouter au panier</a>
          <div style="display:grid;gap:6px"><span class="vj-ok" data-d="D1">${VISTO}Livraison offerte dès ${REGRAS.freteGratis} €</span><span class="vj-ok" data-d="D11">${VISTO}Étiquette retour offerte dès ${REGRAS.etiqueta} € pour recycler vos chaussettes</span><span class="vj-ok" data-d="D12">${VISTO}Échange gratuit sous 30 jours</span></div>
        </div>
        <div class="acordeao">
          <details><summary>Délai de livraison</summary><div>Expédiée sous 2 à 4 jours avec suivi.</div></details>
          <details open><summary>Détails du produit</summary><div>${PARIS.descricao.join("<br><br>")}<br><br>${PARIS.detalhes}</div></details>
          <details><summary>Composition</summary><div>${PARIS.composicao}</div></details>
          <details><summary>Livraison et retours</summary><div>Livraison offerte dès ${REGRAS.freteGratis} € en France métropolitaine. Échange gratuit sous 30 jours, 60 jours pour Noël.</div></details>
          <details><summary>Avis clients · ${PARIS.nota.toLocaleString("fr-FR")}/5 (${PARIS.avis})</summary><div>${PARIS.avaliacoes.map(([n, d, e, t]) => `<p style="margin:0 0 10px"><b>${"★".repeat(e)}${"☆".repeat(5 - e)}</b> ${t}<br><span style="color:#777">${n} · ${d}</span></p>`).join("")}</div></details>
          <details><summary>Notre projet</summary><div>Cette paire fait vivre l’atelier solidaire de l’association Chaussettes Solidaires, pour des femmes éloignées de l’emploi.</div></details>
        </div>
      </div>
    </section>
    <div class="vj-editorial"><img src="${img(PARIS.usada[0], 1000)}" alt=""><img src="${img(PARIS.usada[2], 1000)}" alt=""></div>
    ${faixaProdutosVJ("Vous aimerez aussi", ["summerBicolores", "summerEcru", "funny", "slower", "funnylin"], VJ.lista, "faixa3")}
  </main>
  ${newsInstaRodapeVJ()}
  <div class="barra-fixa"><div><b>${PARIS.nome} · ${euro(PARIS.preco)}</b><br><span id="resumo"></span></div><a class="btn" href="?panier=1" onclick="document.body.classList.add('aberto');return false">Ajouter au panier</a></div>
  ${carrinhoParis()}`);
  let cor = 0, tam = "39/41", atual = 0;
  const fotos = document.getElementById("fotos");
  window.irFoto = d => { atual = (atual + d + fotos.children.length) % fotos.children.length; fotos.scrollTo({ left: atual * fotos.clientWidth, behavior: "smooth" }); conta(); };
  const conta = () => document.getElementById("conta").textContent = `${atual + 1} / ${fotos.children.length}`;
  fotos.addEventListener("scroll", () => { atual = Math.round(fotos.scrollLeft / fotos.clientWidth); conta(); }, { passive: true });
  function montar() {
    const c = PARIS.cores[cor];
    fotos.innerHTML = [`<figure class="nm"><img src="${img(c.foto, 1300)}" alt="${PARIS.nome} ${c.nome}"></figure>`,
      `<figure>${fotoFalta("Photo 2 : de côté")}</figure>`, `<figure>${fotoFalta("Photo 3 : le tricot de près")}</figure>`,
      `<figure class="nm"><img src="${img(PARIS.grupo, 1100)}" alt=""></figure>`,
      ...PARIS.usada.map(f => `<figure><img src="${img(f, 1100)}" alt=""></figure>`)].join("");
    document.getElementById("cores").innerHTML = PARIS.cores.map((x, i) => `<button aria-pressed="${i === cor}" aria-label="${x.nome}" title="${x.nome}" onclick="window.trocaCor(${i})"><img src="${img(x.foto, 120)}" alt=""></button>`).join("");
    document.getElementById("nome-cor").textContent = c.nome;
    if (c.esgotados.includes(tam)) tam = PARIS.tamanhos.find(t => !c.esgotados.includes(t));
    document.getElementById("tamanhos").innerHTML = PARIS.tamanhos.map(t => `<button aria-pressed="${t === tam}"${c.esgotados.includes(t) ? " disabled" : ""} onclick="window.trocaTam('${t}')">${t}</button>`).join("");
    document.getElementById("esgotado").hidden = !c.esgotados.length;
    document.getElementById("resumo").textContent = `${c.nome} · ${tam}`;
    atual = 0; fotos.scrollLeft = 0; conta();
  }
  window.trocaCor = i => { cor = i; montar(); };
  window.trocaTam = t => { tam = t; montar(); };
  montar();
  addEventListener("load", () => { fotos.scrollLeft = 0; atual = 0; conta(); });
}
