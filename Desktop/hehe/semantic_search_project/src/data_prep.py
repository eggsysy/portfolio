import tarfile
import os
import pandas as pd
import re

def clean_news_text(text):
    """
    Manually strips headers and footers.
    Headers are separated from the body by a double newline (\n\n).
    """
    # 1. Split on the first double newline to isolate the header
    parts = text.split('\n\n', 1)
    if len(parts) > 1:
        body = parts[1]
    else:
        body = text

    # 2. Basic Cleaning
    # Remove 'quotes' (lines starting with >)
    body = re.sub(r'(^|\n)>[^\n]*', '', body)
    # Remove extra whitespace
    body = re.sub(r'\s+', ' ', body).strip()
    
    return body

def process_raw_tarball(tar_path, output_path="data/cleaned_corpus.parquet"):
    data = []
    
    print(f"Extracting and cleaning: {tar_path}")
    with tarfile.open(tar_path, "r:gz") as tar:
        for member in tar.getmembers():
            if member.isfile():
                # Extract category from folder name (e.g., 'rec.autos/12345')
                category = os.path.dirname(member.name).split('/')[-1]
                
                # Extract text
                f = tar.extractfile(member)
                if f:
                    try:
                        content = f.read().decode('latin-1') # These old posts are latin-1
                        cleaned_body = clean_news_text(content)
                        
                        if cleaned_body: # Ignore empty posts
                            data.append({
                                "text": cleaned_body,
                                "category": category
                            })
                    except Exception as e:
                        continue # Skip corrupted files

    df = pd.DataFrame(data)
    df.to_parquet(output_path)
    print(f"Saved {len(df)} cleaned documents to {output_path}")
    return df

# Example usage (assuming you downloaded the file to the root)
# process_raw_tarball("20_newsgroups.tar.gz")