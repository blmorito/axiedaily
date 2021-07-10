import { Link } from "gatsby"
import React from "react"
import Tag from "./Tag"
const PostCard = ({ slug, title, tag, description, date, imgUrl }) => {
  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded">
      <Link to={`/${slug}`} aria-label="Article">
        <img src={imgUrl} className="object-cover w-full h-64 rounded" alt="" />
      </Link>
      <div className="py-5">
        <div>
          <Tag text={tag} />
        </div>
        <Link
          to={`/${slug}`}
          aria-label="Article"
          className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
        >
          <p className="text-2xl font-bold leading-none">{title}</p>
        </Link>
        <p className="mb-4 text-gray-700">{description}</p>
        <p className="mt-2 text-xs font-semibold text-gray-600 uppercase">
          {date}
        </p>
      </div>
    </div>
  )
}
export default PostCard
