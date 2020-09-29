import React, {Fragment} from 'react'
import spinner from '../../img/spinner.gif';
const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} style={{width:'200px',display:"block", margin:"auto" }} alt="....loading">
            </img>
        </Fragment>
    )
}

export default Spinner;
