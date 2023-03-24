
// ------------Post Comment Function------------
const postcomment = async (event) => {
    event.preventDefault();
  
    const content = await document.querySelector('#Comment').value.trim();
    const blogpost_id  = await document.querySelector('#blogID').innerHTML;
  
  
    if (comment_descr) {
      const response = await fetch("/api/BlogPosts", {
        method: 'POST',
        body: JSON.stringify({ content, blogpost_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/BlogPost/${blogpost_id}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };

  // ------------Edit Blog Function------------
  const editblog = async (event) => {
    event.preventDefault();
  
    const title = await document.querySelector('#NEWblog-name').value.trim();
    const description  = await document.querySelector('#NEWblog-desc').value.trim();
    const blogpost_id  = await document.querySelector('#blogID').innerHTML;
  
  
    if (title && description) {
      const response = await fetch(`/api/BlogPosts`, {
        method: 'PUT',
        body: JSON.stringify({ title, description, blogpost_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/Blogpost/${blogpost_id}`);
      } else {
        alert('Failed to edit');
      }
    }
  };
  
//------------listners------------
  document
    .querySelector('#comment-button')
    .addEventListener('click', postcomment);

  document
    .querySelector('#Edit')
    .addEventListener('click', editblog);