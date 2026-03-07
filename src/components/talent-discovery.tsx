import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  Search, Filter, Star, MapPin, Clock, DollarSign, 
  Users, Eye, MessageSquare, BookOpen, Code, Trophy,
  ArrowLeft, Heart, Share, Download, Briefcase
} from "lucide-react";

interface TalentDiscoveryProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function TalentDiscovery({ onNavigate, onLogout }: TalentDiscoveryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const students = [
    {
      id: 1,
      name: "Rahul Kumar",
      title: "Full Stack Developer",
      avatar: "",
      rating: 4.9,
      completedProjects: 12,
      location: "Mumbai, India",
      hourlyRate: 500,
      skills: ["React", "Node.js", "MongoDB", "TypeScript", "AWS"],
      bio: "Passionate full-stack developer with 3+ years of experience building scalable web applications. Specialized in React ecosystem and cloud technologies.",
      experience: "3 years",
      education: "B.Tech Computer Science, IIT Mumbai",
      languages: ["Hindi", "English", "Marathi"],
      portfolio: [
        { title: "E-commerce Platform", tech: "React, Node.js, MongoDB", image: "", budget: "₹45,000" },
        { title: "Task Management App", tech: "React, Firebase", image: "", budget: "₹25,000" },
        { title: "Restaurant Website", tech: "React, Tailwind CSS", image: "", budget: "₹15,000" }
      ],
      certifications: ["AWS Certified Developer", "React Professional Certificate"],
      availability: "Available now",
      responseTime: "Within 2 hours",
      successRate: 98,
      earnings: "₹2,50,000+"
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "UI/UX Designer & Frontend Developer",
      avatar: "",
      rating: 4.8,
      completedProjects: 18,
      location: "Bangalore, India",
      hourlyRate: 600,
      skills: ["UI/UX Design", "Figma", "React", "CSS", "Animation"],
      bio: "Creative designer and frontend developer with a keen eye for user experience. I create beautiful and functional digital experiences.",
      experience: "4 years",
      education: "M.Des Interaction Design, NID Ahmedabad",
      languages: ["Hindi", "English", "Kannada"],
      portfolio: [
        { title: "Fitness App Design", tech: "Figma, React Native", image: "", budget: "₹35,000" },
        { title: "Banking Dashboard", tech: "Figma, React", image: "", budget: "₹50,000" },
        { title: "E-learning Platform", tech: "Figma, Vue.js", image: "", budget: "₹40,000" }
      ],
      certifications: ["Google UX Design Professional", "Adobe Certified Expert"],
      availability: "Available in 1 week",
      responseTime: "Within 4 hours",
      successRate: 96,
      earnings: "₹3,20,000+"
    },
    {
      id: 3,
      name: "Ankit Verma",
      title: "Data Scientist & Python Developer",
      avatar: "",
      rating: 4.7,
      completedProjects: 8,
      location: "Delhi, India",
      hourlyRate: 750,
      skills: ["Python", "Machine Learning", "React", "SQL", "Tableau"],
      bio: "Data scientist with strong programming skills. I help businesses make data-driven decisions through analytics and machine learning solutions.",
      experience: "2 years",
      education: "M.Tech Data Science, IIT Delhi",
      languages: ["Hindi", "English"],
      portfolio: [
        { title: "Sales Analytics Dashboard", tech: "Python, React, D3.js", image: "", budget: "₹60,000" },
        { title: "Customer Segmentation", tech: "Python, Scikit-learn", image: "", budget: "₹40,000" },
        { title: "Inventory Prediction Model", tech: "Python, TensorFlow", image: "", budget: "₹55,000" }
      ],
      certifications: ["Google Data Analytics Professional", "IBM Data Science"],
      availability: "Available now",
      responseTime: "Within 1 hour",
      successRate: 94,
      earnings: "₹1,80,000+"
    },
    {
      id: 4,
      name: "Sneha Patel",
      title: "Mobile App Developer",
      avatar: "",
      rating: 4.9,
      completedProjects: 15,
      location: "Pune, India",
      hourlyRate: 650,
      skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
      bio: "Mobile app developer passionate about creating seamless user experiences across platforms. Specialized in cross-platform development.",
      experience: "3.5 years",
      education: "B.Tech Computer Engineering, COEP Pune",
      languages: ["Hindi", "English", "Gujarati", "Marathi"],
      portfolio: [
        { title: "Food Delivery App", tech: "React Native, Node.js", image: "", budget: "₹80,000" },
        { title: "Meditation App", tech: "Flutter, Firebase", image: "", budget: "₹45,000" },
        { title: "Social Media App", tech: "React Native, AWS", image: "", budget: "₹95,000" }
      ],
      certifications: ["Google Flutter Developer", "React Native Professional"],
      availability: "Available in 2 weeks",
      responseTime: "Within 3 hours",
      successRate: 97,
      earnings: "₹4,10,000+"
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = selectedSkill === "all" || student.skills.includes(selectedSkill);
    
    return matchesSearch && matchesSkill;
  });

  const StudentCard = ({ student }: { student: any }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={student.avatar} />
            <AvatarFallback className="text-lg">{student.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-card-foreground">{student.name}</h3>
            <p className="text-muted-foreground">{student.title}</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-card-foreground">{student.rating}</span>
                <span className="text-muted-foreground">({student.completedProjects} projects)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{student.location}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-primary">₹{student.hourlyRate}/hr</div>
            <Badge variant={student.availability.includes("now") ? "default" : "secondary"} className="text-xs">
              {student.availability}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{student.bio}</p>
        
        <div className="flex flex-wrap gap-2">
          {student.skills.slice(0, 5).map((skill: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {student.skills.length > 5 && (
            <Badge variant="outline" className="text-xs">
              +{student.skills.length - 5} more
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-card-foreground">{student.successRate}%</div>
            <div className="text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-card-foreground">{student.responseTime}</div>
            <div className="text-muted-foreground">Response Time</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-card-foreground">{student.earnings}</div>
            <div className="text-muted-foreground">Total Earned</div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm" onClick={() => setSelectedStudent(student)}>
            <Eye className="w-4 h-4 mr-2" />
            View Profile
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Message
          </Button>
          <Button variant="outline" size="sm">
            <Heart className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const StudentProfileDialog = ({ student }: { student: any }) => (
    <Dialog open={!!student} onOpenChange={() => setSelectedStudent(null)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={student?.avatar} />
              <AvatarFallback className="text-lg">{student?.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl text-card-foreground">{student?.name}</h2>
              <p className="text-muted-foreground">{student?.title}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        {student && (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">About</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-card-foreground">{student.bio}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Experience:</span>
                        <span className="text-card-foreground">{student.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Education:</span>
                        <span className="text-card-foreground">{student.education}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Languages:</span>
                        <span className="text-card-foreground">{student.languages.join(", ")}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{student.rating}</div>
                        <div className="text-sm text-muted-foreground">Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-card-foreground">{student.completedProjects}</div>
                        <div className="text-sm text-muted-foreground">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-card-foreground">{student.successRate}%</div>
                        <div className="text-sm text-muted-foreground">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-card-foreground">₹{student.hourlyRate}</div>
                        <div className="text-sm text-muted-foreground">Per Hour</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {student.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {student.certifications.map((cert: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-primary" />
                        <span className="text-card-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {student.portfolio.map((project: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                        <Code className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold mb-2 text-card-foreground">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{project.tech}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-primary">{project.budget}</span>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Project
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-2 border-primary pl-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-card-foreground">Freelance Developer</h4>
                      <p className="text-sm text-muted-foreground">2021 - Present</p>
                      <p className="text-sm mt-2 text-card-foreground">Building custom web and mobile applications for various clients. Specialized in React ecosystem and modern development practices.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground">Junior Developer at TechCorp</h4>
                      <p className="text-sm text-muted-foreground">2020 - 2021</p>
                      <p className="text-sm mt-2 text-card-foreground">Worked on internal tools and client projects using React and Node.js. Gained experience in agile development and team collaboration.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <Card key={review}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>C{review}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-card-foreground">Client {review}</h4>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">E-commerce Project • 2 months ago</p>
                          <p className="text-sm text-card-foreground">Excellent work quality and communication. Delivered the project on time and exceeded expectations. Highly recommended!</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        <div className="flex gap-2 pt-4">
          <Button>
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact {student?.name}
          </Button>
          <Button variant="outline">
            <Briefcase className="w-4 h-4 mr-2" />
            Hire for Project
          </Button>
          <Button variant="outline">
            <Share className="w-4 h-4 mr-2" />
            Share Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => onNavigate('client-dashboard')}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-card-foreground">Discover Talent</h1>
                <p className="text-muted-foreground">Find skilled students for your projects</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, skills, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="React">React</SelectItem>
                  <SelectItem value="Node.js">Node.js</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                  <SelectItem value="Mobile">Mobile Development</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            {filteredStudents.length} talented students found
          </h2>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="projects">Most Projects</SelectItem>
              <SelectItem value="rate-low">Lowest Rate</SelectItem>
              <SelectItem value="rate-high">Highest Rate</SelectItem>
              <SelectItem value="availability">Available Now</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Student Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      {/* Student Profile Dialog */}
      {selectedStudent && <StudentProfileDialog student={selectedStudent} />}
    </div>
  );
}