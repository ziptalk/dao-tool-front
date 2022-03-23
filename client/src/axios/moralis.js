import axios from "axios";
import * as config from "./config";

// 맨 첫 페이지에서 wallet connect를 할 때, 이미 회원가입이 된 지갑 주소인지 아닌지 여부를 반환한다.
export const getNFTTransfers = async ({chain, address}) => {
    // const transfersNFT = await Moralis.Web3API.account.getNFTTransfers(options);
    // console.log(transfersNFT)
    // return transfersNFT
};