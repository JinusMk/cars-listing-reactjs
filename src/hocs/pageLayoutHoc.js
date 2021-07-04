
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header, BottomNavigation } from '../shared_elements'

export default function pageLayoutHoc(HocComponent, extraProps = {}) {
    function PageLayout(props){
        const { pathname } = useLocation()
        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);
        return(
            <>
                <Header />
                <main>
                    <HocComponent />
                </main>
                <BottomNavigation />
            </>
        )
    }
    return PageLayout
}