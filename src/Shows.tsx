import { ReactElement } from "react";

interface ShowsProps {
  setShowShows: (bool: boolean) => void;
}

function Shows({ setShowShows }: ShowsProps): ReactElement {
  return (
    <div
      className="show-dialog"
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center" /* Centers the entire block vertically */,
        alignItems: "center" /* Centers everything horizontally */,
        height: "100%",
        padding:
          "2rem" /* Safe padding so it never touches the screen edges on mobile */,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "650px",
          margin: "0 auto",
          gap: "1.5rem" /* Handles spacing between paragraphs */,
          fontFamily: '"forma-djr-text", sans-serif',
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: 400,
          fontSize: "0.9rem",
          lineHeight: 1.8,
        }}
      >
        <p style={{ margin: 0 }}>
          As a teen raised in the American Southwest, Jayde catalyzed the
          region’s first performing arts center. He's been featured with Actors
          From The London Stage, at Carnegie Hall, and at the Sheldon Concert
          Hall for Stephen Sondheim’s 2018 St. Louis Literary Award
          presentation.
        </p>
        <p style={{ margin: 0 }}>
          As a technologist and alumnus of MIT, Berklee, and UMSL, he has
          contributed to household-name software and driven award-winning
          research with Kwaii AI Lab at SCALE 22x.
        </p>
        <p style={{ margin: 0 }}>He is now based in Los Angeles.</p>

        {/* Centered Pill Button */}
        <div
          style={{
            marginTop:
              "1.5rem" /* Adds a little extra breathing room above the button */,
            padding: "8px 24px",
            border: "1px solid white",
            borderRadius: "50px",
            cursor: "pointer",
            fontFamily: '"forma-djr-text", sans-serif',
            textTransform: "uppercase",
            fontSize: "0.75rem",
            letterSpacing: "2px",
            fontWeight: 600,
          }}
          onClick={() => setShowShows(false)}
        >
          close
        </div>
      </div>
    </div>
  );
}

export default Shows;
