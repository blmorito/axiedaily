import React from "react";
import Layout from "../components/Layout";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Bold, Heading1, Text } from "../components/Slices/Markdown";
import SearchOptimization from "../components/SearchOptimization/SearchOptimization";
import { Disqus } from "gatsby-plugin-disqus";
import _ from "underscore";
const PostDetail = ({ pageContext, data }) => {
  const { title } = pageContext;
  const postTitle = `${title} | AxieDaily`;

  const { contentfulArticles, assets, posts } = data;
  const description = contentfulArticles.description;
  const mainImg = contentfulArticles.image;
  const articleDate = contentfulArticles.createdAt;
  const tag =
    contentfulArticles.tags && contentfulArticles.tags.length > 0
      ? contentfulArticles.tags[0]
      : null;
  const content = contentfulArticles.content;
  const slug = contentfulArticles.slug;

  /**
   * Related content logic
   */
  const allPostsExceptCurrentPost = posts.edges
    .filter((post) => post.node.slug !== slug)
    .map((post) => post.node);
  console.log({ allPostsExceptCurrentPost });
  const currentPostTags = contentfulArticles.tags
    ? contentfulArticles.tags
    : [];
  let relatedPosts = [];
  currentPostTags.forEach((tag) => {
    const rel = allPostsExceptCurrentPost.filter(
      (post) => post.tags.indexOf(tag) > -1
    );
    console.log({ tag, rel });
    if (rel) {
      rel.forEach((relatedPost) => {
        const relatedPostExisting = relatedPosts.find(
          (x) => x.slug === relatedPost.slug
        );
        if (relatedPostExisting) {
          relatedPost.points = relatedPost.points++;
        } else {
          relatedPosts.push({ slug: relatedPost.slug, points: 1 });
        }
      });
    }
  });
  console.log({ relatedPosts });
  relatedPosts = _.sortBy(relatedPosts, "points").reverse();
  if (relatedPosts.length > 3) {
    relatedPosts.slice(0, 3);
  }

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
      ["hyperlink"]: (node, children) => {
        return (
          <a
            className="text-deep-purple-accent-700 hover:underline"
            href={node.data.uri}
            target="_blank"
            rel="noreferrer noopener"
          >
            {children.length > 0 && children[0] ? children[0] : node.data.uri}
          </a>
        );
      },
      ["entry-hyperlink"]: (nodez) => {
        const entry = posts.edges.find(
          ({ node }) => node.contentful_id === nodez.data.target.sys.id
        );
        if (entry) {
          return (
            <Link
              className="text-deep-purple-accent-700 hover:underline"
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
      <SearchOptimization
        title={postTitle}
        description={description}
        image={mainImg.file.url}
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
                fluid={mainImg.fluid}
                alt=""
              />
            </div>
          </div>
          <div className="mx-auto lg:max-w-3xl mt-8">
            {renderRichText(content, options)}
          </div>
        </div>
      </article>
      {relatedPosts.length > 0 && (
        <div className="px-4 mx-auto lg:max-w-4xl mt-8">
          <div className="flex flex-wrap justify-between items-center border-b-2 border-gray-500 border-solid pb-4 mb-8 w-full">
            <h1 className="font-sans text-xl font-extrabold lg:text-2xl xl:text-3xl">
              Related Content
            </h1>
          </div>
          <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-3 sm:row-gap-6 sm:grid-cols-1">
            {relatedPosts.map((relatedPost) => {
              const relatedPostData = allPostsExceptCurrentPost.find(
                (post) => post.slug === relatedPost.slug
              );
              if (!relatedPostData) {
                return null;
              }
              return (
                <Link
                  to={`/${relatedPostData.slug}`}
                  aria-label={relatedPostData.title}
                >
                  <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
                    <img
                      className="object-cover w-full h-56 md:h-64 xl:h-80"
                      src={relatedPostData.image.file.url}
                      alt={relatedPostData.title}
                    />
                    <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
                      <p className="text-sm font-medium tracking-wide text-white">
                        {relatedPostData.title}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      <div className="px-4 mx-auto lg:max-w-3xl mt-8">
        <Disqus
          config={{
            url: `https://www.axiedaily.com/${slug}`,
            identifier: slug,
            title: title,
          }}
        />
      </div>
    </Layout>
  );
};

export default PostDetail;

export const pageQuery = graphql`
  query PostQuery($slug: String) {
    contentfulArticles(slug: { eq: $slug }) {
      id
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
          tags
          createdAt(formatString: "LL")
          image {
            file {
              url
            }
          }
        }
      }
    }
  }
`;
