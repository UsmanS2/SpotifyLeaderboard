import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StatsGrid } from '../StatsGrid/StatsGrid';
import { StatsRing } from '../StatsRing/StatsRing';
import classes from './SongDetails.module.css'
import { Title, Text, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';


interface SongData {
  'Track': string;
  'Album Name': string;
  'Artist': string;
  'Release Date': string;
  'ISRC': string;
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

export function SongDetails() {
  const { id } = useParams<{ id: string }>();
  const [songData, setSongData] = useState<SongData | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`http://localhost:5001/api/songs/${id}`)
      .then(response => {
        setSongData(response.data);
      })
      .catch(error => {
        console.error('Error fetching song details:', error);
      });
  }, [id]);

  if (!songData) {
    return <div>Loading...</div>;
  }

  const statsGridData = [
    { title: 'Track', value: songData['Track'] },
    { title: 'Album Name', value: songData['Album Name'] },
    { title: 'Artist', value: songData['Artist'] },
    { title: 'Release Date', value: songData['Release Date'] },
    { title: 'ISRC', value: songData['ISRC'] },
    { title: 'All Time Rank', value: songData['All Time Rank'] },
    { title: 'Track Score', value: songData['Track Score'] },
    { title: 'Spotify Streams', value: songData['Spotify Streams'] },
    // { title: 'Spotify Playlist Count', value: songData['Spotify Playlist Count'] },
    // { title: 'Spotify Playlist Reach', value: songData['Spotify Playlist Reach'] },
    // { title: 'Spotify Popularity', value: songData['Spotify Popularity'] },
    { title: 'YouTube Views', value: songData['YouTube Views'] },
    // { title: 'YouTube Likes', value: songData['YouTube Likes'] },
    { title: 'TikTok Posts', value: songData['TikTok Posts'] },
    // { title: 'TikTok Likes', value: songData['TikTok Likes'] },
    // { title: 'TikTok Views', value: songData['TikTok Views'] },
    // { title: 'YouTube Playlist Reach', value: songData['YouTube Playlist Reach'] },
    { title: 'Apple Playlist Count', value: songData['Apple Music Playlist Count'] },
    // { title: 'AirPlay Spins', value: songData['AirPlay Spins'] },
    // { title: 'SiriusXM Spins', value: songData['SiriusXM Spins'] },
    // { title: 'Deezer Playlist Count', value: songData['Deezer Playlist Count'] },
    // { title: 'Deezer Playlist Reach', value: songData['Deezer Playlist Reach'] },
    // { title: 'Amazon Playlist Count', value: songData['Amazon Playlist Count'] },
    // { title: 'Pandora Streams', value: songData['Pandora Streams'] },
    // { title: 'Pandora Track Stations', value: songData['Pandora Track Stations'] },
    // { title: 'Soundcloud Streams', value: songData['Soundcloud Streams'] },
    // { title: 'Shazam Counts', value: songData['Shazam Counts'] },
    // { title: 'TIDAL Popularity', value: songData['TIDAL Popularity'] },
    { title: 'Explicit Track', value: songData['Explicit Track'] === '1' ? 'Yes' : 'No' },
  ];

  return (
    <div >
      {/* Back Button */}
      <Button variant="subtle" onClick={() => navigate('/')} ml={50} leftSection={<IconArrowLeft size={18} />}>
        Back to List
      </Button>
      <Title className={classes.title} ta="center" mt={10} mx={50} >
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
        {songData['Track']}
        </Text>
      </Title>
      <StatsGrid data={statsGridData} />
      <StatsRing
        spotifyStreams={songData['Spotify Streams']}
        youtubeViews={songData['YouTube Views']}
        tiktokPosts={songData['TikTok Posts']}
      />
    </div>
  );
}
