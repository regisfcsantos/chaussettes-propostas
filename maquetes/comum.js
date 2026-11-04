// Dados e peças comuns das maquetes: produtos reais da loja (preço e fotos do Shopify em 19/10/2026),
// notas das avaliações antigas do Stamped (201 avaliações; a importar no Judge.me), cabeçalho, rodapé e cartão de produto.
// ?marcas=1 na URL mostra, em amarelo, o que depende de uma decisão da Marcia (D1, D2...).

const CDN = "https://cdn.shopify.com/s/files/1/0086/4095/4426/";
const img = (caminho, w = 800) => `${CDN}${caminho}${caminho.includes("?") ? "&" : "?"}width=${w}`;

// Valores que dependem de decisões da Marcia: mudar aqui muda todas as maquetes.
const REGRAS = {
  freteGratis: 60,                  // D1: hoje é 150 €
  pack3: 10, pack5: 15,             // D3: desconto por quantidade (hoje 5 % a partir de 3 pares)
  etiqueta: 45,                     // D11: etiqueta de devolução a partir deste valor, na França metropolitana (a regra de 2021)
};

const COR = { "Chiné Mangue": "#d99a3d", "Chiné Bordeaux": "#6e2a35", "Chiné Bleu atlantique": "#33506e", "Chiné Vert sapin": "#3d5a48",
  "Chiné Noir": "#2a2725", "Chiné Noir Lurex": "#3b3330", "Chiné Gris Ecru": "#cfc6b8", Gris: "#8d8986", Ecru: "#e8e0d2", "Gris Lurex": "#a19c98",
  Rose: "#e7a1b0", Violet: "#7b5a8c", Vert: "#7fae6c", Bleu: "#4f6f9a", Rouge: "#b6403f", "Rose de songe": "#e6a3b3", "Vert à croquer": "#8cc06b",
  "Bleu ciel": "#8fb4d8", Noir: "#2a2725", Bordeaux: "#6e2a35", "Bleu Atlantique": "#33506e", "Vert Sapin": "#3d5a48" };
const CORES_LA = ["Chiné Mangue", "Chiné Bordeaux", "Chiné Bleu atlantique", "Chiné Vert sapin", "Chiné Noir", "Chiné Noir Lurex", "Chiné Gris Ecru"];

