const SITE_VERSION = "4.0.0";
const LAST_EDIT = "September 17, 2026";
const PHP_PER_USD = 60;

const SERVICE_DETAILS = {
  "simple-adaptation": {category:"Social media & digital graphics",title:"Simple adaptation",mode:"fixed",min:500,unit:"per output",scope:"Resize or update an existing approved DesignLab layout. One size; no new concept. One revision round."},
  "standard-static-pubmat": {category:"Social media & digital graphics",title:"Standard static pubmat",mode:"fixed",min:1500,unit:"per artwork",scope:"One original design direction, one size, supplied final copy and images, two revision rounds, JPG/PNG."},
  "detailed-promotional-poster": {category:"Social media & digital graphics",title:"Detailed promotional poster",mode:"from",min:2500,unit:"per artwork",scope:"One size with more involved image treatment or multi-product layout. Final fee depends on asset preparation."},
  "campaign-hero-visual": {category:"Social media & digital graphics",title:"Campaign hero visual",mode:"from",min:5000,unit:"per master artwork",scope:"One main visual direction and one finished master artwork. Campaign adaptations are separate."},
  "five-slide-carousel": {category:"Social media & digital graphics",title:"Five-slide carousel",mode:"fixed",min:4000,unit:"5 connected slides",scope:"Five connected slides using supplied final copy, one aspect ratio, moderate graphics. Extra standard slide: ₱700."},
  "cover-channel-banner": {category:"Social media & digital graphics",title:"Cover / channel banner",mode:"fixed",min:1500,unit:"one platform",scope:"One original cover design for one platform. Platform-specific safe-area preparation included."},
  "essentials-8": {category:"Monthly design-only packages",title:"Essentials - 8 graphics",mode:"fixed",min:10000,unit:"per month",scope:"8 standard static graphics for one brand; one size per graphic."},
  "growth-12": {category:"Monthly design-only packages",title:"Growth - 12 graphics",mode:"fixed",min:14000,unit:"per month",scope:"12 standard static graphics for one brand; one size per graphic."},
  "consistency-20": {category:"Monthly design-only packages",title:"Consistency - 20 graphics",mode:"fixed",min:22000,unit:"per month",scope:"20 standard static graphics for one brand; one size per graphic."},

  "business-card": {category:"Print & publication",title:"Business card",mode:"fixed",min:1500,unit:"front and back",scope:"One person / business; front and back. Existing logo and supplied details."},
  "certificate-master": {category:"Print & publication",title:"Certificate master",mode:"fixed",min:1500,unit:"reusable master",scope:"One reusable layout. Personalisation, bulk name entry and automation quoted separately."},
  "tarpaulin-standee-sign": {category:"Print & publication",title:"Tarpaulin / standee / sign",mode:"fixed",min:2000,unit:"one print size",scope:"One original layout and one print size; print-ready PDF."},
  "one-sided-flyer": {category:"Print & publication",title:"One-sided flyer",mode:"fixed",min:1800,unit:"one page",scope:"One page, supplied text and images, print-ready PDF."},
  "two-sided-flyer": {category:"Print & publication",title:"Two-sided flyer",mode:"fixed",min:3500,unit:"front and back",scope:"Front and back; one size; print-ready PDF."},
  "trifold-brochure": {category:"Print & publication",title:"Trifold brochure",mode:"fixed",min:5500,unit:"six panels",scope:"Six panels on one folded sheet. Supplied final copy and usable images; print-ready PDF."},
  "brochure-8": {category:"Print & publication",title:"8-page brochure / catalogue",mode:"fixed",min:12000,unit:"8 pages incl. covers",scope:"8 individual pages including covers; moderate layout complexity and supplied usable images."},
  "brochure-12": {category:"Print & publication",title:"12-page brochure / catalogue",mode:"fixed",min:18000,unit:"12 pages incl. covers",scope:"12 individual pages including covers; coherent design system and moderate image preparation."},
  "brochure-16": {category:"Print & publication",title:"16-page brochure / catalogue",mode:"fixed",min:24000,unit:"16 pages incl. covers",scope:"16 individual pages including covers; moderate complexity with some repeated product layouts."},
  "image-heavy-catalogue": {category:"Print & publication",title:"Image-heavy 16-page catalogue",mode:"from",min:32000,unit:"16 pages",scope:"Bespoke imagery, substantial compositing or varied layouts. Image count and complexity fixed in the quote."},
  "extra-standard-page": {category:"Publication add-ons",title:"Extra standard page",mode:"fixed",min:1500,unit:"per page",scope:"Page within an established layout system; supplied final content."},
  "complex-custom-page": {category:"Publication add-ons",title:"Complex custom page",mode:"from",min:2500,unit:"per page",scope:"New diagram, dense comparison, infographic or substantial visual composition."},
  "print-size-adaptation": {category:"Publication add-ons",title:"Additional print-size adaptation",mode:"from",min:500,unit:"per adaptation",scope:"Based on an approved design; extensive reflow quoted separately."},

  "logo-cleanup": {category:"Branding & event design",title:"Logo cleanup / vector redraw",mode:"from",min:3000,unit:"per logo",scope:"Redraw a supplied existing logo; no new brand direction. Final vector, transparent PNG and JPG."},
  "original-logo": {category:"Branding & event design",title:"Original logo",mode:"fixed",min:10000,unit:"identity starter",scope:"Brief, two initial directions, refinement of one selected direction, two revision rounds, primary and one-colour versions."},
  "starter-visual-identity": {category:"Branding & event design",title:"Starter visual identity",mode:"fixed",min:18000,unit:"identity package",scope:"Original logo scope plus alternate lockup, colour palette, typography, concise PDF guide and three static social templates."},
  "expanded-visual-identity": {category:"Branding & event design",title:"Expanded visual identity",mode:"fixed",min:32000,unit:"identity package",scope:"Starter scope with a fuller guide, six social templates total, business card, letterhead and one social cover."},
  "event-essentials": {category:"Branding & event design",title:"Event Essentials",mode:"fixed",min:15000,unit:"hero + 6 adaptations",scope:"One hero visual plus six adaptations from that approved design; one event and one cohesive visual direction."},
  "event-expanded": {category:"Branding & event design",title:"Event Expanded",mode:"fixed",min:22000,unit:"hero + 10 adaptations",scope:"One hero visual plus ten adaptations, plus one simple two-page digital event programme with supplied copy."},

  "basic-photo-cleanup": {category:"Images & presentations",title:"Basic photo cleanup",mode:"fixed",min:500,unit:"per image",scope:"Exposure, colour and limited blemish cleanup; one final image. One revision round."},
  "detailed-retouching": {category:"Images & presentations",title:"Detailed retouching",mode:"from",min:1200,unit:"per image",scope:"More substantial portrait or product cleanup; final scope depends on the source image."},
  "product-hero-visual": {category:"Images & presentations",title:"Product hero visual",mode:"from",min:3500,unit:"per image",scope:"One directed scene or composite using supplied product assets; one aspect ratio. No photography included."},
  "three-product-hero-visuals": {category:"Images & presentations",title:"Three product hero visuals",mode:"from",min:9000,unit:"3 related visuals",scope:"Three related visuals for one product/campaign using a shared direction; one aspect ratio each."},
  "presentation-cleanup": {category:"Images & presentations",title:"Presentation cleanup",mode:"fixed",min:3500,unit:"per 10 slides",scope:"Supplied editable deck; alignment, type and colour consistency. No content rewrite or new complex diagrams."},
  "custom-presentation-design": {category:"Images & presentations",title:"Custom presentation design",mode:"fixed",min:8000,unit:"per 10 slides",scope:"Supplied final content, designed editable slides, one agreed presentation format and PDF export."},
  "extra-designed-slide": {category:"Images & presentations",title:"Extra standard designed slide",mode:"fixed",min:800,unit:"per slide",scope:"Within the approved presentation style; complex data graphics quoted separately."},

  "one-page-website": {category:"Websites & digital systems",title:"One-page website",mode:"fixed",min:15000,unit:"up to 6 sections",scope:"Responsive design/build, supplied content, basic contact form, page title/meta setup and social links."},
  "business-website": {category:"Websites & digital systems",title:"Business website",mode:"fixed",min:30000,unit:"up to 5 pages",scope:"Responsive custom layouts, supplied content, basic contact form, basic on-page SEO and handover."},
  "extra-web-page": {category:"Websites & digital systems",title:"Extra standard web page",mode:"from",min:3000,unit:"per page",scope:"Within the approved visual system. Bespoke functionality is quoted separately."},
  "cms-setup": {category:"Websites & digital systems",title:"CMS / editable content setup",mode:"custom",unit:"custom quote",scope:"For client-managed posts, courses, products or other content. Editing needs and platform agreed first."},
  "website-content-care": {category:"Websites & digital systems",title:"Website content care",mode:"fixed",min:3000,unit:"per month",scope:"Up to two hours of text/image updates and minor layout work on the existing site. No new features or redesign."},
  "additional-website-work": {category:"Websites & digital systems",title:"Additional website work",mode:"fixed",min:1000,unit:"per hour",scope:"Approved content or layout work beyond included scope; estimated before starting."},
  "forms-dashboards-automation": {category:"Websites & digital systems",title:"Forms, dashboards & automation",mode:"custom",unit:"custom quote",scope:"Requirements review followed by a fixed deliverable list, testing scope, handover and support terms."},
  "ticketing-qr-database": {category:"Websites & digital systems",title:"Ticketing / QR / database systems",mode:"custom",unit:"custom quote",scope:"User roles, volumes, integrations, testing, reliability and event support determine the fee."},

  "additional-revisions": {category:"Booking & project terms",title:"Additional revisions / design work",mode:"fixed",min:1000,unit:"per hour",scope:"Estimated and approved first; 30-minute minimum billing increment."},
  "rush-48": {category:"Booking & project terms",title:"Rush delivery within 48 hours",mode:"percent",percent:25,unit:"of affected service fee",scope:"Applied to the affected service fee, subject to availability and an agreed brief."},
  "rush-24": {category:"Booking & project terms",title:"Rush delivery within 24 hours",mode:"percent",percent:50,unit:"of affected service fee",scope:"Applied to the affected service fee; replaces the 25% rush rate rather than stacking with it."},
  "paid-stock-production": {category:"Booking & project terms",title:"Paid stock / licences / production",mode:"custom",unit:"as quoted",scope:"Required purchases and any coordination charge disclosed and approved before commitment."},
  "extra-source-file": {category:"Booking & project terms",title:"Extra source-file preparation",mode:"custom",unit:"custom quote",scope:"Where editable files are not already included. Format and fee agreed before production."}
};

