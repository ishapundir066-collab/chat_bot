// let currentQuestion = null;
// let previousQuestions = new Set();

// const questions = {
//     easy: {
//         arrays: [
//             {
//                 question: `<h3>Two Sum</h3>
//                 <p>Given an array of integers nums and an integer target, return indices of the two numbers in the array that add up to target.</p>
//                 <p><strong>Example:</strong><br>
//                 Input: nums = [2,7,11,15], target = 9<br>
//                 Output: [0,1]<br>
//                 Explanation: Because nums[0] + nums[1] == 9, we return [0, 1]</p>
//                 <p><strong>Constraints:</strong><br>
//                 - 2 ≤ nums.length ≤ 104<br>
//                 - -109 ≤ nums[i] ≤ 109<br>
//                 - -109 ≤ target ≤ 109</p>`,
//                 solution: `function twoSum(nums, target) {
//     const map = new Map();
//     for (let i = 0; i < nums.length; i++) {
//         const complement = target - nums[i];
//         if (map.has(complement)) {
//             return [map.get(complement), i];
//         }
//         map.set(nums[i], i);
//     }
//     return [];
// }`
//             }
//         ],
//         strings: [
//             {
//                 question: `<h3>Reverse String</h3>
//                 <p>Write a function that reverses a string. The input string is given as an array of characters.</p>
//                 <p><strong>Example:</strong><br>
//                 Input: ["h","e","l","l","o"]<br>
//                 Output: ["o","l","l","e","h"]</p>
//                 <p><strong>Constraints:</strong><br>
//                 - 1 ≤ s.length ≤ 105<br>
//                 - s[i] is a printable ascii character</p>`,
//                 solution: `function reverseString(s) {
//     let left = 0;
//     let right = s.length - 1;
//     while (left < right) {
//         [s[left], s[right]] = [s[right], s[left]];
//         left++;
//         right--;
//     }
//     return s;
// }`
//             }
//         ],
//         recursion: [
//             {
//                 question: `<h3>Fibonacci Number</h3>
//                 <p>Write a function that returns the nth number in the Fibonacci sequence. The Fibonacci sequence is defined as: F(n) = F(n-1) + F(n-2), where F(0) = 0 and F(1) = 1.</p>
//                 <p><strong>Example:</strong><br>
//                 Input: n = 4<br>
//                 Output: 3<br>
//                 Explanation: The sequence is [0,1,1,2,3], so F(4) = 3</p>
//                 <p><strong>Constraints:</strong><br>
//                 - 0 ≤ n ≤ 30</p>`,
//                 solution: `function fibonacci(n) {
//     if (n <= 1) return n;
//     return fibonacci(n-1) + fibonacci(n-2);
// }`
//             }
//         ]
//     },
//     medium: {
//         arrays: [
//             {
//                 question: `<h3>3Sum</h3>
//                 <p>Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.</p>
//                 <p><strong>Example:</strong><br>
//                 Input: nums = [-1,0,1,2,-1,-4]<br>
//                 Output: [[-1,-1,2],[-1,0,1]]</p>
//                 <p><strong>Constraints:</strong><br>
//                 - 0 ≤ nums.length ≤ 3000<br>
//                 - -105 ≤ nums[i] ≤ 105</p>`,
//                 solution: `function threeSum(nums) {
//     nums.sort((a, b) => a - b);
//     const result = [];
    
//     for (let i = 0; i < nums.length - 2; i++) {
//         if (i > 0 && nums[i] === nums[i - 1]) continue;
        
//         let left = i + 1;
//         let right = nums.length - 1;
        
//         while (left < right) {
//             const sum = nums[i] + nums[left] + nums[right];
//             if (sum === 0) {
//                 result.push([nums[i], nums[left], nums[right]]);
//                 while (left < right && nums[left] === nums[left + 1]) left++;
//                 while (left < right && nums[right] === nums[right - 1]) right--;
//                 left++;
//                 right--;
//             } else if (sum < 0) {
//                 left++;
//             } else {
//                 right--;
//             }
//         }
//     }
//     return result;
// }`
//             }
//         ]
//     }
// };

// async function getNextQuestion() {
//     console.log('getNextQuestion function called.');
//     const topic = document.getElementById('topic').value;
//     if (!topic) {
//         alert('Please select a topic first!');
//         return;
//     }
    
