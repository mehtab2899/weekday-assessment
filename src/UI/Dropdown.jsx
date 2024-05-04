/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/styles'
import { useEffect, useRef, useState } from 'react'

import Arrow from '../../public/dropdown.svg'

const Dropdown = (props) => {
  const { data, onFilterChange, type } = props
  const styles = stylesheet()
  const [selectedRoles, setSelectedRoles] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    };
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleRoleChange = (type, role) => {
    const updatedRoles = [...selectedRoles]
    updatedRoles.push(role)
    onFilterChange(type, updatedRoles)
    setSelectedRoles(updatedRoles)
    toggleDropdown()
  }

  const clearAllRoles = (e) => {
    e.stopPropagation()
    setSelectedRoles([])
    // reset all filters by calling onFilterChange with empty values
    onFilterChange(type, [])
  }

  const clearRole = (e, roleToRemove) => {
    e.stopPropagation()
    // remove the role to be cleared from selectedRoles state
    const updatedRoles = selectedRoles.filter((role) => role.value !== roleToRemove.value);
    setSelectedRoles(updatedRoles);

    // call onFilterChange with the updated list of roles
    onFilterChange(type, updatedRoles)
  }

  const typesMap = {
    roles: 'roles',
    minSalary: 'min base pay',
    location: 'remote',
    minExp: 'experience',
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <span
        style={{ visibility: selectedRoles.length > 0 ? 'visible' : 'hidden' }}
        className={styles.type}>
        {typesMap[type]}
      </span>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        {selectedRoles.length === 0 && <p>{typesMap[type]}</p>}
        {
          selectedRoles.length > 0 && (
            <div className={styles.selectedRoles}>
              {selectedRoles.map(role => (
                <span key={role.value} className={styles.selectedRole}>
                  {role.label}
                  <button onClick={(e) => clearRole(e, role)}>x</button>
                </span>
              ))}
              <button className={styles.clearButton} onClick={e => clearAllRoles(e)}>x</button>
            </div>
          )
        }
        <span style={{ fontWeight: isOpen ? 900 : 500 }}>
          <img src={Arrow} alt='down-arrow' width={25} />
        </span>
      </div>
      {
        isOpen && (
          <div className={styles.dropdownContent}>
            {data
              .map(roleGroup => (
                <div key={roleGroup.type} className={styles.dropdownItem}>
                  <h3 className={styles.dropdownItemHeader}>{roleGroup.type}</h3>
                  {roleGroup.roles ?
                    roleGroup.roles
                      .filter(roleGroup => type === 'roles' && !selectedRoles.some(item => item.value === roleGroup.value))
                      .map(role => (
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
    </div >
  )
}

const stylesheet = makeStyles({
  dropdown: {
    position: 'relative',
    minWidth: 200,
    color: '#808080',
  },
  type: {
    color: '#000',
    textTransform: 'capitalize',
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
    position: 'relative',

    '& p': {
      fontSize: 13,
    },

    '& span': {
      borderLeft: '1px solid #cccccc',
      paddingLeft: 10,
    },
  },
  dropdownContent: {
    position: 'absolute',
    top: 70,
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
    textTransform: 'uppercase',
    color: '#cccccc',
  },
  dropdownItemLabel: {
    display: 'block',
    marginBottom: 1,
    color: '#000',
    textTransform: 'capitalize',

    '& input[type="checkbox"]': {
      display: 'none',
    },

    '&:hover': {
      backgroundColor: 'lightblue',
    },
  },
  selectedRoles: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  selectedRole: {
    display: 'flex',
    backgroundColor: 'rgb(230, 230, 230)',
    borderRadius: 2,
    fontSize: 12,
    padding: '3px 5px',

    '& button': {
      fontSize: 16,
      marginLeft: 10,
      padding: 2,
      color: '#000',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',

      '&:hover': {
        background: 'orange',
        color: 'red',
      },
    },
  },
  clearButton: {
    fontSize: 20,
    marginLeft: 50,
    marginRight: 10,
    color: 'rgb(204, 204, 204)',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',

    '&:hover': {
      color: "#000",
    },
  },
})

export default Dropdown
