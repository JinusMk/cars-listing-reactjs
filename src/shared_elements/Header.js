import { Link, useLocation } from 'react-router-dom'
import homeActive from '../assets/images/home_active.svg'
import homeInActive from '../assets/images/home_inactive.svg'
import favouritesInActive from '../assets/images/favourites_inactive.svg'
import favouritesActive from '../assets/images/favourites_active.svg'

export default function Header(props){
    let location = useLocation()
    return(
        <>
            <header>
                <div className="container">
                    <div className="headerWrapper">
                        <div className="headerRow">
                            <div className="logoBlk">
                                <h3 className="heading1">
                                    {/* <img src */}
                                    <span>ZOKO Cars</span>
                                </h3>
                            </div>
                            <nav role="navigation" className="navigationListOuterWrapper">
                                <ul className="navigationList flexCentered listInline">
                                    <li>
                                        <Link to="/" className={`navLink home paragraph ${location.pathname === '/' ? 'active' : ''}`}>
                                            <img src={homeActive} className="activeImg"/>
                                            <img src={homeInActive} className="inActiveImg"/>
                                            <span>Home</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/favourites" className={`navLink paragraph ${location.pathname === '/favourites' ? 'active' : ''}`}>
                                            <img src={favouritesActive} className="activeImg"/>
                                            <img src={favouritesInActive} className="inActiveImg"/>
                                            <span>Favourites</span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <div className="emptyHeaderdiv"></div>
        </>
    )
}