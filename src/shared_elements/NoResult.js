import { Link } from 'react-router-dom'
import NoResultImg from '../assets/images/no-result-img.svg'

export default function NoResult(props){
    const { title, description="", btnText, link, image } = props
    return(
        <div className="noResultWrapper flexCentered">
            <div className="contentWrapper textCenter">
                <img src={image ? image : NoResultImg} alt="noResult"/>
                <h3 className="heading3">{title}</h3>
                { 
                    description ? <p className="paragraph">{description}</p>: null}
                {
                    btnText && link ? <Link className="primaryBtn" to={link}>{btnText}</Link> : null
                }
            </div>
        </div>
    )
}