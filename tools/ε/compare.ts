import { isEqual } from 'lodash';
import {
  Element,
} from './frameworkTypes';

function compare(currentDom: Element, nextDom: Element):boolean {
  return isEqual(currentDom, nextDom);
}

export {
  compare
};