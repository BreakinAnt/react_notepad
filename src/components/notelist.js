import React, { Component } from 'react';

import './notelist.css'

class Notelist extends Component{
    render(){
        return(
            <div className="painel-list">
                <ul>
                    {this.props.list.map(val => {
                        return <li key={val.id} onClick={() => this.props.clicked(val.id)}>{val.title}</li>;
                    })}
                </ul>
            </div>
        )
    }
}

export default Notelist;