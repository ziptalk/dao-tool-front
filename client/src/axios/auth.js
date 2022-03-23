import axios from "axios";
import * as config from "./config";

// 맨 첫 페이지에서 wallet connect를 할 때, 이미 회원가입이 된 지갑 주소인지 아닌지 여부를 반환한다.
export const checkSignup = async (walletAddress) => {
  const result = await axios
    .post(`/users/check?walletAddress=${walletAddress}/`, {
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

  const result5 = await uploadProfileImage(formdata)
    .then((data) => {
      console.log("upload image success!");
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });

  formdata.append(
    "json",
    `{"id":"${userInfo.id}", "url":"${userInfo.url}", "introduction":"${userInfo.introduction}"}`
  );

  const result6 = await createUser(formdata)
    .then((data) => {
      console.log("createUser success!");
      console.log(data);
      const createWalletListResult = createWalletList(JSON.stringify(`{
        "user" : "${userInfo.id}",
        "wallet" : ${JSON.stringify(wallet)}
      }`))
      .then((data2) => {
          console.log("createWalletList success!")
          console.log(data2)
      })
      .catch((error) => {
          console.log(error)

      })
    })
    .catch((error) => {
      console.log(error);
    });

  const result = await axios
    .post(
      `/users/signup`,
      //   formdata,
      JSON.stringify({
        userInfo: {
          id: "CrossOrigin",
          profileImage: JSON.stringify(newObject),
          introduction: "Hi",
          url: "http://localhost:3000/CrossOrigin",
        },
        wallet: [
          {
            walletAddress: "0x07B0ea6D444B9B66F3A7709FB1fA75BcDCD67A16",
            walletName: "FirstWallet",
            walletIcon:
              "https://daotool.s3.ap-northeast-2.amazonaws.com/static/wallet-icon/9b1c7829-570e-4d1c-9b87-e13f93b7cec21.png",
            loginAvailable: 1,
            viewDataAvailable: 0,
          },
        ],
      }),
      //   { userInfo, wallet },
      {
        headers: {
          "Content-Type": "application/json",
          //   "Access-Control-Allow-Credentials": true,
        },
        // data: JSON.stringify({ userInfo, wallet }),
      }
    )
    .then((data) => {
      console.log("hello signup");
      console.log(data);
      //   return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  return { hi: "hi" };

  //   return result.data;
};

export const login = async (walletAddress) => {
  const result = await axios
    .post(
      `/users/login`,
      JSON.stringify({
        walletAddress: "0x07B0ea6D444B9B66F3A7709FB1fA75BcDCD67A16",
      }),
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
    .get(`/admin/badges`, JSON.stringify({ password: "propwave0806!" }), {
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Credentials": true,
      },
      // data: JSON.stringify(password),
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

  const result = await fetch("/users/signup/user", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  console.log("createUser End");
  console.log(result);

  return result;
};

export const createWalletList = async (walletList) => {
    const result = await axios
    .get(`/users/signup/wallets`, walletList, {
      headers: {
        "Content-Type": "application/json",
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

  console.log("createWalletList done!");
  console.log(result.data);

  return result.data;
}
