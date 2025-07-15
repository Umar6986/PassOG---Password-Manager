import { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let passwordArray;
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("eyecross.png")) {
      ref.current.src = "eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      setForm({ site: "", username: "", password: "" });
      toast("Password Saved", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Fields must contain atleast 4 charcters");
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id", id);
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = (id) => {
    console.log("Deleting password with id", id);
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
    toast("Password Deleted", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copy to clipboard", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="text-4xl text-white p-2 md:p-0 md:mycontainer min-h-[76.6vh] bg-black py-4">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500 ">&lt;</span>
          Pass
          <span className="text-green-500">OG/&gt;</span>
        </h1>
        <p className="white text-lg text-center">Your own Password Manager</p>
        <div className="text-white flex flex-col p-4 gap-5 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-3 text-xl"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-5">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1 text-xl"
              type="text"
              name="username"
              id="username"
            />

            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-3 text-xl"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-3 top-5 cursor-pointer"
                onClick={showPassword}>
                <img ref={ref} className="w-6" src="eye.png" alt="" />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-600 hover:bg-green-500 rounded-full px-6 py-2 text-xl font-bold w-fit gap-2 border-2 border-white cursor-pointer">
            <lord-icon
              src="https://cdn.lordicon.com/gzqofmcx.json"
              trigger="hover"
              colors="primary:#ffffff"></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords items-center">
          <h2 className="font-bold text-3xl py-4 flex justify-center items-center">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <div className="overflow-x-auto md:overflow-visible pb-6">
              <table className="table-auto min-w-[600px] w-full md:w-320 rounded-md overflow-hidden ml-2 md:ml-7">
                <thead className="bg-green-800 text-white border-2 border-white text-base md:text-3xl">
                  <tr>
                    <th className="py-2">Website</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Passwords</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="border-2 border-white text-sm md:text-2xl">
                  {passwordArray.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center w-32 py-2 border-1">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer">
                          {item.site}
                        </a>
                        <lord-icon
                          className="cursor-pointer inline-block"
                          onClick={() => copyText(item.site)}
                          src="https://cdn.lordicon.com/cfkiwvcc.json"
                          trigger="hover"
                          style={{
                            width: "25px",
                            height: "25px",
                            paddingLeft: "3px",
                          }}
                          colors="primary:#faf9d1"></lord-icon>
                      </td>
                      <td className="text-center w-32 py-2 border-1">
                        {item.username}
                        <lord-icon
                          className="cursor-pointer inline-block"
                          onClick={() => copyText(item.username)}
                          src="https://cdn.lordicon.com/cfkiwvcc.json"
                          trigger="hover"
                          style={{
                            width: "25px",
                            height: "25px",
                            paddingLeft: "3px",
                          }}
                          colors="primary:#faf9d1"></lord-icon>
                      </td>
                      <td className="text-center w-32 py-2 border-1">
                        {item.password}
                        <lord-icon
                          className="cursor-pointer inline-block"
                          onClick={() => copyText(item.password)}
                          src="https://cdn.lordicon.com/cfkiwvcc.json"
                          trigger="hover"
                          style={{
                            width: "25px",
                            height: "25px",
                            paddingLeft: "3px",
                          }}
                          colors="primary:#faf9d1"></lord-icon>
                      </td>
                      <td className="text-center w-32 py-2 border-1">
                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => editPassword(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingLeft: "3px",
                            }}
                            colors="primary:#ffffff,secondary:#faddd1"></lord-icon>
                        </span>

                        <span
                          className="cursor-pointer"
                          onClick={() => deletePassword(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingLeft: "3px",
                            }}
                            colors="primary:#ffffff,secondary:#faddd1"></lord-icon>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