const PRODUTOS = {
  laska: { nome: "LASKA", tipo: "Mi-mollet · laine recyclée", preco: 25, nota: 4.8, avis: 26, selo: "Best-seller", cores: CORES_LA, url: "produit.html",
    fotos: ["products/DSC5147_crop_16.jpg?v=1602491893", "products/IMG_20201012_103552_resize_63.jpg?v=1602491893"] },
  toundra: { nome: "TOUNDRA", tipo: "Hautes · laine recyclée", preco: 29, nota: 4.8, avis: 15, cores: CORES_LA,
    fotos: ["products/DSC5226_crop_80.jpg?v=1701013770", "products/DSC5219_crop_22.jpg?v=1701013770"] },
  cancan: { nome: "CANCAN", tipo: "Mi-cuisses · laine recyclée", preco: 39, nota: 4.6, avis: 12, cores: CORES_LA,
    fotos: ["products/20200930_172802_crop_43.jpg?v=1602499577", "products/DSC5286-1_crop_80.jpg?v=1602499577"] },
  summer: { nome: "SUMMER", tipo: "Invisibles · coton recyclé", preco: 17, nota: 4.8, avis: 22, selo: "Best-seller", cores: ["Gris", "Ecru", "Gris Lurex"],
    fotos: ["products/SUMMER8.png?v=1617975216", "products/site2.jpg?v=1617975216"] },
  funny: { nome: "FUNNY", tipo: "Basses · coton recyclé", preco: 22, nota: 4.6, avis: 7, cores: ["Rose", "Violet", "Vert"],
    fotos: ["products/Funny.gif?v=1616513220", "products/1589952862141.jpg?v=1616513220"] },
  funnylin: { nome: "FUNNY LIN", tipo: "Basses · lin et fil recyclé", preco: 24, nota: 5, avis: 3, cores: ["Bleu", "Ecru", "Rouge"], selo: "Nouveau",
    fotos: ["files/ChatGPT_Image_2_juin_2026_14_51_23.png?v=1780405819", "products/FunnyBBR.gif?v=1616514064"] },
  paris: { nome: "PARIS bicolores", tipo: "Mi-hauteur · coton recyclé", preco: 22, nota: 4.8, avis: 6, cores: ["Vert à croquer", "Rose de songe", "Bleu ciel", "Gris"],
    fotos: ["products/parisbicoloreGR.jpg?v=1618825857", "files/ChatGPT_Image_2_juin_2026_14_44_08.png?v=1780405810"] },
  slower: { nome: "SLOWER", tipo: "Chaussettes-chaussons", preco: 24, nota: 5, avis: 15, cores: ["Gris", "Ecru", "Gris Lurex"],
    fotos: ["products/boucletteG.jpg?v=1589968391", "products/IMG_20200520_115227.jpg?v=1589968393"] },
  bonnet: { nome: "Bonnet MONT BLANC", tipo: "Laine recyclée", preco: 45, nota: 5, avis: 1, cores: ["Noir", "Bordeaux", "Bleu Atlantique", "Vert Sapin"],
    fotos: ["products/Web_Chaussettes_Orphelines_009_crop_51_cca0ae7c-2c7f-4a80-8211-ca48017927e4.jpg?v=1626958372", "products/bonnet-bonnet-mont-blanc-1.jpg?v=1626958372"] },
  echarpe: { nome: "Écharpe ALTITUDE", tipo: "Laine recyclée", preco: 52, nota: 5, avis: 2, cores: ["Bleu Atlantique", "Noir", "Bordeaux", "Vert Sapin"],
    fotos: ["products/Web_Chaussettes_Orphelines_042_crop_77.jpg?v=1604678801", "products/echarpe-echarpe-altitude-1.jpg?v=1604678801"] },
  mitaines: { nome: "Mitaines JURA", tipo: "Laine recyclée", preco: 48, nota: 5, avis: 3, cores: ["Noir", "Bleu Atlantique", "Bordeaux", "Vert Sapin"],
    fotos: ["products/Web_Chaussettes_Orphelines_041_crop_57.jpg?v=1627562107", "products/mitaines-mitaines-jura-3.jpg?v=1615995942"] },
  gants: { nome: "Gants ALEX", tipo: "Laine recyclée", preco: 45, nota: 4.7, avis: 3, cores: ["Noir", "Bleu Atlantique", "Bordeaux", "Vert Sapin"],
    fotos: ["products/Web_Chaussettes_Orphelines_008_crop_56.jpg?v=1604679154", "products/gants-gants-alex-1.jpg?v=1604677336"] },
};

const COFFRETS = [
  { nome: "Coffret Hiver douillet", conteudo: "3 paires LASKA, couleurs au choix", preco: 67.5, de: 75, foto: "products/DSC5178_resize_89.jpg?v=1715613743" },
  { nome: "Coffret Tête au chaud", conteudo: "Bonnet MONT BLANC + Écharpe ALTITUDE", preco: 87, de: 97, foto: "products/Web_Chaussettes_Orphelines_009_crop_51_cca0ae7c-2c7f-4a80-8211-ca48017927e4.jpg?v=1626958372" },
  { nome: "Coffret Découverte", conteudo: "4 socquettes SUMMER, coton recyclé", preco: 61.2, de: 68, foto: "files/Pack-SUMMER.jpg?v=1701020596" },
];

const euro = v => v.toLocaleString("fr-FR", { minimumFractionDigits: Number.isInteger(v) ? 0 : 2, maximumFractionDigits: 2 }) + " €";

