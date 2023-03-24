// ------------ post new blog function ------------
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = await document.querySelector('#blog-name').value.trim();
  const description = await document.querySelector('#blog-desc').value.trim();

  console.log(JSON.stringify({ title, description }))

  if (title && description) {
    const response = await fetch("api/dashboard", {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blog');
    }
  }
};

// ------------ delete blog function------------
const ButtonHandler = async (event) => {
  if(event.target.value = "Delete") {

    console.log(event.target.value)

    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      const response = await fetch(`/api/dashboard/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog');
      }
    }
  } else {
    console.log("nothing")
  }
};

// ------------listners------------
document
  .querySelector('#post-button')
  .addEventListener('click', newFormHandler);

document
  .querySelector('#myBlogs')
  .addEventListener('click', ButtonHandler);