let products = []

// THEN/CATCH ==================================================

// const fetchProducts = fetch('https://jsonplaceholder.typicode.com/todos') // promise
// fetchProducts.then(response => {
//   return response.json() // another promise
// }).then(data => {
//   console.log('THEN/CATCH Method:', data) // object
// }).catch ((error) => {
//   console.log('ERROR', error)
// })

// ASYNC/AWAIT ==================================================

const fetchUserPosts = async (id) => {
  const response = await fetch(`https://dummyjson.com/posts/user/${id}`)
  const data = await response.json()
  console.log(data.posts[0].title)
  return `<li>${data.posts[0].title}></li>`
}

const fetchProductsAsync = async () => {
  try {
    const response = await fetch('https://dummyjson.com/users?limit=5') // promise
    const data = await response.json() // another promise
    console.log('ASYNC/AWAIT Method:', data) // object

    let tableRows = ""
    data.users.forEach(item => {
      // Every time this loops, a row is added to tableRows
      tableRows += `
        <tr class="row">
          <td>${item.id}</td>
          <td>${item.firstName} ${item.lastName}</td>
          <td>${item.address.address}, ${item.address.city}, ${item.address.postalCode}</td>
          <td><a href="mailto:${item.email}">${item.email}</a></td>
          <td><a href="tel:${item.phone}">${item.phone}</a></td>
          <td><img src="${item.image}" width="70" /></td>
        </tr>
      `
    })
    document.querySelector('.tableBody').innerHTML = tableRows
  
  } catch (error) {
    console.log('ERROR', error)
  }
}

fetchProductsAsync()


// ASYNC/AWAIT
const fetchData = async () => {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()
  console.log(data)
}
fetchData()

// THEN/CATCH
fetch('https://dummyjson.com/products').then(res => res.json()).then(data => console.log(data))
