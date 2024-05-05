import { useCallback, useRef, useState } from "react"
import { makeStyles } from "@material-ui/styles"

import Flatlist from "../UI/Flatlist"
import useJobSearch from "../hooks/useJobSearch"
import JobCard from "./JobCard"
import Filter from "./Filter"

const url = "https://api.weekday.technology/adhoc/getSampleJdJSON"

const JobSearch = () => {
  const styles = stylesheet()
  const observer = useRef()
  const [pageLimit, setPageLimit] = useState(10)
  const [filters, setFilters] = useState({
    minExp: '',
    companyName: '',
    location: '',
    roles: [],
    minSalary: '',
  })

  const { data, error, hasMore } = useJobSearch(url, pageLimit)

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }))
  }

  // apply filter on provided filter options for jobs data
  const filteredJobs = data.jdList.filter((job) => {
    const passesMinExp = filters.minExp.length === 0 || filters.minExp.some(role => job.minExp >= role.value)
    const passesCompanyName = !filters.companyName || job.companyName.toLowerCase().includes(filters.companyName.toLowerCase())
    const passesLocation = filters.location.length === 0 ||
      filters.location.some(location => {
        if (location.value === 'remote') {
          return job.location.toLowerCase().includes(location.value.toLowerCase())
        } else {
          return job.location.toLowerCase() !== 'remote'
        }
      })

    const passesRoles = filters.roles.length === 0 || filters.roles.some(role => job.jobRole.toLowerCase().includes(role.value.toLowerCase()))
    const passesMinSalary = filters.minSalary.length === 0 || filters.minSalary.some(role => job.minJdSalary >= role.value)

    return passesMinExp && passesCompanyName && passesLocation && passesRoles && passesMinSalary
  })

  // for infinite scroll for jobs to load
  const lastJobRef = useCallback((list) => {
    // exit early if list or hasMore is false
    if (!list || !hasMore) return

    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        // Check if there are more items in the filtered list
        const remainingItems = data.jdList.length - filteredJobs.length
        if (remainingItems > 0) {
          setPageLimit(prevPageLimit => prevPageLimit + 10)
        } else {
          setPageLimit(prevPageLimit => prevPageLimit + 10)
        }
      }
    })
    if (list) observer.current.observe(list)
  }, [data.jdList.length, filteredJobs.length, hasMore, setPageLimit])


  // to render a particular job card
  const renderJob = ({ item }) => {
    const { jdLink, jobDetailsFromCompany, jobRole, companyName, logoUrl,
      location, maxJdSalary, minExp, minJdSalary,
    } = item
    console.log('🚀 ~ file: JobSearch.jsx:91 ~ renderJob ~ jobRole:', jobRole)

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
      />
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <Filter onFilterChange={handleFilterChange} filters={filters} />
      </div>
      <div>{error && 'Error fetching jobs...'}</div>
      <div>{filteredJobs.length === 0 && 'No Jobs available for this category at the moment'}</div>
      <Flatlist
        list={filteredJobs}
        listStyles={styles.lists}
      >
        {list => list.map((item, index) => {
          if (filteredJobs.length === index + 1) {
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
  filter: {
    marginBlock: 40,
  },
  lists: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 400px)',
    gap: 40,
  },
  '@media only screen and (max-width: 1040px)': {
    lists: {
      gridTemplateColumns: 'repeat(2, 400px)',
    }
  },
  '@media only screen and (max-width: 768px)': {
    lists: {
      gridTemplateColumns: 'repeat(2, 400px)',
    }
  },
  '@media only screen and (max-width: 600px)': {
    lists: {
      gridTemplateColumns: 'repeat(1, 400px)',
    }
  }
})

export default JobSearch