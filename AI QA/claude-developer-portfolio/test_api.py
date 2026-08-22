from dotenv import load_dotenv
load_dotenv()

from anthropic import Anthropic

client = Anthropic()
model = "claude-sonnet-4-5"

messages=[
    #List of messages to send
]
response = client.messages.create(
    model=model,
    max_tokens=100,
    messages=[{"role": "user", "content": "Say hello in one sentence."}],
)

print(response.content[0].text)
