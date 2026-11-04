// Versão Bleuforêt: cabeçalho, rodapé, cartão e as três páginas. Dados em comum.js.
const BF = { inicio: "bleuforet-inicio.html", lista: "bleuforet-lista.html", produto: "bleuforet-produto.html" };
const BF_SETA = d => `<svg viewBox="0 0 34 20"><path d="${d === "esq" ? "M33 10H2m8-8-8 8 8 8" : "M1 10h31m-8-8 8 8-8 8"}"/></svg>`;
const BF_SETA_P = d => `<svg viewBox="0 0 24 24"><path d="${d === "esq" ? "m15 4-8 8 8 8" : "m9 4 8 8-8 8"}"/></svg>`;
// Ícones de linha das garantias (expedição, troca, pagamento, França)
const BF_ICO = {
  envio: '<svg viewBox="0 0 40 40"><rect x="6" y="9" width="28" height="24" rx="2"/><path d="M6 15h28M13 5v7M27 5v7M14 24l4 4 8-8"/></svg>',
  troca: '<svg viewBox="0 0 40 40"><path d="M8 16h22l-6-6M32 24H10l6 6"/></svg>',
  pagamento: '<svg viewBox="0 0 40 40"><rect x="5" y="10" width="30" height="20" rx="2"/><path d="M5 16h30M10 25h8"/></svg>',
  franca: '<svg viewBox="0 0 40 40"><path d="M20 35s-11-9-11-18a11 11 0 0 1 22 0c0 9-11 18-11 18z"/><circle cx="20" cy="17" r="4"/></svg>',
  caixa: '<svg viewBox="0 0 40 40"><path d="M6 13 20 6l14 7v15l-14 7-14-7z"/><path d="m6 13 14 7 14-7M20 20v15M13 9.5l14 7"/></svg>',
  reciclar: '<svg viewBox="0 0 40 40"><path d="M14 12 18 6a2.5 2.5 0 0 1 4 0l3 5M27 8l-2 3-3-1M31 18l4 7a2.5 2.5 0 0 1-2 4h-6M29 33l-2-4 2-3M13 29H7a2.5 2.5 0 0 1-2-4l4-7M5 19l3-1 1 3"/></svg>',
};

function cabecalhoBF() {
  return `<header class="bf-topo"><div class="dentro">
    <a class="bf-menu-cel" href="#" aria-label="Menu">${ICONE.menu}</a>
    <a class="logo" href="${BF.inicio}"><img src="https://chaussettesorphelines.com/cdn/shop/files/Logo_Chaussettes_Orphelines_black_2024_1_450x.png?v=1726070443" alt="Chaussettes Orphelines"></a>
    <nav aria-label="Menu principal"><a href="${BF.lista}">Chaussettes</a><a href="${BF.lista}">Bonnets & gants</a><a href="${BF.inicio}#coffrets">Coffrets</a><a href="#">L’atelier</a><a href="#">L’association</a></nav>
    <div class="icones"><a class="so-pc" href="#" aria-label="Rechercher">${ICONE.busca}</a><a class="so-pc" href="#" aria-label="Mon compte">${ICONE.conta}</a><a href="${BF.produto}?panier=1" aria-label="Panier">${ICONE.sacola}<span class="contador">2</span></a></div>
  </div></header>`;
}

// Aqui a primeira foto é a meia usada; ao passar o mouse, a meia sozinha (quando existe)
function cartaoBF(id) {
  const p = itemNM(id);
  const nome = p.base === "bonnet" ? p.nome : `Chaussettes ${p.nome}`;
  const cores = p.cores.slice(0, 5).map(c => `<i style="background:${COR[c] || "#ccc"}" title="${c}"></i>`).join("");
  return `<article class="bf-cartao">
    <div class="foto"><img src="${img(p.fotos[1], 600)}" alt="${nome}">${p.semFoto ? "" : `<img class="nm" src="${img(p.fotos[0], 600)}" alt="">`}
      <button class="mais" aria-label="Ajouter ${nome}">${ICONE.mais}</button></div>
    <h3><a href="${BF.produto}">${nome} ${p.cor.includes("couleurs") ? "" : p.cor}</a></h3>
    <span class="cores">${cores}</span>
    <span class="preco">${euro(p.preco)}<small data-d="D3">${precoPack(p.preco)} dès 3</small></span>
  </article>`;
}

