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
  const usersList = document.querySelector(".user-list");
  let users = await getData();
  console.log(users);

  usersList.innerHTML = users
    .map(
      (user) =>
        `
             <li class ='user-item'>
                    <div class='user-info'>
                        <h2>${user.name}</h2>
                        <h2>${user.surname}</h2>
                        <h2>${user.email}</h2>
                    </div>
                </li>

        `
    )
    .join("");
}

renderUsers();
