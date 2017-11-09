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
    enabledDrawLine: false,
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
    const canvas = new fabric.Canvas(canvasId, {
      selection: false
   });

    if(layoutSize){
      const {width, height} = layoutSize
      canvas.setWidth(width)
      canvas.setHeight(height)
    }


    this.setState({canvas}, () => {
      this.pan()
      this.zoomWithMouseWheel()
      this.addGridLayout()
      this.snapObj()
      this.drawLine()
      this.enhaceCanvasOff(canvas)
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


  pan = (modeOn = true) => {
    const {canvas, fabric} = this.state
    let mouseDownPoint = null;

    const mouseDownCb = (options) => {
      const hitBackground = options.target && options.target.tag === "backgroundGrid";
      const shouldPan = !options.target || hitBackground
      if(!shouldPan) return
      const pointer = canvas.getPointer(options.e, true);
      mouseDownPoint = new fabric.Point(pointer.x, pointer.y);
    }

    const mouseMoveCb = (options) => {
      // _("Find target", options.target)
      const shouldPan = mouseDownPoint && !options.target
      if(!shouldPan) return
      const pointer = canvas.getPointer(options.e, true);
      const mouseMovePoint = new fabric.Point(pointer.x, pointer.y);
      canvas.relativePan(mouseMovePoint.subtract(mouseDownPoint));
      mouseDownPoint = mouseMovePoint;
    }

    const mouseUpCb = (options) => {
      mouseDownPoint = null;
    }

    const call = modeOn ? "on" : "off";
    _(`Pan mode ${call}`)

    canvas.set({selection: modeOn})

    canvas[call]('mouse:down', mouseDownCb);
    canvas[call]('mouse:move', mouseMoveCb);
    canvas[call]('mouse:up', mouseUpCb);
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

  // loadScript = node => {
  //   const s = window.document.createElement("script")
  //   s.src = "https://tinker.press/abc.js"
  //   node.append(s)
  // }

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

  snapObj = () => {
    const grid = 20;
    // snap to grid
    const {canvas} = this.state
    canvas.on('object:moving', function(options) {
      options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid
      });
    });
  }
  
  drawLine = (modeOn) => {
    const {canvas, fabric} = this.state

    let line, isDown;

    const mouseDownCb = (options) => {
      _(canvas)
      _(`drawline mousedown cb`)
      isDown = true;
      const pointer = canvas.getPointer(options.e);
      const points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
      line = new fabric.Line(points, {
        strokeWidth: 5,
        fill: 'red',
        stroke: 'red',
        selectable: false
      });
      canvas.add(line);
    }

    const mouseMoveCb = (o) => {
      _(`drawline mousemove cb`)
      if (!isDown) return;
      const pointer = canvas.getPointer(o.e);
      line.set({ x2: pointer.x, y2: pointer.y });
      canvas.renderAll();
    }

    const mouseUpCb = (o) => {
      _(`drawline mouseup cb`)
      isDown = false;
    }

    const call = modeOn ? "on" : "off";
    _(`Draw line ${call}`)
    _(canvas, call, mouseMoveCb)

    canvas[call]('mouse:down', mouseDownCb);
    canvas[call]('mouse:move', mouseMoveCb);
    canvas[call]('mouse:up', mouseUpCb);
  }

  toogleDrawLineMode = () => {
    const {enabledDrawLine: curr} = this.state
    const enabledDrawLine = !curr
    this.setState({enabledDrawLine}, () => {
      _(enabledDrawLine)
      this.drawLine(enabledDrawLine)
      this.pan(!enabledDrawLine)
    })
  }

  enhaceCanvasOff = canvas => {
    _("enhance canvas off")
    const oOff = canvas.off
    canvas.off = function(eventName, eventHandler = null){
      if(!eventHandler) {
        oOff(eventName)
        return
      }
      const listeners = canvas.__eventListeners[eventName]
     const next = listeners.filter(listener => listener.toString() !== eventHandler.toString())
      canvas.__eventListeners[eventName] = next
    }
  }

  makeCircle = (left, top, line1, line2, line3, line4) => {
    const {canvas, fabric} = this.state
    const c = new fabric.Circle({
      left: left,
      top: top,
      strokeWidth: 5,
      radius: 12,
      fill: '#fff',
      stroke: '#666'
    });

    c.hasControls = c.hasBorders = false;

    c.line1 = line1;
    c.line2 = line2;
    c.line3 = line3;
    c.line4 = line4;

    return c;
  }

  render(){
    const url = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.7.19/fabric.min.js"
    // const url = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/2.0.0-beta.7/fabric.min.js"
    ///

    return (
      <div style={s.rootDiv} >
        <div style={s.header}>TableMap</div>
        <button onClick={this.addX}>AddX</button>
        <button onClick={this.toogleDrawLineMode}>Toogle Draw Line</button>
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