import ε, { Component } from '../tools/ε';

class Button extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { handleClick } = this.props;
    return this.return(
      'button',
      { class: "font-bold mb-5", onClick: handleClick },
      [ε.createElement('text', {}, 'Add one!')]
    );
  }
}

export default Button;