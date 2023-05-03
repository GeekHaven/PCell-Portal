import Image from 'next/image';
import vector from '@/assets/vectors/home.svg';

export default function Home() {
  return (
    <>
      <Image src={vector} alt="Home" />
    </>
  );
}
