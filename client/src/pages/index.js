import Image from 'next/image';
import vector from '@/assets/vectors/home.svg';

export default function Home() {
  return (
    <>
      <Image src={vector} alt="Home" />
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit vero
        fugit, dolores aspernatur perferendis veniam corrupti cupiditate? Qui et
        illo perferendis, architecto, voluptatem maxime optio voluptas veritatis
        quisquam ipsum fugiat!
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit vero
        fugit, dolores aspernatur perferendis veniam corrupti cupiditate? Qui et
        illo perferendis, architecto, voluptatem maxime optio voluptas veritatis
        quisquam ipsum fugiat!
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit vero
        fugit, dolores aspernatur perferendis veniam corrupti cupiditate? Qui et
        illo perferendis, architecto, voluptatem maxime optio voluptas veritatis
        quisquam ipsum fugiat!
      </div>
    </>
  );
}
