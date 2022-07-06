import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';
import Auth from './components/Auth';
import Feed from './components/Feed';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';

const App:React.FC = () => {

  const user = useSelector(selectUser);
  const dispach = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(authUser => {
      if(authUser){
        dispach(
          login(
            {uid: authUser.uid,
              photoUrl: authUser.photoURL,
              displayName: authUser.displayName
            }));
      }else{
        dispach(logout());
      }
    })
    return () => {unSub()}
  },[dispach])


  return <>
    {
    user.uid ?(
      <div className={styles.app}>
        <Feed></Feed>
      </div>
     ):(
      <Auth></Auth>
     )
     }
    </>
}

export default App;
