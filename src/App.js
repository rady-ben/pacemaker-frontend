import './App.css';
import Header from './component/Header';
import Drawer from './component/Drawer';

const modules = [
  'Module 1',
  'Module 2',
  'Module 3',
  'Module 4',
  'Module 5',
  'Module 6',
  'Module 7',
  'Module 8',
  'Module 9',
  'Module 10',
  'Module 11',
  'Module 12',
]


function App() {
  return (
    <div className="App">
      <Header />
      <Drawer listItems={modules} />
    </div>
  );
}

export default App;
