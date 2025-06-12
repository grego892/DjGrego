import Home from '../pages/Home';
import Weather from '../pages/Weather';
import About from '../pages/About';
import EntergyOutage from '../pages/EntergyOutage';
import Traffiq from '../pages/Traffiq';
import LogReader from '../pages/LogReader';
import AsRunReader from '../pages/AsRunReader';
import DebugReader from '../pages/DebugReader';
import Bird from '../pages/Bird';
import DjGregoRadio from '../pages/DjGregoRadio';


export const routes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/weather",
    element: <Weather />
  },
  {
    path: "/entergyoutage",
    element: <EntergyOutage />
  },
  {
    path: "/traffiq",
    element: <Traffiq />
  },
      {
    path: "/logreader",
    element: <LogReader />
  },
  {
    path: "/asrunreader",
    element: <AsRunReader />
  },
  {
    path: "/debugreader",
    element: <DebugReader />
  },
  {
    path: "/bird",
    element: <Bird />
  },
  {
    path: "/radio",
    element: <DjGregoRadio />
  },
  {
    path: "/about",
    element: <About />
  },
];