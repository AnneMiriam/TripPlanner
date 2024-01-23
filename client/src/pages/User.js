import NavBar from "../components/NavBar";
// import { useState, useEffect } from "react";
// import UserCard from "../components/UserCard";


function User() {
  // const [users, setUsers] = useState([])

  // useEffect(() =>{
  //   fetch("/user")
  //     .then(r => r.json())
  //     .then(data => setUsers(data))
  //     .catch(error => console.error(error));
  // }, []);
  
  // const userList = users.map(user =>{
  //   return <UserCard key={user.id} user={user}/>
  // });
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>User Login</h1>
        <form>
          <div>
            <label for="username">Username: </label>
            <input id="username" type="text" name="username" placeholder="Username" />
          </div>
          <br/>
          <div>
            <label for="password">Password: </label>
            <input id="password" type="password" name="password" placeholder="Password" />
          </div>
          <br/>
          
          <button type="submit">Submit</button>
          <button type="submit">Sign-up</button>
        </form>
        {/* {userList} */}
      </main>
    </>
  );
};
  
  export default User;