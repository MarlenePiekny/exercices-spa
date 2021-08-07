import ε from './tools/ε';
import Header from './components/Header';

ε.start(Header, document.getElementById('root'));

const inst = new Header();
console.log(ε.elementToString(inst.render()));