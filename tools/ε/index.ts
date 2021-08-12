import {Element} from './frameworkTypes';

// parent class for components
abstract class Component {
    abstract render(): Element
}

function createElement(name, attributes, children) {
    return {
        name,
        attributes,
        children
    };
};

function elementsToHTML(VDOM) {
    if (!VDOM.children) {
        let e = document.createElement(VDOM.name);
        for ( const attribute in VDOM.attributes) {
            console.log(`${attribute} : ${VDOM.attributes[attribute]}`);
            e.setAttribute(`${attribute}` , `${VDOM.attributes[attribute]}`)
        }
        return e;
    } else {
        console.log('coucou');
        let e = document.createElement(VDOM.name);
        for ( const attribute in VDOM.attributes) {
            console.log(`${attribute} : ${VDOM.attributes[attribute]}`);
            e.setAttribute(`${attribute}` , `${VDOM.attributes[attribute]}`)
        }
        VDOM.children.forEach(child=> {
            if (typeof child === 'string') {
                e.innerHTML = child;
            } else {
                e.append(elementsToHTML(child))
            }
        })
        return e;
    }
}


function getElement(element) {
    let elementToReturn;
    if (typeof element === 'string') {
        elementToReturn = element;
    } else if (typeof element.name === 'string') {
        const childrenCol = [];
        element.children.forEach(e => {
            childrenCol.push(getElement(e));
        });
        element.children = childrenCol;
        elementToReturn = element;
    } else {
        const instance = new element.name();
        const render = instance.render();
        elementToReturn = getElement(render);
    }

    return elementToReturn;
}


function getVirtualDom(element) {
    return getElement(element);
}

function letsGo(root, site) {
    root.append(site);
}

function start(rootComponent, rootHtml: HTMLElement): void {
    const rootInstance = new rootComponent();
    const rootRender = rootInstance.render();
    const virtualDom = getVirtualDom(rootRender);
    const site = elementsToHTML(virtualDom);
    letsGo(rootHtml, site);
}


export {
    Component,
    start,
    createElement
};