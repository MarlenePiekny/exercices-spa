import {
  Element,
} from './frameworkTypes';

export default function elementToHTML(element: Element):HTMLElement | string {
  const htmlBloc = createHTMLTag(element);
  return htmlBloc;
}

const RESERVED_TAG_WORDS = ['text'];

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
    const instanceComp = new e.container(e.attributes);
    const renderElement = instanceComp.render();
    return createHTMLTag(renderElement);
  }
}
