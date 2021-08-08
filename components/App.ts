import ε, { Component } from '../tools/ε';

// import components
import Counter from './Counter';

class App extends Component {

  constructor(props, id) {
    super(props, id);
    
  }

  render() {
    return this.return(
      'div',
      { class: "w-full flex justify-center mt-5"},
      [
        ε.createElement(Counter, {}, [])
      ]
    );
  }
}

export default App;