
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PortfioloA from "../components/PortfolioA";
import PortfolioB from "../components/PortfolioB";

export default function PortfolioPage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/professionals/${id}`
        );
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, [id]);

  if (!profile) return <p>Loading...</p>;

  // Switch between templates
  return (
    <div>
      {profile.template === "A" ? (
        <PortfioloA profile={profile} />
      ) : (
        <PortfolioB profile={profile} />
      )}
    </div>
  );
}
