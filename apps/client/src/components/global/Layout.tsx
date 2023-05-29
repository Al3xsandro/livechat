import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <main className="w-full bg-white md:bg-black md:bg-opacity-10">
      <div className="mx-auto flex min-h-screen overflow-y-hidden">
        <Outlet />
      </div>
    </main>
  );
}