const SERVICE_CATEGORIES = {
  social: {title:"Social media & digital graphics",description:"Static graphics, campaign visuals, carousels, covers, and monthly design-only packages.",anchor:"social-campaign-services",services:["simple-adaptation","standard-static-pubmat","detailed-promotional-poster","campaign-hero-visual","five-slide-carousel","cover-channel-banner","essentials-8","growth-12","consistency-20"]},
  print: {title:"Print & publication",description:"Print-ready layouts, brochures, catalogues, signage, flyers, and publication add-ons.",anchor:"print-publication-services",services:["business-card","certificate-master","tarpaulin-standee-sign","one-sided-flyer","two-sided-flyer","trifold-brochure","brochure-8","brochure-12","brochure-16","image-heavy-catalogue","extra-standard-page","complex-custom-page","print-size-adaptation"]},
  brand: {title:"Branding & event design",description:"Logo work, visual identities, and coordinated event materials built around one clear visual direction.",anchor:"graphic-design-services",services:["logo-cleanup","original-logo","starter-visual-identity","expanded-visual-identity","event-essentials","event-expanded"]},
  images: {title:"Images & presentations",description:"Product visuals, retouching, photo cleanup, and presentation design for polished visual communication.",anchor:"image-presentation-services",services:["basic-photo-cleanup","detailed-retouching","product-hero-visual","three-product-hero-visuals","presentation-cleanup","custom-presentation-design","extra-designed-slide"]},
  web: {title:"Websites & digital systems",description:"Responsive business websites, content care, and scoped custom tools including forms, dashboards, QR, and database systems.",anchor:"web-development-services",services:["one-page-website","business-website","extra-web-page","cms-setup","website-content-care","additional-website-work","forms-dashboards-automation","ticketing-qr-database"]},
  terms: {title:"Booking & project terms",description:"Standard additions, rush options, licences, source-file preparation, and practical project boundaries.",anchor:"custom-services",services:["additional-revisions","rush-48","rush-24","paid-stock-production","extra-source-file"]}
};

