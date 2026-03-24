import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'

import InstagramLogo from './InstaLogo.png'
import YouTubeLogo from './YouTubeLogo.png'
import Shows from './Shows'

const LANDSCAPE_ORDER = [2, 5, 6, 1, 3, 4, 8, 7, 9, 10, 11, 12, 0, 13, 18, 16]
const PORTRAIT_GROUPS = [
  [14, 15, 17],
  [19, 14, 20],
]

// Total slots: landscapes + portrait groups
const SLOT_COUNT = LANDSCAPE_ORDER.length + PORTRAIT_GROUPS.length
const DEFAULT_SLOT = 14 // img18

function imgUrlByNum(n: number): string {
  return process.env.PUBLIC_URL + `/pics/img${n}.webp`
}

const ALL_IMAGE_NUMS = Array.from(new Set([...LANDSCAPE_ORDER, ...PORTRAIT_GROUPS.flat()]))

function isMobileApple(): boolean {
  return /iPhone|iPad|iPod/.test(navigator.userAgent)
}

function ImageWall(): ReactElement {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set())
  const [activeSlot, setActiveSlot] = useState(DEFAULT_SLOT)
  const [showShows, setShowShows] = useState(false)

  const mouseRef = useRef(0)
  const touchRef = useRef(0)
  const activeRef = useRef(activeSlot)
  activeRef.current = activeSlot

  const advance = useCallback(() => {
    setActiveSlot((activeRef.current + 1) % SLOT_COUNT)
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

  useEffect(() => {
    let idx = 0
    const loadNext = () => {
      if (idx >= ALL_IMAGE_NUMS.length) return
      const img = new Image()
      const n = ALL_IMAGE_NUMS[idx++]
      img.src = imgUrlByNum(n)
      img.onload = img.onerror = () => {
        setLoaded(prev => new Set(prev).add(n))
        window.requestIdleCallback ? window.requestIdleCallback(loadNext) : setTimeout(loadNext, 50)
      }
    }
    loadNext()
  }, [])

  const isPortraitSlot = activeSlot >= LANDSCAPE_ORDER.length
  const portraitGroupIndex = activeSlot - LANDSCAPE_ORDER.length

  const imgMap = []
  if (isPortraitSlot) {
    const group = PORTRAIT_GROUPS[portraitGroupIndex]
    imgMap.push(
      <div key='portrait-group' className='active portrait-group'>
        {group.map(n => (
          <img key={`pg-${n}`} src={imgUrlByNum(n)} alt='' decoding='async' className='portrait-img' />
        ))}
      </div>
    )
  } else {
    for (let i = 0; i < LANDSCAPE_ORDER.length; i++) {
      if (!loaded.has(LANDSCAPE_ORDER[i])) continue
      imgMap.push(
        <img
          id={i.toString()}
          key={`id-${i}`}
          src={imgUrlByNum(LANDSCAPE_ORDER[i])}
          alt=''
          decoding='async'
          className={i === activeSlot ? `active bg-img img-${i}` : 'not-active bg-img'}
        />
      )
    }
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
            A / {activeSlot}
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
