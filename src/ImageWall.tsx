import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import InstagramLogo from './InstaLogo.png';
import YouTubeLogo from './YouTubeLogo.png';

function ImageWall(): ReactElement {
  const imgs: string[] = useMemo(() => [
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/086D9D1A-0CCC-4852-A0C0-3DB086CDB42D.JPG',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/176118BE-C75E-4599-9253-FDC883E19843.JPG',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/1A9C7EA8-84EE-4AB1-A8F9-CC24C372014C.JPG',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/2744AE00-C0EC-488D-BB2E-D16DE40977A8.JPG',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/353785006377-R1-011-4.JPG',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/353785006377-R1-017-7.JPG',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/353785006377-R1-027-12.JPG',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/517313A3-3D4F-4A4F-86CF-29023D3941BF.JPG',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/86BCF4C8-1385-4B2A-8AD4-D23A17511C27.JPG',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/8D423F0F-EE80-4AD7-9B92-05743303EC1B.JPG',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/9492F986-7755-4B56-9DDF-90E090529EB3.JPG',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/9D4D5C2D-4950-4570-BD03-2464BE8E080A.JPG',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/dscf1903.jpeg',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/dscf1910.jpeg',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/F066C449-97FB-4808-9A67-57A10D15F8A5.JPG',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/F6954D3D-E235-43B0-AEA5-5755C5FAFF67.JPG',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/IMG7690-R01-025A.jpg',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/IMG7692-R01-003A.jpg',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/IMG7692-R01-007A.jpg',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/IMG7692-R01-023A.jpg',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/IMG7968-R01-000A_1.jpg',
    'https://s3.us-west-2.amazonaws.com/jaydemitchell.com/NewPictures/IMG7968-R01-010A.jpg',
  ], []);

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
    <img id={index.toString()} key={img.url} src={img.url} alt='' className={index === activeImage ? `active bg-img img-${index.toString()}` : 'not-active bg-img'}></img>
  ));

  const propogateMouseMovement = () => {
    if (!showShows) {
      mouseRef.current += 1;
      if (mouseRef.current % 30 === 0) {
        setActiveImage((activeImage + 1) % 22)
      }
    }
  }

  const propogateTouchMovement = () => {
    if (!showShows) {
      touchRef.current += 1;
      if (touchRef.current % 25 === 0) {
        setActiveImage((activeImage + 1) % 22)
      }
    }
  }

  return (
    <>
      {loadingProgress === 100 ?
        <div onMouseMove={propogateMouseMovement} onTouchMove={propogateTouchMovement} style={{height: '100vh', width: '100vw'}}>
          <p style={{ position: 'absolute', fontSize: 20, marginTop: '2vh', marginLeft: '2vw' }}>JAYDE MITCHELL</p>
          <p style={{ cursor: 'pointer', position: 'absolute', right: 10, zIndex: '100' }} onClick={() => setShowShows(!showShows)}>Shows</p>
          <a href='"instagram://user?username={jayde.dm}"' rel="noopener noreferrer" target="_blank"><img src={InstagramLogo} alt='instagram' className='logo-link instagram'></img></a>
          <a href='https://www.youtube.com/channel/UCoza2e3hlIgzC6_4uH_YE0g' rel="noopener noreferrer" target="_blank"><img src={YouTubeLogo} alt='YouTube' className='logo-link youtube'></img></a>
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
