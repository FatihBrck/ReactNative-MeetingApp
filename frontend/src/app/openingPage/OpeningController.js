import OpeningPage from "./OpeningPage"

const OpeningController = ({navigation}) => {
    
  const login = () => {
    navigation.navigate('LogInController');
  }
  const singup = () => {
    navigation.navigate('SingUpController');
  }

  return (
    <OpeningPage login={login}  singup={singup} />
  )
}

export default OpeningController

