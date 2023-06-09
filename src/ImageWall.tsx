import { ReactElement, useEffect, useRef, useState } from 'react';

import InstagramLogo from './InstaLogo.png';
import YouTubeLogo from './YouTubeLogo.png';

function ImageWall(): ReactElement {

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeImage, setActiveImage] = useState(7);
  const [showShows, setShowShows] = useState(false);

  const mouseRef = useRef(0);
  const touchRef = useRef(0);

  let imgMap = [];

  for (let i = 0; i <= 22; i++) {
    const img = <img id={i.toString()} key={`id-${i}`} src={process.env.PUBLIC_URL + `/pics/img${i}.jpeg`} alt='' className={i === activeImage ? `active bg-img img-${i.toString()}` : 'not-active bg-img'}></img >
    imgMap.push(img);
  }

  const propogateMouseMovement = () => {
    if (!showShows) {
      mouseRef.current += 1;
      if (mouseRef.current % 17 === 0) {
        setActiveImage((activeImage + 1) % 22)
      }
    }
  }

  const propogateTouchMovement = () => {
    if (!showShows) {
      touchRef.current += 1;
      if (touchRef.current % 12 === 0) {
        setActiveImage((activeImage + 1) % 22)
      }
    }
  }

  function getOS() {
    var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (/Linux/.test(platform)) {
      os = 'Linux';
    }

    return os;
  }

  useEffect(() => {
    setTimeout(() => setLoadingProgress(7), 500)
    setTimeout(() => setLoadingProgress(25), 500)
    setTimeout(() => setLoadingProgress(37), 1000)
    setTimeout(() => setLoadingProgress(69), 2000)
    setTimeout(() => setLoadingProgress(83), 2500)
    setTimeout(() => setLoadingProgress(100), 3000)
  }, [])

  return (
    <>
      {loadingProgress === 100 ?
        <div onMouseMove={propogateMouseMovement} onTouchMove={propogateTouchMovement} style={{ height: '100vh', width: '100vw' }}>
          <p style={{ position: 'absolute', fontSize: 20, marginTop: '2vh', marginLeft: '2vw' }}>JAYDE MITCHELL</p>
          <p style={{ cursor: 'pointer', position: 'absolute', right: 10, zIndex: '100' }} onClick={() => setShowShows(!showShows)}>Shows</p>
          <a href={getOS() === 'iOS' ? "instagram://user?username={jayde.dm}" : "https://instagram.com/jayde.dm"} rel="noopener noreferrer" target="_blank" className='logo-link instagram'><img src={InstagramLogo} alt='instagram' className='logo-link instagram'></img></a>
          <a href='https://www.youtube.com/channel/UCoza2e3hlIgzC6_4uH_YE0g' rel="noopener noreferrer" target="_blank" className='logo-link youtube'><img src={YouTubeLogo} alt='YouTube' className='logo-link youtube'></img></a>
          <div style={{ position: 'absolute', width: '100%', lineHeight: '100vw', verticalAlign: 'bottom' }}>
            A / {activeImage}
          </div>
          <div style={{ backgroundColor: 'black', opacity: '50%', display: showShows ? 'block' : 'none', width: '100%', height: '100%', position: 'absolute' }}>

            <table className='show-container'>
              <tbody>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
                <tr style={{ color: 'black' }}>
                  <td>
                    <div className='show'>4/14</div>
                  </td>
                  <td>
                    <a href='https://desert-theatricals.ticketleap.com/joseph-and-the-amazing-technicolor-dreamcoat/'>Joseph <br></br>Rancho Mirage</a>
                  </td>
                </tr>
                <tr style={{ color: 'black' }}>
                  <td>
                    <div className='show'>4/15</div>
                  </td>
                  <td>
                    <a href='https://desert-theatricals.ticketleap.com/joseph-and-the-amazing-technicolor-dreamcoat/'>Joseph <br></br>Rancho Mirage</a>
                  </td>
                </tr>
                <tr style={{ color: 'black' }}>
                  <td>
                    <div className='show'>4/16</div>
                  </td>
                  <td>
                    <a href='https://desert-theatricals.ticketleap.com/joseph-and-the-amazing-technicolor-dreamcoat/'>Joseph <br></br>Rancho Mirage</a>
                  </td>
                </tr>
                <tr style={{ color: 'black' }}>
                  <td>
                    <div className='show'>6/30</div>
                  </td>
                  <td>
                    <a href='https://www.axs.com/events/469394/joseph-the-amazing-technicolor-dreamcoat-tickets?skin=saban'>Joseph <br></br>Beverly Hills</a>
                  </td>
                </tr>
                <tr style={{ color: 'black' }}>
                  <td>
                    <div className='show'>7/1</div>
                  </td>
                  <td>
                    <a href='https://www.axs.com/events/469477/joseph-the-amazing-technicolor-dreamcoat-tickets'>Joseph <br></br>Beverly Hills</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {imgMap}
        </div>
        : (
          <div>
            <h1 style={{ margin: 0 }}>JAYDE MITCHELL</h1>
            <div style={{ textAlign: 'right' }}>{loadingProgress}</div>
          </div>
        )
      }
    </>
  )
}

export default ImageWall;
