/* eslint-disable consistent-return */
import React, { useContext, useRef, useEffect, useState } from "react";
import {
  Grid,
  List,
  Paper,
  Autocomplete,
  TextField,
  Typography,
  Button,
  Divider,
  Container,
  Radio,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  RadioGroup,
  Switch,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { ClientsContext } from "../../contexts/ClientsContext";
import { UserContext } from "../../contexts/UserContext";
import { loginContext } from "src/contexts/LoginContext";
import { teamContext } from "src/contexts/TeamsContext";
import { getTeam } from "src/api/teams api/teams";
import { getFullName } from "src/_helpers/getFullName";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function checkheading(index, settings, setSettings, loginC) {
  const days = [
    "Sunday",
    "Monday",
    "TuesDay",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // const settings = loginC.userData.settings;

  console.log(settings);

  const UpdateSettings = async (data) => {
    // console.log(settings);
    await axios
      .patch(`/employee/edit/${loginC.userData._id}`, data)
      .then((res) => {
        console.log(res);
        setSettings(res.data.data.settings);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeScreenShotPerHour = async (e) => {
    e.preventDefault();
    const value = document.querySelector("#screenShotPerHour").value;
    console.log(value);

    const data = {
      settings: {
        ...settings,
        ScreenShotPerHour: {
          isTeamSetting: settings.ScreenShotPerHour.isTeamSetting,
          teamValue: settings.ScreenShotPerHour.teamValue !== 0 ? 0 : value,
          individualValue: settings.ScreenShotPerHour.individualValue,
        },
      },
    };
    // console.log(settings);
    await UpdateSettings(data);
  };
  const changeAppsAndUrlTracking = async (e) => {
    e.preventDefault();

    const data = {
      settings: {
        ...settings,
        AppsAndUrlTracking: {
          isTeamSetting: settings.AppsAndUrlTracking.isTeamSetting,
          teamValue: !settings.AppsAndUrlTracking.teamValue,
          individualValue: settings.AppsAndUrlTracking.individualValue,
        },
      },
    };
    // console.log(settings);
    await UpdateSettings(data);
  };
  const changeWeeklyTimeLimit = async (e) => {
    e.preventDefault();
    const value = document.querySelector("#weekLimit").value;
    console.log(value);

    const data = {
      settings: {
        ...settings,
        WeeklyTimeLimit: {
          isTeamSetting: settings.WeeklyTimeLimit.isTeamSetting,
          teamValue: settings.WeeklyTimeLimit.teamValue !== 0 ? 0 : value,
          individualValue: settings.WeeklyTimeLimit.individualValue,
        },
      },
    };
    // console.log(settings);
    await UpdateSettings(data);
  };
  const changeAutoPause = async (e) => {
    e.preventDefault();
    const value = document.querySelector("#autoPause").value;
    console.log(value);

    const data = {
      settings: {
        ...settings,
        AutoPause: {
          isTeamSetting: settings.AutoPause.isTeamSetting,
          teamValue: settings.AutoPause.teamValue !== 0 ? 0 : value,
          individualValue: settings.AutoPause.individualValue,
        },
      },
    };
    // console.log(settings);
    await UpdateSettings(data);
  };
  const changeOfflineTime = async (e) => {
    e.preventDefault();

    const data = {
      settings: {
        ...settings,
        OfflineTime: {
          isTeamSetting: settings.OfflineTime.isTeamSetting,
          teamValue: !settings.OfflineTime.teamValue,
          individualValue: settings.OfflineTime.individualValue,
        },
      },
    };
    // console.log(settings);
    await UpdateSettings(data);
  };
  const changeNotifyUser = async (e) => {
    e.preventDefault();

    const data = {
      settings: {
        ...settings,
        NotifyUser: {
          isTeamSetting: settings.NotifyUser.isTeamSetting,
          teamValue: !settings.NotifyUser.teamValue,
          individualValue: settings.NotifyUser.individualValue,
        },
      },
    };
    // console.log(settings);
    await UpdateSettings(data);
  };
  // const [currDay , setCurrDay] =useState(0);
  const changeWeekStart = async (e) => {
    e.preventDefault();

    const data = {
      settings: {
        ...settings,
        WeekStart: {
          isTeamSetting: settings.WeekStart.isTeamSetting,
          teamValue: days[e.target.value],
          individualValue: settings.WeekStart.individualValue,
        },
      },
    };
    UpdateSettings(data);
    // setSettings(res.data.data.settings);
  };
  const changeCurrencySymbol = async (e) => {
    e.preventDefault();
    const value = document.querySelector("#currencySymbol").value;
    console.log(value);

    const data = {
      settings: {
        ...settings,
        CurrencySymbol: {
          isTeamSetting: settings.CurrencySymbol.isTeamSetting,
          teamValue: value,
          individualValue: settings.CurrencySymbol.individualValue,
        },
      },
    };
    // console.log(settings);
    await UpdateSettings(data);
  };

  if (index === 0) {
    return (
      <>
        <FormControlLabel
          value="Take"
          control={
            <Radio
              onClick={changeScreenShotPerHour}
              checked={settings.ScreenShotPerHour?.teamValue}
            />
          }
          label="Take"
        />
        <TextField
          sx={{ m: 1.5 }}
          id="screenShotPerHour"
          label="Hours per week"
          type="number"
          defaultValue={settings?.ScreenShotPerHour?.teamValue}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["Allow Blur", "Blur All", "Disallow"]}
          sx={{ width: 240, margin: "2px 10px 2px 10px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={settings?.AllowBlur?.teamValue ? "Allow blur" : "Disallow"}
            />
          )}
        /> */}
        <FormControlLabel
          value="Do not take"
          control={
            <Radio
              onClick={changeScreenShotPerHour}
              checked={!settings?.ScreenShotPerHour?.teamValue}
            />
          }
          label="Do not take"
        />
      </>
    );
  }
  if (index === 1 || index === 2) {
    return (
      <>
        <FormControlLabel
          value="Track"
          control={
            <Radio
              onClick={changeAppsAndUrlTracking}
              checked={settings.AppsAndUrlTracking.teamValue}
            />
          }
          label="Track"
        />
        <FormControlLabel
          value="Do not track"
          control={
            <Radio
              onClick={changeAppsAndUrlTracking}
              checked={!settings.AppsAndUrlTracking.teamValue}
            />
          }
          label="Do not track"
        />
      </>
    );
  }
  if (index === 3) {
    return (
      <>
        <FormControlLabel
          value="Limit"
          control={
            <Radio
              onClick={changeWeeklyTimeLimit}
              checked={settings.WeeklyTimeLimit.teamValue}
            />
          }
          label="Limit"
        />

        <TextField
          sx={{ m: 1.5 }}
          id="weekLimit"
          label="Hours per week"
          type="number"
          defaultValue={settings.WeeklyTimeLimit.teamValue}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControlLabel
          value="Do not limit"
          control={
            <Radio
              onClick={changeWeeklyTimeLimit}
              checked={!settings.WeeklyTimeLimit.teamValue}
            />
          }
          label="Do not limit"
        />
      </>
    );
  }
  if (index === 4) {
    return (
      <>
        <FormControlLabel
          value="Pause"
          control={
            <Radio
              onClick={changeAutoPause}
              checked={settings.AutoPause.teamValue}
            />
          }
          label="Pause after"
        />
        <TextField
          sx={{ m: 1.5 }}
          id="autoPause"
          label="Time limit"
          type="number"
          defaultValue={settings.AutoPause.teamValue}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography sx={{ mt: 3, mr: 2, fontSize: "20px" }}>
          minutes of user activity
        </Typography>
        <FormControlLabel
          value="Do not pause"
          control={
            <Radio
              onClick={changeAutoPause}
              checked={!settings.AutoPause.teamValue}
            />
          }
          label="Do not pause"
        />
      </>
    );
  }
  if (index === 5) {
    return (
      <>
        <FormControlLabel
          value="Allow"
          control={
            <Radio
              onClick={changeOfflineTime}
              checked={settings.OfflineTime.teamValue}
            />
          }
          label="Allow"
        />
        <FormControlLabel
          value="Disallow"
          control={
            <Radio
              onClick={changeOfflineTime}
              checked={!settings.OfflineTime.teamValue}
            />
          }
          label="Disallow"
        />
      </>
    );
  }
  if (index === 6) {
    return (
      <>
        <FormControlLabel
          value="Notify"
          control={
            <Radio
              onClick={changeNotifyUser}
              checked={settings.NotifyUser.teamValue}
            />
          }
          label="Notify"
        />
        <FormControlLabel
          value="Do not notify"
          control={
            <Radio
              onClick={changeNotifyUser}
              checked={!settings.NotifyUser.teamValue}
            />
          }
          label="Do not notify"
        />
      </>
    );
  }
  if (index === 7) {
    return (
      <>
        <Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Day</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={days.indexOf(settings.WeekStart.teamValue)}
              label="Day"
              onChange={changeWeekStart}
            >
              {days.map((el, index) => {
                return <MenuItem value={index}>{el}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
      </>
    );
  }
  if (index === 8) {
    return (
      <>
        <TextField
          sx={{ m: 1.5 }}
          id="currencySymbol"
          label="Currency"
          type="text"
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              changeCurrencySymbol(e);
            }
          }}
          defaultValue={settings.CurrencySymbol.teamValue}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </>
    );
  }
}

function userChange(user) {
  return <>Hello{user}</>;
}

export default function SettingsMain(props) {
  const { value, index, heading, subheading, ...other } = props;
  const { loginC } = useContext(loginContext);
  const { dispatchgetTeam, getTeams } = useContext(teamContext);

  const [teamsList, setTeamsList] = useState([]);

  useEffect(() => {
    getTeam(dispatchgetTeam);
  }, []);
  const [settings, setSettings] = useState({});
  // data is in variable but not showing on the screen

  useEffect(() => {
    // setSettings(loginC.userData.settings);
    const data = [];
    getTeams?.getTeam?.forEach((team) => {
      console.log("member");
      // eslint-disable-next-line prefer-template

      team.members?.map((member) => {
        if (
          !data.find((el) => {
            return el.id === member._id;
          })
        ) {
          data.push({
            name: getFullName(member.firstName, member.lastName),
            id: member._id,
          });
        }
      });
    });
    setTeamsList(data);
  }, [getTeams]);
  useEffect(() => {
    axios
      .get("/commondata")
      .then((res) => {
        console.log(res);
        setSettings(res.data.user.settings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const effectiveArr = [
    "Screenshot,Activity Level tracking",
    "Apps & Urls tracking",
    "Weekly time limit after",
    "Auto-pause tracking after",
    "Allow adding Offline time",
    "Notify when Screenshot is taken",
    "Week starts on",
    "Currency symbol",
    "Employee desktop application settings",
  ];
  const test = false;
  return (
    <>
      {value === index && (
        <Container
          component="div"
          sx={{pb:2}}
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
        >
          <Typography variant="h3">{heading}</Typography>
          <Divider />
          <Box sx={{ height: "60px", width: "100%", bgcolor: "#bdf2bf" }}>
            {subheading}
          </Box>
          <Box>
            {/* <FormLabel component="legend">Gender</FormLabel> */}

            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="option"
                name="row-radio-buttons-group"
              >
                {checkheading(index, settings, setSettings, loginC)}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography varinat="h3" sx={{ fontWeight: "bold" }}>
              Individual Settings
            </Typography>
            <Typography>
              If enabled, individual settings will be used instead of the team
              Settings
            </Typography>
            <Box>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={teamsList.map((user) => user.name)}
                sx={{ width: 300, mt: 4 }}
                renderInput={(params) => <TextField {...params} label="User" />}
              />
              {teamsList.map((user) => (
                <FormGroup>
                  <FormControlLabel
                    control={<Switch checked={settings?.ScreenShotPerHour?.isTeamSetting}/>}
                    label={user.name}
                    onChange={() => {
                      userChange(user.name);
                    }}
                  />
                  {/* {userChange()} */}
                  {test && <div>hello</div>}
                </FormGroup>
              ))}
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
