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
        Добавить вопрос
      </button>

      <button
        className="button"
        id="startTestButton"
        onClick={() => history.push('/test')}
      >
        Начать тест
      </button>
    </div>
  );
}

export default Menu;
