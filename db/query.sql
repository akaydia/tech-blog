USE blogpost_db;

SELECT
  blogpost.id AS blogpost_id,
  blogpost.title AS blogpost_title,
  blogpost.content AS blogpost_content,
  blogpost.date_created AS blogpost_date_created,
  comment.id AS comment_id,
  comment.content AS comment_content,
  comment.date_created AS comment_date_created,
  user.id AS user_id,
  user.username AS user_username,
  user.email AS user_email
FROM
  blogpost
  LEFT JOIN comment ON comment.blogpost_id = blogpost.id
  LEFT JOIN user ON user.id = comment.user_id;