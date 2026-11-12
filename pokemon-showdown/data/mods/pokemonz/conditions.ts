export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	bleeding: {
		name: 'Bleeding',
		noCopy: true,
		onStart(pokemon) {
			this.add('-start', pokemon, 'Hemorragia');
		},
		onFoeModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
	},
};
