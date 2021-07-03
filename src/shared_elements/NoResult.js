export default function NoResult(props){
    const { title, description="" } = props
    return(
        <div className="noResultWrapper flexCentered">
            {/* <img/> */}
            <h3 className="heading3">{title}</h3>
            {description ? <p className="supportText">{description}</p>: null}
        </div>
    )
}