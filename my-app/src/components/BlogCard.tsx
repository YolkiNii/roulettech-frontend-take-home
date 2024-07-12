import React, { Dispatch, SetStateAction } from "react";
import { BlogType } from "./BlogsPage";
import "./BlogCard.css";

function BlogCard({blog, setFocusBlog}: {blog: BlogType, setFocusBlog: Dispatch<SetStateAction<BlogType | undefined>>}) {
  const formatDate = () => {
    const dateList = new Date(blog.fields.pub_date).toString().split(" ");

    return `${dateList[1]} ${dateList[2]} ${dateList[3]}`
  }

  const formattedDate = formatDate()

  return (
    <article onClick={() => setFocusBlog(blog)} className="blog-card">
      <h2 className="blog-title">{blog.fields.title}</h2>
      <p><b>{formattedDate}</b></p>
    </article>
  );
}

export default BlogCard;