const ICONE = {
  busca: '<svg class="ico" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>',
  conta: '<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4"/></svg>',
  sacola: '<svg class="ico" viewBox="0 0 24 24"><path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 10V7a3 3 0 0 1 6 0v3"/></svg>',
  menu: '<svg class="ico" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  mais: '<svg class="ico" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  caminhao: '<svg class="ico" viewBox="0 0 24 24"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
  reciclar: '<svg class="ico" viewBox="0 0 24 24"><path d="M7 7.5 9.6 3.4a1.6 1.6 0 0 1 2.8 0L14 6"/><path d="m15.5 4.5-1.5 1.5-2-.5"/><path d="m18.5 11 2.2 4.1a1.6 1.6 0 0 1-1.4 2.4H16"/><path d="m17.5 20-1.5-2.5 1.2-1.8"/><path d="M8 17.5H4.7a1.6 1.6 0 0 1-1.4-2.4L5.5 11"/><path d="m3.5 11.5 2 -.5 .8 2"/></svg>',
  franca: '<svg class="ico" viewBox="0 0 24 24"><path d="M12 21s-6.5-5.4-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/></svg>',
  coracao: '<svg class="ico" viewBox="0 0 24 24"><path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z"/></svg>',
  devolver: '<svg class="ico" viewBox="0 0 24 24"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>',
  presente: '<svg class="ico" viewBox="0 0 24 24"><path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13"/><path d="M12 7c-1.5-3.5-5-3.5-5-1.5S10 7 12 7zm0 0c1.5-3.5 5-3.5 5-1.5S14 7 12 7z"/></svg>',
  fechar: '<svg class="ico" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  cadeado: '<svg class="ico" viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="9.5" rx="1.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>',
};
const ESTRELA = '<svg viewBox="0 0 20 20"><path d="m10 1.8 2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.7l-5.1 2.8L6 11.8 1.7 7.8l5.8-.7z"/></svg>';
const estrelas = (nota, avis, curto) => `<span class="estrelas"><span class="e" aria-hidden="true">${ESTRELA.repeat(5)}</span><b>${nota.toLocaleString("fr-FR")}</b>${curto ? `(${avis})` : `· ${avis} avis`}</span>`;

// links: para onde o logo, o menu e a sacola levam (as versões novas apontam umas para as outras)
function cabecalho(ativo = "", links = {}) {
  const L = { inicio: "accueil.html", colecao: "collection.html", carrinho: "produit.html?panier=1", ...links };
  return `
  <div class="anuncio" data-d="D1 · frete grátis">Livraison offerte dès <b>${REGRAS.freteGratis} €</b><span class="sep">|</span><span class="extra">Étiquette retour offerte dès ${REGRAS.etiqueta} € pour recycler vos vieilles chaussettes</span></div>
  <header class="cabecalho"><div class="miolo">
    <a class="so-celular" href="#" aria-label="Menu" style="display:grid;place-items:center">${ICONE.menu}</a>
    <a class="logo" href="${L.inicio}"><img src="https://chaussettesorphelines.com/cdn/shop/files/Logo_Chaussettes_Orphelines_black_2024_1_450x.png?v=1726070443" alt="Chaussettes Orphelines"></a>
    <nav class="menu" aria-label="Menu principal">
      <a href="${L.colecao}"${ativo === "chaussettes" ? ' aria-current="page"' : ""}>Chaussettes</a>
      <a href="${L.colecao}">Bonnets, gants & écharpes</a>
      <a class="destaque" href="${L.inicio}#coffrets" data-d="D2 · kits">Coffrets cadeaux</a>
      <a href="#">Notre histoire</a>
      <a href="#">L’association</a>
    </nav>
    <div class="icones">
      <a class="so-pc" href="#" aria-label="Rechercher">${ICONE.busca}</a>
      <a class="so-pc" href="#" aria-label="Mon compte">${ICONE.conta}</a>
      <a href="${L.carrinho}" aria-label="Panier">${ICONE.sacola}<span class="contador">2</span></a>
    </div>
  </div></header>`;
}

