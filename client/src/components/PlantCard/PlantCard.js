import React, { useContext, useEffect } from 'react';
import styles from './PlantCard.module.css';
import shrub from "./images/draughttolerantshrub.png";
import waterGauge from "./images/empty gauge space.png";
import fireGauge from "./images/fire gauge.png"
import pointer from "./images/pointer.png";
import weatherProvider from '../../providers/weatherProvider';



const sunRequirements = { 0: "dense shade", 1: "dense shade", 2: "full shade", 3: "full shade", 4: "partial shade", 5: "partial shade", 6: "partial sun", 7: "partial sun", 8: "full sun", 9: "full sun", 10: "full sun" };

const soilTypes = { 1: "clay", 2: "intermediate soil", 3: "silty soil", 4: "fine sand", 5: "course sand", 6: "gravel", 7: "pebbles, rockeries", 8: "blocks, slabs, and rocky flats", 9: "Vertical cracks in the walls", 10: "rock" }

function PlantCard({ plant }) {
  const weather = useContext(weatherProvider);

  useEffect(() =>{
    // console.log(weather)
  }, [])


  function joinArrayWithFinalOr(anArray) {
    try {
      let aString = '';
      if (anArray.length > 2) {
        aString += anArray.slice(0, anArray.length - 1).join(", ")
        aString += `, or ${anArray[anArray.length - 1]}`;
      } else if (anArray.length === 2) {
        aString += anArray.join(" or ");
      } else if (anArray.length === 1) {
        aString = anArray[0];
      } else {
        return false;
      }
      return aString;
    } catch (e) {
      console.log("ERROR from joinArrayWithFinalOr(PlantCard.js):", e)

    }
  }

  function shouldWePrintCard() {
    if (plant) {

      return (
        <div className={styles.PlantCard} data-testid="PlantCard" data-plantid={plant._id}>
          <div className={styles.PlantTitle}>
            <h3>{plant.plant.commonName}</h3>
            <img src={plant.plant.imageLink ? plant.plant.imageLink : shrub} alt="icon of a draught tolerant shrub" className="plantIcon"></img>
          </div>
          <div className={styles.BottomOfCard} >
            <div className={styles.Data}>
              {plant.plant.waterMinMM ? <p>I would like at least {plant.plant.waterMinMM}mm of water per year.</p> : undefined}
              {plant.plant.waterMaxMM ? <p>And I don't want more than {plant.plant.waterMaxMM}mm of water per year.</p> : undefined}
              {plant.plant.sunNeed ? <p>I would like to live in {sunRequirements[plant.plant.sunNeed]}.</p> : undefined}
              {plant.plant.soilType ? <p>I'd feel most comfortable in {soilTypes[plant.plant.soilType]}.</p> : undefined}

              {!(plant.plant.waterMinMM || plant.plant.waterMaxMM || plant.plant.sunNeed || plant.plant.soilType) ? "Sorry, we have no data on this plant! Go ahead and send us a message with the plant's scientific name, and we'll try to research it!" : undefined}
            </div>
            <div className={styles.GaugeDiv}>
              <div className={styles.FullGauge}>
                <img className={styles.Gauge} src={waterGauge} alt="water gauge" />
                <img className={styles.Pointer} src={pointer} alt="pointer for gauge" />
                <p>water</p>
              </div>
              <div className={styles.FullGauge}>
                <img className={styles.Gauge} src={fireGauge} alt="water gauge" />
                <img className={styles.Pointer} src={pointer} alt="pointer for gauge" />
                <p>temperature</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return shouldWePrintCard();
};

PlantCard.propTypes = {};

PlantCard.defaultProps = {};

export default PlantCard;
