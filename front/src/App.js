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
      editorPop: false
    }
  }

  componentDidMount(){
    this.updateList();
  }

  updateList(){
    api.get("notes/").then(res => {
      this.setState({list: res.data});
    }).catch(err => console.log(err));
  }

  onChangeEditor(editorPop){
    editorPop ? 
    this.setState({editorPop: false})
    :
    this.setState({editorPop: true})
  }

  onSelectNote(id){
    const fetchedList = this.state.list.find(val => {
      if(val.id === id){
        return val;
      }
      return null;
    })
    this.setState({
      selectedNote: fetchedList
    })
  }

  render(){
    return (
      <React.Fragment>
        <header>
          <div className="toolbar">
            <div className="app-title">React Notepad</div>
            <div className="app-options">
              <a href="/">New Notepad</a>
              <a href="https://github.com/BreakinAnt/react_notepad">Source Code</a>
            </div>
          </div>
        </header>

        <TextEditor editorShow={this.state.editorPop} fetchedNote={this.state.selectedNote}/>

        <div className="user-body">
            <Notelist list={this.state.list} clicked={this.onSelectNote.bind(this)}></Notelist>
            <TextPainel fetchedNote={this.state.selectedNote} clickedText={this.onChangeEditor.bind(this, this.state.editorPop)}></TextPainel>
        </div>
      </React.Fragment>
    );
    
  }
}

export default App;
