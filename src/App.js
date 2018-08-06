import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import "bootswatch/dist/journal/bootstrap.css";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './style.css';
import './App.css';
import Form from './Form'

import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap/es";

const PLACES = [
  { name: "Delhi", zip: "110003" }

];
class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=d9fed90cc78b3ebe2e3a9a0e581b76ec&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    
  }
  state={
    activePlace: 0,
   fields:{}
  };
  onChange = updatedValue => {
   this.setState({fields:{
     ...this.state.fields,
     ...updatedValue
    }
  });
  };
  render() {
    const activePlace = this.state.activePlace;
    return (
      
      <MuiThemeProvider>
      <div className="App">
       <Form onChange={fields =>this.onChange(fields)} />
       <p className={styles.p} >{JSON.stringify(this.state.fields,null,2)}</p>
       <div>
    
      <Grid className={styles.contentNavbar}>
        <Row>
          <Col md={4} sm={4}>
          
          </Col>
          <Col md={8} sm={8}>
            <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
          </Col>
        </Row>
      </Grid>
    </div>
      </div>
      </MuiThemeProvider>
     
    );
  }
}

export default App;
