import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './DetailView.module.css';
import GardenDetail from '../../components/GardenDetail/GardenDetail';
import PlantCard from "../../components/PlantCard/PlantCard";

function DetailView ({userData, setUserData, match}) {

  const [garden, setGarden] = useState();
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

  useEffect(()=>{
    console.log(garden)
  }, [garden])
  
  return (
  <div className={styles.DetailView} data-testid="DetailView">
    <h1>{garden ? garden.gardenName : 'Loading Garden'}</h1>
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
