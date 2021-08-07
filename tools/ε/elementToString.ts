import {
  Element,
} from './frameworkTypes';

const RESERVED_TAG_WORDS = ['text'];

// ************* FOR SSR *************

/**
 * Create a string from an Element type object
 */
 export default function elementToString(element: Element) {
  const stringBloc = createSTRINGTag(element);
  return stringBloc;
}

function createSTRINGTag(e: Element): string {

  // Case of Element being a html node
  if (typeof e.container === 'string') {
    if(!RESERVED_TAG_WORDS.includes(e.container)) {
      // html tag
      const attributes = Object.keys(e.attributes).reduce((acc, name) => {
        acc = `${acc} ${name}="${e.attributes[name]}"`;
        return acc
      }, '');

      let children = '';
      if (e.children) {
        if (typeof e.children === 'string') {
          children = e.children;
        } else {
          children = e.children.reduce((acc, child) => {
            acc = `${acc}${createSTRINGTag(child)}`;
            return acc;
          }, '');
        }

      }
      const tag = `<${e.container}${attributes !== '' ? attributes : ''}>${children}</${e.container}>`;
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
    const instanceComp = new e.container(e.attributes);
    const renderElement = instanceComp.render();
    return createSTRINGTag(renderElement);
  }
}