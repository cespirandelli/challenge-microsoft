import os
import azure.cognitiveservices.speech as speechsdk
import openai


# Set up Azure OpenAI API credentials
openai.api_type = "azure"
openai.api_base = "https://teste-challenge.openai.azure.com/"
openai.api_version = "2023-03-15-preview"
openai.api_key = "b5e2b36f2df647a1b6ff96611b052725"

# Set up Azure Speech-to-Text and Text-to-Speech credentials
speech_key = "63e2e8cdd3774328b2d020432cd2d8a8"
service_region = "eastus"
speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)
speech_config.speech_synthesis_language = "pt-BR"

# Set up the voice configuration
speech_config.speech_synthesis_voice_name = "pt-BR-AntonioNeural"
speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config)
speech_config.speech_recognition_language = "pt-BR"


# Define the speech-to-text function
def speech_to_text():
    # Set up the audio configuration
    audio_config = speechsdk.audio.AudioConfig(use_default_microphone=True)

    # Create a speech recognizer and start the recognition
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)
    print("Say something...")

    result = speech_recognizer.recognize_once_async().get()

    print(result)

    if result.reason == speechsdk.ResultReason.RecognizedSpeech:
        return result.text
    elif result.reason == speechsdk.ResultReason.NoMatch:
        return "Sorry, I didn't catch that."
    elif result.reason == speechsdk.ResultReason.Canceled:
        return "Recognition canceled."

# Define the Azure OpenAI language generation function
def generate_text(prompt):
    response = openai.ChatCompletion.create(
        engine="teste-challenge",
        messages=[
            {"role": "system", "content": "Você é um assistente que utiliza a Base de dados para responder questões relacionadas a preço de produtos. Contexto: Responda em português"},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=50,
        top_p=0.95,
        frequency_penalty=0,
        presence_penalty=0,
        stop=None
    )
    return response['choices'][0]['message']['content']


# Define the text-to-speech function
def text_to_speech(text):
    try:
        result = speech_synthesizer.speak_text_async(text).get()
        if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
            print("Text-to-speech conversion successful.")
            return True
        else:
            print(f"Error synthesizing audio: {result}")
            return False
    except Exception as ex:
        print(f"Error synthesizing audio: {ex}")
        return False


texto_pessoa = speech_to_text()
print(f"Usuário: {texto_pessoa}")

gerar_texto = generate_text(texto_pessoa)
print(f"Aplicativo: {gerar_texto}")

fala_maquina = text_to_speech(gerar_texto)
