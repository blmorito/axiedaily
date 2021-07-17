import { Link } from "gatsby";
import React from "react";
import Img from "gatsby-image";
const PostCardNoTag = ({ title, date, description, imgSrc, slug }) => {
  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-primary rounded">
      <Link to={`/${slug}`} aria-label="Article">
        <Img
          fluid={imgSrc.fluid}
          className="object-cover w-full h-64 rounded"
        />
      </Link>
      <div className="py-5">
        <p className="mb-2 text-xs font-semibold text-text-main uppercase">
          {date}
        </p>
        <Link
          to={`/${slug}`}
          aria-label="Article"
          className="inline-block mb-3 text-text-main transition-colors duration-200 hover:text-deep-purple-accent-700"
        >
          <p className="text-2xl font-bold leading-none">{title}</p>
        </Link>
        <p className="mb-4 text-text-main">{description}</p>
      </div>
    </div>
  );
};

export default PostCardNoTag;
