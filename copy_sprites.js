'use strict';
/**
 * copy_sprites.js
 * Normalizes and copies Pokemon Z graphics from .\Graphics\ to .\pokemon-showdown-client\play.pokemonshowdown.com\sprites\
 * and links .\pokemon-showdown-client\sprites\ to it.
 */
const fs = require('fs');
const path = require('path');

const ROOT = 'c:/Users/Anri/showdown-pokemonz';
const PBS_DIR = path.join(ROOT, 'PBS');
const BATTLERS_SRC = path.join(ROOT, 'Graphics/Battlers');
const ICONS_SRC = path.join(ROOT, 'Graphics/Icons');
const SPRITES_DEST = path.join(ROOT, 'pokemon-showdown-client/play.pokemonshowdown.com/sprites');
const CLIENT_SPRITES_LINK = path.join(ROOT, 'pokemon-showdown-client/sprites');

const PS_DEX_PATH = path.join(ROOT, 'pokemon-showdown/dist/sim/dex');
const { Dex } = require(PS_DEX_PATH);
const psDex = Dex.forFormat('gen9ou');

const DIRS = ['gen5', 'gen5-back', 'gen5-shiny', 'gen5-back-shiny', 'dex', 'itemicons'];
for (const d of DIRS) {
  fs.mkdirSync(path.join(SPRITES_DEST, d), { recursive: true });
}

function toID(text) {
  return ('' + text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function normalizeSpriteName(base, suffix) {
  const cleanBase = toID(base);
  if (!suffix) return cleanBase;
  const cleanSuffix = toID(suffix);
  return cleanSuffix ? `${cleanBase}-${cleanSuffix}` : cleanBase;
}

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') inQuote = !inQuote;
    else if (ch === ',' && !inQuote) { result.push(current); current = ''; }
    else current += ch;
  }
  result.push(current);
  return result;
}

// 1. Build number -> species mapping from PBS/pokemon.txt
const numToInternal = new Map();
const pokeRaw = fs.readFileSync(path.join(PBS_DIR, 'pokemon.txt'), 'utf8').replace(/^\uFEFF/, '');
let curNum = null;
for (const line of pokeRaw.split(/\r?\n/)) {
  const t = line.trim();
  const m = t.match(/^\[(\d+)\]$/);
  if (m) {
    curNum = parseInt(m[1], 10);
  } else if (curNum !== null && t.startsWith('InternalName=')) {
    const internal = t.split('=')[1].trim();
    numToInternal.set(curNum, internal);
    curNum = null;
  }
}

