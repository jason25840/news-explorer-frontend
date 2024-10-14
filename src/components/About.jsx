/*import GC from '../images/gc-chillin.JPG';
import '../styles/About.css';

const About = () => {
    return ( 
        <div className="about_content">
        <img src={ GC } alt="author-image" className="about_rounded-image" />
        <div className="about_content-text">
        <h1 className="about_heading">About the author</h1>
        <div className="about_description">
            <p className="author-bio">Jason Knight is a former ICU nurse that has dreamed of working with software since he was a teenager. This project is one step closer to his initial goal of perfecting his use of the MERN stack and developing helpful software for the world. This is only the beginning!</p>
            <p className='tripleten-talk'>TripleTen has introduced me to a world of wonder. The Software Engineering course is flexible with its schedule and there is support every step of the way!</p>
        </div>
        </div>
        </div>
     );
}
 
export default About;*/

import GC from '../images/gc-chillin.JPG';
import '../styles/About.css';

const About = () => {
    return ( 
        <div className="about">
            <img src={GC} alt="author" className="about__image" />
            <div className="about__content">
                <h1 className="about__heading">About the author</h1>
                <div className="about__description">
                    <p className="about__bio">Jason Knight is a former ICU nurse that has dreamed of working with software since he was a teenager. This project is one step closer to his initial goal of perfecting his use of the MERN stack and developing helpful software for the world. This is only the beginning!</p>
                    <p className="about__tripleten">TripleTen has introduced me to a world of wonder. The Software Engineering course is flexible with its schedule and there is support every step of the way!</p>
                </div>
            </div>
        </div>
    );
}

export default About;