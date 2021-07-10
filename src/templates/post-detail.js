import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO/SEO";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Bold, Heading1, Text } from "../components/Slices/Markdown";
const PostDetail = ({ pageContext, data }) => {
  const { title } = pageContext;
  const postTitle = `${title} | AxieDaily`;

  const { contentfulArticles, assets, posts } = data;
  const description = contentfulArticles.description;
  const mainImg = contentfulArticles.image.fluid;
  const articleDate = contentfulArticles.createdAt;
  const tag =
    contentfulArticles.tags && contentfulArticles.tags.length > 0
      ? contentfulArticles.tags[0]
      : null;
  const content = contentfulArticles.content;
  /**
   * Blog body content
   */
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <Heading1>{children}</Heading1>,
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      ["entry-hyperlink"]: (nodez) => {
        const entry = posts.edges.find(
          ({ node }) => node.contentful_id === nodez.data.target.sys.id
        );
        console.log({ nodez, entry });
        if (entry) {
          return (
            <Link
              className="text-deep-purple-accent-700"
              to={`/${entry.node.slug}`}
            >
              {nodez.content[0].value}
            </Link>
          );
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (nodez) => {
        const asset = assets.edges.find(
          ({ node }) => node.contentful_id === nodez.data.target.sys.id
        );
        if (asset) {
          return <Img fluid={asset.node.fluid} className="mx-auto my-3" />;
        }
      },
    },
  };
  return (
    <Layout>
      <SEO
        title={postTitle}
        description={description}
        image={mainImg}
        article
      />
      <article>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="mx-auto sm:text-center lg:max-w-4xl">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              {tag && (
                <div>
                  <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                    {tag}
                  </p>
                </div>
              )}
              <h2 className="max-w-lg mb-2 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                {title}
              </h2>
              <p className="text-base text-gray-700 md:text-sm">
                {articleDate}
              </p>
            </div>
            <div className="mb-4 transition-shadow duration-300 lg:mb-6">
              <Img
                className="object-cover w-full h-56 rounded sm:h-64 md:h-80 lg:h-96"
                fluid={mainImg}
                alt=""
              />
            </div>
          </div>
          <div className="mx-auto lg:max-w-3xl mt-8">
            {renderRichText(content, options)}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default PostDetail;

export const pageQuery = graphql`
  query PostQuery($slug: String) {
    contentfulArticles(slug: { eq: $slug }) {
      slug
      title
      tags
      description
      createdAt(formatString: "LL")
      content {
        raw
      }
      image {
        file {
          url
        }
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
    assets: allContentfulAsset {
      edges {
        node {
          contentful_id
          fluid(maxWidth: 1050, quality: 100) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
    posts: allContentfulArticles {
      edges {
        node {
          contentful_id
          slug
          title
        }
      }
    }
  }
`;
