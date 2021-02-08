import React, { useEffect, useState, useContext } from 'react';
import styles from './DetailView.module.css';
import PlantCard from "../../components/PlantCard/PlantCard";
import GardenNav from "../../components/GardenNav/GardenNav";
import gardenCalls from "../../utils/API";
import calls from '../../utils/API';
import userProvider from "../../providers/userProvider";
import weatherProvider from "../../providers/weatherProvider";


function DetailView () {
  let gardenIdFromURL = window.location.pathname.slice(8);
  let userData = useContext(userProvider);
  userData = userData.DBUser;
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



  const weather = useContext(weatherProvider);

  useEffect(() =>{
    weather && console.log(weather)
    
    // console.log(userData)
  }, [weather])


  useEffect(()=>{
    try {
      let match = false;
      if (userData.gardens){
        for (const garden of userData.gardens){
          // console.log('checking for:', gardenIdFromURL);
          if (gardenIdFromURL){
            if (gardenIdFromURL === garden.garden._id){
              match = true;
              setGarden(garden.garden)
            }
          }
        }
      }
      //do something else if no match
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
    setSearchError();
    setSearchResults([]);
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
  }

  function resetForm(){
    document.getElementById("plantSearch").value = "";
    setSearch(initialSearchValue);
    setAddMenu(false);
    setSearchError(false);
    setSearchResults([]);
    setCurrentPlant();
    setCurrentPlantDetails();
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
    calls.addPlantToDB({newPlantData: currentPlantDetails}).then(data=>{
      console.log('added plant to db, received this info:', data);
      calls.addPlantToGarden({scientificName: currentPlant["scientific_name"], gardenId: garden._id}).then(returnData=> {
        console.log("Got data back from addPlant!");
        console.log(returnData);
        resetForm();
      })
    });
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
    addPlantToGarden={addPlantToGarden}
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
