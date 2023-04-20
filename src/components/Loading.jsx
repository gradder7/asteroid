import React from "react";
import { Loader, Placeholder } from "rsuite";

function Loading() {
  return (
    <div>
      {/* <Placeholder.Graph active style={{ width: "100vh", height: "100vh" }} /> */}
      <Loader size="lg" center content="loading" />
    </div>
  );
}

export default Loading;
