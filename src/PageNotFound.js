import { NoResult } from './shared_elements'

export default function PageNotFound(props) {
    return (
      <section className="pageNotFoundSection">
          <div className="pageNotFound">
                <NoResult
                    // image="page_not_found.svg"
                    title="Sorry page not found!"
                    description="We cannot find the page that  you are looking for."
                    btnText="Back to home"
                    link="/"
                />
          </div>
      </section>
    )
}
