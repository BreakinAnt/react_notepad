import './App.css';
import React, { Component } from 'react';

import Notelist from './components/notelist';
import TextPainel from './components/textpainel';
import TextEditor from './components/texteditor';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      list: [
        {
          id: 1,
          title: 'placeholder title a',
          text: 'placeholder text a',
          author: 'placeholder author a',
          date: new Date().toDateString()
        },
        {
          id: 2,
          title: 'placeholder title b',
          text: 'placeholder text b',
          author: 'placeholder author b',
          date: new Date().toDateString()
        },
        {
          id: 3,
          title: 'placeholder title c',
          text: 'placeholder text c',
          author: 'placeholder author c',
          date: new Date().toDateString()
        }
      ],

      selectedNote: false,

      editorPop: false
    }
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
              <a href="https://github.com/">Source Code</a>
            </div>
          </div>
        </header>

        <TextEditor editorShow={this.state.editorPop} fetchedNote={this.state.selectedNote}/>

        <div className="userBody">
          <Notelist list={this.state.list} clicked={this.onSelectNote.bind(this)}></Notelist>
          <TextPainel fetchedNote={this.state.selectedNote} clickedText={this.onChangeEditor.bind(this, this.state.editorPop)}></TextPainel>
        </div>
      </React.Fragment>
    );
    
  }
}

export default App;
