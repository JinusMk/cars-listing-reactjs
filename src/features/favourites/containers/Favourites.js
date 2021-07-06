import { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { UPDATE_CARS } from '../../../shared_elements/actions'
import { CarItem, NoResult } from '../../../shared_elements'
import styles from '../../../assets/styles/favourites.module.scss'

function Favourites(props){
    const [cars, setCars] = useState([])
    const [limit, setLimit] = useState(8)
    
    const handleUpdateFavourites = (carId) => {
        let updatedCar = cars.find(car => car.id === carId)
        updatedCar.isFavourite = !updatedCar.isFavourite
        let updatedCars = props.carsList.map(car => car.id === carId ? updatedCar : car)
        let favIds = updatedCars.filter(car => car.isFavourite).map(car => car.id)
        localStorage.setItem('favIds', JSON.stringify(favIds))
        props.updateCars(updatedCars)
    }
    const handleLoadMore = () => {
        setLimit(limit + 8)
    }
    useEffect(() => {
        setCars(props.carsList.filter(car => car.isFavourite))
    }, [props.carsList])
    return(
        <section className={styles.favouritesSection}>
            <div className={styles.favouritesContainer}>
                <div className={styles.titleBlk}>
                    <h3 className="heading3">Favourites</h3>
                </div>
                <div className={styles.contentBlk}>
                    <div className={styles.carsListingOuterWrapper}>
                        {
                            cars && cars.length ? cars.map((car, index) => index < limit &&  <div className={styles.cardWrapper} key={car.id}>
                                <CarItem 
                                    car={car}
                                    handleUpdateFavourites={handleUpdateFavourites}
                                />
                            </div>) : <div className={styles.noResultWrapper}>
                                <NoResult
                                    title={`Favourites list is empty!`}
                                />
                            </div>
                        }
                        {
                            cars.length >= limit  ? <div className={'loadMoreBtn secondaryBtn textCenter'} onClick={handleLoadMore}>Load more</div> : null
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
const mapStateToProps = (state) => ({
    carsList: state.sharedReducer?.cars
})
const mapDispatchToProps = (dispatch) => ({
    updateCars: (cars) => dispatch({
        type: UPDATE_CARS,
        payload: cars
    })
})
export default connect(mapStateToProps, mapDispatchToProps)(Favourites)