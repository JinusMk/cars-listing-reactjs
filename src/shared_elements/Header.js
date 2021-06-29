import { Link, useLocation } from 'react-router-dom'

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
                                        <Link to="/" className={`navLink paragraph ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/favourites" className={`navLink paragraph ${location.pathname === '/favourites' ? 'active' : ''}`}>Favourites</Link>
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