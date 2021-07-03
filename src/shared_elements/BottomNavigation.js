import { Link, useLocation } from 'react-router-dom'
import favInactive from '../assets/images/favourites_botttom_navigation.svg'
import favActive from '../assets/images/favourites_active.svg'
import homeActive from '../assets/images/home_active.svg'
import homeInactive from '../assets/images/home_bottom_navigation.svg'

export default function BottomNavigation(props){
    let location = useLocation()
    return(
        <div className="bottomNavigation">
            <ul className="listInline">
                <li className={location.pathname === '/' ? 'active' : ''}>
                    <Link to="/" className="paragraph">
                        <img src={homeActive} className="activeImg" alt=""/>
                        <img src={homeInactive} className="inActiveImg" alt=""/>
                        <span>Home</span>
                    </Link>
                </li>
                <li className={location.pathname === '/favourites' ? 'active' : ''}>
                    <Link to="/favourites" className="paragraph">
                        <img src={favActive} className="activeImg" alt=""/>
                        <img src={favInactive} className="inActiveImg" alt=""/>
                        <span>Favourites</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}