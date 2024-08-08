import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

interface Song {
  ISRC: string;
  'Track': string;
  Artist: string;
  'Album Name': string;
  'Release Date': string;
  'Spotify Streams': number;
  'YouTube Views': number;
  'TikTok Views': number;
  'Plays Over Time': Record<string, number>;
}

const SongDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<Song | null>(null);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5001/api/songs/${id}`)
      .then(response => {
        setSong(response.data);
        const playsOverTime = response.data['Plays Over Time'];
        const labels = Object.keys(playsOverTime);
        const data = Object.values(playsOverTime);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Plays Over Time',
              data,
              fill: false,
              backgroundColor: 'rgb(75, 192, 192)',
              borderColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });
      })
      .catch(error => {
        console.error('There was an error fetching the song details!', error);
      });
  }, [id]);

  return (
    <div>
      {song ? (
        <div>
          <h2>{song['Track']} by {song.Artist}</h2>
          <p>Album: {song['Album Name']}</p>
          <p>Release Date: {song['Release Date']}</p>
          <p>Spotify Streams: {song['Spotify Streams']}</p>
          <p>YouTube Views: {song['YouTube Views']}</p>
          <p>TikTok Views: {song['TikTok Views']}</p>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SongDetails;
