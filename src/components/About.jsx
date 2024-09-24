import GC from '../images/gc-chillin.JPG';
import '../styles/About.css';

const About = () => {
    return ( 
        <div className="about_content">
        <img src={ GC } alt="author-image" className="about_rounded-image" />
        <div className="about_content-text">
        <h1 className="about_heading">About the author</h1>
        <div className="about_description">
            <p className="author-bio">Jason Knight is a former ICU nurse that has dreamed of working with software since he was a teenager. This project is one step closer to his initial goal of perfecting his use of the MERN stack and developing helpful software for the world.</p>
            <p className='tripleten-talk'>TripleTen has helped me move closer to my goal of becoming a software developer. The Software Engineering course is flexible with its schedule and there is support every step of the way!</p>
        </div>
        </div>
        </div>
     );
}
 
export default About;