// import classes from './FilterSection.module.scss'

// function FilterSectionComponent(props) {

//   const handleCheckboxChange = (event) => {
//     props.handleCheckboxChange(event.target.id)
//   }

  //recevies an array of the values consisting of the filter options
  // const Checkboxes = props.values.map((filterValue) => {
  //   return (
  //     <div key={filterValue} className={classes.checkboxSection}>
  //     <input type="checkbox" id={filterValue} name={filterValue} onChange={handleCheckboxChange}/>
  //     <label>{filterValue}</label>
  //     </div >

      // <FormControlLabel key={filterValue}
      //   label={filterValue}
      //   control={<Checkbox checked={props.isChecked(filterValue)} onChange={handleCheckboxChange} inputProps={{ id: filterValue, name: filterValue }} />}
      // />

//    

import { useState } from 'react';
import classes from './FilterSection.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function FilterSectionComponent(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCheckboxChange = (event) => {
    props.handleCheckboxChange(event.target.id);
  };

  const Checkboxes = props.values.map((filterValue) => {
    return (
      <div key={filterValue} className={classes.checkboxSection}>
        <input
          type="checkbox"
          id={filterValue}
          name={filterValue}
          onChange={handleCheckboxChange}
        />
        <label>{filterValue}</label>
      </div>
    );
  });

  return (
    <div className={classes.filterContainer}>
      <div className={classes.filterHeading} onClick={handleExpand}>
        <div className={classes.filterName}>{props.heading}</div>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`${classes.filterIcon} ${
            isExpanded ? classes.expanded : ''
          }`}
        />
      </div>
      {isExpanded && (
        <div className={classes.checkboxContainer}>{Checkboxes}</div>
      )}
    </div>
  );
}

export default FilterSectionComponent;




