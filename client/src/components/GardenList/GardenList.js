import React, {useContext} from 'react';
import styles from './GardenList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarrot, faSeedling, faAppleAlt, faLemon, faLeaf, faPepperHot, faSpa, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import gardenCalls from '../../utils/API';
import { Link } from 'react-router-dom';
import weatherProvider from '../../providers/weatherProvider';
import userProvider from "../../providers/userProvider";


function GardenList() {
  const user = useContext(userProvider);
  const gardens = user.DBUser.gardens;

  function onAdd () {
    gardenCalls.addNewGarden({userAuthId:user.DBUser.userAuthId}).then(data =>{
      console.log('calling user.setUser');
      user.setUser(data);
    });
  }
  return (
    <section className={styles.GardenList} data-testid="GardenList">
      <header>
        {user ? `${user.DBUser.userName}'s Gardens:` : 'No garden data...'}
        <button id="addNewSpan" onClick={onAdd}>
          <FontAwesomeIcon icon={faPlusCircle} size={2+"x"} color={"#1C6E8C"}/>
        </button>
      </header>
    <ul>
      {gardens && gardens.map(garden => {
        return <li key={garden.garden._id}><Link className="gardenDetailLink" to={`/garden/${garden.garden._id}`}><FontAwesomeIcon icon={faSeedling} style={{ marginRight: 15 + "px" }} />{garden.garden.gardenName}</Link></li>
      })
      }
    </ul>
    </section>
  )
}


GardenList.propTypes = {};

GardenList.defaultProps = {};

export default GardenList;
