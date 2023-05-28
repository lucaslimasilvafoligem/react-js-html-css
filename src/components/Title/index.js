
import './title.css';

export default (props) => {
    return(
        <div className='title'>
            {props.children}
            <span>{props.name}</span>
        </div>
    )
}