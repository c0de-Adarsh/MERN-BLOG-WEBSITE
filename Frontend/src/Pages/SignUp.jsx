import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils';
import { setRegAlertTrue } from '../slice';
import { CgSpinnerTwo } from 'react-icons/cg';

const SignUp = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API}/signup`, {
        username,
        email,
        password,
      });

      setShowAlert('success');
      dispatch(setRegAlertTrue());
      navigate('/login');
    } catch (error) {
      setShowAlert('failed');
      console.error('Error: User already registered', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full text-white bg-gray-950 pt-14">
      <div className="flex items-center justify-center pt-14 md:px-0">
        {showAlert === 'failed' && (
          <p className="text-white fixed top-14 md:left-0 py-2 px-4 md:w-1/4 w-full font-extrabold opacity-85 bg-red-500">
            Signup Failed, Something went wrong
          </p>
        )}
        <div className="shadow-2xl bg-gray-800 p-8 rounded-lg">
          <form
            onSubmit={submitHandler}
            className="flex md:w-80 w-72 flex-col gap-2"
          >
            <h1 className="md:text-6xl font-bold text-5xl text-center">
              Register
            </h1>
            <div className="flex flex-col">
              <label className="text-xl">Username</label>
              <input
                type="text"
                required
                placeholder="Enter username"
                onChange={(e) => setUserName(e.target.value)}
                className="px-2 py-1 bg-gray-700 outline-none rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xl">Email</label>
              <input
                type="email"
                required
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                className="px-2 py-1 bg-gray-700 outline-none rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xl">Password</label>
              <input
                type="password"
                required
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                className="px-2 py-1 bg-gray-700 outline-none rounded-md"
              />
            </div>
            <div className="pt-2 flex justify-center w-full items-center flex-col">
              <button
                disabled={loading}
                className={`rounded-md w-full font-semibold text-lg py-1 text-white ${
                  loading
                    ? 'bg-blue-600 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {loading ? (
                  <div className="flex justify-center py-1 animate-spin items-center">
                    <CgSpinnerTwo size={20} />
                  </div>
                ) : (
                  'Register'
                )}
              </button>
            </div>
            <p className="text-center">
              Already have an account,{' '}
              <Link to="/login" className="underline">
                Login
              </Link>{' '}
              here.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
