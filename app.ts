import ε, { compare } from './tools/ε';
import Header from './components/Header';
import Header2 from './components/Header2';

ε.start(Header, document.getElementById('root'));

const elementDom1 = new Header().render();
const elementDom2 = new Header2().render();

console.log(compare(elementDom1, elementDom2));