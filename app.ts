import ε from './tools/ε';
import Header from './components/Header';
import Header2 from './components/Header2';

ε.start(Header2, document.getElementById('root'));

const inst = new Header();
console.log(ε.elementToString(inst.render()));