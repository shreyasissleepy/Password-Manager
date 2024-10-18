import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const name = location.state;

  const [pwd, setPwd] = useState([]);
  const [siteName, setsiteName] = useState("");
  const [siteEmail, setsiteEmail] = useState("");
  const [sitePwd, setsitePwd] = useState("");

  const getpwd = () => {
    axios
      .get("http://localhost:3000/getPasswords/" + name)
      .then((res) => setPwd(res.data.passwords))
      .catch((err) => console.error(err));
  };

  const deletepwd = (index) => {
    axios.post('http://localhost:3000/delete',{
      name:name,
      delete_index:index,
    }).then(() => {getpwd()})
  }

  const addpwd = async () => {
    await axios
      .post("http://localhost:3000/addPassword", {
        name: name,
        sitename: siteName,
        siteemail: siteEmail,
        sitepassword: sitePwd,
      })
      .then(() => {
        
        getpwd();
        
        setsiteName("");
        setsiteEmail("");
        setsitePwd("");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getpwd();
  }, []); 

  return (
    <div className="Dashboard">
      <h1>Welcome, {name}👋</h1>
      <h2>Your Saved Passwords</h2>

      <div className="funcarea">
        <div className="passwords">
          <table>
            <tr>
              <th>Reg. Website</th>
              <th>Email Used</th>
              <th>Reg. Password</th>
            </tr>
            {pwd.length > 0 ? (
            pwd.map((item, index) => (
            <tr><td>{item.sitename}</td>
            <td>{item.siteemail}</td>
            <td>{item.decryptedPassword}</td>
            <td><button className="delete" onClick={() => deletepwd(index)}>Delete</button>
            </td>
            </tr>))
          ) : (
            <p>No saved passwords available.</p>
          )}
          </table>
        </div>

        <div className="addPwd">
          <h2>Add Password</h2>
          <input
            type="text"
            value={siteName}
            placeholder="Enter Sitename"
            onChange={(e) => setsiteName(e.target.value)}
          />{" "}
          <br />
          <input
            type="text"
            value={siteEmail}
            placeholder={"Enter Email for " + siteName}
            onChange={(e) => setsiteEmail(e.target.value)}
          />{" "}
          <br />
          <input
            type="text"
            value={sitePwd}
            placeholder={"Enter Password for " + siteName}
            onChange={(e) => setsitePwd(e.target.value)}
          />{" "}
          <br />
          <button onClick={addpwd}>Add Password</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
