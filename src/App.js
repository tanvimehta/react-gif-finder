import React, { useEffect, useState } from 'react';
import './App.css';
import Gif from './Gif/Gif';
import {saveAs} from 'file-saver';

const App = () => {

  const API_KEY = 'HJWTLY59W72I';

  const [gifs, setGif] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('random');
  const [limit, setLimit] = useState(20);
  const [pos, setPos] = useState(1);

  useEffect(() => {
    getGif();
  }, [query, pos])

  const getGif = async () => {
    const response = await fetch(`https://api.tenor.com/v1/search?q=${query}&key=${API_KEY}&limit=${limit}&pos=${pos}`);
    const data = await response.json();
    setGif(data.results);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setPos(1);
    setGif([]);
    setQuery(search);
    setSearch('');
  }

  const reload = () => {
    setPos(1);
    setQuery('random');
  }

  const loadMore = () => {
    let temp = limit + pos + 1;
    setPos(temp);
    setQuery(query);
    setGif([]);
    window.scrollTo(0, 0)
  }

  return (
    <div className="App">
      <header className="header">
        <h1 className="title" onClick={reload}>React GiF Finder</h1>
        <form onSubmit={getSearch} className="search-from">
          <input className="search-bar" type="text" value={search}
            onChange={updateSearch} placeholder="type here..." />
          <button className="search-button" type="submit">Search</button>
        </form>
        <p>showing results for <span>{query}</span></p>
      </header>
      {
        gifs.length === 20
          ?
          <div>
            <div className="gif">
              {gifs.map(gif => (
                <Gif
                  img={gif.media[0].tinygif.url}
                  key={gif.id}
                />
              ))}
            </div>
            <button className="load-button" onClick={loadMore}>Load more</button>
          </div>
          :<img src="https://i.pinimg.com/originals/a4/f2/cb/a4f2cb80ff2ae2772e80bf30e9d78d4c.gif" alt="loader-icon"/>
      }
    </div>
  );
}

export default App;
