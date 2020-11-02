import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
    Row,
    Col,
    Button,
    Input,
    Alert 
} from "reactstrap";
import "../resources/style.css";
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';
import MyPokemon from './MyPokemon';

import { connect } from "react-redux";

import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import "bootstrap/dist/css/bootstrap.css";

import * as pikachuLoader from "../pikachuLoader.json";
import * as pokeballLoader from "../pokeballLoader.json";

import { ReuseModal } from "./Components/Modal";

import { 
    getPokemon,
    getPokemonDetail,
    addMyPokemon,
    releasePokemon,
    releaseAllPokemon,
    getPokemonDetailById
}from "../actions/pokemonActions";

class PokemonApp extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isDropdownOpen: false,
            dropdownSize: 10,  

            pokemonListPage: true,
            pokemonDetailPage: false,
            myPokemonPage: false,
            pokeballLoading: false,

            pokeName: "",

            modal: false,
            modalType: "",

            alert: false,
            visible: false
        }
        this.onChangePokemon = this.onChangePokemon.bind(this);
      }

    //  ComponentDidMount & ComponentDidUpdate 
    componentDidMount = () => {
        this.props.onGetPokemon(10, 1); //load page for the first time

        setTimeout(() => { //setting loader timer
            fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(json => this.setState({ done: true }));
            }, 1200);
            
        window.onbeforeunload = function() { //handler refresh
            return "";
        }.bind(this);
    };

    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.pokeballLoading === false && this.state.pokeballLoading === true){ //set time for loading page
            setTimeout(function() { 
                let rand = Math.random(); //random numb

                if(rand < 0.5){ // 50% probability of success
                    this.setState({
                        myPokemonPage: false,
                        pokemonListPage: false,
                        pokemonDetailPage: true,
                        pokeballLoading: false,

                        modal: true,
                        modalType: 'success'
                    })
                }else{
                    this.setState({
                        myPokemonPage: false,
                        pokemonListPage: false,
                        pokemonDetailPage: true,
                        pokeballLoading: false,

                        modal: true,
                        modalType: 'failed'
                    })
                }
            }.bind(this), 2000)
        }
        
        if(prevState.alert === false && this.state.alert === true){ //set time to clear the alert
            setTimeout(function() { 
                this.setState({
                    alert: false
                })
            }.bind(this), 2000)
        }
    };

    //Buttons
    pokeList = () => {
        if(this.state.pokeballLoading === false){
            this.setState({
                pokemonListPage: true,
                myPokemonPage: false,
                pokemonDetailPage: false,
                pokeballLoading: false,
            })
        }
    }

    myPoke = () => {
        this.setState({
            myPokemonPage: true,
            pokemonListPage: false,
            pokemonDetailPage: false,
            pokeballLoading: false,
        })
    }

    pokeDetail = (e, url, name) => {
        this.setState({
            pokemonDetailPage: true,
            myPokemonPage: false,
            pokemonListPage: false,
            pokeballLoading: false,
            pokeName: this.capitalize(name)
        })
        this.props.onGetPokemonDetail(name);
    }

    pokeDetailById = (e, id) => {
        this.setState({
            pokemonDetailPage: true,
            myPokemonPage: false,
            pokemonListPage: false,
            pokeballLoading: false,
        })
        this.props.onGetPokemonDetailById(id);
    }

    //Functions 
    dropdownToggle = () => {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        })
    }

    handleSizePerPageChange = event => {
        var filter = "";
        this.setState({ 
            dropdownSize: event.target.innerText,
        });
        this.props.onGetPokemon(event.target.innerText, 1, filter);
    }

    handleTableChange = (
        type,
        { page, sizePerPage, filters, sortField, sortOrder }
        ) => {
        const currentIndex = (page - 1) * sizePerPage;

        let filter = "";
        const length = Object.keys(filters).length;
        let i = 1;
        for (const dataField in filters) {
            const { filterVal, filterType, comparator } = filters[dataField];

            filter += "&" + dataField + "=" + filterVal;
            i++;
        }

        if (sortField && sortOrder) {
            filter += "&sortBy=" + sortField + "&sortType=" + sortOrder;
        }
        this.props.onGetPokemon(sizePerPage, page, filter);
    };

    handleJumpToPageChange = e => {
        this.setState({ offset: e.target.value });
    };

    handleSubmitJumpToPage = () => {
        this.props.onGetPokemon(this.props.pokemon.limit, this.state.offset, this.state.filter);
    };

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    urlName = (cell, row, index) => {
        return <center><a onClick={(e) => this.pokeDetail(e, row.url, cell)} className="pokeUrl pokemonName"> {this.capitalize(cell)} </a></center>;
      };

    catchPokemon = () =>{
        this.setState({
            myPokemonPage: false,
            pokemonListPage: false,
            pokemonDetailPage: false,
            pokeballLoading: true,
        })
    }

    releasePokemon = (e, id) => {
        this.props.onReleasePokemon(id);
        this.setState({
            alert: true
        })
    }

    releaseAllPokemon = () => {
        this.props.onReleaseAllPokemon();
        this.setState({
            alert: true
        })
    }

    closeModal = () => {
        this.setState({
            modal: false,
            modalType: ""
        })
    }
    
    onChangePokemon = e => {
        e.preventDefault();
        this.setState({
            pokeName: e.target.value
        })
    }

    addPokemon = returnTo => {
        this.props.onAddMyPokemon(this.props.pokemon.pokemon, this.state.pokeName);
        if(returnTo === "pokemonlist"){
            this.pokeList();
        }else{
            this.myPoke();
        }
        this.setState({
            modal: false,
            modalType: ""
        })
    }

    render(){
        const columns = [
            {
                dataField: 'name',
                text: 'Pokemon Name',
                formatter: this.urlName,
                headerStyle: { textAlign: 'center' }
            }
        ];
        
        const pikachuLoaderOptions = {
            loop: true,
            autoplay: true,
            animationData: pikachuLoader.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            },
        }

        const pokeballLoaderOptions = {
            loop: true,
            autoplay: true,
            animationData: pokeballLoader.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            },
        }

        const doRender = () => {
            let topView = "";
            let header = "";
            header = <Col sm={12} xs={12} md={12} lg={12} xl={12}>
                    <a onClick={this.pokeList} className="navButton">
                        <img 
                            className="img-fluid pokemonLogo" 
                            src={'./pokemon_logo.png'} 
                            alt="logo"
                        /> 
                    </a>
                </Col>

            topView =  <div className="justify-content-md-center">
                            <Col sm={12} md={12} lg={8} xl={8} className="topMargin">
                                <Row>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6} className="text-align-right-header">
                                        <Button className="buttonLinkHeader" onClick={this.pokeList}>Pokemon List</Button>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6} className="text-align-left-header">
                                        <Button className="buttonLinkHeader" onClick={this.myPoke}>My Pokemon ({this.props.pokemon.myPokemon.length})</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </div>;

            if(this.state.pokemonListPage === true){
                let view = "";
                if(this.props.pokemon.isLoading === true){
                    view = <div>
                        {header}
                        <hr />
                        <FadeIn>
                            <div className="pikachuLoader d-flex justify-content-center align-items-center ">
                            <Lottie options={pikachuLoaderOptions} height={200} width={200} mt="2"/>
                            </div>
                        </FadeIn>
                        </div>
                }else{
                    view = <div className="topBottomMargin">
                            {header}
                            <hr />
                            {topView}
                            <PokemonList
                                state={this.state}
                                pokemon={this.props.pokemon}
                                dropdownToggle={this.dropdownToggle}
                                handleSizePerPageChange={this.handleSizePerPageChange}
                                columns={columns}
                                handleTableChange={this.handleTableChange}
                                handleJumpToPageChange={this.handleJumpToPageChange}
                                handleSubmitJumpToPage={this.handleSubmitJumpToPage}
                            />
                        </div>
                }
                return(
                    <center>
                        {view}
                    </center>
                )
            }else if(this.state.pokemonDetailPage === true){
                let view = "";
                if(this.props.pokemon.isLoading === true){
                    view = <div>
                        {header}
                        <hr />
                        <FadeIn>
                            <div className="pikachuLoader d-flex justify-content-center align-items-center ">
                            <Lottie options={pikachuLoaderOptions} height={150} width={150} mt="2"/>
                            </div>
                        </FadeIn>
                        </div>
                }else{
                    view = <div className="topBottomMargin">
                            {header}
                            <hr />
                            {topView}
                            <PokemonDetail
                                state={this.state}
                                pokemon={this.props.pokemon}
                                capitalize={this.capitalize}
                                pokeList={this.pokeList}
                                myPoke={this.myPoke}
                                catchPokemon={this.catchPokemon}
                            />
                        </div>
                }
                return(
                    <center>
                        {view}
                    </center>
                )
            }else if(this.state.myPokemonPage === true){
                return(
                    <center>
                        {header}
                        <hr />
                        {topView}
                        <MyPokemon
                            state={this.state}
                            pokemon={this.props.pokemon}
                            capitalize={this.capitalize}
                            releasePokemon={this.releasePokemon}
                            releaseAllPokemon={this.releaseAllPokemon}
                            pokeList={this.pokeList}
                            pokeDetailById={this.pokeDetailById}
                        />
                    </center>
                )
            } else if(this.state.pokeballLoading === true){
                let view = <div>
                    {header}
                    <hr />
                    <FadeIn>
                        <div className="pikachuLoader d-flex justify-content-center align-items-center ">
                            <Lottie options={pokeballLoaderOptions} height={200} width={200} mt="2"/>
                        </div>
                    </FadeIn>
                </div>

                return(
                    <center>
                        {view}
                    </center>
                )
            }
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                this.addPokemon('pokemonlist');
              }
        }

        const body = () => {
            if(this.state.modalType === 'success'){
                return <div>
                    <center>
                        <i className="fa fa-check-circle iAlert success" aria-hidden="true"></i>
                        <h5 className="topMargin">Gotcha !!</h5>
                        <p>You can change the name by renaming in the form below.</p>
                        <Input 
                            type='text' 
                            className='form-control'
                            style={{textAlign: "center", width: "80%"}}
                            name='pokeName' 
                            value={this.state.pokeName} 
                            onChange={this.onChangePokemon}
                            onKeyDown={handleKeyDown}
                        />
                        <Col sm={12} md={12} lg={12} xl={12} className="topMargin">
                            <Row>
                                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <Button onClick={(e) => this.addPokemon("pokemonlist")} className="buttonLink">Save, Pokemon List</Button>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <Button onClick={(e) => this.addPokemon("mypokemon")} className="buttonLink buttonLinkModal">Save, My Pokemon</Button>
                                </Col>
                            </Row>
                        </Col>
                    </center>
                </div>;
            }else{
                return <div>
                    <center>
                        <i className="fa fa-times-circle iAlert failed" aria-hidden="true"></i>
                        <h5 className="topMargin">Oh No !!</h5>
                        <h5>It was so close.</h5>
                        <Col sm={12} md={12} lg={12} xl={12} className="topMargin">
                            <Button onClick={this.closeModal} className="buttonLink">Catch Again</Button>
                        </Col>
                    </center>
                </div>;
            }
        }
        
        return(
            <div>
                {doRender()}

                <center>
                    <Col sm={12} xs={12} md={6} lg={6} xl={6}>
                        <Alert 
                            color="danger" 
                            isOpen={this.state.alert}
                        >        
                                Pokemon Released.
                        </Alert>
                    </Col>
                </center>
                
                <ReuseModal
                    isOpen={this.state.modal}
                    modalBody={body()}
                    size="l"
                />
                
            </div>
        )
    }

}

// export default PokemonApp;

const mapStateToProps = state => {
    return {
      pokemon: state.pokemon
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onGetPokemon: (limit, offset, filter) => dispatch(getPokemon(limit, offset, filter)),
        onGetPokemonDetail: name => dispatch(getPokemonDetail(name)),
        onAddMyPokemon: (pokemon, name) => dispatch(addMyPokemon(pokemon, name)),
        onReleasePokemon: id => dispatch(releasePokemon(id)),
        onReleaseAllPokemon: () => dispatch(releaseAllPokemon()),
        onGetPokemonDetailById: id => dispatch(getPokemonDetailById(id))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PokemonApp);