import ε, { Component } from '../tools/ε';

class Number extends Component {

  constructor(props, id) {
    super(props, id);
  }

  render() {
    const { number } = this.props;
    return this.return(
      ('span'),
      { class: "font-bold mb-5" },
      [ε.createElement('text', {}, number.toString())],
    );
  }
}

export default Number;