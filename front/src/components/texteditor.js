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
            if(this.props.fetchedNote.text){
                this.setState({currentStyle: "block"})
            }
        }
    }

    onChangeEditorPop(body){
        if(body.target.value === undefined){
            this.setState({currentStyle: "none"});
        }
    }

    onTodoChange(targetName, targetValue) {
        switch(targetName){
            case 'text-title':
                this.setState({
                    note:{
                        ...this.state.note,
                        title: targetValue
                    }
                });
            break;
            case 'text-note':
                this.setState({
                    note:{
                        ...this.state.note,
                        text: targetValue
                    }
                });
            break;
            case 'text-author':
                this.setState({
                    note:{
                        ...this.state.note,
                        author: targetValue
                    }
                });
            break;
            default:
        }
 
    }

    onSubmitEdit(event){
        api.put(`notes/`, this.state.note).then(res => {
            this.props.updateList();
        });
        this.setState({currentStyle: "none"})
        event.preventDefault();
    }

    onDeleteEdit(event){
        api.delete(`notes/${this.state.note.id}`).then(res => {
            this.props.updateList();
        });
        this.setState({currentStyle: "none"});
        event.preventDefault();
    }

    render(){
        const hasNote = () => {
                if(this.state.note){
                    return <React.Fragment>
                        <input type="text" id="text-title" name="text-title"  onChange={e => this.onTodoChange(e.target.name, e.target.value)} value={this.state.note.title}></input>
                        <textarea rows="10" cols="30" id="text-note" name="text-note" form="editor-form" value={this.state.note.text} onChange={e => this.onTodoChange(e.target.name, e.target.value)}></textarea>
                        <input type="text" id="text-author" name="text-author"  onChange={e => this.onTodoChange(e.target.name, e.target.value)} value={this.state.note.author}></input>
                    </React.Fragment>
                }
                return <React.Fragment></React.Fragment>
        };

        return(
            <React.Fragment>
                <div className="editor-popup" id={this.state.currentStyle} onClick={this.onChangeEditorPop.bind(this)}>
                    <div className="editor-text">
                    {hasNote()}
                        <div className="editor-btns">
                            <form id="editor-form">
                                <button  type="submit" onClick={this.onSubmitEdit.bind(this)}>EDIT</button>
                                <button type="delete" onClick={this.onDeleteEdit.bind(this)}>DELETE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Texteditor;