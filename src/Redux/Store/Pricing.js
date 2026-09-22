import { createSlice } from "@reduxjs/toolkit";
import { pricing } from "../../Data/datas";

const initialState = pricing;

const pricingRducer = createSlice({
  name: "pricing",
  initialState,
  reducers: {},
});

export default pricingRducer.reducer;
