import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { PRODUCTS_CATALOG } from '../data/products.ts';

const OUTPUT_HTML = path.resolve('tmp/catalogue-preview.html');
const OUTPUT_PDF_PUBLIC = path.resolve('public/catalogue.pdf');
const OUTPUT_PDF_DIST = path.resolve('output/sheshaan-global-export-catalogue-2026.pdf');

// Ensure directories exist
if (!fs.existsSync('tmp')) fs.mkdirSync('tmp', { recursive: true });
if (!fs.existsSync('output')) fs.mkdirSync('output', { recursive: true });

function fileToBase64(relPath, mimeType = 'image/jpeg') {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`);
    return '';
  }
  const buf = fs.readFileSync(fullPath);
  return `data:${mimeType};base64,${buf.toString('base64')}`;
}

const photoOverrides = {
  'SG-VEG-ONI-001': 'src/assets/prod-fresh-onions-detail.jpg',
  'SG-VEG-ONI-002': 'src/assets/prod-white-onion.jpg',
  'SG-VEG-ONI-003': 'public/assets/products/fresh-red-onion-nashik.jpg',
  'SG-VEG-CHL-004': 'src/assets/prod-chillies.jpg',
  'SG-VEG-TOM-005': 'src/assets/prod-tomatoes-detail.jpg',
  'SG-VEG-POT-006': 'src/assets/prod-potatoes-detail.jpg',
  'SG-VEG-DOH-007': 'src/assets/prod-dehydrated-onion-detail.jpg',
  'SG-VEG-OKR-008': 'src/assets/prod-okra-detail.jpg',
  'SG-VEG-DRM-009': 'src/assets/prod-drumsticks-detail.jpg',
  'SG-VEG-GAR-010': 'src/assets/prod-garlic-detail.jpg',
  'SG-VEG-CLB-011': 'src/assets/prod-cluster-beans-detail.jpg',
  'SG-VEG-MIX-012': 'src/assets/prod-vegetables.jpg',

  'SG-FRT-COC-013': 'src/assets/prod-coconut.jpg',
  'SG-FRT-BAN-014': 'src/assets/prod-banana-detail.jpg',
  'SG-FRT-GRP-015': 'src/assets/prod-grapes-detail.jpg',
  'SG-FRT-POM-016': 'src/assets/prod-pomegranate-detail.jpg',
  'SG-FRT-MNG-017': 'src/assets/prod-mango-detail.jpg',
  'SG-FRT-MNG-018': 'public/assets/products/alphonso-mango.jpg',
  'SG-FRT-LEM-019': 'src/assets/prod-lemon-detail.jpg',
  'SG-FRT-ORG-020': 'src/assets/prod-oranges-detail.jpg',
  'SG-FRT-TAM-021': 'src/assets/prod-tamarind-detail.jpg',

  'SG-SPC-CUM-022': 'src/assets/prod-cumin-detail.jpg',
  'SG-SPC-TUR-023': 'src/assets/prod-turmeric-detail.jpg',
  'SG-SPC-DRC-024': 'src/assets/prod-dried-red-chillies-detail.jpg',
  'SG-SPC-COR-025': 'src/assets/prod-coriander-seeds.jpg',
  'SG-SPC-BPP-026': 'src/assets/prod-black-pepper-detail.jpg',
  'SG-SPC-CRD-027': 'src/assets/prod-cardamom-pods.jpg',
  'SG-SPC-FEN-028': 'src/assets/prod-fenugreek-seeds.jpg',
  'SG-SPC-GIN-029': 'src/assets/prod-ginger-detail.jpg',
  'SG-SPC-GPC-030': 'src/assets/prod-green-peppercorn-detail.jpg',
  'SG-SPC-CRL-031': 'src/assets/prod-curry-leaves-detail.jpg',
  'SG-SPC-MAS-032': 'src/assets/prod-curry-powder.jpg',
  'SG-SPC-TEA-033': 'src/assets/prod-tea.jpg',
  'SG-SPC-COF-034': 'src/assets/prod-coffee.jpg',

  'SG-GRN-BAS-035': 'public/assets/products/basmati-rice-1121.jpg',
  'SG-GRN-NBR-036': 'src/assets/prod-rice.jpg',
  'SG-GRN-WHT-037': 'src/assets/prod-wheat-grain.jpg',
  'SG-GRN-MAZ-038': 'src/assets/prod-maize-corn.jpg',
  'SG-GRN-CHK-039': 'src/assets/prod-kabuli-chickpeas.jpg',
  'SG-GRN-PNT-040': 'src/assets/prod-peanuts-raw.jpg',
  'SG-GRN-DAL-041': 'src/assets/prod-dal-detail.jpg',
  'SG-GRN-SOY-042': 'src/assets/prod-soyabean-detail.jpg',
  'SG-GRN-MST-043': 'src/assets/prod-mustard-seeds.jpg',
  'SG-GRN-SUG-044': 'src/assets/prod-sugar-detail.jpg',
  'SG-GRN-JAG-045': 'src/assets/prod-jaggery.jpg',
  'SG-GRN-GUR-046': 'src/assets/prod-grains.jpg',
  'SG-GRN-MNR-047': 'src/assets/prod-cow-dung-detail.jpg',

  'SG-DRY-CSH-048': 'src/assets/prod-cashew-detail.jpg',
  'SG-DRY-MKH-049': 'src/assets/prod-makhana-detail.jpg',
};

const scientificNames = {
  'SG-VEG-ONI-001': 'Allium cepa L. (Nashik Red)',
  'SG-VEG-ONI-002': 'Allium cepa var. cepa (Export White)',
  'SG-VEG-ONI-003': 'Allium cepa var. aggregatum (Rose Onion)',
  'SG-VEG-CHL-004': 'Capsicum annuum L. (G4 / Teja)',
  'SG-VEG-TOM-005': 'Solanum lycopersicum L. (Hybrid Red)',
  'SG-VEG-POT-006': 'Solanum tuberosum L. (Kufri Jyoti / Pukhraj)',
  'SG-VEG-DOH-007': 'Allium cepa & Allium sativum (Dehydrated)',
  'SG-VEG-OKR-008': 'Abelmoschus esculentus (Tender Pods)',
  'SG-VEG-DRM-009': 'Moringa oleifera Lam. (PKM-1 / ODC)',
  'SG-VEG-GAR-010': 'Allium sativum L. (Yamuna Safed / Pink)',
  'SG-VEG-CLB-011': 'Cyamopsis tetragonoloba L. (Guar Pods)',
  'SG-VEG-MIX-012': 'Cucurbitaceae & Solanaceae (Export Mix)',

  'SG-FRT-COC-013': 'Cocos nucifera L. (Pollachi Semi-Husked)',
  'SG-FRT-BAN-014': 'Musa acuminata (Cavendish Grand Naine AAA)',
  'SG-FRT-GRP-015': 'Vitis vinifera L. (Thompson & Sharad Seedless)',
  'SG-FRT-POM-016': 'Punica granatum L. (Bhagwa Ruby Red)',
  'SG-FRT-MNG-017': 'Mangifera indica L. (Alphonso / Hapus GI)',
  'SG-FRT-MNG-018': 'Mangifera indica L. (Kesar & Banganapalli)',
  'SG-FRT-LEM-019': 'Citrus aurantiifolia (Kagzi Lime)',
  'SG-FRT-ORG-020': 'Citrus reticulata Blanco (Nagpur Mandarin)',
  'SG-FRT-TAM-021': 'Tamarindus indica L. (Seedless Tamarind)',

  'SG-SPC-CUM-022': 'Cuminum cyminum L. (Unjha Machine Cleaned)',
  'SG-SPC-TUR-023': 'Curcuma longa L. (Sangli / Salem High-Curcumin)',
  'SG-SPC-DRC-024': 'Capsicum annuum L. (S17 Teja / Byadgi Stemless)',
  'SG-SPC-COR-025': 'Coriandrum sativum L. (Eagle / Badami Dhania)',
  'SG-SPC-BPP-026': 'Piper nigrum L. (Tellicherry TGSEB / Malabar)',
  'SG-SPC-CRD-027': 'Elettaria cardamomum Maton (Idukki 8mm+ Green)',
  'SG-SPC-FEN-028': 'Trigonella foenum-graecum L. (Kasuri Methi)',
  'SG-SPC-GIN-029': 'Zingiber officinale Roscoe (Cochin Dried Ginger)',
  'SG-SPC-GPC-030': 'Piper nigrum L. (Brined & Dehydrated Green)',
  'SG-SPC-CRL-031': 'Murraya koenigii (L.) Spreng (Aromatic Leaves)',
  'SG-SPC-MAS-032': 'Specialty Blended Agro Formulations',
  'SG-SPC-TEA-033': 'Camellia sinensis (Assam CTC & Darjeeling)',
  'SG-SPC-COF-034': 'Coffea arabica & Coffea canephora (Plantation A)',

  'SG-GRN-BAS-035': 'Oryza sativa L. (1121 & 1509 Aged Basmati)',
  'SG-GRN-NBR-036': 'Oryza sativa L. (IR64, Sona Masoori & Swarna)',
  'SG-GRN-WHT-037': 'Triticum aestivum / T. durum (Sharbati & Lokwan)',
  'SG-GRN-MAZ-038': 'Zea mays L. (Non-GMO Yellow Dent Corn)',
  'SG-GRN-CHK-039': 'Cicer arietinum L. (Kabuli Sortex 42-44 / 75-80)',
  'SG-GRN-PNT-040': 'Arachis hypogaea L. (Bold & Java Groundnuts)',
  'SG-GRN-DAL-041': 'Cajanus cajan / Vigna radiata (Oiled & Unpolished)',
  'SG-GRN-SOY-042': 'Glycine max (L.) Merr. (Non-GMO Soyabean & DOC)',
  'SG-GRN-MST-043': 'Brassica juncea (Black & Yellow Mustard Seeds)',
  'SG-GRN-SUG-044': 'Saccharum officinarum (Refined Cane Sugar ICUMSA 45)',
  'SG-GRN-JAG-045': 'Saccharum officinarum (Chemical-Free Kolhapur Gur)',
  'SG-GRN-GUR-046': 'Cyamopsis tetragonoloba (Guar Gum Powder E412)',
  'SG-GRN-MNR-047': 'Fermented Bovine Organic Bio-Fertilizer',

  'SG-DRY-CSH-048': 'Anacardium occidentale L. (White Whole Cashews)',
  'SG-DRY-MKH-049': 'Euryale ferox Salisb. (Mithila GI Fox Nuts 5+ Suta)',
};

console.log('Loading official logo and image assets...');
const LOGO_BASE64 = fileToBase64('public/logo.png', 'image/jpeg');
const COVER_IMAGE_BASE64 = fileToBase64('public/assets/catalogue/cover-official.jpg', 'image/jpeg');
const ABOUT_IMAGE_BASE64 = fileToBase64('public/assets/catalogue/about-official.jpg', 'image/jpeg');
const THANKYOU_IMAGE_BASE64 = fileToBase64('public/assets/catalogue/thankyou-official.jpg', 'image/jpeg');

// 16 Specialty items with verified photos
const specialtyItems = [
  { name: 'Ashwagandha Roots', sci: 'Withania somnifera', spec: 'Withanolides > 2.5% • Whole & Cut', img: fileToBase64('src/assets/prod-ashwagandha-roots.jpg') },
  { name: 'Psyllium Husk (Isabgol)', sci: 'Plantago ovata', spec: '95% / 98% / 99% Purity • ETO-Free', img: fileToBase64('src/assets/prod-psyllium-husk.jpg') },
  { name: 'Organic Moringa Powder', sci: 'Moringa oleifera', spec: 'Cold-Milled Leaf Powder • High Protein', img: fileToBase64('src/assets/prod-moringa-powder.jpg') },
  { name: 'White Sesame Seeds', sci: 'Sesamum indicum', spec: 'Natural 99.95% & Auto-Sortex Hulled', img: fileToBase64('src/assets/prod-sesame-white.jpg') },
  { name: 'Black Sesame Seeds', sci: 'Sesamum indicum', spec: 'Color Sorted 99.9% • Oil Content > 48%', img: fileToBase64('src/assets/prod-sesame-black.jpg') },
  { name: 'Cloves (Lal Pari Laung)', sci: 'Syzygium aromaticum', spec: 'Handpicked Hand-Cleaned • Oil > 18%', img: fileToBase64('src/assets/prod-cloves.jpg') },
  { name: 'Cinnamon / Cassia Quills', sci: 'Cinnamomum verum', spec: 'Selected Quills • High Cinnamaldehyde', img: fileToBase64('src/assets/prod-cinnamon.jpg') },
  { name: 'Star Anise (Chakraphool)', sci: 'Illicium verum', spec: 'Whole 8-Point Stars • Broken < 3%', img: fileToBase64('src/assets/prod-star-anise.jpg') },
  { name: 'Nutmeg & Red Javitri', sci: 'Myristica fragrans', spec: 'Whole ABCD Kernels & Aromatic Mace', img: fileToBase64('src/assets/prod-nutmeg.jpg') },
  { name: 'Ajwain (Carom Seeds)', sci: 'Trachyspermum ammi', spec: 'Thymol Rich • Machine Cleaned 99%', img: fileToBase64('src/assets/prod-ajwain.jpg') },
  { name: 'Fennel Seeds (Saunf)', sci: 'Foeniculum vulgare', spec: 'Lucknow Extra Green & Abu Road Bold', img: fileToBase64('src/assets/prod-fennel-seeds.jpg') },
  { name: 'Flaxseed / Brown Linseed', sci: 'Linum usitatissimum', spec: 'Sortex 99.5% Clean • Omega-3 ALA Rich', img: fileToBase64('src/assets/prod-flaxseed-linseed.jpg') },
  { name: 'Dry Amla (Indian Gooseberry)', sci: 'Phyllanthus emblica', spec: 'Sun-Dried Seedless Flakes • Tannins > 30%', img: fileToBase64('src/assets/prod-amla-fresh.jpg') },
  { name: 'Dark Red Kidney Beans', sci: 'Phaseolus vulgaris', spec: 'Bold Machine-Polished Rajma • Zero Weevil', img: fileToBase64('src/assets/prod-rajma-dark.jpg') },
  { name: 'Green Moong Whole', sci: 'Vigna radiata', spec: 'Shiny Green Sortex Cleaned • High Sprouting', img: fileToBase64('src/assets/prod-green-moong.jpg') },
  { name: 'Desi Brown Chana', sci: 'Cicer arietinum', spec: 'Unpolished High-Fiber Maharashtra Desi', img: fileToBase64('src/assets/prod-desi-chana.jpg') },
];

console.log(`Processing ${PRODUCTS_CATALOG.length} core commodities...`);
const productCards = [];
for (const p of PRODUCTS_CATALOG) {
  let photoPath = photoOverrides[p.sku] || p.image.replace(/^\//, 'public/');
  const photoBase64 = fileToBase64(photoPath, 'image/jpeg');
  productCards.push({
    ...p,
    scientificName: scientificNames[p.sku] || 'Agro Botanical Specimen',
    photoBase64,
  });
}

// Group into 2 items per page
const productPages = [];
for (let i = 0; i < productCards.length; i += 2) {
  productPages.push([productCards[i], productCards[i + 1] || null]);
}

const totalPages = 33;

// Category styling config
const categoryStyles = {
  'Fresh Vegetables': {
    accent: '#15803d',
    badgeBg: '#f0fdf4',
    badgeBorder: '#86efac',
    badgeText: '#14532d',
    heroTag: 'Perishable Horticulture'
  },
  'Fresh Fruits': {
    accent: '#c2410c',
    badgeBg: '#fff7ed',
    badgeBorder: '#fdba74',
    badgeText: '#9a3412',
    heroTag: 'Reefer Orchard Fruits'
  },
  'Spices & Herbs': {
    accent: '#b45309',
    badgeBg: '#fefce8',
    badgeBorder: '#fde047',
    badgeText: '#854d0e',
    heroTag: 'Certified Indian Spices'
  },
  'Grains & Pulses': {
    accent: '#0369a1',
    badgeBg: '#f0f9ff',
    badgeBorder: '#7dd3fc',
    badgeText: '#075985',
    heroTag: 'Cereals, Rice & Agri-Bulks'
  },
  'Dry Fruits & Nuts': {
    accent: '#78350f',
    badgeBg: '#fdf4ff',
    badgeBorder: '#f0abfc',
    badgeText: '#701a75',
    heroTag: 'Premium Processed Nuts'
  }
};

function renderHeader(categoryName, pageNum) {
  const catStyle = categoryStyles[categoryName] || {
    accent: '#c59b27',
    badgeBg: '#f8fafc',
    badgeBorder: '#cbd5e1',
    badgeText: '#08214d',
    heroTag: 'Export Sourcing Dossier'
  };

  const formattedNum = pageNum < 10 ? `0${pageNum}` : `${pageNum}`;

  return `
    <header class="page-header" style="border-bottom-color: ${catStyle.accent};">
      <div class="header-left">
        <div class="logo-shield">
          <img src="${LOGO_BASE64}" alt="Sheshaan Global" class="header-logo" />
        </div>
        <div class="header-brand-block">
          <div class="brand-eyebrow">Government of India Recognized Export House</div>
          <div class="brand-title">SHESHAAN <span>GLOBAL</span></div>
          <div class="brand-tagline">APEDA • CDB • FSSAI CENTRAL • DGFT IEC • ISO 22000</div>
        </div>
      </div>
      <div class="header-right">
        <div class="header-cat-badge" style="background: ${catStyle.badgeBg}; border-color: ${catStyle.badgeBorder}; color: ${catStyle.badgeText};">
          ${categoryName}
        </div>
        <div class="header-sub-meta">
          <span>Doc Ref: SG/EXP/2026</span> • <span>Folio ${formattedNum}</span>
        </div>
      </div>
    </header>
  `;
}

function renderFooter(pageNum) {
  const formattedNum = pageNum < 10 ? `0${pageNum}` : `${pageNum}`;
  return `
    <footer class="page-footer">
      <div class="footer-left">
        <span class="corp-name">Sheshaan Global Enterprise</span>
        <span class="corp-div">International Agricultural Export Division • Navi Mumbai & Nashik</span>
      </div>
      <div class="footer-center">
        <span>Confidential Technical Specification Dossier • For Institutional Procurement Only</span>
      </div>
      <div class="footer-right">
        <span class="folio-label">Page</span>
        <span class="folio-box">${formattedNum} / ${totalPages}</span>
      </div>
    </footer>
  `;
}

function renderProductBlock(p) {
  if (!p) return `<div class="product-slot empty"></div>`;

  const varietiesStr = Array.isArray(p.varieties) ? p.varieties.join(', ') : p.varieties;
  const certsList = (p.certifications || []).slice(0, 4);
  const cleanSummary = (p.executiveSummary || p.geoExtractBlock || '')
    .replace(/^["']|["']$/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const catStyle = categoryStyles[p.categoryName] || {
    accent: '#c59b27',
    badgeBg: '#f8fafc',
    badgeBorder: '#cbd5e1',
    badgeText: '#08214d'
  };

  const originName = p.originCluster.split(',')[0].trim();
  const gatewayPort = (p.logistics.gatewayPorts && p.logistics.gatewayPorts[0])
    ? p.logistics.gatewayPorts[0].split('(')[0].trim()
    : 'JNPT (Nhava Sheva)';

  // Parse transitClimateControl into Temperature and Ventilation/RH
  const climateStr = p.logistics.transitClimateControl || 'Ambient Controlled';
  let tempPart = climateStr;
  let ventPart = 'Ambient Sealed / Standard';
  if (climateStr.includes(',')) {
    const parts = climateStr.split(',');
    tempPart = parts[0].trim();
    ventPart = parts.slice(1).join(', ').trim();
  }

  const c40ft = p.logistics.container40ft || 'Available upon request';
  const c20ft = p.logistics.container20ft || 'Available upon request';
  const packaging = p.logistics.standardPackaging || 'Export Standard Packaging';
  const moisture = p.specs.moistureTolerance || 'Complies with APEDA / Export Standards';
  const purity = p.specs.purityAdmixture || 'Sortex Cleaned > 99.5% Purity';
  const grade = p.specs.primaryGrade || varietiesStr;
  const defects = p.specs.brokenOrDefectLimit || 'Cleaned, Discoloration < 1.0%';
  const harvestWindow = (p.harvestCalendar && p.harvestCalendar.harvestWindow)
    ? p.harvestCalendar.harvestWindow
    : 'Seasonal Harvest Available';

  return `
    <article class="product-card" style="--cat-accent: ${catStyle.accent};">
      <!-- Card Masthead -->
      <div class="prod-header">
        <div class="prod-title-group">
          <div class="prod-meta-strip">
            <span class="prod-sku-tag">DOSSIER REF: ${p.sku}</span>
            <span class="prod-sep">•</span>
            <span class="prod-trade-grade">Grade A Export Standard</span>
            <span class="prod-sep">•</span>
            <span class="prod-origin-sub">Origin: ${originName}</span>
          </div>
          <h2 class="prod-name">${p.name}</h2>
          <span class="prod-scientific">${p.scientificName}</span>
        </div>
        <div class="prod-seal-box">
          <div class="hs-seal">HS ${p.hsCode}</div>
          <span class="crop-year-tag">${p.specs.cropYear || 'Current Crop 2026/27'}</span>
        </div>
      </div>

      <!-- Card Body Grid -->
      <div class="prod-body">
        <!-- Left: Photo & Logistics -->
        <div class="prod-photo-col">
          <div class="photo-frame">
            <img src="${p.photoBase64}" alt="${p.name}" />
            <div class="photo-overlay-tag">
              <span class="photo-pin-dot"></span>
              <span>Cluster: ${originName}</span>
            </div>
          </div>

          <div class="stowage-ledger">
            <div class="stowage-header">Cold-Chain & Reefer Stowage</div>
            <div class="stowage-row">
              <span class="stowage-lbl">Carriage Temp</span>
              <span class="stowage-val highlight">${tempPart}</span>
            </div>
            <div class="stowage-row">
              <span class="stowage-lbl">Vent / RH</span>
              <span class="stowage-val">${ventPart}</span>
            </div>
            <div class="stowage-row">
              <span class="stowage-lbl">40ft HC Reefer</span>
              <span class="stowage-val">${c40ft}</span>
            </div>
            <div class="stowage-row">
              <span class="stowage-lbl">20ft Cargo</span>
              <span class="stowage-val">${c20ft}</span>
            </div>
          </div>
        </div>

        <!-- Right: Technical Specification Ledger & Protocol -->
        <div class="prod-specs-col">
          <table class="specs-ledger-table">
            <tbody>
              <tr>
                <th>Caliber / Grade</th>
                <td><strong>${grade}</strong></td>
              </tr>
              <tr>
                <th>Varieties Sourced</th>
                <td>${varietiesStr}</td>
              </tr>
              <tr>
                <th>Moisture Tolerance</th>
                <td>${moisture}</td>
              </tr>
              <tr>
                <th>Purity & Foreign Matter</th>
                <td>${purity}</td>
              </tr>
              <tr>
                <th>Packaging Standard</th>
                <td>${packaging}</td>
              </tr>
              <tr>
                <th>Defects & Harvest</th>
                <td>${defects} • <span class="harvest-lbl">Harvest: ${harvestWindow}</span></td>
              </tr>
            </tbody>
          </table>

          <div class="commentary-box">
            <div class="commentary-header">Quality Assurance & Phytosanitary Protocol</div>
            <div class="commentary-body">
              ${cleanSummary.slice(0, 190)}...
            </div>
          </div>

          <div class="governance-strip">
            <span class="gov-title">Clearance:</span>
            ${certsList.map(c => `<span class="gov-pill">${c}</span>`).join('')}
            <span class="gov-pill reefer-pill">100% Pre-Cooled</span>
            <span class="gov-pill gateway">Gateway: ${gatewayPort}</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

// Build HTML
let html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Sheshaan Global - Official Product Catalogue 2026-2027</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=JetBrains+Mono:wght@500;700;800&display=swap');

  @page {
    size: A4 portrait;
    margin: 0;
  }
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  html, body {
    margin: 0;
    padding: 0;
    width: 210mm;
    background: #0f172a;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #1e293b;
    font-size: 8.5pt;
    line-height: 1.35;
    -webkit-font-smoothing: antialiased;
  }

  .page {
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    min-height: 297mm;
    position: relative;
    page-break-after: always;
    break-after: page;
    background: #ffffff;
    padding: 10mm 12mm 8mm 12mm;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }

  /* Fine Registration Marks on Editorial Pages */
  .crop-mark {
    position: absolute;
    width: 5mm;
    height: 5mm;
    pointer-events: none;
    z-index: 10;
  }
  .crop-tl { top: 2.5mm; left: 2.5mm; border-top: 0.5pt solid #cbd5e1; border-left: 0.5pt solid #cbd5e1; }
  .crop-tr { top: 2.5mm; right: 2.5mm; border-top: 0.5pt solid #cbd5e1; border-right: 0.5pt solid #cbd5e1; }
  .crop-bl { bottom: 2.5mm; left: 2.5mm; border-bottom: 0.5pt solid #cbd5e1; border-left: 0.5pt solid #cbd5e1; }
  .crop-br { bottom: 2.5mm; right: 2.5mm; border-bottom: 0.5pt solid #cbd5e1; border-right: 0.5pt solid #cbd5e1; }
  /* Full Bleed Image Pages (Cover, About Us, Thank You) */
  .page-full-image {
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    min-height: 297mm;
    overflow: hidden;
    page-break-after: always;
    break-after: page;
    position: relative;
    margin: 0;
    padding: 0;
    background: #071d3a;
  }
  .page-full-image img {
    width: 210mm;
    height: 297mm;
    object-fit: fill;
    display: block;
  }

  /* ------------------- COVER PAGE ------------------- */
  .page-cover {
    background: radial-gradient(circle at 80% 20%, #0d2c5e 0%, #061836 45%, #030e22 100%);
    color: #ffffff;
    padding: 14mm 15mm 12mm 15mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #1e3a8a;
  }
  .cover-frame-border {
    position: absolute;
    inset: 6mm;
    border: 1px solid rgba(197, 155, 39, 0.4);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
    pointer-events: none;
    z-index: 1;
  }
  .cover-frame-corner {
    position: absolute;
    width: 6mm;
    height: 6mm;
    border-color: #c59b27;
    border-style: solid;
    pointer-events: none;
    z-index: 2;
  }
  .cf-tl { top: 5mm; left: 5mm; border-width: 2px 0 0 2px; }
  .cf-tr { top: 5mm; right: 5mm; border-width: 2px 2px 0 0; }
  .cf-bl { bottom: 5mm; left: 5mm; border-width: 0 0 2px 2px; }
  .cf-br { bottom: 5mm; right: 5mm; border-width: 0 2px 2px 0; }

  .cover-top {
    position: relative;
    z-index: 3;
  }
  .cover-brand-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(197, 155, 39, 0.5);
    padding-bottom: 5mm;
  }
  .cover-logo-shield {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .cover-logo-img {
    width: 76px;
    height: 76px;
    object-fit: contain;
    background: #ffffff;
    border-radius: 12px;
    padding: 6px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(197, 155, 39, 0.6);
  }
  .cover-brand-text .gov-tag {
    font-size: 7pt;
    font-weight: 700;
    color: #c59b27;
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }
  .cover-brand-text h1 {
    margin: 2px 0;
    font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
    font-size: 25pt;
    font-weight: 800;
    letter-spacing: 1.5px;
    color: #ffffff;
    line-height: 1;
    text-shadow: 0 2px 8px rgba(0,0,0,0.5);
  }
  .cover-brand-text h1 span {
    color: #f7941d;
  }
  .cover-brand-text .sub-tagline {
    font-size: 9.5pt;
    font-weight: 600;
    color: #38bdf8;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .cover-seal-circular {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 1.5px dashed #c59b27;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4px;
    background: rgba(197, 155, 39, 0.08);
  }
  .cover-seal-circular .seal-star {
    color: #c59b27;
    font-size: 8pt;
    line-height: 1;
  }
  .cover-seal-circular .seal-text {
    font-size: 5.2pt;
    font-weight: 800;
    color: #f1f5f9;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 1.15;
    margin: 2px 0;
  }
  .cover-seal-circular .seal-year {
    font-size: 6.5pt;
    font-weight: 800;
    color: #c59b27;
    font-family: 'JetBrains Mono', monospace;
  }

  .cover-hero-center {
    position: relative;
    z-index: 3;
    margin-top: 8mm;
  }
  .edition-pill-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4mm;
  }
  .edition-pill {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 3px;
    background: rgba(197, 155, 39, 0.15);
    border: 1px solid #c59b27;
    color: #fcd34d;
    font-size: 8.5pt;
    font-weight: 800;
    letter-spacing: 1.8px;
    text-transform: uppercase;
  }
  .edition-bar {
    height: 1px;
    flex: 1;
    background: linear-gradient(90deg, rgba(197,155,39,0.8), transparent);
  }

  .cover-main-title {
    font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
    font-size: 32pt;
    line-height: 1.05;
    font-weight: 900;
    letter-spacing: 0.5px;
    margin: 0 0 4mm 0;
    text-transform: uppercase;
    color: #ffffff;
    text-shadow: 0 4px 16px rgba(0,0,0,0.6);
  }
  .cover-main-title .gold-accent {
    color: #f7941d;
    font-style: italic;
    font-family: 'Playfair Display', Georgia, serif;
  }
  .cover-subtitle-lead {
    font-size: 10pt;
    line-height: 1.5;
    color: #cbd5e1;
    max-width: 172mm;
    margin: 0 0 6mm 0;
    font-weight: 400;
  }

  .cover-sectors-quad {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3.5mm;
    margin-bottom: 6mm;
  }
  .cover-sector-tile {
    background: rgba(8, 33, 77, 0.65);
    border: 1px solid rgba(197, 155, 39, 0.35);
    border-radius: 6px;
    padding: 3mm 4mm;
    backdrop-filter: blur(6px);
  }
  .cover-sector-tile .tile-title {
    font-size: 8.5pt;
    font-weight: 800;
    color: #38bdf8;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .cover-sector-tile .tile-title .tile-code {
    font-size: 6.5pt;
    color: #c59b27;
    font-family: 'JetBrains Mono', monospace;
  }
  .cover-sector-tile p {
    margin: 0;
    font-size: 7.2pt;
    color: #cbd5e1;
    line-height: 1.35;
  }

  .cover-stats-ledger {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3mm;
    background: rgba(4, 18, 43, 0.85);
    border: 1px solid rgba(197, 155, 39, 0.5);
    border-radius: 6px;
    padding: 3.5mm 4mm;
    text-align: center;
  }
  .stat-col .stat-value {
    font-family: 'Cinzel', Georgia, serif;
    font-size: 18pt;
    font-weight: 800;
    color: #c59b27;
    display: block;
    line-height: 1;
    margin-bottom: 2px;
  }
  .stat-col .stat-title {
    font-size: 6.5pt;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .cover-bottom-bar {
    position: relative;
    z-index: 3;
    border-top: 1px solid rgba(197, 155, 39, 0.4);
    padding-top: 4mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cover-badges-row {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }
  .gov-crest-badge {
    padding: 2.5px 7px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.1);
    font-size: 6.2pt;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .cover-desk-meta {
    text-align: right;
    font-size: 7.2pt;
    color: #94a3b8;
    line-height: 1.35;
  }
  .cover-desk-meta strong {
    color: #ffffff;
    font-size: 7.8pt;
  }

  /* ------------------- HEADER & FOOTER ------------------- */
  .page-header {
    height: 13mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #07518b;
    padding-bottom: 2mm;
    margin-bottom: 2.5mm;
  }
  .header-left {
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .logo-shield {
    width: 34px;
    height: 34px;
    border-radius: 6px;
    border: 1px solid #cbd5e1;
    padding: 2px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .header-brand-block {
    display: flex;
    flex-direction: column;
  }
  .brand-eyebrow {
    font-size: 5.5pt;
    font-weight: 700;
    color: #c59b27;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .brand-title {
    font-family: 'Cinzel', Georgia, serif;
    font-size: 11pt;
    font-weight: 800;
    color: #08214d;
    letter-spacing: 0.8px;
    line-height: 1.1;
  }
  .brand-title span {
    color: #f7941d;
  }
  .brand-tagline {
    font-size: 5.6pt;
    font-weight: 600;
    color: #64748b;
    letter-spacing: 0.4px;
  }

  .header-right {
    text-align: right;
  }
  .header-cat-badge {
    display: inline-block;
    font-size: 6.8pt;
    font-weight: 800;
    text-transform: uppercase;
    padding: 2px 9px;
    border-radius: 3px;
    border: 1px solid #cbd5e1;
    letter-spacing: 0.5px;
  }
  .header-sub-meta {
    font-size: 5.8pt;
    font-family: 'JetBrains Mono', monospace;
    color: #64748b;
    margin-top: 1.5px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .page-footer {
    height: 8mm;
    border-top: 1px solid #cbd5e1;
    padding-top: 1.8mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 6.5pt;
    color: #64748b;
  }
  .footer-left .corp-name {
    font-weight: 800;
    color: #08214d;
    margin-right: 6px;
  }
  .footer-left .corp-div {
    color: #64748b;
  }
  .footer-center {
    font-size: 6pt;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .footer-right {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .folio-label {
    font-size: 5.8pt;
    text-transform: uppercase;
    font-weight: 700;
    color: #94a3b8;
  }
  .folio-box {
    background: #f1f5f9;
    padding: 1.5px 7px;
    border-radius: 3px;
    font-weight: 800;
    font-family: 'JetBrains Mono', monospace;
    color: #08214d;
    border: 1px solid #cbd5e1;
  }

  /* ------------------- PRODUCT CARD (2 PER PAGE) ------------------- */
  .page-content-two-products {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 4mm;
  }

  .product-card {
    height: 124mm;
    max-height: 124mm;
    background: #ffffff;
    border: 1px solid #dcd7ce;
    border-radius: 6px;
    padding: 2.8mm 3.8mm;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    position: relative;
  }
  .product-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2.5px;
    background: var(--cat-accent, #c59b27);
    border-radius: 6px 6px 0 0;
  }

  .prod-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 1.8mm;
    border-bottom: 1px solid #ebe6dd;
    margin-bottom: 2mm;
  }
  .prod-title-group {
    flex: 1;
    padding-right: 3mm;
  }
  .prod-meta-strip {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 1px;
  }
  .prod-sku-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 5.8pt;
    font-weight: 700;
    color: #08214d;
    background: #eef2f7;
    padding: 1px 4.5px;
    border-radius: 2px;
    letter-spacing: 0.4px;
  }
  .prod-sep {
    color: #cbd5e1;
    font-size: 6pt;
  }
  .prod-trade-grade {
    font-size: 5.8pt;
    font-weight: 800;
    color: #c59b27;
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }
  .prod-origin-sub {
    font-size: 5.8pt;
    color: #64748b;
    font-weight: 600;
  }
  .prod-name {
    margin: 0;
    font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
    font-size: 13pt;
    font-weight: 700;
    color: #08214d;
    line-height: 1.15;
    letter-spacing: 0.2px;
  }
  .prod-scientific {
    font-family: Georgia, serif;
    font-style: italic;
    font-size: 6.8pt;
    color: #15803d;
    margin-top: 1px;
    display: block;
  }

  .prod-seal-box {
    text-align: right;
    flex-shrink: 0;
  }
  .hs-seal {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 7.2pt;
    font-weight: 800;
    color: #08214d;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 2.5px solid var(--cat-accent, #c59b27);
    padding: 2px 7px;
    border-radius: 3px;
    letter-spacing: 0.5px;
  }
  .crop-year-tag {
    display: block;
    font-size: 5.8pt;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    margin-top: 1.5px;
    letter-spacing: 0.4px;
  }

  .prod-body {
    display: grid;
    grid-template-columns: 54mm 1fr;
    gap: 3.5mm;
    flex: 1;
  }

  .prod-photo-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .photo-frame {
    width: 54mm;
    height: 55mm;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    border: 1px solid #dcd7ce;
    background: #fdfbf7;
  }
  .photo-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .photo-overlay-tag {
    position: absolute;
    bottom: 3px;
    left: 3px;
    right: 3px;
    background: rgba(8, 33, 77, 0.9);
    backdrop-filter: blur(4px);
    color: #ffffff;
    font-size: 5.5pt;
    font-weight: 600;
    padding: 2px 5px;
    border-radius: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.3px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .photo-pin-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #f7941d;
    display: inline-block;
  }

  .stowage-ledger {
    background: #f9f8f5;
    border: 1px solid #ebe5db;
    border-radius: 4px;
    padding: 2.5px 3.5px;
    margin-top: 2.5px;
  }
  .stowage-header {
    font-size: 5.4pt;
    font-weight: 800;
    color: #08214d;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 0.5pt solid #ebe5db;
    padding-bottom: 1.5px;
    margin-bottom: 1.5px;
  }
  .stowage-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 5.6pt;
    padding: 1.5px 0;
    border-bottom: 0.5pt solid #ebe5db;
  }
  .stowage-row:last-child {
    border-bottom: none;
  }
  .stowage-lbl {
    color: #64748b;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .stowage-val {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    color: #08214d;
  }
  .stowage-val.highlight {
    color: #0284c7;
    font-weight: 800;
  }

  .prod-specs-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .specs-ledger-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.3pt;
  }
  .specs-ledger-table tr {
    border-bottom: 0.5pt solid #ebe5db;
  }
  .specs-ledger-table tr:nth-child(even) {
    background: #fdfbf7;
  }
  .specs-ledger-table th {
    width: 32%;
    text-align: left;
    padding: 1.3px 4px;
    font-size: 5.5pt;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }
  .specs-ledger-table td {
    padding: 1.3px 4px;
    color: #0f172a;
    line-height: 1.22;
  }
  .harvest-lbl {
    color: #64748b;
    font-size: 6.0pt;
  }

  .commentary-box {
    background: #fcfbf9;
    border: 1px solid #eae3d5;
    border-left: 3px solid var(--cat-accent, #c59b27);
    border-radius: 4px;
    padding: 1.8mm 2.8mm;
    margin-top: 1.2mm;
  }
  .commentary-header {
    font-size: 5.6pt;
    font-weight: 800;
    color: #08214d;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: 1px;
  }
  .commentary-body {
    font-size: 6.0pt;
    line-height: 1.28;
    color: #475569;
  }

  .governance-strip {
    display: flex;
    align-items: center;
    gap: 3px;
    flex-wrap: wrap;
    padding-top: 1.5mm;
    border-top: 0.5pt dashed #cbd5e1;
    margin-top: 1.5mm;
  }
  .gov-title {
    font-size: 5.6pt;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
    margin-right: 2px;
  }
  .gov-pill {
    font-size: 5.5pt;
    font-weight: 700;
    color: #334155;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    padding: 1px 4.5px;
    border-radius: 2px;
    letter-spacing: 0.3px;
  }
  .gov-pill.reefer-pill {
    background: #ecfdf5;
    color: #047857;
    border-color: #a7f3d0;
  }
  .gov-pill.gateway {
    color: #92400e;
    background: #fef3c7;
    border-color: #fde68a;
    font-weight: 800;
  }

  /* ------------------- EDITORIAL PAGES (2, 3, 4, 30, 31, 32) ------------------- */
  .editorial-page {
    padding: 10mm 12mm 8mm 12mm;
  }
  .ed-section-title {
    font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
    font-size: 15pt;
    font-weight: 800;
    color: #08214d;
    margin: 0 0 2mm 0;
    border-left: 3.5px solid #c59b27;
    padding-left: 8px;
    line-height: 1.15;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .ed-lead {
    font-size: 8.2pt;
    line-height: 1.45;
    color: #334155;
    margin-bottom: 3.5mm;
  }
  .ed-lead .drop-cap {
    font-family: 'Cinzel', Georgia, serif;
    font-size: 26pt;
    font-weight: 900;
    color: #08214d;
    float: left;
    line-height: 0.85;
    padding-right: 6px;
    padding-top: 2px;
  }

  .pillars-quad {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3.5mm;
    margin-bottom: 4mm;
  }
  .pillar-architectural-card {
    background: #fdfbf7;
    border: 1px solid #e2ddd5;
    border-left: 3px solid #08214d;
    border-radius: 4px;
    padding: 3mm 3.5mm;
  }
  .pillar-architectural-card.green { border-left-color: #15803d; }
  .pillar-architectural-card.gold { border-left-color: #c59b27; }
  .pillar-architectural-card.orange { border-left-color: #ea580c; }
  .pillar-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 6.2pt;
    font-weight: 800;
    color: #c59b27;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1px;
  }
  .pillar-architectural-card h3 {
    margin: 0 0 1.5mm 0;
    font-size: 8.8pt;
    font-weight: 800;
    color: #08214d;
  }
  .pillar-architectural-card p {
    margin: 0;
    font-size: 6.8pt;
    line-height: 1.35;
    color: #475569;
  }

  .formal-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.8pt;
    margin-top: 2.5mm;
    border: 1px solid #cbd5e1;
  }
  .formal-table th {
    background: #08214d;
    color: #ffffff;
    text-align: left;
    padding: 2.5px 6px;
    font-size: 6pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
  .formal-table td {
    padding: 2.5px 6px;
    border-bottom: 1px solid #e2e8f0;
    border-right: 1px solid #e2e8f0;
    color: #1e293b;
    line-height: 1.25;
  }
  .formal-table tr:nth-child(even) {
    background: #f8fafc;
  }

  /* ------------------- TABLE OF CONTENTS ------------------- */
  .toc-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3.5mm;
    margin-top: 3.5mm;
  }
  .toc-category-box {
    background: #fdfbf7;
    border: 1px solid #e2ddd5;
    border-radius: 6px;
    padding: 3mm 4mm;
  }
  .toc-cat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #08214d;
    padding-bottom: 1.5mm;
    margin-bottom: 1.5mm;
  }
  .toc-cat-title {
    font-family: 'Cinzel', Georgia, serif;
    font-size: 9.5pt;
    font-weight: 800;
    color: #08214d;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .toc-page-badge {
    background: #08214d;
    color: #c59b27;
    font-family: 'JetBrains Mono', monospace;
    font-size: 6.5pt;
    font-weight: 800;
    padding: 1.5px 6px;
    border-radius: 3px;
  }
  .toc-items-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .toc-items-list li {
    display: flex;
    justify-content: space-between;
    font-size: 6.6pt;
    padding: 1.5px 0;
    border-bottom: 1px dotted #e2e8f0;
    color: #334155;
  }
  .toc-items-list li span.code {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    color: #08214d;
    font-size: 5.8pt;
  }

  /* ------------------- SPECIALTY SHOWCASE (PAGE 30) ------------------- */
  .botanicals-visual-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5mm;
    margin-top: 2.5mm;
  }
  .botanical-visual-card {
    background: #ffffff;
    border: 1px solid #dcd7ce;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
  }
  .botanical-thumb {
    width: 100%;
    height: 23mm;
    object-fit: cover;
    background: #f1f5f9;
  }
  .botanical-info {
    padding: 2mm 2.5mm;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .botanical-info strong {
    display: block;
    font-family: 'Cinzel', Georgia, serif;
    font-size: 7.2pt;
    font-weight: 700;
    color: #08214d;
    line-height: 1.2;
    margin-bottom: 1px;
  }
  .botanical-info .b-sci {
    display: block;
    font-family: Georgia, serif;
    font-size: 5.8pt;
    font-style: italic;
    color: #15803d;
    margin-bottom: 1.5px;
  }
  .botanical-info .b-spec {
    display: block;
    font-size: 5.6pt;
    color: #475569;
    line-height: 1.2;
  }

  /* ------------------- BACK COVER ------------------- */
  .page-back {
    background: radial-gradient(circle at 80% 20%, #0d2c5e 0%, #061836 45%, #030e22 100%);
    color: #ffffff;
    padding: 13mm 15mm 11mm 15mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #1e3a8a;
  }
  .back-top h2 {
    font-family: 'Cinzel', Georgia, serif;
    font-size: 22pt;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 4px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .back-top h2 span {
    color: #f7941d;
  }
  .back-top p {
    font-size: 8.5pt;
    color: #cbd5e1;
    max-width: 168mm;
    line-height: 1.45;
  }

  .back-leadership-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3.5mm;
    margin-top: 4mm;
  }
  .back-leader-card {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(197, 155, 39, 0.4);
    border-radius: 6px;
    padding: 8px 10px;
  }
  .back-leader-card .leader-role {
    font-size: 6.2pt;
    font-weight: 800;
    color: #c59b27;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: block;
    margin-bottom: 1px;
  }
  .back-leader-card .leader-name {
    font-family: 'Cinzel', Georgia, serif;
    font-size: 9.5pt;
    font-weight: 700;
    color: #ffffff;
    display: block;
    margin-bottom: 2px;
  }
  .back-leader-card .leader-desc {
    font-size: 6.5pt;
    color: #94a3b8;
    line-height: 1.25;
  }

  .back-contacts-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4.5mm;
    margin-top: 4.5mm;
  }
  .back-contact-card {
    background: rgba(8, 33, 77, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    padding: 8px 11px;
  }
  .back-contact-card h4 {
    margin: 0 0 4px 0;
    font-size: 8.8pt;
    font-weight: 800;
    color: #38bdf8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .back-contact-card p {
    margin: 0 0 2px 0;
    font-size: 7.2pt;
    color: #e2e8f0;
    line-height: 1.35;
  }

  .back-doc-checklist {
    background: rgba(4, 18, 43, 0.9);
    border: 1px solid rgba(197, 155, 39, 0.5);
    border-radius: 6px;
    padding: 8px 11px;
    margin-top: 4mm;
  }
  .back-doc-checklist h4 {
    margin: 0 0 4px 0;
    font-size: 8.2pt;
    font-weight: 800;
    color: #c59b27;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }
  .back-checklist-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 3.5px;
  }
  .back-pill {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-size: 6.2pt;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 3px;
  }
</style>
</head>
<body>
`;

// PAGE 1: OFFICIAL FRONT COVER (USER ARTWORK)
html += `
<div class="page-full-image">
  <img src="${COVER_IMAGE_BASE64}" alt="Sheshaan Global - Connecting Indian Agriculture to Global Markets" />
</div>
`;

// PAGE 2: OFFICIAL ABOUT US (USER ARTWORK)
html += `
<div class="page-full-image">
  <img src="${ABOUT_IMAGE_BASE64}" alt="Sheshaan Global - Building Global Connections Through Indian Agriculture" />
</div>
`;

// PAGE 3: LOGISTICS INFRASTRUCTURE & OCEAN FREIGHT CORRIDORS
html += `
<div class="page editorial-page">
  <div class="crop-mark crop-tl"></div><div class="crop-mark crop-tr"></div>
  <div class="crop-mark crop-bl"></div><div class="crop-mark crop-br"></div>

  ${renderHeader('Logistics & Ocean Fleet', 3)}

  <div style="flex: 1;">
    <h2 class="ed-section-title">Global Maritime Shipping Lanes & Reefer Telemetry</h2>
    <div class="ed-lead">
      <span class="drop-cap">T</span>imely vessel connectivity and uncompromising cold-chain thermodynamics govern the shelf life and profitability of international commodity shipments. Sheshaan Global operates long-term booking contracts with Tier-1 ocean container carriers (Maersk, MSC, CMA CGM, Hapag-Lloyd, and ONE) connecting India's premier gateway seaports to 40+ international container terminals.
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3.5mm; margin-bottom: 3.5mm;">
      <div style="background: #fdfbf7; border: 1px solid #e2ddd5; border-radius: 4px; padding: 2.5mm 3.5mm;">
        <h3 style="margin: 0 0 1.5mm 0; font-family: 'Cinzel', Georgia, serif; font-size: 8.5pt; font-weight: 800; color: #08214d; text-transform: uppercase;">
          Primary Gateway Seaports (India)
        </h3>
        <ul style="margin: 0; padding-left: 14px; font-size: 6.8pt; color: #334155; line-height: 1.45;">
          <li><strong>Nhava Sheva (JNPT), Maharashtra:</strong> India's premier container hub for Fresh Onions, Grapes, Pomegranates, Bananas, Spices, and Rice. 24/7 reefer monitoring yards and direct ocean sailings.</li>
          <li><strong>Mundra Port, Gujarat:</strong> Deep-draft all-weather port handling heavy agricultural bulks, Cumin, Sesame, Peanuts, Wheat, and Castor.</li>
          <li><strong>Chennai & Tuticorin, Tamil Nadu:</strong> Southern maritime gateway for Pollachi Coconuts, Bananas, Moringa, and south Indian spice consignments.</li>
          <li><strong>Pipavav Port, Gujarat:</strong> Specialized modern bulk grain and oilseed loading terminal.</li>
        </ul>
      </div>

      <div style="background: #fdfbf7; border: 1px solid #e2ddd5; border-radius: 4px; padding: 2.5mm 3.5mm;">
        <h3 style="margin: 0 0 1.5mm 0; font-family: 'Cinzel', Georgia, serif; font-size: 8.5pt; font-weight: 800; color: #15803d; text-transform: uppercase;">
          Reefer Engineering & Cold Chain Standards
        </h3>
        <ul style="margin: 0; padding-left: 14px; font-size: 6.8pt; color: #334155; line-height: 1.45;">
          <li><strong>Microprocessor Setpoint Control:</strong> Electronic micro-controllers maintain carriage setpoints within ±0.2°C accuracy throughout ocean voyage.</li>
          <li><strong>Fresh Air Exchange (Ventilation):</strong> Calibrated air exchange rates (15 to 35 CBM/hr) exhaust ethylene and respiration carbon dioxide.</li>
          <li><strong>Humidity Control (Dehumidification):</strong> Maintained at 65%–75% RH for alliums to prevent neck-rot, premature sprouting, and fungal growth.</li>
          <li><strong>Dual TempTale Data Loggers:</strong> Embedded at return air and door points to provide uncompromised voyage temperature verification.</li>
        </ul>
      </div>
    </div>

    <h3 style="font-family: 'Cinzel', Georgia, serif; font-size: 9.5pt; font-weight: 800; color: #08214d; margin: 3mm 0 1.5mm 0; text-transform: uppercase;">
      Direct Maritime Transit Times to Global Buyer Terminals
    </h3>
    <table class="formal-table">
      <thead>
        <tr>
          <th>Destination Port & Country</th>
          <th>Gateway Loading Port</th>
          <th>Vessel Transit Time</th>
          <th>Primary Commodity Sourced</th>
          <th>Standard Trade Incoterm</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Jebel Ali (Dubai, UAE)</strong></td>
          <td>Nhava Sheva (JNPT) / Mundra</td>
          <td><strong>3 – 4 Days</strong></td>
          <td>Fresh Onions, Chillies, Coconuts, Spices</td>
          <td>CIF / CFR / FOB</td>
        </tr>
        <tr>
          <td><strong>Dammam / Jeddah (Saudi Arabia)</strong></td>
          <td>Nhava Sheva (JNPT) / Mundra</td>
          <td><strong>5 – 7 Days</strong></td>
          <td>1121 Basmati, Red Onions, Spices, Pulses</td>
          <td>CIF / CFR</td>
        </tr>
        <tr>
          <td><strong>Hamad Port (Doha, Qatar)</strong></td>
          <td>Nhava Sheva (JNPT)</td>
          <td><strong>4 – 5 Days</strong></td>
          <td>Horticulture, Bananas, Table Grapes</td>
          <td>CIF / CFR</td>
        </tr>
        <tr>
          <td><strong>Sohar / Muscat (Oman)</strong></td>
          <td>Nhava Sheva (JNPT) / Mundra</td>
          <td><strong>3 – 4 Days</strong></td>
          <td>Fresh Vegetables, Onions, Groundnuts</td>
          <td>CIF / CFR / FOB</td>
        </tr>
        <tr>
          <td><strong>Felixstowe / London Gateway (UK)</strong></td>
          <td>Nhava Sheva (JNPT)</td>
          <td><strong>18 – 22 Days</strong></td>
          <td>Grapes, Pomegranates, Rice, Spices</td>
          <td>CIF / CFR</td>
        </tr>
        <tr>
          <td><strong>Rotterdam / Hamburg (Europe)</strong></td>
          <td>Nhava Sheva (JNPT)</td>
          <td><strong>18 – 22 Days</strong></td>
          <td>Garwa Onions, Spices, Cumin, Botanicals</td>
          <td>CIF / CFR</td>
        </tr>
        <tr>
          <td><strong>Port Klang / Singapore</strong></td>
          <td>Chennai / Nhava Sheva</td>
          <td><strong>6 – 8 Days</strong></td>
          <td>Pollachi Coconuts, Onions, Chillies, Rice</td>
          <td>CIF / CFR / FOB</td>
        </tr>
        <tr>
          <td><strong>Mombasa / Dar es Salaam (East Africa)</strong></td>
          <td>Nhava Sheva (JNPT)</td>
          <td><strong>10 – 12 Days</strong></td>
          <td>Wheat, Non-Basmati Rice, Sugar, Spices</td>
          <td>CIF / CFR</td>
        </tr>
      </tbody>
    </table>
  </div>

  ${renderFooter(3)}
</div>
`;

// PAGE 4: TABLE OF CONTENTS & COMMODITY DIRECTORY
html += `
<div class="page editorial-page">
  <div class="crop-mark crop-tl"></div><div class="crop-mark crop-tr"></div>
  <div class="crop-mark crop-bl"></div><div class="crop-mark crop-br"></div>

  ${renderHeader('Commodity Directory', 4)}

  <div style="flex: 1;">
    <h2 class="ed-section-title">Directory Index: 49 Core Export Commodities</h2>
    <div class="ed-lead">
      <span class="drop-cap">C</span>omprehensive alphabetical and category cross-index referencing international Harmonized System (HS) classifications, trade specifications, and catalogue page numbers across our core agricultural commodity lines:
    </div>

    <div class="toc-grid">
      <!-- Category 1 -->
      <div class="toc-category-box">
        <div class="toc-cat-header">
          <span class="toc-cat-title">1. Fresh Vegetables</span>
          <span class="toc-page-badge">Pages 05 – 10</span>
        </div>
        <ul class="toc-items-list">
          <li><span>Fresh Red Onion (Nashik Garwa & Pol)</span> <span class="code">HS 07031010</span></li>
          <li><span>Fresh White Onion (Export Grade)</span> <span class="code">HS 07031010</span></li>
          <li><span>Fresh Pink & Bangalore Rose Onion</span> <span class="code">HS 07031010</span></li>
          <li><span>Fresh Green Chilli (G4 & Teja)</span> <span class="code">HS 07096010</span></li>
          <li><span>Fresh Tomato (Hybrid Long-Life)</span> <span class="code">HS 07020000</span></li>
          <li><span>Fresh Potato (Kufri Jyoti / Pukhraj)</span> <span class="code">HS 07019000</span></li>
          <li><span>Dehydrated Onion & Garlic (Flakes/Powder)</span> <span class="code">HS 07122000</span></li>
          <li><span>Fresh Okra (Lady Finger Tender Pods)</span> <span class="code">HS 07099990</span></li>
          <li><span>Fresh Drumsticks (Moringa PKM-1 Pods)</span> <span class="code">HS 07099990</span></li>
          <li><span>Fresh Garlic (White Bold & Pink)</span> <span class="code">HS 07032000</span></li>
          <li><span>Fresh Cluster Beans (Guar Pods)</span> <span class="code">HS 07089000</span></li>
          <li><span>Assorted Export Vegetables (Gourds & Brinjal)</span> <span class="code">HS 07099990</span></li>
        </ul>
      </div>

      <!-- Category 2 -->
      <div class="toc-category-box">
        <div class="toc-cat-header">
          <span class="toc-cat-title">2. Fresh Fruits</span>
          <span class="toc-page-badge">Pages 11 – 15</span>
        </div>
        <ul class="toc-items-list">
          <li><span>Mature Brown Coconut (Pollachi Semi-Husked)</span> <span class="code">HS 08011200</span></li>
          <li><span>Cavendish G9 Bananas (Grand Naine)</span> <span class="code">HS 08039010</span></li>
          <li><span>Nashik Seedless Table Grapes (Thompson)</span> <span class="code">HS 08061000</span></li>
          <li><span>Fresh Bhagwa Pomegranate (Ruby Arils)</span> <span class="code">HS 08109010</span></li>
          <li><span>Alphonso Mango (Ratnagiri & Devgad GI)</span> <span class="code">HS 08045020</span></li>
          <li><span>Kesar & Banganapalli Mango</span> <span class="code">HS 08045020</span></li>
          <li><span>Fresh Indian Lemon & Kagzi Lime</span> <span class="code">HS 08055000</span></li>
          <li><span>Nagpur Mandarin & Kinnow Oranges</span> <span class="code">HS 08051000</span></li>
          <li><span>Seedless Tamarind & Processed Pulp</span> <span class="code">HS 08109020</span></li>
        </ul>
      </div>

      <!-- Category 3 -->
      <div class="toc-category-box">
        <div class="toc-cat-header">
          <span class="toc-cat-title">3. Spices & Herbs</span>
          <span class="toc-page-badge">Pages 16 – 22</span>
        </div>
        <ul class="toc-items-list">
          <li><span>Machine-Cleaned Cumin Seeds (Jeera)</span> <span class="code">HS 09093129</span></li>
          <li><span>Turmeric Finger & High-Curcumin Powder</span> <span class="code">HS 09103020</span></li>
          <li><span>Dried Red Chilli (Teja S17, S4 & Byadgi)</span> <span class="code">HS 09042110</span></li>
          <li><span>Coriander Seeds (Eagle & Badami Dhania)</span> <span class="code">HS 09092190</span></li>
          <li><span>Tellicherry & Malabar Black Pepper</span> <span class="code">HS 09041130</span></li>
          <li><span>Idukki Green Cardamom (8mm+ Bold)</span> <span class="code">HS 09083120</span></li>
          <li><span>Fenugreek Seeds (Methi) & Kasuri Methi</span> <span class="code">HS 09109912</span></li>
          <li><span>Fresh & Dried Ginger (Cochin Sonth)</span> <span class="code">HS 09101110</span></li>
          <li><span>Green Peppercorns (Fresh & Brined)</span> <span class="code">HS 09041110</span></li>
          <li><span>Fresh & Dehydrated Curry Leaves</span> <span class="code">HS 09109990</span></li>
          <li><span>Ground & Custom Blended Indian Masalas</span> <span class="code">HS 09109100</span></li>
          <li><span>Indian Tea (Assam CTC, Darjeeling & Nilgiri)</span> <span class="code">HS 09024020</span></li>
          <li><span>Indian Green Coffee Beans (Arabica & Robusta)</span> <span class="code">HS 09011111</span></li>
        </ul>
      </div>

      <!-- Category 4 & 5 -->
      <div class="toc-category-box">
        <div class="toc-cat-header">
          <span class="toc-cat-title">4. Grains, Pulses & Dry Fruits</span>
          <span class="toc-page-badge">Pages 22 – 29</span>
        </div>
        <ul class="toc-items-list">
          <li><span>1121 & 1509 XXL Basmati Rice (Steam / Sella)</span> <span class="code">HS 10063020</span></li>
          <li><span>Non-Basmati Long Grain Rice (IR64, Sona Masoori)</span> <span class="code">HS 10063010</span></li>
          <li><span>Milling & Durum Wheat (Sharbati & Lokwan)</span> <span class="code">HS 10019910</span></li>
          <li><span>Non-GMO Yellow Maize (Corn Feed & Food Grade)</span> <span class="code">HS 10059000</span></li>
          <li><span>Kabuli Chickpeas (42–44 / 75–80 Count) & Desi Chana</span> <span class="code">HS 07132010</span></li>
          <li><span>Export Grade Peanuts / Groundnuts (Bold & Java)</span> <span class="code">HS 12024210</span></li>
          <li><span>Indian Split Pulses & Dals (Toor, Moong, Urad, Masoor)</span> <span class="code">HS 07139010</span></li>
          <li><span>Non-GMO Soyabean Seeds & De-Oiled Cake (DOC)</span> <span class="code">HS 12019000</span></li>
          <li><span>Mustard Seeds (Black & Yellow) & Rapeseed Meal</span> <span class="code">HS 12075090</span></li>
          <li><span>Refined Cane Sugar ICUMSA 45 & Brown Raw Sugar</span> <span class="code">HS 17019990</span></li>
          <li><span>Kolhapur Natural Jaggery (Cubes, Blocks & Powder)</span> <span class="code">HS 17011310</span></li>
          <li><span>Guar Gum Powder (E412) & Fast Hydrating Splits</span> <span class="code">HS 13023230</span></li>
          <li><span>Composted Organic Cow Dung Bio-Fertilizer</span> <span class="code">HS 31010099</span></li>
          <li><span>Indian White Cashew Kernels (W180, W240, W320)</span> <span class="code">HS 08013220</span></li>
          <li><span>Mithila Phool Makhana (Fox Nuts 5+ Suta)</span> <span class="code">HS 08109090</span></li>
        </ul>
      </div>
    </div>
  </div>

  ${renderFooter(4)}
</div>
`;

// PAGES 5 TO 29: PRODUCT DOSSIER SPREADS
let currentPageNum = 5;
for (let i = 0; i < productPages.length; i++) {
  const [p1, p2] = productPages[i];
  const catName = p1.categoryName;

  html += `
  <div class="page">
    <div class="crop-mark crop-tl"></div><div class="crop-mark crop-tr"></div>
    <div class="crop-mark crop-bl"></div><div class="crop-mark crop-br"></div>

    ${renderHeader(catName, currentPageNum)}
    <div class="page-content-two-products">
      ${renderProductBlock(p1)}
      ${p2 ? renderProductBlock(p2) : ''}
    </div>
    ${renderFooter(currentPageNum)}
  </div>
  `;
  currentPageNum++;
}

// PAGE 30: SPECIALTY PORTFOLIO (HERBS, AYURVEDIC BOTANICALS, MILLETS & OILSEEDS)
html += `
<div class="page editorial-page">
  <div class="crop-mark crop-tl"></div><div class="crop-mark crop-tr"></div>
  <div class="crop-mark crop-bl"></div><div class="crop-mark crop-br"></div>

  ${renderHeader('Specialty Portfolio', 30)}

  <div style="flex: 1;">
    <h2 class="ed-section-title">Specialty Botanicals, Ayurvedic Herbs & Ancient Millets</h2>
    <div class="ed-lead">
      <span class="drop-cap">B</span>eyond our 49 core institutional commodities, Sheshaan Global maintains verified farm-gate collection networks for high-potency Indian medicinal botanicals, therapeutic seeds, and nutrient-dense ancient superfoods certified for export:
    </div>

    <div class="botanicals-visual-grid">
      ${specialtyItems.map(item => `
        <div class="botanical-visual-card">
          <img src="${item.img}" alt="${item.name}" class="botanical-thumb" />
          <div class="botanical-info">
            <strong>${item.name}</strong>
            <span class="b-sci">${item.sci}</span>
            <span class="b-spec">${item.spec}</span>
          </div>
        </div>
      `).join('')}
    </div>

    <div style="margin-top: 3.5mm; background: #fdfbf7; border: 1px solid #e2ddd5; border-radius: 4px; padding: 2.5mm 3.5mm; display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm;">
      <div>
        <strong style="color: #08214d; font-family: 'Cinzel', Georgia, serif; font-size: 7.2pt; display: block;">Pearl Millet (Bajra) & Sorghum (Jowar)</strong>
        <p style="margin: 1.5px 0 0; font-size: 6.2pt; color: #475569;">Machine-cleaned bold green grains for bakery, gluten-free flour milling, and high-energy animal nutrition.</p>
      </div>
      <div>
        <strong style="color: #08214d; font-family: 'Cinzel', Georgia, serif; font-size: 7.2pt; display: block;">Finger Millet (Ragi) & Amaranth (Rajgira)</strong>
        <p style="margin: 1.5px 0 0; font-size: 6.2pt; color: #475569;">Ancient Indian superfoods rich in dietary calcium, iron, and complete protein with Sortex 99.5% purity.</p>
      </div>
      <div>
        <strong style="color: #08214d; font-family: 'Cinzel', Georgia, serif; font-size: 7.2pt; display: block;">Chitra Rajma, Moong & Urad Dals</strong>
        <p style="margin: 1.5px 0 0; font-size: 6.2pt; color: #475569;">Machine-polished shiny pulses packed in 25kg / 50kg export bags with zero live infestation.</p>
      </div>
    </div>
  </div>

  ${renderFooter(30)}
</div>
`;

// PAGE 31: MASTER REEFER COLD CHAIN & CONTAINER LOADING MATRIX
html += `
<div class="page editorial-page">
  <div class="crop-mark crop-tl"></div><div class="crop-mark crop-tr"></div>
  <div class="crop-mark crop-bl"></div><div class="crop-mark crop-br"></div>

  ${renderHeader('Cold-Chain Reference Matrix', 31)}

  <div style="flex: 1;">
    <h2 class="ed-section-title">Master Reefer Telemetry & Container Stowage Matrix</h2>
    <div class="ed-lead">
      <span class="drop-cap">A</span>uthoritative stowage benchmarks for ocean freight forwarders, cargo underwriters, and port terminal planners detailing precise setpoint carriage temperatures, ventilation exchanges, and payload weight capacities:
    </div>

    <table class="formal-table" style="font-size: 6.2pt;">
      <thead>
        <tr>
          <th>Export Commodity</th>
          <th>HS Code</th>
          <th>Export Packaging Standard</th>
          <th>Reefer Temp Setpoint</th>
          <th>Relative Humidity</th>
          <th>Fresh Air Vent</th>
          <th>40ft HC Reefer FCL</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Fresh Red Onion (Nashik)</strong></td><td>07031010</td><td>25kg Ventilated Leno Mesh Bags</td><td><strong>+1.0°C to +3.0°C</strong></td><td>65–70%</td><td>15 CBM/h</td><td><strong>29.0 MT (1,160 bags)</strong></td></tr>
        <tr><td><strong>Fresh White Onion</strong></td><td>07031010</td><td>25kg White Mesh / 10kg Boxes</td><td><strong>+1.0°C to +2.0°C</strong></td><td>65–70%</td><td>15 CBM/h</td><td><strong>28.5 MT (1,140 bags)</strong></td></tr>
        <tr><td><strong>Fresh Green Chilli (G4)</strong></td><td>07096010</td><td>4kg / 5kg Corrugated CFB Boxes</td><td><strong>+7.0°C to +8.0°C</strong></td><td>90–95%</td><td>15 CBM/h</td><td><strong>12.5 MT (2,500 boxes)</strong></td></tr>
        <tr><td><strong>Fresh Tomato (Hybrid)</strong></td><td>07020000</td><td>6kg / 10kg Plastic Crates/CFB</td><td><strong>+10.0°C to +12.0°C</strong></td><td>85–90%</td><td>20 CBM/h</td><td><strong>18.0 MT (1,800 boxes)</strong></td></tr>
        <tr><td><strong>Fresh Potato (Kufri)</strong></td><td>07019000</td><td>25kg / 50kg Jute / Mesh Bags</td><td><strong>+8.0°C to +10.0°C</strong></td><td>85–90%</td><td>20 CBM/h</td><td><strong>28.0 MT (1,120 bags)</strong></td></tr>
        <tr><td><strong>Fresh Garlic (White Bold)</strong></td><td>07032000</td><td>10kg / 20kg Mesh Bags / Cartons</td><td><strong>0.0°C to +1.0°C</strong></td><td>65–70%</td><td>15 CBM/h</td><td><strong>26.0 MT (1,300 bags)</strong></td></tr>
        <tr><td><strong>Fresh Okra (Lady Finger)</strong></td><td>07099990</td><td>5kg Corrugated Air-Hole Boxes</td><td><strong>+8.0°C to +10.0°C</strong></td><td>90–95%</td><td>20 CBM/h</td><td><strong>11.5 MT (2,300 boxes)</strong></td></tr>
        <tr><td><strong>Fresh Drumsticks (Moringa)</strong></td><td>07099990</td><td>5kg / 10kg CFB Cartons</td><td><strong>+8.0°C to +10.0°C</strong></td><td>85–90%</td><td>15 CBM/h</td><td><strong>12.0 MT (1,200 boxes)</strong></td></tr>
        <tr><td><strong>Mature Brown Coconut</strong></td><td>08011200</td><td>13kg / 14kg Mesh Bags (25 nuts)</td><td><strong>+11.0°C to +13.0°C</strong></td><td>75–80%</td><td>25 CBM/h</td><td><strong>28.0 MT (2,000 bags)</strong></td></tr>
        <tr><td><strong>Cavendish G9 Bananas</strong></td><td>08039010</td><td>13.5kg / 18.14kg Telescopic Boxes</td><td><strong>+13.2°C to +13.5°C</strong></td><td>90–95%</td><td>25 CBM/h</td><td><strong>21.0 MT (1,540 boxes)</strong></td></tr>
        <tr><td><strong>Nashik Table Grapes</strong></td><td>08061000</td><td>4.5kg / 5.0kg Punnet Cartons</td><td><strong>-0.5°C to 0.0°C</strong></td><td>90–95%</td><td>Closed / Gas Pad</td><td><strong>14.5 MT (2,900 boxes)</strong></td></tr>
        <tr><td><strong>Bhagwa Pomegranate</strong></td><td>08109010</td><td>3.5kg / 5.0kg Ventilated Cartons</td><td><strong>+5.0°C to +6.0°C</strong></td><td>90–95%</td><td>15 CBM/h</td><td><strong>16.0 MT (3,200 boxes)</strong></td></tr>
        <tr><td><strong>Alphonso Mango</strong></td><td>08045020</td><td>3.0kg / 4.0kg (12 pieces/box)</td><td><strong>+12.0°C to +13.0°C</strong></td><td>85–90%</td><td>20 CBM/h</td><td><strong>Air Freight / Reefer 12 MT</strong></td></tr>
        <tr><td><strong>Nagpur Mandarin Oranges</strong></td><td>08051000</td><td>10kg / 15kg Corrugated Cartons</td><td><strong>+5.0°C to +7.0°C</strong></td><td>85–90%</td><td>20 CBM/h</td><td><strong>24.0 MT (1,600 boxes)</strong></td></tr>
        <tr><td><strong>1121 & 1509 Basmati Rice</strong></td><td>10063020</td><td>25kg / 50kg Non-Woven BOPP Bags</td><td><strong>Dry Cargo</strong></td><td>Ambient < 65%</td><td>Natural Dry Box</td><td><strong>26.0 MT (20ft Dry FCL)</strong></td></tr>
        <tr><td><strong>Non-Basmati Rice (IR64)</strong></td><td>10063010</td><td>25kg / 50kg PP Woven Bags</td><td><strong>Dry Cargo</strong></td><td>Ambient < 65%</td><td>Natural Dry Box</td><td><strong>27.0 MT (20ft Dry FCL)</strong></td></tr>
        <tr><td><strong>Milling Wheat (Sharbati)</strong></td><td>10019910</td><td>50kg PP Bags / Bulk in Container</td><td><strong>Dry Cargo</strong></td><td>Ambient < 65%</td><td>Natural Dry Box</td><td><strong>27.5 MT (20ft Dry FCL)</strong></td></tr>
        <tr><td><strong>Non-GMO Yellow Maize</strong></td><td>10059000</td><td>50kg PP Woven Bags</td><td><strong>Dry Cargo</strong></td><td>Ambient < 65%</td><td>Natural Dry Box</td><td><strong>27.0 MT (20ft Dry FCL)</strong></td></tr>
        <tr><td><strong>Machine Cleaned Cumin</strong></td><td>09093129</td><td>25kg / 50kg Paper / PP Bags</td><td><strong>Dry Cargo</strong></td><td>Ambient < 65%</td><td>Natural Dry Box</td><td><strong>18.0 MT (20ft Dry FCL)</strong></td></tr>
        <tr><td><strong>Dried Red Chilli (Teja/S4)</strong></td><td>09042110</td><td>10kg / 25kg Jute Gunny Bags</td><td><strong>+8.0°C / Dry Box</strong></td><td>60–65%</td><td>Natural / Reefer</td><td><strong>14.0 MT (40ft HC Box)</strong></td></tr>
        <tr><td><strong>Turmeric Finger (Sangli)</strong></td><td>09103020</td><td>25kg / 50kg Jute Bags</td><td><strong>Dry Cargo</strong></td><td>Ambient < 65%</td><td>Natural Dry Box</td><td><strong>27.0 MT (40ft HC Dry)</strong></td></tr>
        <tr><td><strong>Kabuli Chickpeas (Chana)</strong></td><td>07132010</td><td>25kg / 50kg Multi-Wall Bags</td><td><strong>Dry Cargo</strong></td><td>Ambient < 65%</td><td>Natural Dry Box</td><td><strong>24.0 MT (20ft Dry FCL)</strong></td></tr>
        <tr><td><strong>Bold & Java Groundnuts</strong></td><td>12024210</td><td>25kg / 50kg Jute Bags</td><td><strong>Dry Cargo</strong></td><td>Ambient < 65%</td><td>Natural Dry Box</td><td><strong>19.0 MT (20ft Dry FCL)</strong></td></tr>
        <tr><td><strong>Cashew Kernels (W320)</strong></td><td>08013220</td><td>11.34kg x 2 Tins (50 lbs / Box)</td><td><strong>Dry Vacuum</strong></td><td>Ambient < 60%</td><td>Nitrogen Flushed</td><td><strong>16.5 MT (20ft FCL)</strong></td></tr>
        <tr><td><strong>Phool Makhana (Fox Nuts)</strong></td><td>08109090</td><td>8kg / 10kg Bulky Poly Bags</td><td><strong>Dry Cargo</strong></td><td>Ambient < 60%</td><td>Volumetric Dry Box</td><td><strong>3.5 MT (40ft HC Box)</strong></td></tr>
      </tbody>
    </table>

    <div style="margin-top: 3mm; background: #fdfbf7; border: 1px solid #e2ddd5; border-left: 3.5px solid #08214d; border-radius: 4px; padding: 2.5mm 3.5mm;">
      <strong style="color: #08214d; font-family: 'Cinzel', Georgia, serif; font-size: 7.2pt; display: block; margin-bottom: 1px;">Cold-Chain Best Practice & Data Logger Protocol</strong>
      <p style="margin: 0; font-size: 6.2pt; color: #475569; line-height: 1.35;">
        All perishable consignments undergo forced-air pre-cooling to target core temperature prior to container stuffing. Dual electronic data loggers (Sensitech / TempTale) are positioned at the bottom-air delivery point and near the rear door to capture uncompromised temperature traces throughout ocean voyage. Reefer container plugs are monitored 24/7 at terminal gates and on-board ocean vessels.
      </p>
    </div>
  </div>

  ${renderFooter(31)}
</div>
`;

// PAGE 32: 12-MONTH HARVEST & EXPORT SEASONALITY RADAR
html += `
<div class="page editorial-page">
  <div class="crop-mark crop-tl"></div><div class="crop-mark crop-tr"></div>
  <div class="crop-mark crop-bl"></div><div class="crop-mark crop-br"></div>

  ${renderHeader('Harvest & Seasonality Radar', 32)}

  <div style="flex: 1;">
    <h2 class="ed-section-title">12-Month Indian Crop Harvest & Export Radar</h2>
    <div class="ed-lead">
      <span class="drop-cap">S</span>trategic annual procurement roadmap mapping peak harvest arrivals, buffer warehouse availability, and lean market windows across India's premier agro-climatic zones (Rabi, Kharif, and Zaid crop seasons):
    </div>

    <table class="formal-table" style="font-size: 6.5pt; text-align: center;">
      <thead>
        <tr>
          <th style="text-align: left; width: 24%;">Export Commodity</th>
          <th>Jan</th><th>Feb</th><th>Mar</th><th>Apr</th><th>May</th><th>Jun</th>
          <th>Jul</th><th>Aug</th><th>Sep</th><th>Oct</th><th>Nov</th><th>Dec</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="text-align: left;"><strong>Nashik Red Onion (Garwa/Pol)</strong></td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Avail</td><td>Avail</td><td>Lean</td><td>Lean</td><td>Kharif</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td></tr>
        <tr><td style="text-align: left;"><strong>Fresh Green Chilli (G4)</strong></td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Avail</td><td>Avail</td><td>Lean</td><td>Lean</td><td>Avail</td><td>Avail</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td></tr>
        <tr><td style="text-align: left;"><strong>Mature Coconut (Pollachi)</strong></td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td></tr>
        <tr><td style="text-align: left;"><strong>Cavendish G9 Bananas</strong></td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Avail</td><td>Avail</td><td>Avail</td><td>Avail</td><td>Avail</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td></tr>
        <tr><td style="text-align: left;"><strong>Nashik Table Grapes</strong></td><td>Start</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>End</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Early</td></tr>
        <tr><td style="text-align: left;"><strong>Bhagwa Pomegranate</strong></td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Avail</td><td>Avail</td><td>Lean</td><td>Lean</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td></tr>
        <tr><td style="text-align: left;"><strong>Alphonso & Kesar Mango</strong></td><td>-</td><td>-</td><td>Early</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>End</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
        <tr><td style="text-align: left;"><strong>Fresh Garlic (White/Pink)</strong></td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Avail</td><td>Avail</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Arrival</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td></tr>
        <tr><td style="text-align: left;"><strong>Fresh Drumsticks (Moringa)</strong></td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Avail</td><td>Avail</td><td>Avail</td><td>Avail</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td></tr>
        <tr><td style="text-align: left;"><strong>Unjha Cumin (Jeera)</strong></td><td>Arrival</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td></tr>
        <tr><td style="text-align: left;"><strong>Sangli/Salem Turmeric</strong></td><td>-</td><td>Arrival</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td></tr>
        <tr><td style="text-align: left;"><strong>Guntur Teja Red Chilli</strong></td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Arrival</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td></tr>
        <tr><td style="text-align: left;"><strong>Coriander Seeds (Dhania)</strong></td><td>-</td><td>Arrival</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>-</td></tr>
        <tr><td style="text-align: left;"><strong>Tellicherry Black Pepper</strong></td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Arrival</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td></tr>
        <tr><td style="text-align: left;"><strong>1121 & 1509 Basmati Rice</strong></td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Arrival</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td></tr>
        <tr><td style="text-align: left;"><strong>Milling & Durum Wheat</strong></td><td>-</td><td>-</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>-</td></tr>
        <tr><td style="text-align: left;"><strong>Yellow Maize (Corn)</strong></td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Avail</td><td>Avail</td><td>Lean</td><td>Lean</td><td>Arrival</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td></tr>
        <tr><td style="text-align: left;"><strong>Kabuli Chickpeas (Chana)</strong></td><td>-</td><td>Arrival</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>-</td></tr>
        <tr><td style="text-align: left;"><strong>Peanuts (Bold & Java)</strong></td><td>Stock</td><td>Stock</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Arrival</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td></tr>
        <tr><td style="text-align: left;"><strong>Cashew Kernels (Goa/KL)</strong></td><td>-</td><td>-</td><td>Arrival</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td></tr>
        <tr><td style="text-align: left;"><strong>Phool Makhana (Bihar)</strong></td><td>Stock</td><td>Stock</td><td>Stock</td><td>Stock</td><td>-</td><td>-</td><td>Arrival</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td style="background:#ecfdf5;color:#047857;font-weight:800;">PEAK</td><td>Stock</td><td>Stock</td></tr>
      </tbody>
    </table>

    <div style="margin-top: 3mm; background: #ecfdf5; border: 1px solid #a7f3d0; border-left: 3.5px solid #059669; border-radius: 4px; padding: 2.5mm 3.5mm;">
      <strong style="color: #065f46; font-family: 'Cinzel', Georgia, serif; font-size: 7.2pt; display: block; margin-bottom: 1px;">Procurement Hedging & Forward Booking Advisory</strong>
      <p style="margin: 0; font-size: 6.2pt; color: #047857; line-height: 1.35;">
        Importers targeting maximum price stabilization are encouraged to execute seasonal forward volume agreements during peak harvest arrivals (February–May for Rabi crops; October–December for Kharif crops). Sheshaan Global offers indexed farm-gate hedging, warehouse storage under bonded control, and staged monthly FCL deliveries.
      </p>
    </div>
  </div>

  ${renderFooter(32)}
</div>
`;

// PAGE 33: OFFICIAL THANK YOU & EXECUTIVE CONTACTS (USER ARTWORK)
html += `
<div class="page-full-image">
  <img src="${THANKYOU_IMAGE_BASE64}" alt="Sheshaan Global - Thank You" />
</div>
</body>
</html>
`;

fs.writeFileSync(OUTPUT_HTML, html, 'utf8');
console.log(`Generated self-contained HTML at ${OUTPUT_HTML} (${(fs.statSync(OUTPUT_HTML).size / 1024).toFixed(1)} KB)`);

// Render to PDF using Microsoft Edge Headless CLI
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
console.log('Rendering Master Catalogue PDF via Microsoft Edge Headless...');

const cmd = `"${EDGE_PATH}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${OUTPUT_PDF_PUBLIC}" "${OUTPUT_HTML}"`;
execSync(cmd, { stdio: 'inherit' });

// Copy to output distribution path as well
fs.copyFileSync(OUTPUT_PDF_PUBLIC, OUTPUT_PDF_DIST);

const pdfSizeMB = (fs.statSync(OUTPUT_PDF_PUBLIC).size / (1024 * 1024)).toFixed(2);
console.log(`Master Catalogue PDF generated successfully!`);
console.log(`  Public Path: ${OUTPUT_PDF_PUBLIC} (${pdfSizeMB} MB)`);
console.log(`  Distribution: ${OUTPUT_PDF_DIST} (${pdfSizeMB} MB)`);
