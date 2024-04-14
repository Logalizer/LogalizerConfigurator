import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import TranslationsPane from "./TranslationsPane";
import FileModifierPane from "./FileModifierPane";
import JsonPane from "./JsonPane";
import MoreTranslationsPane from "./MoreTranslationsPane";
import FiltersPane from "./FiltersPane";
import PathsPane from "./PathsPane";

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
          <Tab label="More" {...a11yProps(1)} />
          <Tab label="Filters" {...a11yProps(2)} />
          <Tab label="File Modifiers" {...a11yProps(3)} />
          <Tab label="Paths" {...a11yProps(4)} />
          <Tab label="JSON" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TranslationsPane />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MoreTranslationsPane />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <FiltersPane />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <FileModifierPane />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <PathsPane />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <JsonPane />
      </CustomTabPanel>
    </Box>
  );
}
