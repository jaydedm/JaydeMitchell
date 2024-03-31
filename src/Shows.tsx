import { Button } from '@mui/material';
import { ReactElement } from 'react';

interface ShowsProps {
  setShowShows: (bool: boolean) => void
}

function Shows({ setShowShows }: ShowsProps): ReactElement {

  return (
    <div className='show-dialog'>
      <div style={{color: 'black', position: 'absolute', right: '0', padding: '5px', cursor: 'pointer'}} onClick={() => setShowShows(false)}>close</div>
      <div className='buttonContainer'>
        <div className='showTitle'>
          The Last Five Years
        </div>
        <Button className='showButtonOrch' variant="outlined" href='https://app.arts-people.com/index.php?actions=4&p=51' target='_blank'>5/17 - 8PM</Button>
        <Button className='showButton' variant="outlined" href='https://app.arts-people.com/index.php?actions=10&p=75' target='_blank'>5/19 - 2 PM</Button>
        <Button className='showButton' variant="outlined" href='https://app.arts-people.com/index.php?actions=14&p=78' target='_blank'>5/25 - 4PM</Button>
        <Button className='showButtonOrch' variant="outlined" href='https://app.arts-people.com/index.php?actions=16&p=90' target='_blank'>5/25 - 8PM</Button>
        <Button className='showButton' variant="outlined" href='https://app.arts-people.com/index.php?actions=22&p=102' target='_blank'>6/1 - 4PM</Button>
        <Button className='showButton' variant="outlined" href='https://app.arts-people.com/index.php?actions=24&p=114' target='_blank'>6/1 - 8PM</Button>
        <Button className='showButton' variant="outlined" href='https://app.arts-people.com/index.php?actions=28&p=126' target='_blank'>6/7 - 8PM</Button>
        <Button className='showButton' variant="outlined" href='https://app.arts-people.com/index.php?actions=34&p=138' target='_blank'>6/9 - 2PM</Button>
        <Button className='showButton' variant="outlined" href='https://app.arts-people.com/index.php?actions=38&p=150' target='_blank'>6/15 - 4PM</Button>
        <Button className='showButton' variant="outlined" href='https://app.arts-people.com/index.php?actions=40&p=153' target='_blank'>6/15 - 8PM</Button>
        <br/>
        <br/>
        <span style={{ color: 'red' }}>* red with uncompromised orchestra *</span>
      </div>
    </div>
  )
}
export default Shows;