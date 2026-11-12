import { Dex, toID } from '../../../sim/dex';
import { PRNG, type PRNGSeed } from '../../../sim/prng';

const USELESS_MOVES = new Set([
	'splash', 'celebrate', 'holdhands', 'happyhour', 'teleport', 'assist',
	'metronome', 'snore', 'dreameater', 'nightmare', 'focuspunch', 'lastresort',
	'synchronoise', 'recycle', 'belch', 'bide', 'frustration', 'spitup', 'swallow',
	'stockpile', 'captivate', 'confide', 'growl', 'tailwhip', 'leer', 'stringshot',
	'harden', 'withdraw', 'defensecurl', 'meditate', 'sharpen', 'howl', 'mudsport', 'watersport',
	'selfdestruct', 'explosion', 'mistyexplosion', 'finalgambit', 'healingwish', 'lunardance', 'memento',
]);

const RECOVERY_MOVES = new Set([
	'recover', 'roost', 'softboiled', 'slackoff', 'synthesis', 'moonlight', 'morningsun',
	'milkdrink', 'shoreup', 'strengthsap', 'wish', 'rest',
]);

const SETUP_MOVES = new Set([
	'swordsdance', 'nastyplot', 'calmmind', 'dragondance', 'quiverdance', 'bulkup',
	'shellsmash', 'coil', 'agility', 'rockpolish', 'shiftgear', 'bellydrum', 'tailglow',
	'victorydance', 'tidyup', 'curse', 'irondefense', 'workup',
]);

const HAZARD_MOVES = new Set(['stealthrock', 'spikes', 'toxicspikes', 'stickyweb']);

const UTILITY_STATUS_MOVES = new Set([
	'willowisp', 'thunderwave', 'toxic', 'spore', 'sleeppowder', 'hypnosis', 'yawn',
	'glare', 'nuzzle', 'leechseed', 'taunt', 'encore', 'defog', 'haze', 'whirlwind',
	'roar', 'trickroom', 'tailwind', 'substitute', 'protect', 'detect', 'partingshot',
]);

const PIVOT_MOVES = new Set(['uturn', 'voltswitch', 'flipturn', 'partingshot', 'chillyreception', 'shedtail']);

const Z_EXCLUSIVE_SPECIES = new Set([
	'cefireon', 'maidible', 'zippectre', 'soundow', 'cherrilier', 'royaleon',
	'gourmaus', 'halcombate', 'serdupla', 'zanghoul', 'freyjynx', 'fobeto',
	'constellar', 'luvourne', 'marolier', 'sudrasil', 'auretosk',
]);

interface PoolEntry {
	species: Species;
	megaItems: string[];
	customMegaItems: string[];
	learnset: string[];
	zTier: 'new' | 'type_or_mega' | 'rebalanced' | 'vanilla';
}

export class RandomPokemonZTeams {
	readonly dex: ModdedDex;
	readonly format: Format;
	prng: PRNG;

	private static cachedPool: PoolEntry[] | null = null;

	constructor(format: Format | string, prng: PRNG | PRNGSeed | null = null) {
		this.format = Dex.formats.get(format);
		this.dex = Dex.forFormat(this.format);
		this.prng = PRNG.get(prng);
	}

	setSeed(prng?: PRNG | PRNGSeed) {
		this.prng = PRNG.get(prng);
	}

