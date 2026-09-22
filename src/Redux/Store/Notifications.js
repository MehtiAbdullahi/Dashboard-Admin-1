import { createSlice } from "@reduxjs/toolkit";
import { notifications } from "../../Data/datas";

const notifReducer = createSlice({
  name: "notification",
  initialState: notifications,
  reducers: {},
});

export default notifReducer.reducer;
