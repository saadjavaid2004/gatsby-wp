import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import Image from "gatsby-image"
//import { SiteHeaderData } from "../hooks/site-header"

const Layout = ({ isHomePage, children }) => {
	
	//const { SiteHeaderData } = SiteHeaderData()
  const data = useStaticQuery(graphql`
    query HeaderQuery {
	  wp {
		generalSettings {
		  title
		  description
		}
		siteLogo {
		  altText
		  localFile {
			childImageSharp {
			  fixed(height: 65) {
				...GatsbyImageSharpFixed
			   }
			}
		  }
		
		}
	  }
	  wpMenu(id: {eq: "dGVybToyMg=="}) {
		menuItems {
		  nodes {
			url
			label
			id
		  }
		}
	  }
	}
  `)	
//{data.wp.siteLogo.sourceUrl}

   const items = data.wpMenu.menuItems.nodes
  return (
		<div className="main-wrapper container-fluid gx-0" data-is-root-path={isHomePage}>
			<header className="global-header p-3">
				<div className="row align-items-center">
					<div className="col-12 col-md-3 text-center text-md-start">
						<Link className="header-link-home" to="/">
							<Image
							  fixed={data.wp.siteLogo.localFile.childImageSharp.fixed}
							  alt={data.wp.siteLogo.altText}
							/>							
						</Link>
					</div>
					<div className="col-12 col-md-6 text-center">
						<h1 className="main-heading">
							{parse(data.wp.generalSettings.title)}
						</h1>
					</div>
					<div className="col-12 col-md-3 text-center text-md-end">
						<nav className="navbar navbar-expand-lg navbar-light bg-light1">
							<div className="container-fluid">
								<Link className="navbar-brand d-md-none" to="#">Navbar</Link>
								<button
									className="navbar-toggler"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#navbarSupportedContent"
									aria-controls="navbarSupportedContent"
									aria-expanded="false"
									aria-label="Toggle navigation"
								>
									<span className="navbar-toggler-icon"></span>
								</button>
								<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
									<ul className="navbar-nav  mb-2 mb-lg-0">
									{items.map(item => (
										<li className="nav-item mb-0" key={item.id}>
											<Link className="nav-link" activeClassName="active" activeStyle={{ color: "#2798D0", fontWeight: "bold" }}  aria-current="page" to={item.url}>
												{item.label}
											</Link>
										</li>
									))}
										
									</ul>
								</div>
							</div>
						</nav>

					</div>
				</div>
			</header>

      <main>{children}</main>

      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        {` `}
        And <a href="https://wordpress.org/">WordPress</a>
      </footer>
    </div>
  )
}

export default Layout
