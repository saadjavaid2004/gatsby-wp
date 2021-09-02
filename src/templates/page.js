import React from "react"
import { graphql } from "gatsby"
//import Image from "gatsby-image"
import parse from "html-react-parser"
import { getElementorCssLinksData } from "../utils/elementor";
import { Helmet } from "react-helmet";

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
//import "../css/@wordpress/block-library/build-style/style.css"
//import "../css/@wordpress/block-library/build-style/theme.css"

//import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PageTemplate = ({ data: { previous, next, page } }) => {

	//console.log(JSON.parse(page.elementorData))
	const postId = page?.databaseId;
	const elementorCssLinksData = getElementorCssLinksData(postId);

  return (
    <Layout>
      <Seo title={page.title}  />
		<Helmet>
				{
					elementorCssLinksData.length && elementorCssLinksData.map( linkData => (
						<link key={linkData?.id} rel='stylesheet' id={linkData?.id} href={linkData?.link} media='all' />
					) )
				}
			</Helmet>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        {!!page.content && (
          <section itemProp="articleBody">{parse(page.content)}</section>
        )}
      </article>

    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPageId: String
    $nextPageId: String
  ) {
    # selecting the current post by id
    page: wpPage(id: { eq: $id }) {
      id
	  databaseId
      content
      title
	  elementorData
     

      
    }

    # this gets us the previous post by id (if it exists)
    previous: wpPage(id: { eq: $previousPageId }) {
      uri
      title
    }

    # this gets us the next post by id (if it exists)
    next: wpPage(id: { eq: $nextPageId }) {
      uri
      title
    }
  }
`
