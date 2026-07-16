import React from "react";
import "./notifier.css"

interface Notify {
  called: boolean;
  message: string;
}

interface StateHook {
  CSS: {
    display: "none" | "flex";
    backgroundColor: "transparent" | "#f4ffdb";
    color: "transparent" | "#8ead47"
  };
  called: boolean;
}

const Notify = ({ called, message }: Notify): JSX.Element => {
  // When button click happens, assign display ::= flex
  // assign visible colors to color and background-color
  const [state, setState] = React.useState<StateHook>({ CSS: {
    "display": "none",
    "backgroundColor": "transparent",
    "color": "transparent"
    }, called: called
  });

  React.useEffect(() => {
    called 
      ? fadeIn() 
      : null;
  }, [called])

  function fadeIn() {
    // Set display to flex
    setState({ 
      CSS: {
      "display": "flex",
      "backgroundColor": "transparent",
      "color": "transparent",
      },
      called: state.called, 
    });

    // Set colors
    setTimeout(() => {
      setState({ 
        CSS: {
        "display": "flex",
        "backgroundColor": "#f4ffdb",
        "color": "#8ead47"
        },
        called: state.called
      });
    }, 250); // Comes up with 250ms delay

    // 5s before fadeout
    setTimeout(() => fadeOut(), 5 * 1000);
  }

  function fadeOut() {
    // Set the css values to transparent 
    setState({ 
      CSS: {
        "display": "flex",
        "backgroundColor": "transparent",
        "color": "transparent"
      },
      called: state.called
    });

    setTimeout(() => close(), 2 * 1000); // close up after 2 seconds
  }

  function close() {
    // Resets the state:
    // Set's display to none
    // and state.called to false.
    setState({ 
      called: false,
      CSS: {
      "display": "none",
      "backgroundColor": "transparent",
      "color": "transparent"
      }
    });
  }

  return (
    <div 
      className="notifier"
      style={{
        display: state.CSS.display,
        backgroundColor: state.CSS.backgroundColor,
        color: state.CSS.color
      }}
    >
      <span 
        id="notifier__close" 
        onClick={() => close()}
        style={{ color: state.CSS.color }}
        >
        X
      </span>
      <p className="notifier__message">{message}</p>
    </div>
  );
}

export default Notify;
