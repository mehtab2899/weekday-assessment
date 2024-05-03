import { makeStyles } from '@material-ui/styles'
import { memo } from 'react'
import PropTypes from 'prop-types'

const JobCard = memo(({
  logo,
  link,
  details,
  title,
  company,
  location,
  experience,
  minSalary,
  maxSalary,
  currency,
}) => {

  const styles = stylesheet()

  // to conditionally render a prop value if it exists
  const renderProp = (label = '', value) => {
    if (value) {
      return (
        <>
          <p>
            {label}
          </p>
          <p>
            {value}
          </p>
        </>
      )
    }
    return null
  }

  const applyHandler = () => {
    window.open(link)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logo} />
        <div>
          {renderProp('', company)}
          {renderProp('', title)}
          {renderProp('', location)}
        </div>
      </div>
      <p className={styles.salary}>
        Estimated Salary:
        {' '}
        {currency}
        {' '}
        {minSalary && maxSalary ? `${minSalary} - ${maxSalary}` : minSalary || maxSalary}
      </p>
      <div className={styles.about}>
        <h4>About Company:</h4>
        <h3>About us</h3>
        <p>{details}</p>
      </div>
      <div className={styles.footer}>
        <a href={link} target='_blank'>View Job</a>
        {renderProp('Minimun Experience', experience)}
        <button type='button' onClick={applyHandler}>
          ⚡ Easy Apply
        </button>
      </div>
    </div>
  )
})

const stylesheet = makeStyles({
  container: {
    borderRadius: 20,
    padding: 20,
    color: '#000000de',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 4px 0px',
    transition: 'box-shadow 300ms cubic- bezier(0.4, 0, 0.2, 1) 0ms',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,

    '& img': {
      width: 40,
    },


    '& p': {
      textTransform: 'capitalize',
      padding: '1px 0',
    },
  },
  about: {
    marginTop: 20,

    '& p': {
      height: 250,
      overflow: 'hidden',
      maskImage: 'linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0))',
    },
  },
  footer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    transition: 'background-color 0.3s ease',

    '& div': {
      marginBlock: 20,

      '& p': {
        color: '#8b8b8b'
      },
    },

    '& a': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      cursor: 'pointer',
    },

    '& button': {
      marginTop: 20,
      width: '100%',
      background: '#55efc4',
      border: 'none',
      padding: 10,
      cursor: 'pointer',
      borderRadius: 10,
    },
  },
  salary: {
    marginTop: 20,
    color: '#162652',
  },
})

JobCard.propTypes = {
  logo: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
  minSalary: PropTypes.number.isRequired,
  maxSalary: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
}

JobCard.displayName = JobCard

export default JobCard