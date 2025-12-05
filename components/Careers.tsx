
import React from 'react';
import { FlaskConical, ShoppingBag, Rocket, PenTool, Headphones, ArrowRight, Briefcase, Zap, Target, CheckCircle2, Mail } from 'lucide-react';

const positions = [
  {
    title: "Skincare Product Specialist",
    icon: FlaskConical,
    color: "text-cyan-400",
    gradient: "from-cyan-500 to-blue-500",
    responsibilities: [
        "Lead ingredient research and educational content strategy.",
        "Collaborate with R&D on formulation accuracy and safety.",
        "Train internal teams on dermatological science."
    ],
    impact: "Builds trust & credibility.",
    type: "Product & Science"
  },
  {
    title: "E-Commerce Manager",
    icon: ShoppingBag,
    color: "text-green-400",
    gradient: "from-green-500 to-emerald-500",
    responsibilities: [
        "Manage end-to-end website operations and marketplaces.",
        "Optimize conversion rates (CRO) and user journeys.",
        "Oversee inventory planning and logistics coordination."
    ],
    impact: "Drives revenue & scale.",
    type: "Operations"
  },
  {
    title: "Digital Marketing Specialist",
    icon: Rocket,
    color: "text-purple-400",
    gradient: "from-purple-500 to-pink-500",
    responsibilities: [
        "Execute high-ROI Meta & Google ad campaigns.",
        "Drive organic growth through SEO and content marketing.",
        "Manage influencer partnerships and affiliate networks."
    ],
    impact: "Growth accelerator.",
    type: "Growth"
  },
  {
    title: "Brand Manager",
    icon: PenTool,
    color: "text-pink-400",
    gradient: "from-pink-500 to-rose-500",
    responsibilities: [
        "Define brand voice and visual identity across touchpoints.",
        "Lead creative campaigns tailored for the Indian market.",
        "Oversee PR, storytelling, and community initiatives."
    ],
    impact: "Makes brand memorable.",
    type: "Creative"
  },
  {
    title: "Customer Experience Lead",
    icon: Headphones,
    color: "text-orange-400",
    gradient: "from-orange-500 to-yellow-500",
    responsibilities: [
        "Manage support tickets with empathy and speed.",
        "Analyze customer feedback to drive product improvements.",
        "Develop loyalty programs to increase retention."
    ],
    impact: "Improves repeat revenue.",
    type: "Support"
  }
];

const generateMailto = (role: string) => {
    const subject = encodeURIComponent(`Application for ${role}`);
    const body = encodeURIComponent(`Hi Secret11 Team,

I am writing to express my interest in the ${role} position.

My LinkedIn/Portfolio: [Link Here]
My Phone Number: [Number Here]

I have attached my CV to this email.

Why I'm a great fit:
[Briefly describe your experience...]

Best regards,
[Your Name]`);
    return `mailto:careers@secret11.com?subject=${subject}&body=${body}`;
};

const Careers: React.FC = () => {
  return (
    <section className="py-24 bg-transparent min-h-screen relative overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-blue-400 mb-6 backdrop-blur-md">
                <Briefcase className="h-4 w-4" /> We are hiring
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 pb-2">
                Join the Revolution
            </h2>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
                We are building the future of ingredient-first skincare for India. 
                <br className="hidden md:block" /> If you are obsessed with impact, innovation, and skin, you belong here.
            </p>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {positions.map((job, index) => (
                <div 
                    key={index} 
                    className="group bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-1 overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className="relative bg-black/40 rounded-[1.8rem] p-8 h-full flex flex-col overflow-hidden">
                        {/* Hover Gradient Overlay */}
                        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${job.gradient} opacity-0 group-hover:opacity-10 blur-[80px] rounded-full transition-opacity duration-500 pointer-events-none`}></div>
                        
                        {/* Top Badge */}
                        <div className="flex justify-between items-start mb-8 relative z-10">
                             <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${job.color} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                                 <job.icon className="h-7 w-7" />
                             </div>
                             <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-white/5">
                                 {job.type}
                             </span>
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-bold text-white mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">
                            {job.title}
                        </h3>

                        <div className="space-y-6 mb-8 flex-grow relative z-10">
                            <div>
                                <h4 className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                                    <Target className="h-3 w-3" /> Key Responsibilities
                                </h4>
                                <ul className="space-y-3">
                                    {job.responsibilities.map((resp, i) => (
                                        <li key={i} className="text-gray-300 text-sm font-light leading-relaxed flex gap-3">
                                            <CheckCircle2 className="h-4 w-4 text-blue-500/50 shrink-0 mt-0.5" />
                                            {resp}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                                    <Zap className="h-3 w-3" /> Impact
                                </h4>
                                <p className="text-gray-400 text-sm font-light italic border-l-2 border-white/10 pl-4">
                                    "{job.impact}"
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <a href={generateMailto(job.title)} className="mt-auto group/btn flex items-center justify-between w-full p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors relative overflow-hidden">
                            <span className="text-xs font-bold text-white uppercase tracking-[0.2em] relative z-10 flex items-center gap-2">
                                <Mail className="h-4 w-4" /> Apply Now
                            </span>
                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-transform relative z-10" />
                            
                            {/* Fill Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${job.gradient} opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300`}></div>
                        </a>
                    </div>
                </div>
            ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
            <p className="text-gray-400 mb-4">Don't see your role?</p>
            <a href="mailto:careers@secret11.com" className="inline-block text-white border-b border-blue-500 pb-1 hover:text-blue-400 transition-colors">
                Send us your resume anyway
            </a>
        </div>

      </div>
    </section>
  );
};

export default Careers;
