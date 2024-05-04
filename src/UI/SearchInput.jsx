/* eslint-disable react/prop-types */
import { makeStyles } from "@material-ui/styles"

const SearchInput = (props) => {
  const { placeholder, onChange } = props
  const styles = stylesheet()

  const handleSearch = (e) => {
    const value = e.target.value.trim()
    onChange('companyName', value)
  }

  return (
    <div>
      <input type="text" placeholder={placeholder} onChange={handleSearch} className={styles.input} />
    </div>
  )
}

const stylesheet = makeStyles({
  input: {
    marginTop: 20,
    color: '#808080',
    background: '#fff',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 13,
    border: '1px solid lightgray',
    cursor: 'pointer',
    borderRadius: 5,
  },
})

export default SearchInput