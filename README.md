he base score in each field represents the minimum points that question contributes to the total score, regardless of the user's answer. It accounts for:

Why base exists:
Question Importance

Even if the answer adds 0 points, the question itself has value

Example: Just asking "What's your business name?" (base:5) has value before considering the name length

Minimum Complexity Cost

Covers basic processing/analysis for that question

Example: A radio question with base:10 means answering it starts at 10 points before option bonuses

Prevents Zero-Score Questions
Ensures no question is completely "free" in pricing calculations

How base Interacts with Other Scores:
Field Type	Scoring Formula	Example
Text Input	base + (value-based scoring)	Business name: 5 + length/10
Radio/Select	base + option_score	Website type: 10 + 15(marketplace)
Conditional	base + conditional_question_scores	Redesign scope: 10 + 5(partial)
Real-World Analogy:
Think of ordering pizza:

base = Base pizza price ($10)

options = Toppings (each adds $X)

value = Extra cheese amount (variable cost)

When to Adjust Base Scores:
Increase base when:

The question indicates higher project complexity

Answers require more backend processing

Field is business-critical

Decrease base when:

Question is optional/nice-to-have

Answers don't affect development much

Example from your array:

javascript
{
  id: 3, // Business type question
  score: {
    base: 15, // High base = critical question
    options: {
      "saas": 15, // Bonus for complex business type
      "portfolio": 4 // Lower bonus for simple sites
    }
  }
}
The base ensures a SaaS website always starts at 15+ points before adding the 15-point option bonus, while a portfolio starts at 15+4.