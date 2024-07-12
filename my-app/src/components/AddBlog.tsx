import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import baseAPI from "../api/base";
import "./AddBlog.css";
import { AxiosResponse } from "axios";
import { BlogType } from "./BlogsPage";

function AddBlog({
  setBlogs, 
  setToAddBlog
  }: {
    setBlogs: Dispatch<SetStateAction<BlogType[]>>,
    setToAddBlog: Dispatch<SetStateAction<boolean>>
  }) {
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [blogContent, setBlogContent] = useState<string>("");
  const [addBlogErrorMsg, setAddBlogErrorMsg] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!blogTitle) {
      setAddBlogErrorMsg("Title is empty");
      return;
    }

    if (!blogContent) {
      setAddBlogErrorMsg("Blog content is empty");
      return;
    }

    // Make request for creating new blog
    try {
      const response: AxiosResponse = await baseAPI.post("", {
          blogTitle,
          blogContent
        });
      
      if (response.data?.message) {
        setAddBlogErrorMsg(response.data.message);
        return;
      }
      setBlogs(response.data);
      setToAddBlog(false);
    } catch (err) {
      setAddBlogErrorMsg("Something went wrong when submitting");
    }
  }

  function onBlogTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setAddBlogErrorMsg("");
    setBlogTitle(e.target.value);
  }

  function onBlogContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setAddBlogErrorMsg("");
    setBlogContent(e.target.value);
  }

  return (
    <form className="blog-entry-form" method="post" onSubmit={handleSubmit}>
      {addBlogErrorMsg && <p className="blog-entry-error">{addBlogErrorMsg}</p>}
      <input
      className="blog-entry-title"
      type="text"
      id="blog-title"
      name="blog-title"
      placeholder="Enter a title..."
      value={blogTitle}
      onChange={onBlogTitleChange}
      maxLength={50}
      minLength={1}
      />
      <textarea
        className="blog-entry-body"
        id="blog-content"
        name="blog-content"
        placeholder="What do you want people to hear?"
        rows={5}
        cols={50}
        maxLength={250}
        minLength={1}
        value={blogContent}
        onChange={onBlogContentChange}
      >
      </textarea>
      <button 
        className="blog-entry-submit" 
        type="submit"
      >
        <b>Submit Blog</b>
      </button>
    </form>
  );
}

export default AddBlog