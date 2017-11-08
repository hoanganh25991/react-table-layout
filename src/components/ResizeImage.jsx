import React from "react"
import {Group, Image, Circle} from 'react-konva';


let count = 0;

// try drag& drop rectangle
class MyImage extends React.Component {
  state = {
    image: null,
    topLeftCircle: {},
    topRightCircle: {},
    bottomLeftCircle: {},
    bottomRightCircle: {}
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = 'http://konvajs.github.io/assets/yoda.jpg';
    image.onload = () => {
      this.setState({
        image: image
      }, () => {
        console.log('Load image complete')
        const msg = this.imageNode ? `width: ${this.imageNode.width()}` : 'Dont see node'
        console.log(msg)

        const im     = this.imageNode;
        const {x, y} = im.position()
        const width  = im.width()
        const height = im.height()

        const topLeftCircle  = this.circleProps(x, y, 'topLeft')
        const topRightCircle = this.circleProps(x + width, y, 'topRight')
        const bottomLeftCircle  = this.circleProps(x, y + height, 'botLeft')
        const bottomRightCircle = this.circleProps(x+ width, y + height, 'botRight')

        this.setState({
          topLeftCircle,
          topRightCircle,
          bottomLeftCircle,
          bottomRightCircle
        }, () => {

        })

      });
    }
  }

  componentDidUpdate() {
    console.log("Did update")
  }

  circleProps = (x, y, name) => {
    return {
      x: x,
      y: y,
      stroke: '#666',
      fill: '#ddd',
      strokeWidth: 2,
      radius: 8,
      name: name,
      draggable: true,
      dragOnTop: false
    }
  }

  bindImageNode = node => {
    console.log(++count)
    this.imageNode = node
    console.log("node", node)
    const msg = node ? `width: ${node.width()}` : 'Dont see node'
    console.log(msg)
  }

  render() {
    return (
      <Group {...{width: 500, height: 500, stroke: '#666', strokeWidth: 2}}>
        <Circle {...this.state.topLeftCircle}/>
        <Circle {...this.state.topRightCircle}/>
        <Circle {...this.state.bottomLeftCircle}/>
        <Circle {...this.state.bottomRightCircle}/>
        <Image
          ref={this.bindImageNode}
          image={this.state.image}
        />
      </Group>
    );
  }
}

export default MyImage