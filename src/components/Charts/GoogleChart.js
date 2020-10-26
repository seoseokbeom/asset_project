// import React, { Component } from "react";
// import { Treemap, Model } from "@gooddata/react-components";

// import "@gooddata/react-components/styles/css/main.css";

// import {
//     numberOfChecksIdentifier,
//     locationCityDisplayFormIdentifier,
//     locationStateDisplayFormIdentifier,
//     projectId,
// } from "utils/fixtures";

// const numberOfChecks = Model.measure(numberOfChecksIdentifier)
//     .format("#,##0")
//     .alias("# Checks");

// const locationState = Model.attribute(locationStateDisplayFormIdentifier);

// const locationCity = Model.attribute(locationCityDisplayFormIdentifier);

// export class GoogleChart extends Component {
//     onLoadingChanged(...params) {
//         // eslint-disable-next-line no-console
//         console.info("GoogleChart onLoadingChanged", ...params);
//     }

//     onError(...params) {
//         // eslint-disable-next-line no-console
//         console.info("GoogleChart onLoadingChanged", ...params);
//     }

//     render() {
//         return (
//             <div style={{ height: 300 }} className="s-tree-map">
//                 <Treemap
//                     projectId={projectId}
//                     measures={[numberOfChecks]}
//                     viewBy={locationState}
//                     segmentBy={locationCity}
//                     onLoadingChanged={this.onLoadingChanged}
//                     onError={this.onError}
//                 />
//             </div>
//         );
//     }
// }

// export default GoogleChart;
