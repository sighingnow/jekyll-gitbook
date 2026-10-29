---
title: Your VS Code Deserves a Local Genius
author: Kirill Kuklin
date: 2025-08-21
category: devops
layout: post
---

So you’re working in VS Code and want a fully private, on-prem AI helper? Connecting it to a local LLM like Ollama ticks all the boxes: no API bills, offline access, total data control, and freedom to pick your favorite model (think CodeLlama). Here’s a friendly walkthrough of how it all fits, what commands fire under the hood, performance trade-offs, limits you’ll bump into, plus a config-and-code demo so you can spin up your own setup.

First, at a glance, the pieces look like this:

• VS Code editor with the Continue extension (UI hooks and command-palette commands)  
• Ollama daemon running locally as your LLM server  
• Your model files (for example, codellama-7b)  

Flow in a nutshell:
1) You trigger a Continue action in VS Code (chat, code complete, agent).  
2) The extension turns that into either an `ollama run` CLI call or an HTTP POST to Ollama’s REST endpoint on localhost:11434.  
3) Ollama loads the model, runs inference, streams JSON-encoded tokens back.  
4) Continue parses those tokens and shows them right in your editor or pane.

Digging into the interfaces:

• Ollama CLI  
   – `ollama pull <model>`  
   – `ollama run <model> [--json] [--stream] [--system "<msg>"] --prompt "<text>"`  
   – `ollama serve` (optional HTTP server mode)  

• Ollama HTTP API (once you’ve run `ollama serve`)  
   – POST /chat { model, prompt, stream }  
   – GET /models, DELETE /models/<name>  

• Your VS Code settings (either in .vscode/settings.json or user settings):  
  {  
    "continue.provider": "ollama",  
    "continue.model": "codellama:7b",  
    "continue.ollamaPath": "/usr/local/bin/ollama",  
    "continue.stream": true,  
    "continue.ollamaUrl": "http://localhost:11434"  
  }

What to expect on performance:
• Latency hovers around 500–1000 ms per token on a 6-core CPU for a 7B model (drops if you’ve got a GPU or Apple MPS).  
• RAM needs: roughly 14 GB for a 7B model, 26 GB for 13B, etc.  
• Concurrency is basically capped by your cores or GPU SMs—think ~5 tokens/sec per core.  
• If you need multi-user access, you can run Ollama on a beefy server over LAN, but lock it down.

Heads-up on limitations:
• Large models will OOM if you don’t have the RAM—no magic CPU fallback.  
• No built-in prompt caching; every request gets re-inferred unless you layer on your own cache proxy.  
• Continue lives in VS Code only; other editors aren’t supported natively.  
• On Linux, Ollama won’t auto-grab NVIDIA GPUs—you’ll need a custom CUDA build. On macOS, it uses MPS out of the box.

Ready to roll? Here’s a quick start:

a) Install Ollama on Ubuntu/Pop!_OS  
   sudo apt update  
   sudo apt install curl  
   curl https://ollama.com/install.sh | sudo bash  

b) Grab a model  
   ollama pull codellama:7b  

c) (Optional) Fire up the HTTP server  
   ollama serve  

d) Drop this into your VS Code settings.json  
   {  
     "continue.provider": "ollama",  
     "continue.model": "codellama:7b",  
     "continue.ollamaPath": "/usr/local/bin/ollama",  
     "continue.stream": true,  
     "continue.ollamaUrl": "http://localhost:11434"  
   }  

e) Hit Ctrl+I (default) to chat  
Prompt:  
 write a Python function that parses a CSV file and outputs JSON  

And voilà—you get a snippet like:

```python
import csv, json

def csv_to_json(csv_path, json_path):
    with open(csv_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        data = list(reader)
    with open(json_path, 'w') as jsonfile:
        json.dump(data, jsonfile, indent=2)

if __name__ == "__main__":
    csv_to_json("input.csv", "output.json")
```

Click “Apply Code,” open a terminal and run `python3 <file>.py`. If you ever paste in a buggy snippet and ask “fix the errors and explain the changes,” Continue will re-infer and hand you back a patch plus breakdown.

All in all, pairing VS Code with a local Ollama LLM via Continue gives you a fast, private dev assistant for completion, debugging and exploration. It’s ideal for solo devs or privacy-minded teams. The main hurdles? Hardware limits and no native caching. Looking ahead, we’ll see more Linux GPU builds, smarter quantization options and tighter IDE plugin ecosystems. For now, this setup nails a dev-friendly, flexible local AI workflow.