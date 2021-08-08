import ε, { Component } from '../tools/ε';

class Button extends Component {

  constructor(props, id) {
    super(props, id);
  }

  render() {
    const { handleClick, children } = this.props;
    return this.return(
      'button',
      { class: "font-bold mb-5", onClick: handleClick },
      [ε.createElement('text', {}, children)]
    );
  }
}

export default Button;