function carrosselBF(id, ids) {
  return `<div class="bf-carrossel"><div class="trilho" id="${id}">${ids.map(cartaoBF).join("")}</div>
    <button class="seta esq" aria-label="Précédent" onclick="rolarBF('${id}',-1)">${BF_SETA_P("esq")}</button><button class="seta dir" aria-label="Suivant" onclick="rolarBF('${id}',1)">${BF_SETA_P("dir")}</button></div>`;
}
function rolarBF(id, d) { const el = document.getElementById(id); el.scrollBy({ left: d * el.clientWidth * .6, behavior: "smooth" }); }

function garantiasRodapeBF() {
  return `<section class="bf-garantias"><ul>
    <li>${BF_ICO.envio}<div><b>Expédiée sous 2 à 4 jours</b><span>Avec suivi</span></div></li>
    <li data-d="D12">${BF_ICO.troca}<div><b>Échange gratuit</b><span>30 jours, 60 jours pour Noël</span></div></li>
    <li>${BF_ICO.pagamento}<div><b>Paiement sécurisé</b><span>Données bancaires chiffrées</span></div></li>
    <li>${BF_ICO.franca}<div><b>Fabriqué en France</b><span>Filé et tricoté en France</span></div></li>
  </ul></section>
  <footer class="bf-rodape"><div class="bf-miolo">
    <div><h4>Restons en contact</h4><p>Les nouvelles de l’atelier, les préventes et les nouvelles couleurs.</p><form onsubmit="return false"><input type="email" placeholder="Votre adresse e-mail" aria-label="E-mail"><button>S’inscrire</button></form></div>
    <div><h4>Boutique</h4><ul><li>Chaussettes</li><li>Bonnets, gants & écharpes</li><li>Coffrets cadeaux</li><li>Cartes cadeaux</li></ul></div>
    <div><h4>La marque</h4><ul><li>Notre histoire</li><li>L’association Chaussettes Solidaires</li><li>Recycler vos chaussettes</li><li>Cadeaux d’entreprise</li></ul></div>
    <div><h4>Service client</h4><ul><li>Livraison et retours</li><li>Guide des tailles</li><li>Questions fréquentes</li><li>Contact</li></ul></div>
    <div class="base"><span>© Chaussettes Orphelines · association Chaussettes Solidaires, depuis 2008 · Atelier : 2 rue des Gardes, Paris 18<sup>e</sup></span><span>Mentions légales · CGV · Confidentialité</span></div>
  </div></footer>`;
}

function paginaInicioBF() {
  document.body.classList.add("bf-sobre");
  document.write(`${cabecalhoBF()}
  <main>
    <section class="bf-hero"><img src="${img(AMBIENTE.toundraTrio, 1900)}" alt="Trois jeunes femmes portent les chaussettes hautes TOUNDRA">
      <div><h1>Laine recyclée</h1><p>La collection d’hiver</p><a class="btn" href="${BF.lista}">Découvrir</a></div>
      <span class="setas">${BF_SETA("esq")}${BF_SETA("dir")}</span></section>
    <section class="bf-secao"><div class="bf-miolo bf-tres" id="coffrets">
      <a href="${BF.lista}"><img src="${img(AMBIENTE.laskaChao, 900)}" alt=""><b>Chaussettes</b><span>Je découvre</span></a>
      <a href="${BF.lista}"><img src="${img(AMBIENTE.acessorios, 900)}" alt=""><b>Bonnets, gants & écharpes</b><span>Je découvre</span></a>
      <a href="${BF.lista}" data-d="D2"><img src="${img(AMBIENTE.laskaAmigos, 900)}" alt=""><b>Coffrets de Noël</b><span>Je découvre</span></a>
    </div></section>
    <section class="bf-secao" style="padding-top:0"><div class="bf-miolo"><h2>Nos best-sellers</h2>${carrosselBF("t1", ["laska", "parisRose", "summerEcru", "funny", "toundra", "slower", "summerBicolores", "cancan"])}<a class="bf-ver" href="${BF.lista}">Voir toutes les chaussettes</a></div></section>
    <section class="bf-secao" style="padding-top:0"><div class="bf-miolo bf-duas">
      <a href="#" data-d="D11"><img src="${img(AMBIENTE.novelosAzuis, 1100)}" alt=""><b>L’étiquette retour</b><span>Renvoyez-nous vos vieilles chaussettes, dès ${REGRAS.etiqueta} € d’achat</span></a>
      <a href="#"><img src="${img(AMBIENTE.bonnetHomem, 1100)}" alt=""><b>Cadeaux d’entreprise</b><span>Des coffrets à vos couleurs</span></a>
    </div></section>
    <section class="bf-secao" style="padding-top:0"><div class="bf-miolo"><h2>Nos chaussettes en laine</h2>${carrosselBF("t2", ["laska", "toundra", "cancan", "bonnet", "echarpe", "mitaines"])}</div></section>
    <section class="bf-secao" style="padding-top:0"><div class="bf-miolo bf-marca" data-d="D5">
      <p>Depuis 2008, nous collectons vos vieilles chaussettes, nous les transformons en fil neuf et nous les tricotons en France. Les ventes financent les ateliers de l’association pour des femmes éloignées de l’emploi.</p>
      <a href="#">L’histoire d’un savoir-faire solidaire</a></div></section>
    <section class="bf-secao" style="padding-top:0"><div class="bf-miolo bf-tres">
      <a href="#"><img src="${img(AMBIENTE.vestido, 900)}" alt=""><b>L’atelier</b><span>Je découvre</span></a>
      <a href="#"><img src="${img(AMBIENTE.novelos, 900)}" alt=""><b>Le recyclage</b><span>Je découvre</span></a>
      <a href="#"><img src="${img(AMBIENTE.pulover, 900)}" alt=""><b>L’association</b><span>Je découvre</span></a>
    </div></section>
  </main>
  ${garantiasRodapeBF()}`);
}

