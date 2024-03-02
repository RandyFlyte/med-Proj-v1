import { Line } from 'react-chartjs-2';
import { useTimeStore } from '../_utils/store.js';
import { useDosageStore } from '../_utils/store.js';
import { useEntriesStore } from '../_utils/store.js';
import { useShowGraphStore } from '../_utils/store.js';

const PharmaGraph = ({  }) => {
  const showGraph = useShowGraphStore((state) => state.showGraph);
  const setShowGraph = useShowGraphStore((state) => state.setShowGraph);
  const entries = useEntriesStore((state) => state.entries);
  const setEntries = useEntriesStore((state) => state.setEntries);
  const currentTime = useTimeStore((state) => state.currentTime);
  const setDosage = useDosageStore((state) => state.setDosage);
  const dosage = useDosageStore((state) => state.dosage);


  const calculateConcentration = (dosage, time) => {
    // Convert time to hours for this calculation
    const hours = time / 60;

    // Define key points in the curve
    const absorptionEnd = 1; // Absorption ends at 1 hour
    const peakConcentration = dosage * 1; // Assume peak is 1.5 times the dosage for visual effect
    const eliminationStart = 3; // Start elimination after 2 hours
    const totalDuration = 6; // Curve ends at 6 hours

    if (hours <= absorptionEnd) {
      // Linear increase during absorption phase
      return (peakConcentration / absorptionEnd) * hours;
    } else if (hours <= eliminationStart) {
      // Maintain peak concentration
      return peakConcentration;
    } else {
      // Quadratic decline during elimination phase to mimic faster drop
      const scale =
        peakConcentration / Math.pow(totalDuration - eliminationStart, 2);
      return scale * Math.pow(hours - totalDuration, 2);
    }
  };

  // Formatting

  // Function to format labels as "50 min", "1 hr", "1 hr 10 min", etc.
  const formatLabel = (minutes) => {
    if (minutes === 0) return '0 min';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours} hr`;
    return `${hours} hr ${mins} min`;
  };

  // Generate labels and data points for every 15 minutes up to 6 hours
  const labels = Array.from({ length: 24 }, (_, i) => formatLabel(i * 15));
  const dataPoints = labels.map((_, i) =>
    calculateConcentration(dosage, i * 15)
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Caffeine concentration in blood (mg/L)',
        data: dataPoints,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ width: '800px', height: '400px' }}>
      <Line data={data} />
    </div>
  );
};

export default PharmaGraph;
