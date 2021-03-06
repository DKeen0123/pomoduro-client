import React from 'react';
import Axios from 'axios';
import UserContext from '../../contexts/UserContext';
import { useHistory, Link } from 'react-router-dom';
import ErrorNotice from '../ui/ErrorNotice';
import { API_HOST } from '../../constants/api';

const Login = () => {
  const [email, setEmail] = React.useState<undefined | string>();
  const [password, setPassword] = React.useState<undefined | string>();
  const [error, setError] = React.useState<null | string>(null);

  const { setUserData } = React.useContext(UserContext);
  const history = useHistory();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const logInRes = await Axios.post(`${API_HOST}/users/login`, user);
      if (setUserData) {
        setUserData({
          token: logInRes.data.token,
          user: logInRes.data.user,
        });
        localStorage.setItem('auth-token', logInRes.data.token);
        history.push('/');
      }
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="w-full flex flex-wrap">
      <div className="w-full md:w-1/2 flex flex-col">
        {error && (
          <ErrorNotice message={error} clearError={() => setError(null)} />
        )}
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">Welcome back.</p>
          <form className="flex flex-col pt-3 md:pt-8" onSubmit={submit}>
            <div className="flex flex-col pt-4">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="your@email.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <input type="submit" value="Log In" className=" button mt-8" />
          </form>
          <div className="text-center pt-12 pb-12">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="underline font-semibold">
                Register here.
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 shadow-2xl">
        <img
          alt="welcome colorful shapes"
          className="object-cover w-full h-screen hidden md:block"
          src="https://source.unsplash.com/IXUM4cJynP0"
        />
      </div>
    </div>
  );
};

export default Login;
