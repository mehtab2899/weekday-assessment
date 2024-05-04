/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/styles'
import { useState } from 'react'

import Arrow from '../../public/dropdown.svg'

const Dropdown = (props) => {
  const { data, onFilterChange, type } = props
  const styles = stylesheet()
  const [selectedRoles, setSelectedRoles] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleRoleChange = (type, role) => {
    const isSelected = selectedRoles.some(item => item.value === role.value)
    if (isSelected) {
      setSelectedRoles(selectedRoles.filter(item => item.value !== role.value))
    } else {
      onFilterChange(type, [...selectedRoles, role])
      setSelectedRoles([...selectedRoles, role])
    }
  }

  const clearAllRoles = () => {
    setSelectedRoles([])
    // Reset all filters by calling onFilterChange with empty values
    onFilterChange(type, [])
  }

  const clearRole = (roleToRemove) => {
    // Remove the role to be cleared from selectedRoles state
    const updatedRoles = selectedRoles.filter((role) => role.value !== roleToRemove.value);
    setSelectedRoles(updatedRoles);

    // Call onFilterChange with the updated list of roles
    onFilterChange(type, updatedRoles)
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        {type}
        <span style={{ fontWeight: isOpen ? 900 : 500 }}>
          <img src={Arrow} alt='down-arrow' width={25} />
        </span>
      </div>
      {
        isOpen && (
          <div className={styles.dropdownContent}>
            {data.map(roleGroup => (
              <div key={roleGroup.type} className={styles.dropdownItem}>
                <h3 className={styles.dropdownItemHeader}>{roleGroup.type}</h3>
                {roleGroup.roles ?
                  roleGroup.roles.map(role => (
                    <label key={role.value} className={styles.dropdownItemLabel}>
                      <input
                        type="checkbox"
                        value={role.value}
                        checked={selectedRoles.some(item => item.value === role.value)}
                        onChange={() => handleRoleChange(type, role)}
                      />
                      {role.label}
                    </label>
                  )) :
                  <label key={roleGroup.value} className={styles.dropdownItemLabel}>
                    <input
                      type="checkbox"
                      value={roleGroup.value}
                      checked={selectedRoles.some(item => item.value === roleGroup.value)}
                      onChange={() => handleRoleChange(type, roleGroup)}
                    />
                    {roleGroup.label}
                  </label>
                }
              </div>
            ))}
          </div>
        )
      }
      {
        selectedRoles.length > 0 && (
          <div>
            {selectedRoles.map(role => (
              <span key={role.value} className={styles.selectedRole}>
                {role.label}
                <button className={styles.clearButton} onClick={() => clearRole(role)}>x</button>
              </span>
            ))}
            <button className={styles.clearButton} onClick={clearAllRoles}>Clear All</button>
          </div>
        )
      }
    </div >
  )
}

const stylesheet = makeStyles({
  dropdown: {
    position: 'relative',
    width: 200,
    color: '#808080',
  },
  dropdownHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    textTransform: 'capitalize',
    padding: 5,
    border: '1px solid lightgray',
    cursor: 'pointer',
    borderRadius: 5,

    '& span': {
      borderLeft: '1px solid #cccccc',
      paddingLeft: 10,
    },
  },
  dropdownContent: {
    position: 'absolute',
    top: 50,
    left: 0,
    zIndex: 999,
    width: '100%',
    maxHeight: 200,
    overflowY: 'auto',
    backgroundColor: '#fff',
    border: '1px solid #cccccc',
    padding: 5,
    borderRadius: 5,
  },
  dropdownItem: {
    padding: 1,
  },
  dropdownItemHeader: {
    marginBottom: 1,
    fontSize: 12,
  },
  dropdownItemLabel: {
    display: 'block',
    marginBottom: 1,

    '& input[type="checkbox"]': {
      display: 'none',
    }
  },
  selectedRole: {
    display: 'inline-block',
    padding: 5,
    marginRight: 1,
    borderRadius: 10,
    backgroundColor: 'gray',
  },
  clearButton: {
    marginLeft: 1,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
})

export default Dropdown
