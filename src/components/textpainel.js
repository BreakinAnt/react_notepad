import React, { Component } from 'react';

import './textpainel.css'

class Textpainel extends Component{
    constructor(props){
        super(props);
        this.state = {
            note: false
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            this.setState({
                note: this.props.fetchedNote
            });
        }
    }

    render(){
        let note = "";
        if(this.state.note.id){
            note = <React.Fragment>
                <p id="note-title">{this.state.note.title}</p>
                <p id="note-text">{this.state.note.text}</p>
                <div id="note-bottom">
                    <p>{this.state.note.author}</p>
                    <p>{this.state.note.date}</p>
                </div>
            </React.Fragment>;            
        }


        return(
            <div className="text-painel" onClick={this.props.clickedText}>
                {note}
            </div>
        )
    }
}

export default Textpainel;