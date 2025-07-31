import { getEmail, getToken } from "@/api/auth.api";

export const getCookie =  {
  async getToken(){
    const isToken = await getToken()
    console.log("isToken");
    if(isToken){
      console.log("is token is:",isToken);
      return  isToken
    }else{

    }
  },
  async getEmail(){
    const isEmail = await getEmail()
    console.log("is email is:",isEmail);
  }
};
