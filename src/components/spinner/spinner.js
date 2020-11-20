import React, { Component } from 'react'
import './spinner.css'


/* const textStyle1 = {
    position: "fixed",
    textAlign: "center",
    top: "65vh",
    left: "47.4vw",
    zIndex: "4444444444444444",
    color: "blue",
    textShadow: " 1px 15px 12px rgba(83, 150, 150, 0.95)"
}
const textStyle2 = {
    position: "fixed",
    textAlign: "center",
    top: "69vh",
    left: "48vw",
    zIndex: "4444444444444444",
    color: "blue",
    textShadow: " 1px 15px 12px rgba(83, 150, 150, 0.95)"
} */

class Spinner extends Component {


    render() {
        return (
            <div style={{ position: "fixed", top: "0", right: "0", width: "80vw", height: "100vh", boxShadow: "transparent", zIndex: "4444444444444444" }}>
 {/*                <div style={textStyle1}>
                    {this.props.text}...
                </div>
                <div style={textStyle2}>
                    en cours...
                </div> */}
                <div className="breeding-rhombus-spinner">
                    <div className="rhombus child-1"></div>
                    <div className="rhombus1 child-2"></div>
                    <div className="rhombus child-3"></div>
                    <div className="rhombus child-4"></div>
                    <div className="rhombus child-5"></div>
                    <div className="rhombus child-6"></div>
                    <div className="rhombus child-7"></div>
                    <div className="rhombus child-8"></div>
                    <div className="rhombus big"></div>
                </div>
            </div>
        )
    }
}

export default Spinner;