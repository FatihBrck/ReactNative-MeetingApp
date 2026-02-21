import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { allUsers } from '../../redux/User/userActions'
import UpdateReservationPage from './AudiencePage'
import { changeAudience } from '../../redux/Reservation/reservationActions'


const AudiencePage = ({ route, navigation }) => {

  const { item } = route.params;

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCategories, setSelectedCategories] = useState(item.audience);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUsers())

  },)
  
  const toggleCategory = (item) => {
    setSelectedCategories((prev) => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const updateAudience = () =>{
    const body = item.userName +'added you as a audience';
    const data = {id:item._id,audience:selectedCategories,title:'Meeting App',body:body};
    dispatch(changeAudience(data));
    navigation.navigate('MeetingsController');
  };


  return (
    <UpdateReservationPage
      item={item}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
      toggleCategory={toggleCategory}
      updateAudience={updateAudience} />
  )
}

export default AudiencePage