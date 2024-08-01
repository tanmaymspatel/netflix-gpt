import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { checkValidData } from "../utils/validate";
import Header from "./Header";
import { LOGIN_BG, USER_AVATAR } from "../utils/constant";

const Login = () => {
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleForm = () => {
    setIsSignInForm((prev) => !prev);
  };

  const handleBtnClick = (e) => {
    // validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => {
              setErrorMessage(error.message);
              console.error(error);
            });
          console.log(user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ":" + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ":" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={LOGIN_BG} alt="bkg" />
      </div>
      <form
        className="absolute w-3/12 p-12 bg-black mx-auto right-0 left-0 my-36 text-white rounded-lg bg-opacity-70"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-3xl font-bold py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-800"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-800"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-800"
        />
        {/* error message */}
        <p className="text-red-700 font-bold py-2">{errorMessage}</p>
        <button
          className="p-4 my-6  bg-red-700 w-full rounded-lg"
          onClick={handleBtnClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleForm}>
          {isSignInForm
            ? "Are you new to netflix? Sign Up Now"
            : "Already have an account? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
