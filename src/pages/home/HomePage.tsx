import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '@/components';
import { logout } from '@/features/auth/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { ROUTES } from '@/shared/constants/app.constants';
import { CreditCard, LogOut, Music, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { username } = useAppSelector((s) => s.auth);
  const { personalProfile, favoriteSongs, paymentInfo } = useAppSelector(
    (s) => s.onboarding,
  );

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    void navigate(ROUTES.LOGIN, { replace: true });
  };

  /** Shows only the last 4 digits of the card number */
  const maskedCard = paymentInfo?.cardNumber
    ? `**** **** **** ${paymentInfo.cardNumber.slice(-4)}`
    : null;

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='border-b border-border bg-card'>
        <div className='mx-auto flex max-w-4xl items-center justify-between px-4 py-4'>
          <div className='flex items-center gap-3'>
            {personalProfile?.profilePicture ? (
              <img
                src={personalProfile.profilePicture}
                alt={personalProfile.name}
                className='h-9 w-9 rounded-full object-cover ring-2 ring-border'
              />
            ) : (
              <div className='flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground'>
                {(personalProfile?.name ?? username ?? '')
                  .charAt(0)
                  .toUpperCase() || 'U'}
              </div>
            )}
            <div>
              <p className='text-sm leading-tight font-semibold'>
                {personalProfile?.name ?? username ?? 'User'}
              </p>
              <p className='text-xs text-muted-foreground'>
                {personalProfile?.email ?? ''}
              </p>
            </div>
          </div>

          <Button variant='outline' size='sm' onClick={handleLogout}>
            <LogOut className='mr-1.5 h-3.5 w-3.5' />
            Log out
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className='mx-auto max-w-4xl px-4 py-10'>
        {/* Welcome */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Welcome
            {personalProfile?.name ? `, ${personalProfile.name}` : ''}!
          </h1>
          <p className='mt-2 text-muted-foreground'>
            Your onboarding is complete. Here's a summary of your profile.
          </p>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {/* Personal Profile card */}
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='flex items-center gap-2 text-base'>
                <User className='h-4 w-4' />
                Personal Profile
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-sm'>
              {personalProfile?.profilePicture && (
                <img
                  src={personalProfile.profilePicture}
                  alt='Profile'
                  className='mb-3 h-16 w-16 rounded-full object-cover'
                />
              )}
              <div>
                <span className='text-muted-foreground'>Name: </span>
                <span className='font-medium'>
                  {personalProfile?.name ?? '—'}
                </span>
              </div>
              <div>
                <span className='text-muted-foreground'>Age: </span>
                <span className='font-medium'>
                  {personalProfile?.age ?? '—'}
                </span>
              </div>
              <div>
                <span className='text-muted-foreground'>Email: </span>
                <span className='font-medium break-all'>
                  {personalProfile?.email ?? '—'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Favourite Songs card */}
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='flex items-center gap-2 text-base'>
                <Music className='h-4 w-4' />
                Favourite Songs
                <Badge variant='secondary' className='ml-auto'>
                  {favoriteSongs.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {favoriteSongs.length === 0 ? (
                <p className='text-sm text-muted-foreground'>No songs added.</p>
              ) : (
                <ul className='space-y-2'>
                  {favoriteSongs.slice(0, 5).map((song, idx) => (
                    <li key={song.id}>
                      {idx > 0 && <Separator className='mb-2' />}
                      <p className='text-sm leading-tight font-medium'>
                        {song.title}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {song.artist}
                      </p>
                    </li>
                  ))}
                  {favoriteSongs.length > 5 && (
                    <p className='text-xs text-muted-foreground'>
                      +{favoriteSongs.length - 5} more
                    </p>
                  )}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Payment card */}
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='flex items-center gap-2 text-base'>
                <CreditCard className='h-4 w-4' />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-sm'>
              <div>
                <span className='text-muted-foreground'>Name: </span>
                <span className='font-medium'>
                  {paymentInfo?.cardHolderName ?? '—'}
                </span>
              </div>
              <div>
                <span className='text-muted-foreground'>Card: </span>
                <span className='font-mono font-medium'>
                  {maskedCard ?? '—'}
                </span>
              </div>
              <div>
                <span className='text-muted-foreground'>Expires: </span>
                <span className='font-medium'>
                  {paymentInfo?.expiryDate ?? '—'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
