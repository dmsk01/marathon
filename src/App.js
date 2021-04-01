import { useLocation, useRouteMatch, Route, Switch, Redirect } from "react-router-dom";
import classNames from "classnames";
import { NotificationContainer } from "react-notifications";

import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
import GamePage from "./routes/GamePage";
import HomePage from "./routes/HomePage";
import AboutPage from "./routes/AboutPage";
import ContactPage from "./routes/ContactPage";
import NotFoundPage from "./routes/NotFound";
import PrivateRoute from "./components/PrivateRoute";

import { FireBaseContext } from "./context/firebaseContext";

import styles from "./styles.module.css";
import "react-notifications/lib/notifications.css";
import Firebase from "./services/firebase";

const App = () => {
  const match = useRouteMatch("/");
  const isHomePage = match && match.isExact;

  const location = useLocation();
  const isPadding = location.pathname === "/" || location.pathname === "/game/board";

  return (
    <FireBaseContext.Provider value={new Firebase()}>
      <Switch>
        <Route path="/404" component={NotFoundPage} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding || !isHomePage} />
            <div className={classNames(styles.wrap, { [styles.isHomePage]: isPadding || isHomePage })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <PrivateRoute path="/game" component={GamePage} />
                <PrivateRoute path="/about" component={AboutPage} />
                <Route path="/contact" component={ContactPage} />
                <Route render={() => <Redirect to="/404" />} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer />
    </FireBaseContext.Provider>
  );
};

export default App;
