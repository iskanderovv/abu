import { BounceLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className='flex h-screen justify-center items-center'>
        <BounceLoader color="#36d7b7" />
    </div>
  )
}
