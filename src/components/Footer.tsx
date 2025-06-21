
const Footer = () => {
  return (
    <>
        <footer className="absolute bottom-[-10vh] md:bottom-[-9.7vh] w-full  bg-gray-800 text-white h-[10vh] flex items-center">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Language Learning Bot. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Contact Us</a>
          </div>
        </div>
        </footer>
    </>
  )
}

export default Footer