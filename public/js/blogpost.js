const postcomment = async (event) => {
    event.preventDefault();
  
    const content = await document.querySelector('#comment').value.trim();
    const blogpost_id  = await document.querySelector('#blogID').innerText;
    console.log(content);
    console.log(blogpost_id);
  
    if (content) {
      const response = await fetch("/api/blogposts", {
        method: 'POST',
        body: JSON.stringify({ content, blogpost_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/blogpost/${blogpost_id}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };

  const editblog = async (event) => {
    event.preventDefault();
  
    const title = await document.querySelector('#blog-name').value.trim();
    const description  = await document.querySelector('#blog-desc').value.trim();
    const blogpost_id  = await document.querySelector('#blogID').innerHTML;
  
    if (title && description) {
      const response = await fetch(`/api/blogposts`, {
        method: 'PUT',
        body: JSON.stringify({ title, description, blogpost_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/blogpost/${blogpost_id}`);
      } else {
        alert('Failed to edit');
      }
    }
  };
  
  document
    .querySelector('#comment-button')
    .addEventListener('click', postcomment);

  document
    .querySelector('#Edit')
    .addEventListener('click', editblog);