// Special form index overrides for Essentials numbering (Alola/Galar/Hisui/Mega)
const FORM_OVERRIDES = {
  '3_1': 'venusaur-mega',
  '6_1': 'charizard-megax',
  '6_2': 'charizard-megay',
  '9_1': 'blastoise-mega',
  '12_1': 'butterfree-mega',
  '15_1': 'beedrill-mega',
  '18_1': 'pidgeot-mega',
  '19_1': 'rattata-alola',
  '20_1': 'raticate-alola',
  '25_1': 'pikachu-mega',
  '26_1': 'raichu-alola',
  '26_2': 'raichu-mega',
  '27_1': 'sandshrew-alola',
  '28_1': 'sandslash-alola',
  '37_1': 'vulpix-alola',
  '38_1': 'ninetales-alola',
  '50_1': 'diglett-alola',
  '51_1': 'dugtrio-alola',
  '52_1': 'meowth-alola',
  '52_2': 'meowth-galar',
  '53_1': 'persian-alola',
  '58_1': 'growlithe-hisui',
  '59_1': 'arcanine-hisui',
  '65_1': 'alakazam-mega',
  '68_1': 'machamp-mega',
  '74_1': 'geodude-alola',
  '75_1': 'graveler-alola',
  '76_1': 'golem-alola',
  '77_1': 'ponyta-galar',
  '78_1': 'rapidash-galar',
  '79_1': 'slowpoke-galar',
  '80_1': 'slowbro-mega',
  '80_2': 'slowbro-galar',
  '83_1': 'farfetchd-galar',
  '88_1': 'grimer-alola',
  '89_1': 'muk-alola',
  '94_1': 'gengar-mega',
  '99_1': 'kingler-mega',
  '100_1': 'voltorb-hisui',
  '101_1': 'electrode-hisui',
  '103_1': 'exeggutor-alola',
  '105_1': 'marowak-alola',
  '110_1': 'weezing-galar',
  '115_1': 'kangaskhan-mega',
  '122_1': 'mrmime-galar',
  '127_1': 'pinsir-mega',
  '130_1': 'gyarados-mega',
  '131_1': 'lapras-mega',
  '142_1': 'aerodactyl-mega',
  '144_1': 'articuno-galar',
  '145_1': 'zapdos-galar',
  '146_1': 'moltres-galar',
  '150_1': 'mewtwo-megax',
  '150_2': 'mewtwo-megay',
  '157_1': 'typhlosion-hisui',
  '181_1': 'ampharos-mega',
  '199_1': 'slowking-galar',
  '208_1': 'steelix-mega',
  '211_1': 'qwilfish-hisui',
  '212_1': 'scizor-mega',
  '214_1': 'heracross-mega',
  '215_1': 'sneasel-hisui',
  '222_1': 'corsola-galar',
  '229_1': 'houndoom-mega',
  '244_1': 'entei-mega',
  '248_1': 'tyranitar-mega',
  '254_1': 'sceptile-mega',
  '257_1': 'blaziken-mega',
  '260_1': 'swampert-mega',
  '263_1': 'zigzagoon-galar',
  '264_1': 'linoone-galar',
  '282_1': 'gardevoir-mega',
  '302_1': 'sableye-mega',
  '303_1': 'mawile-mega',
  '306_1': 'aggron-mega',
  '308_1': 'medicham-mega',
  '310_1': 'manectric-mega',
  '319_1': 'sharpedo-mega',
  '323_1': 'camerupt-mega',
  '334_1': 'altaria-mega',
  '354_1': 'banette-mega',
  '359_1': 'absol-mega',
  '362_1': 'glalie-mega',
  '373_1': 'salamence-mega',
  '376_1': 'metagross-mega',
  '380_1': 'latias-mega',
  '381_1': 'latios-mega',
  '382_1': 'kyogre-primal',
  '383_1': 'groudon-primal',
  '384_1': 'rayquaza-mega',
  '428_1': 'lopunny-mega',
  '445_1': 'garchomp-mega',
  '448_1': 'lucario-mega',
  '460_1': 'abomasnow-mega',
  '475_1': 'gallade-mega',
  '503_1': 'samurott-hisui',
  '531_1': 'audino-mega',
  '549_1': 'lilligant-hisui',
  '554_1': 'darumaka-galar',
  '555_1': 'darmanitan-galar',
  '562_1': 'yamask-galar',
  '569_1': 'garbodor-mega',
  '570_1': 'zorua-hisui',
  '571_1': 'zoroark-hisui',
  '618_1': 'stunfisk-galar',
  '628_1': 'braviary-hisui',
  '637_1': 'volcarona-mega',
  '658_1': 'greninja-ash',
  '671_1': 'florges-mega',
  '705_1': 'sliggoo-hisui',
  '706_1': 'goodra-hisui',
  '713_1': 'avalugg-hisui',
  '718_1': 'zygarde-10',
  '718_2': 'zygarde-complete',
  '718_3': 'zygarde-mega',
  '719_1': 'diancie-mega',
  '724_1': 'decidueye-hisui',
  '780_1': 'drampa-mega',
  '812_1': 'rillaboom-mega',
  '815_1': 'cinderace-mega',
  '818_1': 'inteleon-mega',
  '823_1': 'corviknight-mega',
  '826_1': 'orbeetle-mega',
  '834_1': 'drednaw-mega',
  '839_1': 'coalossal-mega',
  '841_1': 'flapple-mega',
  '842_1': 'appletun-mega',
  '844_1': 'sandaconda-mega',
  '849_1': 'toxtricity-mega',
  '851_1': 'centiskorch-mega',
  '858_1': 'hatterene-mega',
  '861_1': 'grimmsnarl-mega',
  '869_1': 'alcremie-mega',
  '879_1': 'copperajah-mega',
  '884_1': 'duraludon-mega',
  '1006_1': 'hydrapple-mega',
};

function resolveSpeciesSpriteName(num, formIdx) {
  if (formIdx) {
    const ov = FORM_OVERRIDES[`${num}_${formIdx}`];
    if (ov) return ov;
  }
  const internal = numToInternal.get(num);
  if (!internal) return null;
  let baseId = toID(internal);
  if (baseId === 'nidoranfe') baseId = 'nidoranf';
  if (baseId === 'nidoranma') baseId = 'nidoranm';
  if (!formIdx) return baseId;

  // Fallback to PS otherFormes if available
  const sp = psDex.species.get(baseId);
  if (sp.exists && sp.otherFormes && sp.otherFormes[formIdx - 1]) {
    const f = psDex.species.get(sp.otherFormes[formIdx - 1]);
    if (f.exists && f.spriteid) return f.spriteid;
  }
  return `${baseId}-form${formIdx}`;
}

// 2. Process Graphics/Battlers -> gen5, gen5-back, gen5-shiny, gen5-back-shiny
const counts = { gen5: 0, 'gen5-back': 0, 'gen5-shiny': 0, 'gen5-back-shiny': 0, dex: 0, itemicons: 0, skipped: 0 };

