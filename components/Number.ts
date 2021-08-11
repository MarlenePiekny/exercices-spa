import ε, { Component } from '../tools/ε';

class Number extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { number } = this.props;
    return ε.createElement(
      ('span'),
      { class: "font-bold mb-5" },
      [ε.createElement('text', {}, number.toString())],
    );
  }
}

export default Number;