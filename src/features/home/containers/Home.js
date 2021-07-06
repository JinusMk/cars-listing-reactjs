import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { UPDATE_CARS } from '../../../shared_elements/actions'
import { CarItem, NoResult } from '../../../shared_elements'
import { CarsListingShimmer } from '../components'
import styles from '../../../assets/styles/home.module.scss'

function Home(props){
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState({})
    const [categoryId, setCategoryId] = useState(0)
    const [subCategoryIds, setSubCategoryIds] = useState([])
    const [loader, setLoader] = useState(true)
    const [limit, setLimit] = useState(8)
    const [cars, setCars] = useState([])

    const fetchCategories = () => {
        fetch(`https://run.mocky.io/v3/61753b4b-fef7-4b9b-9bf8-38b9bcc7a520`)
        .then(res => res.json())
        .then(response => {
            setLoader(false)
            setCategories(response.categories)
        })
    }
    const fetchSubCategories = (id, url) => {
        fetch(url)
        .then(res => res.json())
        .then(response => {
            setSubCategories((prevData) => ({
                ...prevData,
                [id]: response.subCategory
            }))
        })
    }
    const handleChangeCategory = (id) => {
        if(id != categoryId){
            setCategoryId(id)
            setSubCategoryIds([])
            setLimit(8)
            if(id == 11 && !subCategories[id]){ //sedan
                fetchSubCategories(id, `https://run.mocky.io/v3/4d1d1033-b9b2-4f65-ac78-0bdd210c1abb`)
            }else if(id == 13 && !subCategories[id]){ //suv
                fetchSubCategories(id, `https://run.mocky.io/v3/701a0454-ddb4-40e5-8ef1-86b870c6653f`)
            }
            setCars(props.carsList.filter(car => id ? car.catId === id : true))
        }
    }
    const handleChangeSubCategory = (id) => {
        if(id === 'all'){
            setSubCategoryIds([])
            setCars(props.carsList.filter(car => car.catId === categoryId))
        }else{
            let updatedSubcategoryIds = subCategoryIds
            if(subCategoryIds.includes(id)){
                updatedSubcategoryIds = updatedSubcategoryIds.filter(subId => subId != id)
            }else{
                updatedSubcategoryIds = [...updatedSubcategoryIds, id]
            }
            setSubCategoryIds(updatedSubcategoryIds)
            if(updatedSubcategoryIds && updatedSubcategoryIds.length){
                setCars(props.carsList.filter(car => car.catId === categoryId && updatedSubcategoryIds.includes(car.subCatId)))
            }else{
                setSubCategoryIds([])
                setCars(props.carsList.filter(car => car.catId === categoryId))
            }
        }
    }
    const handleLoadMore = () => {
        setLimit(limit + 8)
    }
    const handleUpdateFavourites = (carId) => {
        let updatedCar = cars.find(car => car.id === carId)
        updatedCar.isFavourite = !updatedCar.isFavourite
        let updatedCars = props.carsList.map(car => car.id === carId ? updatedCar : car)
        let favIds = updatedCars.filter(car => car.isFavourite).map(car => car.id)
        localStorage.setItem('favIds', JSON.stringify(favIds))
        props.updateCars(updatedCars)
    }
    useEffect(() => {
        fetchCategories()
    }, [])
    useEffect(() => {
        if(categoryId === 0){
            setCars(props.carsList)
        }else if(subCategoryIds && subCategoryIds.length){
            setCars(props.carsList.filter(car => car.catId === categoryId && subCategoryIds.includes(car.subCatId)))
        }else{
            // setCars(props.carsList.filter(car => car.catId === categoryId).sort((a, b) =>  a.name > b.name ? -1 : a.name < b.name ? 1 : 0))
            setCars(props.carsList.filter(car => car.catId === categoryId))
        }
    }, [props.carsList])
    return(
        <section className={styles.homeSection}>
            <div className={styles.homeContainer}>
                <div className={styles.tabBlk}>
                    <div className={`${styles.tabListWrapper} ${styles.categoriesTab}`}>
                        <ul className={styles.tabList + ' listInline'}>
                            <li className={`${styles.tabItem} ${categoryId === 0 ? styles.active : ''}`} >
                                <a className="heading3" onClick={() => handleChangeCategory(0)}>
                                    <span>All</span>
                                </a>
                            </li>
                            {
                                loader ? '' : categories.map(cat => <li key={cat.id} className={`${styles.tabItem} ${categoryId === cat.id ? styles.active : ''}`} >
                                    <a className="heading3" onClick={() => handleChangeCategory(cat.id)}>
                                        <span>{cat.label}</span>
                                    </a>
                                </li>)
                            }
                        </ul>
                    </div>
                    <div className={`${styles.tabListWrapper} ${styles.subCategoriesTab}`}>
                        {categoryId === 0 ? null : <ul className={styles.tabList + ' listInline'}>
                            <li className={`${styles.tabItem} ${subCategoryIds.length === 0 ? styles.active : ''}`} >
                                <a className="paragraph" onClick={() => handleChangeSubCategory('all')}>All</a>
                            </li>
                            {
                                subCategories[categoryId] && subCategories[categoryId].length ? subCategories[categoryId].map(sub => <li key={sub.id} className={`${styles.tabItem} ${subCategoryIds.includes(sub.id) ? styles.active : ''}`}>
                                    <a className="paragraph" onClick={() => handleChangeSubCategory(sub.id)}>{sub.label}</a>
                                </li>) : null
                            }
                        </ul>}
                    </div>
                </div>
                <div className={styles.contentBlk}>
                    <div className={styles.carsListingOuterWrapper}>
                        {
                            (loader || props.carsList.length === 0) ? <CarsListingShimmer/> : cars && cars.length ? cars.map((car, index) => index < limit &&  <div className={styles.cardWrapper} key={car.id}>
                                <CarItem 
                                    car={car}
                                    handleUpdateFavourites={handleUpdateFavourites}
                                />
                            </div>) : <div className={styles.noResultWrapper}>
                                <NoResult
                                    title={`No cars available`}
                                />
                            </div>
                        }
                    </div>
                    {
                        loader ? '' : cars.length > limit  ? <div className={'loadMoreBtn secondaryBtn textCenter'} onClick={handleLoadMore}>Load more</div> : null
                    }
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
export default connect(mapStateToProps, mapDispatchToProps)(Home)