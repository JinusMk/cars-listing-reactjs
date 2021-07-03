import { useState } from 'react'
import favActive from '../assets/images/favourite_active.svg'
import favInActive from '../assets/images/favourite_inactive.svg'

export default function CarItem(props){
    const [imgLoader, setImgLoader] = useState(true)
    const { car } = props
    return(
        <div className="carItemWrapper">
            <img src={car.photo} alt="img" onLoad={() => setImgLoader(false)} className="featuredImg" style={imgLoader ? {display: `none`} : {}}/>
            {imgLoader ? <div className="featuredImg imgSkeleton"/> : null}
            <h3 className="heading2">
                <span>{car.name}</span>
                {car.isFavourite ? <img src={favActive} alt="active" className={`favIcon`}onClick={() => props.handleUpdateFavourites(car.id)}/> : <img src={favInActive} alt="inactive" className={`favIcon`} onClick={() => props.handleUpdateFavourites(car.id)}/>}
            </h3>
        </div>
    )
}