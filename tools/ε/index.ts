import {
  Element,
  Attributes,
  Children
} from './frameworkTypes';
import elementToHTML from './elementToHtml';
import elementToString from './elementToString';
import compare from './compare';

// Variables
let nbComponents = 0;
let rootC;
let rootH;
let actualDom: Element | string | null = null;
let havetoUpdate: boolean = false;

// Base class for components
interface PropsComponent {
  [name: string]: any;
}
abstract class Component {
  props: PropsComponent;
  constructor(props = {}) {
    this.props = props;
  }
  abstract render(): Element
}

/**
 * Create an element
 */
function createElement<C>(name: C, attributes: Attributes, children: Children): Element<C> {
  return ({
    container: name,
    attributes,
    children
  });
}

/**
 * Create a HTML NODE from element.
 */

function start(rootComponent: any, rootHtml: HTMLElement): void {
  const instance = new rootComponent();
  const element = instance.render();
  rootC = rootComponent;
  rootH = rootHtml;
  const site = elementToHTML(element);
  if (!actualDom) {
    if (typeof site === 'string') {
      rootHtml.innerHTML = site;
    } else {
      rootHtml.appendChild(site);
    }
    actualDom = element;
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

function updateDom() {

  if (havetoUpdate && typeof actualDom === 'object') {
    console.log('update in progress...')
    const instance = new rootC();
    const nextDom = instance.render();
    if(compare(actualDom, nextDom)) {
      const site = elementToHTML(nextDom);
      rootH.innerHTML = '';
      rootH.appendChild(site);
      actualDom = nextDom;
      havetoUpdate = false;
    }
    console.log('update done!')
  } else {
    console.log('No update')
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