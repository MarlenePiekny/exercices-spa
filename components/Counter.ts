import ε, { Component } from '../tools/ε';

// import components
import Number from './Number';
import WrapperButtons from './WrapperButtons';

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
        ε.createElement(WrapperButtons, {
          addOne: this.addOne,
          subOne: this.subOne,
          reset: this.reset,
        }, [] ),
      ],
    );
  }
}

export default Counter;