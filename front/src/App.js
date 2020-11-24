import './App.css';
import React, { Component } from 'react';

import Notelist from './components/notelist';
import TextPainel from './components/textpainel';
import TextEditor from './components/texteditor';
import api from './services/api';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      list: [ ],
      selectedNote: false,
      editorPop: false,
    }
  }

  componentDidMount(){
    this.updateList();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.list !== this.state.list){
      if(this.state.selectedNote.id){
        this.onSelectNote(this.state.selectedNote.id)
      }
    }
  }

  updateList(){
    api.get("notes/").then(res => {
      this.setState({list: res.data});
    }).catch(err => console.log(err));
  }

  createNote(){
    api.post("notes/", { author: "Add author name here!", text: "Click here and edit the text!", title: "Add title name here!", createdAt: new Date, updatedAt: new Date}).then(res =>{
      this.updateList();
    });
  }

  onChangeEditor(editorPop){
    editorPop ? 
    this.setState({editorPop: false})
    :
    this.setState({editorPop: true})
  }

  onSelectNote(id){
    api.get(`notes/${id}`).then(response => {
      this.setState({
        selectedNote: response.data
      })
    })
  }

  render(){
    return (
      <React.Fragment>
        <header>
          <div className="toolbar">
            <div className="app-title">React Notepad</div>
            <div className="app-options">
              <a onClick={this.createNote.bind(this)}>New Notepad</a>
              <a href="https://github.com/BreakinAnt/react_notepad">Source Code</a>
            </div>
          </div>
        </header>

        <TextEditor editorShow={this.state.editorPop} fetchedNote={this.state.selectedNote} updateList={this.updateList.bind(this)}/>
        <div className="user-body">        
            <Notelist list={this.state.list} clicked={this.onSelectNote.bind(this)}></Notelist>
            <TextPainel fetchedNote={this.state.selectedNote} clickedText={this.onChangeEditor.bind(this, this.state.editorPop)}></TextPainel>
        </div>
      </React.Fragment>
    );
    
  }
}

export default App;
