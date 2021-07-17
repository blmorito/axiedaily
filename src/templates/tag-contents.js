import React from "react";
import Layout from "../components/Layout";
import * as _ from "lodash";
import PostCardNoTag from "../components/Slices/PostCardNoTag";
import { graphql } from "gatsby";
import SearchOptimization from "../components/SearchOptimization/SearchOptimization";
const TagContents = ({ pageContext, data }) => {
  console.log({ data, pageContext });
  const { tag } = pageContext;
  const tagTitleCase = _.startCase(_.toLower(tag));
  const title = `All ${tagTitleCase} Posts | AxieDaily`;
  const tagContents = data.allContentfulArticles.edges;
  return (
    <Layout>
      <SearchOptimization title={title} />
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16 text-text-main">
        <div className="flex flex-wrap justify-between items-center border-b-2 border-gray-500 border-solid pb-4 mb-8 w-full">
          <h1 className="font-sans text-xl font-extrabold lg:text-3xl xl:text-4xl">
            {tagTitleCase}
          </h1>
        </div>
        <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {tagContents.map((tagContent, i) => {
            const { title, createdAt, slug, description, image } =
              tagContent.node;
            return (
              <PostCardNoTag
                key={i}
                title={title}
                date={createdAt}
                description={description}
                imgSrc={image}
                slug={slug}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default TagContents;

export const pageQuery = graphql`
  query TagContentsQuery($tag: String) {
    allContentfulArticles(
      sort: { fields: createdAt, order: DESC }
      filter: { tags: { eq: $tag } }
    ) {
      edges {
        node {
          slug
          title
          description
          image {
            fluid(quality: 100) {
              ...GatsbyContentfulFluid
            }
          }
          createdAt(formatString: "LL")
        }
      }
    }
  }
`;
