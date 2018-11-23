import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Dropdown from './components/Dropdown';
import Stats from './components/Stats';

class App extends Component {

  state = {
    searchVal: '',
    summoner: null,
    matches: null,
    matchData: null,
    error: false
  }

  searchValHandler(event) {
    this.setState({ searchVal: event.target.value })
  }

  searchSummonerHandler = async () => {
    try {
      const summoner = await axios.get('/getSummonerByName/' + this.state.searchVal)
      const matches = await axios.get('/getSummonerMatches/' + summoner.data.accountId);
      this.setState({ summoner: summoner.data, matches: matches.data, error: false })

    } catch (e) {
      this.setState({ error: true })
      console.log(e);
    }
  }

  matchSelectHandler = async (event) => {
    const match = await axios.get('/getMatchById/' + event.target.value + '/' + this.state.summoner.accountId);
    console.log(match);
    this.setState({ matchData: match.data })
  }



  render() {
    let error;
    if (this.state.error) {
      error = <p>There was an unexpected error. Please try again.</p>
    }

    let summoner;
    if (this.state.summoner) {
      summoner = <h5>Summoner Name: {this.state.summoner.name}</h5>
    }



    return (
      <div className="App">
        <div>
          <input maxLength="16" onChange={(event) => this.searchValHandler(event)} placeholder="Search Summoner" />

          <button onClick={this.searchSummonerHandler}>Search</button>
          {error}

          <Dropdown matches={this.state.matches} changed={this.matchSelectHandler} />
          {summoner}
          <Stats matchData={this.state.matchData} />

        </div>
      </div>
    );
  }
}

export default App;