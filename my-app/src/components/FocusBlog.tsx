import React, { ChangeEvent, useEffect, useState } from "react";
import { BlogType } from "./BlogsPage";
import baseAPI from "../api/base";
import { AxiosResponse } from "axios";
import "./FocusBlog.css";

type Comment = {
  fields: {
    blog: number,
    content: string,
    pub_date: string
  },
  model: string,
  pk: number
}

function FocusBlog({blog}: {blog: BlogType}) {
  const [entryComment, setEntryComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>();
  const [entryCommentErrorMsg, setEntryCommentErrorMsg] = useState<string>("");
  const [commentsErrorMsg, setCommentsErrorMsg] = useState<string>("");

  useEffect(() => {
    setEntryComment("");
    setEntryCommentErrorMsg("");
    setCommentsErrorMsg("");
    getComments();
  }, [blog]);

  const formatDate = (commentDate: string) => {
    const dateList = new Date(commentDate).toString().split(" ");

    return `${dateList[1]} ${dateList[2]} ${dateList[3]}`
  }

  async function getComments() {
    try {
      const response: AxiosResponse = await baseAPI.get(`${blog.pk}/`);

      if (response.data?.message) {
        setCommentsErrorMsg(response.data.message);
        return;
      }

      setComments(response.data);
    } catch (err) {
      console.log(err);
      setCommentsErrorMsg("Something went wrong getting comments");
    }
  }

  async function handleSubmit() {
    if (!entryComment) {
      setEntryCommentErrorMsg("Comment needs to have content");
      return;
    }

    // Make POST request for entry comment
    try {
      const response: AxiosResponse = await baseAPI.post(`${blog.pk}/`, {
        entryComment
      });

      // Check to see if response came with incorrect body
      if (response.data?.message) {
        setEntryComment(response.data.message);
        return;
      }

      setEntryComment("");
      setComments(response.data);
    } catch (err) {
      console.log(err);
      setEntryCommentErrorMsg("Comment entry failed");
    }
  }

  function onEntryCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setEntryCommentErrorMsg("");
    setEntryComment(e.target.value);
  }

  return (
    <article className="focus-blog">
      <h1 className="focus-blog-title">{blog.fields.title}</h1>
      <p className="focus-blog-content">{blog.fields.content}</p>
      <section className="comments-section">
        <h2>Comments</h2>
        <textarea
        className="entry-comment-body"
        id="entry-blog-comment"
        name="entry-blog-comment"
        placeholder="What do you think about this blog?"
        rows={5}
        cols={50}
        maxLength={250}
        minLength={1}
        value={entryComment}
        onChange={onEntryCommentChange}
      >
      </textarea>
      {entryCommentErrorMsg && <p className="comments-error">{entryCommentErrorMsg}</p>}
      <button 
        className="add-comment"
        type="button"
        onClick={handleSubmit}
      >
        <b>Add Comment</b>
      </button>
      {commentsErrorMsg ? (
        <p className="comments-error">{commentsErrorMsg}</p>
      ) : (
        comments?.length ? (
          <ul className="blog-comments">
            {comments.map(comment => {
              return (
                <li className="blog-comment" key={comment.pk}>
                  <p className="comment-date">{formatDate(comment.fields.pub_date)}</p>
                  <p className="comment-body">{comment.fields.content}</p>
                </li>
              )
            })}
          </ul>
        ) : (
          <h2>No Comments for this blog</h2>
        )
      )}
      </section>
    </article>
  );
}

export default FocusBlog;