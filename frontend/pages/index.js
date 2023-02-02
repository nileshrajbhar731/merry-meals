import cabbage from '../public/images/cabbage.png';
import fish from '../public/images/fish.png';
import leaves from '../public/images/leaves.png';
import strawberry from '../public/images/strawberry.png';
import mealPlate2 from '../public/images/mealPlate2.png';
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className='home-main'>
      <div className="hero-container">
        <div className="hero-left">
          <h1>We make a difference.</h1>
          <p>Healthy meals are no longer a problem. At merry meals we we distribute healty measl to those in needs. You can also join us by simply registering to our portal. Register now!!</p>
          <Link className='btn btn_success' href="register">Join Us</Link>
        </div>
        <div className="hero-right">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill-opacity="1" d="M0,32L48,37.3C96,43,192,53,288,64C384,75,480,85,576,117.3C672,149,768,203,864,224C960,245,1056,235,1152,208C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
          <Image src={mealPlate2.src} alt="Meal Plate" />
        </div>
      </div>

      <div className='spec-section'>
        <div className='spec-container'>
          <div className='spec'>
            <Image className='fishImg' src={fish.src} alt='' />
            <p>Nutritious</p>
          </div>
          <div className='spec'>
            <Image className='strawberryImg' src={strawberry.src} alt='' />
            <p>Fresh</p>
          </div>
          <div className='spec'>
            <Image className='leavesImg' src={leaves.src} alt='' />
            <p>Healthy</p>
          </div>
        </div>
      </div>

      <div className='why-container'>
        <div className='why-left'>
          <Image src={cabbage.src} alt='cabbage' />
        </div>
        <div className='why-right'>
          <h2>Why Us?</h2>
          <p>We are partnered with many 100+ kitchens. Every meals are first verified by us before they are listed for your selection. Meals are verified on the basis of nutritional values like fats, proteins and carbohydrates.<br /><br />
            Our delivery system is structures in such a way that you will always receive your meals. Click the link below to learn more about us.</p>
          <Link className='btn btn_success' href='/about'>Learn More</Link>
        </div>
      </div>

      <div className='contact-container'>
        <div className='contact-left'>
          <h2>Any Queries?</h2>
          <p>If you have any queries or want to get in touch with us click the link and you will be redirected to the contact page.</p>
        </div>

        <div className='contact-right'>
          <Link className='btn btn_success' href='/contact'>Get in touch</Link>
        </div>
      </div>
    </div>
  );
}
