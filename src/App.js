import "./App.css";

import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [progress, setProgress] = useState(10);

  const setLoaderProgress = (progress) => {
    setProgress(progress);
  };

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar color="#f11946" height={3} progress={progress} />
        <Switch>
          <Route path="/" exact>
            <News
              setProgress={setLoaderProgress}
              key="genral"
              country="in"
              category="general"
            />
          </Route>
          <Route exact path="/business">
            <News
              setProgress={setLoaderProgress}
              key="business"
              country="in"
              category="business"
            />
          </Route>
          <Route exact path="/entertainment">
            <News
              setProgress={setLoaderProgress}
              key="entertainment"
              country="in"
              category="entertainment"
            />
          </Route>
          <Route exact path="/general">
            <News
              setProgress={setLoaderProgress}
              key="general"
              country="in"
              category="general"
            />
          </Route>
          <Route exact path="/health">
            <News
              setProgress={setLoaderProgress}
              key="health"
              country="in"
              category="health"
            />
          </Route>
          <Route exact path="/science">
            <News
              setProgress={setLoaderProgress}
              key="science"
              country="in"
              category="science"
            />
          </Route>
          <Route exact path="/sports">
            <News
              setProgress={setLoaderProgress}
              key="sports"
              country="in"
              category="sports"
            />
          </Route>
          <Route exact path="/technology">
            <News
              setProgress={setLoaderProgress}
              key="technology"
              country="in"
              category="technology"
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