	getTeam(options: PlayerOptions | null = null): PokemonSet[] {
		if (options?.seed) this.setSeed(options.seed);
		const isDoubles = this.format.gameType === 'doubles' || this.format.gameType === 'freeforall';
		const maxTeamSize = this.format.ruleTable?.maxTeamSize || 6;

		const pool = this.getPool();
		const newPool = pool.filter(e => e.zTier === 'new');
		const customMegaPool = pool.filter(e => e.customMegaItems.length > 0);
		const typeOrMegaPool = pool.filter(e => e.zTier === 'type_or_mega');
		const rebalancedPool = pool.filter(e => e.zTier === 'rebalanced');

		const usedBaseSpecies = new Set<string>();
		const typeCounts: Record<string, number> = Object.create(null);
		const team: PokemonSet[] = [];
		let megaCount = 0;

		const tryAddFrom = (subPool: PoolEntry[], forceCustomMega: boolean, ignoreTypeCap = false): boolean => {
			if (!subPool.length) return false;
			for (let tries = 0; tries < 40; tries++) {
				const entry = this.prng.sample(subPool);
				const sp = entry.species;
				if (usedBaseSpecies.has(sp.baseSpecies)) continue;
				if (!ignoreTypeCap && sp.types.some(t => (typeCounts[t] || 0) >= 2)) continue;

				let chosenMegaItem = '';
				if (megaCount < 1 && entry.megaItems.length > 0) {
					if (forceCustomMega && entry.customMegaItems.length > 0) {
						chosenMegaItem = this.pickPreferredMegaItem(entry.customMegaItems);
					} else if (this.prng.randomChance(2, 3)) {
						chosenMegaItem = this.pickPreferredMegaItem(
							entry.customMegaItems.length ? entry.customMegaItems : entry.megaItems
						);
					}
				}

				const set = this.buildSet(entry, chosenMegaItem, isDoubles);
				if (!set || set.moves.length === 0) continue;

				if (chosenMegaItem) megaCount++;
				usedBaseSpecies.add(sp.baseSpecies);
				for (const t of sp.types) typeCounts[t] = (typeCounts[t] || 0) + 1;
				team.push(set);
				return true;
			}
			return false;
		};

		// 1. Guarantee 1 custom Z Mega whenever possible (slot before shuffle)
		if (team.length < maxTeamSize) {
			tryAddFrom(customMegaPool, true);
		}
		// 2. Guarantee 1-2 brand new Pokemon Z species (the 17 exclusives)
		const targetNew = this.prng.randomChance(2, 3) ? 2 : 1;
		for (let i = 0; i < targetNew && team.length < maxTeamSize; i++) {
			tryAddFrom(newPool, false);
		}
		// 3. Fill next slots prioritizing Z type changes / custom Megas and rebalanced mons
		let attempts = 0;
		while (team.length < maxTeamSize && attempts < 300) {
			attempts++;
			const roll = this.prng.random(100);
			let targetPool = typeOrMegaPool;
			if (roll < 15) targetPool = newPool;
			else if (roll < 62) targetPool = typeOrMegaPool;
			else if (roll < 90) targetPool = rebalancedPool;
			else targetPool = pool;

			tryAddFrom(targetPool, false, attempts > 200);
		}

		this.prng.shuffle(team);
		return team;
	}

	private getPool(): PoolEntry[] {
		if (RandomPokemonZTeams.cachedPool) return RandomPokemonZTeams.cachedPool;

		const baseDex = Dex.mod('gen9');
		const megaItemsByBase = new Map<string, string[]>();
		const customMegaItemsByBase = new Map<string, string[]>();
		for (const item of this.dex.items.all()) {
			if (!item.exists || !item.megaStone || item.isNonstandard === 'CAP') continue;
			for (const [baseName, megaName] of Object.entries(item.megaStone)) {
				const id = toID(baseName);
				const list = megaItemsByBase.get(id) || [];
				if (!list.includes(item.name)) list.push(item.name);
				megaItemsByBase.set(id, list);

				const b9Mega = baseDex.species.get(megaName);
				const isNewZMega = !b9Mega.exists || b9Mega.isNonstandard === 'Future' || item.name.endsWith('ita Z');
				if (isNewZMega) {
					const clist = customMegaItemsByBase.get(id) || [];
					if (!clist.includes(item.name)) clist.push(item.name);
					customMegaItemsByBase.set(id, clist);
				}
			}
		}

		const pool: PoolEntry[] = [];
		for (const sp of this.dex.species.all()) {
			if (!sp.exists) continue;
			if (['CAP', 'Custom', 'LGPE'].includes(sp.isNonstandard || '')) continue;
			if (sp.battleOnly || sp.isMega || sp.isPrimal || sp.isCosmeticForme || sp.forme === 'Gmax') continue;
			if (sp.baseSpecies === 'Pikachu' && sp.forme) continue;
			if (sp.evos.length > 0) continue;

			const learnset = this.collectLearnset(sp);
			if (learnset.length < 4 && sp.id !== 'ditto') continue;

			const megaItems = megaItemsByBase.get(sp.id) || [];
			const customMegaItems = customMegaItemsByBase.get(sp.id) || [];
			const b9 = baseDex.species.get(sp.id);

			let zTier: PoolEntry['zTier'] = 'vanilla';
			if (Z_EXCLUSIVE_SPECIES.has(sp.id)) {
				zTier = 'new';
			} else if (
				customMegaItems.length > 0 ||
				sp.forme === 'Kalos' || sp.id === 'pikachukalosz' || sp.id === 'rotomz' ||
				JSON.stringify(sp.types) !== JSON.stringify(b9.types)
			) {
				zTier = 'type_or_mega';
			} else if (
				!b9.exists || ['Custom', 'Future'].includes(b9.isNonstandard || '')
			) {
				zTier = 'new';
			} else if (
				JSON.stringify(sp.abilities) !== JSON.stringify(b9.abilities) ||
				JSON.stringify(sp.baseStats) !== JSON.stringify(b9.baseStats)
			) {
				zTier = 'rebalanced';
			}

			pool.push({
				species: sp,
				megaItems,
				customMegaItems,
				learnset,
				zTier,
			});
		}

		RandomPokemonZTeams.cachedPool = pool;
		return pool;
	}

