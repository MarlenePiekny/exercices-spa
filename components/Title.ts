import ε, { Component, Element } from '../tools/ε';

class Title extends Component {

  constructor(props) {
    super(props);
  }

  render(): Element {
    const { type } = this.props;
    return ε.createElement(
      type,
      {},
      [
        ε.createElement('text', {}, 'HELLO WORLD')
      ],
    );
  }
}

export default Title;