function paginaListaBF() {
  document.write(`${cabecalhoBF()}
  <main class="bf-miolo">
    <nav class="bf-trilha"><a href="${BF.inicio}">Accueil</a> &nbsp;/&nbsp; Chaussettes tricotées en France</nav>
    <div class="bf-lista-topo"><h1>Chaussettes tricotées en France</h1>
      <p>Depuis 2008, nos chaussettes sont tricotées avec le fil de vos anciennes chaussettes, en France. Chaussettes chaudes en laine recyclée pour l’hiver, socquettes en coton pour l’été, chaussettes-chaussons pour la maison : mélangez les modèles, la remise se fait toute seule dans le panier.</p><a href="#">En savoir plus</a></div>
    <div class="bf-filtros"><div class="esq"><button>Tailles</button><button>Matières</button><button>Hauteurs</button><button>Couleurs</button></div><button>Trier par : les plus aimées</button></div>
    <div class="bf-grade" id="grade"></div>
  </main>
  ${garantiasRodapeBF()}`);
  const c = LISTA.map(cartaoBF);
  c.splice(8, 0, `<div class="bf-faixa-pack" data-d="D3"><b>Composez votre pack</b><span>−${REGRAS.pack3} % dès 3 paires · −${REGRAS.pack5} % dès 5, en mélangeant les modèles</span></div>`);
  document.getElementById("grade").innerHTML = c.join("");
}

