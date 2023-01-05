import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [quotes, setQuotes] = useState([{quote: '', author: '' }]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchQuote = async () => {
        try {
            const res = await fetch(
            'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json'
            );
            const data = await res.json();
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomQuote = data[randomIndex];
            
            setQuotes([{ quote: randomQuote.quote, author: randomQuote.author }, ...quotes]);
            setCurrentIndex(0);
        }
        catch(error) {
            console.error(error);
        }
    };

    const displayPrevQuote = () => {
        if (currentIndex < quotes.length - 2) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const displayNextQuote = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    useEffect(() => {
        fetchQuote();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="app">
            <div className="card">
                <h1 className="heading">{quotes[currentIndex].quote}</h1>
                <h2 className="author">{quotes[currentIndex].author}</h2>
                <div className="btn_wrapper">
                    <button className="button" onClick={displayPrevQuote}>
                        <span>Previous</span>
                    </button>
                    <button className="button" onClick={fetchQuote}>
                        <span>New</span>
                    </button>
                    <button className="button" onClick={displayNextQuote}>
                        <span>Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
