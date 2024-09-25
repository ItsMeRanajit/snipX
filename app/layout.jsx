// import Head from '../public/assets/images/brackets.png';

import '@/styles/global.css'
import Nav from "@components/Nav"
import Provider from "@components/Provider"
import { Suspense } from 'react'

export const metadata = {
    title : "snipX",
    description : "Discover & Share Code Snippets",
    icons: {
        icon: '/assets/images/brackets.png' // Path to your logo
    }
}
const layout = ( {children} ) => {
  return (
    
    <html lang='en' >
        <body className=''>
            <Suspense>
            <Provider>
                <div className='main'>
                    <div className='gradient'></div>
                </div>
                <main className='app'>
                    <Nav/>
                    {children}
                </main>
            </Provider>
            </Suspense>
        </body>

    </html>
  )
}

export default layout