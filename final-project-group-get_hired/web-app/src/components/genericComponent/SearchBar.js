import classes from  './SearchBar.module.scss'

function SearchBar(props){
    
    const handleSearchInputChange = (event) =>{
        props.onSearchInputChange(event.target.value);
    }
    
    return(
            <input className={classes.searchBar} type="text" id={props.id} name={props.name} placeholder={props.placeholder} onChange={handleSearchInputChange}/> 
    )
}

export default SearchBar;