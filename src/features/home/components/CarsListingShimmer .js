import styles from '../../../assets/styles/home.module.scss'

export default function CarsListingShimmer(props){
    return(
        <>
            {
                [0,1,2,3,4,5,6,7].map(item => <div key={item} className={`${styles.cardWrapper} ${styles.cardSkeleton}`}>
                    <div className={styles.carItemWrapper + ' carItemWrapper'}>
                        <div className={styles.imgSkeleton + ' featuredImg'}></div>
                        <h3 className={styles.headingSkeleton}>
                            <span className={styles.title}></span>
                            <span className={styles.icon + ' favIcon'}></span>
                        </h3>
                    </div>
                </div>)
            }
        </>
    )
}