import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import './App.css';

const apiKey = '6d092bf1a0565b78d624c7da781eca63'
const url = 'http://api.petfinder.com/'
const findPetURL = url + 'pet.find'

class App extends Component {
  constructor() {
    super();
    this.state = {
      shelter: [],
      input: '',
      pets: []
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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
          animal: 'dog',
          size: 'S',
          sex: 'M',
          location: 'L4J5Z1',
          age: 'Adult',
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
          <h1>Simple Adopt</h1>
          <p>Find your favourite pets at your nearest local shelter</p>
        </header>
        {/* HEADER END */}

        {/* FORM START */}
       <section className="form">
        <div className="wrapper">
          <form onSubmit={this.handleSubmit}>
            <select>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>

            <select>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </select>

            <select>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>

            <select>
              <option value="Baby">Baby</option>
              <option value="Young">Young</option>
              <option value="Adult">Adult</option>
              <option value="Senior">Senior</option>
            </select>

            <input type="text" />

            <button>Submit</button>
          </form>
        </div>
       </section>
      {/* FORM END */}


      {/* RESULTS START */}
       <section className="results">
        <div className="wrapper">
          {this.state.pets.map(pet => {
            return (
              <div className="pet" key={pet.id.$t}>
                <h2>{pet.name.$t}</h2>
                <p>Location: {pet.contact.address1.$t}, {pet.contact.city.$t}</p>
                <img src={pet.media.photos.photo[2].$t} />
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
