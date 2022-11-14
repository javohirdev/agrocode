import { useAuthValue } from '../AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../config'
import profile from '../assets/profile.png';
import Content from './Product'
import '../styles/Profile.css'

function Profile() {
  const { currentUser } = useAuthValue()

  return (
    <div className='center'>
      <div className='profile'>
        <p onClick={() => signOut(auth)}>
          <img src={profile} alt="profile" />
          {currentUser?.email}
        </p>

        <Content />
      </div>
    </div>
  )
}

export default Profile;