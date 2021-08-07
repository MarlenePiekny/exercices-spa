import {
  Element,
  Attributes,
  Children
} from './frameworkTypes';
import elementToString from './elementToString';
import { compare } from './compare';

// Variables
let nbComponents = 0;
let rootH;
let actualDom: Element | string | null = null;
let haveToUpdate: number | null = null;
const INST_COMP = {};

// Base class for components
interface PropsComponent {
  [name: string]: any;
}
interface StateComponent {
  [name: string]: any;
}
abstract class Component {
  _id: number = nbComponents ++;
  props: PropsComponent;
  state: StateComponent;
  constructor(props = {}) {
    this.props = props;
  }

  setState = (changeState: any, callback?: any) => {
    const copyState = JSON.parse(JSON.stringify(this.state));
    let newState = {};
    if(typeof changeState === 'function') {
      newState = changeState(copyState);
    } else if (typeof changeState === 'object') {
      newState = changeState;
    } else {
      console.info('New state can be only object or function that return object');
    }
    
    this.state = {
      ...copyState,
      ...newState
    }

    haveToUpdate = this._id;
    if(callback) {
      callback(newState);
    }

  }

  return = <C>(name: C, attributes: Attributes, children: Children): Element => {
    return createElement(name, attributes, children, this._id);
  }
}

/**
 * Create an element
 */
function createElement<C>(name: C, attributes: Attributes, children: Children, _id?: number ): Element<C> {
  return ({
    _id,
    container: name,
    attributes,
    children
  });
}

/**
 * Create a HTML NODE from element.
 */
function elementToHTML(element: Element):HTMLElement | string {
  const htmlBloc = createHTMLTag(element);
  return htmlBloc;
}

const RESERVED_TAG_WORDS = ['text'];
const EVENTS_REGISTERED = {
  'onClick': 'click',
};

function createHTMLTag(e: Element):HTMLElement | string {
  // Case of Element being a html node
  if (typeof e.container === 'string') {
    if(!RESERVED_TAG_WORDS.includes(e.container)) {
      // html tag
      const tag = document.createElement(e.container);
      Object.keys(e.attributes).forEach(name => {
        if (name === 'class' && typeof e.attributes[name] === 'string') {
          tag.setAttribute(name, e.attributes[name] as string);
        }
        if(Object.keys(EVENTS_REGISTERED).includes(name) && typeof e.attributes[name] === 'function') {
          tag.addEventListener(EVENTS_REGISTERED[name], e.attributes[name] as ((...args: any[]) => any));
        }
      });
      if (e.children) {
        if (typeof e.children === 'string') {
          tag.innerHTML = e.children;
        } else {
          e.children.forEach(child => {
            const c = createHTMLTag(child);
            if (typeof c === 'string') {
              tag.innerHTML = c;
            } else {
               tag.appendChild(c);
            }
          });
        }
      }
      return tag;
    } else {
      // special cases handled
      if (e.container === 'text') {
        if (typeof e.children === 'string') {
          return e.children;
        }
      }
    }
  }

  // Case of Element being a Component
  if (typeof e.container === 'function') {
    const instanceComp = new e.container({...e.attributes, children: e.children});
    INST_COMP[e._id] = instanceComp;
    const renderElement = instanceComp.render();
    return createHTMLTag(renderElement);
  }
}

function getRenderElementFromComponentElement(e: Element, register:boolean): Element {
  const instanceComp = new e.container({...e.attributes, children: e.children});
  if(register) {
    INST_COMP[instanceComp._id] = instanceComp;
  }
  const render = instanceComp.render();
  return render;
}

function getElementChildrenFromComponentElement(e: Element, register: boolean) {
  let elementToReturn: Element;
  if(typeof e.container !== 'string') {
    elementToReturn = getRenderElementFromComponentElement(e, register);
  } else {
    elementToReturn = e;
  }
  if (typeof elementToReturn.children !== 'string') {
    let colChildren;
    colChildren = (elementToReturn.children as Element[]).map(child => getElementChildrenFromComponentElement(child, register));
    elementToReturn.children = colChildren;
  }
  return elementToReturn;
}

function activateElement(e: Element, register: boolean = true) {
  return getElementChildrenFromComponentElement(e, register);
}

function start(rootComponent: any, rootHtml: HTMLElement): void {
  const instance = new rootComponent();
  const element = instance.render();
  rootH = rootHtml;
  const elementOn = activateElement(element);
  const site = elementToHTML(elementOn);
  if (!actualDom) {
    if (typeof site === 'string') {
      rootHtml.innerHTML = site;
    } else {
      rootHtml.appendChild(site);
    }
    actualDom = elementOn;
    startUpdateLoop();
  }
}

function startUpdateLoop() {
  const unsub = setTimeout(() => {
    updateDom();
    clearTimeout(unsub);
    startUpdateLoop();
  }, 1000);
}

function parseDomAndReplace(element, newElement) {
  const copy = JSON.parse(JSON.stringify(element));
  if(typeof copy.children === 'object') {
    for (let i = 0; i < copy.children.length; i++) {
      const child = copy.children[i];
      if(child._id && child._id === haveToUpdate) {
        copy.children[i] = newElement;
        return copy;
      } else {
        return parseDomAndReplace(child, newElement);
      }
    }
  }
}

function findCompAndReturnNewDom(element: Element) {
  const elementToReplace = INST_COMP[haveToUpdate].render();
  const active = activateElement(elementToReplace, false);
  return parseDomAndReplace(element, active);
}

function updateDom() {
  if (haveToUpdate && typeof actualDom === 'object') {
    const nextDom = findCompAndReturnNewDom(actualDom);
    if(!compare(actualDom, nextDom)) {
      const site = elementToHTML(nextDom);
      rootH.innerHTML = '';
      rootH.appendChild(site);
      actualDom = nextDom;
    }
    haveToUpdate = null;
  }
}

export {
  Component,
  Element,
  compare,
};

export default {
  createElement,
  elementToString,
  start
};