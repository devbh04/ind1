const quiz = [
  {
    category: "AI",
    questions: [
      {
        question: "What does AI stand for?",
        options: [
          { text: "Artificial Intelligence", isCorrect: true },
          { text: "Automated Interface", isCorrect: false },
          { text: "Automated Intelligence", isCorrect: false },
          { text: "Artificial Interface", isCorrect: false }
        ]
      },
      {
        question: "Who is considered the father of AI?",
        options: [
          { text: "Alan Turing", isCorrect: true },
          { text: "Isaac Newton", isCorrect: false },
          { text: "Albert Einstein", isCorrect: false },
          { text: "Nikola Tesla", isCorrect: false }
        ]
      },
      {
        question: "Which of these is a type of AI?",
        options: [
          { text: "Machine Learning", isCorrect: true },
          { text: "Digital Marketing", isCorrect: false },
          { text: "Software Development", isCorrect: false },
          { text: "Cybersecurity", isCorrect: false }
        ]
      },
      {
        question: "What is the main purpose of AI?",
        options: [
          { text: "To simulate human intelligence", isCorrect: true },
          { text: "To create new languages", isCorrect: false },
          { text: "To replace computers", isCorrect: false },
          { text: "To design websites", isCorrect: false }
        ]
      },
      {
        question: "Which programming language is commonly used for AI?",
        options: [
          { text: "Python", isCorrect: true },
          { text: "HTML", isCorrect: false },
          { text: "CSS", isCorrect: false },
          { text: "JavaScript", isCorrect: false }
        ]
      },
      {
        question: "How was the difficulty of the quiz?",
        options: [
          { text: "Hard" },
          { text: "Normal" },
          { text: "Easy" },
          { text: "Cannot Say" }
        ]
      }
    ]
  },
  {
    category: "Web Development",
    questions: [
      {
        question: "What does HTML stand for?",
        options: [
          { text: "Hyper Text Markup Language", isCorrect: true },
          { text: "Home Tool Markup Language", isCorrect: false },
          { text: "Hyperlinking Text Management Language", isCorrect: false },
          { text: "Hyper Transferable Markup Language", isCorrect: false }
        ]
      },
      {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: [
          { text: "<a>", isCorrect: true },
          { text: "<link>", isCorrect: false },
          { text: "<href>", isCorrect: false },
          { text: "<nav>", isCorrect: false }
        ]
      },
      {
        question: "Which language is used for styling web pages?",
        options: [
          { text: "HTML", isCorrect: false },
          { text: "CSS", isCorrect: true },
          { text: "Python", isCorrect: false },
          { text: "Java", isCorrect: false }
        ]
      },
      {
        question: "What does the 'flex' property in CSS relate to?",
        options: [
          { text: "Flexible box layout", isCorrect: true },
          { text: "Flex printing", isCorrect: false },
          { text: "Flex wheels", isCorrect: false },
          { text: "Flex graphics", isCorrect: false }
        ]
      },
      {
        question: "Which protocol is used to fetch resources from a server?",
        options: [
          { text: "HTTP", isCorrect: true },
          { text: "FTP", isCorrect: false },
          { text: "SMTP", isCorrect: false },
          { text: "SSH", isCorrect: false }
        ]
      },
      {
        question: "How was the difficulty of the quiz?",
        options: [
          { text: "Hard" },
          { text: "Normal" },
          { text: "Easy" },
          { text: "Cannot Say" }
        ]
      }
    ]
  },
  {
    category: "Data Structures",
    questions: [
      {
        question: "Which data structure uses FIFO order?",
        options: [
          { text: "Queue", isCorrect: true },
          { text: "Stack", isCorrect: false },
          { text: "Array", isCorrect: false },
          { text: "Tree", isCorrect: false }
        ]
      },
      {
        question: "Which data structure uses LIFO order?",
        options: [
          { text: "Stack", isCorrect: true },
          { text: "Queue", isCorrect: false },
          { text: "Graph", isCorrect: false },
          { text: "Set", isCorrect: false }
        ]
      },
      {
        question: "What is the time complexity of accessing an element in an array?",
        options: [
          { text: "O(1)", isCorrect: true },
          { text: "O(n)", isCorrect: false },
          { text: "O(log n)", isCorrect: false },
          { text: "O(n^2)", isCorrect: false }
        ]
      },
      {
        question: "What is the height of a balanced binary tree with n nodes?",
        options: [
          { text: "O(log n)", isCorrect: true },
          { text: "O(n)", isCorrect: false },
          { text: "O(n log n)", isCorrect: false },
          { text: "O(1)", isCorrect: false }
        ]
      },
      {
        question: "Which of these is a non-linear data structure?",
        options: [
          { text: "Tree", isCorrect: true },
          { text: "Array", isCorrect: false },
          { text: "Linked List", isCorrect: false },
          { text: "Stack", isCorrect: false }
        ]
      },
      {
        question: "How was the difficulty of the quiz?",
        options: [
          { text: "Hard" },
          { text: "Normal" },
          { text: "Easy" },
          { text: "Cannot Say" }
        ]
      }
    ]
  },

  {
    category: "Algorithms",
    questions: [
      {
        question: "Which algorithm is used to find the shortest path in a graph?",
        options: [
          { text: "Dijkstra's Algorithm", isCorrect: true },
          { text: "Bubble Sort", isCorrect: false },
          { text: "Depth First Search", isCorrect: false },
          { text: "Binary Search", isCorrect: false }
        ]
      },
      {
        question: "Which sorting algorithm has the best average-case time complexity?",
        options: [
          { text: "Merge Sort", isCorrect: true },
          { text: "Bubble Sort", isCorrect: false },
          { text: "Selection Sort", isCorrect: false },
          { text: "Insertion Sort", isCorrect: false }
        ]
      },
      {
        question: "Which algorithm technique does Binary Search use?",
        options: [
          { text: "Divide and Conquer", isCorrect: true },
          { text: "Greedy", isCorrect: false },
          { text: "Backtracking", isCorrect: false },
          { text: "Dynamic Programming", isCorrect: false }
        ]
      },
      {
        question: "Which algorithm is used for cycle detection in a graph?",
        options: [
          { text: "DFS", isCorrect: true },
          { text: "BFS", isCorrect: false },
          { text: "Prim's", isCorrect: false },
          { text: "Kruskal's", isCorrect: false }
        ]
      },
      {
        question: "What is the time complexity of Quick Sort on average?",
        options: [
          { text: "O(n log n)", isCorrect: true },
          { text: "O(n^2)", isCorrect: false },
          { text: "O(n)", isCorrect: false },
          { text: "O(log n)", isCorrect: false }
        ]
      }
    ]
  },
  {
    category: "Machine Learning",
    questions: [
      {
        question: "What is overfitting in machine learning?",
        options: [
          { text: "Model performs well on training but poorly on test data", isCorrect: true },
          { text: "Model performs poorly on training data", isCorrect: false },
          { text: "Model never improves", isCorrect: false },
          { text: "Model uses fewer features", isCorrect: false }
        ]
      },
      {
        question: "Which algorithm is used for classification?",
        options: [
          { text: "Logistic Regression", isCorrect: true },
          { text: "K-Means", isCorrect: false },
          { text: "Linear Regression", isCorrect: false },
          { text: "Apriori", isCorrect: false }
        ]
      },
      {
        question: "What does supervised learning require?",
        options: [
          { text: "Labeled data", isCorrect: true },
          { text: "Unlabeled data", isCorrect: false },
          { text: "No data", isCorrect: false },
          { text: "Random data", isCorrect: false }
        ]
      },
      {
        question: "Which of the following is a type of unsupervised learning?",
        options: [
          { text: "Clustering", isCorrect: true },
          { text: "Linear Regression", isCorrect: false },
          { text: "Decision Trees", isCorrect: false },
          { text: "Neural Networks", isCorrect: false }
        ]
      },
      {
        question: "Which library is commonly used in Python for ML?",
        options: [
          { text: "scikit-learn", isCorrect: true },
          { text: "Flask", isCorrect: false },
          { text: "NumPy", isCorrect: false },
          { text: "BeautifulSoup", isCorrect: false }
        ]
      }
    ]
  },
  {
    category: "Database",
    questions: [
      {
        question: "What does SQL stand for?",
        options: [
          { text: "Structured Query Language", isCorrect: true },
          { text: "Sequential Query Logic", isCorrect: false },
          { text: "Simple Query Language", isCorrect: false },
          { text: "Statement Query Logic", isCorrect: false }
        ]
      },
      {
        question: "Which SQL statement is used to extract data from a database?",
        options: [
          { text: "SELECT", isCorrect: true },
          { text: "UPDATE", isCorrect: false },
          { text: "INSERT", isCorrect: false },
          { text: "DELETE", isCorrect: false }
        ]
      },
      {
        question: "Which key is used to uniquely identify a record in a table?",
        options: [
          { text: "Primary Key", isCorrect: true },
          { text: "Foreign Key", isCorrect: false },
          { text: "Composite Key", isCorrect: false },
          { text: "Candidate Key", isCorrect: false }
        ]
      },
      {
        question: "Which of the following is a NoSQL database?",
        options: [
          { text: "MongoDB", isCorrect: true },
          { text: "MySQL", isCorrect: false },
          { text: "PostgreSQL", isCorrect: false },
          { text: "Oracle", isCorrect: false }
        ]
      },
      {
        question: "Which clause is used to filter records in SQL?",
        options: [
          { text: "WHERE", isCorrect: true },
          { text: "FROM", isCorrect: false },
          { text: "ORDER BY", isCorrect: false },
          { text: "GROUP BY", isCorrect: false }
        ]
      }
    ]
  },
  {
    category: "System Design",
    questions: [
      {
        question: "What is system scalability?",
        options: [
          { text: "Ability to handle growth in users or data", isCorrect: true },
          { text: "Speed of algorithms", isCorrect: false },
          { text: "Amount of memory used", isCorrect: false },
          { text: "Security features", isCorrect: false }
        ]
      },
      {
        question: "What is a load balancer used for?",
        options: [
          { text: "Distribute traffic across servers", isCorrect: true },
          { text: "Encrypt data", isCorrect: false },
          { text: "Store backups", isCorrect: false },
          { text: "Monitor applications", isCorrect: false }
        ]
      },
      {
        question: "What is the purpose of caching?",
        options: [
          { text: "To store frequently accessed data", isCorrect: true },
          { text: "To backup data", isCorrect: false },
          { text: "To connect APIs", isCorrect: false },
          { text: "To run background jobs", isCorrect: false }
        ]
      },
      {
        question: "What is a CDN used for?",
        options: [
          { text: "Deliver content closer to users", isCorrect: true },
          { text: "Store files permanently", isCorrect: false },
          { text: "Build APIs", isCorrect: false },
          { text: "Encrypt communication", isCorrect: false }
        ]
      },
      {
        question: "Which database type is best for hierarchical data?",
        options: [
          { text: "Graph DB", isCorrect: true },
          { text: "Relational DB", isCorrect: false },
          { text: "Flat files", isCorrect: false },
          { text: "Key-Value Store", isCorrect: false }
        ]
      }
    ]
  }
];

export default quiz;
