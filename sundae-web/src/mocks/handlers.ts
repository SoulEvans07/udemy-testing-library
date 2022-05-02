import { rest } from 'msw';
import { serverUrl } from '../config';
import { getScoops } from './getScoops';

export const handlers = [rest.get(serverUrl + '/scoops', getScoops)];
