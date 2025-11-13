import { NavLink } from 'react-router'

const ErrorPage = () => {
    return (
        <div className='lg:ml-[240px]'>
            <img  className='w-[800px]' src="/errorPage.jpg" alt="" />
            <button  className="btn  bg-linear-to-r from-cyan-900 to-indigo-200 ml-[165px] md:ml-[340px] lg:ml-[360px] text-white mt-5"> <NavLink to="/">Back To Home</NavLink></button>

        </div>
    )
}
export default ErrorPage