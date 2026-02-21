import { useDispatch } from "react-redux";
import SingUpPage from "./SingUpPage"
import { useState } from 'react';
import { addUser } from "../../redux/User/userActions";


const SingUpController = ({ navigation }) => {

  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Worker');

  const choices = ['Worker', 'Team Leader'];

  const dispatch = useDispatch();

  const singUp = () => {
    const data = { userName: username, email: mail, password: password, role: selectedCategory }
    dispatch(addUser(data))
    
  }



  return (
    <SingUpPage
      mail={mail}
      setMail={setMail}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      singUp={singUp}
      choices={choices}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory} />
  )
}

export default SingUpController

