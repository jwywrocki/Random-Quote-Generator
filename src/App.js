import React from "react";
import axios from "axios";

import './App.css';

let count = 1;

class App extends React.Component {
    state = { quote: '', author: '', rand:[]};
    componentDidMount() {
        console.log('COMPONENT DID MOUNT');
        this.fetchQuote();
    }
    prevQuote = () => {
        axios.get('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
        .then((response) => {
            console.log('prev_quote_id: ',this.state.rand);
            const { quote, author } = response.data[this.state.rand[count++]];
            this.setState({ quote, author })
        })
        .catch((error) => {
            console.log(error);
        })
    }
    fetchQuote = () => {
        axios.get('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
        .then((response) => {
            const rand = Math.floor((Math.random()*response.data.length));
            const { quote, author } = response.data[rand];
            this.setState({ quote, author })
            this.setState(state => ({
                rand: [rand, ...state.rand]
              }));
            count = 1;
            console.log('quote_id: ',rand);
            console.log(response.data[rand]);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        const { quote, author } = this.state;
        return (
            <div className = "app">
                <div className = "card">
                    <h1 className="heading">{quote}</h1>
                    <h2 className="author">{author}</h2>
                    <div className="btn_wrapper">
                        <button className="button" onClick={this.prevQuote}>
                            <span>Poprzedni</span>
                        </button>
                        <button className="button" onClick={this.fetchQuote}>
                            <span>Nowy cytat</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
} export default App;