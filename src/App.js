import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";
import classNames from "classnames";

import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
import GamePage from "./routes/GamePage";
import HomePage from "./routes/HomePage";
import AboutPage from "./routes/AboutPage";
import ContactPage from "./routes/ContactPage";
import NotFoundPage from "./routes/NotFound";

import styles from "./styles.module.css";

const App = () => {
  const match = useRouteMatch("/");
  const matchHome = useRouteMatch("/home");
  const isHomePage = (!match && !matchHome) || (match && match.isExact) || (matchHome && matchHome.isExact);

  return (
    <Switch>
      <Route path="/404" component={NotFoundPage} />
      <Route>
        <>
          <MenuHeader bgActive={!isHomePage} />
          <div className={classNames(styles.wrap, { [styles.isHomePage]: isHomePage })}>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/home" component={HomePage} />
              <Route path="/game" component={GamePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />
              <Route render={() => <Redirect to="/404" />} />
            </Switch>
          </div>
          <Footer />
        </>
      </Route>
    </Switch>
  );
};

export default App;
