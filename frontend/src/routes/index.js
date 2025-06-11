import Home from '../pages/Home';
import Weather from '../pages/Weather';
import About from '../pages/About';
import AudioEditor from '../pages/AudioEditor';
import EntergyOutage from '../pages/EntergyOutage';
import Traffiq from '../pages/Traffiq';
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
    path: "/radio",
    element: <DjGregoRadio />
  },
  {
    path: "/about",
    element: <About />
  },
];