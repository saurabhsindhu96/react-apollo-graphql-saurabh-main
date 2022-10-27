const getStyles = () => ({
  title: {
    fontSize: 50,
    padding: '15px',
    marginBottom: '50px'
  }
})

const Title = ({ name }) => {
  const styles = getStyles()

  return <h1 style={styles.title}>{name}</h1>
}

export default Title