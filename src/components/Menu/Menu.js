import { useHistory } from 'react-router-dom';
import './Menu.css';

function Menu() {
  const history = useHistory();
  return (
    <div className="menu">
      <button
        className="button"
        id="addAQuestionButton"
        onClick={() => history.push('/question')}
      >
        add question
      </button>

      <button
        className="button"
        id="startTestButton"
        onClick={() => history.push('/test')}
      >
        start test
      </button>
    </div>
  );
}

export default Menu;
