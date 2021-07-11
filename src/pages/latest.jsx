import React from "react";
import Layout from "../components/Layout";
import PostCard from "../components/Slices/PostCard";
import { graphql } from "gatsby";
import SearchOptimization from "../components/SearchOptimization/SearchOptimization";
const Latest = ({ data }) => {
  const postsList = data.allContentfulArticles.edges;
  console.log({ postsList });
  return (
    <Layout customSeo>
      <SearchOptimization title="Latest Posts | AxieDaily" />
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16">
        <div className="flex flex-wrap justify-between items-center border-b-2 border-gray-500 border-solid pb-4 mb-8 w-full">
          <h1 className="font-sans text-xl font-extrabold lg:text-3xl xl:text-4xl">
            Latest Posts
          </h1>
        </div>
        <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {postsList.map((edge, i) => {
            const { slug, tags, title, description, image, createdAt } =
              edge.node;
            return (
              <PostCard
                key={i}
                title={title}
                slug={slug}
                date={createdAt}
                description={description}
                tag={tags[0]}
                imgUrl={image.file.url}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
export default Latest;
export const pageQuery = graphql`
  query LatestPostsQ {
    allContentfulArticles {
      edges {
        node {
          createdAt(formatString: "LL")
          slug
          title
          description
          tags
          image {
            file {
              url
            }
            fluid(quality: 100) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`;
