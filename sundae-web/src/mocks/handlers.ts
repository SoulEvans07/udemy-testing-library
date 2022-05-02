import { rest } from 'msw';
import { serverUrl } from '../config';
import { getScoops } from './getScoops';
import { getToppings } from './getToppings';

export const handlers = [rest.get(serverUrl + '/scoops', getScoops), rest.get(serverUrl + '/toppings', getToppings)];
