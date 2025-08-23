import React, { useEffect, useState } from 'react'
import { restaurant } from './Link'
export const useMenuItem = (id) => {

  const[resinfo , setResInfo] = useState([])

  useEffect(() => {
    const fetchdata = async () => {
      const fetchRes = await fetch(restaurant + id + "&catalog_qa=undefined&submitAction=ENTER");
      const data = await fetchRes.json();
      console.log(data);
      
      setResInfo(data);
    };
    fetchdata();
  }, [id]);

  return resinfo
  
}