function paginaProdutoBF() {
  const detalhes = `<h2>Détails</h2>
    <details><summary>Description</summary><div><p>${PARIS.descricao.join("</p><p>")}</p></div></details>
    <details><summary>Composition et entretien</summary><div><p>${PARIS.composicao}</p><p>${PARIS.detalhes}</p></div></details>
    <details><summary>Traçabilité <em>Fabriqué en France</em></summary><div><p>Chaussettes collectées en France, triées par un atelier d’insertion, filées et tricotées en France (Corrèze).</p></div></details>
    <details><summary>Avis clients <em style="color:var(--tinta)">${PARIS.nota.toLocaleString("fr-FR")}/5 · ${PARIS.avis} avis</em></summary><div>${PARIS.avaliacoes.map(([n, d, e, t]) => `<p>${"★".repeat(e)}${"☆".repeat(5 - e)} « ${t} »<br><small>${n}, ${d}</small></p>`).join("")}</div></details>
    <div class="bf-ref"><span>Réf. : ${PARIS.ref}</span><span>Catégorie : Chaussettes tricotées en France</span></div>`;
  document.write(`${cabecalhoBF()}
  <main class="bf-miolo">
    <section class="bf-produto">
      <div><div class="bf-fotos" id="fotos"></div><div class="bf-detalhes bf-detalhes-pc">${detalhes}</div></div>
      <div class="bf-info">
        <nav class="trilha"><a href="${BF.inicio}">Accueil</a> / <a href="${BF.lista}">Chaussettes tricotées en France</a> / ${PARIS.nome}</nav>
        <div><h1>Chaussettes ${PARIS.nome}</h1><div class="preco" style="margin-top:6px">${euro(PARIS.preco)}<small data-d="D3">${precoPack(PARIS.preco)} la paire dès 3 paires</small></div></div>
        <div><p class="rot">Coloris : <span id="nome-cor"></span></p><div class="bf-bolas" id="cores"></div></div>
        <div><p class="rot">Tailles</p><div class="bf-tam" id="tamanhos"></div><p class="guia" style="margin-top:10px"><a href="#">Guide des tailles</a><span id="esgotado" hidden> · Épuisée dans certaines tailles : <a href="#">me prévenir</a></span></p></div>
        <div class="bf-compra"><div class="bf-qtd"><span>1</span><span>▲<br>▼</span></div><a class="btn" href="?panier=1" onclick="document.body.classList.add('aberto');return false">Ajouter au panier</a></div>
        <div class="bf-confianca">
          <p>${BF_ICO.envio}<span>Expédiée sous 2 à 4 jours, avec suivi</span></p>
          <p data-d="D1">${BF_ICO.caixa}<span>Livraison offerte dès ${REGRAS.freteGratis} €</span></p>
          <p data-d="D11">${BF_ICO.reciclar}<span>Étiquette retour offerte dès ${REGRAS.etiqueta} € pour recycler vos vieilles chaussettes</span></p>
          <p>${BF_ICO.pagamento}<span>Paiement sécurisé</span></p>
        </div>
        <div class="bf-detalhes bf-detalhes-cel">${detalhes}</div>
      </div>
    </section>
    <section class="bf-secao" style="padding-top:20px"><h2>Vous aimerez aussi</h2>${carrosselBF("t3", ["summerBicolores", "summerEcru", "funny", "slower", "funnylin", "parisVert"])}</section>
  </main>
  ${garantiasRodapeBF()}
  <div class="barra-fixa"><div><b>${PARIS.nome} · ${euro(PARIS.preco)}</b><br><span id="resumo"></span></div><a class="btn" href="?panier=1" onclick="document.body.classList.add('aberto');return false">Ajouter au panier</a></div>
  ${carrinhoParis()}`);
  let cor = 0, tam = "39/41";
  function montar() {
    const c = PARIS.cores[cor];
    // Duas fotos lado a lado (usada + sozinha), como a Bleuforêt; depois as outras
    document.getElementById("fotos").innerHTML = `<figure><img src="${img(PARIS.usada[cor % PARIS.usada.length], 900)}" alt="${PARIS.nome} portées"></figure>
      <figure class="nm"><img src="${img(c.foto, 900)}" alt="${PARIS.nome} ${c.nome}"></figure>
      <div class="mais-fotos"><figure>${fotoFalta("De côté")}</figure><figure class="nm"><img src="${img(PARIS.grupo, 900)}" alt=""></figure>
      ${PARIS.usada.filter((f, i) => i !== cor % PARIS.usada.length).slice(0, 2).map(f => `<figure><img src="${img(f, 900)}" alt=""></figure>`).join("")}</div>`;
    document.getElementById("cores").innerHTML = PARIS.cores.map((x, i) => `<button style="background:${x.hex}" aria-pressed="${i === cor}" aria-label="${x.nome}" title="${x.nome}" onclick="window.trocaCor(${i})"></button>`).join("");
    document.getElementById("nome-cor").textContent = c.nome;
    if (c.esgotados.includes(tam)) tam = PARIS.tamanhos.find(t => !c.esgotados.includes(t));
    document.getElementById("tamanhos").innerHTML = PARIS.tamanhos.map(t => `<button aria-pressed="${t === tam}"${c.esgotados.includes(t) ? " disabled" : ""} onclick="window.trocaTam('${t}')">${t}</button>`).join("");
    document.getElementById("esgotado").hidden = !c.esgotados.length;
    document.getElementById("resumo").textContent = `${c.nome} · ${tam}`;
  }
  window.trocaCor = i => { cor = i; montar(); };
  window.trocaTam = t => { tam = t; montar(); };
  montar();
}