	private collectLearnset(sp: Species): string[] {
		const seen = new Set<string>();
		let cur: Species | null = sp;
		let guard = 0;
		while (cur && cur.exists && guard++ < 6) {
			const ls = this.dex.species.getLearnsetData(cur.id).learnset;
			if (ls) {
				for (const moveid of Object.keys(ls)) seen.add(moveid);
			}
			cur = cur.prevo ? this.dex.species.get(cur.prevo) : null;
		}
		if (!seen.size && sp.baseSpecies !== sp.name) {
			const baseLs = this.dex.species.getLearnsetData(toID(sp.baseSpecies)).learnset;
			if (baseLs) {
				for (const moveid of Object.keys(baseLs)) seen.add(moveid);
			}
		}
		return [...seen];
	}

	private pickPreferredMegaItem(items: string[]): string {
		// Prefer custom Pokemon Z Mega Stones (ending in 'ita Z' or 'ita') when multiple exist
		const zStones = items.filter(name => name.endsWith('ita Z'));
		if (zStones.length) return this.prng.sample(zStones);
		const esStones = items.filter(name => name.endsWith('ita') || name.endsWith('yta'));
		if (esStones.length && this.prng.randomChance(3, 4)) return this.prng.sample(esStones);
		return this.prng.sample(items);
	}

