import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as animationData from "../assets/spinner.json";
import { getData } from "../api/apiCalls";
import { Account } from "../interfaces/interfaces";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Account[] | null>(null);

  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const getResults = async () => {
      setLoading(true);
      const data = await getData();
      if (data) setData(data);
      setLoading(false);
    };
    getResults();
  }, []);

  const renderResults = () => {
    return data?.map((el, idx) => (
      <tr key={idx}>
        <td>{el.name}</td>
        <td>
          {el.currency} {el.profitLoss}
        </td>
        <td>{el.accountType}</td>
      </tr>
    ));
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.container__loader}>
          <Lottie options={animationOptions} height={400} width={400} />
        </div>
      ) : (
        <>
          <h1>Results</h1>
          <table className={styles.container__table}>
            <thead className={styles.container__table__headers}>
              <tr>
                <th>name</th>
                <th>profit</th>
                <th>type</th>
              </tr>
            </thead>
            <tbody>{renderResults()}</tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default HomePage;
