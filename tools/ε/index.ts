import {
  Element,
  Attributes,
  Children
} from './frameworkTypes';
import elementToHTML from './elementToHtml';
import elementToString from './elementToString';
import {compare} from './compare';

// Variables
let nbComponents = 0;
let actualDom: Element = null;
let wantToUpdate: boolean = false;

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
    id: nbComponents ++,
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
  const site = elementToHTML(element);
  if (typeof site === 'string') {
    rootHtml.innerHTML = site;
  } else {
    rootHtml.appendChild(site);
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