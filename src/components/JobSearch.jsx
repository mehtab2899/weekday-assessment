import { useCallback, useRef, useState } from "react"
import { makeStyles } from "@material-ui/styles"

import Flatlist from "../UI/Flatlist"
import useJobSearch from "../hooks/useJobSearch"
import JobCard from "./JobCard"

const url = "https://api.weekday.technology/adhoc/getSampleJdJSON"

const JobSearch = () => {
  const styles = stylesheet()
  const [pageLimit, setPageLimit] = useState(10)
  const { data, error, hasMore } = useJobSearch(url, pageLimit)

  const observer = useRef()
  const lastJobRef = useCallback((list) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageLimit(prevPageLimit => prevPageLimit + 10)
      }
    })
    if (list) observer.current.observe(list)
  }, [hasMore])


  const renderJob = ({ item }) => {
    const { jdLink, jobDetailsFromCompany, jobRole, companyName, logoUrl,
      location, maxJdSalary, minExp, minJdSalary, salaryCurrencyCode,
    } = item
    return (
      <JobCard
        logo={logoUrl}
        link={jdLink}
        title={jobRole}
        company={companyName}
        details={jobDetailsFromCompany}
        location={location}
        experience={minExp}
        maxSalary={maxJdSalary}
        minSalary={minJdSalary}
        currency={salaryCurrencyCode}
      />
    )
  }

  return (
    <div className={styles.container}>
      <div>{error && 'Error fetching jobs...'}</div>
      <Flatlist
        list={data.jdList}
        listStyles={styles.lists}
      >
        {list => list.map((item, index) => {
          if (data.jdList.length === index + 1) {
            return <div key={index} ref={lastJobRef}>{renderJob({ item })}</div>
          } else {
            return <div key={index}>{renderJob({ item })}</div>
          }
        })}
      </Flatlist>
    </div>
  )
}

const stylesheet = makeStyles({
  container: {
    margin: 40,
  },
  lists: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto)',
    gap: 40,
  },
})

export default JobSearch