import { css } from "uebersicht"; // emotion css - never played with it :(
export const CITY = "YOUR_CITY"; // defaut city "beijing" - change to your city name
export const TOKEN = "AQI_TOKEN"; // Get one at https://aqicn.org/api/ (Free)

//fetch the api
export const command = dispatch => {
  fetch(`https://api.waqi.info/feed/${CITY}/?token=${TOKEN}`)
    .then(res => {
      res.json().then(data => {
        dispatch({ type: "FETCH_SUCCEDED", data: data });
      });
    })
    .catch(error => {
      dispatch({ type: "FETCH_FAILED", error: error });
    });
};

export const refreshFrequency = 900000; // ms
export const render = state => {
  function InvLinear(AQIhigh, AQIlow, Conchigh, Conclow, aqi) {
    var AQIhigh;
    var AQIlow;
    var Conchigh;
    var Conclow;
    var aqi;
    var c;
    c = ((aqi - AQIlow) / (AQIhigh - AQIlow)) * (Conchigh - Conclow) + Conclow;
    return c;
  }
  function AqiToPm25(aqi) {
    var ConcCalc;
    if (aqi >= 0 && aqi <= 50) {
      ConcCalc = InvLinear(50, 0, 12, 0, aqi);
    } else if (aqi > 50 && aqi <= 100) {
      ConcCalc = InvLinear(100, 51, 35.4, 12.1, aqi);
    } else if (aqi > 100 && aqi <= 150) {
      ConcCalc = InvLinear(150, 101, 55.4, 35.5, aqi);
    } else if (aqi > 150 && aqi <= 200) {
      ConcCalc = InvLinear(200, 151, 150.4, 55.5, aqi);
    } else if (aqi > 200 && aqi <= 300) {
      ConcCalc = InvLinear(300, 201, 250.4, 150.5, aqi);
    } else if (aqi > 300 && aqi <= 400) {
      ConcCalc = InvLinear(400, 301, 350.4, 250.5, aqi);
    } else if (aqi > 400 && aqi <= 500) {
      ConcCalc = InvLinear(500, 401, 500.4, 350.5, aqi);
    } else {
      ConcCalc = "PM25message";
    }
    return ConcCalc;
  }

  const cityaqi = Math.round((AqiToPm25(state.aqi) * 10) / 10);
  const cig = cityaqi / 22;
  const cigr = Math.round(cig * 10) / 10;
  var firstWord = state.cityname.replace(/(([^\s]+\s\s*){2})(.*)/, "$1…"); // limit the cityname to only 2 words
  function check() {
    if (state.aqi <= 50) {
      // excellent
      return (
        <div>
          <div className={header}>Airflo</div>
          <div className={main}>
            <p className={height}> {`📍 ${firstWord}`}</p>
            <p className={height}> {`💚  ${state.aqi} AQI - Excellent Day`}</p>
            <p className={height}>🏃 Suitable for outdoor activities</p>
            <p className={height}>😍 Enjoy this wonderfull day</p>
          </div>
          <span className={Small}>Updated {`${state.daterr}`}</span>
          <div className={image_g} />
        </div>
      );
    } else if (state.aqi <= 100) {
      // moderate
      return (
        <div>
          <div className={header}>Airflo</div>
          <div className={main}>
            <p className={height}> {`📍 ${firstWord}`}</p>
            <p className={height}> {`💛  ${state.aqi} AQI - Moderate`}</p>
            <p className={height}>🚶 Go easy on outdoor activities</p>
            <p className={height}>😷 We recommend wearing a mask</p>
            <p className={height}>🚬 Equivalent to smoking {cigr} cigs/day</p>
          </div>
          <span className={Small}>Updated {`${state.daterr}`}</span>

          <div className={image_y} />
        </div>
      );
    } else if (state.aqi <= 150) {
      // a bit polluted
      return (
        <div>
          <div className={header}>Airflo</div>
          <div className={main}>
            <p className={height}> {`📍 ${firstWord}`}</p>
            <p className={height}>{`💔 ${state.aqi} AQI - Lightly Polluted`}</p>
            <p className={height}>🚶 Reduce outdoor activities</p>
            <p className={height}>😷 Wear a mask</p>
            <p className={height}>🚬 Equivalent to smoking {cigr} cigs/day</p>
          </div>
          <span className={Small}>Updated {`${state.daterr}`}</span>
          <div className={image_y} />
        </div>
      );
    } else if (state.aqi <= 200) {
      //unhealthy
      return (
        <div>
          <div className={header}>Airflo</div>
          <div className={main}>
            <p className={height}> {`📍 ${firstWord}`}</p>
            <p className={height}> {`👎  ${state.aqi} AQI - Unhealthy`}</p>
            <p className={height}>🚳 Not suitable for outdoor activities</p>
            <p className={height}>😷 Wear a mask</p>
            <p className={height}>🚬 Equivalent to smoking {cigr} cigs/day</p>
          </div>
          <span className={Small}>Updated {`${state.daterr}`}</span>

          <div className={image_r} />
        </div>
      );
    } else if (state.aqi <= 300) {
      // very polluted
      return (
        <div>
          <div className={header}>Airflo </div>
          <div className={main}>
            <p className={height}> {`📍 ${firstWord}`}</p>
            <p className={height}> {`☢️ ${state.aqi} AQI - Very Polluted`}</p>
            <p className={height}>
              🚳 Avoid outdoor activities and staying Outdoors.
            </p>
            <p className={height}>😷 Wear a mask</p>
            <p className={height}>🚬 Equivalent to smoking {cigr} cigs/day</p>
          </div>
          <span className={Small}>Updated {`${state.daterr}`}</span>

          <div className={image_r} />
        </div>
      );
    } else if (state.aqi <= 500) {
      // hell on earth
      return (
        <div>
          <div className={header}>Airflo</div>
          <div className={main}>
            <p className={height}> {`📍 ${firstWord}`}</p>
            <p className={height}> {`💀 ${state.aqi} AQI - Gezz`}</p>
            <p className={height}>🕳️ Skip work and stay indoors</p>
            <p className={height}>
              🛫 Take the next flight out of this zombie city
            </p>
            <p className={height}>🚬 Equivalent to smoking {cigr} cigs/day</p>
          </div>
          <span className={Small}>Last updated {`${state.daterr}`}</span>
        </div>
      );
    }
  }

  return (
    <div className={wrapper}>
      {state.loading}
      {check()}
    </div>
  );
};

