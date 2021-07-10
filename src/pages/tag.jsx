import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO/SEO";
import { graphql, Link } from "gatsby";
const TagsLanding = ({ data }) => {
  console.log("brylle", data);

  const { allContentfulArticles } = data;
  const postsListWithTags = allContentfulArticles.edges;
  const tagsList = [];
  // Double check that the post has a category assigned
  postsListWithTags.forEach((edge) => {
    if (edge.node.tags && edge.node.tags.length > 0) {
      edge.node.tags.forEach((tag) => {
        if (!tagsList.find((x) => x === tag)) {
          tagsList.push(tag);
        }
      });
    }
  });
  return (
    <Layout>
      <SEO title="All Tags | AxieDaily" />
      <div className="px-4 py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-36">
        <div className="flex flex-wrap justify-between items-center border-b-2 border-gray-500 border-solid pb-4 mb-8 w-full">
          <h1 className="font-sans text-xl font-extrabold lg:text-3xl xl:text-4xl">
            Tags
          </h1>
        </div>
        {tagsList.map((tag) => {
          return (
            <Link to={`/tag/${tag}`}>
              <p className="inline-block px-3 py-px mb-4 mr-4 text-xl font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                {tag}
              </p>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
};

export default TagsLanding;

export const pageQuery = graphql`
  query MyQueryTags {
    allContentfulArticles {
      edges {
        node {
          slug
          tags
        }
      }
    }
  }
`;
