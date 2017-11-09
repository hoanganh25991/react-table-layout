import React from "react"
import s from "./style"

import Script from "react-load-script"
import {DRAG_TO_MAP, DROP_IMG} from "./reducers";

import tableImg from "../../asset/table.png"
import Draggable from 'react-draggable';

const _ = console.log

const _dispatch = (...args) => _("Fake dispatch", ...args)

class TableCate extends React.PureComponent {
  state = {
    fabricLoaded: false,
    canvasId: "__canvasIdX",
    layoutSize: null,
    fabric: null,
    canvas: null,
    sampleCates: null,
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
    canvas.setActiveObject(rect)
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

    this.bindObjEvent(canvas)

    this.setState({canvas})
  }

  events = [
    "object:selected",
    "object:moving",
  ]

  callback = (options) => {
    if(!options.target) return
    this.notifyWhenOffCanvas(options.target)
  }

  bindObjEvent = (canvas) => {
    this.events.map(event => {
      canvas.on(event, this.callback)
    })
  }


  notifyWhenOffCanvas = (obj) => {
    const {layoutSize, canvas} = this.state
    if(!layoutSize) {_(`notifyWhenOffCanvas return, no layoutSize found`)}

    const {width} = layoutSize
    const {top, left, width: widthObj, scaleX} = obj
    console.log(width, left, widthObj)
    const howFar = left+widthObj*scaleX
    const goOut = top < 0 || howFar  > width
    if(goOut) {
      console.log("Go out", top, left)
      const {model, dispatch = _dispatch} = this.props
      dispatch({type: DRAG_TO_MAP, object: obj, top: top, left: (left-width)})
    }
    const offCanvas = left > width
    if(offCanvas) {
      _("object off canvas, remove it")
      obj.remove()
      // dispatch()
      // canvas.remove(obj)
    }
  }


  storeLayoutSize = node => {
    if(!node) return
    const {width, height} = node.getBoundingClientRect()
    this.setState({layoutSize: {width, height}})
  }

  availableImgs = ["table.png", "chair.png", "chair-2.png", "chair-2-v2.png"]

  componentDidMount(){
    const loadImgsWait = Promise.all(this.availableImgs.map(imgName => {
      return import(`../../asset/${imgName}`).then(img => ({name: imgName, img}))
    }))
    loadImgsWait.then(sampleCates => this.setState({sampleCates}))
  }

  handleComputeDelta = (e) => {
    const nativeE = e.nativeEvent
    const eX = nativeE instanceof TouchEvent ? nativeE.changedTouches[0] : nativeE
    _(eX)
    const {clientX, clientY, target} = eX
    const {top, left} = target.getBoundingClientRect()
    const deltaX = left - clientX;
    const deltaY = top - clientY;
    this.setState({deltaX, deltaY})
  }

  handleDragEvent = (e, data) => {
    // type DraggableData = {
    //   node: HTMLElement,
    //   // lastX + deltaX === x
    //   x: number, y: number,
    //   deltaX: number, deltaY: number,
    // };
    //   lastX: number, lastY: number

    // const x = e.clientX - (offset.left + imageOffsetX);
    // const y = e.clientY - (offset.top + imageOffsetY);

    _(e.nativeEvent, e.clientX, e.clientY, e.target)
    const nativeE = e.nativeEvent
    const eX = nativeE instanceof TouchEvent ? nativeE.changedTouches[0] : nativeE
    _(eX)
    const {deltaX, deltaY} = this.state
    const {clientY, clientX, target} = eX
    const {dispatch = _dispatch} = this.props
    dispatch({type: DROP_IMG, top: clientY + deltaY, left: clientX + deltaX, target})
  }



  render(){
    const {sampleCates} = this.state
    const url = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.7.19/fabric.min.js"

    return (
      <div style={s.rootDiv}>
        <div style={s.header}>TableCate</div>
        <button onClick={this.addX()}>AddX</button>
        <div style={s.layoutDiv} ref={this.storeLayoutSize}>
          {sampleCates && sampleCates.map(({name, img}) => (
            <div key={name}>
              <img src={img} style={s.sampleCate} onDragEnd={this.handleDragEvent} onDragStart={this.handleComputeDelta} onTouchStart={this.handleComputeDelta} onTouchEnd={this.handleDragEvent}/>
            </div>
          ))}
          {/*<canvas id={this.state.canvasId} style={s.canvas}/>*/}
          {/*<Script*/}
            {/*url={url}*/}
            {/*onLoad={this.notifyFabricLoaded(true)}*/}
            {/*onError={this.notifyFabricLoaded(false)}*/}
          {/*/>*/}
        </div>
      </div>
    )
  }
}


export default TableCate