import React, { Component, PropTypes } from 'react';
import Service from './services';
import Page from './Page';

class Search extends Component {

    constructor (props) {
        super(props);
        this.state = {
            planetName: '',
            planets:[],
            error: '',
            selected: {},
            isLoading: false,
            showList: true
        }

    }

    handleSearch = (e) => {
        this.setState({
            planetName: e.target.value,
            isLoading: true,
            showList: false

        });
        Service.fetchPlanets(e.target.value).then( (resp) => {
            this.setState({
                isLoading: false,
            });
            const { results=[] } = resp;
            const sortedPlanets = results.sort( (a,b) => {
                const popA = isNaN(Number(a.population)) ? 0 : Number(a.population);
                const popB = isNaN(Number(b.population)) ? 0: Number(b.population);
                if(popA > popB) {
                    return -1;
                }
                return 1;
            });
            this.setState({
                planets: sortedPlanets,
                error: '',
                showList: true
            })
        }).catch((err) => {
            this.setState({
                error: err.message,
                isLoading: false,
                showList: false
            });
        });
    };

    handleFocus = () => {
        this.setState({
            showList: true
        })
    }

    onPlanetClick(planet) {
        this.setState({
            selected: planet,
            showList: false,
            planetName: planet.name
        })
    }

    render() {
        const {planetName, planets, error, selected, isLoading, showList} = this.state;

        return (
            <Page>
                <div className="searchContainer">
                    <div className="searchContRow searchErr">
                        {
                            error && <span className="error">{error}</span>
                        }
                    </div>
                    <div className="searchContRow searchMain">
                        <div className="typealong">
                            <label htmlFor="searchText">Search for Planets:</label>
                            <div className="typeBox">
                                {
                                    isLoading && <img className="loading" src="/Spinner.gif" alt="Loading..."/>
                                }
                                <input onFocus={this.handleFocus} id="searchText" type="text" value={planetName} placeholder="Start typing..." onChange={this.handleSearch}/>
                                <ul>
                                    {
                                        showList && planets.map((planet, i) => {
                                            return <li style={{fontSize: `${54-i*3}px`}}key={planet.name} onClick={ () => {this.onPlanetClick(planet)}}>{planet.name}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="planetInfo">
                            {
                                Object.keys(selected).length > 0 &&
                                <div className="infoList">
                                    <div>
                                        <span>Name:</span><span>{selected.name}</span>
                                    </div>
                                    <div>
                                        <span>Climate:</span><span>{selected.climate}</span>
                                    </div>
                                    <div>
                                        <span>Gravity:</span><span>{selected.gravity}</span>
                                    </div>
                                    <div>
                                        <span>Terrain:</span><span>{selected.terrain}</span>
                                    </div>
                                    <div>
                                        <span>Population:</span><span>{selected.population}</span>
                                    </div>
                                    <div>
                                        <span>Diameter:</span><span>{selected.diameter}</span>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}

export default Search;
