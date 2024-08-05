import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface CarouseleProps {
  images: { src: string; alt: string }[];
}

const CarouselComponent = ({ images }: CarouseleProps) => {
  return (
    <Carousel
      showArrows={true}
      autoPlay
      centerMode
      infiniteLoop
      showStatus={false}
      showThumbs={false}
    >
      {images.map((image, index) => (
        <div key={index}>
          <Image
            src={baseUrl + image.src}
            alt={image.alt}
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAI0lEQVR42mP8z/C/HwMDAwMjI+P/AAz+'
            width={300}
            height={400}
          />

          <p className='legend'>{image.alt}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
