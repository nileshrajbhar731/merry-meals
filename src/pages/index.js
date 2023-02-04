import { Link } from 'react-router-dom';


export default function HomePage() {
  return (
<>
    <div className='home-main'>
      <div className="hero-container">
        <div className="hero-left">
          <h1>We make a difference.</h1>
          <p>Healthy meals are no longer a problem. At merry meals we we distribute healty measl to those in needs. You can also join us by simply registering to our portal. Register now!!</p>
          <Link className='btn btn_success' to="register">Join Us</Link>
        </div>
        <div className="hero-right">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fillOpacity="1" d="M0,32L48,37.3C96,43,192,53,288,64C384,75,480,85,576,117.3C672,149,768,203,864,224C960,245,1056,235,1152,208C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
          <img src="./images/mealPlate2.png" alt="Meal Plate" />
        </div>
      </div>

      <div className='spec-section'>
        <div className='spec-container'>
          <div className='spec'>
            <img className='fishImg' src="./images/fish.png" alt='' />
            <p>Nutritious</p>
          </div>
          <div className='spec'>
            <img className='strawberryImg' src="./images/strawberry.png" alt='' />
            <p>Fresh</p>
          </div>
          <div className='spec'>
            <img className='leavesImg' src="./images/leaves.png" alt='' />
            <p>Healthy</p>
          </div>
        </div>
      </div>

      <div className='why-container'>
        <div className='why-left'>
          <img src="./images/cabbage.png" alt='cabbage' />
        </div>
        <div className='why-right'>
          <h2>Why Us?</h2>
          <p>We are partnered with many 100+ kitchens. Every meals are first verified by us before they are listed for your selection. Meals are verified on the basis of nutritional values like fats, proteins and carbohydrates.<br /><br />
            Our delivery system is structures in such a way that you will always receive your meals. Click the link below to learn more about us.</p>
          <Link className='btn btn_success' to='/about'>Learn More</Link>
        </div>
      </div>

      <div className='contact-container'>
        <div className='contact-left'>
          <h2>Any Queries?</h2>
          <p>If you have any queries or want to get in touch with us click the link and you will be redirected to the contact page.</p>
        </div>

        <div className='contact-right'>
          <Link className='btn btn_success' to='/contact'>Get in touch</Link>
        </div>
      </div>
    </div>
</>
  );
}
