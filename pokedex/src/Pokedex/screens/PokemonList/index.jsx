import React from "react";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import * as PokemonRepository from "../../../infra/repositories/PokemonRepository";
import "./index.css";

class PokemonList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      caught: PokemonRepository.getCaughtList(),
      pagination: { offset: 0, limit: 20 }
    };
  }
  async componentDidMount() {
    // de inicio obtenemos la primera pagina
    await this.retrieveNextPage();
  }
  nextPage = () => {
    // podemos calcular facilmente cual sera la siguiente pagina en base a sumar el limite al offset
    return {
      offset: this.state.pagination.offset + this.state.pagination.limit,
      limit: this.state.pagination.limit
    };
  };
  retrieveNextPage = async () => {
    const pokemons = await PokemonRepository.retrieve(this.state.pagination);
    this.setState({
      pokemons: [...this.state.pokemons, ...pokemons],
      pagination: this.nextPage() // actualizamos la siguiente pagina
    });
  };
  showPokemonDetails = pokemon => {
    // aqui haremos uso de las props inyectadas con 'withRouter' para mostrar la ficha
    this.props.history.push({
      pathname: "/details",
      state: { pokemon }
    });
  };
  switchCaughtState = pokemon => {
    if (PokemonRepository.isCaught(pokemon.id)) {
      PokemonRepository.setNotCaught(pokemon.id);
    } else {
      PokemonRepository.setCaught(pokemon.id);
    }

    return this.setState({ caught: PokemonRepository.getCaughtList() });
  };
  renderPokemonRow = pokemon => {
    return (
      <ListItem
        key={pokemon.id}
        button
        onClick={() => this.showPokemonDetails(pokemon)}
      >
        <ListItemAvatar>
          <Avatar
            alt={`Avatar ${pokemon.name}`}
            src={pokemon.sprites.front_default}
          />
        </ListItemAvatar>
        <ListItemText primary={pokemon.name} />
        <ListItemSecondaryAction>
          <Checkbox
            edge="end"
            onChange={() => this.switchCaughtState(pokemon)}
            checked={this.state.caught.some(id => pokemon.id === id)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    );
  };
  render() {
    return (
      <div className="PokemonList Column">
        <List dense>{this.state.pokemons.map(this.renderPokemonRow)}</List>
        <Button
          variant="contained"
          color="secondary"
          className="LoadMore"
          onClick={this.retrieveNextPage}
        >
          Siguiente
        </Button>
      </div>
    );
  }
}

/* al envolver con withRouter, nuestro componente tendra acceso a las props: 
{ match, location, history } que inyectara el router */
export default withRouter(PokemonList);
