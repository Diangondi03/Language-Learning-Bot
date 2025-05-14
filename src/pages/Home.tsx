import InputSection from "../components/Home/InputSection"

const Home = () => {
    


  return (
    <>

        <div className="min-h-[80vh] flex justify-center items-center flex-col gap-10">
            <h2>Start a chat</h2>
        {Array.from({ length: 100 }, (_) => (
            <>
            
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea dolore reprehenderit accusantium sapiente aliquam, distinctio nihil dolorem perferendis labore molestiae culpa neque, eaque eius eos? Dolore quaerat aspernatur sint velit?
            
            <div className=" bg-gray-200 dark:bg-neutral-600 my-10 self-end p-3 w-fit rounded-2xl rounded-tr-none">You underestimate my power!</div>
            </>
        ))}
        </div>
        <InputSection/>


    </>
  )
}

export default Home