const menuButtons=[...document.querySelectorAll("[data-service-category]")];
const titleEl=document.querySelector("#servicesPageTitle");
const descriptionEl=document.querySelector("#serviceCategoryDescription");
const itemsGrid=document.querySelector("#serviceItemsGrid");
const detailPanel=document.querySelector("#serviceDetailPanel");
let activeServiceId="";
let currencyState={code:"PHP",symbol:"₱",rateFromUSD:PHP_PER_USD,locale:"en-PH",country:"Philippines"};

function setFooterMeta(){document.querySelectorAll("#year").forEach(el=>el.textContent=new Date().getFullYear());document.querySelectorAll("#siteVersion").forEach(el=>el.textContent=SITE_VERSION);document.querySelectorAll("#lastEdit").forEach(el=>el.textContent=LAST_EDIT);}
function usdValue(php){return php/PHP_PER_USD;}
function roundLocal(value,code){if(code==="JPY"||code==="KRW"||code==="IDR")return Math.round(value);if(value>=1000)return Math.round(value);return Math.round(value*100)/100;}
function currencySymbol(code){try{return new Intl.NumberFormat(undefined,{style:"currency",currency:code,currencyDisplay:"narrowSymbol",maximumFractionDigits:0}).formatToParts(0).find(p=>p.type==="currency")?.value||code;}catch{return code;}}
function formatMoney(value,code,locale){try{return new Intl.NumberFormat(locale||undefined,{style:"currency",currency:code,currencyDisplay:"narrowSymbol",maximumFractionDigits:(code==="JPY"||code==="KRW"||code==="IDR")?0:2}).format(value);}catch{return `${code} ${Math.round(value).toLocaleString()}`;}}

