import PropTypes from "prop-types"

const Flatlist = (props) => {
  const { list, listStyles, children } = props
  return (
    <div
      className={listStyles}
    >
      {children(list)}
    </div>
  )
}

Flatlist.propTypes = {
  list: PropTypes.array.isRequired,
  listStyles: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
}

export default Flatlist
