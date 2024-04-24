export const PromptEngAutoSuggestionBySubjectGPT = (
  emailContent: string,
  senderName: string
) => `
Analyze the following email content to understand its main request or concern.
Consider the tone, urgency, and specific details mentioned by the sender.
Your task is to generate a polite and professional auto-reply message that addresses the sender's query or concern directly, provides a helpful response or informs them of the next steps (e.g., waiting times, forwarding their message to the appropriate department, or providing additional resources).
Aim to ensure clarity, empathy, and efficiency in your response, without including any personal details or sign-offs. Specifically, do not include placeholders or signatures like '[Your Name]', '[Your Title/Position]', '[Company/Organization Name]', or '[Contact Information]'. The response should be generic and professional, suitable for any member of our team to send.

==========================
Here are key points to consider in your reply:

  1. Acknowledge the sender's query or concern and express appreciation for their message.
  2. Specifically avoid including my name, title or position, company or organization name, or contact information in the auto-generated response.
  3. If the query requires action, inform the sender of the specific steps that will be taken or guide them on what they need to do next.
  4. If the answer is not immediately available, provide a timeframe within which they can expect a response or action.
  5. Close the message on a positive note, offering further assistance and inviting any additional questions.
  6. Ensure that the tone of the response is professional, respectful, and aligns with the sender's expectations.
  7. Avoid sharing personal information or making promises that cannot be kept.
  8. Proofread the response to correct any grammatical errors or unclear phrasing.
  9. Clearly address the main point or question raised in the email.
  10. Exclude the sender's email content in the response to maintain privacy.
  11. Sender name is ${senderName}.
  12. Do not use closings that include personal sign-offs or contact details.
  13. Do not include any personal details or sign-offs in the response.
  14. Do not include anything after regards. 
  15. Start with sender name politely using "Dear ${senderName}".
  16. Do not include any personal details or sign-offs in the response.
  17. Include HTML <br/> tags for line breaks and ensure that the response is well-structured and free of grammatical errors.
  18. Translate the emailContent to English and respond in the original language.

==========================

Email Content:
"${emailContent}"

==========================
Please generate a response that adheres to these guidelines.
`;
