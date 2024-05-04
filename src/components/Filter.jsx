/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/styles'
import Dropdown from '../UI/Dropdown'
import { experince, jobLocation, minBasePay, roles } from '../utils/consts'
import SearchInput from '../UI/SearchInput'

const Filter = (props) => {
  const { onFilterChange } = props
  const styles = stylesheet()

  return (
    <div className={styles.container}>
      <Dropdown data={roles} onFilterChange={onFilterChange} type="roles" />
      <Dropdown data={experince} onFilterChange={onFilterChange} type="minExp" />
      <Dropdown data={jobLocation} onFilterChange={onFilterChange} type="location" />
      <Dropdown data={minBasePay} onFilterChange={onFilterChange} type="minSalary" />
      <SearchInput onChange={onFilterChange} placeholder="Search Company Name" />
    </div>
  )
}

const stylesheet = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
})

export default Filter