function garantias() {
  return `<section class="garantias" aria-label="Nos garanties"><ul>
    <li>${ICONE.franca}<div><b>Fabriqué en France</b><span>Filé et tricoté en France</span></div></li>
    <li>${ICONE.reciclar}<div><b>Fil 100 % recyclé</b><span>Vos chaussettes, retricotées</span></div></li>
    <li data-d="D1">${ICONE.caminhao}<div><b>Livraison offerte dès ${REGRAS.freteGratis} €</b><span>Expédiée sous 2 à 4 jours</span></div></li>
    <li data-d="D12 · trocas grátis">${ICONE.devolver}<div><b>Échange gratuit</b><span>60 jours pour Noël</span></div></li>
  </ul></section>`;
}

function cartao(id, extra = {}) {
  const p = { ...PRODUTOS[id], ...extra };
  const cores = p.cores.slice(0, 4).map(c => `<i style="background:${COR[c] || "#ccc"}" title="${c}"></i>`).join("")
    + (p.cores.length > 4 ? `<small>+${p.cores.length - 4}</small>` : "");
  return `<article class="cartao">
    <div class="foto">${p.selo ? `<span class="selo">${p.selo}</span>` : ""}
      <img src="${img(p.fotos[0], 600)}" alt="${p.nome}, ${p.tipo}" loading="lazy"><img src="${img(p.fotos[1], 600)}" alt="" loading="lazy">
      <button class="adicionar" aria-label="Ajouter ${p.nome} au panier">${ICONE.mais}<span class="txt">Ajouter</span></button>
    </div>
    <h3><a href="${p.url || "produit.html"}">${p.nome}</a></h3>
    <p class="tipo">${p.tipo}</p>
    ${estrelas(p.nota, p.avis, true)}
    <div class="linha"><span class="preco">${euro(p.preco)}</span><span class="cores">${cores}</span></div>
  </article>`;
}

function regua(ativo = 0) {
  const base = 25;
  const passos = [["1 paire", "prix normal"], [`3 paires`, `−${REGRAS.pack3} % sur le panier`], [`5 paires`, `−${REGRAS.pack5} % sur le panier`]];
  return `<div class="regua" data-d="D3 · desconto por quantidade">${passos.map(([a, b], i) => `<div class="${i === ativo ? "ativo" : ""}"><b>${a}</b><span>${b}</span></div>`).join("")}</div>`;
}

function rodape() {
  return `<footer class="rodape"><div class="miolo">
    <div><h4>Restons en contact</h4><p>Les nouvelles de l’atelier, les préventes et les nouvelles couleurs, une fois par mois.</p>
      <form class="newsletter-form" onsubmit="return false"><input type="email" placeholder="Votre adresse e-mail" aria-label="Adresse e-mail"><button class="btn">S’inscrire</button></form></div>
    <div><h4>Boutique</h4><ul><li><a href="collection.html">Chaussettes</a></li><li><a href="#">Bonnets, gants & écharpes</a></li><li><a href="#">Coffrets cadeaux</a></li><li><a href="#">Cartes cadeaux</a></li><li><a href="#">Pièces uniques</a></li></ul></div>
    <div><h4>Nous connaître</h4><ul><li><a href="#">Notre histoire</a></li><li><a href="#">L’association Chaussettes Solidaires</a></li><li><a href="#">Recycler vos chaussettes</a></li><li><a href="#">Cadeaux d’entreprise</a></li><li><a href="#">Faire un don</a></li></ul></div>
    <div><h4>Aide</h4><ul><li><a href="#">Livraison et retours</a></li><li><a href="#">Guide des tailles</a></li><li><a href="#">Questions fréquentes</a></li><li><a href="#">Contact</a></li><li>Atelier : 2 rue des Gardes, Paris 18<sup>e</sup></li></ul></div>
    <div class="base"><span>© Chaussettes Orphelines · une marque de l’association Chaussettes Solidaires, depuis 2008</span><span>Mentions légales · CGV · Confidentialité</span></div>
  </div></footer>`;
}

