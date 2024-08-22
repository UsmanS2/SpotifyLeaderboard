import React from 'react';
import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
  IconMusic,
  IconAlbum,
  IconUser,
  IconCalendarEvent,
  IconBarcode,
  IconStar,
  IconChartLine,
  IconBroadcast,
  IconVideo,
  IconBrandTiktok,
  IconPlaylist,
  IconMicroscope,
} from '@tabler/icons-react';
import classes from './StatsGrid.module.css';

const icons = {
  Track: IconMusic,
  'Album Name': IconAlbum,
  Artist: IconUser,
  'Release Date': IconCalendarEvent,
  ISRC: IconBarcode,
  'All Time Rank': IconStar,
  'Track Score': IconChartLine,
  'Spotify Streams': IconBroadcast,
//   'Spotify Playlist Count': IconPlaylistAdd,
//   'Spotify Playlist Reach': IconBroadcast,
//   'Spotify Popularity': IconHeart,
  'YouTube Views': IconVideo,
//   'YouTube Likes': IconThumbUp,
  'TikTok Posts': IconBrandTiktok,
//   'TikTok Likes': IconHeart,
//   'TikTok Views': IconBroadcastOff,
//   'YouTube Playlist Reach': IconBroadcast,
  'Apple Playlist Count': IconPlaylist,
//   'AirPlay Spins': IconDisc,
//   'Deezer Playlist Count': IconPlaylist,
//   'Deezer Playlist Reach': IconBroadcast,
//   'Pandora Track Stations': IconMicroscope,
//   'Soundcloud Streams': IconBroadcast,
//   'TIDAL Popularity': IconHeart,
  'Explicit Track': IconMicroscope,
};

interface SongDetail {
  title: string;
  value: string | number;
}

interface StatsGridProps {
  data: SongDetail[];
}

export function StatsGrid({ data }: StatsGridProps) {
  const stats = data.map((stat) => {
    const Icon = icons[stat.title as keyof typeof icons];

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group>
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
        </Group>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </div>
  );
}
