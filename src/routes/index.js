import App from '../App';
import Child from '../components/route-static/Child';
import GrandChild from '../components/route-static/GrandChild';

const routes = [
  {
    path: "/",
    exact: true,
    component: App
  },
  {
    path: "/child/:id",
    component: Child,
    routes: [
      {
        path: "/child/:id/grand-child",
        component: GrandChild
      }
    ]
  }
];

export default routes;
