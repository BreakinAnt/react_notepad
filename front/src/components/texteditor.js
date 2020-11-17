import React, { Component } from 'react';
import './texteditor.css'

import api from '../services/api';

class Texteditor extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentStyle: "none",
            note: false
        };
    }

    componentDidUpdate(prevProps){
        if(prevProps.fetchedNote !== this.props.fetchedNote){
            this.setState({
                note: this.props.fetchedNote
            });
        }
        if(prevProps.editorShow !== this.props.editorShow){
            if(this.props.fetchedNote){
                this.setState({currentStyle: "block"})
            }
        }
    }

    onChangeEditorPop(body){
        if(body.target.value === undefined){
            this.setState({currentStyle: "none"});
        }
    }

    onTodoChange(val) {
        this.setState({
                note:{
                    ...this.state.note,
                    text: val
                }
        });
    }

    onSubmitEdit(event){
        api.put(`notes/`, this.state.note).then(res => {
            this.props.updateList();
        });;
        this.setState({currentStyle: "none"})
        event.preventDefault();
    }

    render(){
        return(
            <React.Fragment>
                <div className="editor-popup" id={this.state.currentStyle} onClick={this.onChangeEditorPop.bind(this)}>
                    <div className="editor-text">
                    <textarea rows="10" cols="30" form="editor-form" value={this.state.note.text} onChange={e => this.onTodoChange(e.target.value)}></textarea>
                        <div className="editor-btns">
                            <form id="editor-form">
                                <input type="submit" onClick={this.onSubmitEdit.bind(this)}/>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Texteditor;