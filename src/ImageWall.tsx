import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import img0 from './pics/img0.jpeg';
import img1 from './pics/img1.jpeg';
import img2 from './pics/img2.jpeg';
import img3 from './pics/img3.jpeg';
import img4 from './pics/img4.jpeg';
import img5 from './pics/img5.jpeg';
import img6 from './pics/img6.jpeg';
import img7 from './pics/img7.jpeg';
import img8 from './pics/img8.jpeg';
import img9 from './pics/img9.jpeg';
import img10 from './pics/img10.jpeg';
import img11 from './pics/img11.jpeg';
import img12 from './pics/img12.jpeg';
import img13 from './pics/img13.jpeg';
import img14 from './pics/img14.jpeg';
import img15 from './pics/img15.jpeg';
import img16 from './pics/img16.jpeg';
import img17 from './pics/img17.jpeg';
import img18 from './pics/img18.jpeg';
import img19 from './pics/img19.jpeg';
import img20 from './pics/img20.jpeg';
import img21 from './pics/img21.jpeg';
import img22 from './pics/img22.jpeg';

import InstagramLogo from './InstaLogo.png';
import YouTubeLogo from './YouTubeLogo.png';

function ImageWall(): ReactElement {

  const imgs = useMemo(() => [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22], [])

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [retrievedImgArray, setRetrievedImgArray] = useState([]);
  const [activeImage, setActiveImage] = useState(7);
  const [showShows, setShowShows] = useState(false);

  const mouseRef = useRef(0);
  const touchRef = useRef(0);

  function delay(ms: any) {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        console.log(`Waited ${ms}`);
        resolve();
      }, ms);
    });
  }

  const allProgress = useCallback((proms: any, progress_cb: any) => {
    let d = 0;
    progress_cb(0);
    proms.unshift(delay(50), delay(2000))
    for (const p of proms) {
      // eslint-disable-next-line no-loop-func
      p.then(() => {
        d++;
        progress_cb((d * 100) / proms.length);
      });
    }
    return Promise.all(proms);
  }, []);


  useEffect(() => {
    const fetchImages: any = imgs.map(imgURL => fetch(imgURL));
    allProgress(fetchImages, (p: any) => {
      setLoadingProgress(Number(p.toFixed()))
    }).then((res: any) => setRetrievedImgArray(res.filter(Boolean)));


  }, [allProgress, imgs])

  const imgMap = retrievedImgArray.map((img: any, index) => (
    <img id={index.toString()} key={`id-${index}`} src = { img.url } alt = '' className = { index === activeImage ? `active bg-img img-${index.toString()}` : 'not-active bg-img'}></img >
  ));

const propogateMouseMovement = () => {
  if (!showShows) {
    mouseRef.current += 1;
    if (mouseRef.current % 10 === 0) {
      setActiveImage((activeImage + 1) % 22)
    }
  }
}

const propogateTouchMovement = () => {
  if (!showShows) {
    touchRef.current += 1;
    if (touchRef.current % 20 === 0) {
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
            <tr>
              <th></th>
              <th></th>
            </tr>
            <tr style={{ color: 'black' }}>
              <td>
                <div className='show'>4/14</div>
                <a href='https://desert-theatricals.ticketleap.com/joseph-and-the-amazing-technicolor-dreamcoat/'>Joseph and the Amazing Technicolor Dreamcoat <br></br>Rancho Mirage</a>
              </td>
              <td>
                <div className='show'>4/15</div>
                <a href='https://desert-theatricals.ticketleap.com/joseph-and-the-amazing-technicolor-dreamcoat/'>Joseph and the Amazing Technicolor Dreamcoat <br></br>Rancho Mirage</a></td>
            </tr>
            <tr style={{ color: 'black' }}>
              <td>
                <div className='show'>4/16</div>
                <a href='https://desert-theatricals.ticketleap.com/joseph-and-the-amazing-technicolor-dreamcoat/'>Joseph and the Amazing Technicolor Dreamcoat <br></br> Rancho Mirage</a>
              </td>
              <td>
                <div className='show'>6/30</div>
                <a href='https://desert-theatricals.ticketleap.com/joseph-and-the-amazing-technicolor-dreamcoat/'>Joseph and the Amazing Technicolor Dreamcoat <br></br> Beverly Hills</a>
              </td>
            </tr>
            <tr style={{ color: 'black' }}>
              <td>
                <div className='show'>7/1</div>
                <a href='https://desert-theatricals.ticketleap.com/joseph-and-the-amazing-technicolor-dreamcoat/'>Joseph and the Amazing Technicolor Dreamcoat <br></br> Beverly Hills</a>
              </td>
            </tr>
          </table>
        </div>

        {imgMap}
      </div>
      : (
        <div>
          <h1 style={{ margin: 0 }}>JAYDE MITCHELL</h1>
          <div style={{ textAlign: 'right' }}>{loadingProgress}</div>
        </div>
      )}
  </>
)
}

export default ImageWall;
