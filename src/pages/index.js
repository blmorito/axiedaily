import React from "react";
import Layout from "../components/Layout";
import Tag from "../components/Slices/Tag";
import { Link, graphql } from "gatsby";
export default function Home({ data }) {
  const { featured, guides, latest } = data;
  console.log({ featured, guides, latest });
  const mainFeature = featured.edges[0];
  const subFeature1 = featured.edges[1];
  const subFeature2 = featured.edges[2];
  return (
    <Layout>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
        <div className="grid gap-10 row-gap-8 lg:grid-cols-6">
          <div className="lg:col-span-4">
            <MainFeature
              title={mainFeature.node.title}
              description={mainFeature.node.description}
              imgSrc={mainFeature.node.image}
              tag={mainFeature.node.tags[0]}
              slug={mainFeature.node.slug}
            />
          </div>
          <div className="flex flex-col space-y-8 lg:col-span-2">
            <SubFeature
              title={subFeature1.node.title}
              imgSrc={subFeature1.node.image}
              tag={subFeature1.node.tags[0]}
              slug={subFeature1.node.slug}
            />
            <SubFeature
              title={subFeature2.node.title}
              imgSrc={subFeature2.node.image}
              tag={subFeature2.node.tags[0]}
              slug={subFeature2.node.slug}
            />
          </div>
        </div>
      </div>
      <ListHeader
        label="The Latest"
        linkLabel="See More Latest"
        link="/latest"
      />
      <LatestList items={latest.edges} />
      <ListHeader
        label="Guides"
        linkLabel="See More Guides"
        link="/tag/guide"
      />
      <HomeListByTag items={guides.edges} />
    </Layout>
  );
}

const MainFeature = ({ title, description, imgSrc, tag, slug }) => {
  return (
    <React.Fragment>
      <div className="mb-3">
        <Link to={`/${slug}`}>
          <img
            src={imgSrc.file.url}
            className="h-72 w-max object-cover mb-3"
            alt={title}
          />
        </Link>
        {tag && (
          <div>
            <Tag text={tag} />
          </div>
        )}
        <Link
          to={`/${slug}`}
          aria-label={title}
          className="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
        >
          <p className="font-sans text-xl font-extrabold leading-none tracking-tight lg:text-3xl xl:text-4xl">
            {title}
          </p>
        </Link>
      </div>
      <p className="mb-4 text-base text-gray-700 md:text-lg">{description}</p>
    </React.Fragment>
  );
};

const SubFeature = ({ title, imgSrc, tag, slug }) => {
  return (
    <div>
      <div className="mb-3">
        <Link to={`/${slug}`}>
          <img
            src={imgSrc.file.url}
            className="lg:h-40 sm:h-72 w-max object-cover mb-3"
            alt={title}
          />
        </Link>
        <div>
          <Tag text={tag} />
        </div>
        <Link
          to={`/${slug}`}
          aria-label={title}
          className="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
        >
          <p className="font-sans text-xl font-extrabold leading-none tracking-tight lg:text-2xl">
            {title}
          </p>
        </Link>
      </div>
    </div>
  );
};
const LatestList = ({ items }) => {
  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="mb-10 border-t border-b divide-y">
        {items.map((item) => {
          const { createdAt, title, slug, image, description } = item.node;
          return (
            <LatestListItem
              date={createdAt}
              title={title}
              description={description}
              imgSrc={image}
              slug={slug}
              key={slug}
            />
          );
        })}
      </div>
    </div>
  );
};

const LatestListItem = ({ date, title, description, imgSrc, slug }) => {
  console.log({ imgSrc });
  return (
    <div className="grid py-8 sm:grid-cols-7">
      <div className="lg:col-span-2 mb-4 sm:mb-0 sm:pr-5">
        <Link to={`/${slug}`}>
          <img
            src={imgSrc.file.url}
            className="h-44 w-max object-cover"
            alt={title}
          />
        </Link>
      </div>
      <div className="lg:col-span-3">
        <div className="mb-3 lg:pr-5">
          <Link
            to={`/${slug}`}
            aria-label={title}
            className="inline-block text-black
            transition-colors duration-200 hover:text-deep-purple-accent-700"
          >
            <p className="text-3xl font-extrabold leading-none sm:text-4xl xl:text-4xl">
              {title}
            </p>
          </Link>
          <p className="text-gray-600 text-xs mt-1">{date}</p>
        </div>
      </div>
      <div className="lg:col-span-2">
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const ListHeader = ({ label, linkLabel, link }) => {
  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="flex flex-wrap justify-between items-center border-b-2 border-gray-500 border-solid pb-4 mb-8 w-full">
        <h1 className="font-sans text-xl font-extrabold lg:text-3xl xl:text-4xl">
          {label}
        </h1>
        <Link
          to={link}
          className="inline-block text-deep-purple-accent-700 hover:underline font-bold"
        >
          {linkLabel}
        </Link>
      </div>
    </div>
  );
};

const HomeListByTag = ({ items }) => {
  console.log({ items });
  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {items.map((item) => {
          const { createdAt, title, slug, image, description } = item.node;
          return (
            <HomeListByTagItem
              date={createdAt}
              title={title}
              description={description}
              imgSrc={image}
              slug={slug}
              key={slug}
            />
          );
        })}
      </div>
    </div>
  );
};

const HomeListByTagItem = ({ title, description, date, imgSrc, slug }) => {
  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded">
      <Link to={`/${slug}`} aria-label={title}>
        <img
          src={imgSrc.file.url}
          className="object-cover w-full h-64 rounded"
          alt={title}
        />
      </Link>
      <div className="py-5">
        <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
          {date}
        </p>
        <Link
          to={`/${slug}`}
          aria-label={title}
          className="inline-block mb-3 text-black transition-colors duration-200
          hover:text-deep-purple-accent-700"
        >
          <p className="text-2xl font-bold leading-none">{title}</p>
        </Link>
        <p className="mb-4 text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    featured: allContentfulArticles(
      sort: { fields: createdAt, order: DESC }
      filter: { featured: { eq: true } }
      limit: 3
    ) {
      edges {
        node {
          slug
          title
          tags
          description
          createdAt(formatString: "LL")
          image {
            file {
              url
            }
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
    latest: allContentfulArticles(
      sort: { fields: createdAt, order: DESC }
      limit: 3
    ) {
      edges {
        node {
          slug
          title
          description
          tags
          image {
            file {
              url
            }
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          createdAt(formatString: "LL")
        }
      }
    }
    guides: allContentfulArticles(
      sort: { fields: createdAt, order: DESC }
      limit: 3
      filter: { tags: { eq: "guide" } }
    ) {
      edges {
        node {
          slug
          title
          description
          tags
          image {
            file {
              url
            }
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          createdAt(formatString: "LL")
        }
      }
    }
  }
`;
