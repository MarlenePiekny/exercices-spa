import * as ε from '../tools/ε/';

class Title extends ε.Component {

  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props)
    const {type, children} = this.props;
    return ε.createElement(type, {}, [children[0]]);
  }
}

export default Title;