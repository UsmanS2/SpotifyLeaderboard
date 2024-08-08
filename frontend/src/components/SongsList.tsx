import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Song {
  ISRC: string;
  'Track': string;
  Artist: string;
}

const SongsList: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/songs')
      .then(response => {
        setSongs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the songs!', error);
      });
  }, []);

  return (
    <div>
      <h1>Top 50 Spotify Songs</h1>
      <ul>
        {songs.map(song => (
          <li key={song.ISRC}>
            <Link to={`/song/${song.ISRC}`}>{song['Track']} by {song.Artist}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongsList;
