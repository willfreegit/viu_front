import { useState } from "react";

const GetCosts = () => {
    const[costs, setCosts] = useState();
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
       .then((response) => {
          if (!response.ok) {
             throw Error(response.statusText);
          }
          return response.json();
       })
       .then((data) => {
          console.log(data);
          setCosts(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
       return(
        costs
       );
    };

export default GetCosts;