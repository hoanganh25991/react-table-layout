import React from "react"
import s from "./style"


import TableCate from "../TableCate/view"
import TableMap from "../TableMap/view"
import Script from "react-load-script"

class TableLayout extends React.PureComponent {

  state = {
    fabricLoaded: false
  }

  notifyFabricLoaded = loaded => () => {
    console.log(`Fabric loaded: ${loaded}`)
    this.setState({fabricLoaded: loaded})
  }

  render(){
    const url = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.7.19/fabric.min.js"

    return (
      <div style={s.rootDiv}>
        <div style={s.header}>TableLayout</div>
        <div style={s.layoutDiv}>
          <TableCate/>
          <TableMap/>
        </div>
        <Script
          url={url}
          onLoad={this.notifyFabricLoaded(true)}
          onError={this.notifyFabricLoaded(false)}
        />
      </div>
    )
  }
}

export default TableLayout