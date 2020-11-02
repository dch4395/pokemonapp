import React from "react";

export const Loading = ({}) => (
  <center>
    <span className="fa fa-refresh fa-spin fa-1x fa-fw" />
    Loading...
  </center>
);

export const LoadingButton = () => (
  <div>
    <div className="lds-hourglass" /> Loading
  </div>
);

export const LoadingTable = ({}) => (
  <div className="lds-facebook">
    <div />
    <div />
    <div />
  </div>
);
