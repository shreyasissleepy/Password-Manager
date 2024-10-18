
const Home = () => {
  return (
    <div className="Home">
        <h1>Password<span className="logo">Bin</span></h1>
        <span className="quote">Safe Haven for passwords.</span><br />
        <div className="buttons">
        
        <a href="/login"><button>Login</button></a>
        <a href="/signup"><button>SignUp</button></a>
        </div>
    </div>
  )
}

export default Home