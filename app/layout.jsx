// import Head from '../public/assets/images/brackets.png';

import '@/styles/global.css'
import Nav from "@components/Nav"
import Provider from "@components/Provider"

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
            <Provider>
                <div className='main'>
                    <div className='gradient'></div>
                </div>
                <main className='app'>
                    <Nav/>
                    {children}
                </main>
            </Provider>
        </body>

    </html>
  )
}

export default layout