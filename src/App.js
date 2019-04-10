import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import { FaPaw } from 'react-icons/fa';
import './App.scss';

const apiKey = '6d092bf1a0565b78d624c7da781eca63'
const url = 'http://api.petfinder.com/'
const findPetURL = url + 'pet.find'

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      pets: [],
      type: 'dog',
      size: 'S',
      sex: 'M',
      age: 'Baby'
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getOption = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(e.target.name);
  }

  handleSubmit = e => {
    e.preventDefault();
    axios({
      url: 'https://proxy.hackeryou.com',
      dataResponse: 'json',
      method: 'GET',
      paramsSerializer: function (params) {
        return Qs.stringify(params, {
          arrayFormat: 'brackets'
        });
      },
      params: {
        reqUrl: findPetURL,
        params: {
          key: apiKey,
          animal: this.state.type,
          size: this.state.size,
          sex: this.state.sex,
          location: this.state.input,
          age: this.state.age,
          format: 'json'
        },
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }
    }).then((res) => {
      console.log(res.data.petfinder.pets.pet);
      const petsArray = res.data.petfinder.pets.pet;
      this.setState({
        pets: petsArray
      });
    });
  }

  render() {
    return (
      <div className="App">
        {/* HEADER START */}
        <header>
          <FaPaw className="icon"/>
          <h1>Simple Adopt</h1>
          <p>Find your favourite pets at your nearest local shelter</p>
        </header>
        {/* HEADER END */}

        {/* FORM START */}
       <section className="form">
        <div className="wrapper">
          <form onSubmit={this.handleSubmit}>

          <div className="selectdiv-container clearfix">
            <div className="selectdiv">
              <label>Type</label>
              <select name="type" onChange={this.getOption}>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </div>

            <div className="selectdiv">
              <label>Size</label>
              <select name="size" onChange={this.getOption}>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
              </select>
            </div>

            <div className="selectdiv">
              <label>Gender</label>
              <select name="sex" onChange={this.getOption}>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>

            <div className="selectdiv">
              <label>Age</label>
              <select name="age" onChange={this.getOption}>
                <option value="Baby">Baby</option>
                <option value="Young">Young</option>
                <option value="Adult">Adult</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>  
            <input type="text" placeholder="Please enter a postal code" required onChange={this.handleChange} name="input" />

            <button>Submit</button>
          
          </form>
        </div>
       </section>
      {/* FORM END */}


      {/* RESULTS START */}
       <section className="results">
        <div className="wrapper pets">
          {this.state.pets.map(pet => {
            return (
              <div className="pet" key={pet.id.$t}>
                <img src={pet.media.photos.photo[2].$t} align="top" />
              
                <div className="pet-info">
                  <h2>{pet.name.$t}</h2>
                  <p>Location: {pet.contact.address1.$t}, {pet.contact.city.$t}</p>
                </div>
              </div>
            )
          })}
        </div>
       </section>
       {/* RESULTS END */}
      </div>
    );
  }
}

export default App;
