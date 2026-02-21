import { useDispatch } from "react-redux";
import LogInPage from "./LogInPage"
import { useState } from 'react';
import { fetchLogin, getUserData } from "../../redux/User/userActions";


const LogInController = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logIn = async () => {

    const loginData = { userName: email, password: password };
    const a = await dispatch(fetchLogin(loginData));
    setEmail('')
    setPassword('')
    await dispatch(getUserData());
  }

  return (
    <LogInPage email={email} setEmail={setEmail} password={password} setPassword={setPassword} logIn={logIn} />
  )
}

export default LogInController
