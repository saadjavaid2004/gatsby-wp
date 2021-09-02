import { useStaticQuery, graphql } from "gatsby"

export const SiteHeaderData = () => {
  const { site } = useStaticQuery(
    graphql`
		query SiteHeaderData {
			wp {
				siteLogo {
					altText
					sourceUrl
				}
				generalSettings {
					title
					description
				}
			}
		}
	`
	)
	return site
}