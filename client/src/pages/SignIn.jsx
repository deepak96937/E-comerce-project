// import React, { useState } from 'react'
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { singinStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
// import OAuth from '../components/OAuth';


// const SignIn = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const { loading, error } = useSelector((state) => state.user)

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(singinStart())

//     try {
//       const res = await fetch("/api/auth/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (data.success === false) {
//         dispatch(signInFailure(data.message))
//         return
//       }

//       dispatch(signInSuccess(data))
//       navigate("/")
//     } catch (err) {
//       dispatch(signInFailure(error.message));
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Sign In</h1>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">

//           <input
//             type="email"
//             placeholder="Email"
//             className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             id="email"
//             onChange={handleChange}
//             value={formData.email}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             id="password"
//             onChange={handleChange}
//             value={formData.password}
//           />
//           <button
//             disabled={loading}
//             className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
//           >
//             {loading ? "Loading..." : "Sign In"}
//           </button>
//           <OAuth />
//         </form>

//         {error && <p className="text-red-500 text-center mt-3">{error}</p>}

//         <div className="text-center mt-5">
//           <p className="text-gray-600">
//             Don't have an account?{" "}
//             <Link to="/sign-up" className="text-blue-600 hover:underline">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );


// }

// export default SignIn



import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.user)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err.message)); // ✅ fixed here
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
          <button
            disabled={loading}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        <div className="text-center mt-5">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn

