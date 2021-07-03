import { Link } from 'react-router-dom'

export default function NoResult(props){
    const { title, description="", btnText, link } = props
    return(
        <div className="noResultWrapper flexCentered">
            <div className="contentWrapper">
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