
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
   Card,
   CardImg,
   CardBody,
   CardTitle,
   CardText,
   Col,
   Row,
   Button
} from "reactstrap";

import "../resources/style.css";

const MyPokemon = ({
    state, 
    pokemon,
    capitalize,
    releasePokemon,
    releaseAllPokemon,
    pokeList,
    pokeDetailById
  }) => {

    let myPokemonList = "";
    let list = [];
    let lastButton = "";

    if(pokemon.myPokemon.length > 0){
        pokemon.myPokemon.map(item => {
            let img = ""
            
            if(item.sprites.front_default !== null){
                img = item.sprites.front_default;
            }else{
                img = 'who_is_that_pokemon.png';
            }

            let types = [];
            item.types.map(item => {
                types.push(<Button key={item.type.name} className={item.type.name + 'Button' + ' marginButton cursorContext'}>{capitalize(item.type.name)}</Button>);
            })

            list.push( 
                <Col xs={12} sm={6} md={6} lg={4} xl={4} key={item.name}>
                    <Card className="cardMyPokemon">
                        <CardImg top width="100%" src={img} alt={item.name} onClick={(e) => pokeDetailById(e, item.id)}  className="cursorPointer"/>
                        <CardBody>
                        <CardTitle className="pokemonName cursorPointer" style={{color : item.color.name}} onClick={(e) => pokeDetailById(e, item.id)}>
                            {capitalize(item.name)} 
                            </CardTitle>
                        <CardText>{types}</CardText>
                        <Button className="buttonRelease" onClick={(e) => releasePokemon(e, item.id)}><i className="fa fa-times-circle" aria-hidden="true"></i> Release </Button>
                        </CardBody>
                    </Card>
                </Col>
            )
        })

        myPokemonList = <Row>{list}</Row>
        lastButton = <div className="topMargin2">
        <Button className="buttonLink" onClick={pokeList}>
            <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i> Explore Pokemon
        </Button>
        <Button className="buttonRelease buttonReleaseAll" onClick={releaseAllPokemon}>
            Release All <i className="fa fa-times-circle" aria-hidden="true"></i>
        </Button>
    </div>;;

    }else{
        myPokemonList = <center className="topMargin2">
                    You Have 0 Pokemon in Your List.
                </center>;
        lastButton = <div className="topMargin2">
                    <Button className="buttonLink" onClick={pokeList}>
                        <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i> Explore Pokemon
                    </Button>
                </div>;
    }

return(
    <div className="justify-content-md-center">
        <Col sm={12} md={12} lg={8} xl={6} className="bottomMargin">
            <h3 className="pokemonName topMargin">My Pokemon</h3>
            <Col sm={12} md={12} lg={12} sm={12} className="topMargin">
                {myPokemonList}
            </Col>
            <Col sm={12} md={12} lg={12} sm={12}>
                {lastButton}
            </Col>
        </Col>
    </div>
    );
};

export default MyPokemon;