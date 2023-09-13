import Assign1Main from "../pages/Assignment1/Assign1Main";
import Assign2Main from "../pages/Assignment2/Assign2Main";
import Assign3Main from "../pages/Assignment3/Assign3Main";
import { RouteType } from "./config";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import Home from "../pages/Home";

const assignNo = 1;
const appRoutes: RouteType[] = [
  {
    index: true,
    element: <Home />,
    state: "home"
  },
  {
    path: "/assignment1",
    element: <Assign1Main assignNo = {assignNo}/>,
    state: "assignment1",
    sidebarProps: {
      displayText: "Assignment 1",
      icon: <FormatListBulletedOutlinedIcon />
    }
  },
  {
    path: "/assignment2",
    element: <Assign2Main />,
    state: "assignment2",
    sidebarProps: {
      displayText: "Assignment 2",
      icon: <FormatListBulletedOutlinedIcon />
    }
  },
  {
    path: "/assignment3",
    element: <Assign3Main />,
    state: "assignment3",
    sidebarProps: {
      displayText: "Assignment 3",
      icon: <FormatListBulletedOutlinedIcon />
    }
  },
];

export default appRoutes;