import express from 'express';
import cors from 'cors';
import fs from 'fs';
import csv from 'csv-parser';

const app = express();
app.use(cors());

interface Song {
  ISRC: string;
  'Track Name': string;
  'Album Name': string;
  Artist: string;
  'Release Date': string;
  'All Time Rank': number;
  'Track Score': number;
  'Spotify Streams': number;
  'Spotify Playlist Count': number;
  'Spotify Playlist Reach': number;
  'Spotify Popularity': number;
  'YouTube Views': number;
  'YouTube Likes': number;
  'TikTok Posts': number;
  'TikTok Likes': number;
  'TikTok Views': number;
  'YouTube Playlist Reach': number;
  'Apple Music Playlist Count': number;
  'AirPlay Spins': number;
  'SiriusXM Spins': number;
  'Deezer Playlist Count': number;
  'Deezer Playlist Reach': number;
  'Amazon Playlist Count': number;
  'Pandora Streams': number;
  'Pandora Track Stations': number;
  'Soundcloud Streams': number;
  'Shazam Counts': number;
  'TIDAL Popularity': number;
  'Explicit Track': string;
}

let songs: Song[] = [];

fs.createReadStream('./data/Most Streamed Spotify Songs 2024.csv')
  .pipe(csv())
  .on('data', (row) => {
    songs.push(row as Song);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

app.get('/api/songs', (req, res) => {
  const top50 = songs.sort((a, b) => b['Spotify Streams'] - a['Spotify Streams']).slice(0, 50);
  res.json(top50);
});

app.get('/api/songs/:id', (req, res) => {
  const song = songs.find(s => s.ISRC === req.params.id);
  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ message: 'Song not found' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
