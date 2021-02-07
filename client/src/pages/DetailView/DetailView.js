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
    searchParam: 'common_name',
    searching: false
  };
  const [garden, setGarden] = useState();
  const [addMenu, setAddMenu] = useState(false);
  const [search, setSearch] = useState(initialSearchValue);
  const [searchError, setSearchError] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPlant, setCurrentPlant] = useState();
  const [currentPlantDetails, setCurrentPlantDetails] = useState();

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
    setSearch({
      ...search,
      searching: true
    });

    if (search.plantSearch.length > 0){
      gardenCalls.findPlant({searchValue:search.plantSearch, searchParam:search.searchParam}).then(data => {
        console.log(data)
        setSearch({
         ...search,
         searching: false 
        })
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
    document.getElementById("plantSearch").value = "";
    setSearch(initialSearchValue);
    setAddMenu(false);
    setSearchError(false);
    setSearchResults([]);
  }
  
  function onAddPlantPress(){
    if (addMenu){
      setAddMenu(false);
      console.log(search);
    } else {
      setAddMenu(true);
      console.log(search);
    }
  }

  function addPlantToGarden(){

  }

  function onAddMenuCancel(event) {
    event.preventDefault();
    resetForm()
  }

  return (
  <div className={styles.DetailView} data-testid="DetailView">
    <GardenNav 
    garden={garden} 
    addMenu={addMenu} 
    onAddPlantPress={onAddPlantPress} 
    onInputChange={onInputChange} 
    onSearchSubmit={onSearchSubmit} 
    onAddMenuCancel={onAddMenuCancel} 
    searchResults={searchResults} 
    searchError={searchError} 
    currentPlant={currentPlant}
    setCurrentPlant={setCurrentPlant}
    currentPlantDetails={currentPlantDetails}
    setCurrentPlantDetails={setCurrentPlantDetails}
    search={search}
    />
    <section className={styles.GardenPlants}>
      {garden && garden.garden.map(plant => {
        return <PlantCard plant={plant} key={plant._id}/>
      })}
    </section>
  </div>
)};
DetailView.propTypes = {};

DetailView.defaultProps = {};

export default DetailView;