// Carrinho lateral: itens = [{ foto, nome, detalhe, preco }]; as duas metas (frete grátis e pack) saem das REGRAS.
function carrinho(itens, sugestao) {
  const total = itens.reduce((s, i) => s + i.preco, 0);
  const falta = REGRAS.freteGratis - total, pares = itens.length;
  const metaFrete = falta > 0 ? `Plus que <b>${euro(falta)}</b> pour la livraison offerte` : `<b>Livraison offerte</b> pour cette commande`;
  const metaPack = pares < 3 ? `Ajoutez <b>${3 - pares} paire${3 - pares > 1 ? "s" : ""}</b> : −${REGRAS.pack3} % sur tout le panier` : `<b>−${REGRAS.pack3} %</b> appliqués sur le panier`;
  const fechar = "document.body.classList.remove('aberto')";
  return `<div class="veu" onclick="${fechar}"></div>
  <aside class="gaveta" aria-label="Panier">
    <header><h2>Votre panier (${pares})</h2><button aria-label="Fermer" onclick="${fechar}">${ICONE.fechar}</button></header>
    <div class="metas">
      <div class="meta" data-d="D1"><p>${metaFrete}</p><div class="progresso"><i style="--p:${Math.min(100, Math.round(total / REGRAS.freteGratis * 100))}%"></i></div></div>
      <div class="meta" data-d="D3"><p>${metaPack}</p><div class="progresso"><i style="--p:${Math.min(100, Math.round(pares / 3 * 100))}%"></i></div></div>
    </div>
    <div class="itens">
      ${itens.map(i => `<div class="item"><img src="${img(i.foto, 200)}" alt=""><div><b>${i.nome}</b><span>${i.detalhe}</span><br><span class="mini-qtd">− &nbsp;1&nbsp; +</span></div><span class="preco">${euro(i.preco)}</span></div>`).join("")}
      ${sugestao ? `<div class="sugestao"><img src="${img(sugestao.foto, 120)}" alt=""><div><b>${sugestao.nome}</b> · ${euro(sugestao.preco)}<br><span style="color:var(--tinta-2)">${sugestao.texto}</span></div><button>Ajouter</button></div>` : ""}
      <label class="presente" data-d="D2"><input type="checkbox"> <span><b>C’est pour offrir</b><br><span style="color:var(--tinta-2)">Emballage cadeau et carte « Vos chaussettes ont une histoire », offerts.</span></span></label>
    </div>
    <footer>
      <div class="total"><span>Sous-total</span><b class="num">${euro(total)}</b></div>
      <a class="btn btn-largo" href="#">Passer commande</a>
      <p class="seguro">${ICONE.cadeado}Paiement sécurisé · livraison calculée à l’étape suivante</p>
    </footer>
  </aside>`;
}

