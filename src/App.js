import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import { Container } from "@mui/material";
import Trending from "./Pages/Trending/Trending";
import Movies from "./Pages/Moviess/Moviess";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
            
          </Switch>
        </Container>
      </div>

      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
