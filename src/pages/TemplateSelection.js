import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TemplateSelection() {
    const navigate = useNavigate();

    const handleSelect = (template) => {
        navigate(`/form/${template}`);
    };
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);

    return (
        <div style={{ padding: '0 20%', background: 'rgb(249 249 249)', textAlign: "center", }}>
            <div style={{ background: 'white', display: 'flex', gap: '1vw', padding: '5vh 3vw', borderRadius: '10px', }}>
                <div style={{ backgroundColor: 'orangeRed', color: 'white', padding: '0.5vh 2vw', fontWeight: '500', borderRadius: '20px', }}>Select Template</div>
                <div style={{ backgroundColor: 'grey', color: 'white', padding: '0.4vh 2vw', fontWeight: '500', borderRadius: '20px' }}>Settings</div>
                <div style={{ backgroundColor: 'grey', color: 'white', padding: '0.4vh 2vw', fontWeight: '500', borderRadius: '20px' }}>Hero Section</div>
                <div style={{ backgroundColor: 'grey', color: 'white', padding: '0.4vh 2vw', fontWeight: '500', borderRadius: '20px' }}>About Me</div>
                <div style={{ backgroundColor: 'grey', color: 'white', padding: '0.4vh 2vw', fontWeight: '500', borderRadius: '20px' }}>Skills</div>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '4vh 0', marginTop: '5vh' }}>

                <h1>Choose Your Portfolio Template</h1>
                <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
                    {/* card1 */}
                    <div style={{ border: isHovered ? '4px solid rgb(255 212 0 / 1)' : '4px solid grey', display: 'flex', flexDirection: 'column', padding: '3vh', borderRadius: '15px', width: '22vw', textAlign: 'left' }} onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                        <img style={{ height: '30vh', borderRadius: '10px' }} src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600" />
                        <h3 >Template 1</h3>
                        <p style={{ margin: '0' }}>Modern and clean design with yellow hero section and professional layout.</p>
                        <ul style={{ color: 'grey' }}>
                            <li>Yellow Hero Section</li>
                            <li>Grid Portfolio</li>
                            <li>Testimonials Carousel</li>
                            <li>Contact Form</li>
                        </ul>

                        <button style={{ width: '8vw', padding: '2vh 0', borderRadius: '10px', backgroundColor: 'rgb(255 212 0 / 1)', fontSize: '1em' }} onClick={() => handleSelect("A")}>Select</button>
                    </div>
                    {/* card22 */}
                    <div style={{ border: isHovered2 ? '4px solid rgb(255 212 0 / 1)' : '4px solid grey', display: 'flex', flexDirection: 'column', padding: '3vh', borderRadius: '15px', width: '22vw', textAlign: 'left' }} onMouseEnter={() => setIsHovered2(true)}
                        onMouseLeave={() => setIsHovered2(false)}>
                        <img style={{ height: '30vh', borderRadius: '10px' }} src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600" />
                        <h3 >Template 2</h3>
                        <p style={{ margin: '0' }}>Modern and clean design with yellow hero section and professional layout.</p>
                        <ul style={{ color: 'grey' }}>
                            <li>Yellow Hero Section</li>
                            <li>Grid Portfolio</li>
                            <li>Testimonials Carousel</li>
                            <li>Contact Form</li>
                        </ul>

                        <button style={{ width: '8vw', padding: '2vh 0', borderRadius: '10px', backgroundColor: 'rgb(255 212 0 / 1)', fontSize: '1em' }} onClick={() => handleSelect("B")}>Select</button>
                    </div>




                </div>
            </div>
        </div>
    );
}