// ---------- Versões « natureza morta » (referências da Marcia: Veja, Mytheresa, Bleuforêt, Gallo) ----------
// Primeira foto = a meia sozinha, de frente, em fundo claro; a segunda (ao passar o mouse) = a meia usada.
// Fotos que já existem no Shopify. LASKA, TOUNDRA, CANCAN e os acessórios ainda não têm foto assim (semFoto).
const NM = {
  parisRose: { base: "paris", cor: "Rose de songe", fotos: ["products/parisbicoloreGR.jpg?v=1618825857", "files/ChatGPT_Image_2_juin_2026_14_44_08.png?v=1780405810"] },
  parisBleu: { base: "paris", cor: "Bleu ciel d’automne", fotos: ["products/Paris-bicolore-GB.jpg?v=1618825857", "files/ChatGPT_Image_2_juin_2026_14_47_05.png?v=1780405809"] },
  parisVert: { base: "paris", cor: "Vert à croquer", fotos: ["products/Paris-bicolore-GV.jpg?v=1618825857", "products/paris-GV-1.jpg?v=1618825857"] },
  parisGris: { base: "paris", cor: "Gris", fotos: ["files/ChatGPT_Image_2_juin_2026_14_42_06.png?v=1780405828", "products/parisb4.png?v=1618825857"] },
  summerEcru: { base: "summer", cor: "Ecru", fotos: ["files/soc-invisibles-e-compressor_55694224-9c1a-4fc7-8737-5046ad628b25.jpg?v=1701020596", "products/SUMMER10.png?v=1617975216"] },
  summerGris: { base: "summer", cor: "Gris", fotos: ["files/soc-invisibles-gr-compressor_c304de60-2f43-4ec4-b9b3-175e250ba3da.jpg?v=1701020596", "products/site2.jpg?v=1617975216"] },
  summerEcruLurex: { base: "summer", cor: "Ecru Lurex", fotos: ["files/soc-invisibles-el-compressor_fd7a3d6d-108b-430d-bd84-aa9688f8e413.jpg?v=1701020596", "products/summer2.jpg?v=1617975223"] },
  summerBicolores: { base: "summer", nome: "SUMMER bicolores", cor: "3 couleurs", cores: ["Rose de songe", "Vert à croquer", "Bleu ciel"], fotos: ["files/ChatGPT_Image_29_mai_2026_11_28_52.png?v=1780050348", "products/SummerBleu.png?v=1618825377"] },
  funny: { base: "funny", cor: "3 couleurs", fotos: ["files/WhatsApp_Image_2026-05-29_at_12.22.06_PM_1.jpg?v=1780050317", "products/1589952862141.jpg?v=1616513220"] },
  funnylin: { base: "funnylin", cor: "3 couleurs", fotos: ["files/ChatGPT_Image_2_juin_2026_14_51_23.png?v=1780405819", "products/16.jpg?v=1616514064"] },
  slower: { base: "slower", cor: "4 couleurs", fotos: ["products/BOUCLETTES_A_PLAT1.jpg?v=1589968393", "products/boucletteG.jpg?v=1589968391"] },
  laska: { base: "laska", cor: "7 couleurs", semFoto: true, fotos: ["products/DSC01514-1_resize_53.jpg?v=1715613743", "products/DSC5147_crop_16.jpg?v=1602491893"] },
  toundra: { base: "toundra", cor: "7 couleurs", semFoto: true, fotos: ["products/toundra-vertweb.jpg?v=1715613458", "products/DSC5226_crop_80.jpg?v=1701013770"] },
  cancan: { base: "cancan", cor: "7 couleurs", semFoto: true, fotos: ["products/cancan-bordeauxETNLWEB.jpg?v=1602499577", "products/20200930_172802_crop_43.jpg?v=1602499577"] },
  echarpe: { base: "echarpe", cor: "4 couleurs", semFoto: true, fotos: ["products/echarpe-echarpe-altitude-1.jpg?v=1604678801", "products/Web_Chaussettes_Orphelines_042_crop_77.jpg?v=1604678801"] },
  mitaines: { base: "mitaines", cor: "4 couleurs", semFoto: true, fotos: ["products/mitaines-mitaines-jura-3.jpg?v=1615995942", "products/Web_Chaussettes_Orphelines_041_crop_57.jpg?v=1627562107"] },
  bonnet: { base: "bonnet", cor: "4 couleurs", semFoto: true, fotos: ["products/bonnet-bonnet-mont-blanc-1.jpg?v=1626958372", "products/Web_Chaussettes_Orphelines_009_crop_51_cca0ae7c-2c7f-4a80-8211-ca48017927e4.jpg?v=1626958372"] },
};

