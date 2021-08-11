import ε, { Component } from '../tools/ε';

// import components
import Counter from './Counter';

class App extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    return ε.createElement(
      'div',
      { class: "w-full flex justify-center mt-5"},
      [
        ε.createElement(Counter, {}, [])
      ]
    );
  }
}

export default App;