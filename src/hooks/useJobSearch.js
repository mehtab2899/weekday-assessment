import { useState, useEffect } from 'react'

const useJobSearch = (url, pageLimit) => {
  const [data, setData] = useState({ jdList: [], totalPages: 0 })
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(false)

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  const body = JSON.stringify({
    "limit": pageLimit,
    "offset": 0
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, requestOptions)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result = await response.json()
        setData(prevData => ({
          jdList: [...new Set([...prevData.jdList, ...result.jdList])],
          totalPages: result.totalCount,
        }))
        setHasMore(result.jdList.length > 0)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [url, pageLimit])

  return { data, error, hasMore }
}

export default useJobSearch