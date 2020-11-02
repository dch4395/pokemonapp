
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
    Button,
    Row,
    Col,
    Label
  } from "reactstrap";

import "../resources/style.css";
import ImageGallery from 'react-image-gallery';

import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";

import { Radar } from '@reactchartjs/react-chart.js';

import 'font-awesome/css/font-awesome.min.css';

const PokemonDetail = ({
    state, 
    pokemon,
    capitalize,
    pokeList,
    myPoke,
    catchPokemon
  }) => {

 
let pok = pokemon.pokemon;

let abilitites = [];
pok.abilities.map(item => {
    abilitites.push(<Button key={item.ability.name} className="marginButton abilitesButton cursorContext">{capitalize(item.ability.name)}</Button>);
})

let moves = [];
pok.moves.map(item => {
    moves.push(<Button key={item.move.name} className="marginButton movesButton cursorContext">{capitalize(item.move.name)}</Button>);
})

let types = [];
pok.types.map(item => {
    types.push(<Button key={item.type.name} className={item.type.name + 'Button' + ' marginButton cursorContext'}>{capitalize(item.type.name)}</Button>);
})

let images= [];
if(pok.sprites.front_default === null && pok.sprites.back_default === null && pok.sprites.front_shiny === null && pok.sprites.back_shiny === null){
    images= [{
        original: 'who_is_that_pokemon.png',
        thumbnail: 'Who Is That Pokemon',
        originalTitle: 'Who Is That Pokemon'
    }]
}else{
    images = [{
        original: pok.sprites.front_default,
        thumbnail: capitalize(pok.Name),
        originalTitle :capitalize(pok.Name),
    },{
        original: pok.sprites.back_default,
        thumbnail: capitalize(pok.Name),
        originalTitle :capitalize(pok.Name),
    },{
        original: pok.sprites.front_shiny,
        thumbnail: capitalize(pok.Name),
        originalTitle :capitalize(pok.Name),
    },{
        original: pok.sprites.back_shiny,
        thumbnail: capitalize(pok.Name),
        originalTitle :capitalize(pok.Name),
    }]
}

let label = [];
let data = [];
pok.stats.map(item => {{
    label.push(capitalize(item.stat.name));
    data.push(item.base_stat);
}})

const statDataRadar = {
    labels: label,
    datasets: [
        {
        label: 'Status',
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        },
    ],
}

const optionsRadar = {
    scale: {
      ticks: { beginAtZero: true },
    },
}

let pokeName = state.pokeName;
let isOwned = 0;

if(pokemon.myPokemon.length > 0){
    pokemon.myPokemon.map( item => {
        if(item.id === pok.id){
            pokeName = item.name;
            isOwned = 1;
        }
    })
}

let catchButton = "";
if(isOwned === 1){
    catchButton = <Col sm={12} md={12} lg={12} xl={12}>
        <Label>Owned</Label>
    </Col>
}else{
    catchButton = <Col sm={12} md={12} lg={12} xl={12}>
        <Button onClick={catchPokemon} className="buttonCatch">Catch <img src="pokemon.png" width="40px" alt="Catch"></img></Button>
    </Col>
}

let color = pok.color.name;
if(color === "white"){
    color = "#737675";
}
return(
    <div className="justify-content-md-center">
        <Col sm={12} md={12} lg={12} xl={12} className="topMargin">
            <h3 style={{color : color}}  className="pokemonName">{pokeName.toUpperCase()}</h3>
        </Col>
        
        {catchButton}
        
        <Col sm={12} md={12} lg={8} xl={8} className="topMargin">
            <Row>  
                <Col sm={12} md={6} lg={6} xl={6} className="topMargin imgGallery">
                    <ImageGallery 
                        items={images} 
                    />
                </Col>

                <Col sm={12} md={6} lg={6} xl={6} className="topMargin2"> 
                    <Col sm={12} md={12} lg={12} xl={12}>
                        <h5>Abilities</h5>
                        <p>{abilitites} </p> 
                        <hr style={{width:"20%"}} />
                    </Col>

                    <Col sm={12} md={12} lg={12} xl={12}>
                        <h5>Types</h5> 
                        <p>{types}</p>
                        <hr style={{width:"20%"}} />
                    </Col>
                    
                    <Col sm={12} md={12} lg={12} xl={12}>
                        <h5>Status</h5> 
                        <Radar 
                            data={statDataRadar} 
                            options={optionsRadar} 
                        />
                    </Col>
                </Col>

                <Col sm={12} md={12} lg={12} xl={12} className="topMargin2">
                    <h5>Moves</h5> 
                    <p>{moves}</p>
                </Col>

            </Row>
        </Col>
        
        
        <Col sm={12} md={12} lg={8} xl={8} className="topMargin">
            <Row>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} className="text-align-left">
                    <Button onClick={pokeList} className="buttonLink"><i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i> Pokemon List</Button>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} className="text-align-right">
                    <Button onClick={myPoke} className="buttonLink">My Pokemon <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i></Button>
                </Col>
            </Row>
        </Col>
        

    </div>
    )
};

export default PokemonDetail;