//     const questionDiv = document.getElementById('question');
//     const responseDiv = document.getElementById('response');
    
//     questionDiv.innerHTML = '<p class="text-blue-400">Loading question...</p>';
//     responseDiv.classList.add('hidden');
    
//     try {
//         console.log('Attempting to fetch programming challenge...');
//         const response = await fetch('/api/programming-challenge');

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         if (!data || !data.question) {
//             throw new Error('Invalid response format from API: missing question');
//         }

//         const newQuestion = data.question;
        
//         // Check if we've seen this question before
//         if (previousQuestions.has(newQuestion)) {
//             throw new Error('Received a duplicate question. Retrying...');
//         }

//         currentQuestion = newQuestion;
//         previousQuestions.add(newQuestion);
//         questionDiv.innerHTML = currentQuestion;
        
//         // Clear previous answer
//         document.getElementById('answer').value = '';
//         responseDiv.classList.add('hidden');
        
//     } catch (error) {
//         console.error('Detailed error:', error);
//         if (error.message.includes('duplicate question')) {
//             // Try again if we got a duplicate
//             getNextQuestion();
//             return;
//         }
//         questionDiv.innerHTML = `
//             <div class="text-red-400">
//                 <p>Error fetching question. Please try again.</p>
//                 <p class="text-sm mt-2">Error details: ${error.message}</p>
//                 <p class="text-xs mt-1">If this persists, please try refreshing the page.</p>
//             </div>`;
//     }
// }

// async function checkAnswer() {
//     if (!currentQuestion) {
//         alert('Please get a question first!');
//         return;
//     }

//     const userAnswer = document.getElementById('answer').value.trim();
//     if (!userAnswer) {
//         alert('Please write your answer first!');
//         return;
//     }

//     const responseDiv = document.getElementById('response');
//     responseDiv.innerHTML = '<p class="text-blue-400">Analyzing your solution...</p>';
//     responseDiv.classList.remove('hidden');

//     try {
//         const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//             method: 'POST',
//             headers: {
//                 'Authorization': 'Bearer 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',
//                 'HTTP-Referer': window.location.href,
//                 'X-Title': document.title,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 model: 'openai/gpt-3.5-turbo',
//                 messages: [{
//                     role: 'user',
//                     content: `Review this code solution:
                    
//                     PROBLEM:
//                     ${currentQuestion}

//                     SOLUTION:
//                     ${userAnswer}

//                     Provide a detailed review covering:
//                     1. Correctness
//                     2. Time & Space Complexity
//                     3. Code Style
//                     4. Edge Cases
//                     5. Possible Improvements`
//                 }]
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         if (!data.choices || !data.choices[0] || !data.choices[0].message) {
//             throw new Error('Invalid response format from API');
//         }

//         responseDiv.innerHTML = data.choices[0].message.content;
        
//     } catch (error) {
//         console.error('Detailed error:', error);
//         responseDiv.innerHTML = `
//             <div class="text-red-400">
//                 <p>Error checking answer. Please try again.</p>
//                 <p class="text-sm mt-2">Error details: ${error.message}</p>
//             </div>`;
//     }
// }

// async function showSolution() {
//     if (!currentQuestion) {
//         alert('Please get a question first!');
//         return;
//     }

//     const responseDiv = document.getElementById('response');
//     responseDiv.innerHTML = '<p class="text-blue-400">Generating solution...</p>';
//     responseDiv.classList.remove('hidden');

//     try {
//         const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//             method: 'POST',
//             headers: {
//                 'Authorization': 'Bearer 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',
//                 'HTTP-Referer': window.location.href,
//                 'X-Title': document.title,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 model: 'openai/gpt-3.5-turbo',
//                 messages: [{
//                     role: 'user',
//                     content: `Provide a solution for this problem:
//                     ${currentQuestion}

//                     Include:
//                     1. Approach explanation
//                     2. Step-by-step solution
//                     3. Complete code implementation
//                     4. Time and space complexity
//                     5. Alternative approaches

//                     Format the response with clear sections and code examples.`
//                 }]
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         if (!data.choices || !data.choices[0] || !data.choices[0].message) {
//             throw new Error('Invalid response format from API');
//         }

//         responseDiv.innerHTML = data.choices[0].message.content;
        
//     } catch (error) {
//         console.error('Detailed error:', error);
//         responseDiv.innerHTML = `
//             <div class="text-red-400">
//                 <p>Error generating solution. Please try again.</p>
//                 <p class="text-sm mt-2">Error details: ${error.message}</p>
//             </div>`;
//     }
// }

// // Add event listener for topic selection
// document.getElementById('topic').addEventListener('change', function() {
//     if (this.value) {
//         getNextQuestion();
//     }
// });
  


let currentQuestion = null;
let previousQuestions = new Set();

async function getNextQuestion() {
    console.log('getNextQuestion function called.');
    const topic = document.getElementById('topic').value;
    if (!topic) {
        alert('Please select a topic first!');
        return;
    }

    const questionDiv = document.getElementById('question');
    const responseDiv = document.getElementById('response');

    questionDiv.innerHTML = '<p class="text-blue-400">Loading question...</p>';
    responseDiv.classList.add('hidden');

    try {
        // Check if API limit is reached (for demonstration purposes)
        const apiLimitReached = true; // This should be determined by actual API response or a flag

        if (apiLimitReached) {
            questionDiv.innerHTML = `
                <div class="text-yellow-500">
                    <p>Free API limit has been reached. Alternatively, you can use our AI assistant for questions and reference.</p>
                </div>`;
            return;
        }

        console.log('Fetching new question...');
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: `Generate a new unique programming challenge about "${topic}".
                Include:
                - Problem statement
                - Example input/output
                - Constraints
                Keep it concise and unique.`
            })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const newQuestion = data.reply;

        if (previousQuestions.has(newQuestion)) throw new Error('Duplicate question detected.');

        currentQuestion = newQuestion;
        previousQuestions.add(newQuestion);
        questionDiv.innerHTML = newQuestion;

        document.getElementById('answer').value = '';
        responseDiv.classList.add('hidden');

    } catch (error) {
        console.error('Error fetching question:', error);
        questionDiv.innerHTML = `
            <div class="text-red-400">
                <p>Error fetching question. Please try again.</p>
                <p class="text-sm mt-2">Error details: ${error.message}</p>
            </div>`;
    }
}

async function checkAnswer() {
    if (!currentQuestion) {
        alert('Please get a question first!');
        return;
    }

    const userAnswer = document.getElementById('answer').value.trim();
    if (!userAnswer) {
        alert('Please write your answer first!');
        return;
    }

    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = '<p class="text-blue-400">Analyzing your solution...</p>';
    responseDiv.classList.remove('hidden');

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: `Review this code solution:
                
                PROBLEM:
                ${currentQuestion}

                SOLUTION:
                ${userAnswer}

                Provide a detailed review covering:
                1. Correctness
                2. Time & Space Complexity
                3. Code Style
                4. Edge Cases
                5. Possible Improvements`
            })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        responseDiv.innerHTML = data.reply;

    } catch (error) {
        console.error('Error checking answer:', error);
        responseDiv.innerHTML = `
            <div class="text-red-400">
                <p>Error checking answer. Please try again.</p>
                <p class="text-sm mt-2">Error: ${error.message}</p>
            </div>`;
    }
}

async function showSolution() {
    if (!currentQuestion) {
        alert('Please get a question first!');
        return;
    }

    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = '<p class="text-blue-400">Generating solution...</p>';
    responseDiv.classList.remove('hidden');

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: `Provide a complete and detailed solution for this problem:
                ${currentQuestion}

                Include:
                1. Explanation of approach
                2. Step-by-step logic
                3. Full code implementation
                4. Time and space complexity
                5. Possible optimizations`
            })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        responseDiv.innerHTML = data.reply;

    } catch (error) {
        console.error('Error generating solution:', error);
        responseDiv.innerHTML = `
            <div class="text-red-400">
                <p>Error generating solution. Please try again.</p>
                <p class="text-sm mt-2">Error: ${error.message}</p>
            </div>`;
    }
}

// Automatically load a new question when topic changes
document.getElementById('topic').addEventListener('change', function() {
    if (this.value) {
        getNextQuestion();
    }
});
