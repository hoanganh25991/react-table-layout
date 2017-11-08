import React from "react"
import s from "./style"

import Script from "react-load-script"

class TableCate extends React.PureComponent {
  state = {
    fabricLoaded: false,
    canvasId: "__canvasId2",
    layoutSize: null
  }

  notifyFabricLoaded = loaded => () => {
    console.log(`Fabric loaded: ${loaded}`)
    this.setState({fabricLoaded: loaded})
    if(loaded) this.init()
  }

  init = () => {
    const {canvasId, layoutSize} = this.state
    const fabric = window.fabric
    const canvas = new fabric.Canvas(canvasId);

    if(layoutSize){
      const {width, height} = layoutSize
      canvas.setWidth(width)
      canvas.setHeight(height)
    }

    const circle = new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 })

    canvas.add(circle);

    canvas.item(0).set({
      borderColor: 'gray',
      cornerColor: 'black',
      cornerSize: 12,
      transparentCorners: true
    });
    // canvas.setActiveObject(canvas.item(0));
  }


  storeLayoutSize = node => {
    if(!node) return
    const {width, height} = node.getBoundingClientRect()
    this.setState({layoutSize: {width, height}})
  }


  render(){
    const url = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.7.19/fabric.min.js"

    return (
      <div style={s.rootDiv}>
        <div style={s.header}>TableCate</div>
        <div style={s.layoutDiv} ref={this.storeLayoutSize}>
          <canvas id={this.state.canvasId} style={s.canvas}/>
          <Script
            url={url}
            onLoad={this.notifyFabricLoaded(true)}
            onError={this.notifyFabricLoaded(false)}
          />
        </div>
      </div>
    )
  }
}


export default TableCate