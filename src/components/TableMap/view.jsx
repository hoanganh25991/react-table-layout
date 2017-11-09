import React from "react"
import s from "./style"

import Script from "react-load-script"

const _ = console.log

class TableMap extends React.PureComponent {
  state = {
    fabricLoaded: false,
    canvasId: "__canvasId",
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

  addX = () => {
    const {canvas, fabric} = this.state

    if(!canvas || !fabric) {
      console.log("No canvas found to add")
      return
    }

    const circle = new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 })

    circle.set({
      borderColor: 'gray',
      cornerColor: 'black',
      cornerSize: 12,
      transparentCorners: true
    });

    canvas.add(circle);
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


  mem = []

  checkExist = (object) => {
    const objClone = this.mem.filter(objClone => objClone.origin === object)[0]
    return objClone
  }

  componentWillReceiveProps(nextProps){
    const {model, dispatch} = this.props
    const {canvas, fabric} = this.state
    const tableCateUpdated = model.tableCate !== nextProps.model.tableCate

    if(tableCateUpdated){
      _(nextProps.model)
      const {object, top, left} = nextProps.model.tableCate
      const exist = this.checkExist(object)
      const {width, height, scaleX, scaleY, fill} = object
      const objClone = Boolean(exist) ? exist : new fabric.Rect({width, height, scaleX, scaleY, fill} )
      objClone.origin = object
      objClone.top = top;
      objClone.left = left
      if(exist) {
        // canvas.add(objClone)
        // canvas.renderAll()
      }else {
        this.mem.push(objClone)
        canvas.add(objClone)
      }
      canvas.renderAll()
      objClone.setCoords()
    }

  }


  render(){
    const url = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.7.19/fabric.min.js"

    return (
      <div style={s.rootDiv}>
        <div style={s.header}>TableMap</div>
        <button onClick={this.addX}>AddX</button>
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

export default TableMap