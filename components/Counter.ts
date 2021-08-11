import ε, { Component } from '../tools/ε';

// import components
import Number from './Number';
import Button from './Button';

class Counter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      number: this.props.defaultNumber || 0
    }
  }

  addOne = () => {
    this.setState(state => ({
      number: state.number + 1,
    }));
  }
  subOne = () => {
    this.setState(state => ({
      number: state.number - 1,
    }));
  }
  reset = () => {
    this.setState(state => ({
      number: 0,
    }));
  }

  render() {
    const { number } = this.state;

    return ε.createElement(
      'div',
      { class: "w-6/12 border-2 p-5 flex flex-col items-center"},
      [
        ε.createElement(Number, { number }, []),
        ε.createElement(Button, { handleClick: this.addOne}, "Add one !" ),
        ε.createElement(Button, { handleClick: this.subOne}, "Sub one !" ),
        ε.createElement(Button, { handleClick: this.reset}, "Reset !" ),
      ],
    );
  }
}

export default Counter;