// Um item da lista em natureza morta, já com nome, cor, preço e notas (para as versões Veja, Bleuforêt e Gallo)
function itemNM(id) {
  const n = NM[id], p = PRODUTOS[n.base];
  return { id, ...p, ...n, cores: n.cores || p.cores, tipoCurto: p.tipo.split(" · ")[0], materia: p.tipo.split(" · ")[1] || p.tipo };
}
// A ordem da lista de meias (as mais vendidas primeiro) e a vitrine da página inicial
const LISTA = ["laska", "parisRose", "summerEcru", "funny", "toundra", "parisBleu", "slower", "summerBicolores", "cancan", "parisVert", "summerGris", "funnylin", "parisGris", "summerEcruLurex"];
const VITRINE = ["parisRose", "summerEcru", "funny", "parisBleu", "slower", "summerBicolores", "parisVert", "summerGris"];
const LA = ["laska", "toundra", "cancan", "bonnet"];
// Fotos de ambiente e da história, para as seções editoriais
const AMBIENTE = {
  laskaSofa: "products/DSC5147_crop_16.jpg?v=1602491893", laskaGrupo: "products/IMG_20201012_103552_resize_63.jpg?v=1602491893",
  laskaChao: "products/DSC01514-1_resize_53.jpg?v=1715613743", laskaSentada: "products/DSC5188_crop_60.jpg?v=1715613743", laskaAmigos: "products/DSC5178_resize_89.jpg?v=1715613743",
  toundraTrio: "products/DSC5226_crop_80.jpg?v=1701013770", toundraBotas: "files/11112023_chausettes_orphelinesn_10_1.jpg?v=1715613458",
  cancanCafe: "products/20200930_172802_crop_43.jpg?v=1602499577", linMocassim: "files/11112023_chausettes_orphelinesn_07_2.jpg?v=1715609588",
  summerPerna: "files/WhatsApp_Image_2026-05-29_at_11.37.09_AM_1.jpg?v=1780050312", funnyPerna: "files/WhatsApp_Image_2026-05-29_at_11.37.09_AM_3.jpg?v=1780050314",
  acessorios: "products/Web_Chaussettes_Orphelines_015_crop_50.jpg?v=1701016869", bonnetHomem: "products/Web_Chaussettes_Orphelines_028.jpg?v=1701016869",
  novelos: "products/coffret_fil.jpg?v=1560506820", novelosAzuis: "products/ok.jpg?v=1576250108",
  vestido: "products/IMG_0527.jpg?v=1639064907", pulover: "products/IMG_9786.jpg?v=1639129822", atelierPeca: "files/IDS_11_BD.jpg?v=1718361380",
};

