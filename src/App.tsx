
import { Routes, Route } from 'react-router';

import Home from './components/home/Home';
import FileExplorer from './components/file-explorer/FileExplorer';

import './App.css'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/file-explorer" element={<FileExplorer />} />
      </Routes>
    </>
  )
}

export default App
