import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './DetailView.module.css';
import GardenDetail from '../../components/GardenDetail/GardenDetail';
import PlantCard from "../../components/PlantCard/PlantCard";
import GardenNav from "../../components/GardenNav/GardenNav";
import gardenCalls from "../../utils/API";

function DetailView ({userData, setUserData, match}) {

  const initialSearchValue = {
    plantSearch: '',
    searchParam: 'common_name'
  };
  const [garden, setGarden] = useState();
  const [addMenu, setAddMenu] = useState(false);
  const [search, setSearch] = useState(initialSearchValue);
  const [searchError, setSearchError] = useState(false);
  const [searchResults, setSearchResults] = useState([]);


  useEffect(()=>{
    try {
      for (const garden of userData.gardens){
        if (match){
          if (match.params.id === garden.garden._id){
            setGarden(garden.garden)
          }
        }
      }
    } catch (e) {
      console.log("Error from useEffect(DetailView.js):", e)
    }
  }, [userData])

  function onInputChange(event){
    const searchValues = search;
    searchValues[event.target.name] = event.target.value;
    setSearch(searchValues);
  }

  function onSearchSubmit(event){
    event.preventDefault();
    console.log("submitting", search)

    if (search.plantSearch.length > 0){
      gardenCalls.findPlant({searchValue:search.plantSearch, searchParam:search.searchParam}).then(data => {
        console.log(data)
        setSearchResults(data);
      });
    } else {
      setSearchError(true);
    }
    // setSearch(initialSearchValue);
    // setAddMenu(false);
    // event.target.reset();
    // setSearchError(false);
  }

  function resetForm(){

  }
  
  function onAddPlantPress(){
    if (addMenu){
      setAddMenu(false);
    } else {
      setAddMenu(true);
    }
  }

  function onAddMenuCancel(event) {
    event.preventDefault();
    event.target.reset();
    setSearch(initialSearchValue);
    setAddMenu(false);
    setSearchError(false);
  }

  return (
  <div className={styles.DetailView} data-testid="DetailView">
    <GardenNav garden={garden} addMenu={addMenu} onAddPlantPress={onAddPlantPress} onInputChange={onInputChange} onSearchSubmit={onSearchSubmit} onAddMenuCancel={onAddMenuCancel} searchResults={searchResults} searchError={searchError}/>
    <hr />
    <section id="gardenPlants">
      {garden && garden.garden.map(plant => {
        return <PlantCard plant={plant} key={plant._id}/>
      })}
    </section>
  </div>
)};
DetailView.propTypes = {};

DetailView.defaultProps = {};

export default DetailView;
