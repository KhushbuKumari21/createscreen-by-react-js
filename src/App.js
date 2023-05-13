import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        setShows(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>TV Shows</h1>
        </header>
        <div className="container">
          <Routes>
            <Route exact path="/">
              <div className="row">
                {shows.map(show => (
                  <div className="col-sm-4 mb-3" key={show.show.id}>
                    <div className="card">
                      <img src={show.show.image?.medium} className="card-img-top" alt={show.show.name} />
                      <div className="card-body">
                        <h5 className="card-title">{show.show.name}</h5>
                        <p className="card-text">{show.show.genres?.join(', ')}</p>
                        <Link to={`/shows/${show.show.id}`} className="btn btn-primary">Details</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Route>
            <Route path="/shows/:id">
              <ShowDetails />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function ShowDetails() {
  const [show, setShow] = useState(null);

  useEffect(() => {
    const id = window.location.pathname.split('/shows/')[1];
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then(response => {
        setShow(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={show.image?.medium} className="img-fluid rounded-start" alt={show.name} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{show.name}</h5>
            <p className="card-text">{show.summary?.replace(/<[^>]+>/g, '')}</p>
            <button className="btn btn-primary" onClick={() => { alert('Booking form will be shown here'); }}>Book a ticket</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
