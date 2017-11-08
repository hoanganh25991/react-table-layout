import React from "react"
import s from "./style"

import Script from "react-load-script"


class TableMap extends React.PureComponent {
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
        <div style={s.header}>TableMap</div>
        <Script
          url={url}
          onLoad={this.notifyFabricLoaded(true)}
          onError={this.notifyFabricLoaded(false)}
        />
      </div>
    )
  }
}

export default TableMap