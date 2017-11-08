import React from "react"
import s from "./style"

import Script from "react-load-script"

const _ = console.log

class TableCate extends React.PureComponent {
  state = {
    fabricLoaded: false,
    canvasId: "__canvasIdX",
    layoutSize: null,
    fabric: null,
    canvas: null,
  }

  notifyFabricLoaded = loaded => () => {
    console.log(`Fabric loaded: ${loaded}`)
    this.setState({fabricLoaded: loaded})
    if(loaded) {
      this.setState({fabric: window.fabric})
      this.initCanvas()
    }
  }

  addX = (type = "Rect", option = {length: 40, width: 40, height: 40}) => () => {
    const {canvas, fabric,layoutSize} = this.state

    if(!canvas || !fabric) {
      console.log("No canvas found to add")
      return
    }
    _(canvas.size())
    const lastRect = canvas.item(canvas.size() - 1)
    const {length} = option;
    const padding = 10;
    const top = lastRect ? lastRect.top + length + padding : 0
    const {width} = layoutSize
    const left = (width - length)/2
    const fill = "#555"
    const rect = new fabric[type]({...option, top, left, fill })
    canvas.add(rect);
    _("rect added")
  }

  initCanvas = () => {
    const {canvasId, layoutSize} = this.state
    const fabric = window.fabric
    const canvas = new fabric.Canvas(canvasId);

    if(layoutSize){
      const {width, height} = layoutSize
      canvas.setWidth(width)
      canvas.setHeight(height)
    }

    this.setState({canvas})
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
        <button onClick={this.addX()}>AddX</button>
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