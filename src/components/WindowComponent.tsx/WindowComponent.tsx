import React, { useState } from "react";

function WindowComponent({children}: {children: React.ReactNode}) {
    const [windowSize, setWindowSize] = useState({width: 600, height: 400});


  return (
    <div style={{width: windowSize.width, height: windowSize.height}}>
        {children}
    </div>
  );
}

export default WindowComponent;