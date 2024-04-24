import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os
load_dotenv()

api_key = os.getenv("GENERATIVEAI_API_KEY")
genai.configure(api_key=api_key)

generation_config = {
    "temperature": 0.9,
    "top_p": 0.5,  # Focus on high probability words, but allow some variation
    "top_k": 5,     # Consider top 5 most probable words at each step
    "max_output_tokens": 1000,  # Maximum number of tokens to generate
}

safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
]

chat = None

def text_summary(text, isNew = False):
    model = genai.GenerativeModel(model_name="gemini-pro",
                                generation_config=generation_config,
                                safety_settings=safety_settings)
    global chat
    
    if isNew:
        chat = model.start_chat()
        chat.send_message("Act like you are a chef and food ai (specifically for indian food) Dont Generate Bold and Italic Output (*,**) give title in inside <strong> </strong> tag after <strong> </strong> add a <br/> and para text in <p> </p> tag and add 2</br> tag after every title and paragraph  data :  row :- {row},col :-{col}")
        response = chat.send_message(text)
        return response.text
    else:
        response = chat.send_message(text)
        return response.text