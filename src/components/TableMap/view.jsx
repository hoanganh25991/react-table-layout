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


    this.setState({canvas}, () => {
      this.pan()
      this.zoomWithMouseWheel()
      this.addGridLayout()
    })
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

  hanldeDragDropFabricObj = (nextProps) => {
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

  handleDragDropImg = (nextProps) => {
    const {model, dispatch} = this.props
    const {canvas, fabric} = this.state
    const tableCateUpdated = model.tableCate !== nextProps.model.tableCate

    if(!tableCateUpdated) return
    const {target, top: clientY, left: clientX} = nextProps.model.tableCate

    const {width, height} = target

    const top = clientY - canvas._offset.top
    const left = clientX - canvas._offset.left

    _(target)

    const newImage = new fabric.Image(target, {
      width,
      height,
      left,
      top
    });
    canvas.add(newImage);
  }

  componentWillReceiveProps(nextProps){
    // this.hanldeDragDropFabricObj(nextProps)
    this.handleDragDropImg(nextProps)
  }


  pan = () => {
    const {canvas, fabric} = this.state
    let mouseDownPoint = null;

    canvas.on('mouse:down', function (options) {
      const hitBackground = options.target && options.target.tag === "backgroundGrid";
      const shouldPan = !options.target || hitBackground
      if(!shouldPan) return
      const pointer = canvas.getPointer(options.e, true);
      mouseDownPoint = new fabric.Point(pointer.x, pointer.y);
    });
    canvas.on('mouse:up', function (options) {
      mouseDownPoint = null;
    });
    canvas.on('mouse:move', function (options) {
      // _("Find target", options.target)
      const shouldPan = mouseDownPoint && !options.target
      if(!shouldPan) return
      const pointer = canvas.getPointer(options.e, true);
      const mouseMovePoint = new fabric.Point(pointer.x, pointer.y);
      canvas.relativePan(mouseMovePoint.subtract(mouseDownPoint));
      mouseDownPoint = mouseMovePoint;
    });
  }


  zoomWithMouseWheel = () => {
    const {canvas, fabric} = this.state
    canvas.on("mouse:wheel", (options) => {
      const wheelEvent =  options.e
      const {deltaY} = wheelEvent
      const currZoom = canvas.getZoom()
      const xScale = deltaY > 0 ? 1/1.1 : 1.1
      const zoomRatio = currZoom * xScale
      const pointX = wheelEvent.x - canvas._offset.left
      const pointY = wheelEvent.y - canvas._offset.top
      const point = new fabric.Point(pointX, pointY);
      canvas.zoomToPoint(point, zoomRatio)
    })


  }

  notifyLoad = node => {
    _("SCRIPT", node)
    node.onload = () => console.log("LOADED")
  }

  loadScript = node => {
    const s = window.document.createElement("script")
    s.src = "https://tinker.press/abc.js"
    node.append(s)
  }

  addGridLayout = () => {
    const {canvas, fabric, layoutSize} = this.state
    const {width, height} = layoutSize
    const gridWidth = width; // <= you must define this with final grid width
    const gridHeight = height; // <= you must define this with final grid height

    // to manipulate grid after creation
    const lineArr = []
    const gridSize = 20; // define grid size
    // define presentation option of grid
    const lineOption = {stroke: '#ebebeb', strokeWidth: 1, selectable:false, evented:false};
    // do in two steps to limit the calculations
    // first loop for vertical line
    for(let i = Math.ceil(gridWidth/gridSize); i--;){
      const line = new fabric.Line([gridSize*i, 0, gridSize*i, gridHeight], lineOption)
      if(i%5 === 0) line.set({stroke: "#ccc"})
      lineArr.push( line );
    }
    // second loop for horizontal line
    for(let i = Math.ceil(gridHeight/gridSize); i--;){
      const line = new fabric.Line([0, gridSize*i, gridWidth, gridSize*i], lineOption)
      if(i%5 === 0) line.set({stroke: "#ccc"})
      lineArr.push( line);
    }
    // Group add to canvas
    const oGridGroup = new fabric.Group(lineArr, {top: 0, left: 0, selectable: 0})
    oGridGroup.tag = "backgroundGrid"
    canvas.add(oGridGroup);
  }

  render(){
    const url = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.7.19/fabric.min.js"

    return (
      <div style={s.rootDiv} >
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