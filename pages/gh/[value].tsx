import {useRouter} from 'next/router'
import {number} from "prop-types";

const svg404 = (<svg xmlns='http://www.w3.org/2000/svg' width={1404} height={404}>
    <rect x='0' y='0' width={1404} height={404} fill='#CCC'/>
    <text x='50%' y='50%'
          style={{dominantBaseline: "middle", textAnchor: "middle", fontSize: Math.floor(0.14 * 1404)}}
          fill='#FFF'>404
    </text>
</svg>)
const Index = () => {
    const router = useRouter()
    const {value} = router.query
    if (!value) {
        return svg404
    }
    let hw = (value + "").split('x');
    if (hw.length != 2 || isNaN(Number(hw[0])) || isNaN(Number(hw[1]))) {
        return svg404
    }
    return (<svg xmlns='http://www.w3.org/2000/svg' width={hw[0]} height={hw[1]}>
        <rect x='0' y='0' width={hw[0]} height={hw[1]} fill='#CCC'/>
        <text x='50%' y='50%'
              style={{dominantBaseline: "middle", textAnchor: "middle", fontSize: Math.floor(0.14 * Number(hw[0]))}}
              fill='#FFF'>{value}</text>
    </svg>)
}

export default Index