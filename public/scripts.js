const projectList = document.getElementById('projectList');

// Fetch projects from the server
fetch('/projectlists')
  .then((response) => response.json())
  .then((projects) => {
    // Clear existing project list
    projectList.innerHTML = '';

    // Display each project in the list
    projects.forEach((project) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<a href="/projects/${project._id}">${project.title}</a>`;
      projectList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.log('Error retrieving projects:', error);
  });