async function detectCurrency(){
  try{
    const cached=JSON.parse(localStorage.getItem("dl_currency_v1")||"null");
    if(cached&&Date.now()-cached.savedAt<43200000){currencyState=cached.state;return;}
  }catch{}
  try{
    const geo=await fetch("https://ipwho.is/",{cache:"no-store"}).then(r=>r.json());
    const code=geo?.currency?.code||"PHP";
    const country=geo?.country||"";
    if(code==="PHP"){currencyState={code:"PHP",symbol:"₱",rateFromUSD:PHP_PER_USD,locale:"en-PH",country};}
    else if(code==="USD"){currencyState={code:"USD",symbol:"$",rateFromUSD:1,locale:"en-US",country};}
    else{
      const fx=await fetch("https://open.er-api.com/v6/latest/USD",{cache:"no-store"}).then(r=>r.json());
      const rate=Number(fx?.rates?.[code]);
      if(rate>0) currencyState={code,symbol:currencySymbol(code),rateFromUSD:rate,locale:navigator.language||undefined,country};
    }
    try{localStorage.setItem("dl_currency_v1",JSON.stringify({savedAt:Date.now(),state:currencyState}));}catch{}
  }catch{
    const lang=(navigator.language||"").toUpperCase();
    if(lang.endsWith("-JP")) currencyState={code:"JPY",symbol:"¥",rateFromUSD:150,locale:"ja-JP",country:"Japan"};
  }
}

