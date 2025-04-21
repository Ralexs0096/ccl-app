import { getSession } from '~/sessions.server';
import type { Route } from './+types/home-page';
import { redirect } from 'react-router';

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has('userId')) {
    return redirect('/auth/login');
  }
}

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p className="text-muted-foreground text-center">
          This is your homepage. Start building something amazing!
        </p>
      </div>
    </div>
  );
};

export default HomePage;
