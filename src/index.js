import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/album-slice';
import 'font-awesome/css/font-awesome.min.css'; 
import './index.css';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
