import dynamic from "next/dynamic"
import { useMemo } from "react";


export default function home() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/map/'),
    {
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="bg-white-700 mx-auto w-[100%] h-[100%]">
        <Map posix={[4.79029, -75.69003]} />
      </div>
    </div>
  )
}
