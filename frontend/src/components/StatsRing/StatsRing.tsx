import React from 'react';
import { RingProgress, Text, SimpleGrid, Paper, Center, Group, rem } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';

interface StreamingData {
  label: string;
  stats: number;
  progress: number;
  color: string;
  icon: 'up';
}

interface StatsRingProps {
  spotifyStreams: number | string;
  youtubeViews: number | string;
  tiktokPosts: number | string;
}

export function StatsRing({ spotifyStreams, youtubeViews, tiktokPosts }: StatsRingProps) {
  // Ensure all values are numbers
  const spotify = typeof spotifyStreams === 'string' ? parseInt(spotifyStreams, 10) : spotifyStreams;
  const youtube = typeof youtubeViews === 'string' ? parseInt(youtubeViews, 10) : youtubeViews;
  const tiktok = typeof tiktokPosts === 'string' ? parseInt(tiktokPosts, 10) : tiktokPosts;

  // Debugging logs to check the values
  console.log('Spotify Streams:', spotify);
  console.log('YouTube Views:', youtube);
  console.log('TikTok Posts:', tiktok);

  const totalStreams = spotify + youtube + tiktok;

  console.log('Total Streams:', totalStreams); // Check the total after summing

  const data: StreamingData[] = [
    {
      label: 'Spotify Streams',
      stats: spotify,
      progress: totalStreams > 0 ? (spotify / totalStreams) * 100 : 0,
      color: 'teal',
      icon: 'up',
    },
    {
      label: 'YouTube Views',
      stats: youtube,
      progress: totalStreams > 0 ? (youtube / totalStreams) * 100 : 0,
      color: 'blue',
      icon: 'up',
    },
    {
      label: 'TikTok Posts',
      stats: tiktok,
      progress: totalStreams > 0 ? (tiktok / totalStreams) * 100 : 0,
      color: 'red',
      icon: 'up',
    },
  ];

  const stats = data.map((stat) => {
    const Icon = IconArrowUpRight;
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
              </Center>
            }
          />

          <div>
            <Text c="dimmed" size="xs" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="xl">
              {stat.stats.toLocaleString()} million{/* Formats the number with commas */}
            </Text>
            <Text c={stat.color} fw={700} size="sm">
              {stat.progress.toFixed(2)}%
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  return <SimpleGrid p={50} cols={{ base: 1, sm: 2, md: 3 }}>{stats}</SimpleGrid>;
}
