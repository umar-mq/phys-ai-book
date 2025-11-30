import os
import re
import requests
import sys

# CONFIGURATION
# ---------------------------------------------------------------------
# CHANGE THIS to your deployed Railway Backend URL or localhost:8000
API_URL = "http://localhost:8080/api/ingest"
DOCS_DIR = "./docs"
# ---------------------------------------------------------------------

def clean_text(text):
    """
    Cleans up the extracted text:
    1. Removes import statements.
    2. Removes <Quiz /> components.
    3. Removes extra whitespace.
    """
    # Remove imports
    text = re.sub(r'^import .*?;', '', text, flags=re.MULTILINE)
    # Remove Quiz components
    text = re.sub(r'<Quiz\s+.*?\/>', '', text, flags=re.DOTALL)
    # Remove opening/closing personalization tags if any remain (safety)
    text = re.sub(r'<\/?Personalization.*?>', '', text)
    
    return text.strip()

def extract_expert_content(file_content):
    """
    Extracts content inside <Personalization level="expert" language="english">
    If no tags are found, assumes the whole file is general content.
    """
    # Regex to find the Expert English block
    # Matches: <Personalization level="expert" language="english"> ...content... </Personalization>
    # Flexible with whitespace and attribute order
    pattern = r'<Personalization\s+[^>]*level="expert"[^>]*language="english"[^>]*>(.*?)<\/Personalization>'
    
    matches = re.findall(pattern, file_content, re.DOTALL)
    
    if matches:
        # Join all expert blocks found in the file
        return "\n\n".join(matches)
    
    # FALLBACK: If the file is a standard MD file (no personalization), return it all.
    # But check if it HAS personalization tags but just not expert ones (then return empty)
    if "<Personalization" in file_content:
        return None # It has tags, but no expert/english one. Skip.
        
    return file_content

def ingest_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        raw_content = f.read()

    # 1. Extract the "Gold" content
    target_content = extract_expert_content(raw_content)
    
    if not target_content:
        print(f"⏭️  Skipping {os.path.basename(file_path)} (No Expert/English content)")
        return

    # 2. Clean it
    cleaned_content = clean_text(target_content)
    
    if not cleaned_content:
        return

    # 3. Construct Payload
    payload = {
        "text": cleaned_content,
        "metadata": {
            "source": os.path.basename(file_path),
            "path": file_path
        }
    }

    # 4. Send to API
    try:
        response = requests.post(API_URL, json=payload)
        if response.status_code == 200:
            print(f"✅ Ingested: {os.path.basename(file_path)}")
        else:
            print(f"❌ Failed: {os.path.basename(file_path)} - {response.status_code} {response.text}")
    except Exception as e:
        print(f"🔥 Error connecting to API: {e}")

def main():
    print(f"🚀 Starting Ingestion from {DOCS_DIR} to {API_URL}...")
    
    count = 0
    for root, dirs, files in os.walk(DOCS_DIR):
        for file in files:
            if file.endswith(".md") or file.endswith(".mdx"):
                file_path = os.path.join(root, file)
                ingest_file(file_path)
                count += 1
                
    print(f"\n✨ Processed {count} files.")

if __name__ == "__main__":
    main()