for (const file of fs.readdirSync(BATTLERS_SRC)) {
  if (!file.toLowerCase().endsWith('.png')) continue;
  const srcPath = path.join(BATTLERS_SRC, file);
  const stem = file.slice(0, -4);

  // Match Essentials battler naming: 003, 003b, 003s, 003sb, 003f, 003fb, 003fs, 003fsb, 003_1, 003b_1, etc.
  const m = stem.match(/^(\d+)(f?)(s?)(b?)(?:_(\d+))?$/i);
  if (m) {
    const num = parseInt(m[1], 10);
    const isFemale = !!m[2];
    const isShiny = !!m[3];
    const isBack = !!m[4];
    const formIdx = m[5] ? parseInt(m[5], 10) : 0;

    if (num === 0) {
      // 000.png -> substitute/unknown
      continue;
    }

    let spriteBase = resolveSpeciesSpriteName(num, formIdx);
    if (!spriteBase) { counts.skipped++; continue; }
    if (isFemale) spriteBase += '-f';

    let targetDir = 'gen5';
    if (isShiny && isBack) targetDir = 'gen5-back-shiny';
    else if (isShiny) targetDir = 'gen5-shiny';
    else if (isBack) targetDir = 'gen5-back';

    fs.copyFileSync(srcPath, path.join(SPRITES_DEST, targetDir, `${spriteBase}.png`));
    counts[targetDir]++;
  } else {
    // Named sprites like egg.png, substitute.png, etc.
    const clean = stem.toLowerCase().replace(/[^a-z0-9-]+/g, '');
    if (!clean) { counts.skipped++; continue; }
    fs.copyFileSync(srcPath, path.join(SPRITES_DEST, 'gen5', `${clean}.png`));
    counts.gen5++;
  }
}

// 3. Build item num -> internalName map from PBS/items.txt
const itemsRaw = fs.readFileSync(path.join(PBS_DIR, 'items.txt'), 'utf8').replace(/^\uFEFF/, '');
const itemNumMap = new Map();
let buf = '';
for (const line of itemsRaw.split(/\r?\n/)) {
  buf = buf ? buf + ' ' + line : line;
  if ((buf.match(/"/g) || []).length % 2 === 0) {
    const t = buf.trim();
    buf = '';
    if (!t) continue;
    const cols = parseCsvLine(t);
    if (cols.length >= 2) {
      const idNum = parseInt(cols[0], 10);
      const internal = cols[1].trim();
      if (!isNaN(idNum) && internal) itemNumMap.set(idNum, toID(internal));
    }
  }
}

// 4. Process Graphics/Icons -> dex/ and itemicons/
for (const file of fs.readdirSync(ICONS_SRC)) {
  if (!file.toLowerCase().endsWith('.png')) continue;
  const srcPath = path.join(ICONS_SRC, file);
  const stem = file.slice(0, -4);

  // Pokemon menu icons: icon001.png, icon001s.png, icon006_1.png, icon006s_1.png
  const pm = stem.match(/^icon(\d+)(f?)(s?)(?:_(\d+))?$/i);
  if (pm) {
    const num = parseInt(pm[1], 10);
    const isFemale = !!pm[2];
    const isShiny = !!pm[3];
    const formIdx = pm[4] ? parseInt(pm[4], 10) : 0;
    if (num === 0) continue;
    let spriteBase = resolveSpeciesSpriteName(num, formIdx);
    if (!spriteBase) { counts.skipped++; continue; }
    if (isFemale) spriteBase += '-f';
    if (isShiny) spriteBase += '-shiny';
    fs.copyFileSync(srcPath, path.join(SPRITES_DEST, 'dex', `${spriteBase}.png`));
    counts.dex++;
    continue;
  }

  // Item icons: item567.png -> braviarita.png
  const im = stem.match(/^item(\d+)$/i);
  if (im) {
    const itemNum = parseInt(im[1], 10);
    const itemId = itemNumMap.get(itemNum);
    if (itemId) {
      fs.copyFileSync(srcPath, path.join(SPRITES_DEST, 'itemicons', `${itemId}.png`));
      counts.itemicons++;
    } else {
      fs.copyFileSync(srcPath, path.join(SPRITES_DEST, 'itemicons', `item${itemNum}.png`));
      counts.itemicons++;
    }
    continue;
  }
}

// 5. Ensure pokemon-showdown-client/sprites points to play.pokemonshowdown.com/sprites
try {
  if (!fs.existsSync(CLIENT_SPRITES_LINK)) {
    fs.symlinkSync(SPRITES_DEST, CLIENT_SPRITES_LINK, 'junction');
    console.log('Created directory junction:', CLIENT_SPRITES_LINK, '->', SPRITES_DEST);
  }
} catch (err) {
  console.warn('Could not create junction (non-fatal):', err.message);
}

console.log('Sprite normalization & copy complete:');
console.log(JSON.stringify(counts, null, 2));
