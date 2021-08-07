import ε, { Component, Element } from '../tools/ε';

// import components
import Title from './Title';

class Header extends Component {

  render(): Element {
    return ε.createElement(
      'div',
      { class: "w-full flex flex-col justify-center items-center border-2 bg-gray-300"},
      [
        ε.createElement(Title, {type: 'h1'}, 'HELLO CAMPUS!'),
        ε.createElement(Title, {type: 'h3', subTitle: " - welcome"}, "l'école numérique in the alps"),
      ]
    );
  }
}

export default Header;