import { useEffect, useState } from "react"
import { SOURCES_API } from "../config/api";

const transformArrayToObject = (items) => {
  const transformed = items.reduce((acc, item) => {
    const [label1, label2] = item.name.split('_');
    acc[item.id] = { label1, label2: ` ${label2}` };
    return acc;
  }, {});
  return transformed;
};


const useSources = () => {
    const [sourcesList, setSourcesList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(SOURCES_API)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setSourcesList(transformArrayToObject(data));
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
    },[])

    return {
      sourcesList,
      isLoading,
    }
}

export default useSources;