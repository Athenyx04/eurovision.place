import { useSorterStore } from '../store/sorterStore'

function Percentage() {
  const { finishSize, totalSize } = useSorterStore()

  const percentage = totalSize ? ((finishSize / totalSize) * 100).toFixed(0) : 0

  return (
    <div className='flex items-center justify-center'>
      <div className='font-bold text-black'>{percentage}%</div>
    </div>
  )
}

export default Percentage
