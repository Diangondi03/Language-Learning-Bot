import { Link } from "react-router"
import Footer from "../components/Footer"


function Start() {

  return (
    <>
      <div className="navbar bg-indigo-950 relative h-[10vh] m-0">
        <h1 className="font-bold text-white">Language Learning Bot</h1>
        <div className="absolute flex right-3 gap-5">
        <Link to="/auth/login" className="btn btn-accent">Log in</Link>
        <Link to="/auth/signup" className="btn btn-primary">Sign up</Link>
        </div>
      </div>
      <div className="text-black h-[80vh] mb-[10vh] flex flex-col justify-center items-center bg-gradient-to-b from-blue-400 to-blue-600">
        <div className="text-center my-10">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Language Learning Bot</h1>
            <p className="py-6">Learn a new language with our AI-powered chatbot. Practice speaking, writing, and listening in a fun and interactive way.</p>
            <Link to="/auth/signup" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Start
