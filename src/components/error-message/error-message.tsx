import img from './error.gif';
import './error-message.scss';

const ErrorMessage = (): JSX.Element => {
  return (
    <img className='error-img' src={img} alt="Error"/>
  )
}

export default ErrorMessage;