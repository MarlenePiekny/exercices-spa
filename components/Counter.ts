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

  render() {
    const { number } = this.state;

    return this.return(
      'div',
      { class: "w-6/12 border-2 p-5 flex flex-col items-center"},
      [
        ε.createElement(Number, { number }, []),
        ε.createElement(Button, { handleClick: this.addOne }, []),
      ],
    );
  }
}

export default Counter;