import './CardComponent.scss';

function CardComponent(props){
    if (props.className == 'navbar'){
        return(<div className={`cardTest ${props.className}` } onClick={props.onClick}>
        {props.children}
        </div>)
    }
    return(<div className={`card ${props.className}` } onClick={props.onClick}>
        {props.children}
    </div>)

    
}

export default CardComponent;