import { NoResult } from './shared_elements'
import pageNotFoundIcon from './assets/images/404.svg'

export default function PageNotFound(props) {
    return (
      <section className="pageNotFoundSection">
          <div className="pageNotFound">
                <NoResult
                    image={pageNotFoundIcon}
                    title="Sorry! page not found!"
                    description="We cannot find the page that you are looking for."
                    btnText="Back to home"
                    link="/"
                />
          </div>
      </section>
    )
}
