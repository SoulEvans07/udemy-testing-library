import { createContext, useContext, useState, useMemo, ReactElement, PropsWithChildren } from 'react';
import { produce } from 'immer';
import { pricePerItem } from '../constants';
import { OptionType } from '../types/businessTypes';
import { sum } from '../utils/array-utils';

type OptionCounts = Record<OptionType, Record<string, number>>;
type OptionTotals = Record<OptionType | 'grandTotal', number>;
type OptionDetailsState = OptionCounts & { totals: OptionTotals };
type OptionDetailSetter = (itemName: string, newItemCount: number, optionType: OptionType) => void;
type OptionDetailReset = () => void;
type OptionDetailsContext = [OptionDetailsState, OptionDetailSetter, OptionDetailReset];

const OrderDetails = createContext<OptionDetailsContext | undefined>(undefined);

export function useOrderDetails() {
  const context = useContext(OrderDetails);
  if (!context) throw new Error('useOrderDetails must be used within an OrderDetailsProvider');
  return context;
}

interface OrderDetailsProviderProps {}

const initialState: OptionCounts = {
  scoops: {},
  toppings: {},
};

export function OrderDetailsProvider(props: PropsWithChildren<OrderDetailsProviderProps>): ReactElement {
  const [optionCounts, setOptionCounts] = useState<OptionCounts>(initialState);

  const reset = () => setOptionCounts(initialState);

  const totals = useMemo((): OptionTotals => {
    const scoopsTotal = sum(Object.values(optionCounts.scoops)) * pricePerItem.scoops;
    const toppingsTotal = sum(Object.values(optionCounts.toppings)) * pricePerItem.toppings;
    return {
      scoops: scoopsTotal,
      toppings: toppingsTotal,
      grandTotal: scoopsTotal + toppingsTotal,
    };
  }, [optionCounts]);

  const value = useMemo((): OptionDetailsContext => {
    const updateItemCount: OptionDetailSetter = (itemName, newItemCount, optionType) => {
      setOptionCounts(prev =>
        produce(prev, draft => {
          draft[optionType][itemName] = newItemCount;
        })
      );
    };

    return [{ ...optionCounts, totals }, updateItemCount, reset];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
