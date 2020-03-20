import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PokemonList from "./screens/PokemonList";
import PokemonDetails from "./screens/PokemonDetails";
import NotFound from "./screens/NotFound";

class Pokedex extends React.Component {
  render() {
    return (
      <Router>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6">Pokedex</Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" component={PokemonList} />
          <Route exact path="/details" component={PokemonDetails} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default Pokedex;
