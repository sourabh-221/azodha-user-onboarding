import { z } from 'zod';

const songSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Song title is required'),
  artist: z.string().min(1, 'Artist name is required'),
});

export const favoriteSongsSchema = z.object({
  songs: z.array(songSchema).min(1, 'Please add at least one song'),
});

export type FavoriteSongsFormValues = z.infer<typeof favoriteSongsSchema>;
