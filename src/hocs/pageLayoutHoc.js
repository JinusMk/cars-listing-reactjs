
import { Header, BottomNavigation } from '../shared_elements'

export default function pageLayoutHoc(HocComponent, extraProps = {}) {
    class PageLayout extends Component {
        render(){
            return(
                <>
                    <Header />
                    <main>
                        <div>
                            <HocComponent />
                        </div>
                    </main>
                    <BottomNavigation />
                </>
            )
        }
    }
    return PageLayout
}