export const initialState = {
  state: {},
  loading: <p className={loading}>loading...</p>
};

export const updateState = (event, previousState) => {
  previousState.loading = "";

  if (event.error && event.type === "FETCH_FAILED") {
    previousState.loading = <p className={loading}>no data available</p>;
  }

  if (!event.data || typeof event.data.data.aqi == "undefined") {
    previousState.loading = (
      <p className={loading}>
        City data not available. Replace with another city
      </p>
    );
    return previousState;
  } else {
    const aqi = event.data.data.aqi,
      cityname = event.data.data.city.name,
      daterr = event.data.data.time.s;

    return {
      status,
      aqi,
      cityname,
      daterr
    };
  }
};

export const wrapper = css`
  position: fixed;
  backdrop-filter: blur(6px) sepia(0.2);
  top: 24px;
  left: 24px;
  background: rgba(0, 0, 0, 0.6);
  background-size: 300px;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  line-height: 1.256888;
  font-style: normal;
  overflow: hidden;
`;

export const header = css`
  height: 24px;
  background: rgba(0, 0, 0, 0.2);
  padding: 0px 16px;
  line-height: 24px;
  font-size: 13px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  vertical-align: center;
`;

export const logo = css`
  font-size: 12px;
  opacity: 0.6;
`;

export const image_g = css`
  position: absolute;
  width: 100%;
  height: 100%;
  right: -40%;
  background: url("http://pngimg.com/uploads/smoke/smoke_PNG55233.png")
    no-repeat;
  background-size: 300px;
  opacity: 0.88;
  bottom: -20%;
`;

export const image_r = css`
  position: absolute;
  width: 100%;
  height: 100%;
  right: -45%;
  background: url("http://pngimg.com/uploads/smoke/smoke_PNG55173.png")
    no-repeat;
  background-size: 300px;
  opacity: 0.88;
  bottom: -40%;
`;

export const image_y = css`
  position: absolute;
  width: 100%;
  height: 100%;
  right: -55%;
  background: url("http://pngimg.com/uploads/smoke/smoke_PNG55138.png")
    no-repeat;
  background-size: 300px;
  opacity: 0.88;
  bottom: -65%;
`;

export const loading = css`
  font-size: 12px;
  opacity: 0.5;
  padding: 8px 16px;
`;

export const main = css`
  max-width: 300px;
  padding: 8px 16px;
`;
export const height = css`
  margin: 8px 0;
`;

export const Small = css`
  font-size: 12px;
  opacity: 0.5;
  padding: 8px 16px 16px 16px;
  display: block;
`;
