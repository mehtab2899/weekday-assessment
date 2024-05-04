import { useCallback, useRef, useState } from "react"
import { makeStyles } from "@material-ui/styles"

import Flatlist from "../UI/Flatlist"
import useJobSearch from "../hooks/useJobSearch"
import JobCard from "./JobCard"
import Filter from "./Filter"

const url = "https://api.weekday.technology/adhoc/getSampleJdJSON"

const JobSearch = () => {
  const styles = stylesheet()
  const [pageLimit, setPageLimit] = useState(10)
  const [filters, setFilters] = useState({
    minExp: '',
    companyName: '',
    location: '',
    roles: [],
    minSalary: '',
    // employees: [],
  })

  const { data, error, hasMore } = useJobSearch(url, pageLimit)

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }))
  }

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

  const filteredJobs = data.jdList.filter((job) => {
    // Apply filters
    const passesMinExp = filters.minExp.length === 0 || filters.minExp.some(role => job.minExp >= role.value)
    const passesCompanyName = !filters.companyName || job.companyName.toLowerCase().includes(filters.companyName.toLowerCase())
    const passesLocation = filters.location.length === 0 || filters.location.some(role => job.location.toLowerCase().includes(role.value.toLowerCase()))
    const passesRoles = filters.roles.length === 0 || filters.roles.some(role => job.jobRole.toLowerCase().includes(role.value.toLowerCase()))
    const passesMinSalary = filters.minSalary.length === 0 || filters.minSalary.some(role => job.minJdSalary >= role.value)
    // const passesEmployees = filters.employees.length === 0 || filters.employees.some(employee => job.jobDetailsFromCompany.toLowerCase().includes(employee.toLowerCase()))

    return passesMinExp && passesCompanyName && passesLocation && passesRoles && passesMinSalary
  })


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
  filter: {
    marginBlock: 40,
  },
  lists: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto)',
    gap: 40,
  },
})

export default JobSearch