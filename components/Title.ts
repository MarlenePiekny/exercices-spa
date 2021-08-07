import ε, { Component, Element } from '../tools/ε';

class Title extends Component {

  render (): Element {
    return ε.createElement(
      'h1',
      {},
      [
        ε.createElement('text', {}, 'HELLO WORLD')
      ],
    );
  }
}

export default Title;