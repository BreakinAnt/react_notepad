import React, { Component } from 'react';

import './notelist.css'

class Notelist extends Component{
    constructor(props){
        super(props);
        this.state = {
          list: []
        }
    }

    componentDidMount(){
        this.setState({
            list: this.props.list
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.list !== this.props.list){
            console.log('hi mom');
            this.setState({
                list: this.props.list
            })
        }
    }

    render(){
        return(
            <div className="painel-list">
                <ul>
                    {this.state.list.map(val => {
                        return <li key={val.id} onClick={() => this.props.clicked(val.id)}>{val.title}</li>;
                    })}
                </ul>
            </div>
        )
    }
}

export default Notelist;