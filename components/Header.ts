import * as ε from '../tools/ε/';

// import components
import Title from './Title';

// We want to render html like: 

  //     <div class="w-full flex justify-center items-center border-2 bg-gray-300">
  //       <Title type="h1" >HELLO WORLD</Title>
  //     </div>

class Header extends ε.Component {

  render() {
    return ε.createElement(
        'div',
        {
          class: "w-full flex-col flex justify-center items-center border-2 bg-gray-300",
        },
        [
          ε.createElement(Title,{type: "h6"}, ["Hello Renaud"]),
          ε.createElement(Title,{type: "h1"}, ["Hello "]),
        ]
      )
  }
}

export default Header;