import axios from "axios";
import * as config from "./config";

// 맨 첫 페이지에서 wallet connect를 할 때, 이미 회원가입이 된 지갑 주소인지 아닌지 여부를 반환한다.
export const checkSignup = async (walletAddress) => {
  const result = await axios
    .post(process.env.REACT_APP_DB_HOST+`/users/check?walletAddress=${walletAddress}/`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  return result.data;
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

  const result3 = await postAdminBadge(
    "뱃지1",
    JSON.stringify({
      user: "test2",
      srcWalletAddress: "지갑4",
      dstWalletAddress: "지갑3",
    })
  )
    .then((data) => {
      console.log("adminBadge Success!");
      console.log(data);
    })
    .catch((error) => console.log(error));
  console.log(result3);

  const result2 = await getUserpage("test1")
    .then((data) => {
      console.log("hello");
      console.log(data);
    })
    .catch((error) => console.log(error));
  console.log(result2);

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
    .then((data) => {
      console.log("createUser success!");
      console.log(data);
      if (data.isSuccess) {
        console.log(
          JSON.stringify({
            user: userInfo.id,
            wallet: wallet,
          })
        );
        const createWalletListResult = createWalletList(
          //   `{
          //     "user" : "${userInfo.id}",
          //     "wallet" : ${JSON.stringify(wallet)}
          //   }`
          JSON.stringify({
            user: userInfo.id,
            wallet: wallet,
          })
        )
          .then((data2) => {
            console.log("createWalletList success!");
            console.log(data2);
            if (data2.isSuccess) {
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
  const result = await axios
    .post(
      `/users/login`,
      `{
        "walletAddress": "${walletAddress}",
      }`,
      {
        headers: {
          "Content-Type": "application/json",
          //   "Access-Control-Allow-Credentials": true,
        },
        //   data: JSON.stringify(walletAddress),
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

  return result.data;
};

export const getUserpage = async (userId) => {
  const result = await axios
    .get(`/users/mypage?userId=${userId}`, {
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Credentials": true,
      },
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

export const postAdminBadge = async (name, walletData) => {
  const result = await axios
    .post(`/admin/badges?badgeName=${name}`, walletData, {
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
    .get(
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

  const result = await fetch("/images/upload", requestOptions)
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

  const result = await fetch("/users/signup/user", requestOptions)
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

  const result = await axios
    .post(`/users/signup/wallets`, {
      data: walletList,
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
      return error;
    });

  console.log("createWalletList done!");
  console.log(returnValue);

  return returnValue;
};

export const deleteUser = async (userData) => {
  console.log(userData);

  let returnValue = {};

  const result = await axios
    .delete(`/users`, {
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