function priceParts(d){
  if(d.mode==="custom") return {primary:d.unit==="as quoted"?"As quoted":"Custom quote",secondary:"Scope confirmed before booking",base:""};
  if(d.mode==="percent") return {primary:`+${d.percent}%`,secondary:d.unit,base:""};
  const phpMin=d.min;
  const phpMax=d.max;
  const usdMin=usdValue(phpMin);
  const usdMax=phpMax?usdValue(phpMax):null;
  const localMin=roundLocal(usdMin*currencyState.rateFromUSD,currencyState.code);
  const localMax=usdMax?roundLocal(usdMax*currencyState.rateFromUSD,currencyState.code):null;
  const prefix=d.mode==="from"?"From ":"";
  let primary="";
  if(currencyState.code==="PHP"){
    primary=phpMax?`${prefix}₱${phpMin.toLocaleString()}–₱${phpMax.toLocaleString()}`:`${prefix}₱${phpMin.toLocaleString()}`;
  }else if(currencyState.code==="USD"){
    primary=usdMax?`${prefix}${formatMoney(usdMin,"USD","en-US")}–${formatMoney(usdMax,"USD","en-US")}`:`${prefix}${formatMoney(usdMin,"USD","en-US")}`;
  }else{
    primary=localMax?`${prefix}${formatMoney(localMin,currencyState.code,currencyState.locale)}–${formatMoney(localMax,currencyState.code,currencyState.locale)}`:`${prefix}${formatMoney(localMin,currencyState.code,currencyState.locale)}`;
  }
  const usdText=usdMax?`≈ US$${Math.round(usdMin).toLocaleString()}–$${Math.round(usdMax).toLocaleString()}`:`≈ US$${Math.round(usdMin).toLocaleString()}`;
  const base=currencyState.code==="PHP"?"":`Base rate: ${phpMax?`₱${phpMin.toLocaleString()}–₱${phpMax.toLocaleString()}`:`₱${phpMin.toLocaleString()}`}`;
  return {primary,secondary:currencyState.code==="USD"?"USD guide rate":usdText,base};
}

function serviceButton(id){const s=SERVICE_DETAILS[id];if(!s)return"";const active=id===activeServiceId?" is-active":"";return `<button class="dl-services-item${active}" type="button" data-service-item="${id}"><span class="dl-services-check" aria-hidden="true"></span><span>${s.title}</span></button>`;}
function renderServiceDetail(id){
  const d=SERVICE_DETAILS[id];if(!d||!detailPanel)return;activeServiceId=id;const price=priceParts(d);
  detailPanel.innerHTML=`<div class="dl-service-detail-live">
    <div class="dl-service-detail-topline"><span>${d.category}</span><span class="dl-service-detail-currency">${currencyState.code}${currencyState.country?` · ${currencyState.country}`:""}</span></div>
    <header class="dl-service-detail-head"><h2>${d.title}</h2><p class="dl-service-detail-intro">${d.scope}</p></header>
    <div class="dl-service-detail-price-card"><span class="dl-service-detail-price-label">Price guide</span><strong>${price.primary}</strong><span class="dl-service-detail-price-secondary">${price.secondary}</span>${price.base?`<small>${price.base}</small>`:""}<em>${d.unit||""}</em></div>
    <div class="dl-service-detail-note"><span>Pricing basis</span><p>DesignLab rates are based in Philippine pesos. USD guide conversions use US$1 = ₱60. Local currency is an estimate for convenience and is refreshed when available.</p></div>
    <a class="dl-service-detail-cta" href="contact.html?source=services-explorer&service=${id}"><span>Start this project</span><b aria-hidden="true">↗</b></a>
  </div>`;
  itemsGrid?.querySelectorAll("[data-service-item]").forEach(btn=>btn.classList.toggle("is-active",btn.dataset.serviceItem===id));
}
function selectCategory(key,updateHash=true){const c=SERVICE_CATEGORIES[key]||SERVICE_CATEGORIES.social;menuButtons.forEach(btn=>btn.classList.toggle("is-active",btn.dataset.serviceCategory===key));titleEl.textContent=c.title;descriptionEl.textContent=c.description;activeServiceId=c.services[0]||"";itemsGrid.innerHTML=c.services.map(serviceButton).join("");if(activeServiceId)renderServiceDetail(activeServiceId);if(updateHash)history.replaceState(null,"",`#${c.anchor}`);}
function categoryFromHash(){const hash=location.hash.replace("#","");const entry=Object.entries(SERVICE_CATEGORIES).find(([,c])=>c.anchor===hash);return entry?entry[0]:"social";}
menuButtons.forEach(btn=>btn.addEventListener("click",()=>selectCategory(btn.dataset.serviceCategory)));
itemsGrid?.addEventListener("click",e=>{const trigger=e.target.closest("[data-service-item]");if(trigger)renderServiceDetail(trigger.dataset.serviceItem);});
window.addEventListener("hashchange",()=>selectCategory(categoryFromHash(),false));

async function boot(){setFooterMeta();selectCategory(categoryFromHash(),false);await detectCurrency();if(activeServiceId)renderServiceDetail(activeServiceId);}
boot();
