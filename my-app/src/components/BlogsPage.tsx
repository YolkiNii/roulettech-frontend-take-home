import React, { useEffect, useState } from "react";
import './BlogsPage.css';
import baseAPI from "../api/base";
import BlogCard from "./BlogCard";
import AddBlog from "./AddBlog";
import FocusBlog from "./FocusBlog";

export type BlogType = {
  fields: {
    title: string,
    content: string,
    pub_date: string
  },
  model: string,
  pk: number
}

function BlogsPage({csrfToken}: {csrfToken: string}) {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [blogsErrorMsg, setBlogsErrorMsg] = useState<string>("");
  const [focusBlog, setFocusBlog] = useState<BlogType | undefined>();
  const [focusBlogErrorMsg, setFocusBlogErrorMsg] = useState<string>("");
  const [toAddBlog, setToAddBlog] = useState<boolean>(false);

  useEffect(() => {
    setBlogsErrorMsg("");
    getBlogs();
  }, [])

  async function getBlogs() {
    // make request for blogs
    try {
      const response = await baseAPI.get("");

      setBlogs(response.data);
    } catch (err) {
      console.log(err);
      setBlogsErrorMsg("Something went wrong when getting blogs");
    }
  }

  function openBlogForm() {
    setFocusBlog(undefined);
    setToAddBlog(true);
  }
  
  return (
    <article className='blogs-page'>
      <h1>Blogs</h1>
      {blogsErrorMsg ? (
        <h2>{blogsErrorMsg}</h2>
      ) : (
        <>
        {blogs ? (
          <ul className="blog-cards">
          {blogs.map(blog => {
            return (
              <li key={blog.pk}>
                <BlogCard blog={blog} setFocusBlog={setFocusBlog}/>
              </li>
            )
          })}
        </ul>
        ) : (
          <h2>No Blogs at the moment</h2>
        )}
        </>
      )}
      <button 
        className="blog-add" 
        disabled={csrfToken ? false : true}
        onClick={openBlogForm}
      >
        <b>Add Blog</b>
      </button>
      <section className="blog-section">
        {focusBlogErrorMsg ? (
          <h2>{focusBlogErrorMsg}</h2>
        ) : (
          <>
            {focusBlog ? (
              <FocusBlog blog={focusBlog}/>
            ) : (
              <>
                {toAddBlog && <AddBlog setBlogs={setBlogs} setToAddBlog={setToAddBlog} />}
              </>
            )}
          </>
        )}
      </section>
    </article>
  );
}

export default BlogsPage