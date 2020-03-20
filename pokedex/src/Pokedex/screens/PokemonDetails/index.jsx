import React from "react";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import * as PokemonRepository from "../../../infra/repositories/PokemonRepository";
import "./index.css";

class PokemonDetails extends React.Component {
  renderAvatar = () => {
    const { pokemon } = this.props.location.state; // accedemos al campo pokemon que hemos pasado por el estado de la navegacion
    return (
      <Avatar
        alt={pokemon.name}
        src={pokemon.sprites.front_default}
        className="Avatar"
      />
    );
  };
  renderPokemonTypesLabel = () => {
    // aqui vamos a reducir el array de tipos para mostrar un solo string separado por '/'

    const { pokemon } = this.props.location.state; // accedemos al campo pokemon que hemos pasado por el estado de la navegacion
    const { types } = pokemon;

    return types.reduce((acc, next) => {
      if (acc !== "") {
        return `${acc}/${next.type.name}`;
      }
      return next.type.name;
    }, "");
  };
  renderInfoTable = () => {
    // accedemos al campo pokemon que hemos pasado por el estado de la navegacion
    const { pokemon } = this.props.location.state;
    return (
      <div className="Column">
        <Typography variant="h6">Info</Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Orden</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipos</TableCell>
                <TableCell>Peso</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  #{pokemon.order}
                </TableCell>
                <TableCell component="th" scope="row">
                  {pokemon.name}
                </TableCell>
                <TableCell>{this.renderPokemonTypesLabel()}</TableCell>
                <TableCell>{pokemon.weight}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  renderStatsTable = () => {
    // accedemos al campo pokemon que hemos pasado por el estado de la navegacion
    const { pokemon } = this.props.location.state;
    const { stats } = pokemon;
    return (
      <div className="Column">
        <Typography variant="h6">Stats</Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Speed</TableCell>
                <TableCell>Special-Defense</TableCell>
                <TableCell>Special-attack</TableCell>
                <TableCell>Defense</TableCell>
                <TableCell>Attack</TableCell>
                <TableCell>Health Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  {stats.find(({ stat }) => stat.name === "speed").base_stat}
                </TableCell>
                <TableCell component="th" scope="row">
                  {
                    stats.find(({ stat }) => stat.name === "special-defense")
                      .base_stat
                  }
                </TableCell>
                <TableCell component="th" scope="row">
                  {
                    stats.find(({ stat }) => stat.name === "special-attack")
                      .base_stat
                  }
                </TableCell>
                <TableCell component="th" scope="row">
                  {stats.find(({ stat }) => stat.name === "defense").base_stat}
                </TableCell>
                <TableCell component="th" scope="row">
                  {stats.find(({ stat }) => stat.name === "attack").base_stat}
                </TableCell>
                <TableCell component="th" scope="row">
                  {stats.find(({ stat }) => stat.name === "hp").base_stat}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  renderCaught = () => {
    const { pokemon } = this.props.location.state;

    if (PokemonRepository.isCaught(pokemon.id)) {
      return (
        <Avatar className="CaughtAvatar">
          <Check />
        </Avatar>
      );
    }

    return (
      <Avatar className="NotCaughtAvatar">
        <Close />
      </Avatar>
    );
  };
  render() {
    return (
      <div className="Column PokemonDetails">
        <div className="Row AvatarRow">{this.renderAvatar()}</div>
        <div className="Row InfoTableRow">{this.renderInfoTable()}</div>
        <div className="Row StatsTableRow">{this.renderStatsTable()}</div>
        <div className="Row">{this.renderCaught()}</div>
      </div>
    );
  }
}

export default withRouter(PokemonDetails);
