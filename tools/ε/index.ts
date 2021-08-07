import {
  Element,
  Attributes,
  Children
} from './frameworkTypes';

// Variables
let nbComponents = 0;

// Base class for components
abstract class Component {
  abstract render(): Element
}

/**
 * Create an element
 */
export function createElement<C>(name: C, attributes: Attributes, children: Children): Element<C> {
  return ({
    id: nbComponents ++,
    container: name,
    attributes,
    children
  });
}

export {
  Component,
  Element
};

export default {
  createElement
};