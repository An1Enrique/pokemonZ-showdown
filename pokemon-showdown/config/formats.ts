// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in this folder named: "custom-formats.ts"
*/

export const Formats: import('../sim/dex-formats').FormatList = [
	// Pokemon Z
	///////////////////////////////////////////////////////////////////

	{
		section: "Pokemon Z",
		column: 1,
	},
	{
		name: "[Gen 9] Pokemon Z Random Battle",
		desc: `Equipos aleatorios inteligentes con Pok\u00e9mon Z (especies nuevas, Megas Z, habilidades y movimientos del fangame), nivelados por poder.`,
		mod: 'pokemonz',
		team: 'random',
		ruleset: ['Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Terastal Clause'],
	},
	{
		name: "[Gen 9] Pokemon Z Random Doubles",
		desc: `Combates Dobles (2v2) con equipos aleatorios de Pok\u00e9mon Z, movimientos de soporte y megas activas.`,
		mod: 'pokemonz',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Terastal Clause'],
	},
	{
		name: "[Gen 9] Pokemon Z Random FFA",
		desc: `Battle Royale de 4 jugadores con equipos aleatorios de Pok\u00e9mon Z.`,
		mod: 'pokemonz',
		gameType: 'freeforall',
		team: 'random',
		ruleset: ['Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Terastal Clause'],
	},
	{
		name: "[Gen 9] Pokemon Z Custom Singles",
		desc: `Metagame custom en Individuales de Pok\u00e9mon Z: mec\u00e1nicas de Generaci\u00f3n 9 con Megaevoluci\u00f3n activa, especies, habilidades y movimientos propios del fangame. \u00danicas cl\u00e1usulas: Item Clause y Sleep Clause.`,
		mod: 'pokemonz',
		gameType: 'singles',
		ruleset: ['Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Item Clause = 1', 'Sleep Clause Mod', 'Terastal Clause'],
	},
	{
		name: "[Gen 9] Pokemon Z Custom Doubles",
		desc: `Metagame custom en Dobles de Pok\u00e9mon Z: mec\u00e1nicas de Generaci\u00f3n 9 con Megaevoluci\u00f3n activa, especies, habilidades y movimientos propios del fangame. \u00danicas cl\u00e1usulas: Item Clause y Sleep Clause.`,
		mod: 'pokemonz',
		gameType: 'doubles',
		ruleset: ['Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Item Clause = 1', 'Sleep Clause Mod', 'Terastal Clause'],
	},
	{
		name: "[Gen 9] Pokemon Z Libre",
		desc: `Modo Libre en Individuales de Pok\u00e9mon Z: sin Item Clause ni Sleep Clause, hasta 24 Pok\u00e9mon por equipo y cualquier nivel/EVs. Ideal para Randomlockes y combates sin restricciones.`,
		mod: 'pokemonz',
		gameType: 'singles',
		ruleset: ['Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Max Team Size = 24', 'Max Level = 9999', 'Default Level = 100', 'Terastal Clause'],
	},
	{
		name: "[Gen 9] Pokemon Z Libre Doubles",
		desc: `Modo Libre en Dobles de Pok\u00e9mon Z: sin Item Clause ni Sleep Clause, hasta 24 Pok\u00e9mon por equipo y cualquier nivel/EVs. Ideal para Randomlockes y combates sin restricciones.`,
		mod: 'pokemonz',
		gameType: 'doubles',
		ruleset: ['Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Max Team Size = 24', 'Max Level = 9999', 'Default Level = 100', 'Terastal Clause'],
	},
	{
		name: "[Gen 9] Pokemon Z Free-For-All",
		desc: `Combate Battle Royale para 4 jugadores todos contra todos con Pok\u00e9mon Z (Gen 9 + Megaevoluciones). \u00danicas cl\u00e1usulas: Item Clause y Sleep Clause.`,
		mod: 'pokemonz',
		gameType: 'freeforall',
		ruleset: ['Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Item Clause = 1', 'Sleep Clause Mod', 'Terastal Clause'],
	},
	{
		name: "[Gen 9] Pokemon Z Libre FFA",
		desc: `Free-For-All para 4 jugadores sin restricciones: sin Item Clause ni Sleep Clause, hasta 24 Pok\u00e9mon y cualquier nivel/EVs.`,
		mod: 'pokemonz',
		gameType: 'freeforall',
		ruleset: ['Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Max Team Size = 24', 'Max Level = 9999', 'Default Level = 100', 'Terastal Clause'],
	},
];
