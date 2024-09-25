'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter,usePathname } from 'next/navigation';
import { useState , useEffect } from 'react'
import { signIn, signOut, useSession , getProviders } from 'next-auth/react'

const Nav = () => {
    const {data : session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggle, setToggle] = useState(false);
    const router = useRouter();
    const path = usePathname();


    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await getProviders();
                // alert('Providers fetched:', response);  
                setProviders(response);
            } catch (error) {
                console.error('Failed to fetch providers:', error);
            }
        };
        fetchProviders();
    }, []);

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.replace('/');  // Use replace to avoid issues with history
      };

  return (
        <nav className='w-full pt-3 mb-10 flex-between '>
            <Link href="/" className='flex items-center gap-2 flex-center '>
                <Image 
                src="/assets/images/bracs.svg" 
                alt='SnipX'
                width={50}
                height={50}
                className='object-contain'/>
            <p className='text-2xl logo_text'>SnipX</p>
            </Link>

{/* {alert (providers)} */}

            {/* Desktop Navigation  */}
            <div className='hidden sm:flex'>
                {
                    session ? (
                        <div className='flex gap-3 md:gap-5'>
                            {path !== '/' && (<Link href='/' className='black_btn'>Home</Link>)}
                            <Link href="/create-snippet" className='black_btn '>
                                Create Snippet
                            </Link>

                            <button type='button' onClick={() => {handleSignOut()}} className='font-bold outline_btn'>
                                Sign Out
                            </button>

                            <Link href="/profile">
                                <Image src={session?.user.image || '/assets/images/profile.jpeg'} className='border border-black rounded-full ' 
                                width={40}
                                height={40}
                                alt='profile'/>
                            </Link>    
                        </div>
                    ) : 
                    <>
                      {providers && 
                    Object.values(providers).map((provider) => (
                        <div className='flex gap-3 md:gap-5'>
                            {path !== '/' && (<Link href='/' className='black_btn'>Home</Link>)}

                            <button
                            type='button'
                            key = {provider.name}
                            onClick={() => signIn(provider.id)}
                            className='black_btn'>
                                Sign In
                            </button>
                        </div>
                    ))
                    }
                    </>
                }
            </div>

            {/* Mobile Navigation  */}
            <div className='relative flex sm:hidden'>
                {
                    session ? (
                        <div className='flex'>
                             <Image src={session?.user.image || '/assets/images/profile.jpeg'} className='border border-black rounded-full' 
                                width={40}
                                height={40}
                                alt='profile'
                                onClick={() => setToggle((prev) => !prev)}/>

                            {
                                toggle && (
                                    <div className='dropdown'>
                                        <Link href="/profile" className='dropdown_link'
                                        onClick={() => {setToggle(false)}}>My profile</Link>
                                        
                                        <Link href="/create-snippet" className='dropdown_link'
                                        onClick={() => {setToggle(false)}}>Create Snippet</Link>

                                        {path !== '/' && (<Link href='/' className='dropdown_link'>Home Page</Link>)}
                                        <button 
                                        className='w-full mt-3 black_btn'
                                        type='button'
                                        onClick={() => {
                                            setToggle(false)
                                            handleSignOut();
                                        }}>
                                            Sign Out
                                        </button>

                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <>
                        {providers && 
                      Object.values(providers).map((provider) => (
                        <div className='flex gap-3 md:gap-5'>
                            {path !== '/' && (<Link href='/' className='black_btn'>Home</Link>)}

                            <button
                            type='button'
                            key = {provider.name}
                            onClick={() => signIn(provider.id)}
                            className='black_btn'>
                                Sign In
                            </button>
                          </div>
                      ))
                      }
                      </>
                    )
                }
            </div>
        </nav>
  )
}

export default Nav