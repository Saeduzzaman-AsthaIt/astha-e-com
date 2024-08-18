import Image from "next/image";
import Slider from "react-slick";

const pokemonImages = [
  "https://img.lemde.fr/2022/12/22/5/0/1730/865/1440/720/60/0/e968e4d_1671703423578-b5e.jpeg",
  "https://occ-0-8407-2705.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABf_vkYSzY2EsbRFAOJOS3_ZdreU4YoqzdzVZf-f1CEP9ndmI3705aHteXy3ZD7tLH4YbavoJT3lPK9luZDLgQxhQOBw1tLuBzxFG.jpg?r=b99",
  "https://images.secretlab.co/theme/common/collab_pokemon_catalog_charizard-min.png",
  "https://lh3.googleusercontent.com/Pxz5b6VD4PJ4u4QQgarOd0suIhcile2L-NiG32Jfqs9_l767GihY187poRRH0aRjEWw1rgfdsv-hyxGLbFsRy5TFLmSDHfrKTGmX1vzTmzXwXw=w1440-e365",
];

export default function PokemonSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-2">
      <Slider {...settings}>
        {pokemonImages.map((image, index) => (
          <div key={index}>
            <Image
              src={image}
              alt={`Pokemon ${index + 1}`}
              className="w-full h-auto"
              width={800}
              height={300}
              objectFit="contain"
              fill={false}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
