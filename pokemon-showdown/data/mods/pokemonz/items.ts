function canEvolveTwice(species: any, dex: any): boolean {
	for (const evoName of species?.evos || []) {
		const evoSp = dex.species.get(evoName);
		if (evoSp?.exists && evoSp.evos?.length > 0) return true;
	}
	return false;
}

export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	kinglerita: {
		num: 615,
		name: 'Kinglerita',
		spritenum: 575,
		megaStone: {"Kingler":"Kingler-Mega"},
		itemUser: ["Kingler"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Kingler.',
	},
	butterfreeita: {
		num: 616,
		name: 'Butterfreeita',
		spritenum: 575,
		megaStone: {"Butterfree":"Butterfree-Mega"},
		itemUser: ["Butterfree"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Butterfree.',
	},
	machampita: {
		num: 617,
		name: 'Machampita',
		spritenum: 575,
		megaStone: {"Machamp":"Machamp-Mega"},
		itemUser: ["Machamp"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Machamp.',
	},
	laprasita: {
		num: 618,
		name: 'Laprasita',
		spritenum: 575,
		megaStone: {"Lapras":"Lapras-Mega"},
		itemUser: ["Lapras"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Lapras.',
	},
	garbodorita: {
		num: 619,
		name: 'Garbodorita',
		spritenum: 575,
		megaStone: {"Garbodor":"Garbodor-Mega"},
		itemUser: ["Garbodor"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Garbodor.',
	},
	corviknightita: {
		num: 620,
		name: 'Corvinightita',
		spritenum: 575,
		megaStone: {"Corviknight":"Corviknight-Mega"},
		itemUser: ["Corviknight"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Corvinight.',
	},
	orbeetleita: {
		num: 621,
		name: 'Orbeetleita',
		spritenum: 575,
		megaStone: {"Orbeetle":"Orbeetle-Mega"},
		itemUser: ["Orbeetle"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Orbeetle.',
	},
	drednawita: {
		num: 622,
		name: 'Drednawita',
		spritenum: 575,
		megaStone: {"Drednaw":"Drednaw-Mega"},
		itemUser: ["Drednaw"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Drednaw.',
	},
	coalossalita: {
		num: 623,
		name: 'Coalossalita',
		spritenum: 575,
		megaStone: {"Coalossal":"Coalossal-Mega"},
		itemUser: ["Coalossal"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Coalossal.',
	},
	flappletunita: {
		num: 624,
		name: 'Megapiedra Manzánida',
		spritenum: 575,
		megaStone: {"Flapple":"Flapple-Mega","Appletun":"Appletun-Mega","Hydrapple":"Hydrapple-Mega"},
		itemUser: ["Flapple","Appletun","Hydrapple"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Flapple, Appletun e Hydrapple.',
	},
	sandacondita: {
		num: 625,
		name: 'Sandacondita',
		spritenum: 575,
		megaStone: {"Sandaconda":"Sandaconda-Mega"},
		itemUser: ["Sandaconda"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Sandaconda.',
	},
	toxtricitita: {
		num: 626,
		name: 'Toxtricitita',
		spritenum: 575,
		megaStone: {"Toxtricity":"Toxtricity-Mega"},
		itemUser: ["Toxtricity"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Toxtricity.',
	},
	centiskorchita: {
		num: 627,
		name: 'Centiskorchita',
		spritenum: 575,
		megaStone: {"Centiskorch":"Centiskorch-Mega"},
		itemUser: ["Centiskorch"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Centiskorch.',
	},
	hatterenita: {
		num: 628,
		name: 'Hatterenita',
		spritenum: 575,
		megaStone: {"Hatterene":"Hatterene-Mega"},
		itemUser: ["Hatterene"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Hatterene.',
	},
	grimmsnarlita: {
		num: 629,
		name: 'Grimmsnarlita',
		spritenum: 575,
		megaStone: {"Grimmsnarl":"Grimmsnarl-Mega"},
		itemUser: ["Grimmsnarl"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Grimmsnarl.',
	},
	alcremita: {
		num: 630,
		name: 'Alcremita',
		spritenum: 575,
		megaStone: {"Alcremie":"Alcremie-Mega"},
		itemUser: ["Alcremie"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Alcremie.',
	},
	copperajita: {
		num: 631,
		name: 'Copperajita',
		spritenum: 575,
		megaStone: {"Copperajah":"Copperajah-Mega"},
		itemUser: ["Copperajah"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Copperajah.',
	},
	duraludonita: {
		num: 632,
		name: 'Duraludonita',
		spritenum: 575,
		megaStone: {"Duraludon":"Duraludon-Mega"},
		itemUser: ["Duraludon"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Duraludon.',
	},
	alakazamita: {
		num: 633,
		name: 'Alakazamita',
		spritenum: 575,
		megaStone: {"Alakazam":"Alakazam-Mega"},
		itemUser: ["Alakazam"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Alakazam.',
	},
	gengarita: {
		num: 634,
		name: 'Gengarita',
		spritenum: 575,
		megaStone: {"Gengar":"Gengar-Mega"},
		itemUser: ["Gengar"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Gengar.',
	},
	kangaskhanita: {
		num: 635,
		name: 'Kangaskhanita',
		spritenum: 575,
		megaStone: {"Kangaskhan":"Kangaskhan-Mega"},
		itemUser: ["Kangaskhan"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Kangaskhan.',
	},
	pinsirita: {
		num: 636,
		name: 'Pinsirita',
		spritenum: 575,
		megaStone: {"Pinsir":"Pinsir-Mega"},
		itemUser: ["Pinsir"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Pinsir.',
	},
	gyaradosita: {
		num: 637,
		name: 'Gyaradosita',
		spritenum: 575,
		megaStone: {"Gyarados":"Gyarados-Mega"},
		itemUser: ["Gyarados"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Gyarados.',
	},
	aerodactylita: {
		num: 638,
		name: 'Aerodactylita',
		spritenum: 575,
		megaStone: {"Aerodactyl":"Aerodactyl-Mega"},
		itemUser: ["Aerodactyl"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Aerodactyl.',
	},
	ampharosita: {
		num: 639,
		name: 'Ampharosita',
		spritenum: 575,
		megaStone: {"Ampharos":"Ampharos-Mega"},
		itemUser: ["Ampharos"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Ampharos.',
	},
	scizorita: {
		num: 640,
		name: 'Scizorita',
		spritenum: 575,
		megaStone: {"Scizor":"Scizor-Mega"},
		itemUser: ["Scizor"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Scizor.',
	},
	heracrossita: {
		num: 641,
		name: 'Heracrossita',
		spritenum: 575,
		megaStone: {"Heracross":"Heracross-Mega"},
		itemUser: ["Heracross"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Heracross.',
	},
	houndoomita: {
		num: 642,
		name: 'Houndoomita',
		spritenum: 575,
		megaStone: {"Houndoom":"Houndoom-Mega"},
		itemUser: ["Houndoom"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Houndoom.',
	},
	gardevoirita: {
		num: 643,
		name: 'Gardevoirita',
		spritenum: 575,
		megaStone: {"Gardevoir":"Gardevoir-Mega"},
		itemUser: ["Gardevoir"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Gardevoir.',
	},
	aggronita: {
		num: 644,
		name: 'Aggronita',
		spritenum: 575,
		megaStone: {"Aggron":"Aggron-Mega"},
		itemUser: ["Aggron"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Aggron.',
	},
	medichamita: {
		num: 645,
		name: 'Medichamita',
		spritenum: 575,
		megaStone: {"Medicham":"Medicham-Mega"},
		itemUser: ["Medicham"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Medicham.',
	},
	manectrita: {
		num: 646,
		name: 'Manectrita',
		spritenum: 575,
		megaStone: {"Manectric":"Manectric-Mega"},
		itemUser: ["Manectric"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Manectric.',
	},
	absolita: {
		num: 647,
		name: 'Absolita',
		spritenum: 575,
		megaStone: {"Absol":"Absol-Mega"},
		itemUser: ["Absol"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Absol.',
	},
	lucarita: {
		num: 648,
		name: 'Lucarita',
		spritenum: 575,
		megaStone: {"Lucario":"Lucario-Mega"},
		itemUser: ["Lucario"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Lucario.',
	},
	beedrillita: {
		num: 649,
		name: 'Beedrillita',
		spritenum: 575,
		megaStone: {"Beedrill":"Beedrill-Mega"},
		itemUser: ["Beedrill"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Beedrill.',
	},
	pidgeotita: {
		num: 650,
		name: 'Pidgeotita',
		spritenum: 575,
		megaStone: {"Pidgeot":"Pidgeot-Mega"},
		itemUser: ["Pidgeot"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Pidgeot.',
	},
	slowbrita: {
		num: 651,
		name: 'Slowbrita',
		spritenum: 575,
		megaStone: {"Slowbro":"Slowbro-Mega"},
		itemUser: ["Slowbro"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Slowbro.',
	},
	steelixita: {
		num: 652,
		name: 'Steelixita',
		spritenum: 575,
		megaStone: {"Steelix":"Steelix-Mega"},
		itemUser: ["Steelix"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Steelix.',
	},
	sableyita: {
		num: 653,
		name: 'Sableyita',
		spritenum: 575,
		megaStone: {"Sableye":"Sableye-Mega"},
		itemUser: ["Sableye"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Sableye.',
	},
	sharpedita: {
		num: 654,
		name: 'Sharpedita',
		spritenum: 575,
		megaStone: {"Sharpedo":"Sharpedo-Mega"},
		itemUser: ["Sharpedo"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Sharpedo.',
	},
	cameruptita: {
		num: 655,
		name: 'Cameruptita',
		spritenum: 575,
		megaStone: {"Camerupt":"Camerupt-Mega"},
		itemUser: ["Camerupt"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Camerupt.',
	},
	altarita: {
		num: 656,
		name: 'Altarita',
		spritenum: 575,
		megaStone: {"Altaria":"Altaria-Mega"},
		itemUser: ["Altaria"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Altaria.',
	},
	glalieita: {
		num: 657,
		name: 'Glalieita',
		spritenum: 575,
		megaStone: {"Glalie":"Glalie-Mega"},
		itemUser: ["Glalie"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Glalie.',
	},
	galladita: {
		num: 658,
		name: 'Galladita',
		spritenum: 575,
		megaStone: {"Gallade":"Gallade-Mega"},
		itemUser: ["Gallade"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Gallade.',
	},
	seviperita: {
		num: 661,
		name: 'Seviperita',
		spritenum: 575,
		megaStone: {"Seviper":"Seviper-Mega"},
		itemUser: ["Seviper"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Seviper.',
	},
	greninjitaash: {
		num: 665,
		name: 'Greninjita Ash',
		spritenum: 575,
		megaStone: {"Greninja":"Greninja-Mega"},
		itemUser: ["Greninja"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Greninja.',
	},
	blazikenite: {
		num: 672,
		name: 'Blazikenita',
		spritenum: 575,
		megaStone: {"Blaziken":"Blaziken-Mega"},
		itemUser: ["Blaziken"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Blaziken.',
	},
	pikachuita: {
		num: 673,
		name: 'Pikachuita',
		spritenum: 575,
		megaStone: {"Pikachu-Kalos-Z":"Pikachu-Mega"},
		itemUser: ["Pikachu-Kalos-Z"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Pikachu.',
	},
	venusaurite: {
		num: 676,
		name: 'Venusaurita',
		spritenum: 575,
		megaStone: {"Venusaur":"Venusaur-Mega"},
		itemUser: ["Venusaur"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Venusaur.',
	},
	charizarditey: {
		num: 677,
		name: 'Charizardita Y',
		spritenum: 575,
		megaStone: {"Charizard":"Charizard-Mega-Y"},
		itemUser: ["Charizard"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Charizard.',
	},
	blastoisinite: {
		num: 678,
		name: 'Blastoisita',
		spritenum: 575,
		megaStone: {"Blastoise":"Blastoise-Mega"},
		itemUser: ["Blastoise"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Blastoise.',
	},
	tyranitarite: {
		num: 704,
		name: 'Tyranita',
		spritenum: 575,
		megaStone: {"Tyranitar":"Tyranitar-Mega"},
		itemUser: ["Tyranitar"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Tyranitar.',
	},
	sceptilite: {
		num: 705,
		name: 'Sceptilita',
		spritenum: 575,
		megaStone: {"Sceptile":"Sceptile-Mega"},
		itemUser: ["Sceptile"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Sceptile.',
	},
	swampertite: {
		num: 706,
		name: 'Swampertita',
		spritenum: 575,
		megaStone: {"Swampert":"Swampert-Mega"},
		itemUser: ["Swampert"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Swampert.',
	},
	charizarditex: {
		num: 708,
		name: 'Charizardita X',
		spritenum: 575,
		megaStone: {"Charizard":"Charizard-Mega-X"},
		itemUser: ["Charizard"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Charizard.',
	},
	salamencite: {
		num: 724,
		name: 'Salamencita',
		spritenum: 575,
		megaStone: {"Salamence":"Salamence-Mega"},
		itemUser: ["Salamence"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Salamence.',
	},
	metagrossite: {
		num: 725,
		name: 'Metagrossita',
		spritenum: 575,
		megaStone: {"Metagross":"Metagross-Mega"},
		itemUser: ["Metagross"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Metagross.',
	},
	garchompite: {
		num: 726,
		name: 'Garchompita',
		spritenum: 575,
		megaStone: {"Garchomp":"Garchomp-Mega"},
		itemUser: ["Garchomp"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Garchomp.',
	},
	lopunnyte: {
		num: 801,
		name: 'Lopunnyta',
		spritenum: 575,
		megaStone: {"Lopunny":"Lopunny-Mega"},
		itemUser: ["Lopunny"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Lopunny.',
	},
	florgesita: {
		num: 816,
		name: 'Florgesita',
		spritenum: 575,
		megaStone: {"Florges":"Florges-Mega"},
		itemUser: ["Florges"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Florges.',
	},
	rayquazite: {
		num: 836,
		name: 'Rayquazita',
		spritenum: 575,
		megaStone: {"Rayquaza":"Rayquaza-Mega"},
		itemUser: ["Rayquaza"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Rayquaza.',
	},
	abomasnowita: {
		num: 857,
		name: 'Abomasnowita',
		spritenum: 575,
		megaStone: {"Abomasnow":"Abomasnow-Mega"},
		itemUser: ["Abomasnow"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Abomasnow.',
	},
	diancita: {
		num: 864,
		name: 'Diancita',
		spritenum: 575,
		megaStone: {"Diancie":"Diancie-Mega"},
		itemUser: ["Diancie"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Diancie.',
	},
	chesnaughtitaz: {
		num: 869,
		name: 'Chesnaughtita Z',
		spritenum: 575,
		megaStone: {"Chesnaught-Kalos":"Chesnaught-Mega-Z"},
		itemUser: ["Chesnaught-Kalos"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Chesnaught de Kalos.',
	},
	delphoxitaz: {
		num: 870,
		name: 'Delphoxita Z',
		spritenum: 575,
		megaStone: {"Delphox-Kalos":"Delphox-Mega-Z"},
		itemUser: ["Delphox-Kalos"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Delphox de Kalos.',
	},
	greninjitaz: {
		num: 871,
		name: 'Greninjita Z',
		spritenum: 575,
		megaStone: {"Greninja-Kalos":"Greninja-Mega-Z"},
		itemUser: ["Greninja-Kalos"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Greninja de Kalos.',
	},
	rillaboomita: {
		num: 872,
		name: 'Rillaboomita',
		spritenum: 575,
		megaStone: {"Rillaboom":"Rillaboom-Mega"},
		itemUser: ["Rillaboom"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Rillaboom.',
	},
	cinderacita: {
		num: 873,
		name: 'Cinderacita',
		spritenum: 575,
		megaStone: {"Cinderace":"Cinderace-Mega"},
		itemUser: ["Cinderace"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Cinderace.',
	},
	inteleonita: {
		num: 874,
		name: 'Inteleonita',
		spritenum: 575,
		megaStone: {"Inteleon":"Inteleon-Mega"},
		itemUser: ["Inteleon"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Inteleon.',
	},
	zygardita: {
		num: 896,
		name: 'Zygardita',
		spritenum: 575,
		megaStone: {"Zygarde":"Zygarde-Mega"},
		itemUser: ["Zygarde"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Zygarde.',
	},
	enteita: {
		num: 899,
		name: 'Enteita',
		spritenum: 575,
		megaStone: {"Entei":"Entei-Mega"},
		itemUser: ["Entei"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Entei.',
	},
	floettita: {
		num: 900,
		name: 'Floettita',
		spritenum: 575,
		megaStone: {"Floette":"Floette-Mega"},
		itemUser: ["Floette"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Floette.',
	},
	volcaronita: {
		num: 901,
		name: 'Volcaronita',
		spritenum: 575,
		megaStone: {"Volcarona":"Volcarona-Mega"},
		itemUser: ["Volcarona"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Volcarona.',
	},
	chesnaughtita: {
		num: 902,
		name: 'Chesnaughtita',
		spritenum: 575,
		megaStone: {"Chesnaught":"Chesnaught-Mega"},
		itemUser: ["Chesnaught"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Chesnaught.',
	},
	delphoxita: {
		num: 903,
		name: 'Delphoxita',
		spritenum: 575,
		megaStone: {"Delphox":"Delphox-Mega"},
		itemUser: ["Delphox"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Delphox.',
	},
	greninjita: {
		num: 904,
		name: 'Greninjita',
		spritenum: 575,
		megaStone: {"Greninja":"Greninja-Mega"},
		itemUser: ["Greninja"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Greninja.',
	},
	drampanite: {
		num: 905,
		name: 'Drampita',
		spritenum: 575,
		megaStone: {"Drampa":"Drampa-Mega"},
		itemUser: ["Drampa"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Piedra para megaevolucionar a Drampa.',
	},
	victreebelite: {
		num: 906,
		name: 'Victreebelita',
		spritenum: 575,
		megaStone: {"Victreebel":"Victreebel-Mega"},
		itemUser: ["Victreebel"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Victreebel en combate.',
	},
	dragoninite: {
		num: 907,
		name: 'Dragonitita',
		spritenum: 575,
		megaStone: {"Dragonite":"Dragonite-Mega"},
		itemUser: ["Dragonite"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Dragonite en combate.',
	},
	malamarite: {
		num: 908,
		name: 'Malamarita',
		spritenum: 575,
		megaStone: {"Malamar":"Malamar-Mega"},
		itemUser: ["Malamar"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Malamar en combate.',
	},
	hawluchanite: {
		num: 909,
		name: 'Hawluchita',
		spritenum: 575,
		megaStone: {"Hawlucha":"Hawlucha-Mega"},
		itemUser: ["Hawlucha"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Hawlucha en combate.',
	},
	clefablite: {
		num: 910,
		name: 'Clefablita',
		spritenum: 575,
		megaStone: {"Clefable":"Clefable-Mega"},
		itemUser: ["Clefable"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Clefable en combate.',
	},
	starminite: {
		num: 911,
		name: 'Starmita',
		spritenum: 575,
		megaStone: {"Starmie":"Starmie-Mega"},
		itemUser: ["Starmie"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Starmie en combate.',
	},
	meganiumite: {
		num: 912,
		name: 'Meganiumita',
		spritenum: 575,
		megaStone: {"Meganium":"Meganium-Mega"},
		itemUser: ["Meganium"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Meganium en combate.',
	},
	feraligite: {
		num: 913,
		name: 'Feraligatrita',
		spritenum: 575,
		megaStone: {"Feraligatr":"Feraligatr-Mega"},
		itemUser: ["Feraligatr"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Feraligatr en combate.',
	},
	skarmorite: {
		num: 914,
		name: 'Skarmorita',
		spritenum: 575,
		megaStone: {"Skarmory":"Skarmory-Mega"},
		itemUser: ["Skarmory"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Skarmory en combate.',
	},
	froslassite: {
		num: 915,
		name: 'Froslassita',
		spritenum: 575,
		megaStone: {"Froslass":"Froslass-Mega"},
		itemUser: ["Froslass"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Froslass en combate.',
	},
	emboarite: {
		num: 916,
		name: 'Emboarita',
		spritenum: 575,
		megaStone: {"Emboar":"Emboar-Mega"},
		itemUser: ["Emboar"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Emboar en combate.',
	},
	excadrite: {
		num: 917,
		name: 'Excadrillita',
		spritenum: 575,
		megaStone: {"Excadrill":"Excadrill-Mega"},
		itemUser: ["Excadrill"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Excadrill en combate.',
	},
	scolipite: {
		num: 918,
		name: 'Scolipedita',
		spritenum: 575,
		megaStone: {"Scolipede":"Scolipede-Mega"},
		itemUser: ["Scolipede"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Scolipede en combate.',
	},
	scraftinite: {
		num: 919,
		name: 'Scraftita',
		spritenum: 575,
		megaStone: {"Scrafty":"Scrafty-Mega"},
		itemUser: ["Scrafty"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Scrafty en combate.',
	},
	eelektrossite: {
		num: 920,
		name: 'Eelektrossita',
		spritenum: 575,
		megaStone: {"Eelektross":"Eelektross-Mega"},
		itemUser: ["Eelektross"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Eelektross en combate.',
	},
	chandelurite: {
		num: 921,
		name: 'Chandelurita',
		spritenum: 575,
		megaStone: {"Chandelure":"Chandelure-Mega"},
		itemUser: ["Chandelure"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Chandelure en combate.',
	},
	pyroarite: {
		num: 922,
		name: 'Pyroarita',
		spritenum: 575,
		megaStone: {"Pyroar":"Pyroar-Mega"},
		itemUser: ["Pyroar"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Pyroar en combate.',
	},
	barbaracite: {
		num: 923,
		name: 'Barbaraclita',
		spritenum: 575,
		megaStone: {"Barbaracle":"Barbaracle-Mega"},
		itemUser: ["Barbaracle"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Barbaracle en combate.',
	},
	dragalgite: {
		num: 924,
		name: 'Dragalgita',
		spritenum: 575,
		megaStone: {"Dragalge":"Dragalge-Mega"},
		itemUser: ["Dragalge"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Dragalge en combate.',
	},
	falinksite: {
		num: 925,
		name: 'Falinksita',
		spritenum: 575,
		megaStone: {"Falinks":"Falinks-Mega"},
		itemUser: ["Falinks"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Falinks en combate.',
	},
	raichuite: {
		num: 926,
		name: 'Raichuita',
		spritenum: 575,
		megaStone: {"Raichu-Kalos":"Raichu-Mega"},
		itemUser: ["Raichu-Kalos"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Raichu en combate.',
	},
	chimechite: {
		num: 927,
		name: 'Chimechita',
		spritenum: 575,
		megaStone: {"Chimecho":"Chimecho-Mega"},
		itemUser: ["Chimecho"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Chimecho en combate.',
	},
	absolitez: {
		num: 928,
		name: 'Absolita Z',
		spritenum: 575,
		megaStone: {"Absol":"Absol-Mega-Z"},
		itemUser: ["Absol"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Absol en combate.',
	},
	staraptite: {
		num: 929,
		name: 'Staraptita',
		spritenum: 575,
		megaStone: {"Staraptor":"Staraptor-Mega"},
		itemUser: ["Staraptor"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Staraptor en combate.',
	},
	garchompitez: {
		num: 930,
		name: 'Garchompita Z',
		spritenum: 575,
		megaStone: {"Garchomp":"Garchomp-Mega-Z"},
		itemUser: ["Garchomp"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Garchomp en combate.',
	},
	lucarionitez: {
		num: 931,
		name: 'Lucarionita Z',
		spritenum: 575,
		megaStone: {"Lucario":"Lucario-Mega-Z"},
		itemUser: ["Lucario"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Lucario en combate.',
	},
	golurkite: {
		num: 932,
		name: 'Golurkita',
		spritenum: 575,
		megaStone: {"Golurk":"Golurk-Mega"},
		itemUser: ["Golurk"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Golurk en combate.',
	},
	meowsticite: {
		num: 933,
		name: 'Meowsticita',
		spritenum: 575,
		megaStone: {"Meowstic":"Meowstic-M-Mega","Meowstic-F":"Meowstic-F-Mega"},
		itemUser: ["Meowstic","Meowstic-F"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Meowstic en combate.',
	},
	crabominite: {
		num: 934,
		name: 'Crabominita',
		spritenum: 575,
		megaStone: {"Crabominable":"Crabominable-Mega"},
		itemUser: ["Crabominable"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Crabominable en combate.',
	},
	golisopite: {
		num: 935,
		name: 'Golisopita',
		spritenum: 575,
		megaStone: {"Golisopod":"Golisopod-Mega"},
		itemUser: ["Golisopod"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Golisopod en combate.',
	},
	magearnite: {
		num: 936,
		name: 'Magearnita',
		spritenum: 575,
		megaStone: {"Magearna":"Magearna-Mega"},
		itemUser: ["Magearna"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Magearna en combate.',
	},
	scovillainite: {
		num: 937,
		name: 'Scovillainita',
		spritenum: 575,
		megaStone: {"Scovillain":"Scovillain-Mega"},
		itemUser: ["Scovillain"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Scovillain en combate.',
	},
	baxcalibrite: {
		num: 938,
		name: 'Baxcalibrita',
		spritenum: 575,
		megaStone: {"Baxcalibur":"Baxcalibur-Mega"},
		itemUser: ["Baxcalibur"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Baxcalibur en combate.',
	},
	tatsugirinite: {
		num: 939,
		name: 'Tatsugirinita',
		spritenum: 575,
		megaStone: {"Tatsugiri":"Tatsugiri-Curly-Mega"},
		itemUser: ["Tatsugiri"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Tatsugiri en combate.',
	},
	glimmoranite: {
		num: 940,
		name: 'Glimmoranita',
		spritenum: 575,
		megaStone: {"Glimmora":"Glimmora-Mega"},
		itemUser: ["Glimmora"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Glimmora en combate.',
	},
	heatranite: {
		num: 941,
		name: 'Heatranita',
		spritenum: 575,
		megaStone: {"Heatran":"Heatran-Mega"},
		itemUser: ["Heatran"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Heatran en combate.',
	},
	darkranite: {
		num: 942,
		name: 'Darkranita',
		spritenum: 575,
		megaStone: {"Darkrai":"Darkrai-Mega"},
		itemUser: ["Darkrai"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Darkrai en combate.',
	},
	zeraorite: {
		num: 943,
		name: 'Zeraorita',
		spritenum: 575,
		megaStone: {"Zeraora":"Zeraora-Mega"},
		itemUser: ["Zeraora"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		gen: 9,
		desc: 'Permite megaevolucionar a Zeraora en combate.',
	},
	telasilvana: {
		num: 530,
		name: 'Tela Silvana',
		spritenum: 530,
		fling: { basePower: 30 },
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fairy') {
				return this.chainModify([4915, 4096]);
			}
		},
		gen: 9,
		desc: 'Tela mística que fortalece los ataques de tipo Hada un 20%.',
	},
	tablaneutra: {
		num: 719,
		name: 'Tabla Neutra',
		spritenum: 719,
		onPlate: 'Normal',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Normal') {
				return this.chainModify(1.25);
			}
		},
		gen: 9,
		desc: 'Tabla de piedra que potencia los movimientos de tipo Normal un 25%.',
	},
	anticrtico: {
		num: 730,
		name: 'Anticrítico',
		spritenum: 730,
		fling: { basePower: 30 },
		onCriticalHit: false,
		gen: 9,
		desc: 'Evita que el portador reciba golpes críticos.',
	},
	superminevolutivo: {
		num: 766,
		name: 'Supermin. Evolutivo',
		spritenum: 766,
		fling: { basePower: 40 },
		onModifyAtkPriority: 2,
		onModifyAtk(atk, pokemon) {
			if (canEvolveTwice(pokemon.baseSpecies, this.dex)) return this.chainModify(1.5);
		},
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (canEvolveTwice(pokemon.baseSpecies, this.dex)) return this.chainModify(1.5);
		},
		onModifySpAPriority: 2,
		onModifySpA(spa, pokemon) {
			if (canEvolveTwice(pokemon.baseSpecies, this.dex)) return this.chainModify(1.5);
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (canEvolveTwice(pokemon.baseSpecies, this.dex)) return this.chainModify(1.5);
		},
		onModifySpe(spe, pokemon) {
			if (canEvolveTwice(pokemon.baseSpecies, this.dex)) return this.chainModify(1.5);
		},
		gen: 9,
		desc: 'Aumenta un 50% todas las estadísticas excepto PS si aún puede evolucionar 2 veces.',
	},
	armazndefauces: {
		num: 814,
		name: 'Armazón de Fauces',
		spritenum: 814,
		fling: { basePower: 50 },
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite']) return this.chainModify(1.2);
		},
		onModifyCritRatio(critRatio, source, target, move) {
			if (move.flags['bite']) return critRatio + 1;
		},
		gen: 9,
		desc: 'Potencia los movimientos de mordisco un 20% y les da mayor probabilidad de crítico.',
	},
	punzasfera: {
		num: 834,
		name: 'Punzasfera',
		spritenum: 834,
		fling: { basePower: 30, volatileStatus: 'bleeding' },
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.addVolatile('bleeding');
		},
		gen: 9,
		desc: 'Esfera punzante que provoca Hemorragia en el portador.',
	},
	nudillopas: {
		num: 835,
		name: 'Nudillo Púas',
		spritenum: 835,
		fling: { basePower: 40 },
		onModifyMove(move) {
			if (move.flags['contact'] && move.category !== 'Status') {
				if (!move.secondaries) move.secondaries = [];
				move.secondaries.push({ chance: 30, volatileStatus: 'bleeding' });
			}
		},
		gen: 9,
		desc: 'Los ataques de contacto tienen un 30% de producir Hemorragia (el enemigo recibirá más críticos).',
	},
	candemano: {
		num: 844,
		name: 'Cañón de Mano',
		spritenum: 844,
		fling: { basePower: 60 },
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['pulse']) return this.chainModify(1.3);
		},
		gen: 9,
		desc: 'Potencia un 30% los movimientos de pulso.',
	},
	fuelleneumtico: {
		num: 863,
		name: 'Fuelle Neumático',
		spritenum: 863,
		fling: { basePower: 30 },
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['wind']) return this.chainModify(1.5);
		},
		gen: 9,
		desc: 'Potencia un 50% los movimientos de viento.',
	},
	espadavaliente: {
		num: 875,
		name: 'Espada Valiente',
		spritenum: 875,
		fling: { basePower: 70 },
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				return this.chainModify(attacker.baseSpecies.baseSpecies === 'Kricketune' ? 1.5 : 1.3);
			}
		},
		gen: 9,
		desc: 'Potencia un 30% los movimientos de corte (50% si la lleva Kricketune).',
	},
	corazaasalto: {
		num: 876,
		name: 'Coraza Asalto',
		spritenum: 876,
		fling: { basePower: 80 },
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.moveSlots.every(slot => this.dex.moves.get(slot.id).category !== 'Status')) {
				return this.chainModify(1.4);
			}
		},
		gen: 9,
		desc: 'Aumenta la Defensa un 40% si el Pokémon solo lleva movimientos ofensivos.',
	},
	tabladeesqu: {
		num: 877,
		name: 'Tabla de Esquí',
		spritenum: 877,
		fling: { basePower: 50 },
		itemUser: ["Bibarel", "Bibarel-Kalos"],
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Bibarel') return this.chainModify(1.3);
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Bibarel') return this.chainModify(1.5);
		},
		gen: 9,
		desc: 'Aumenta el Ataque de Bibarel un 30% y su Velocidad un 50%.',
	},
	cascoprotector: {
		num: 888,
		name: 'Casco Protector',
		spritenum: 888,
		fling: { basePower: 60 },
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (move.category === 'Status' && move.id !== 'mefirst') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		gen: 9,
		desc: 'Evita el daño de retroceso de los propios ataques, pero solo permite usar movimientos ofensivos.',
	},
	mscaramaligna: {
		num: 889,
		name: 'Máscara Maligna',
		spritenum: 889,
		fling: { basePower: 40 },
		onModifyDamage(damage, source, target, move) {
			if (target.status) return this.chainModify(1.3);
		},
		gen: 9,
		desc: 'El daño contra enemigos que sufren estados alterados aumenta un 30%.',
	},
	razancestral: {
		num: 890,
		name: 'Raíz Ancestral',
		spritenum: 890,
		fling: { basePower: 30 },
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			if (effect.id === 'drain') {
				return Math.max(1, Math.floor(target.baseMaxhp * 0.25));
			}
		},
		gen: 9,
		desc: 'Los ataques de drenaje siempre curan al usuario un 25% fijo de su PS máximo.',
	},
	anillosanguino: {
		num: 947,
		name: 'Anillo Sanguino',
		spritenum: 947,
		fling: { basePower: 30 },
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) return this.chainModify(1.4);
		},
		gen: 9,
		desc: 'El daño de los golpes críticos aumenta un 40%.',
	},
	thickclub: {
		inherit: true,
		isNonstandard: null,
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies === 'Cubone' ||
				pokemon.baseSpecies.baseSpecies === 'Marowak' ||
				pokemon.baseSpecies.baseSpecies === 'Marolier' ||
				pokemon.baseSpecies.name === 'Marolier' ||
				pokemon.baseSpecies.name.startsWith('Marowak') ||
				pokemon.baseSpecies.name.startsWith('Cubone')
			) {
				return this.chainModify(2);
			}
		},
		itemUser: [
			"Marowak", "Marowak-Alola", "Marowak-Alola-Totem", "Marowak-Kalos",
			"Cubone", "Cubone-Kalos", "Marolier",
		],
		desc: "Si lo lleva Cubone, Marowak o Marolier, su Ataque se duplica.",
	},
	huesogrueso: {
		num: 258,
		name: "Hueso Grueso",
		spritenum: 491,
		fling: { basePower: 90 },
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies === 'Cubone' ||
				pokemon.baseSpecies.baseSpecies === 'Marowak' ||
				pokemon.baseSpecies.baseSpecies === 'Marolier' ||
				pokemon.baseSpecies.name === 'Marolier' ||
				pokemon.baseSpecies.name.startsWith('Marowak') ||
				pokemon.baseSpecies.name.startsWith('Cubone')
			) {
				return this.chainModify(2);
			}
		},
		itemUser: [
			"Marowak", "Marowak-Alola", "Marowak-Alola-Totem", "Marowak-Kalos",
			"Cubone", "Cubone-Kalos", "Marolier",
		],
		gen: 9,
		desc: "Si lo lleva Cubone, Marowak o Marolier, su Ataque se duplica.",
	},
	laggingtail: {
		inherit: true,
		isNonstandard: null,
		onFractionalPriority: -0.1,
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies === 'Cubone' ||
				pokemon.baseSpecies.baseSpecies === 'Marowak' ||
				pokemon.baseSpecies.baseSpecies === 'Marolier' ||
				pokemon.baseSpecies.name === 'Marolier' ||
				pokemon.baseSpecies.name.startsWith('Marowak') ||
				pokemon.baseSpecies.name.startsWith('Cubone')
			) {
				return this.chainModify(2);
			}
		},
		itemUser: [
			"Marowak", "Marowak-Alola", "Marowak-Alola-Totem", "Marowak-Kalos",
			"Cubone", "Cubone-Kalos", "Marolier",
		],
		desc: "El portador siempre ataca el último en su prioridad. Duplica el Ataque de Marowak y Marolier.",
	},
	colaplumbea: {
		num: 279,
		name: "Cola Plúmbea",
		spritenum: 237,
		fling: { basePower: 10 },
		onFractionalPriority: -0.1,
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies === 'Cubone' ||
				pokemon.baseSpecies.baseSpecies === 'Marowak' ||
				pokemon.baseSpecies.baseSpecies === 'Marolier' ||
				pokemon.baseSpecies.name === 'Marolier' ||
				pokemon.baseSpecies.name.startsWith('Marowak') ||
				pokemon.baseSpecies.name.startsWith('Cubone')
			) {
				return this.chainModify(2);
			}
		},
		itemUser: [
			"Marowak", "Marowak-Alola", "Marowak-Alola-Totem", "Marowak-Kalos",
			"Cubone", "Cubone-Kalos", "Marolier",
		],
		gen: 9,
		desc: "El portador siempre ataca el último en su prioridad. Duplica el Ataque de Marowak y Marolier.",
	},
};
