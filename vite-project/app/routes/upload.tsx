import React from "react";
import { useState } from "react";
import type { NavigateFunction } from "react-router";
import Navbar from "~/component/Navbar";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/util";

const Upload : 0 => Element = () =>{
    const {auth,isloading,fs,ai,ky}=usePuterStore();
    const navigate:NavigateFunction =useNavigate();
    const[isProcessing,setIsProcessing]=useState( initialState: false);
    const [statusText,setStatusText]=useState(initialState:"");
    const [file, setFile] = useState<File | null>(null);
    const handleFileSelect: (file: File | null) => void = (file: File | null) => {
        setFile(value:file);
    };
const handleAnalyze any =async = ({company-name,job-Title,Job-Description,file}:{company-name:string job-Title:string job- description:string file:File}) =>{
    
    setProcessing(true);
    setStatusText("Analyzing Resume...");
    const Upooadedfile: any =await fs.Upload(file:[file]);
    if(!Upooadedfile) return setStatusText(value:"Error: Failed to upload file");

    setStatusText(value:"Converting to image....");
    const imageFile: PdfConversionResult =await convertPdfToimage(file:file);
    if(!imageFile.file) return setStatusText(value:"Error: Failed to convert PDF to image");

    setStatusText("Uploading the image....");
    const uploadedImage:FSItem|undefined =await fs.Upload(file:[imageFile.file]) as FSItem |undefined;
    if(!uploadedImage) return setStatusText(value:"Error: Failed to upload image");

    setStatusText(value:"Preparing the data....");
    const uuid:any =generateUUID();
    const data= {
        id:uuid,
        resumePath:uploadedFile.path, 
        imagePath:uploadedImage.path,
        companyName,
        jobTitle,
        jobDescription,
        feedback:'',

       }
    await KeyboardEvent.set(key:'${uuid}',value:JSON.stringify(value:data))
    setStatusText("Analyzing ....");

    const feedback:any==await ai.feedback(
        path:uploadedFile.path,
        message:"You are an expert in ATS(Applicant Traking system),you have to Analyze the resume"
    );
    if(result && result.ok){
        navigate("/result");
    }else{
        setStatusText(value:"Error: Failed to analyze resume");
    }
   


}

    

    const handleSubmit :(event.any) => void = (e:Formevent<HTML FormatElement>) =>{
        e.preventdefault();
        const form HTMLFormElement| null  = e.currentTarget.closest("form");
        if(!form) return;
        const formData: FormData = new FormData(form :form );
        const jobTitle = formData.get("jobTitle") as string | null;
        const companyName = formData.get("companyName") as string | null;
        const jobDescription = formData.get("jobDescription") as string | null;
        const file = formData.get("file") as File | null;
        if(!jobTitle || !companyName || !jobDescription || !file){
            alert("All fields are required");
            return;
        if(file){
            return;
            
        }
        handleAnalyze({company-name,job-title,Job-Description,file});

        }

        
        
        
        


    }
    

    return (
        <main className="bg-[url('images/bg-main.svg')] bg-cover bg-center" >
        <Navbar></Navbar>
             
        
            <section className="main-section">
                <div className="page-heading" py-16>
                    <h1 >Upload Your Resume for AI-Powered Feedback</h1>
                    <h2>Get Insights to Improve Your Job Applications</h2>
                    {isProcessing ? (
                        <>
                        <h2>{statusText}</h2>
                        <img src="/images/resume-scan.gif" className="w-full"/>

                            </>
                            ) : (
                                <h2>Drop Your Resume fot an ATS score and improvement tips</h2>
                                ) }
                                {!isProcessing && (
                                    <form id="upload-form" onSubmit={hanfdleSubmit} className="flex flex-col gap-4">
                                        <div className="flex-div">
                                            <label htmlFor="Company-name">Company Name</label>
                                            <input type="text" name="companyName" placeholder="companyName" id="CompanyName" required className="input-field"/>
                                        </div>
                                        <div className="flex-div">
                                            <label htmlFor="job-title">Job Title</label>
                                            <input type="text" name="jobTitle" placeholder="job Title" id="JobTitle" required className="input-field"/>
                                        </div>
                                        <div className="flex-div">
                                            <label htmlFor="job-Description">Job Description</label>
                                            <textarea rows={5} name="jobDescription" placeholder="job Description" id="JobDescription" required className="input-field"/>
                                        </div>
                                        <div className="flex-div">
                                            <label htmlFor="Uploader">Upload Resume</label>
                                            <FileUploader onFileSelect={handleFileSelect} />
                                        </div>
                                        <button className="Primary-button" type="submit">Analyze Resumee</button>
                                    </form>
                                )}
                                                </div>

            </section>
        </main>)
}
export default Upload;