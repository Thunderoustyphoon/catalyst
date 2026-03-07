import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Clock, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";

interface AdaptiveQuizProps {
  onNavigate: (screen: string) => void;
}

export function AdaptiveQuiz({ onNavigate }: AdaptiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the correct way to create a React component?",
      options: [
        "function MyComponent() { return <div>Hello</div>; }",
        "const MyComponent = () => { return <div>Hello</div>; }",
        "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }",
        "All of the above"
      ],
      correct: 3,
      difficulty: "medium"
    },
    {
      id: 2,
      question: "Which hook is used for managing state in functional components?",
      options: [
        "useEffect",
        "useState",
        "useContext",
        "useReducer"
      ],
      correct: 1,
      difficulty: "easy"
    },
    {
      id: 3,
      question: "What is the Virtual DOM in React?",
      options: [
        "A copy of the real DOM kept in memory",
        "A way to manipulate CSS",
        "A database for storing component data",
        "A testing framework"
      ],
      correct: 0,
      difficulty: "medium"
    },
    {
      id: 4,
      question: "How do you pass data from parent to child component?",
      options: [
        "Using state",
        "Using props",
        "Using context",
        "Using refs"
      ],
      correct: 1,
      difficulty: "easy"
    },
    {
      id: 5,
      question: "What is the purpose of useEffect hook?",
      options: [
        "To manage component state",
        "To handle side effects in functional components",
        "To create refs",
        "To optimize performance"
      ],
      correct: 1,
      difficulty: "medium"
    }
  ];

  useEffect(() => {
    if (timeRemaining > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      setQuizCompleted(true);
    }
  }, [timeRemaining, quizCompleted]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-secondary";
    if (percentage >= 60) return "text-primary";
    return "text-destructive";
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Quiz Completed! 🎉</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className={`text-6xl font-bold ${getScoreColor()}`}>
                  {percentage}%
                </div>
                <p className="text-lg text-gray-600">
                  You scored {score} out of {questions.length} questions correctly
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Performance</span>
                  <Badge variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}>
                    {percentage >= 80 ? "Excellent" : percentage >= 60 ? "Good" : "Needs Improvement"}
                  </Badge>
                </div>
                <Progress value={percentage} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="font-semibold text-secondary">Strengths</div>
                  <p className="text-gray-600 mt-1">React fundamentals, Component structure</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="font-semibold" style={{ color: 'var(--warning)' }}>Areas to Improve</div>
                  <p className="text-gray-600 mt-1">Hooks, State management</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={() => onNavigate('learning')} className="w-full">
                  Continue Learning
                </Button>
                <Button variant="outline" onClick={() => onNavigate('student')} className="w-full border-border hover:bg-muted/50">
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Quiz Header with Back Button */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => onNavigate('student')}
              className="border-border hover:bg-muted/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-medium text-card-foreground">Adaptive Assessment</h1>
              <p className="text-muted-foreground">Test your knowledge and get personalized feedback</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              <span className={timeRemaining <= 60 ? "text-destructive" : ""}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-border">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Quiz Progress</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} />
      </div>

      {/* Question Card */}
      <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline">
                {questions[currentQuestion].difficulty}
              </Badge>
              <div className="text-sm text-gray-500">
                React Development
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <h2 className="text-xl font-semibold">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left border rounded-lg transition-all hover:border-primary ${
                    selectedAnswer === index 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index 
                        ? 'border-primary bg-primary' 
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
          <Button 
            variant="outline" 
            disabled={currentQuestion === 0}
            onClick={() => {
              setCurrentQuestion(currentQuestion - 1);
              setSelectedAnswer(null);
            }}
          >
            Previous
          </Button>
          
          <Button 
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
      </div>

      {/* Adaptive Feedback */}
      {selectedAnswer !== null && (
        <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-primary">Adaptive Learning Tip</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Based on your answer, we recommend reviewing React component patterns and state management concepts.
                  </p>
                </div>
              </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}