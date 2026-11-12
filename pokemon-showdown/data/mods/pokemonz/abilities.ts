export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	coleoptero: {
		num: -1001,
		name: 'Coleóptero',
		desc: 'Convierte los movimientos de tipo Normal en Bicho y los potencia un 20%.',
		shortDesc: 'Normal-type moves become Bug-type and have 1.2x power.',
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = ['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball'];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Bug';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		rating: 4,
	},
	pielhelada: {
		num: -1002,
		name: 'Piel Helada',
		desc: 'Convierte los movimientos de tipo Normal en Hielo y los potencia un 20%.',
		shortDesc: 'Normal-type moves become Ice-type and have 1.2x power.',
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = ['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball'];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Ice';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		rating: 4,
	},
	podersabio: {
		num: -1003,
		name: 'Poder Sabio',
		desc: 'Aumenta el Atq. Esp. un 50% pero solo permite usar un movimiento.',
		shortDesc: "User's Sp. Atk is 1.5x, but it can only select the first move it executes.",
		onStart(pokemon) {
			pokemon.abilityState.choiceLock = '';
		},
		onBeforeMove(pokemon, target, move) {
			if (move.isZOrMaxPowered || move.id === 'struggle') return;
			if (pokemon.abilityState.choiceLock && pokemon.abilityState.choiceLock !== move.id) {
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug('Disabled by Poder Sabio');
				this.add('-fail', pokemon);
				return false;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.abilityState.choiceLock || move.isZOrMaxPowered || move.id === 'struggle') return;
			pokemon.abilityState.choiceLock = move.id;
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			if (!pokemon.abilityState.choiceLock) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== pokemon.abilityState.choiceLock) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
		onEnd(pokemon) {
			pokemon.abilityState.choiceLock = '';
		},
		rating: 4.5,
	},
	pielmaldita: {
		num: -1004,
		name: 'Piel Tétrica',
		desc: 'Convierte los movimientos de tipo Normal en Fantasma y los potencia un 20%.',
		shortDesc: 'Normal-type moves become Ghost-type and have 1.2x power.',
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = ['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball'];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Ghost';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		rating: 4,
	},
	pielelectrica: {
		num: -1005,
		name: 'Piel Eléctrica',
		desc: 'Convierte los movimientos de tipo Normal en Eléctrico y los potencia un 20%.',
		shortDesc: 'Normal-type moves become Electric-type and have 1.2x power.',
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = ['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball'];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Electric';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		rating: 4,
	},
	espanto: {
		num: -1006,
		name: 'Espanto',
		desc: 'Espanta al rival y reduce su Atq. Especial al entrar al combate.',
		shortDesc: 'On switch-in, this Pokemon lowers the Sp. Atk of opponents by 1 stage.',
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Espanto', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({ spa: -1 }, target, pokemon, null, true);
				}
			}
		},
		rating: 3.5,
	},
	cabezahielo: {
		num: -1007,
		name: 'Iceberg',
		desc: 'No recibe daño de retroceso.',
		shortDesc: 'This Pokemon does not take recoil damage besides Struggle/Life Orb/crash damage.',
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error('Battle.activeMove is null');
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		rating: 3,
	},
	inflamable: {
		num: -1008,
		name: 'Inflamable',
		desc: 'Aumenta el daño de los ataques de tipo Fuego un 50%.',
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Fire-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') return this.chainModify(1.5);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			if (move.type === 'Fire') return this.chainModify(1.5);
		},
		rating: 4.5,
	},
	sobrecarga: {
		num: -1009,
		name: 'Sobrecarga',
		desc: 'Sube el poder Eléctrico un 50% si tiene 1/3 o menos de PS.',
		shortDesc: 'At 1/3 or less of its max HP, this Pokemon boosts its Electric-type attacks by 1.5x.',
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric' && attacker.hp <= attacker.maxhp / 3) return this.chainModify(1.5);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			if (move.type === 'Electric' && attacker.hp <= attacker.maxhp / 3) return this.chainModify(1.5);
		},
		rating: 2,
	},
	albinismo: {
		num: -1010,
		name: 'Albino',
		desc: 'Aumenta el daño de los ataques de tipo Hielo un 50%.',
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using an Ice-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice') return this.chainModify(1.5);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			if (move.type === 'Ice') return this.chainModify(1.5);
		},
		rating: 4.5,
	},
	pielherbacea: {
		num: -1011,
		name: 'Piel Herbácea',
		desc: 'Convierte movs. Normal en Planta y los potencia un 20%.',
		shortDesc: 'Normal-type moves become Grass-type and have 1.2x power.',
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = ['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball'];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Grass';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		rating: 4,
	},
	floracion: {
		num: -1012,
		name: 'Floración',
		desc: 'Aumenta un 50% el daño de los ataques de tipo Planta.',
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Grass-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass') return this.chainModify(1.5);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			if (move.type === 'Grass') return this.chainModify(1.5);
		},
		rating: 4.5,
	},
	cortante: {
		num: -1013,
		name: 'Cortante',
		desc: 'Potencia los ataques de corte un 50%.',
		shortDesc: 'This Pokemon slicing moves have their power multiplied by 1.5.',
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) return this.chainModify(1.5);
		},
		rating: 3.5,
	},
	contraguardia: {
		num: -1014,
		name: 'Contraguardia',
		desc: 'Contrarresta ataques voladores devolviendo el golpe al agresor.',
		shortDesc: 'Deals 1/4 max HP damage to attackers using Flying-type moves against this Pokemon.',
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Flying' && source !== target) {
				this.damage(source.baseMaxhp / 4, source, target);
			}
		},
		rating: 2.5,
	},
	pedante: {
		num: -1015,
		name: 'Pedante',
		desc: 'Aumenta un 50% el daño de los ataques de tipo Psíquico.',
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Psychic-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Psychic') return this.chainModify(1.5);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			if (move.type === 'Psychic') return this.chainModify(1.5);
		},
		rating: 4.5,
	},
	penetrante: {
		num: -1016,
		name: 'Penetrante',
		desc: 'Los movs. punzantes de alta probabilidad de crítico tienen un 30% de hacer retroceder.',
		shortDesc: 'High critical-hit ratio moves have a 30% chance to flinch the target.',
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.critRatio && move.critRatio >= 2 && move.category !== 'Status') {
				if (!move.secondaries) move.secondaries = [];
				move.secondaries.push({ chance: 30, volatileStatus: 'flinch' });
			}
		},
		rating: 3,
	},
	emergencyexit: {
		inherit: true,
		desc: 'Cambia a otro Pokémon tras usar un mov. de tipo Bicho.',
		shortDesc: 'This Pokemon switches out after using a Bug-type move.',
		onAfterMoveSecondarySelf(source, target, move) {
			if (move.type === 'Bug' && source.hp && this.canSwitch(source.side)) {
				source.switchFlag = true;
			}
		},
	},
	podergelido: {
		num: -1017,
		name: 'Poder Gélido',
		desc: 'Aumenta el poder de hielo y la velocidad un 50% en clima nevado.',
		shortDesc: 'In Snow, Ice-type moves deal 1.5x damage and Speed is 1.5x.',
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (this.field.isWeather(['hail', 'snowscape']) && move.type === 'Ice') return this.chainModify(1.5);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			if (this.field.isWeather(['hail', 'snowscape']) && move.type === 'Ice') return this.chainModify(1.5);
		},
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather(['hail', 'snowscape'])) return this.chainModify(1.5);
		},
		rating: 3.5,
	},
	alquimiavil: {
		num: -1018,
		name: 'Alquimia Vil',
		desc: 'El envenenamiento daña el doble al final de cada turno.',
		shortDesc: 'While this Pokemon is active, opponents take double damage from poison.',
		onAnyDamage(damage, target, source, effect) {
			if (target !== this.effectState.target && (effect.id === 'psn' || effect.id === 'tox')) {
				return damage * 2;
			}
		},
		rating: 3,
	},
	realeza: {
		num: -1019,
		name: 'Realeza',
		desc: 'Recibe bonus de daño del 50% atacando con todos los tipos y no solo con su tipo original.',
		shortDesc: 'This Pokemon gets STAB (1.5x) on moves of all types.',
		onModifySTAB(stab, source, target, move) {
			if (stab < 1.5) return 1.5;
		},
		rating: 4.5,
	},
	silvano: {
		num: -1020,
		name: 'Silvano',
		desc: 'Aumenta todo daño y la Velocidad un 30% en Campo de Hierba.',
		shortDesc: 'In Grassy Terrain, deals 1.3x damage and Speed is 1.3x.',
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker) {
			if (attacker.isGrounded() && this.field.isTerrain('grassyterrain')) return this.chainModify(1.3);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker) {
			if (attacker.isGrounded() && this.field.isTerrain('grassyterrain')) return this.chainModify(1.3);
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.isGrounded() && this.field.isTerrain('grassyterrain')) return this.chainModify(1.3);
		},
		rating: 3.5,
	},
	despiertallama: {
		num: -1021,
		name: 'Despiertallama',
		desc: 'Se potencia el Ataque Especial si recibe ataques de Fuego, y es inmune a ellos.',
		shortDesc: 'This Pokemon is immune to Fire-type moves and raises Sp. Atk by 1 stage when hit by one.',
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({ spa: 1 })) {
					this.add('-immune', target, '[from] ability: Despiertallama');
				}
				return null;
			}
		},
		rating: 3.5,
	},
	camorrista: {
		num: -1022,
		name: 'Camorrista',
		desc: 'Sube el poder de las patadas un 20%.',
		shortDesc: "This Pokemon's kicking moves have their power multiplied by 1.2.",
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			const kickMoves = ['blazekick', 'doublekick', 'highjumpkick', 'jumpkick', 'lowkick', 'lowsweep', 'megakick', 'rollingkick', 'stomp', 'thunderouskick', 'tripleaxel', 'triplekick', 'tropkick', 'axekick', 'triplepatada'];
			if (kickMoves.includes(move.id) || move.id.includes('kick')) {
				return this.chainModify(1.2);
			}
		},
		rating: 3,
	},
	acometida: {
		num: -1023,
		name: 'Acometida',
		desc: 'En el 1º turno que salga a combatir, tendrá un 50% extra de Velocidad y un 20% extra de Ataque.',
		shortDesc: 'On its first turn on the field, Speed is 1.5x and Attack is 1.2x.',
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.activeTurns === 0) return this.chainModify(1.2);
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.activeTurns === 0) return this.chainModify(1.5);
		},
		rating: 4,
	},
	tintineo: {
		num: -1024,
		name: 'Tintineo',
		desc: 'Repica una campana para curar los estados del equipo cuando sale a combatir. Además, los movs. de sonido pasan a ser psíquicos y aumentan un 20% su potencia.',
		shortDesc: 'On switch-in, cures party status. Sound moves become Psychic-type with 1.2x power.',
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Tintineo');
			for (const ally of pokemon.side.pokemon) {
				if (ally.status) ally.cureStatus();
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move) {
			if (move.flags['sound'] && move.category !== 'Status') {
				move.type = 'Psychic';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		rating: 4.5,
	},
	transportarroca: {
		num: -1025,
		name: 'Transportarroca',
		desc: 'Da bonificación de daño a los movimientos de tipo Roca.',
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Rock-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Rock') return this.chainModify(1.5);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			if (move.type === 'Rock') return this.chainModify(1.5);
		},
		rating: 4,
	},
	capatoxica: {
		num: -1026,
		name: 'Capa Tóxica',
		desc: 'Suelta púas tóxicas al ser golpeado.',
		shortDesc: 'Sets Toxic Spikes on the opposing side when hit by a physical attack.',
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				target.side.foe.addSideCondition('toxicspikes');
			}
		},
		rating: 3.5,
	},
	dinamo: {
		num: -1027,
		name: 'Dinamo',
		desc: 'Se carga de energía eléctrica al ser golpeado.',
		shortDesc: 'This Pokemon gains the Charge effect when hit by an attack.',
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			target.addVolatile('charge');
		},
		rating: 3,
	},
	cuerpohorneado: {
		num: -1028,
		name: 'Cuerpo Horneado',
		desc: 'El fuego le sube mucho la Defensa en lugar de hacerle daño.',
		shortDesc: 'Immune to Fire-type moves and raises Defense by 2 stages when hit by one.',
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({ def: 2 })) {
					this.add('-immune', target, '[from] ability: Cuerpo Horneado');
				}
				return null;
			}
		},
		rating: 3.5,
	},
	corazaira: {
		num: -1029,
		name: 'Coraza Ira',
		desc: 'Cuando pierde la mitad de salud, reduce sus defensas a cambio de aumentar su ataque y velocidad.',
		shortDesc: 'At 1/2 or less HP for the first time, lowers Def/SpD by 1 and raises Atk/SpA/Spe by 1.',
		onDamage(damage, target, source, effect) {
			if (effect.effectType === 'Move' && !effect.multihit && !(effect.hasSheerForce && source.hasAbility('sheerforce'))) {
				this.effectState.checkedAngerShell = false;
			} else {
				this.effectState.checkedAngerShell = true;
			}
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedAngerShell = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({ atk: 1, spa: 1, spe: 1, def: -1, spd: -1 }, target, target);
			}
		},
		rating: 3,
	},
	termoconversion: {
		num: -1030,
		name: 'Termoconversión',
		desc: 'No puede ser quemado. Si es alcanzado por fuego, se sube el Ataque.',
		shortDesc: "This Pokemon's Attack is raised by 1 stage when hit by a Fire move; cannot be burned.",
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire') this.boost({ atk: 1 });
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Termoconversión');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Termoconversión');
			}
			return false;
		},
		rating: 2.5,
	},
	relampagueo: {
		num: -1031,
		name: 'Relampagueo',
		desc: 'Tiene un 30% de paralizar al enemigo con ataques de contacto.',
		shortDesc: "This Pokemon's contact moves have a 30% chance to paralyze the target.",
		onModifyMove(move) {
			if (move.flags['contact'] && move.category !== 'Status') {
				if (!move.secondaries) move.secondaries = [];
				move.secondaries.push({ chance: 30, status: 'par' });
			}
		},
		rating: 3.5,
	},
	formailusoria: {
		num: -1032,
		name: 'Forma Ilusoria',
		desc: 'Cuando su salud está por encima de 2/3 adquiere una forma que aumenta su Evasión.',
		shortDesc: 'While above 2/3 max HP, incoming moves have 0.8x accuracy.',
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy, target, source) {
			if (typeof accuracy === 'number' && target.hp > (target.maxhp * 2) / 3) {
				return this.chainModify([3277, 4096]);
			}
		},
		rating: 3,
	},
	olorporcino: {
		num: -1033,
		name: 'Olor Porcino',
		desc: 'Reduce mucho la Evasión del enemigo si te ataca con movimientos de contacto.',
		shortDesc: 'Lowers the attacker evasion by 2 stages when hit by a contact move.',
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				this.boost({ evasion: -2 }, source, target);
			}
		},
		rating: 1.5,
	},
	presenciarara: {
		num: -1034,
		name: 'Presencia Rara',
		desc: 'Aplica Espacio Raro cuando sale a combatir.',
		shortDesc: 'On switch-in, sets Trick Room.',
		onStart(pokemon) {
			if (!this.field.getPseudoWeather('trickroom')) {
				this.field.addPseudoWeather('trickroom', pokemon);
			}
		},
		rating: 4.5,
	},
	brutalidad: {
		num: -1035,
		name: 'Brutalidad',
		desc: 'Los ataques de contacto pueden aplicar Hemorragia.',
		shortDesc: "This Pokemon's contact moves have a 30% chance to inflict Hemorragia.",
		onModifyMove(move) {
			if (move.flags['contact'] && move.category !== 'Status') {
				if (!move.secondaries) move.secondaries = [];
				move.secondaries.push({ chance: 30, volatileStatus: 'bleeding' });
			}
		},
		rating: 3.5,
	},
	vozvalquiria: {
		num: -1036,
		name: 'Voz de Valquiria',
		desc: 'Los movs. de sonido pasan a ser de tipo Hielo y tienen un 30% de hacer retroceder.',
		shortDesc: 'Sound moves become Ice-type and have a 30% chance to flinch.',
		onModifyTypePriority: -1,
		onModifyType(move) {
			if (move.flags['sound'] && move.category !== 'Status') {
				move.type = 'Ice';
			}
		},
		onModifyMove(move) {
			if (move.flags['sound'] && move.category !== 'Status') {
				if (!move.secondaries) move.secondaries = [];
				move.secondaries.push({ chance: 30, volatileStatus: 'flinch' });
			}
		},
		rating: 3.5,
	},
	granpesadilla: {
		num: -1037,
		name: 'Gran Pesadilla',
		desc: 'Reduce 1/4 los PS del rival que esté dormido al final de cada turno.',
		shortDesc: 'Causes sleeping foes to lose 1/4 of their max HP at the end of each turn.',
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'slp' || target.hasAbility('comatose')) {
					this.damage(target.baseMaxhp / 4, target, pokemon);
				}
			}
		},
		rating: 3,
	},
	auradorada: {
		num: -1038,
		name: 'Aura Dorada',
		desc: 'Aumenta el daño de tipo Eléctrico un 30%.',
		shortDesc: 'While this Pokemon is active, Electric-type moves deal 1.33x damage.',
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Aura Dorada');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Electric') return;
			if (!move.auraBooster?.hasAbility('Aura Dorada')) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify([move.hasAuraBreak ? 3072 : 5448, 4096]);
		},
		rating: 3.5,
	},
	babamagica: {
		num: -1039,
		name: 'Baba Mágica',
		desc: 'Cuando le golpean por contacto, reduce 1 nivel la Defensa Especial del enemigo.',
		shortDesc: 'Pokemon making contact with this Pokemon have their Sp. Def lowered by 1 stage.',
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				this.boost({ spd: -1 }, source, target, null, true);
			}
		},
		rating: 2.5,
	},
	canasto: {
		num: -1040,
		name: 'Canasto',
		desc: 'Reduce el daño recibido de Volador y Roca un 2/3.',
		shortDesc: 'Reduces damage taken from Flying and Rock-type moves by 2/3.',
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Flying' || move.type === 'Rock') {
				return this.chainModify([1365, 4096]);
			}
		},
		rating: 3,
	},
	pieldragontina: {
		num: -1041,
		name: 'Piel Dragontina',
		desc: 'Cambia y potencia movs de tipo Normal en Dragón.',
		shortDesc: 'Normal-type moves become Dragon-type and have 1.2x power.',
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = ['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball'];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Dragon';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		rating: 4,
	},
};
