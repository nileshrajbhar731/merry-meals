import React from 'react'
import  Styles  from '../styles/about.module.css'

export default function about() {
  return (
    <>
        <div>
  <div className={`${Styles.aboutsection}`}>
    <h1>About Us Page</h1>
    <p>you have two hands one to help Youself and second to help others!</p>
  </div>
  <div className={`${Styles.container}`}>
    <div className={`${Styles.row}`}>
      <div className={`${Styles.left}`}>
        <h1 className={`${Styles.R2}`}>Who we are</h1>
        <img src="/icons/fooddonate.jpg" alt className="image" />
      </div>
      <div className={`${Styles.right}`}>
        <div className={`${Styles.card}`}>
          <h1 className={`${Styles.R1}`}>Our Story</h1>
          <p className={`${Styles.para}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae est consequatur ab
            nostrum, qui
            aperiam, error quo libero officia laudantium pariatur culpa. Reprehenderit architecto dolores
            harum,
            id odio ratione facere odit ipsum rerum velit! Reiciendis, iste. Harum sit laboriosam ad dolor
            minus, repudiandae cumque excepturi natus nostrum, est ut, quidem odio. Velit sit nemo eaque eum
            facere dignissimos rem ipsa temporibus ipsam, amet saepe esse inventore reiciendis quasi autem
            officiis distinctio dolore cum ex odit architecto nam molestias. Ipsum incidunt eveniet
            doloribus
            dolore ut tempore quibusdam autem a maxime, facilis eius voluptatem quae error ab cupiditate
            nesciunt veritatis deserunt totam assumenda minus? Quasi, officiis mollitia? Voluptatem, eveniet
            fuga accusantium rem nostrum repudiandae enim soluta facere consectetur neque impedit eligendi
            autem
            officiis a! Nisi sequi incidunt quas dolorem corporis tempore sit nostrum atque? Aut, quos saepe
            ut
            cumque quibusdam temporibus iusto quisquam magni nemo aperiam ipsam, inventore eius corrupti
            voluptatem quod eveniet quam sunt commodi at? Beatae, ipsam? Consectetur dolores quos labore sed
            deserunt beatae, error voluptas asperiores at ducimus ad unde eaque quae autem libero veritatis
            earum illum iusto quasi hic, nemo dignissimos quia?</p>
        </div>
      </div>
    </div>
    <div className={`${Styles.followWidget}`}>
      <h2>Follow Us</h2>
      <p>Stay updated via social media</p>
      <ul>
        <li><a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a></li>
        <li><a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
        <li><a href="#"><i className="fa fa-pinterest-p" aria-hidden="true" /></a></li>
        <li><a href="#"><i className="fa fa-instagram" aria-hidden="true" /></a></li>
        <li><a href="#"><i className="fa fa-google-plus" aria-hidden="true" /></a></li>
        <li><a href="#"><i className="fa fa-youtube-play" aria-hidden="true" /></a></li>
      </ul>
    </div>
  </div>
</div>

    </>
  )
}
