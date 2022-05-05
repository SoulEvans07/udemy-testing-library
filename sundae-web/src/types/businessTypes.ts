export type OptionType = 'scoops' | 'toppings';

export type OrderPhase = 'inProgress' | 'review' | 'completed';

export type SetOrderPhaseAction = (phase: OrderPhase) => void;
