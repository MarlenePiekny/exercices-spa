import ε, { Component } from '../tools/ε';

class Button extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { handleClick, children } = this.props;
    return ε.createElement(
      'button',
      { class: "font-bold mb-5", onClick: handleClick },
      [ε.createElement('text', {}, children)]
    );
  }
}

export default Button;