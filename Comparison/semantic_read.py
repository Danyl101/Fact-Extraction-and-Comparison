from openai import OpenAI
import json
import os
import re
import logging
import logging_loader

from config_loader import config

logger=logging.getLogger("Semantic_Read")


def embedding_json_read():
    """
    Read all JSON files from the Fact_Embedding_Data directory and return their contents.
    """
    base_dir=config["paths"]["Dataset"]["Fact_Embedding_Data"]
    
    for root,dirs,files in os.walk(base_dir):
        for filename in files:
            if not filename.endswith(".json"):
                continue
            
            filepath=os.path.join(root,filename)
            
            try:
                with open(filepath,"r",encoding="utf-8")as f:
                    payload=json.load(f)
            except Exception as e:
                logger.error(f"Error reading {filepath}: {e}")
                continue
            
            data = payload
            yield (
                data["article_title"],
                data["embedding"],
                data["fact"],
                data["source"],
                data["article_id"]
            )
            
def semantic_json_write(data):
    base_dir=config["paths"]["Dataset"]["Fact_Comparison_Data"]
    site_dir = os.path.join(base_dir, data["source"])
    # Ensure output directory exists
    os.makedirs(site_dir,exist_ok=True)
    
    # Sanitize title for filesystem safety
    safe_title = re.sub(r"[^\w\-_. ]", "_", data["article_title"]).strip()
    filename = f"{safe_title}.json"
    filepath = os.path.join(site_dir, filename)

    payload = {
        "article_title": data["article_title"],
        "article_id": data["article_id"],
        "source": data["source"],
        "facts": data["facts"]
    }




