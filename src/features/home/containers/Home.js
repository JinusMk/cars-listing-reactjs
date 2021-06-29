import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { UPDATE_CARS } from '../../../shared_elements/actions'
import styles from '../../../assets/styles/home.module.scss'

function Home(props){
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState({})
    const [categoryId, setCategoryId] = useState(0)
    const [subCategoryId, setSubCategoryId] = useState(0)
    const [loader, setLoader] = useState(true)

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
        setCategoryId(id)
        if(id == 11 && !subCategories[id]){ //sedan
            fetchSubCategories(id, `https://run.mocky.io/v3/4d1d1033-b9b2-4f65-ac78-0bdd210c1abb`)
        }else if(id == 13 && !subCategories[id]){ //suv
            fetchSubCategories(id, `https://run.mocky.io/v3/701a0454-ddb4-40e5-8ef1-86b870c6653f`)
        }
    }
    const handleChangeSubCategory = (id) => {
        setSubCategoryId(id)
    }
    useEffect(() => {
        fetchCategories()
    }, [])
    return(
        <section className={styles.homeSection}>
            <div className={styles.homeContainer}>
                <div className={styles.tabBlk}>
                    <div className={`${styles.tabListWrapper} ${styles.categoriesTab}`}>
                        {loader ? 'Loading...' : <ul className={styles.tabList}>
                            <li className={`${styles.tabItem} ${categoryId === 0 ? styles.active : ''}`} onClick={() => handleChangeCategory(0)}>
                                <p>All</p>
                            </li>
                            {
                                categories.map(cat => <li key={cat.id} className={`${styles.tabItem} ${categoryId === cat.id ? styles.active : ''}`} onClick={() => handleChangeCategory(cat.id)}>
                                    <p>{cat.label}</p>
                                </li>)
                            }
                        </ul>}
                    </div>
                    <div className={`${styles.tabListWrapper} ${styles.subCategoriesTab}`}>
                        {categoryId === 0 ? null : <ul className={styles.tabList}>
                            <li className={`${styles.tabItem} ${subCategoryId === 0 ? styles.active : ''}`} onClick={() => handleChangeCategory(0)}>
                                <p>All</p>
                            </li>
                            {
                                subCategories[categoryId] &&subCategories[categoryId].length ? subCategories[categoryId].map(sub => <li key={sub.id} className={`${styles.tabItem} ${subCategoryId === sub.id ? styles.active : ''}`} onClick={() => handleChangeSubCategory(sub.id)}>
                                    <p>{sub.label}</p>
                                </li>) : null
                            }
                        </ul>}
                    </div>
                </div>
            </div>
        </section>
    )
}
const mapStateToProps = (state) => ({
    cars: state.sharedReducer?.cars
})
const mapDispatchToProps = (dispatch) => ({
    updateCars: (cars) => dispatch({
        type: UPDATE_CARS,
        payload: cars
    })
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)