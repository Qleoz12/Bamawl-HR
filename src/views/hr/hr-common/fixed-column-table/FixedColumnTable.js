import React, { Component } from 'react'
import './FixedColumnTable.css'
class FixedCoulmnTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fixedHeaders : this.props.headers.slice(0,this.props.frozen),
            regularHeaders : this.props.headers.slice(this.props.frozen,this.props.headers.length)
        }
    }
    componentDidMount(){
        console.log(this.props.headers.slice(0,this.props.frozen))
        console.log(this.props.headers.slice(this.props.frozen,this.props.headers.length))
    }
    addTd = (arr) =>{
        return arr.map((e,index) => (
            <td key={index}>{e}</td>
        ))
    }
    renderFrozenTd = (arr) =>{
        const sliceArr = arr.slice(0,this.state.fixedHeaders.length)
        return sliceArr.map((e,index) => (
            <td key={index}>{e}</td>
        ))
    }
    renderFrozen = (arr) =>{
        return arr.map((e,index) => {
            return <tr key={index}>{this.renderFrozenTd(e)}</tr>
        })
    }
    renderReularTd = (arr) =>{
        const sliceArr = arr.slice(this.state.fixedHeaders.length,arr.length)
        return sliceArr.map((e,index) => (
            <td key={index}>{e}</td>
        ))
    }
    renderReular = (arr) =>{
        return arr.map((e,index) => {
            return <tr key={index}>{this.renderReularTd(e)}</tr>
        })
    }
    render() {
        return (
            <div className="container">
            <table className="fixed">
                <thead>
                <tr>
                    {this.addTd(this.state.fixedHeaders)}
                </tr>
                </thead>
                <tbody>
                {this.renderFrozen(this.props.data)}
                </tbody>
            </table>
            <div className="scroll">
            <table className="scrollable">
                <thead>
                <tr>
                    {this.addTd(this.state.regularHeaders)}
                </tr>
                </thead>
                <tbody>
                {this.renderReular(this.props.data)}
                </tbody>
            </table>
                </div>
            </div>
        )
    }
}

export default FixedCoulmnTable