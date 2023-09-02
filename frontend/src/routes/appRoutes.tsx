import Assign1Main from "../pages/Assignment1/Assign1Main";
import Assign2 from "../pages/Assignment2/Assign2";
import { RouteType } from "./config";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import Home from "../pages/Home";

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <Home />,
    state: "home"
  },
  {
    path: "/assignment1",
    element: <Assign1Main />,
    state: "assignment1",
    sidebarProps: {
      displayText: "Assignment 1",
      icon: <FormatListBulletedOutlinedIcon />
    }
  },
  {
    path: "/assignment2",
    element: <Assign2 />,
    state: "assignment2",
    sidebarProps: {
      displayText: "Assignment 2",
      icon: <FormatListBulletedOutlinedIcon />
    }
  }
];

export default appRoutes;