import React from "react"
import {Image} from 'react-konva';

// try drag& drop rectangle
class MyImage extends React.Component {
  state = {
    image: null
  }
  componentDidMount() {
    const image = new window.Image();
    image.src = 'http://konvajs.github.io/assets/yoda.jpg';
    image.onload = () => {
      this.setState({
        image: image
      });
    }
  }

  render() {
    return (
      <Image
        image={this.state.image}
      />
    );
  }
}

export default MyImage