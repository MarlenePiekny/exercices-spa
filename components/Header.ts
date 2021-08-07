import ε, { Component, Element } from '../tools/ε';

// import components
import Title from './Title';

class Header extends Component {

  render(): Element {
    return ε.createElement(
      'div',
      { class: "w-full flex justify-center items-center border-2 bg-gray-300"},
      [
        ε.createElement(Title, {type: 'h1'}, 'HELLO WORLD')
      ]
    );
  }
}

export default Header;