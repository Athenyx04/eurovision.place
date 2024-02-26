import { useSortingStore } from "../store/sortingStore";

function Percentage() {
  const { finishSize, totalSize } = useSortingStore();

  const percentage = ((finishSize / totalSize) * 100).toFixed(0);

  return (
    <div className="flex justify-center items-center">
      <div className="text-l font-bold text-black">{percentage}%</div>
    </div>
  );
}

export default Percentage;
