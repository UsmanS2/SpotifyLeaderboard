import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SongList } from '../SongsList/SongsList';

interface Song {
  id: string;
  rank: number;
  track: string;
  artist: string;
  streams?: number;
}

export function SongListContainer() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/songs')
      .then(response => {
        const transformedSongs = response.data.map((song: any) => ({
          id: song['ISRC'],
          rank: song['All Time Rank'],       // Assuming 'All Time Rank' is the rank
          track: song.Track,                 // Assuming 'Track' is the song name
          artist: song.Artist,               // Assuming 'Artist' is the artist name
          streams: song['Spotify Streams'],  // Assuming 'Spotify Streams' is the stream count
        }));

        setSongs(transformedSongs);
      })
      .catch(error => {
        console.error('Error fetching songs:', error);
      });
  }, []);

  return <SongList songs={songs} />;
}
