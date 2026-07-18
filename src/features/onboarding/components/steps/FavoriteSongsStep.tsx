import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Music, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { useOnboarding } from '../../hooks/useOnboarding';
import {
  type FavoriteSongsFormValues,
  favoriteSongsSchema,
} from '../../schemas/favoriteSongsSchema';

export const FavoriteSongsStep: React.FC = () => {
  const { favoriteSongs, saveFavoriteSongs, goBack } = useOnboarding();

  const [initialSongs] = useState(() =>
    favoriteSongs.length > 0
      ? favoriteSongs
      : [{ id: crypto.randomUUID(), title: '', artist: '' }],
  );

  const form = useForm<FavoriteSongsFormValues>({
    resolver: zodResolver(favoriteSongsSchema),
    defaultValues: { songs: initialSongs },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'songs',
  });

  const onSubmit = (values: FavoriteSongsFormValues) => {
    saveFavoriteSongs(values.songs);
  };

  const { isSubmitting } = form.formState;

  return (
    <div>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold tracking-tight'>Favourite Songs</h2>
        <p className='mt-1 text-muted-foreground'>
          Add songs you love — at least one is required.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            void form.handleSubmit(onSubmit)(e);
          }}
          className='space-y-4'
          noValidate
        >
          <div className='space-y-3'>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className='group relative rounded-lg border border-border bg-card p-4'
              >
                <div className='mb-3 flex items-center justify-between'>
                  <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                    <Music className='h-3.5 w-3.5' />
                    Song {index + 1}
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='h-7 w-7 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive'
                      onClick={() => {
                        remove(index);
                      }}
                      aria-label={`Remove song ${String(index + 1)}`}
                    >
                      <Trash2 className='h-3.5 w-3.5' />
                    </Button>
                  )}
                </div>

                <div className='grid gap-3 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name={`songs.${index}.title`}
                    render={({ field: titleField }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            {...titleField}
                            placeholder='Bohemian Rhapsody'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`songs.${index}.artist`}
                    render={({ field: artistField }) => (
                      <FormItem>
                        <FormLabel>Artist</FormLabel>
                        <FormControl>
                          <Input {...artistField} placeholder='Queen' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Hidden id field — keeps the stable UUID */}
                <input type='hidden' {...form.register(`songs.${index}.id`)} />
              </div>
            ))}
          </div>

          {/* Root-level error (e.g. min 1 song) */}
          {form.formState.errors.songs?.root?.message && (
            <p className='text-xs font-medium text-destructive' role='alert'>
              {form.formState.errors.songs.root.message}
            </p>
          )}

          {/* Add Song */}
          <Button
            type='button'
            variant='outline'
            className='w-full'
            onClick={() => {
              append({ id: crypto.randomUUID(), title: '', artist: '' });
            }}
          >
            <Plus className='mr-2 h-4 w-4' />
            Add Song
          </Button>

          {/* Navigation */}
          <div className='flex justify-between pt-2'>
            <Button type='button' variant='outline' onClick={goBack}>
              Back
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting && <Loader2 className='animate-spin' />}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
