import axios from "axios";
import { Account } from "../interfaces/interfaces";

interface Type {
  id: string;
  title: string;
}

const config = {
  headers: {
    "x-apikey": "5d9f48133cbe87164d4bb12c",
  },
};

export async function getData() {
  const paths = [
    `https://recruitmentdb-508d.restdb.io/rest/accounts`,
    `https://recruitmentdb-508d.restdb.io/rest/accounttypes`,
  ];

  let promises: any = await Promise.all(
    paths.map(async (path, index) => {
      const response = await axios.get(path, config);
      //console.log("res", response);
      const items = response.data;
      let data: Account | Type;
      const itemsArray: Array<Account | Type> = items.map((el: any) => {
        if (index === 0) {
          data = {
            accountType: el.accountType,
            currency: el.currency,
            name: el.name,
            profitLoss: el.profitLoss,
          };
        } else if (index === 1) {
          data = {
            id: el.id,
            title: el.title,
          };
        }
        return data;
      });
      console.log("items arr", itemsArray);
      return itemsArray;
    })
  ).catch(() => {
    return false;
  });
  //console.log("promises", promises);

  const accounts: Array<Account> = promises[0];
  const types: Array<Type> = promises[1];

  let idx: number;
  const data = accounts.map((acc) => {
    idx = types.findIndex((obj) => {
      return obj.id === acc.accountType;
    });
    acc.accountType = types[idx].title;
    return acc;
  });

  if (promises) return data;
  else return false;
}