// A meia das páginas de produto de todas as versões: PARIS bicolores (cores e tamanhos esgotados do products.json de 19/10/2026)
const PARIS = {
  nome: "PARIS bicolores", sub: "Chaussettes mi-hauteur en jersey, 100 % recyclées", preco: 22, nota: 4.8, avis: 6, ref: "CO-PARIS-BIC",
  tamanhos: ["36/38", "39/41", "42/44"],
  cores: [
    { nome: "Bleu ciel d’automne", hex: "#8fb4d8", foto: NM.parisBleu.fotos[0], esgotados: [] },
    { nome: "Rose de songe", hex: "#e6a3b3", foto: NM.parisRose.fotos[0], esgotados: ["36/38", "39/41"] },
    { nome: "Vert à croquer", hex: "#8cc06b", foto: NM.parisVert.fotos[0], esgotados: [] },
    { nome: "Gris / Gris Lurex", hex: "#8d8986", foto: NM.parisGris.fotos[0], esgotados: ["39/41"] },
  ],
  grupo: "files/ChatGPT_Image_2_juin_2026_14_39_48.png?v=1780405828",   // as 4 cores juntas, com etiqueta
  usada: ["files/ChatGPT_Image_2_juin_2026_14_44_08.png?v=1780405810", "products/paris-GV-1.jpg?v=1618825857",
    "files/ChatGPT_Image_2_juin_2026_14_47_05.png?v=1780405809", "products/parisb4.png?v=1618825857"],
  descricao: ["Légères, ces chaussettes en jersey vous assurent un confort optimal tout en respectant l’environnement !", "Envie de chaussettes plus courtes ? Les bicolores existent dans le modèle SUMMER."],
  detalhes: "Tricotées en maille jersey · Lavables en machine, à 30 °C · Très résistantes à l’usure · Fabriquées en Corrèze",
  composicao: "100 % recyclées : un mélange de chaussettes recyclées (coton, laine, polyester…, selon la collecte) et de laine recyclée. La composition est indiquée sur chaque paire.",
  avaliacoes: [["Bérangère N.", "06/03/2022", 5, "Jolies et agréables à porter."],
    ["Blandine L.", "27/12/2021", 4, "Chaussettes qui peuvent paraître un peu rêches à la main mais qui se révèlent très confortables et chaudes aux pieds !"],
    ["Agnès B.", "07/05/2021", 5, "Très confortables, je les adore."]],
};
// Quadro amarelo no lugar de uma foto que ainda não existe
const MEIA_SVG = '<svg viewBox="0 0 64 64" fill="none" stroke="#c9a227" stroke-width="1.5"><path d="M24 6h16v26l10 10a8 8 0 0 1-11 12L22 38a6 6 0 0 1-2-4V6z"/><path d="M24 14h16"/></svg>';
const fotoFalta = texto => `<div class="foto-falta"><div>${MEIA_SVG}<b>${texto}</b><span>Foto « natureza morta » a fazer</span></div></div>`;
// Carrinho de exemplo das páginas de produto (PARIS + SUMMER)
const carrinhoParis = () => carrinho([
  { foto: NM.parisBleu.fotos[0], nome: "PARIS bicolores", detalhe: "Bleu ciel d’automne · 39/41", preco: 22 },
  { foto: NM.summerEcru.fotos[0], nome: "SUMMER", detalhe: "Ecru · 39/41", preco: 17 }],
  { foto: NM.funny.fotos[0], nome: "FUNNY", preco: 22, texto: "La 3<sup>e</sup> paire déclenche la remise" });
const precoPack = p => euro(Math.round(p * (1 - REGRAS.pack3 / 100) * 100) / 100);
if (new URLSearchParams(location.search).get("panier") === "1") addEventListener("DOMContentLoaded", () => document.body.classList.add("aberto"));

function cartaoNM(id, url = "produit-b.html") {
  const n = NM[id], p = { ...PRODUTOS[n.base], ...n };
  const cores = (n.cores || p.cores).slice(0, 5).map(c => `<i style="background:${COR[c] || "#ccc"}" title="${c}"></i>`).join("");
  return `<article class="cartao-nm${n.semFoto ? " sem-foto" : ""}">
    <div class="foto">${p.selo ? `<span class="selo">${p.selo}</span>` : ""}
      <img src="${img(n.fotos[0], 700)}" alt="${p.nome}, ${n.cor}" loading="lazy"><img src="${img(n.fotos[1], 700)}" alt="" loading="lazy">
      ${n.semFoto ? `<span class="aviso-foto">Foto « natureza morta » a fazer</span>` : ""}
      <button class="adicionar" aria-label="Ajouter ${p.nome} au panier">${ICONE.mais}</button>
    </div>
    <div class="texto">
      <h3><a href="${url}">${p.nome}</a></h3>
      <p class="tipo">${p.tipo.split(" · ")[0]} · ${n.cor}</p>
      <div class="linha"><span class="preco">${euro(p.preco)}</span>${estrelas(p.nota, p.avis, true)}</div>
      <span class="cores">${cores}</span>
    </div>
  </article>`;
}

if (new URLSearchParams(location.search).get("marcas") === "1") document.documentElement.classList.add("marcas");

// Dentro da página de apresentação (index.html), avisa qual maquete está aberta, para a barra lateral acompanhar os cliques.
if (window.parent !== window) addEventListener("load", () => parent.postMessage({ maquete: location.pathname.split("/").pop() + location.search }, "*"));
