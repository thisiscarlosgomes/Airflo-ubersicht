import { css } from "uebersicht"; // emotion css
export const CITY = "YOUR-CITY"; // change to your city name
export const TOKEN = "YOUR-TOKEN"; // Get one at https://aqicn.org/api/ (Free)

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

export const refreshFrequency = 900000; // am not sure if this refresh thing works - the aqi api updates hourly so no big deal

export const render = state => {
  var firstWord = state.cityname.replace(/(([^\s]+\s\s*){2})(.*)/, "$1…"); // limit the cityname to only 2 words
  function check() {
    if (state.aqi <= 50) {
      // excellent
      return (
        <div>
          <div className={main}>
            <p className={height}> {`📍 ${firstWord}`}</p>
            <p className={height}> {`💚  ${state.aqi} AQI - Excellent Day`}</p>
            <p className={height}>🏃 Suitable for outdoor activities</p>
            <p className={height}>
              😍 Enjoy this beatiful day in {`${state.cityname}`}
            </p>
          </div>
          <span className={Small}>Last updated {`${state.daterr}`}</span>
          <span className={pos} />
        </div>
      );
    } else if (state.aqi <= 100) {
      // moderate
      return (
        <div>
          <div className={main}>
            <p className={height}> {`📍 ${state.cityname}`}</p>
            <p className={height}> {`💛   ${state.aqi} AQI - Moderate`}</p>
            <p className={height}>🏃 Go easy on outdoor activities</p>
            <p className={height}>😷 We recommend wearing a mask</p>
            <p className={height}>⏱️ {`${state.daterr}`}</p>
          </div>
          <span className={Small}>Last updated {`${state.daterr}`}</span>
          <span className={pos} />
        </div>
      );
    } else if (state.aqi <= 150) {
      // a bit polluted
      return (
        <div>
          <div className={main}>
            <p className={height}> {`📍 ${firstWord}`}</p>
            <p className={height}>{`💔 ${state.aqi} AQI - Lightly Polluted`}</p>
            <p className={height}>🏃 Reduce outdoor activities</p>
            <p className={height}>😷 Wear a mask</p>
          </div>
          <span className={Small}>Last updated {`${state.daterr}`}</span>
          <span className={mod} />
        </div>
      );
    } else if (state.aqi <= 200) {
      //unhealthy
      return (
        <div>
          <div className={main}>
            <p className={height}> {`📍 ${firstWord}`}</p>
            <p className={height}> {`👎  ${state.aqi} AQI - Unhealthy`}</p>
            <p className={height}>🚳 Not suitable for outdoor activities</p>
            <p className={height}>😷 Wear a mask</p>
          </div>
          <span className={Small}>Last updated {`${state.daterr}`}</span>
          <span className={bad} />
        </div>
      );
    } else if (state.aqi <= 300) {
      // very polluted
      return (
        <div>
          <div className={main}>
            <p className={height}> {`📍 ${state.cityname}`}</p>
            <p className={height}> {`☢️ ${state.aqi} AQI - Very Polluted`}</p>
            <p className={height}>
              🚳 Avoid outdoor activities and staying Outdoors.
            </p>
            <p className={height}>😷 Make sure you wear a mask</p>
            <p className={height}>⏱️ {`${state.daterr}`}</p>
          </div>
          <span className={Small}>Last updated {`${state.daterr}`}</span>
          <span className={bad} />
        </div>
      );
    } else if (state.aqi <= 500) {
      // hell on earth
      return (
        <div>
          <div className={main}>
            <p className={height}> {`📍 ${state.cityname}`}</p>
            <p className={height}> {`💀 ${state.aqi} AQI - Gezz`}</p>
            <p className={height}>🕳️ Skip work and stay indoors</p>
            <p className={height}>
              🛫 Take the next flight out of this zombie city
            </p>

            <p className={height}>⏱️ {`${state.daterr}`}</p>
          </div>
          <span className={Small}>Last updated {`${state.daterr}`}</span>
        </div>
      );
    }
  }

  return (
    <div className={wrapper}>
      {state.warning}

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
    return (previousState.loading = (
      <p className={loading}>no data available</p>
    ));
  }

  if (!event.data || event.data.length === 0) {
    previousState.warning = <p className={loading}>Loading the data...</p>;
    return previousState;
  } else {
    const { status } = event.data;
    const { aqi } = event.data.data;
    const cityname = event.data.data.city.name;
    var daterr = event.data.data.time.s;

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
  top: 40px;
  left: 40px;
  background: rgba(0, 0, 0, 0.65);
  border-radius: 8px;
  color: white;
  padding: 15px;
  font-size: 15px;
  border: 4px solid rgba(255, 255, 255, 0.12);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  line-height: 1.256888;
  font-style: normal;
`;

export const logo = css`
  font-size: 12px;
  opacity: 0.6;
`;

export const loading = css`
  font-size: 12px;
  opacity: 0.5;
`;

export const main = css`
  margin-bottom: 20px;
  max-width: 260px;
  word-wrap: break-word;
`;
export const height = css`
  margin: 8px 0;
`;

export const Small = css`
  font-size: 12px;
  opacity: 0.5;
`;
export const pos = css`
  margin: 8px 0;
  width: 50px;
  height: 4px;
  background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
  display: block;
  border-radius: 100px;
`;

export const mod = css`
  margin: 8px 0;
  width: 50px;
  height: 4px;
  background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
  display: block;
  border-radius: 100px;
`;

export const bad = css`
  margin: 8px 0;
  width: 50px;
  height: 4px;
  background-image: linear-gradient(
    to left,
    #ff8177 0%,
    #ff867a 0%,
    #ff8c7f 10%,
    #f99185 10%,
    #cf556c 78%,
    #b12a5b 100%
  );
  display: block;
  border-radius: 100px;
`;
