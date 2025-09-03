import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
export default function ProfessionalsListPage() {
    const navigate = useNavigate();
    const [professionals, setProfessionals] = useState([]);
    const [filteredProfessionals, setFilteredProfessionals] = useState([]);


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this profile?")) return;
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/professionals/${id}`);
            setProfessionals(prev => prev.filter(p => p._id !== id));
            setFilteredProfessionals(prev => prev.filter(p => p._id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete profile.");
        }
    };



    // Filters & search state
    const [locationFilter, setLocationFilter] = useState("All");
    const [skillFilter, setSkillFilter] = useState("All");
    const [sortBy, setSortBy] = useState("Default");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchProfiles() {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/professionals`);
                setProfessionals(res.data);
                setFilteredProfessionals(res.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchProfiles();
    }, []);

    // Unique values for dropdowns
    const allLocations = Array.from(
        new Set(professionals.map((p) => p.contact.location).filter(Boolean))
    );
    const allSkills = Array.from(
        new Set(professionals.flatMap((p) => p.skills || []))
    );

    // Apply filters, sorting, and search
    useEffect(() => {
        let result = [...professionals];

        // Filter by location
        if (locationFilter !== "All") {
            result = result.filter((p) => p.contact.location === locationFilter);
        }

        // Filter by skill
        if (skillFilter !== "All") {
            result = result.filter((p) => p.skills?.includes(skillFilter));
        }

        // Search by name/title/bio
        if (searchQuery.trim() !== "") {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.title?.toLowerCase().includes(q) ||
                    p.bio?.toLowerCase().includes(q)
            );
        }

        // Sort by name
        if (sortBy === "A-Z") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "Z-A") {
            result.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredProfessionals(result);
    }, [locationFilter, skillFilter, sortBy, searchQuery, professionals]);

    return (
        <>

            <div
                style={{
                    backgroundImage:
                        "linear-gradient(to bottom right, #facc15, #fde047, #eab308)",
                    color: "black",
                    textAlign: "center",
                    marginTop: "-1vh",
                    height: "22vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto 1fr",
                        alignItems: "center",
                        width: "90%",
                    }}
                >
                    <div></div>
                    <h1 style={{ margin: "1vh", fontWeight: "700", fontSize: "3em" }}>
                        Meet Our Professionals
                    </h1>
                    <div style={{ textAlign: "right" }}>
                        <Link
                            to="/templateselection"
                            style={{
                                backgroundColor: "black",
                                color: "white",
                                padding: "8px 16px",
                                borderRadius: "6px",
                                textDecoration: "none",
                                fontWeight: "600",
                            }}
                        >
                            List Your Profile
                        </Link>
                    </div>
                </div>

                {/* Subtitle */}
                <p style={{ fontSize: "1.2em", margin: "0" }}>
                    Meet the experts shaping the future of drone tech
                </p>

                {/* Divider Line */}
                <div
                    style={{
                        backgroundColor: "black",
                        height: ".6vh",
                        width: "9%",
                        margin: "2vh auto",
                    }}
                ></div>
            </div>


            <div >
                {/* <div style={{ padding: "2rem" }}> */}



                {/* 🔹 Filters Section */}
                <div style={{ display: "flex", gap: "1rem", marginBottom: "0rem", flexWrap: "wrap", backgroundColor: "rgb(250 204 21 )", height: '10vh', alignItems: 'center', justifyContent: 'space-around', borderBottom: '0.8px solid black' }}>
                    {/* Search Bar */}
                    <input style={{ borderRadius: '5px', backgroundColor: "rgb(254 240 138 / var(--tw-bg-opacity, 1))", height: '5vh', width: '16vw' }}
                        type="text"
                        placeholder="Search Professionals..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div style={{ display: 'flex', gap: '1vw' }}>

                        {/* Location Filter */}
                        <label>
                            {/* Location:{" "} */}
                            <select
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)} style={{ borderRadius: '5px', backgroundColor: "rgb(254 240 138 / var(--tw-bg-opacity, 1))", height: '5vh', width: '11vw' }}
                            >
                                <option value="All">All Locations</option>
                                {allLocations.map((loc, idx) => (
                                    <option key={idx} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {/* Skill Filter */}
                        <label>
                            {/* Profession/Skill:{" "} */}
                            <select style={{ borderRadius: '5px', backgroundColor: "rgb(254 240 138 / var(--tw-bg-opacity, 1))", height: '5vh', width: '11vw' }}
                                value={skillFilter}
                                onChange={(e) => setSkillFilter(e.target.value)}
                            >
                                <option value="All">All Professions</option>
                                {allSkills.map((skill, idx) => (
                                    <option key={idx} value={skill}>
                                        {skill}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {/* Sort by Name */}
                        <label>
                            {/* Sort by:{" "} */}
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ borderRadius: '5px', backgroundColor: "rgb(254 240 138 / var(--tw-bg-opacity, 1))", height: '5vh', width: '11vw' }}>
                                <option value="Default">Sort By Name</option>
                                <option value="A-Z">Name (A–Z)</option>
                                <option value="Z-A">Name (Z–A)</option>
                            </select>
                        </label>

                    </div>
                </div>

                {/* <hr/> */}
                <div style={{ padding: '2vw 4vw', backgroundColor: "rgb(250 204 21 )" }}>

                    <h1>All Professionals</h1>

                    {/* 🔹 Professionals Grid */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", }}>
                        {filteredProfessionals.length > 0 ? (
                            filteredProfessionals.map((p) => (
                                <div
                                    key={p._id}
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "1rem",
                                        borderRadius: "16px",
                                        width: "250px",
                                        backgroundColor: "rgb(254 240 138 / var(--tw-bg-opacity, 1))",
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                                    }}
                                >





                                    <div style={{ display: "flex", gap: "4px", width: '100%' }}>
                                        {/* Edit Button */}
                                        <button
                                            onClick={() => navigate(`/form/template/${p._id}`)} // Edit mode
                                            style={{
                                                backgroundColor: "#4caf50",
                                                color: "white",
                                                border: "none",
                                                padding: "4px 6px",
                                                borderRadius: "4px",
                                                fontSize: "0.7em",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Edit
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            style={{
                                                backgroundColor: "#f44336",
                                                color: "white",
                                                border: "none",
                                                padding: "4px 6px",
                                                borderRadius: "4px",
                                                fontSize: "0.7em",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>






                                    <img
                                        src={p.profileImage}
                                        alt={p.name}
                                        width="100px"
                                        height="100px"
                                        style={{ borderRadius: "50%" }}
                                    />
                                    <h3 style={{ margin: '1vh' }}>{p.name}</h3>
                                    <p style={{
                                        backgroundColor: " #000000",
                                        borderRadius: " 20px",
                                        color: "white",
                                        padding: "3px 7px", margin: '0'
                                    }}>{p.title}</p>
                                    <p style={{ margin: '', color: 'grey' }}>
                                        {p.contact?.location || "Unknown Loaction"}
                                    </p>
                                    <p style={{ margin: '0' }}> ⭐⭐⭐⭐⭐ 4.8</p>
                                    <p style={{ height: '7vh', overflow: 'hidden', margin: '1.5vh 0', color: 'grey' }}>{p.bio}</p>
                                    <div style={{ display: 'flex ', gap: '0.5vw' }}>
                                        <div style={{ height: '7vh', backgroundColor: '#FFFF4C', borderRadius: '10px', padding: '0.5vw 1vw', }}><h3 style={{ margin: '0' }}>5 Years</h3><p style={{ margin: '0', color: 'grey' }}>Experience</p></div>
                                        <div style={{ height: '7vh', backgroundColor: '#FFFF90', borderRadius: '10px', padding: '0.5vw 1vw', }}><h3 style={{ margin: '0' }}>50</h3><p style={{ margin: '0', color: 'grey' }}>Projects</p></div>
                                    </div>
                                    <p>
                                        {/* <strong>Skills:</strong> {p.skills?.join(", ")} */}
                                        {/* <div style={{height:'5vh', backgroundColor:'#FFFF90'}}>
                    {p.skills?.slice(0, 2).join(", ")}
                    </div> */}
                                        <div style={{ display: "flex", gap: "8px", alignItems: "center", padding: "0 0px" }}>
                                            {p.skills?.slice(0, 2).map((skill, index) => (
                                                <span
                                                    key={index}
                                                    style={{
                                                        backgroundColor: "#facc15",
                                                        padding: "4px 10px",
                                                        borderRadius: "12px",
                                                        // fontWeight: "500"
                                                        fontSize: '0.7em'
                                                    }}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                    </p>
                                    <p>
                                        <Link to={`/portfolio/${p._id}`}>
                                            <button style={{ height: '6vh', borderRadius: '10px', backgroundColor: 'black', color: 'yellow', padding: '0 3vw' }}>✉︎ Contact</button>
                                        </Link>
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No professionals found.</p>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ backgroundImage: "linear-gradient(to right bottom, rgb(250, 204, 21), rgb(253, 224, 71), rgb(234, 179, 8))", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3vh', padding: '5vh 0', flexDirection: 'column' }} >
                <img style={{ height: '12vh' }} src="https://www.dronetv.in/images/logo.png" />
                <div style={{ display: 'flex', gap: '2vw' }}>
                    <div
                        style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%",
                            backgroundColor: "#ffff6a",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        <FaFacebookF />
                    </div>
                    <div
                        style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%",   // makes it round
                            backgroundColor: "#ffff6a",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        <FaInstagram />
                    </div>
                    <div
                        style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%",   // makes it round
                            backgroundColor: "#ffff6a",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        <FaTwitter />
                    </div>
                    <div
                        style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%",   // makes it round
                            backgroundColor: "#ffff6a",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        <FaYoutube />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '2vw' }}>
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                    <p> Carrers</p>
                    <p>Contact</p>
                    <p>Press</p>
                </div>
                <p style={{ opacity: '60%' }}>© 2024 Drone TV. Built with for the global drone community.</p>

            </div>

        </>
    );
}
