import { isEqual } from 'lodash';
import {
  Element,
} from './frameworkTypes';

export default function compare(currentDom: Element, nextDom: Element):boolean {
  console.log(typeof currentDom);
  const currentDomStretch = stretchElement(currentDom);
  const nextDomStretch = stretchElement(nextDom);
  console.log('current :', currentDomStretch);
  console.log('next :', nextDomStretch);
  return isEqual(currentDomStretch, nextDomStretch);
}

function getRenderElementFromComponentElement(e: Element): Element {
  const instanceComp = new e.container({...e.attributes, children: e.children});
  const render = instanceComp.render();
  return render;
}

function getElementChildrenFromComponentElement(e: Element) {
  let elementToReturn: Element;
  if(typeof e.container !== 'string') {
    elementToReturn = getRenderElementFromComponentElement(e);
  } else {
    elementToReturn = e;
  }
  if (typeof elementToReturn.children !== 'string') {
    let colChildren;
    colChildren = (elementToReturn.children as Element[]).map(child => getElementChildrenFromComponentElement(child));
    elementToReturn.children = colChildren;
  }
  return elementToReturn;
}

function stretchElement(e: Element) {
  return getElementChildrenFromComponentElement(e);
}