import DosageForm from './components/DosageForm';
import Time from './components/Time';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-slate-400'>
      <DosageForm />
      <Time />
    </main>
  );
}
