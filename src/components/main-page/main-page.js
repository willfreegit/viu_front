import RegistrationComponent from '../sign-in/registration-component';
import BodyComponent from './body-component';
import HeaderComponent from './header-component';
import './main.css';

export default function MainComponent() {
  return (
    <div>
        <BodyComponent></BodyComponent>
        <RegistrationComponent></RegistrationComponent>
    </div>
    
  )
}
