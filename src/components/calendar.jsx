import React, { useContext } from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import ProjectContext from "../context/project-context";
import "../index.css";

const Calendar = () => {
  const { tasksData } = useContext(ProjectContext);

  const schedulerData = tasksData.map((item) => {
    return {
      startDate: new Date(item.start_date),
      endDate: new Date(item.end_date),
      title: item.title,
    };
  });

  console.log(schedulerData);

  return (
    <div className="font-eudox">
      <Paper>
        <Typography style={{ fontFamily: "cursive" }}>
          <Scheduler data={schedulerData}>
            <ViewState />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <MonthView />
            <Appointments />
          </Scheduler>
        </Typography>
      </Paper>
    </div>
  );
};

export default Calendar;
