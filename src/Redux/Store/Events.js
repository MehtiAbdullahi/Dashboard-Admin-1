import { createSlice } from "@reduxjs/toolkit";
import { events } from "../../Data/datas";

const eventsReducer = createSlice({
  name: 'events',
  initialState: events,
  reducers: {}
})

export default eventsReducer.reducer