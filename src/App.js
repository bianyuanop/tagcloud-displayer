import './App.css';
import React, { Component, useState } from 'react';
import background from './assets/background.png';

const baseUrl = 'http://localhost:4000/get';

class WordImage extends Component {
  constructor(props) {
    super(props);

    var styles = {
      img: {
        height: '100%'
      },
      container: {
        height: '20%',
        position: 'absolute',
        transform: 'translate(' + window.innerWidth * Math.random() + 'px,' + window.innerHeight * 0.85 * Math.random() + 'px)',
        zIndex: '-1'
      }
    };
    this.state = {
      id: props.id,
      styles
    };
  }

  componentDidMount() {
    console.log(window.innerHeight, window.innerWidth);
    fetch(baseUrl + '/' + this.state.id, {
      method: 'GET',
      mode: 'cors'
    }).then(resp => {
      resp.json().then(v => {
        this.setState({
          dataurl: v.datauri
        })
      }).catch(e=>{
        console.log(e);
      })
    }).catch(e=> {
      console.log(e);
    })
  }

  render() {
    return (
      <div className="word-image" style={this.state.styles.container}>
        <img src={this.state.dataurl} alt={this.state.id} style={this.state.styles.img} />
      </div>
    )
  }
}


function App() {
  const [idx, setIdx] = useState([]);
  const [flag, setFlag] = useState(false);

  if(!flag) {
    fetch(baseUrl, {
      method: 'GET',
      mode: 'cors'
    }).then(resp => {
      resp.json().then(v => {
        let res = JSON.parse(v.idx);
        setIdx(res);
        setFlag(true);
      });
      setFlag(true);
    }).catch(e => {
      console.log(e);
    });
  }

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
      {idx.map(id => <WordImage id={id} key={id} /> )}
    </div>
  );
}


export default App;
