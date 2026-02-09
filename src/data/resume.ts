export type CommandType = "help" | "summary" | "skills" | "experience" | "education" | "contact" | "clear" | "theme";

// ASCII Art Banner
export const ASCII_BANNER = `
███████╗ ██████╗ ██████╗ ██╗██████╗ ██╗██╗   ██╗███████╗
██╔════╝██╔═══██╗██╔══██╗██║██╔══██╗██║╚██╗ ██╔╝██╔════╝
███████╗██║   ██║██████╔╝██║██████╔╝██║ ╚████╔╝ █████╗  
╚════██║██║   ██║██╔═══╝ ██║██╔══██╗██║  ╚██╔╝  ██╔══╝  
███████║╚██████╔╝██║     ██║██║  ██║██║   ██║   ███████╗
╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝
                                                          
     ██╗ █████╗ ███╗   ███╗ █████╗ ██████╗  ██████╗     
     ██║██╔══██╗████╗ ████║██╔══██╗██╔══██╗██╔═══██╗    
     ██║███████║██╔████╔██║███████║██████╔╝██║   ██║    
██   ██║██╔══██║██║╚██╔╝██║██╔══██║██╔══██╗██║   ██║    
╚█████╔╝██║  ██║██║ ╚═╝ ██║██║  ██║██████╔╝╚██████╔╝    
 ╚════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝     
`;

// Command Aliases
export const COMMAND_ALIASES: Record<string, string> = {
    exp: "experience",
    edu: "education",
    ls: "help",
    dir: "help",
    about: "summary",
    info: "contact",
    sk: "skills",
    clr: "clear",
};

// Available commands for auto-complete
export const AVAILABLE_COMMANDS = [
    "help",
    "summary",
    "skills",
    "experience",
    "education",
    "contact",
    "social",
    "download",
    "theme",
    "clear",
    // Aliases
    "exp",
    "edu",
    "ls",
    "dir",
    "about",
    "info",
    "sk",
    "clr",
    // Easter eggs
    "whoami",
    "sudo",
    "hack",
    "matrix",
];

export const COMMANDS: Record<string, string> = {
    help: `
Available commands:
- summary: A brief summary
- skills: Key strengths
- experience: Work experience
- education: Education Info
- social: Social media links
- download: Download my resume
- contact: Contact Info 📧
- theme: Change theme (dark, light, hacker)
- clear: Clear the terminal

🎮 Try: whoami, sudo, hack, matrix`,
    summary: `Software Developer with expertise in building scalable web applications using React, Angular, Next.js, and PHP. Improving team efficiency by 15%, and delivering client-facing features on time. Experienced in full-stack development, code reviews, and API integration across multiple organizations.`,
    skills: `• Programming Languages: JavaScript (ES6+), PHP, TypeScript, SQL, HTML5, CSS3
• Frameworks & Libraries: React.js, Angular, Next.js, Node.js, Express.js, Tailwind CSS, GraphQL, Redux, REST APIs
• Technologies & Tools: Git/GitHub, MySQL/PostgreSQL, MongoDB, WordPress, GitHub Actions
• Machine Learning & AI: OpenAI/Gemini APIs
• Languages: English (Native)`,
    experience: `
BlessedLouisTechnology – software development agency | Software Developer
Remote
November 2024– April 2025
• Achieved a 20% reduction in bug reports by developing and testing web application features using PHP, JavaScript, and MySQL.
• Increased team efficiency by 15% by setting up Git-based version control workflows, improving code collaboration and review processes.
• Delivered 3 client-facing features on time by translating requirements into functional web solutions and conducting end-to-end testing.
• Enhanced customer satisfaction scores by supporting the deployment of responsive UI updates, improving load times and cross-device compatibility.

Disaster-Accountability-Project – A Non Governmental Organization | Frontend Developer
Remote, USA
May 2024 – Sept 2024
• Performed thorough code reviews to ensure adherence to best practices, coding standards, and project requirements.
• Provided constructive feedback to developers, fostering an environment of continuous improvement and knowledge sharing.
• Identified and resolved code issues, bugs, and performance bottlenecks, contributing to the overall stability and efficiency of the codebase.
• Migration of complex application components from Angular to React JS, enhancing application performance and maintainability.
• Integrated React components with backend services and APIs, ensuring smooth data flow and dynamic user interactions.
• Engaged in continuous learning and professional development to stay updated with the latest industry trends and technologies.

Savvily Technologies – software development agency | Frontend Developer
Remote
Sept 2023 – Sept 2024
• Designed user-friendly software to improve accessibility and responsiveness.
• Used modern frameworks and libraries to build dynamic and interactive user interfaces.
• Stayed up-to-date with industry trends and emerging technologies, continuously enhancing technical skills and knowledge.
• Integrated APIs and third-party services to enhance functionality and data integration within web applications.`,
    education: `University of Port Harcourt
BSc in Educational Management`,
    contact: `📧: sopiriyejamabo@gmail.com
🔗: linkedin.com/in/sopiriye-jamabo
🔗: sopiriye.xyz`,
    social: `
📱 Connect with me:

🔗 LinkedIn: linkedin.com/in/sopiriye-jamabo
💻 GitHub: github.com/sopiriye
🌐 Portfolio: sopiriye.xyz
📧 Email: sopiriyejamabo@gmail.com
🐦 Twitter: @sopiriye (coming soon)

Feel free to reach out for collaborations or opportunities!`,
    download: `
📥 Download My Resume:

📄 PDF Version: [Coming Soon]
📝 DOCX Version: [Coming Soon]

💡 Tip: You can also view my full profile on LinkedIn:
🔗 linkedin.com/in/sopiriye-jamabo

Or check out my portfolio for more details:
🌐 sopiriye.xyz`,
    theme: `Usage: theme dark | light | hacker`,
};
