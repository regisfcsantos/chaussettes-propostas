// Dados e peças comuns das maquetes: produtos reais da loja (preço e fotos do Shopify em 19/10/2026),
// notas das avaliações antigas do Stamped (201 avaliações; a importar no Judge.me), cabeçalho, rodapé e cartão de produto.
// ?marcas=1 na URL mostra, em amarelo, o que depende de uma decisão da Marcia (D1, D2...).

const CDN = "https://cdn.shopify.com/s/files/1/0086/4095/4426/";
const img = (caminho, w = 800) => `${CDN}${caminho}${caminho.includes("?") ? "&" : "?"}width=${w}`;

// Valores que dependem de decisões da Marcia: mudar aqui muda todas as maquetes.
const REGRAS = {
  freteGratis: 60,                  // D1: hoje é 150 €
  pack3: 10, pack5: 15,             // D3/D11: desconto por quantidade (hoje 5 % a partir de 3 pares)
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

function cabecalho(ativo = "") {
  return `
  <div class="anuncio" data-d="D1 · frete grátis">Livraison offerte dès <b>${REGRAS.freteGratis} €</b><span class="sep">|</span><span class="extra">Étiquette retour offerte pour recycler vos vieilles chaussettes</span></div>
  <header class="cabecalho"><div class="miolo">
    <a class="so-celular" href="#" aria-label="Menu" style="display:grid;place-items:center">${ICONE.menu}</a>
    <a class="logo" href="accueil.html"><img src="https://chaussettesorphelines.com/cdn/shop/files/Logo_Chaussettes_Orphelines_black_2024_1_450x.png?v=1726070443" alt="Chaussettes Orphelines"></a>
    <nav class="menu" aria-label="Menu principal">
      <a href="collection.html"${ativo === "chaussettes" ? ' aria-current="page"' : ""}>Chaussettes</a>
      <a href="collection.html">Bonnets, gants & écharpes</a>
      <a class="destaque" href="accueil.html#coffrets" data-d="D2 · kits">Coffrets cadeaux</a>
      <a href="#">Notre histoire</a>
      <a href="#">L’association</a>
    </nav>
    <div class="icones">
      <a class="so-pc" href="#" aria-label="Rechercher">${ICONE.busca}</a>
      <a class="so-pc" href="#" aria-label="Mon compte">${ICONE.conta}</a>
      <a href="produit.html?panier=1" aria-label="Panier">${ICONE.sacola}<span class="contador">2</span></a>
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

if (new URLSearchParams(location.search).get("marcas") === "1") document.documentElement.classList.add("marcas");
