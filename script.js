const API_URL = "http://localhost:3000/users";

// read all users

async function getData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("something went wrong", error);
    console.log([]);
  }
}

// getData();

// get id

async function getUserById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("something went wrong", error);
    console.log(null);
  }
}

getUserById(2);

// create new user
async function createUser(user) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("something went wrong", error);
    console.log(null);
  }
}

const user1 = {
  id: crypto.randomUUID(),
  name: "John",
  surname: "Dragonball",
  email: "johnkeepingit.1000@gmail.com",
};

// setTimeout(() => {
//   createUser(updatedUser);
// }, 20000);

async function updateUser(id, user) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("something went wrong", error);
    console.log(null);
  }
}

let updatedUser = {
  name: "Goga",
  surname: "Vashakidze",
  email: "goga.vashakidze@example.com",
};

// setTimeout(() => {
//   updateUser(1, updatedUser);
// }, 10000);

async function deleteUser(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("something went wrong", error);
    console.log(null);
  }
}

// deleteUser(10);

let template = `
      <li class ='user-item'>
                    <div class='user-info'>
                        <h2>Username</h2>
                        <h2>Surname</h2>
                        <h2>Email</h2>
                    </div>
                </li>

`;

async function renderUsers() {
  const usersList = document.querySelector(".users-list");
  let users = await getData();
  console.log(users);

  usersList.innerHTML = users
    .map(
      (user) =>
        `
        <li class="user-item" data-id="${user.id}">
          <div class="user-info">
            <div class="user-name">${user.name}</div>
            <div class="user-email">${user.email}</div>
            <div class="user-id">ID: ${user.id}</div>
          </div>
          <div class='user-actions'> 
          <button class="btn btn-edit" data-user.id="${user.id}">Edit</button>
           <button class="btn btn-delete" data-user.id="${user.id}">Delete</button>
          </div>
        </li>
`
    )
    .join("");
}

document
  .querySelector("#addUserForm")
  .addEventListener("submit", async (form) => {
    form.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;

    const newUser = {
      id: crypto.randomUUID(),
      name: name,
      email: email,
    };

    const createdUser = await createUser(newUser);

    if (createdUser) {
      console.log("User created", createUser);
      document.querySelector("#addUserForm").reset();
      await renderUsers();
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  renderUsers();
});

// even delegation for edit and delete
document.querySelector("#usersList").addEventListener("click", async (e) => {
  const target = e.target;
  console.log(target);


    if (target.classList.contains("btn-edit")) {
    const userId = target.getAttribute("data-user.id");
    console.log(userId);
      await handleEditUser(userId)
    
  }

  if (target.classList.contains("btn-delete")) {
    const userId = target.getAttribute("data-user.id");
    console.log(userId);

    handleDeleteUser(userId);
  }
});

async function handleEditUser(id) {
    const user = await getUserById(id)
    
    if(user){
      document.querySelector("#addFormSection").style.display = "none"
      document.querySelector("#editFormSection").style.display = "block"

      document.querySelector("#editName").value = user.name
      document.querySelector("#editEmail").value = user.email
      document.querySelector("#editUserId").value = user.id
    }



}

document.querySelector("#editUserFrom").addEventListener("submit", async (e) => {
  e.preventDefault()
  const name = document.querySelector("#editName").value
  const email = document.querySelector("#editEmail").value
  const id = document.querySelector("#editUserId").value
  console.log(name, email, id)

  let updatedUser = {
    name: name,
    email: email,
  }

 await updateUser(id, updatedUser)
})



async function handleDeleteUser(id) {
  if (confirm("are you sure you want to delete this user?")) {
    const result = await deleteUser(id);
     if (result) {
    await renderUsers();
  }
  }

 
}