	private buildSet(entry: PoolEntry, megaItemName: string, isDoubles: boolean): PokemonSet | null {
		const sp = entry.species;

		if (sp.id === 'ditto') {
			return {
				name: sp.name,
				species: sp.name,
				item: 'Choice Scarf',
				ability: Object.values(sp.abilities).includes('Imposter') ? 'Imposter' : sp.abilities['0'],
				moves: ['Transform'],
				nature: 'Timid',
				evs: { hp: 252, atk: 0, def: 4, spa: 0, spd: 0, spe: 252 },
				ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
				level: 82,
				gender: '',
			};
		}

		let targetSpecies = sp;
		if (megaItemName) {
			const itemObj = this.dex.items.get(megaItemName);
			const megaName = itemObj.megaStone?.[sp.name] || itemObj.megaStone?.[sp.baseSpecies];
			if (megaName) {
				const megaSp = this.dex.species.get(megaName);
				if (megaSp.exists) targetSpecies = megaSp;
			}
		}

		const stats = targetSpecies.baseStats;
		const types = new Set(targetSpecies.types);
		const effectiveBst = targetSpecies.bst;
		const level = Math.max(70, Math.min(96, Math.round(81 + (535 - effectiveBst) / 13)));

		// Choose ability from base species (Mega evolves into Mega ability anyway)
		const ability = this.pickAbility(sp);

		// Determine offensive bias
		const atk = stats.atk;
		const spa = stats.spa;
		const preferPhys = atk > spa * 1.15;
		const preferSpec = spa > atk * 1.15;
		const isBulky = (stats.hp + stats.def + stats.spd) >= 285 && Math.max(atk, spa) <= 105;

		// Score candidate moves
		const candidates: { move: Move; score: number; role: 'stab' | 'cov' | 'status' }[] = [];
		for (const moveid of entry.learnset) {
			const m = this.dex.moves.get(moveid);
			if (!m.exists || m.isZ || m.isMax || USELESS_MOVES.has(m.id)) continue;
			if (!isDoubles && m.id === 'helpinghand') continue;

			if (m.category === 'Status') {
				let score = 0;
				if (SETUP_MOVES.has(m.id)) {
					const physSetup = ['swordsdance', 'dragondance', 'bulkup', 'coil', 'bellydrum', 'shiftgear', 'victorydance', 'curse'].includes(m.id);
					const specSetup = ['nastyplot', 'calmmind', 'quiverdance', 'tailglow'].includes(m.id);
					if ((physSetup && preferSpec) || (specSetup && preferPhys)) score = 0;
					else score = isBulky ? 55 : 85;
				}
				else if (RECOVERY_MOVES.has(m.id)) score = isBulky ? 95 : 65;
				else if (HAZARD_MOVES.has(m.id)) score = isDoubles ? 40 : 80;
				else if (m.id === 'protect' || m.id === 'detect') score = isDoubles ? 95 : 25;
				else if (UTILITY_STATUS_MOVES.has(m.id)) score = 70;
				if (score > 0) candidates.push({ move: m, score: score + this.prng.random(15), role: 'status' });
				continue;
			}

			if (m.flags.charge || m.flags.recharge || m.self?.volatileStatus === 'mustrecharge') continue;

			let bp = m.basePower;
			if (!bp && (m.id === 'return' || m.id === 'lowkick' || m.id === 'grassknot' || m.id === 'heatcrash')) bp = 85;
			if (!bp && m.id === 'seismictoss' || m.id === 'nightshade') bp = 75;
			if (bp < 40 && m.priority <= 0 && !m.multihit) continue;
			if (m.multihit) {
				const hits = Array.isArray(m.multihit) ? 3.1 : m.multihit;
				bp = bp * hits;
			}
			if (m.id === 'fakeout') bp = isDoubles ? 90 : 55;
			if (m.id === 'facade' && (ability === 'Guts' || ability === 'Toxic Boost')) bp = 140;

			// Category fit
			let catMult = 1;
			if (m.id !== 'bodypress') {
				if (preferPhys && m.category === 'Special') catMult = 0.4;
				if (preferSpec && m.category === 'Physical') catMult = 0.4;
			}

			// STAB + spread/doubles adjustment
			const isStab = types.has(m.type) ||
				(ability === 'Pixilate' || ability === 'Aerilate' || ability === 'Refrigerate' || ability === 'Galvanize' || ability === 'Voz de Valquiria' || ability === 'Piel Helada' || ability === 'Piel Eléctrica' || ability === 'Piel Herbácea' || ability === 'Piel Tétrica' || ability === 'Piel Dragontina') && m.type === 'Normal';
			const stabMult = isStab ? 1.5 : 1.0;

			let accMult = typeof m.accuracy === 'number' ? Math.min(1, m.accuracy / 100) : 1.03;
			if (ability === 'No Guard' || ability === 'Compound Eyes') accMult = 1.05;

			let utilityBonus = 0;
			if (m.priority > 0) utilityBonus += 18;
			if (PIVOT_MOVES.has(m.id)) utilityBonus += isDoubles ? 12 : 20;
			if (isDoubles && (m.target === 'allAdjacentFoes' || m.target === 'allAdjacent')) utilityBonus += 18;
			if (m.flags.charge || m.self?.volatileStatus === 'mustrecharge') utilityBonus -= 45;
			if (m.id === 'steelbeam' || m.id === 'mindblown' || m.id === 'chloroblast') utilityBonus -= 40;

			const score = bp * catMult * stabMult * accMult + utilityBonus + this.prng.random(12);
			if (score >= 45) {
				candidates.push({ move: m, score, role: isStab ? 'stab' : 'cov' });
			}
		}

		if (candidates.length === 0) return null;
		candidates.sort((a, b) => b.score - a.score);

		const chosen: Move[] = [];
		const chosenIds = new Set<string>();
		const coveredStabTypes = new Set<string>();
		const coveredDamagingTypes = new Set<string>();
		let statusCount = 0;
		let hasRecovery = false;

		const addMove = (m: Move, isStatus: boolean) => {
			if (chosenIds.has(m.id) || chosen.length >= 4) return false;
			if (RECOVERY_MOVES.has(m.id)) {
				if (hasRecovery) return false;
				hasRecovery = true;
			}
			chosen.push(m);
			chosenIds.add(m.id);
			if (isStatus) {
				statusCount++;
			} else {
				coveredDamagingTypes.add(m.type);
				if (types.has(m.type)) coveredStabTypes.add(m.type);
			}
			return true;
		};

		// 1. Best STAB for each of the species' types
		for (const c of candidates) {
			if (c.role === 'stab' && !coveredStabTypes.has(c.move.type)) {
				addMove(c.move, false);
			}
		}

		// 2. At most 1 high-value status move (or 2 if bulky support)
		const maxStatus = isBulky ? 2 : 1;
		for (const c of candidates) {
			if (statusCount >= maxStatus) break;
			if (c.role === 'status') addMove(c.move, true);
		}

		// 3. Best distinct-type coverage attacks
		for (const c of candidates) {
			if (chosen.length >= 4) break;
			if (c.role !== 'status' && !coveredDamagingTypes.has(c.move.type)) {
				addMove(c.move, false);
			}
		}

		// 4. Fill remaining slots with top remaining moves
		for (const c of candidates) {
			if (chosen.length >= 4) break;
			if (c.role === 'status' && statusCount >= maxStatus) continue;
			addMove(c.move, c.role === 'status');
		}

		// Determine item
		const allAttacking = chosen.every(m => m.category !== 'Status');
		const hasTrickRoom = chosenIds.has('trickroom');
		let item = megaItemName;
		if (!item) {
			item = this.pickItem(sp, targetSpecies, chosen, allAttacking, isBulky, isDoubles, ability);
		}

		// Nature + EVs + IVs
		const physCount = chosen.filter(m => m.category === 'Physical').length;
		const specCount = chosen.filter(m => m.category === 'Special').length;
		const usesPhys = physCount > 0;
		const usesSpec = specCount > 0;

		let nature = 'Serious';
		let evs: StatsTable = { hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85 };
		const ivs: StatsTable = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };

