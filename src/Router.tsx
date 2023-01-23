import { ElementType, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader } from "./components/UI";

function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Home />} />
        <Route path="/playlist" element={<Playlist />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

const Home = Loadable(lazy(() => import("./pages/Home/Home")));
const Playlist = Loadable(lazy(() => import("./pages/Playlist/Playlist")));
const NotFound = Loadable(lazy(() => import("./pages/NotFound/NotFound")));

export default Router;
