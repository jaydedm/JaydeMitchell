import { lazy, Suspense } from 'react';
import './App.css';
import LoaderFallback from './LoaderFallback';

const ImageWall = lazy(() => import('./ImageWall'))
function App() {
  return (
    <div className='App' style={{
      height: '100vh',
      width: '100vw'
    }}>
      < header className='App-header'>
        <Suspense fallback={<LoaderFallback />}>
          <ImageWall />
        </Suspense>
      </header>
    </div >
  );
}

export default App;
