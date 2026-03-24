import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'

import InstagramLogo from './InstaLogo.png'
import YouTubeLogo from './YouTubeLogo.png'
import Shows from './Shows'

const IMG_COUNT = 21
const DEFAULT_IMAGE = 18

// Shuffled order: img0/1/18/19/20 spread out, img18 stays at index 18
const IMAGE_ORDER = [2, 20, 5, 6, 1, 3, 4, 8, 7, 9, 19, 10, 11, 12, 0, 13, 14, 15, 18, 16, 17]

function imgUrl(i: number): string {
  return process.env.PUBLIC_URL + `/pics/img${IMAGE_ORDER[i]}.webp`
}

function isMobileApple(): boolean {
  return /iPhone|iPad|iPod/.test(navigator.userAgent)
}

function ImageWall(): ReactElement {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set())
  const [activeImage, setActiveImage] = useState(DEFAULT_IMAGE)
  const [showShows, setShowShows] = useState(false)

  const mouseRef = useRef(0)
  const touchRef = useRef(0)
  const activeRef = useRef(activeImage)
  activeRef.current = activeImage

  const advance = useCallback(() => {
    setActiveImage((activeRef.current + 1) % IMG_COUNT)
  }, [])

  const propogateMouseMovement = useCallback(() => {
    if (showShows) return
    mouseRef.current += 1
    if (mouseRef.current % 30 === 0) advance()
  }, [showShows, advance])

  const propogateTouchMovement = useCallback(() => {
    if (showShows) return
    touchRef.current += 1
    if (touchRef.current % 20 === 0) advance()
  }, [showShows, advance])

  // Fake loading bar for the vibe
  useEffect(() => {
    setTimeout(() => setLoadingProgress(7), 500)
    setTimeout(() => setLoadingProgress(25), 250)
    setTimeout(() => setLoadingProgress(37), 500)
    setTimeout(() => setLoadingProgress(69), 1000)
    setTimeout(() => setLoadingProgress(83), 1250)
    setTimeout(() => setLoadingProgress(100), 1500)
  }, [])

  // Load hero image eagerly, then background-preload the rest one at a time
  useEffect(() => {
    const hero = new Image()
    hero.src = imgUrl(DEFAULT_IMAGE)
    hero.onload = () => {
      setLoaded(new Set([DEFAULT_IMAGE]))

      const remaining = Array.from({ length: IMG_COUNT }, (_, i) => i).filter(i => i !== DEFAULT_IMAGE)
      let idx = 0
      const loadNext = () => {
        if (idx >= remaining.length) return
        const img = new Image()
        const i = remaining[idx++]
        img.src = imgUrl(i)
        img.onload = img.onerror = () => {
          setLoaded(prev => new Set(prev).add(i))
          window.requestIdleCallback ? window.requestIdleCallback(loadNext) : setTimeout(loadNext, 50)
        }
      }
      window.requestIdleCallback ? window.requestIdleCallback(loadNext) : setTimeout(loadNext, 50)
    }
  }, [])

  const imgMap = []
  for (let i = 0; i < IMG_COUNT; i++) {
    if (!loaded.has(i)) continue
    imgMap.push(
      <img
        id={i.toString()}
        key={`id-${i}`}
        src={imgUrl(i)}
        alt=''
        decoding='async'
        className={
          i === activeImage
            ? `active bg-img img-${i}`
            : 'not-active bg-img'
        }
      />
    )
  }

  return (
    <>
      {loadingProgress === 100 ? (
        <div
          onMouseMove={propogateMouseMovement}
          onTouchMove={propogateTouchMovement}
          style={{ height: '100vh', width: '100vw' }}
        >
          <p
            style={{
              position: 'absolute',
              fontSize: 20,
              marginTop: '2vh',
              marginLeft: '2vw'
            }}
          >
            JAYDE MITCHELL
          </p>
          {!showShows && (
            <p
              style={{
                cursor: 'pointer',
                position: 'absolute',
                right: 10,
                zIndex: '100'
              }}
              onClick={() => setShowShows(true)}
            >
              Bio
            </p>
          )}
          <a
            href={
              isMobileApple()
                ? 'instagram://user?username={jayde.dm}'
                : 'https://instagram.com/jayde.dm'
            }
            rel='noopener noreferrer'
            target='_blank'
            className='logo-link instagram'
          >
            <img
              src={InstagramLogo}
              alt='instagram'
              className='logo-link instagram'
            />
          </a>
          <a
            href='https://www.youtube.com/channel/UCoza2e3hlIgzC6_4uH_YE0g'
            rel='noopener noreferrer'
            target='_blank'
            className='logo-link youtube'
          >
            <img
              src={YouTubeLogo}
              alt='YouTube'
              className='logo-link youtube'
            />
          </a>
          <div
            aria-label='label'
            style={{
              position: 'absolute',
              width: '100%',
              lineHeight: '100vw',
              verticalAlign: 'bottom',
              display: showShows ? 'none' : 'block'
            }}
          >
            A / {activeImage}
          </div>
          <div
            style={{
              backgroundColor: 'black',
              opacity: showShows ? '80%' : '50%',
              display: showShows ? 'block' : 'none',
              width: '100vw',
              height: '100vh',
              position: 'absolute'
            }}
          >
            <Shows setShowShows={setShowShows} />
          </div>
          <div aria-label='background'>{imgMap}</div>
        </div>
      ) : (
        <div>
          <h1 style={{ margin: 0 }}>JAYDE MITCHELL</h1>
          <div style={{ textAlign: 'right' }}>{loadingProgress}</div>
        </div>
      )}
    </>
  )
}

export default ImageWall
