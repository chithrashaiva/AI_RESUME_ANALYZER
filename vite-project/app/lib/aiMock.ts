export interface ResumeFeedback {
    overallScore: number;
    ATS: {
        score: number;
        tips: Array<{ type: "good" | "improve"; tip: string; explanation: string }>;
    };
    toneAndStyle: {
        score: number;
        tips: Array<{ type: "good" | "improve"; tip: string; explanation: string }>;
    };
    content: {
        score: number;
        tips: Array<{ type: "good" | "improve"; tip: string; explanation: string }>;
    };
    structure: {
        score: number;
        tips: Array<{ type: "good" | "improve"; tip: string; explanation: string }>;
    };
    skills: {
        score: number;
        tips: Array<{ type: "good" | "improve"; tip: string; explanation: string }>;
    };
}

// Generate mock AI feedback based on resume content
export async function generateMockFeedback(
    jobTitle: string,
    jobDescription: string
): Promise<ResumeFeedback> {
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate scores based on input
    const hasKeywords = jobDescription.toLowerCase().includes("experience") ? 15 : 0;

    return {
        overallScore: 75 + hasKeywords,
        ATS: {
            score: 82,
            tips: [
                { type: "good", tip: "No fancy graphics detected", explanation: "Your resume uses standard formatting which ATS systems can easily parse" },
                { type: "improve", tip: "Add more keywords", explanation: "Include specific keywords from the job description to improve ATS matching" },
                { type: "improve", tip: "Use standard job titles", explanation: "Use industry-standard job titles that ATS systems recognize" },
                { type: "good", tip: "Clean structure", explanation: "Your resume structure is ATS-friendly with clear sections" },
                { type: "improve", tip: "Avoid tables and images", explanation: "Some ATS systems struggle with complex layouts" }
            ]
        },
        toneAndStyle: {
            score: 78,
            tips: [
                { type: "improve", tip: "Use stronger action verbs", explanation: "Replace 'Responsible for' with 'Led', 'Implemented', 'Optimized'" },
                { type: "good", tip: "Professional tone", explanation: "Your writing maintains a professional tone throughout" },
                { type: "improve", tip: "Keep lines concise", explanation: "Each bullet point should be one line for better readability" },
                { type: "good", tip: "Consistent formatting", explanation: "Your bullet points follow a consistent format" },
                { type: "improve", tip: "Optimize length", explanation: "Keep resume to 1-2 pages for maximum impact" }
            ]
        },
        content: {
            score: 80,
            tips: [
                { type: "improve", tip: `Emphasize ${jobTitle} skills`, explanation: `Highlight technical and soft skills specific to ${jobTitle}` },
                { type: "improve", tip: "Add quantifiable metrics", explanation: "Include specific achievements like 'Increased sales by 25%'" },
                { type: "good", tip: "Show clear impact", explanation: "Your experience demonstrates measurable results" },
                { type: "improve", tip: "Match job description", explanation: "Align your experience descriptions with the job requirements" },
                { type: "improve", tip: "Include certifications", explanation: "Add relevant certifications and training relevant to the role" }
            ]
        },
        structure: {
            score: 85,
            tips: [
                { type: "good", tip: "Proper section order", explanation: "Your sections are organized: Summary, Experience, Skills, Education" },
                { type: "good", tip: "Reverse chronological order", explanation: "Your jobs are listed with most recent first" },
                { type: "improve", tip: "Group skills by category", explanation: "Organize skills into Technical, Languages, and Tools sections" },
                { type: "good", tip: "Years included", explanation: "You've included years of experience for each position" },
                { type: "improve", tip: "Add company context", explanation: "Include company size/industry when space allows" }
            ]
        },
        skills: {
            score: 79,
            tips: [
                { type: "improve", tip: `Add ${jobTitle} skills`, explanation: `Highlight technical skills required for ${jobTitle}` },
                { type: "good", tip: "Mix technical and soft skills", explanation: "Your resume includes both technical and soft skills" },
                { type: "improve", tip: "Be specific with tools", explanation: "Use exact technology names instead of general descriptions" },
                { type: "improve", tip: "Prioritize by relevance", explanation: "Order skills to match the job description priorities" },
                { type: "improve", tip: "Include skill proficiency", explanation: "Consider adding proficiency levels (Beginner, Intermediate, Expert)" }
            ]
        }
    };
}

// Parse resume text for analysis (simple version)
export function analyzeResumeText(text: string): { keywords: string[]; skills: string[] } {
    const skillKeywords = [
        "javascript", "typescript", "react", "node", "python", "java", "sql", "aws", "docker",
        "git", "leadership", "communication", "project management", "agile", "scrum"
    ];

    const keywords: string[] = [];
    const skills: string[] = [];

    const lowerText = text.toLowerCase();
    skillKeywords.forEach(skill => {
        if (lowerText.includes(skill)) {
            skills.push(skill);
        }
    });

    return { keywords, skills };
}
