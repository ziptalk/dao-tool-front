import axios from "axios";
import * as config from "./config";

// 맨 첫 페이지에서 wallet connect를 할 때, 이미 회원가입이 된 지갑 주소인지 아닌지 여부를 반환한다.
export const checkSignup = async (walletAddress) => {
  let returnValue = 0;
  const result = await axios
    .post(
      process.env.REACT_APP_DB_HOST +
        `/users/check?walletAddress=${walletAddress}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    )
    .then((data) => {
      console.log(data);
      console.log(data.data.result);
      //   return data;
      returnValue = data.data.result;
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};

export const signup = async ({ userInfo, wallet }) => {
  console.log("check userInfo");
  console.log(userInfo);
  const result4 = await getAdminBadge(`{
    “walletAddress”:“지갑1"
}`)
    .then((data) => {
      console.log("getAdminBadge Success!!!");
      console.log(data);
    })
    .catch((error) => console.log(error));
  console.log(result4);

  //   const result3 = await postAdminBadge(
  //     "뱃지1",
  //     JSON.stringify({
  //       user: "test2",
  //       srcWalletAddress: "지갑4",
  //       dstWalletAddress: "지갑3",
  //     })
  //   )
  //     .then((data) => {
  //       console.log("adminBadge Success!");
  //       console.log(data);
  //     })
  //     .catch((error) => console.log(error));
  //   console.log(result3);

  //   const result2 = await getUserpage("test1")
  //     .then((data) => {
  //       console.log("hello");
  //       console.log(data);
  //     })
  //     .catch((error) => console.log(error));
  //   console.log(result2);

  console.log("이미지 확인");
  console.log(userInfo.profileImage);
  console.log(JSON.stringify(userInfo.profileImage));

  // reCreate new Object and set File Data into it
  var newObject = {
    lastModified: userInfo.profileImage.lastModified,
    lastModifiedDate: userInfo.profileImage.lastModifiedDate,
    name: userInfo.profileImage.name,
    size: userInfo.profileImage.size,
    type: userInfo.profileImage.type,
  };

  // then use JSON.stringify on new object
  console.log(JSON.stringify(newObject));

  var formdata = new FormData();
  formdata.append("profileImage", userInfo.profileImage, "0.png");
  //   formdata.append("userInfo.id", userInfo.id);
  //   formdata.append("userInfo.profileImage", userInfo.profileImage, "0.png");
  //   formdata.append("userInfo.introduction", userInfo.introduction);
  //   formdata.append("userInfo.url", userInfo.url);
  //   formdata.append("wallet.walletAddress", wallet.walletAddress);
  //   formdata.append("wallet.walletName", wallet.walletName);
  //   formdata.append("wallet.walletIcon", wallet.walletIcon);
  //   formdata.append("wallet.loginAvailable", wallet.loginAvailable);
  //   formdata.append("wallet.viewDataAvailable", wallet.viewDataAvailable);

  console.log(formdata);

  //   const result5 = await uploadProfileImage(formdata)
  //     .then((data) => {
  //       console.log("upload image success!");
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  formdata.append(
    "json",
    `{"id":"${userInfo.id}", "url":"${userInfo.url}", "introduction":"${userInfo.introduction}"}`
  );

  let signupReturn = {};

  const result6 = await createUser(formdata)
    .then(async (data) => {
      console.log("createUser success!");
      console.log(data);
      if (data.isSuccess) {
        console.log(
          JSON.stringify({
            user: userInfo.id,
            wallet: wallet,
          })
        );
        const currentAddress = localStorage.getItem("currentWalletAddress");
        console.log(currentAddress);

        console.log(wallet.findIndex((x) => x.walletAddress == currentAddress));

        if (wallet.findIndex((x) => x.walletAddress == currentAddress) != -1) {
          let currentWalletObject = {
            walletAddress: currentAddress,
            walletName: "loginWallet01",
            walletIcon:
              "https://daotool.s3.ap-northeast-2.amazonaws.com/static/wallet-icon/4810d696-d9fb-4dac-a56c-a4b84ffa8aed2.png",
            loginAvailable: 1,
            viewDataAvailable: 1,
          };
          // wallet[wallet.findIndex((x)=> x.walletAddress === currentAddress)] = currentWalletObject
          wallet[
            wallet.findIndex((x) => x.walletAddress === currentAddress)
          ].loginAvailable = 1;
          console.log(wallet);
        } else {
          let currentWalletObject = {
            walletAddress: currentAddress,
            walletName: "loginWallet01",
            walletIcon:
              "https://daotool.s3.ap-northeast-2.amazonaws.com/static/wallet-icon/4810d696-d9fb-4dac-a56c-a4b84ffa8aed2.png",
            loginAvailable: 1,
            viewDataAvailable: 0,
          };
          wallet.unshift(currentWalletObject); // wallet 맨 앞 배열에 이거 추가
          console.log(wallet);
        }

        const createWalletListResult = await createWalletList({
          user: userInfo.id,
          wallet: wallet,
        })
          .then((data2) => {
            console.log("createWalletList success!");
            console.log(data2);
            if (data2 == 200) {
              signupReturn = data2;
            } else {
              console.log(data2.message);
              console.log(
                JSON.stringify({
                  user: data.result.id,
                  token: data.result.token,
                })
              );
              const deleteUserResult = deleteUser(
                JSON.stringify({
                  user: data.result.id,
                  token: data.result.token,
                })
              ).then((data3) => {
                signupReturn = data3;
              });
              alert(data2.message);
            }
          })
          .catch((error) => {
            console.log(error);
            const deleteUserResult = deleteUser(
              JSON.stringify({
                user: data.result.id,
                token: data.result.token,
              })
            );
          });
      } else {
        console.log(data.message);
        alert(data.message);
        signupReturn = false;
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return signupReturn;

  //   return result.data;
};

export const login = async (walletAddress) => {
  var returnValue = {};
  const result = await axios
    .post(process.env.REACT_APP_DB_HOST +`/users/login`, `{"walletAddress": "${walletAddress}"}`, {
      headers: {
        "Content-Type": "application/json",
        //   "Access-Control-Allow-Credentials": true,
      },
      //   data: JSON.stringify(walletAddress),
    })
    .then((data) => {
      console.log(data);
      console.log(data.data.result.userID);
      localStorage.setItem("nickname", data.data.result.userID)
    //   alert(data.data.result.userID);
      returnValue = data;
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};

export const getUserpage = async (userId) => {
  var returnValue = {};
  const result = await axios
    .get(process.env.REACT_APP_DB_HOST +`/users/mypage?userId=${userId}`, {
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Credentials": true,
      },
    })
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

export const postAdminBadge = async (name, walletData) => {
  const result = await axios
    .post(process.env.REACT_APP_DB_HOST +`/admin/badges?badgeName=${name}`, walletData, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      //   data: JSON.stringify(walletData),
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  console.log("check");
  console.log(result.data);

  return result.data;
};

export const getAdminBadge = async (password) => {
  const result = await axios
    .get(process.env.REACT_APP_DB_HOST +
      `/admin/badges`,
      { params: { password: "propwave0806!" } },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  console.log("check");
  console.log(result.data);

  return result.data;
};

export const uploadProfileImage = async (formData) => {
  console.log("upload profile image api in");
  console.log(formData);

  var requestOptions = {
    method: "POST",
    body: formData,
    redirect: "follow",
  };

  const result = await fetch(process.env.REACT_APP_DB_HOST +"/images/upload", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  // .then((data) => {
  //   console.log("upload api data");
  //   console.log(data);
  //   return data;
  // })
  // .catch((error) => {
  //   console.log(error);
  //   return error;
  // });

  console.log("updateProfileImage End");
  console.log(result);

  return result;
};

export const createUser = async (formData) => {
  var requestOptions = {
    method: "POST",
    body: formData,
    redirect: "follow",
  };

  let returnValue = {};

  const result = await fetch(process.env.REACT_APP_DB_HOST +"/users/signup/user", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      console.log("createUser End");
      returnValue = JSON.parse(result);
    })
    .catch((error) => console.log("error", error));

  return returnValue;
};

export const createWalletList = async (walletList) => {
  console.log(walletList);

  let returnValue = {};

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    user: walletList.user,
    wallets: walletList.wallet,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const result = await fetch(process.env.REACT_APP_DB_HOST +"/users/signup/wallets", requestOptions)
    .then((response) => {
      console.log(response);
      response.text();
      //   console.log(response);
      returnValue = response.status;
      console.log(returnValue);
    })
    .then((result) => {
      //   console.log(result);
      console.log("hi~");
      //   returnValue = result;
    })
    .catch((error) => console.log("error", error));

  return returnValue;
};

export const deleteUser = async (userData) => {
  console.log(userData);

  let returnValue = {};

  const result = await axios
    .delete(process.env.REACT_APP_DB_HOST +`/users`, {
      data: userData,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => {
      console.log(data);
      returnValue = JSON.parse(data);
    })
    .catch((error) => {
      console.log(error);
    });

  console.log("deleteUser done!");
  console.log(returnValue);

  return returnValue;
};

export const editProfile = async (formData) => {
  var requestOptions = {
    method: "PATCH",
    body: formData,
    redirect: "follow",
  };

  let returnValue = {};

  const result = await fetch(process.env.REACT_APP_DB_HOST +"/users/mypage", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      console.log("createUser End");
      returnValue = JSON.parse(result);
    })
    .catch((error) => console.log("error", error));

  return returnValue;
};
