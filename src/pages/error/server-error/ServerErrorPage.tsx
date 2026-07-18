interface ServerErrorPageProps {
  errorMessage?: string;
}

export const ServerErrorPage: React.FC<ServerErrorPageProps> = ({
  errorMessage,
}) => {
  return (
    <div className='flex min-h-screen min-w-screen items-center justify-center bg-gray-50'>
      <div className='rounded-lg bg-white p-6 text-center shadow-lg'>
        <h1 className='text-5xl font-extrabold text-red-400'>500</h1>
        <p className='mt-4 text-lg text-gray-600'>
          Oops! Something went wrong.
        </p>

        {/* Conditionally render the error message if it exists */}
        {errorMessage && (
          <p className='mt-4 text-lg font-semibold text-red-500'>
            {errorMessage}
          </p>
        )}

        <div className='mt-6'>
          <a
            href='/'
            className='mt-4 rounded-lg bg-blue-200 px-6 py-2 text-gray-800 transition hover:bg-blue-300'
          >
            Go Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServerErrorPage;
