import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Grid, Text } from '@mantine/core';

interface Song {
  id: string;
  track: string;
  artist: string;
  streams?: number | null;
}

interface SongListProps {
  songs: Song[];
}

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return 'var(--mantine-rank-gold)'; // Gold
    case 2:
      return 'var(--mantine-rank-silver)'; // Silver
    case 3:
      return 'var(--mantine-rank-bronze)'; // Bronze
    default:
      return 'inherit'; // Default color
  }
};

export function SongList({ songs }: SongListProps) {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    if (id) {
      navigate(`/song/${id}`);
    } else {
      console.error('No ID found for the selected song');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Labels Row */}
      <Grid align="center">
        <Grid.Col span={1}>
          <Text size="md" ta="center">Rank</Text>
        </Grid.Col>
        <Grid.Col span={5}>
          <Text size="md" ta="left">Track</Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text size="md" ta="left">Artist</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text size="md" ta="right">Spotify Streams (millions)</Text>
        </Grid.Col>
      </Grid>

      {/* Songs List */}
      {songs.map((song, index) => (
        
        <Card
          key={song.id}
          onClick={() => handleCardClick(song.id)}
          withBorder
          shadow="sm"
          radius="md"
          p="lg"
          mt="md"
          style={{ cursor: 'pointer', width: '100%' }}
        >
          <Grid align="center">
            {/* Rank (based on index + 1) */}
            <Grid.Col span={1}>
              <Text size="lg" ta="center" style={{ color: getRankColor(index + 1) }}>
                {index + 1}
              </Text>
              {/* {song.id ? <Text>{song.id}</Text> : <Text>No song id</Text>} */}
            </Grid.Col>

            {/* Track Name */}
            <Grid.Col span={5}>
              <Text size="md" ta="left">
                {song.track}
              </Text>
            </Grid.Col>

            {/* Artist Name */}
            <Grid.Col span={4}>
              <Text size="md" ta="left">
                {song.artist}
              </Text>
            </Grid.Col>

            {/* Spotify Streams */}
            <Grid.Col span={2}>
              <Text size="md" ta="right">
                {song.streams != null ? song.streams.toLocaleString() : 'N/A'}
              </Text>
            </Grid.Col>
          </Grid>
        </Card>
      ))}
    </div>
  );
}
