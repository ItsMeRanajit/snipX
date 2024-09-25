import { Suspense } from "react"
import Feed from "@components/Feed"
const Home = () => {
  return (
    <section className='flex-col w-full flex-center'>
        <h1 className='text-center head_text'>Find, Bind & Share 
            <br className='md:hidden'/>
            <span className='text-center blue_gradient'> Code Snippets</span>
        </h1>
        <p className='text-center desc'>
        <span className='text-2xl font-bold'>SnipX </span>is the go-to spot for devs to swap and snag code snippets like pros! Whether you're speeding up your workflow or helping out a fellow coder, SnipX makes sharing code quick, easy, and totally fun. 
        </p>
          <Feed/>
    </section>

  )
}
 
export default Home