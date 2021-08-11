import ε, { Component } from '../tools/ε';

// import components
import Button from './Button';

class WrapperButtons extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      addOne,
      subOne,
      reset
    } = this.props;

    return ε.createElement(
      'div',
      { class: "w-full flex justify-between"},
      [
        ε.createElement(Button, { handleClick: addOne}, "Add one !" ),
        ε.createElement(Button, { handleClick: subOne}, "Sub one !" ),
        ε.createElement(Button, { handleClick: reset}, "Reset !" ),
      ],
    );
  }
}

export default WrapperButtons;