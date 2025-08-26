import {configureStore} from "@reduxjs/toolkit"



const appStore = configureStore({
  user: {
    name : "priyanshi"
  },
})


export default appStore;