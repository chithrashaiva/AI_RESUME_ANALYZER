import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "~/component/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your job!"},
  ];
}

export default function Home() {
   const { isloading,auth }=usePuterStore();
    const location:location<any> = useLocation();
    const next:void =location.search.split(separator:"next=")[1] ||"/";
    const navigate :Navigation = useNavigate();
    
    useEffect(effect() => {
        if (!auth.isAuthenticated) {
            navigate(`/auth?next=${next}`);
        }
    },deps[auth.isAuthenticated ])
  return <main className="bg-[url('images/bg-main.svg')] bg-cover bg-center" >
        </Navbar>
     

      <section className="main-section">
      <div className="page-heading" py-16>
        <h1 >Track Your Applications and Resume Ratings</h1>
        <h2>Review Your Sumbmission and Check AI-Powered Feedback. </h2>
      </div>
    </section> 

      {resumes.length>0 && (
      <div className="resume-section">
      {resumes.map(callbackin:(Resume) => (
        <Resumecard key={Resume.id} Resume={Resume}></Resumecard>
      ))}
        </div>
      )}
  
      </main>
}
