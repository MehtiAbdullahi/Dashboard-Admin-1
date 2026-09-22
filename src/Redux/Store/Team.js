import { createSlice } from "@reduxjs/toolkit";
import { team } from "../../Data/datas";


const teamReducer = createSlice({
  name: 'team',
  initialState: team,
  reducers: {}
})

export default teamReducer.reducer