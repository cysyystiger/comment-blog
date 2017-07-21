import React, { Component } from 'react';
import Content from './content';
import Content2 from './content2';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { title:[]};
    this.contentSubmit = this.contentSubmit.bind(this);
    this.setCont2 = this.setCont2.bind(this);
    this.fetchData = this.fetchData.bind(this);

    let initial = [];
    axios.get('/api')
    .then((res) => {
      initial = res.data.title;
      this.setState({ title: initial });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  fetchData() {
    axios.get('/api')
    .then((res) => {
      const a = res.data.title;
      this.setState({ title: a });
    })
    .catch((err) => {
      console.log(err);
    })
  }
  contentSubmit(value) {
    axios.post('/api/content', {value:value})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    this.fetchData();
  }
  setCont2(cont2, cont) {
    axios.post('/api/content2', {cont2:cont2, cont:cont})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    this.fetchData();
  }
  renderContent=(arr)=>{
    return <ul>{arr.map(this.renderCont)}</ul>
  }
  renderCont=(obj)=>{return (
    <li key={obj.content}>
      <pre>{obj.content}</pre><span id="time">{obj.time}</span>
      <Content2 cont={obj.content} add={(cont2, cont)=>{this.setCont2(cont2, cont)}} />
    <ul>{obj.content2.map(this.renderCont2)}</ul>
    </li>);}
  renderCont2=(arr)=>{
    return <li key={arr.item}><pre>{arr.item}</pre><span id="time">{arr.time}</span></li>;
  }


  render() {
    return (
      <div>
        <Content
          contentSubmit={value => this.contentSubmit(value)}
        />
        {this.renderContent(this.state.title)}
      </div>
    );
  }
}
