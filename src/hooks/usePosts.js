import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

const getData = async () => {
    return axios.get('https://jsonplaceholder.typicode.com/posts')
  }

export function usePosts(isEnabled) {
    
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['posts'],
        queryFn: getData,
        select: (data) => data.data,
        enabled: isEnabled,
      });

      useEffect(() => {
        if(isError) console.log('Error fetching data')
      }, [isError])

      useEffect(() => {
        if(isSuccess) console.log('Data fetched successfully')
      }, [isSuccess])

    return { data, isLoading, isError, isSuccess }
}