const fetchUsers = async () => {
  const response = await fetch('https://dummyjson.com/users?limit=5')
  const data = await response.json()
  return data.users
}

const fetchUserPosts = async (id) => {
  const response = await fetch(`https://dummyjson.com/posts/user/${id}`);
  const data = await response.json();
  return data.posts;
};

const buildTable = async () => {
  const users = await fetchUsers()
  const postsByUsers = users.map(user => fetchUserPosts(user.id)); // loop through all users and fetch posts by user id into new array
  const postsPromiseResult = await Promise.all(postsByUsers); // wait for map to finish and store all users posts array into one array

  let tableRows = ""

  users.forEach((item, index) => {

    const posts = postsPromiseResult[index].map(post => `<li>${post.title}</li>`).join(''); // loop through user post array and return an <li>

    tableRows += `
      <tr class="row">
        <td>${item.id}</td>
        <td>${item.firstName} ${item.lastName}</td>
        <td>${item.address.address}, ${item.address.city}, ${item.address.postalCode}</td>
        <td><a href="mailto:${item.email}">${item.email}</a></td>
        <td><a href="tel:${item.phone}">${item.phone}</a></td>
        <td><img src="${item.image}" width="70" /></td>
        <td>
          <ul>${posts}</ul>
        </td>
      </tr>
    `

  });

  document.querySelector('.tableBody').innerHTML = tableRows; // insert rows into table element
}

buildTable()
