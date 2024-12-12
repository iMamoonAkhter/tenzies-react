
const Die = ({value, isHeld}) => {
    const styles = {
        backgroundColor: isHeld ? "#59e391" : "white"
    }
  return (
    <button style={styles}>{value}</button>
  )
}

export default Die