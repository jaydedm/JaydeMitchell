import { Button } from "@mui/material";
import { ReactElement } from "react";

interface ShowsProps {
  setShowShows: (bool: boolean) => void;
}

function Shows({ setShowShows }: ShowsProps): ReactElement {
  return (
    <div className="show-dialog">
      <div
        style={{
          color: "black",
          position: "absolute",
          right: "0",
          padding: "5px",
          cursor: "pointer",
        }}
        onClick={() => setShowShows(false)}
      >
        close
      </div>
      <div style={{ color: "black", padding: "3rem" }}>
        Jayde Mitchell grew up in the American Southwest, producing his high
        school's first Broadway musical in their cafeteria, spear heading a
        campaign with his friends and mentors resulting in a performing arts
        center being built.
        <br></br>
        <br></br>
        Some favorite moments since then: 1st Place (National Opera Association
        - Pirates of Penzance), Tenor Resident Young Artist (Ohio Light Opera),{" "}
        <em>Jeremy Heere</em> (<strong>BE MORE CHILL</strong>),{" "}
        {" "}<em>Monty Navarro</em>{" "}
        <strong>(A GENTLEMAN'S GUIDE TO LOVE AND MURDER)</strong>,{" "}
        <em>Sky Masterson</em> <strong>(GUYS & DOLLS)</strong>, <em>Joseph</em>{" "}
        <strong>(JOSEPH AND THE AMAZING TECHNICOLOR DREAMCOAT)</strong>,
        {" "}<em>Lysander</em> <strong>(A MIDSUMMER NIGHT'S DREAM)</strong> with Shakespeare's Globe,
        performances around the world including Carnegie Hall, and guest artist for the 2018 St. Louis
        Literary Award presentation to Stephen Sondheim.
        <br></br>
        <br></br>
        He is an alumni of Berklee College of Music, University of Missouri - St.
        Louis, and MIT.
        <br></br>
        <br></br>
        He spent some of his early 20s in the Software Architecture &
        Engineering space, building household-name products with some of the
        biggest companies in the world.
        <br></br>
        <br></br>
        He's thrilled to be new to Los Angeles back to pursuing his most
        important work: the arts. 
        <br></br>
        <br></br>
        He most recently appeared as{" "}
        <em>Jamie Wellerstein</em> in <strong>THE LAST FIVE YEARS</strong> with
        the GRAMMY-award winning production team at Sierra Madre Playhouse to launch
        their Centennial Season in 2024.
      </div>
    </div>
  );
}
export default Shows;
