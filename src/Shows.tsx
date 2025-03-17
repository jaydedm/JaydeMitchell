import { ReactElement } from 'react'

interface ShowsProps {
  setShowShows: (bool: boolean) => void
}

function Shows({ setShowShows }: ShowsProps): ReactElement {
  return (
    <div className='show-dialog'>
      <div
        style={{
          color: 'black',
          position: 'absolute',
          right: '0',
          padding: '5px',
          cursor: 'pointer'
        }}
        onClick={() => setShowShows(false)}
      >
        close
      </div>
      <div style={{ color: 'black', padding: '3rem' }}>
        Jayde Mitchell grew up in the American Southwest, where he produced his
        high school’s first Broadway musical in the cafeteria and led a campaign
        with friends and mentors that resulted in the region’s first performing
        arts center being built.
        <br></br>
        <br></br>
        Some favorite moments since then: 1st Place (National Opera Association
        - Pirates of Penzance), Tenor Resident Young Artist (Ohio Light Opera),{' '}
        <em>Jeremy Heere</em> (<strong>BE MORE CHILL</strong>),{' '}
        <em>Monty Navarro</em>{' '}
        <strong>(A GENTLEMAN'S GUIDE TO LOVE AND MURDER)</strong>,{' '}
        <em>Sky Masterson</em> <strong>(GUYS & DOLLS)</strong>, <em>Joseph</em>{' '}
        <strong>(JOSEPH AND THE AMAZING TECHNICOLOR DREAMCOAT)</strong>,{' '}
        <em>Lysander</em> <strong>(A MIDSUMMER NIGHT'S DREAM)</strong> with
        Shakespeare's Globe, performances around the world including Carnegie
        Hall, and guest artist for the 2018 St. Louis Literary Award
        presentation to Stephen Sondheim.
        <br></br>
        <br></br>
        He is an alumni of Berklee College of Music, University of Missouri -
        St. Louis, and MIT.
        <br></br>
        <br></br>
        He has made contributions in the Software Architecture & Engineering
        space, building household-name products with some of the biggest
        companies in the world. He is a volunteer researcher at{' '}
        <a href='https://www.kwaai.ai/home' target='_blank' rel='noreferrer'>
          Kwaai AI Lab.
        </a>
        <br></br>
        <br></br>
        He most recently appeared as <em>Jamie Wellerstein</em> in{' '}
        <strong>THE LAST FIVE YEARS</strong> with the GRAMMY-award winning
        production team at Sierra Madre Playhouse to launch their Centennial
        Season in 2024.
        <br></br>
        <br></br>
        He lives in Los Angeles pursuing his most important work: the arts and
        empowering people with equal access to education, tools, and technology.
      </div>
    </div>
  )
}
export default Shows
