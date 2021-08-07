import ε, { Component, Element } from '../tools/ε';

class Title extends Component {

  constructor(props) {
    super(props);
  }

  render(): Element {
    const { type, subTitle, children } = this.props;
    const c = [
      ε.createElement('text', {}, children)
    ];
    if (subTitle) {
      c.push(ε.createElement('span', {class: "text-red-600"}, [ε.createElement('text', {}, subTitle)]))
    }
    return ε.createElement(
      type,
      {},
      c,
    );
  }
}

export default Title;