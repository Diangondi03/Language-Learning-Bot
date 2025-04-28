import { Link } from "react-router"
import Footer from "../components/Footer"


function Start() {

  return (
    <>
      <div className="navbar bg-blue-950 relative py-6">
        <h1 className="font-bold">Language Learning Bot</h1>
        <div className="absolute flex right-3 gap-5">
        <Link to="/login" className="btn btn-accent">Log in</Link>
        <Link to="/signup" className="btn btn-primary">Sign up</Link>
        </div>
      </div>
      <div className="text-black">
        <div className="hero-content text-center my-10">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Language Learning Bot</h1>
            <p className="py-6">Learn a new language with our AI-powered chatbot. Practice speaking, writing, and listening in a fun and interactive way.</p>
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Start
