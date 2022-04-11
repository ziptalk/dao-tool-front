import axios from "axios";
import * as config from "./config";

export const getAllBadges = async (order) => {
    var returnValue = {}

    const result = await axios
      .get(
        `/badges/?orderBy=${order}`,
        // { params: { orderBy: order } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        returnValue = data;
      })
      .catch((error) => {
        console.log(error);
      });
  
    console.log("check");
    console.log(result);
  
    return returnValue;
  };


  export const getBadgeDetail = async (badgeName) => {
    var returnValue = {}

    const result = await axios
      .get(
        `/badges/?badgeName=${badgeName}`,
        // { params: { badgeName: badgeName } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        returnValue = data;
      })
      .catch((error) => {
        console.log(error);
      });
  
    console.log("check");
    console.log(result);
  
    return returnValue;
  };