		if (hasTrickRoom || (stats.spe <= 45 && isBulky)) {
			ivs.spe = 0;
			evs = { hp: 252, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
			if (usesPhys && !usesSpec) { nature = 'Brave'; evs.atk = 252; evs.spd = 4; }
			else if (usesSpec && !usesPhys) { nature = 'Quiet'; evs.spa = 252; evs.spd = 4; }
			else { nature = 'Relaxed'; evs.def = 128; evs.spd = 128; }
		} else if (usesPhys && !usesSpec) {
			evs = { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 };
			nature = stats.spe >= 80 ? 'Jolly' : 'Adamant';
		} else if (usesSpec && !usesPhys) {
			evs = { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 };
			nature = stats.spe >= 80 ? 'Timid' : 'Modest';
		} else if (usesPhys && usesSpec) {
			evs = { hp: 0, atk: 128, def: 0, spa: 128, spd: 0, spe: 252 };
			nature = stats.def >= stats.spd ? 'Naive' : 'Hasty';
		}

		if (isBulky && !item.startsWith('Choice')) {
			evs = { hp: 252, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
			if (usesPhys && !usesSpec) { evs.atk = 252; evs.def = 4; nature = 'Adamant'; }
			else if (usesSpec && !usesPhys) { evs.spa = 252; evs.spd = 4; nature = 'Modest'; }
			else { evs.def = 128; evs.spd = 128; nature = 'Bold'; }
		}

		return {
			name: sp.name,
			species: sp.name,
			item,
			ability,
			moves: chosen.map(m => m.name),
			nature,
			evs,
			ivs,
			level,
			gender: sp.gender || '',
		};
	}

	private pickAbility(sp: Species): string {
		const list = Object.values(sp.abilities).filter(Boolean);
		if (list.length <= 1) return list[0] || '';
		// Filter out detrimental abilities if better ones exist
		const good = list.filter(a => !['Truant', 'Slow Start', 'Defeatist', 'Klutz', 'Stall'].includes(a));
		const pool = good.length ? good : list;
		return this.prng.sample(pool);
	}

	private pickItem(
		sp: Species, target: Species, moves: Move[], allAttacking: boolean,
		isBulky: boolean, isDoubles: boolean, ability: string
	): string {
		const moveIds = new Set(moves.map(m => m.id));
		if (moveIds.has('acrobatics')) return '';
		if (ability === 'Guts') return 'Flame Orb';
		if (ability === 'Toxic Boost' || ability === 'Poison Heal') return 'Toxic Orb';

		const rocksWeak = this.dex.getEffectiveness('Rock', target) > 0;
		if (rocksWeak && !isDoubles && this.prng.randomChance(2, 3)) return 'Heavy-Duty Boots';

		if (allAttacking && !isBulky) {
			if (target.baseStats.spe >= 70 && target.baseStats.spe <= 108 && this.prng.randomChance(1, 3)) {
				return 'Choice Scarf';
			}
			if (isBulky || (target.baseStats.hp + target.baseStats.spd >= 180 && this.prng.randomChance(1, 2))) {
				return 'Assault Vest';
			}
			const physOnly = moves.every(m => m.category === 'Physical');
			const specOnly = moves.every(m => m.category === 'Special');
			if (physOnly && this.prng.randomChance(1, 3)) return 'Choice Band';
			if (specOnly && this.prng.randomChance(1, 3)) return 'Choice Specs';
			return 'Life Orb';
		}

		if (isBulky) return isDoubles ? 'Sitrus Berry' : 'Leftovers';
		if (moveIds.has('swordsdance') || moveIds.has('nastyplot') || moveIds.has('quiverdance') || moveIds.has('dragondance') || moveIds.has('shellsmash')) {
			if (target.baseStats.def + target.baseStats.spd <= 150) return 'Focus Sash';
			return isDoubles ? 'Sitrus Berry' : 'Life Orb';
		}
		return isDoubles ? 'Sitrus Berry' : 'Leftovers';
	}
}

export default RandomPokemonZTeams;
