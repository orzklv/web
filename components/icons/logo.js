import Image from 'next/image'
import PNG from '../../public/favicons/logo.png'

// PNG Version
// const Logo = () => {
//   return <Image src={PNG} width={50} height={50} alt="Sokhibjon's Logo" />
// }

// SVG Resolution
const Logo = () => {
  // fill="var(--fg)" == fill="#ffffff"
  // fill="var(--bg)" == fill="var(--bg)"
  return (
    <svg height="30" viewBox="0 0 3000 3000">
      <g
        id="Main"
        stroke="none"
        strokeWidth="1"
        fill="var(--fg)"
        fillRule="evenodd"
      >
        <path
          d="M2391,1 L2391,623 L2986,623 L2391,1218 L2391,1813 L2390.188,1813 L1202,3000 L1202,2406.0945 L1794.502,1813 L1202,1813 L1202,1218.5 L608.5,1812 L14,1812 L1202,624 L1202,623 L1796,623 L2391,1 Z"
          id="Combined-Shape"
        ></path>
      </g>
    </svg>
  )
}

export default Logo
