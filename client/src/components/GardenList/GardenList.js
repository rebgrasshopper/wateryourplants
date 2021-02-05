import React from 'react';
import PropTypes from 'prop-types';
import styles from './GardenList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarrot, faSeedling, faAppleAlt, faLemon, faLeaf, faPepperHot, faSpa, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import gardenCalls from '../../utils/API';
import { Link } from 'react-router-dom';


function GardenList({ gardens, user, setUserData }) {

  function onAdd () {
    gardenCalls.addNewGarden({userAuthId:user.userId}).then(data =>{
      setUserData(data);
    });
  }
  return (
    <ul className={styles.GardenList} data-testid="GardenList">
      <p>
        {user ? `${user.userName}'s Gardens:` : 'No garden data...'}
        <button id="addNewSpan" onClick={onAdd}>
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
      </p>
      <hr />
      {gardens && gardens.map(garden => {
        return <li key={garden.garden._id}><Link className="gardenDetailLink" to={`/garden/${garden.garden._id}`}><FontAwesomeIcon icon={faSeedling} style={{ marginRight: 15 + "px" }} />{garden.garden.gardenName}</Link></li>
      })
      }
    </ul>
  )
}


GardenList.propTypes = {};

GardenList.defaultProps = {};

export default GardenList;
