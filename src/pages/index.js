import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

class IndexPage extends React.Component {
  render() {
    const terms = this.props.data.allMarkdownRemark.terms.map(
      ({ node }) => node
    )

    return (
      <section className="section">
        <div className="container">
          <h1>Terms</h1>
          {terms.map(term => (
            <div key={term.frontmatter.slug}>
              <h2>
                <Link to={term.fields.slug}>{term.frontmatter.title}</Link>
              </h2>
            </div>
          ))}
        </div>
      </section>
    )
  }
}

export default IndexPage

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      terms: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }).isRequired,
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired
      ),
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___title] }
      filter: { frontmatter: { templateKey: { eq: "glossary-term" } } }
    ) {
      terms: edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
