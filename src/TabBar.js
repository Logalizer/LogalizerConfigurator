import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import MiscPane from "./MiscPane";
import TranslationsPane from "./TranslationsPane";
import FileModifierPane from "./FileModifierPane";
import JsonPane from "./JsonPane";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabBar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Translations" {...a11yProps(0)} />
          <Tab label="Misc" {...a11yProps(1)} />
          <Tab label="File Manipulators" {...a11yProps(2)} />
          <Tab label="JSON" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TranslationsPane />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MiscPane />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <FileModifierPane />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <JsonPane />
      </CustomTabPanel>
    </Box>
  );
}
